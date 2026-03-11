import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DRDq22Es.mjs';
import { manifest } from './manifest_BPEEXAhZ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/submit-content.astro.mjs');
const _page2 = () => import('./pages/api/submit-event.astro.mjs');
const _page3 = () => import('./pages/api/submit-partner.astro.mjs');
const _page4 = () => import('./pages/api/submit-project.astro.mjs');
const _page5 = () => import('./pages/content.astro.mjs');
const _page6 = () => import('./pages/dashboard.astro.mjs');
const _page7 = () => import('./pages/event.astro.mjs');
const _page8 = () => import('./pages/partner.astro.mjs');
const _page9 = () => import('./pages/project.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/submit-content.ts", _page1],
    ["src/pages/api/submit-event.ts", _page2],
    ["src/pages/api/submit-partner.ts", _page3],
    ["src/pages/api/submit-project.ts", _page4],
    ["src/pages/content.astro", _page5],
    ["src/pages/dashboard.astro", _page6],
    ["src/pages/event.astro", _page7],
    ["src/pages/partner.astro", _page8],
    ["src/pages/project.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a8c8c2f3-3dd7-4a11-9dc5-d9140801460d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
