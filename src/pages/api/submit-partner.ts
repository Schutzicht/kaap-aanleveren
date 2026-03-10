import type { APIRoute } from 'astro';
import db from '../../db/database';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();

        // Extracting all fields from the Partner form
        const partnerNaam = data.get('partnerNaam')?.toString() || '';
        const websiteUrl = data.get('websiteUrl')?.toString() || '';
        const expertise = data.get('expertise')?.toString() || '';
        const omschrijving = data.get('omschrijving')?.toString() || '';
        const contactPersoon = data.get('contactPersoon')?.toString() || '';
        const emailadres = data.get('emailadres')?.toString() || '';
        const mediaLink = data.get('mediaLink')?.toString() || '';

        if (!partnerNaam || !expertise || !omschrijving) {
            return new Response(JSON.stringify({ success: false, error: 'Vul de verplichte velden (Partner Naam, Expertise & Rol) in.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const stmt = db.prepare(`
        INSERT INTO partner_submissions (partnerNaam, websiteUrl, expertise, omschrijving, contactPersoon, emailadres, mediaLink)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        stmt.run(partnerNaam, websiteUrl, expertise, omschrijving, contactPersoon, emailadres, mediaLink);

        return new Response(JSON.stringify({ success: true, message: 'Nieuwe partner succesvol doorgegeven!' }), {
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
