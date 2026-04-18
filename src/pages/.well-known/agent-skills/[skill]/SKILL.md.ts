import type { APIRoute } from 'astro';
import { getAgentSkill } from '../../../../lib/agent-ready';

function createResponse(body: string | null, status = 200) {
    return new Response(body, {
        status,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}

export const GET: APIRoute = async ({ params }) => {
    const skill = getAgentSkill(params.skill || '');

    if (!skill) {
        return createResponse('# Skill not found\n', 404);
    }

    return createResponse(skill.body);
};

export const HEAD: APIRoute = async ({ params }) => {
    const skill = getAgentSkill(params.skill || '');
    return createResponse(null, skill ? 200 : 404);
};

