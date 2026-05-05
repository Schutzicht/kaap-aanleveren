import type { APIRoute } from 'astro';
import db from '../../db/database';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();

        const partnerNaam = data.get('partnerNaam')?.toString().trim() || '';
        const contactPersoon = data.get('contactPersoon')?.toString().trim() || '';
        const contactEmail = data.get('contactEmail')?.toString().trim() || '';
        const projectTitel = data.get('projectTitel')?.toString().trim() || '';
        const pitch = data.get('pitch')?.toString().trim() || '';
        const aanleiding = data.get('aanleiding')?.toString().trim() || '';
        const aanpak = data.get('aanpak')?.toString().trim() || '';
        const resultaat = data.get('resultaat')?.toString().trim() || '';
        const impact = data.get('impact')?.toString().trim() || '';
        const rolKaap = data.get('rolKaap')?.toString().trim() || '';
        const status = data.get('status')?.toString() || '';
        const transitionTheme = data.get('transitionTheme')?.toString() || '';
        const betrokkenPartners = data.get('betrokkenPartners')?.toString().trim() || '';
        const mediaFilesRaw = data.get('mediaFiles')?.toString() || '[]';
        const mediaLinks = data.get('mediaLinks')?.toString().trim() || '';
        const expositieType = data.get('expositieType')?.toString() || '';
        const doorontwikkeling = data.get('doorontwikkeling')?.toString().trim() || '';
        const verplichtingen = data.get('verplichtingen')?.toString().trim() || '';
        const toestemming = data.get('toestemming')?.toString() === 'on' ? 1 : 0;
        const feedback = data.get('feedback')?.toString().trim() || '';

        let mediaFiles: string[] = [];
        try {
            const parsed = JSON.parse(mediaFilesRaw);
            if (Array.isArray(parsed)) {
                mediaFiles = parsed.filter((u): u is string => typeof u === 'string' && u.length > 0);
            }
        } catch {
            mediaFiles = [];
        }

        const missing: string[] = [];
        if (!partnerNaam) missing.push('partnerorganisatie');
        if (!contactPersoon) missing.push('contactpersoon');
        if (!contactEmail) missing.push('e-mailadres');
        if (!projectTitel) missing.push('projecttitel');
        if (!pitch) missing.push('korte pitch');
        if (!aanleiding) missing.push('aanleiding');
        if (!aanpak) missing.push('aanpak');
        if (!resultaat) missing.push('resultaat');
        if (!status) missing.push('status');
        if (!transitionTheme) missing.push('transitiethema');
        if (!expositieType) missing.push('expositievorm');
        if (!toestemming) missing.push('toestemming-vinkje');
        if (mediaFiles.length === 0 && !mediaLinks) missing.push('beeldmateriaal (upload of link)');

        if (missing.length > 0) {
            return new Response(JSON.stringify({
                success: false,
                error: `Vul de verplichte velden in: ${missing.join(', ')}.`
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const mediaFilesJson = JSON.stringify(mediaFiles);

        await db.execute(
            `
        INSERT INTO exposition_submissions
        (partnerNaam, contactPersoon, contactEmail, projectTitel, pitch, aanleiding, aanpak, resultaat, impact, rolKaap, status, transitionTheme, betrokkenPartners, mediaFiles, mediaLinks, expositieType, doorontwikkeling, verplichtingen, toestemming, feedback)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
            [partnerNaam, contactPersoon, contactEmail, projectTitel, pitch, aanleiding, aanpak, resultaat, impact, rolKaap, status, transitionTheme, betrokkenPartners, mediaFilesJson, mediaLinks, expositieType, doorontwikkeling, verplichtingen, toestemming, feedback]
        );

        return new Response(JSON.stringify({
            success: true,
            message: 'Bedankt! Het project is aangeleverd voor expositie binnen KAAP.'
        }), {
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
