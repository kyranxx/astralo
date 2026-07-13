import type { Order } from './orders.ts';

export function needsProductEmailFulfillment(
    order: Pick<Order, 'status' | 'customerEmail' | 'emailSentAt'>
): boolean {
    return order.status === 'completed'
        && Boolean(order.customerEmail?.trim())
        && !order.emailSentAt;
}
