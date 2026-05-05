import { d as db } from '../../chunks/database_DgLR3aOz.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const title = data.get("title")?.toString() || "";
    const summary = data.get("summary")?.toString() || "";
    const description = data.get("description")?.toString() || "";
    const transitionTheme = data.get("transitionTheme")?.toString() || "Algemeen";
    const partners = data.get("partners")?.toString() || "";
    const contactName = data.get("contactName")?.toString() || "";
    const contactEmail = data.get("contactEmail")?.toString() || "";
    const mediaLinks = data.get("mediaLinks")?.toString() || "";
    const externalLinks = data.get("externalLinks")?.toString() || "";
    const callToAction = data.get("callToAction")?.toString() || "";
    const obligations = data.get("obligations")?.toString() || "";
    if (!title || !summary || !description) {
      return new Response(JSON.stringify({ success: false, error: "Vul tenminste de verplichte velden in." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await db.execute(
      `
        INSERT INTO projects (title, summary, description, transitionTheme, partners, contactName, contactEmail, mediaLinks, externalLinks, callToAction, obligations)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [title, summary, description, transitionTheme, partners, contactName, contactEmail, mediaLinks, externalLinks, callToAction, obligations]
    );
    return new Response(JSON.stringify({ success: true, message: "Project succesvol ingediend!" }), {
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
