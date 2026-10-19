const V="ds-v18",RT="ds-v5-rt",RT_MAX=40,ASSETS=["/fonts/Geist-Variable.woff2","/favicon.svg","/downshift-logo-dark.svg","/downshift-logo-light.svg","/icon-192.png","/manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==RT).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Only same-origin, 200-range, non-opaque responses are ever stored.
const cacheable=x=>x&&x.ok&&x.type==="basic";
const trim=c=>c.keys().then(k=>k.length>RT_MAX?Promise.all(k.slice(0,k.length-RT_MAX).map(r=>c.delete(r))):0);
const put=(name,r,x)=>caches.open(name).then(c=>c.put(r,x).then(()=>name===RT?trim(c):0)).catch(()=>{});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
if(r.method!=="GET"||u.origin!==location.origin)return;
// Network-first navigations. Opaque redirects (/ -> /pt-br/ for BR) pass through untouched and are not cached.
if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{if(cacheable(x))e.waitUntil(put(RT,r,x.clone()));return x}).catch(()=>caches.match(r).then(x=>x||new Response("Offline",{status:503,headers:{"Content-Type":"text/plain"}}))));return}
// Stale-while-revalidate for same-origin assets; everything not precached lands in the capped runtime cache.
const name=ASSETS.includes(u.pathname)?V:RT;
e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(x=>{if(cacheable(x))e.waitUntil(put(name,r,x.clone()));return x}).catch(()=>h||new Response("",{status:504}));if(h)e.waitUntil(n.catch(()=>{}));return h||n}))});
