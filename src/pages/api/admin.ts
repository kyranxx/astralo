import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import {
    loadOrders,
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
    const { action, orderId, reason } = body;

    // Get password from Authorization header
    const password = getPasswordFromRequest(request);

    // Password protection using centralized auth
    if (!verifyAdminPassword(password)) {
        return createUnauthorizedResponse();
    }

    try {
        switch (action) {
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

                const stripe = new Stripe(stripeKey, {
                    apiVersion: '2026-11-20.acacia' as any,
                });

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
