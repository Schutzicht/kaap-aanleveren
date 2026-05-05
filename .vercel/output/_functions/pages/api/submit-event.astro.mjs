import { d as db } from '../../chunks/database_DgLR3aOz.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const titel = data.get("titel")?.toString() || "";
    const datumTijd = data.get("datumTijd")?.toString() || "";
    const locatie = data.get("locatie")?.toString() || "";
    const transitiethema = data.get("transitiethema")?.toString() || "";
    const omschrijving = data.get("omschrijving")?.toString() || "";
    const inschrijflink = data.get("inschrijflink")?.toString() || "";
    const contactPersoon = data.get("contactPersoon")?.toString() || "";
    if (!titel || !datumTijd || !transitiethema || !omschrijving) {
      return new Response(JSON.stringify({ success: false, error: "Vul alle verplichte velden in." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await db.execute(
      `
        INSERT INTO event_submissions (titel, datumTijd, locatie, transitiethema, omschrijving, inschrijflink, contactPersoon)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [titel, datumTijd, locatie, transitiethema, omschrijving, inschrijflink, contactPersoon]
    );
    return new Response(JSON.stringify({ success: true, message: "Event succesvol aangemeld!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Interne server fout." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
