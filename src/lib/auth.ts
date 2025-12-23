/**
 * Authentication Utilities
 * Centralized authentication helpers for admin routes
 */

/**
 * Verify admin password against environment variable
 */
export function verifyAdminPassword(password: string | null): boolean {
    const adminPassword = import.meta.env.ADMIN_PASSWORD;
    return !!(adminPassword && password === adminPassword);
}

/**
 * Create unauthorized response
 */
export function createUnauthorizedResponse(): Response {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * Create JSON response helper
 */
export function createJsonResponse(data: any, status: number = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * Create error response
 */
export function createErrorResponse(message: string, status: number = 400): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}
