/**
 * Orders Management System
 * Stores order data for admin dashboard with PDF links
 */

import fs from 'fs';
import path from 'path';

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

    // Refund info
    refundedAt?: string;
    refundReason?: string;
    stripeRefundId?: string;
}

export interface OrdersData {
    orders: Order[];
    lastUpdated: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PDFS_DIR = path.resolve(process.cwd(), 'public', 'pdfs');

// Ensure directories exist
function ensureDirectories() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PDFS_DIR)) {
        fs.mkdirSync(PDFS_DIR, { recursive: true });
    }
}

// Load orders from file
export function loadOrders(): OrdersData {
    ensureDirectories();

    if (!fs.existsSync(ORDERS_FILE)) {
        return { orders: [], lastUpdated: new Date().toISOString() };
    }

    try {
        const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading orders:', error);
        return { orders: [], lastUpdated: new Date().toISOString() };
    }
}

// Save orders to file
export function saveOrders(data: OrdersData): void {
    ensureDirectories();
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2));
}

// Add new order
export function addOrder(order: Order): void {
    const data = loadOrders();
    data.orders.push(order);
    saveOrders(data);
}

// Update order by ID
export function updateOrder(orderId: string, updates: Partial<Order>): Order | null {
    const data = loadOrders();
    const index = data.orders.findIndex(o => o.id === orderId);

    if (index === -1) return null;

    data.orders[index] = { ...data.orders[index], ...updates };
    saveOrders(data);
    return data.orders[index];
}

// Find order by Stripe session ID
export function findOrderBySessionId(sessionId: string): Order | null {
    const data = loadOrders();
    return data.orders.find(o => o.stripeSessionId === sessionId) || null;
}

// Find order by ID
export function findOrderById(orderId: string): Order | null {
    const data = loadOrders();
    return data.orders.find(o => o.id === orderId) || null;
}

// Get statistics
export function getStatistics() {
    const data = loadOrders();
    const orders = data.orders;

    const completedOrders = orders.filter(o => o.status === 'completed');
    const refundedOrders = orders.filter(o => o.status === 'refunded');

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
        totalOrders: orders.length,
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
        lastUpdated: data.lastUpdated
    };
}

// Generate unique order ID
export function generateOrderId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `AST-${timestamp}-${random}`;
}

// Clean old PDFs (older than 14 days)
export function cleanOldPDFs(): number {
    if (!fs.existsSync(PDFS_DIR)) return 0;

    const now = Date.now();
    const maxAge = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
    let deletedCount = 0;

    const files = fs.readdirSync(PDFS_DIR);
    files.forEach(file => {
        const filePath = path.join(PDFS_DIR, file);
        const stats = fs.statSync(filePath);

        if (now - stats.mtime.getTime() > maxAge) {
            fs.unlinkSync(filePath);
            deletedCount++;
        }
    });

    return deletedCount;
}

// Save horoscope PDF and return URL
export function saveHoroscopePDF(orderId: string, pdfBuffer: Uint8Array): string {
    ensureDirectories();

    const filename = `horoscope_${orderId}.pdf`;
    const filePath = path.join(PDFS_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(pdfBuffer));

    return `/pdfs/${filename}`;
}
