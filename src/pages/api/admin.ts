import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import {
    loadOrders,
    loadFreeSubscribers,
    getStatistics,
    updateOrder,
    findOrderById
} from '../../lib/orders';
import {
    verifyAdminPassword,
    getPasswordFromRequest,
    createUnauthorizedResponse,
    createJsonResponse,
    createErrorResponse
} from '../../lib/auth';
import { getCheckoutReadiness } from '../../lib/checkout-readiness';
import { verifyOpenAIProvider } from '../../lib/horoscope-ai';
import { fulfillOrder, generateHoroscopeContent, sendFulfillmentPreviewToOwner } from '../../lib/fulfillment';
import { buildFulfillmentEmail } from '../../lib/fulfillment-email-template';

export const maxDuration = 60;

export const GET: APIRoute = async ({ request, url }) => {
    const action = url.searchParams.get('action') || 'stats';

    const password = getPasswordFromRequest(request);

    // Password protection using centralized auth
    if (!verifyAdminPassword(password)) {
        return createUnauthorizedResponse();
    }

    try {
        switch (action) {
            case 'stats':
                const startDate = url.searchParams.get('startDate') || undefined;
                const endDate = url.searchParams.get('endDate') || undefined;
                const stats = await getStatistics(startDate, endDate);
                return createJsonResponse(stats);

            case 'orders':
                const { orders } = await loadOrders();
                const page = parseInt(url.searchParams.get('page') || '1');
                const limit = parseInt(url.searchParams.get('limit') || '20');
                const status = url.searchParams.get('status');
                const country = url.searchParams.get('country');
                const search = url.searchParams.get('search')?.toLowerCase();

                let filteredOrders = orders;

                // Filter by status
                if (status && status !== 'all') {
                    filteredOrders = filteredOrders.filter(o => o.status === status);
                }

                // Filter by country
                if (country && country !== 'all') {
                    filteredOrders = filteredOrders.filter(o => o.countryCode === country);
                }

                // Search by email or name
                if (search) {
                    filteredOrders = filteredOrders.filter(o =>
                        o.customerEmail.toLowerCase().includes(search) ||
                        o.customerName.toLowerCase().includes(search) ||
                        o.id.toLowerCase().includes(search)
                    );
                }

                // Sort by date descending
                filteredOrders.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );

                // Paginate
                const start = (page - 1) * limit;
                const paginatedOrders = filteredOrders.slice(start, start + limit);

                return createJsonResponse({
                    orders: paginatedOrders,
                    total: filteredOrders.length,
                    page,
                    limit,
                    totalPages: Math.ceil(filteredOrders.length / limit)
                });

            case 'subscribers':
                const subscribersStartDate = url.searchParams.get('startDate') || undefined;
                const subscribersEndDate = url.searchParams.get('endDate') || undefined;
                const subscribersPage = parseInt(url.searchParams.get('page') || '1');
                const subscribersLimit = parseInt(url.searchParams.get('limit') || '20');
                const subscribersSource = url.searchParams.get('source');
                const subscribersSearch = url.searchParams.get('search') || undefined;

                const subscribers = await loadFreeSubscribers({
                    startDate: subscribersStartDate,
                    endDate: subscribersEndDate,
                    page: subscribersPage,
                    limit: subscribersLimit,
                    source: subscribersSource,
                    search: subscribersSearch,
                });

                return createJsonResponse(subscribers);

            case 'order':
                const orderId = url.searchParams.get('id');
                if (!orderId) {
                    return createErrorResponse('Order ID required', 400);
                }
                const order = await findOrderById(orderId);
                if (!order) {
                    return createErrorResponse('Order not found', 404);
                }
                return createJsonResponse(order);

            case 'readiness':
                return createJsonResponse(getCheckoutReadiness(undefined, await verifyOpenAIProvider()));

            default:
                return createErrorResponse('Invalid action', 400);
        }
    } catch (error: any) {
        console.error('Admin API error:', error);
        return createErrorResponse(error.message, 500);
    }
};

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { action, orderId, reason, serviceMessage, content } = body;

    // Get password from Authorization header
    const password = getPasswordFromRequest(request);

    // Password protection using centralized auth
    if (!verifyAdminPassword(password)) {
        return createUnauthorizedResponse();
    }

    try {
        switch (action) {
            case 'send-fulfillment-preview': {
                if (!orderId) {
                    return createErrorResponse('Order ID required', 400);
                }
                if (typeof content !== 'string' || !content.trim()) {
                    return createErrorResponse('Preview content required', 400);
                }

                const order = await findOrderById(orderId);
                if (!order) {
                    return createErrorResponse('Order not found', 404);
                }

                await sendFulfillmentPreviewToOwner(order, content.trim().slice(0, 50_000), {
                    serviceMessage: typeof serviceMessage === 'string'
                        ? serviceMessage.trim().slice(0, 2000)
                        : undefined,
                });

                return createJsonResponse({
                    success: true,
                    previewOnly: true,
                    customerContacted: false,
                    message: 'Full fulfillment preview sent to the configured owner inbox',
                });
            }

            case 'preview-fulfillment': {
                if (!orderId) {
                    return createErrorResponse('Order ID required', 400);
                }

                const order = await findOrderById(orderId);
                if (!order) {
                    return createErrorResponse('Order not found', 404);
                }

                const content = order.horoscopeContent || await generateHoroscopeContent(order);
                const email = buildFulfillmentEmail(order, content, '', {
                    serviceMessage: typeof serviceMessage === 'string'
                        ? serviceMessage.trim().slice(0, 2000)
                        : undefined,
                });

                return createJsonResponse({
                    success: true,
                    previewOnly: true,
                    subject: email.subject,
                    html: email.html,
                    content,
                });
            }

            case 'fulfill-order': {
                if (!orderId) {
                    return createErrorResponse('Order ID required', 400);
                }

                const order = await findOrderById(orderId);
                if (!order) {
                    return createErrorResponse('Order not found', 404);
                }
                if (order.emailSentAt) {
                    return createErrorResponse('Order email has already been sent', 409);
                }
                if (typeof serviceMessage !== 'string' || !serviceMessage.trim()) {
                    return createErrorResponse('Customer service message required', 400);
                }

                await fulfillOrder(order, null, 'Invoice.pdf', '', {
                    serviceMessage: serviceMessage.trim().slice(0, 2000),
                });

                return createJsonResponse({
                    success: true,
                    message: 'Order fulfilled and customer email sent',
                });
            }

            case 'refund':
                if (!orderId) {
                    return createErrorResponse('Order ID required', 400);
                }

                const order = await findOrderById(orderId);
                if (!order) {
                    return createErrorResponse('Order not found', 404);
                }

                if (order.status === 'refunded') {
                    return createErrorResponse('Order already refunded', 400);
                }

                // Process Stripe refund
                const stripeKey = import.meta.env.STRIPE_SECRET_KEY;
                if (!stripeKey) {
                    return createErrorResponse('Stripe not configured', 500);
                }

                const stripe = new Stripe(stripeKey);

                if (!order.stripePaymentIntentId) {
                    return createErrorResponse('No payment intent found for this order', 400);
                }

                const refund = await stripe.refunds.create({
                    payment_intent: order.stripePaymentIntentId,
                    reason: 'requested_by_customer'
                });

                // Update order status
                await updateOrder(orderId, {
                    status: 'refunded',
                    refundedAt: new Date().toISOString(),
                    refundReason: reason || 'Customer request',
                    stripeRefundId: refund.id
                });

                return createJsonResponse({
                    success: true,
                    refundId: refund.id,
                    message: 'Refund processed successfully'
                });

            default:
                return createErrorResponse('Invalid action', 400);
        }
    } catch (error: any) {
        console.error('Admin API error:', error);
        return createErrorResponse(error.message, 500);
    }
};
