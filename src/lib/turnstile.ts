export interface TurnstileVerificationOptions {
    token: string;
    secret: string;
    remoteIp?: string;
    expectedAction?: string;
    allowedHostnames?: string[];
    fetchImpl?: typeof fetch;
}

interface TurnstileSiteverifyResponse {
    success?: boolean;
    hostname?: string;
    action?: string;
    'error-codes'?: string[];
}

export interface TurnstileVerificationResult {
    success: boolean;
    errorCodes: string[];
}

const DEFAULT_ALLOWED_HOSTNAMES = [
    'astralo.online',
    'www.astralo.online',
    'localhost',
    '127.0.0.1',
];

export async function verifyTurnstileToken({
    token,
    secret,
    remoteIp,
    expectedAction,
    allowedHostnames = DEFAULT_ALLOWED_HOSTNAMES,
    fetchImpl = fetch,
}: TurnstileVerificationOptions): Promise<TurnstileVerificationResult> {
    if (!token || !secret) {
        return { success: false, errorCodes: ['missing-input'] };
    }

    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set('remoteip', remoteIp);

    try {
        const response = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });

        if (!response.ok) {
            return { success: false, errorCodes: ['siteverify-http-error'] };
        }

        const result = await response.json() as TurnstileSiteverifyResponse;
        const hostnameAllowed = typeof result.hostname === 'string'
            && (allowedHostnames.includes(result.hostname) || result.hostname.endsWith('.vercel.app'));
        const actionMatches = !expectedAction || result.action === expectedAction;

        if (!result.success || !hostnameAllowed || !actionMatches) {
            const errorCodes = Array.isArray(result['error-codes']) ? [...result['error-codes']] : [];
            if (!hostnameAllowed) errorCodes.push('hostname-mismatch');
            if (!actionMatches) errorCodes.push('action-mismatch');
            return { success: false, errorCodes };
        }

        return { success: true, errorCodes: [] };
    } catch {
        return { success: false, errorCodes: ['siteverify-unavailable'] };
    }
}
