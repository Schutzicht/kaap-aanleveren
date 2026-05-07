import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({
        ok: true,
        time: new Date().toISOString(),
        node: typeof process !== 'undefined' ? process.version : 'unknown'
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
