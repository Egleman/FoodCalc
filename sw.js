if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),c={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-3494f737"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-60a03423.js",revision:null},{url:"assets/index-f1d62cd5.css",revision:null},{url:"assets/ReadyValues-8dcffc73.js",revision:null},{url:"index.html",revision:"7abbc9d70301790bbc311fd55f0312ac"},{url:"registerSW.js",revision:"2758512c8666c0df4c81182eca1d4e27"},{url:"manifest.webmanifest",revision:"16a58540145efdb9cbde86764ca03d7e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
