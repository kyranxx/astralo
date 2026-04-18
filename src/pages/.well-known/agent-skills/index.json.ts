import type { APIRoute } from 'astro';
import { agentSkills, sha256 } from '../../../lib/agent-ready';
import { siteUrl } from '../../../lib/seo';

function buildIndex() {
    return JSON.stringify({
        $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
        skills: agentSkills.map((skill) => ({
            name: skill.name,
            type: skill.type,
            description: skill.description,
            url: `${siteUrl}/.well-known/agent-skills/${skill.slug}/SKILL.md`,
            digest: sha256(skill.body),
        })),
    }, null, 2);
}

function createResponse(body: string | null) {
    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}

export const GET: APIRoute = async () => createResponse(buildIndex());
export const HEAD: APIRoute = async () => createResponse(null);

