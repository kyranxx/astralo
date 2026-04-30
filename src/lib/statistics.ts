/**
 * Statistics Calculation Utilities
 * Extracted from orders.ts for better separation of concerns
 */

import type { Order } from './orders';

export interface RevenueByCountry {
    country: string;
    countryCode: string;
    revenue: number;
    orders: number;
}

export interface RevenueByProduct {
    product: string;
    revenue: number;
    orders: number;
}

export interface MonthlyData {
    month: string;
    revenue: number;
    orders: number;
}

export interface DailyData {
    day: string;
    revenue: number;
    orders: number;
}

export interface Statistics {
    totalRevenue: number;
    totalOrders: number;
    completedOrders: number;
    refundedOrders: number;
    refundedAmount: number;
    freeSubscribers: number;
    freeSubscribersInline: number;
    freeSubscribersPopup: number;
    revenueByCountry: RevenueByCountry[];
    revenueByProduct: RevenueByProduct[];
    monthlyData: MonthlyData[];
    dailyData: DailyData[];
    dateRange: { startDate?: string; endDate?: string };
    lastUpdated: string;
}

/**
 * Calculate revenue grouped by country
 */
export function calculateRevenueByCountry(orders: Order[]): RevenueByCountry[] {
    const countryMap: Record<string, { revenue: number; orders: number; countryCode: string }> = {};

    orders.forEach(order => {
        const country = order.country || 'Unknown';
        if (!countryMap[country]) {
            countryMap[country] = { revenue: 0, orders: 0, countryCode: order.countryCode || '' };
        }
        countryMap[country].revenue += order.amount;
        countryMap[country].orders += 1;
    });

    return Object.entries(countryMap)
        .map(([country, data]) => ({
            country,
            countryCode: data.countryCode,
            revenue: data.revenue / 100, // Convert cents to euros
            orders: data.orders
        }))
        .sort((a, b) => b.revenue - a.revenue);
}

/**
 * Calculate revenue grouped by product
 */
export function calculateRevenueByProduct(orders: Order[]): RevenueByProduct[] {
    const productMap: Record<string, { revenue: number; orders: number }> = {};

    orders.forEach(order => {
        const product = order.productName;
        if (!productMap[product]) {
            productMap[product] = { revenue: 0, orders: 0 };
        }
        productMap[product].revenue += order.amount;
        productMap[product].orders += 1;
    });

    return Object.entries(productMap)
        .map(([product, data]) => ({
            product,
            revenue: data.revenue / 100,
            orders: data.orders
        }))
        .sort((a, b) => b.revenue - a.revenue);
}

/**
 * Calculate monthly data for the last 12 months
 */
export function calculateMonthlyData(orders: Order[]): MonthlyData[] {
    const now = new Date();
    const last12Months: Record<string, { revenue: number; orders: number }> = {};

    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        last12Months[key] = { revenue: 0, orders: 0 };
    }

    // Populate with order data
    orders.forEach(order => {
        const date = new Date(order.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (last12Months[monthKey]) {
            last12Months[monthKey].revenue += order.amount;
            last12Months[monthKey].orders += 1;
        }
    });

    return Object.entries(last12Months)
        .map(([month, data]) => ({
            month,
            revenue: data.revenue / 100,
            orders: data.orders
        }));
}

/**
 * Calculate daily data for a given period
 */
export function calculateDailyData(orders: Order[]): DailyData[] {
    const dailyMap: Record<string, { revenue: number; orders: number }> = {};

    orders.forEach(order => {
        const date = new Date(order.createdAt);
        const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        if (!dailyMap[dayKey]) {
            dailyMap[dayKey] = { revenue: 0, orders: 0 };
        }
        dailyMap[dayKey].revenue += order.amount;
        dailyMap[dayKey].orders += 1;
    });

    return Object.entries(dailyMap)
        .map(([day, data]) => ({
            day,
            revenue: data.revenue / 100,
            orders: data.orders
        }))
        .sort((a, b) => a.day.localeCompare(b.day));
}

/**
 * Create empty statistics object
 */
export function createEmptyStatistics(startDate?: string, endDate?: string): Statistics {
    return {
        totalRevenue: 0,
        totalOrders: 0,
        completedOrders: 0,
        refundedOrders: 0,
        refundedAmount: 0,
        freeSubscribers: 0,
        freeSubscribersInline: 0,
        freeSubscribersPopup: 0,
        revenueByCountry: [],
        revenueByProduct: [],
        monthlyData: [],
        dailyData: [],
        lastUpdated: new Date().toISOString(),
        dateRange: { startDate, endDate }
    };
}
