/**
 * Orders Management System
 * Stores order data in Supabase for admin dashboard
 */

import { supabase, type OrderRow } from './supabase';

export interface Order {
    id: string;
    stripeSessionId: string;
    stripePaymentIntentId?: string;
    createdAt: string;

    // Customer info
    customerEmail: string;
    customerName: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;

    // Partner info (for partner horoscope)
    partnerName?: string;
    partnerBirthDate?: string;
    partnerBirthTime?: string;
    partnerBirthPlace?: string;

    // Product info
    productKey: 'daily' | 'weekly' | 'monthly' | 'partner';
    productName: string;
    amount: number; // in cents
    currency: string;

    // Location info
    country: string;
    countryCode: string;

    // Status
    status: 'pending' | 'completed' | 'refunded' | 'failed';

    // Files
    horoscopePdfPath?: string;
    horoscopePdfUrl?: string;
    horoscopeContent?: string;

    // Language
    lang: string;

    // Email
    emailSentAt?: string;

    // Refund info
    refundedAt?: string;
    refundReason?: string;
    stripeRefundId?: string;
}

export interface OrdersData {
    orders: Order[];
    lastUpdated: string;
}

// Convert database row to Order interface (snake_case to camelCase)
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

// Convert Order interface to database row (camelCase to snake_case)
function orderToRow(order: Order): Partial<OrderRow> {
    return {
        id: order.id,
        stripe_session_id: order.stripeSessionId,
        stripe_payment_intent_id: order.stripePaymentIntentId || null,
        created_at: order.createdAt,
        customer_email: order.customerEmail,
        customer_name: order.customerName,
        birth_date: order.birthDate || null,
        birth_time: order.birthTime || null,
        birth_place: order.birthPlace || null,
        partner_name: order.partnerName || null,
        partner_birth_date: order.partnerBirthDate || null,
        partner_birth_time: order.partnerBirthTime || null,
        partner_birth_place: order.partnerBirthPlace || null,
        product_key: order.productKey,
        product_name: order.productName,
        amount: order.amount,
        currency: order.currency,
        country: order.country || null,
        country_code: order.countryCode || null,
        status: order.status,
        horoscope_pdf_path: order.horoscopePdfPath || null,
        horoscope_pdf_url: order.horoscopePdfUrl || null,
        horoscope_content: order.horoscopeContent || null,
        lang: order.lang,
        email_sent_at: order.emailSentAt || null,
        refunded_at: order.refundedAt || null,
        refund_reason: order.refundReason || null,
        stripe_refund_id: order.stripeRefundId || null,
    };
}

// Load all orders from Supabase
export async function loadOrders(): Promise<OrdersData> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error loading orders from Supabase:', error);
        return { orders: [], lastUpdated: new Date().toISOString() };
    }

    const orders = (data || []).map(rowToOrder);
    return { orders, lastUpdated: new Date().toISOString() };
}

// Add new order to Supabase
export async function addOrder(order: Order): Promise<void> {
    const row = orderToRow(order);

    const { error } = await supabase
        .from('orders')
        .insert(row);

    if (error) {
        console.error('Error adding order to Supabase:', error);
        throw new Error(`Failed to add order: ${error.message}`);
    }
}

// Update order by ID
export async function updateOrder(orderId: string, updates: Partial<Order>): Promise<Order | null> {
    // Convert camelCase updates to snake_case
    const dbUpdates: Record<string, any> = {};

    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.refundedAt !== undefined) dbUpdates.refunded_at = updates.refundedAt;
    if (updates.refundReason !== undefined) dbUpdates.refund_reason = updates.refundReason;
    if (updates.stripeRefundId !== undefined) dbUpdates.stripe_refund_id = updates.stripeRefundId;
    if (updates.horoscopePdfPath !== undefined) dbUpdates.horoscope_pdf_path = updates.horoscopePdfPath;
    if (updates.horoscopePdfUrl !== undefined) dbUpdates.horoscope_pdf_url = updates.horoscopePdfUrl;
    if (updates.horoscopeContent !== undefined) dbUpdates.horoscope_content = updates.horoscopeContent;
    if (updates.emailSentAt !== undefined) dbUpdates.email_sent_at = updates.emailSentAt;
    if (updates.stripePaymentIntentId !== undefined) dbUpdates.stripe_payment_intent_id = updates.stripePaymentIntentId;

    const { data, error } = await supabase
        .from('orders')
        .update(dbUpdates)
        .eq('id', orderId)
        .select()
        .single();

    if (error) {
        console.error('Error updating order in Supabase:', error);
        return null;
    }

    return data ? rowToOrder(data) : null;
}

// Find order by Stripe session ID
export async function findOrderBySessionId(sessionId: string): Promise<Order | null> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') { // Not found error
            console.error('Error finding order by session ID:', error);
        }
        return null;
    }

    return data ? rowToOrder(data) : null;
}

// Find order by ID
export async function findOrderById(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') { // Not found error
            console.error('Error finding order by ID:', error);
        }
        return null;
    }

    return data ? rowToOrder(data) : null;
}

// Get statistics from Supabase
export async function getStatistics() {
    const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error loading orders for statistics:', error);
        return {
            totalRevenue: 0,
            totalOrders: 0,
            completedOrders: 0,
            refundedOrders: 0,
            refundedAmount: 0,
            revenueByCountry: [],
            revenueByProduct: [],
            monthlyData: [],
            lastUpdated: new Date().toISOString()
        };
    }

    const allOrders = (orders || []).map(rowToOrder);
    const completedOrders = allOrders.filter(o => o.status === 'completed');
    const refundedOrders = allOrders.filter(o => o.status === 'refunded');

    // Total revenue (completed orders only)
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.amount, 0);

    // Revenue by country
    const revenueByCountry: Record<string, { revenue: number; orders: number; countryCode: string }> = {};
    completedOrders.forEach(order => {
        const country = order.country || 'Unknown';
        if (!revenueByCountry[country]) {
            revenueByCountry[country] = { revenue: 0, orders: 0, countryCode: order.countryCode || '' };
        }
        revenueByCountry[country].revenue += order.amount;
        revenueByCountry[country].orders += 1;
    });

    // Revenue by product
    const revenueByProduct: Record<string, { revenue: number; orders: number }> = {};
    completedOrders.forEach(order => {
        const product = order.productName;
        if (!revenueByProduct[product]) {
            revenueByProduct[product] = { revenue: 0, orders: 0 };
        }
        revenueByProduct[product].revenue += order.amount;
        revenueByProduct[product].orders += 1;
    });

    // Orders by month (last 12 months)
    const last12Months: Record<string, { revenue: number; orders: number }> = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        last12Months[key] = { revenue: 0, orders: 0 };
    }

    completedOrders.forEach(order => {
        const date = new Date(order.createdAt);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (last12Months[key]) {
            last12Months[key].revenue += order.amount;
            last12Months[key].orders += 1;
        }
    });

    return {
        totalRevenue: totalRevenue / 100, // Convert cents to euros
        totalOrders: allOrders.length,
        completedOrders: completedOrders.length,
        refundedOrders: refundedOrders.length,
        refundedAmount: refundedOrders.reduce((sum, o) => sum + o.amount, 0) / 100,
        revenueByCountry: Object.entries(revenueByCountry)
            .map(([country, data]) => ({
                country,
                countryCode: data.countryCode,
                revenue: data.revenue / 100,
                orders: data.orders
            }))
            .sort((a, b) => b.revenue - a.revenue),
        revenueByProduct: Object.entries(revenueByProduct)
            .map(([product, data]) => ({
                product,
                revenue: data.revenue / 100,
                orders: data.orders
            }))
            .sort((a, b) => b.revenue - a.revenue),
        monthlyData: Object.entries(last12Months)
            .map(([month, data]) => ({
                month,
                revenue: data.revenue / 100,
                orders: data.orders
            })),
        lastUpdated: new Date().toISOString()
    };
}

// Generate unique order ID
export function generateOrderId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `AST-${timestamp}-${random}`;
}

// Note: cleanOldPDFs function removed as PDFs should be stored in Supabase Storage
// or a CDN in production, not filesystem
