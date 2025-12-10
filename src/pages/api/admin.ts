import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import {
    loadOrders,
    getStatistics,
    updateOrder,
    findOrderById,
    cleanOldPDFs
} from '../../lib/orders';

export const GET: APIRoute = async ({ url }) => {
    const action = url.searchParams.get('action') || 'stats';
    const password = url.searchParams.get('password');

    // Password protection using environment variable
    const adminPassword = import.meta.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        switch (action) {
            case 'stats':
                return new Response(JSON.stringify(getStatistics()), {
                    headers: { 'Content-Type': 'application/json' }
                });

            case 'orders':
                const { orders } = loadOrders();
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

                return new Response(JSON.stringify({
                    orders: paginatedOrders,
                    total: filteredOrders.length,
                    page,
                    limit,
                    totalPages: Math.ceil(filteredOrders.length / limit)
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });

            case 'order':
                const orderId = url.searchParams.get('id');
                if (!orderId) {
                    return new Response(JSON.stringify({ error: 'Order ID required' }), { status: 400 });
                }
                const order = findOrderById(orderId);
                if (!order) {
                    return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
                }
                return new Response(JSON.stringify(order), {
                    headers: { 'Content-Type': 'application/json' }
                });

            case 'cleanup':
                const deleted = cleanOldPDFs();
                return new Response(JSON.stringify({
                    success: true,
                    deletedFiles: deleted,
                    message: `Cleaned up ${deleted} old PDF files`
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });

            default:
                return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
        }
    } catch (error: any) {
        console.error('Admin API error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { action, password, orderId, reason } = body;

    // Password protection using environment variable
    const adminPassword = import.meta.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        switch (action) {
            case 'refund':
                if (!orderId) {
                    return new Response(JSON.stringify({ error: 'Order ID required' }), { status: 400 });
                }

                const order = findOrderById(orderId);
                if (!order) {
                    return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
                }

                if (order.status === 'refunded') {
                    return new Response(JSON.stringify({ error: 'Order already refunded' }), { status: 400 });
                }

                // Process Stripe refund
                const stripeKey = import.meta.env.STRIPE_SECRET_KEY;
                if (!stripeKey) {
                    return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 500 });
                }

                const stripe = new Stripe(stripeKey, {
                    apiVersion: '2024-11-20.acacia' as any,
                });

                if (!order.stripePaymentIntentId) {
                    return new Response(JSON.stringify({ error: 'No payment intent found for this order' }), { status: 400 });
                }

                const refund = await stripe.refunds.create({
                    payment_intent: order.stripePaymentIntentId,
                    reason: 'requested_by_customer'
                });

                // Update order status
                updateOrder(orderId, {
                    status: 'refunded',
                    refundedAt: new Date().toISOString(),
                    refundReason: reason || 'Customer request',
                    stripeRefundId: refund.id
                });

                return new Response(JSON.stringify({
                    success: true,
                    refundId: refund.id,
                    message: 'Refund processed successfully'
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });

            default:
                return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
        }
    } catch (error: any) {
        console.error('Admin API error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
