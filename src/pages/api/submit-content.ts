import type { APIRoute } from 'astro';
import db from '../../db/database';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();

        // Extracting all fields from the Content Form
        const wat = data.get('wat')?.toString() || '';
        const waar = data.get('waar')?.toString() || '';
        const waarom = data.get('waarom')?.toString() || '';

        // Timing logic (custom vs radio)
        const timingRadio = data.get('timing')?.toString();
        const timingCustom = data.get('customDate')?.toString();
        const timing = (timingRadio === 'Anders' && timingCustom) ? `Datum: ${timingCustom}` : (timingRadio || 'Geen haast');

        const partners = data.get('partners')?.toString() || '';
        const toelichting = data.get('toelichting')?.toString() || '';
        const fotos = data.get('fotos')?.toString() || '';
        const contactPersoon = data.get('contactPersoon')?.toString() || '';
        const contactGegevens = data.get('contactGegevens')?.toString() || '';
        const verplichtingen = data.get('verplichtingen')?.toString() || '';

        if (!wat || !partners) {
            return new Response(JSON.stringify({ success: false, error: 'Vul de verplichte velden (Wat & Partners) in.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        await db.execute({
            sql: `
        INSERT INTO content_submissions (wat, waar, waarom, timing, partners, toelichting, fotos, contactPersoon, contactGegevens, verplichtingen)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
            args: [wat, waar, waarom, timing, partners, toelichting, fotos, contactPersoon, contactGegevens, verplichtingen]
        });

        return new Response(JSON.stringify({ success: true, message: 'Content idee succesvol ingediend!' }), {
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
