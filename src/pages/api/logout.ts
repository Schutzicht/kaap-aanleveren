import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, redirect }) => {
    cookies.delete('kaap_auth', { path: '/' });
    return redirect('/', 302);
};
