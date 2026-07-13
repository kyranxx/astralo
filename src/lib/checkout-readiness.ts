export type CheckoutReadinessSeverity = 'ok' | 'warning' | 'critical';
export type StripeKeyMode = 'live' | 'test' | 'unknown' | 'missing';

export interface CheckoutReadinessCheck {
    id: string;
    label: string;
    configured: boolean;
    required: boolean;
    severity: CheckoutReadinessSeverity;
    message: string;
}

export interface CheckoutReadiness {
    status: 'ready' | 'needs_attention' | 'blocked';
    canAcceptPaidOrders: boolean;
    canTrackServerPurchases: boolean;
    readyForProofOrder: boolean;
    stripeKeyMode: StripeKeyMode;
    checks: CheckoutReadinessCheck[];
    actions: string[];
}

export interface CheckoutReadinessConfig {
    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    SUPABASE_URL?: string;
    SUPABASE_SERVICE_ROLE_KEY?: string;
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
    SMTP_HOST?: string;
    SMTP_USER?: string;
    SMTP_PASS?: string;
    GA4_API_SECRET?: string;
    GOOGLE_ANALYTICS_API_SECRET?: string;
    GA4_MEASUREMENT_ID?: string;
    ADMIN_PASSWORD?: string;
    CRON_SECRET?: string;
}

export function getCheckoutReadiness(
    config: CheckoutReadinessConfig = getRuntimeConfig(),
    providerHealth?: { configured: boolean; ok: boolean; message: string },
): CheckoutReadiness {
    const stripeKeyMode = getStripeKeyMode(config.STRIPE_SECRET_KEY);
    const checks: CheckoutReadinessCheck[] = [
        requiredCheck({
            id: 'stripe_secret_key',
            label: 'Stripe secret key',
            configured: Boolean(config.STRIPE_SECRET_KEY),
            valid: stripeKeyMode === 'live',
            missingMessage: 'Stripe checkout cannot create paid sessions without STRIPE_SECRET_KEY.',
            invalidMessage: 'Production should use a live Stripe key before real orders.',
            okMessage: 'Live Stripe key is configured.',
        }),
        requiredCheck({
            id: 'stripe_webhook_secret',
            label: 'Stripe webhook secret',
            configured: Boolean(config.STRIPE_WEBHOOK_SECRET),
            valid: Boolean(config.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_')),
            missingMessage: 'Paid Stripe sessions cannot be trusted without STRIPE_WEBHOOK_SECRET.',
            invalidMessage: 'Webhook secret is present but does not look like a Stripe whsec_ value.',
            okMessage: 'Stripe webhook signing secret is configured.',
        }),
        requiredCheck({
            id: 'supabase_url',
            label: 'Supabase URL',
            configured: Boolean(config.SUPABASE_URL),
            valid: isHttpUrl(config.SUPABASE_URL),
            missingMessage: 'Orders cannot be saved without SUPABASE_URL.',
            invalidMessage: 'SUPABASE_URL is present but is not a valid http(s) URL.',
            okMessage: 'Supabase URL is configured.',
        }),
        requiredCheck({
            id: 'supabase_service_role_key',
            label: 'Supabase service role key',
            configured: Boolean(config.SUPABASE_SERVICE_ROLE_KEY),
            valid: Boolean(config.SUPABASE_SERVICE_ROLE_KEY),
            missingMessage: 'Orders cannot be written server-side without SUPABASE_SERVICE_ROLE_KEY.',
            invalidMessage: 'Supabase service role key is invalid.',
            okMessage: 'Supabase service role key is configured.',
        }),
        requiredCheck({
            id: 'openai_api_key',
            label: 'OpenAI API key',
            configured: Boolean(config.OPENAI_API_KEY),
            valid: Boolean(config.OPENAI_API_KEY),
            missingMessage: 'Paid horoscope content cannot be generated without OPENAI_API_KEY.',
            invalidMessage: 'OpenAI API key is invalid.',
            okMessage: `OpenAI API key is configured for ${config.OPENAI_MODEL || 'gpt-5.6-terra'}.`,
        }),
        ...(providerHealth?.configured ? [requiredCheck({
            id: 'openai_provider_live',
            label: 'OpenAI live provider check',
            configured: true,
            valid: providerHealth.ok,
            missingMessage: providerHealth.message,
            invalidMessage: providerHealth.message,
            okMessage: providerHealth.message,
        })] : []),
        requiredCheck({
            id: 'smtp',
            label: 'Product email SMTP',
            configured: Boolean(config.SMTP_HOST && config.SMTP_USER && config.SMTP_PASS),
            valid: Boolean(config.SMTP_HOST && config.SMTP_USER && config.SMTP_PASS),
            missingMessage: 'Product emails cannot be delivered without SMTP_HOST, SMTP_USER, and SMTP_PASS.',
            invalidMessage: 'SMTP config is incomplete.',
            okMessage: 'SMTP delivery config is complete.',
        }),
        optionalCheck({
            id: 'ga4_measurement_protocol',
            label: 'GA4 server purchase tracking',
            configured: Boolean(config.GA4_API_SECRET || config.GOOGLE_ANALYTICS_API_SECRET),
            okMessage: 'GA4 Measurement Protocol secret is configured.',
            warningMessage: 'Add GA4_API_SECRET so paid test orders create server-side purchase events.',
        }),
        optionalCheck({
            id: 'admin_password',
            label: 'Admin password',
            configured: Boolean(config.ADMIN_PASSWORD),
            okMessage: 'Admin password is configured.',
            warningMessage: 'Set ADMIN_PASSWORD so order diagnostics stay protected.',
        }),
        optionalCheck({
            id: 'cron_secret',
            label: 'Order recovery cron secret',
            configured: Boolean(config.CRON_SECRET),
            okMessage: 'Order recovery cron secret is configured.',
            warningMessage: 'Set CRON_SECRET so the recovery cron can safely retry recent missed product emails.',
        }),
    ];

    const criticalMissing = checks.some((check) => check.severity === 'critical');
    const canAcceptPaidOrders = !criticalMissing;
    const canTrackServerPurchases = checks.find((check) => check.id === 'ga4_measurement_protocol')?.configured || false;
    const readyForProofOrder = canAcceptPaidOrders && canTrackServerPurchases;
    const status = criticalMissing
        ? 'blocked'
        : readyForProofOrder
            ? 'ready'
            : 'needs_attention';

    return {
        status,
        canAcceptPaidOrders,
        canTrackServerPurchases,
        readyForProofOrder,
        stripeKeyMode,
        checks,
        actions: buildActions({ checks, canAcceptPaidOrders, canTrackServerPurchases, readyForProofOrder }),
    };
}

function requiredCheck({
    id,
    label,
    configured,
    valid,
    missingMessage,
    invalidMessage,
    okMessage,
}: {
    id: string;
    label: string;
    configured: boolean;
    valid: boolean;
    missingMessage: string;
    invalidMessage: string;
    okMessage: string;
}): CheckoutReadinessCheck {
    const ok = configured && valid;

    return {
        id,
        label,
        configured: ok,
        required: true,
        severity: ok ? 'ok' : 'critical',
        message: ok ? okMessage : configured ? invalidMessage : missingMessage,
    };
}

function optionalCheck({
    id,
    label,
    configured,
    okMessage,
    warningMessage,
}: {
    id: string;
    label: string;
    configured: boolean;
    okMessage: string;
    warningMessage: string;
}): CheckoutReadinessCheck {
    return {
        id,
        label,
        configured,
        required: false,
        severity: configured ? 'ok' : 'warning',
        message: configured ? okMessage : warningMessage,
    };
}

function buildActions({
    checks,
    canAcceptPaidOrders,
    canTrackServerPurchases,
    readyForProofOrder,
}: {
    checks: CheckoutReadinessCheck[];
    canAcceptPaidOrders: boolean;
    canTrackServerPurchases: boolean;
    readyForProofOrder: boolean;
}): string[] {
    if (readyForProofOrder) {
        return [
            'Run one real paid test order.',
            'Verify Stripe paid checkout, Supabase order row, product email delivery, and GA4 purchase event.',
        ];
    }

    const actions = checks
        .filter((check) => check.severity !== 'ok')
        .map((check) => check.message);

    if (canAcceptPaidOrders && !canTrackServerPurchases) {
        actions.push('After GA4_API_SECRET is added, redeploy before running the paid proof order.');
    }

    return actions;
}

function getStripeKeyMode(value?: string): StripeKeyMode {
    if (!value) return 'missing';
    if (value.startsWith('sk_live_')) return 'live';
    if (value.startsWith('sk_test_')) return 'test';
    return 'unknown';
}

function isHttpUrl(value?: string): boolean {
    if (!value) return false;
    try {
        const parsed = new URL(value);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
}

function getRuntimeConfig(): CheckoutReadinessConfig {
    const env = import.meta.env || {};

    return {
        STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET: env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET,
        SUPABASE_URL: env.SUPABASE_URL || process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
        OPENAI_API_KEY: env.OPENAI_API_KEY || process.env.OPENAI_API_KEY,
        OPENAI_MODEL: env.OPENAI_MODEL || process.env.OPENAI_MODEL,
        SMTP_HOST: env.SMTP_HOST || process.env.SMTP_HOST,
        SMTP_USER: env.SMTP_USER || process.env.SMTP_USER,
        SMTP_PASS: env.SMTP_PASS || process.env.SMTP_PASS,
        GA4_API_SECRET: env.GA4_API_SECRET || process.env.GA4_API_SECRET,
        GOOGLE_ANALYTICS_API_SECRET: env.GOOGLE_ANALYTICS_API_SECRET || process.env.GOOGLE_ANALYTICS_API_SECRET,
        GA4_MEASUREMENT_ID: env.GA4_MEASUREMENT_ID || process.env.GA4_MEASUREMENT_ID,
        ADMIN_PASSWORD: env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD,
        CRON_SECRET: env.CRON_SECRET || process.env.CRON_SECRET,
    };
}
