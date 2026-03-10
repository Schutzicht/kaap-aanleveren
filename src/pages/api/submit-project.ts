import type { APIRoute } from 'astro';
import db from '../../db/database';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();
        const title = data.get('title')?.toString() || '';
        const summary = data.get('summary')?.toString() || '';
        const description = data.get('description')?.toString() || '';
        const transitionTheme = data.get('transitionTheme')?.toString() || 'Algemeen';
        const partners = data.get('partners')?.toString() || '';
        const contactName = data.get('contactName')?.toString() || '';
        const contactEmail = data.get('contactEmail')?.toString() || '';
        const mediaLinks = data.get('mediaLinks')?.toString() || '';
        const externalLinks = data.get('externalLinks')?.toString() || '';
        const callToAction = data.get('callToAction')?.toString() || '';
        const obligations = data.get('obligations')?.toString() || '';

        // Simple validation lengths
        if (!title || !summary || !description) {
            return new Response(JSON.stringify({ success: false, error: 'Vul tenminste de verplichte velden in.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const stmt = db.prepare(`
        INSERT INTO projects (title, summary, description, transitionTheme, partners, contactName, contactEmail, mediaLinks, externalLinks, callToAction, obligations)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

        stmt.run(title, summary, description, transitionTheme, partners, contactName, contactEmail, mediaLinks, externalLinks, callToAction, obligations);

        return new Response(JSON.stringify({ success: true, message: 'Project succesvol ingediend!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ success: false, error: 'Interne server fout.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
