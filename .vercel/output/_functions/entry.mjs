import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_kykUifBY.mjs';
import { manifest } from './manifest_BdkmRzpX.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/login.astro.mjs');
const _page2 = () => import('./pages/api/logout.astro.mjs');
const _page3 = () => import('./pages/api/submit-content.astro.mjs');
const _page4 = () => import('./pages/api/submit-event.astro.mjs');
const _page5 = () => import('./pages/api/submit-exposition.astro.mjs');
const _page6 = () => import('./pages/api/submit-partner.astro.mjs');
const _page7 = () => import('./pages/api/submit-project.astro.mjs');
const _page8 = () => import('./pages/api/upload.astro.mjs');
const _page9 = () => import('./pages/content.astro.mjs');
const _page10 = () => import('./pages/dashboard.astro.mjs');
const _page11 = () => import('./pages/event.astro.mjs');
const _page12 = () => import('./pages/exposition.astro.mjs');
const _page13 = () => import('./pages/login.astro.mjs');
const _page14 = () => import('./pages/partner.astro.mjs');
const _page15 = () => import('./pages/project.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/login.ts", _page1],
    ["src/pages/api/logout.ts", _page2],
    ["src/pages/api/submit-content.ts", _page3],
    ["src/pages/api/submit-event.ts", _page4],
    ["src/pages/api/submit-exposition.ts", _page5],
    ["src/pages/api/submit-partner.ts", _page6],
    ["src/pages/api/submit-project.ts", _page7],
    ["src/pages/api/upload.ts", _page8],
    ["src/pages/content.astro", _page9],
    ["src/pages/dashboard.astro", _page10],
    ["src/pages/event.astro", _page11],
    ["src/pages/exposition.astro", _page12],
    ["src/pages/login.astro", _page13],
    ["src/pages/partner.astro", _page14],
    ["src/pages/project.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d21e539e-469a-4c48-b3f7-746b1570ddb8",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
