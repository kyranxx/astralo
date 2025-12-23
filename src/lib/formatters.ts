/**
 * Shared Formatters and Utilities
 * Centralized formatting functions to avoid duplication
 */

// Date formatting options
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
};

export const DATETIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    ...DATE_FORMAT_OPTIONS,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

export const DEFAULT_LOCALE = 'en-GB';

/**
 * Format a date string to localized date format
 */
export function formatDate(dateString: string, locale: string = DEFAULT_LOCALE): string {
    return new Date(dateString).toLocaleDateString(locale, DATE_FORMAT_OPTIONS);
}

/**
 * Format a date string to localized datetime format
 */
export function formatDateTime(dateString: string, locale: string = DEFAULT_LOCALE): string {
    return new Date(dateString).toLocaleString(locale, DATETIME_FORMAT_OPTIONS);
}

/**
 * Format amount from cents to currency string
 */
export function formatAmount(amountInCents: number, currency: string = '€'): string {
    return `${currency}${(amountInCents / 100).toFixed(2)}`;
}

/**
 * Format amount for display (no currency symbol, just value)
 */
export function formatAmountValue(amountInCents: number): string {
    return (amountInCents / 100).toFixed(2);
}

/**
 * Get status badge CSS class based on order status
 */
export function getStatusBadgeClass(status: string): string {
    switch (status) {
        case 'completed':
            return 'status-completed';
        case 'refunded':
            return 'status-refunded';
        case 'pending':
            return 'status-pending';
        default:
            return 'status-pending';
    }
}

/**
 * Truncate order ID for display
 */
export function formatOrderId(orderId: string): string {
    return `#${orderId.slice(-8).toUpperCase()}`;
}

/**
 * Generate unique order ID
 */
export function generateOrderId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `AST-${timestamp}-${random}`;
}
