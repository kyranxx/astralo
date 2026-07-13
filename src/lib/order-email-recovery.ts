import type { Order } from './orders.ts';
import type { OrderRow } from './supabase.ts';
import { needsProductEmailFulfillment } from './order-fulfillment-state.ts';

const DEFAULT_LIMIT = 3;
const DEFAULT_MIN_AGE_MINUTES = 30;
const DEFAULT_MAX_AGE_DAYS = 14;

type RecoveryStatus = 'dry_run' | 'fulfilled' | 'skipped' | 'failed';

export interface OrderEmailRecoveryResultRow {
    orderId: string;
    status: RecoveryStatus;
    reason?: string;
    productKey?: string;
    createdAt?: string;
}

export interface OrderEmailRecoveryResult {
    ok: boolean;
    dryRun: boolean;
    scanned: number;
    eligible: number;
    fulfilled: number;
    skipped: number;
    failed: number;
    results: OrderEmailRecoveryResultRow[];
}

export interface LoadMissingProductEmailOrdersOptions {
    limit?: number;
    minAgeMinutes?: number;
    maxAgeDays?: number;
    now?: Date;
}

export interface RecoverMissingProductEmailsOptions extends LoadMissingProductEmailOrdersOptions {
    dryRun?: boolean;
    loadOrders?: (options: Required<LoadMissingProductEmailOrdersOptions>) => Promise<Order[]>;
    fulfillOrder?: (order: Order) => Promise<void>;
}

export async function recoverMissingProductEmails(
    options: RecoverMissingProductEmailsOptions = {}
): Promise<OrderEmailRecoveryResult> {
    const dryRun = Boolean(options.dryRun);
    const limit = normalizePositiveInteger(options.limit, DEFAULT_LIMIT);
    const minAgeMinutes = normalizePositiveInteger(options.minAgeMinutes, DEFAULT_MIN_AGE_MINUTES);
    const maxAgeDays = normalizePositiveInteger(options.maxAgeDays, DEFAULT_MAX_AGE_DAYS);
    const now = options.now || new Date();
    const loadOrders = options.loadOrders || loadOrdersNeedingProductEmail;
    const fulfill = options.fulfillOrder || fulfillProductEmail;
    const orders = await loadOrders({ limit, minAgeMinutes, maxAgeDays, now });

    let eligible = 0;
    let fulfilled = 0;
    let skipped = 0;
    let failed = 0;
    const results: OrderEmailRecoveryResultRow[] = [];

    for (const order of orders) {
        const base = {
            orderId: order.id,
            productKey: order.productKey,
            createdAt: order.createdAt,
        };

        if (!needsProductEmailFulfillment(order)) {
            skipped += 1;
            results.push({ ...base, status: 'skipped', reason: getSkipReason(order) });
            continue;
        }

        eligible += 1;

        if (dryRun) {
            results.push({ ...base, status: 'dry_run' });
            continue;
        }

        try {
            await fulfill(order);
            fulfilled += 1;
            results.push({ ...base, status: 'fulfilled' });
        } catch (error) {
            failed += 1;
            results.push({ ...base, status: 'failed', reason: errorMessage(error) });
        }
    }

    return {
        ok: failed === 0,
        dryRun,
        scanned: orders.length,
        eligible,
        fulfilled,
        skipped,
        failed,
        results,
    };
}

export async function loadOrdersNeedingProductEmail({
    limit = DEFAULT_LIMIT,
    minAgeMinutes = DEFAULT_MIN_AGE_MINUTES,
    maxAgeDays = DEFAULT_MAX_AGE_DAYS,
    now = new Date(),
}: LoadMissingProductEmailOrdersOptions = {}): Promise<Order[]> {
    const normalizedLimit = normalizePositiveInteger(limit, DEFAULT_LIMIT);
    const normalizedMinAgeMinutes = normalizePositiveInteger(minAgeMinutes, DEFAULT_MIN_AGE_MINUTES);
    const normalizedMaxAgeDays = normalizePositiveInteger(maxAgeDays, DEFAULT_MAX_AGE_DAYS);
    const window = getOrderRecoveryWindow({
        now,
        minAgeMinutes: normalizedMinAgeMinutes,
        maxAgeDays: normalizedMaxAgeDays,
    });
    const { supabase } = await import('./supabase.ts');

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'completed')
        .is('email_sent_at', null)
        .not('customer_email', 'is', null)
        .neq('customer_email', '')
        .gte('created_at', window.oldestCreatedAt)
        .lte('created_at', window.newestCreatedAt)
        .order('created_at', { ascending: true })
        .limit(normalizedLimit);

    if (error) {
        throw new Error(`Failed to load orders needing product email: ${error.message}`);
    }

    return ((data || []) as OrderRow[]).map(rowToOrder);
}

export function getOrderRecoveryWindow({
    now = new Date(),
    minAgeMinutes = DEFAULT_MIN_AGE_MINUTES,
    maxAgeDays = DEFAULT_MAX_AGE_DAYS,
}: Pick<LoadMissingProductEmailOrdersOptions, 'now' | 'minAgeMinutes' | 'maxAgeDays'> = {}) {
    const normalizedMinAgeMinutes = normalizePositiveInteger(minAgeMinutes, DEFAULT_MIN_AGE_MINUTES);
    const normalizedMaxAgeDays = normalizePositiveInteger(maxAgeDays, DEFAULT_MAX_AGE_DAYS);

    return {
        oldestCreatedAt: new Date(now.getTime() - normalizedMaxAgeDays * 24 * 60 * 60 * 1000).toISOString(),
        newestCreatedAt: new Date(now.getTime() - normalizedMinAgeMinutes * 60 * 1000).toISOString(),
    };
}

async function fulfillProductEmail(order: Order): Promise<void> {
    const { fulfillOrder } = await import('./fulfillment.ts');
    await fulfillOrder(order);
}

function rowToOrder(row: OrderRow): Order {
    return {
        id: row.id,
        stripeSessionId: row.stripe_session_id,
        stripePaymentIntentId: row.stripe_payment_intent_id || undefined,
        createdAt: row.created_at,
        customerEmail: row.customer_email,
        customerName: row.customer_name,
        birthDate: row.birth_date || '',
        birthTime: row.birth_time || undefined,
        birthPlace: row.birth_place || undefined,
        partnerName: row.partner_name || undefined,
        partnerBirthDate: row.partner_birth_date || undefined,
        partnerBirthTime: row.partner_birth_time || undefined,
        partnerBirthPlace: row.partner_birth_place || undefined,
        productKey: row.product_key,
        productName: row.product_name,
        amount: row.amount,
        currency: row.currency,
        country: row.country || '',
        countryCode: row.country_code || '',
        status: row.status,
        horoscopePdfPath: row.horoscope_pdf_path || undefined,
        horoscopePdfUrl: row.horoscope_pdf_url || undefined,
        horoscopeContent: row.horoscope_content || undefined,
        lang: row.lang,
        emailSentAt: row.email_sent_at || undefined,
        refundedAt: row.refunded_at || undefined,
        refundReason: row.refund_reason || undefined,
        stripeRefundId: row.stripe_refund_id || undefined,
    };
}

function getSkipReason(order: Pick<Order, 'status' | 'customerEmail' | 'emailSentAt'>): string {
    if (order.status !== 'completed') return 'order_not_completed';
    if (!order.customerEmail?.trim()) return 'missing_customer_email';
    if (order.emailSentAt) return 'email_already_sent';
    return 'not_eligible';
}

function normalizePositiveInteger(value: unknown, fallback: number): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
    return Math.floor(parsed);
}

function errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error';
}
