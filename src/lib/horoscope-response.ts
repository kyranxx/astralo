import type { Order } from './orders.ts';

export function buildHoroscopeResponseFromOrder(order: Order, price: number, fulfillmentToken: string) {
    const response = {
        horoscope: order.horoscopeContent || '',
        product: order.productKey,
        email: order.customerEmail,
        name: order.customerName,
        price,
        lang: order.lang,
        fulfillmentToken,
        emailSent: Boolean(order.emailSentAt),
    };

    if (response.emailSent) {
        return {
            ...response,
            error: 'already_processed',
            message: 'Horoscope already generated and emailed',
        };
    }

    return response;
}