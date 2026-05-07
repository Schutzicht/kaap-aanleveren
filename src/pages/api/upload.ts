import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
    return new Response(JSON.stringify({
        success: false,
        error: 'Foto-uploads zijn tijdelijk uitgeschakeld. Plak voorlopig een link naar Drive of WeTransfer in het formulier.'
    }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
    });
};
