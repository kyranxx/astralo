import type { APIRoute } from 'astro';
import { getPasswordFromRequest, verifyAdminPassword } from '../../lib/auth';
import { recoverMissingProductEmails } from '../../lib/order-email-recovery';

export const maxDuration = 60;

const { CRON_SECRET } = import.meta.env;

function isAuthorized(request: Request): boolean {
    const authHeader = request.headers.get('authorization');

    if (CRON_SECRET && authHeader === `Bearer ${CRON_SECRET}`) {
        return true;
    }

    if (import.meta.env.DEV) {
        const password = getPasswordFromRequest(request);
        return verifyAdminPassword(password);
    }

    return false;
}

export const GET: APIRoute = async ({ request }) => {
    if (!isAuthorized(request)) {
        return json({ error: 'Unauthorized' }, 401);
    }

    const url = new URL(request.url);
    const dryRun = isTruthy(url.searchParams.get('dryRun'));
    const limit = numberParam(url.searchParams.get('limit'), 3);
    const minAgeMinutes = numberParam(url.searchParams.get('minAgeMinutes'), 30);
    const maxAgeDays = numberParam(url.searchParams.get('maxAgeDays'), 14);

    try {
        const result = await recoverMissingProductEmails({
            dryRun,
            limit,
            minAgeMinutes,
            maxAgeDays,
        });

        return json(result, result.ok ? 200 : 207);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown recovery error';
        console.error('Order recovery failed:', error);
        return json({ ok: false, error: message }, 500);
    }
};

function isTruthy(value: string | null): boolean {
    return value === '1' || value === 'true' || value === 'yes';
}

function numberParam(value: string | null, fallback: number): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
    return Math.floor(parsed);
}

function json(body: unknown, status: number) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    });
}
