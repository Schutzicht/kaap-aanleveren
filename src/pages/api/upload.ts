import type { APIRoute } from 'astro';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export const POST: APIRoute = async ({ request }) => {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                return {
                    allowedContentTypes: [
                        'image/jpeg',
                        'image/png',
                        'image/webp',
                        'image/gif',
                        'image/heic',
                        'image/heif'
                    ],
                    maximumSizeInBytes: 20 * 1024 * 1024,
                    addRandomSuffix: true,
                    tokenPayload: JSON.stringify({ pathname })
                };
            },
            onUploadCompleted: async ({ blob }) => {
                console.log('KAAP exposition upload completed:', blob.url);
            }
        });

        return new Response(JSON.stringify(jsonResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Upload mislukt.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
