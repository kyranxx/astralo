/**
 * Authentication Utilities
 * Centralized authentication helpers for admin routes
 */

/**
 * Verify admin password against environment variable
 * Accepts password directly or extracts from Authorization header
 */
export function verifyAdminPassword(passwordOrRequest: string | Request | null): boolean {
    const adminPassword = import.meta.env.ADMIN_PASSWORD;
    if (!adminPassword) return false;

    let password: string | null = null;

    if (typeof passwordOrRequest === 'string') {
        password = passwordOrRequest;
    } else if (passwordOrRequest instanceof Request) {
        // Check Authorization header first (preferred)
        const authHeader = passwordOrRequest.headers.get('Authorization');
        if (authHeader?.startsWith('Bearer ')) {
            password = authHeader.slice(7);
        }
    }

    return password === adminPassword;
}

/**
 * Extract password from request (Authorization header or URL param as fallback)
 */
export function getPasswordFromRequest(request: Request, url?: URL): string | null {
    // Prefer Authorization header
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }
    // Fallback to URL param (for backward compatibility, but less secure)
    if (url) {
        return url.searchParams.get('password');
    }
    return null;
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
