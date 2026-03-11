import { e as createComponent, g as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_rqQWen4l.mjs';
import 'piccolore';
import 'clsx';
/* empty css                           */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="nl"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-kaap-bg text-kaap-gray font-sans antialiased min-h-screen flex flex-col"> <header class="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-gray-100"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"> <div class="font-heading font-bold text-2xl text-kaap-gray tracking-tight">
KAAP <span class="text-kaap-gradient">Content</span> </div> </div> </header> <main class="flex-grow pt-32 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full mb-20 relative"> <!-- Background Decoration --> <div class="fixed top-20 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-50"> <div class="absolute top-0 right-0 w-96 h-96 bg-kaap-pink/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div> <div class="absolute bottom-0 left-0 w-96 h-96 bg-kaap-water/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-pulse" style="animation-delay: 2s"></div> </div> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-kaap-gray text-white py-8 text-center text-sm mt-auto"> <div class="max-w-7xl mx-auto px-4"> <p class="opacity-60">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Innovatiepunt KAAP</p> </div> </footer> </body></html>`;
}, "/Users/jorikschut/Documents/Projecten-sites/Tools-SAAS/KAAP Projecten Formulier/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
