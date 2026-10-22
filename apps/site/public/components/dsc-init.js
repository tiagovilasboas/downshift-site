(()=>{
const R=document.getElementById('dsc');
if(!R||!R.animate||!R.getAnimations)return;
const mq=matchMedia('(prefers-reduced-motion: reduce)'),wd=matchMedia('(min-width:720px)');
const force=R.dataset.motion==='force';
const q=(s,p=R)=>p.querySelector(s),qa=(s,p=R)=>[...p.querySelectorAll(s)];
const RP=q('.dsc-rp'),PZ=q('.dsc-pz'),BL=q('.dsc-bl'),SEQ=[...R.dataset.seq],NS='http://www.w3.org/2000/svg';
const E='cubic-bezier(.16,1,.3,1)',WAVE=8,WG=1000,ST=100,TIN=1300,TOUT=1400,HOLD=2600,FADE=380,PERIOD=10000;
const F=new Map(qa('[data-k]').map(e=>[e,e.textContent]));
let GR=null,V,K,P,calm,INF=[],live=false,vis=false,paused=false,landed=false;
const all=()=>R.getAnimations({subtree:true});
const pts=(p,n=28)=>{const L=p.getTotalLength(),o=[];for(let j=0;j<=n;j++){const a=p.getPointAtLength(L*j/n);o.push([a.x,a.y])}return o};
const kf=P=>{const d=[0];for(let j=1;j<P.length;j++)d.push(d[j-1]+Math.hypot(P[j][0]-P[j-1][0],P[j][1]-P[j-1][1]));const L=d[d.length-1]||1;return P.map((p,j)=>({offset:d[j]/L,transform:`translate(${p[0]}px,${p[1]}px)`}))};
const orb=(c,b)=>{const o=document.createElementNS(NS,'circle');o.setAttribute('r',V.dataset.r);o.setAttribute('class',c);b.appendChild(o);return o};
const rim=(A,c,r,out)=>{const k=A.findIndex(p=>Math.hypot(p[0]-c[0],p[1]-c[1])<r);return out?A.slice(A.length-1-[...A].reverse().findIndex(p=>Math.hypot(p[0]-c[0],p[1]-c[1])<r)):A.slice(0,k<1?A.length:k)};
function geo(){const g=q('.dsc-gt',V).getBBox(),c=[g.x+g.width/2,g.y+g.height/2],r=g.width/2+2,o={};
qa('.dsc-out',V).forEach(p=>{o[p.dataset.l]=kf(rim(pts(p),c,r,1))});
P={ins:qa('.dsc-in',V).map(p=>kf(rim(pts(p),c,r))),outs:o,port:{},dh:{}};
qa('.dsc-pt',V).forEach(p=>{P.port[p.dataset.l]=p});qa('.dsc-dh',V).forEach(p=>{P.dh[p.parentNode.dataset.l]=p})}
const clear=()=>qa('.dsc-tks').forEach(g=>g.replaceChildren());

function start(){
if(calm)return still();
all().forEach(a=>INF.includes(a)||a.cancel());clear();
if(!GR||GR.playState==='idle'){GR=q('.dsc-gr',V).animate([{transform:'rotate(0deg)'},{transform:'rotate(360deg)'}],{duration:48000,iterations:Infinity});INF.push(GR)}
const {ins,outs,port,dh}=P,cnt={},seen={},bag=document.createDocumentFragment();
for(const k in K){K[k].textContent='0';cnt[k]=0}
const tick=l=>()=>{K[l].textContent=++cnt[l]};
const gb=q('.dsc-gb',V),G=q('.dsc-gs',V).transform.baseVal.consolidate().matrix.f;
const clicks=[];
let end=0;
const waves=Math.ceil(SEQ.length/WAVE);
for(let w=0;w<waves;w++){
const w0=w*WG,click=w0+ST*3+TIN*.45;
SEQ.slice(w*WAVE,(w+1)*WAVE).forEach((l,j)=>{
const i=w*WAVE+j,t=w0+j*ST,a=orb('dsc-ob dsc-oi',bag),b=orb('dsc-ob dsc-o'+l,bag),t2=t+TIN*.5,t3=t2+TOUT;
a.animate(ins[i%ins.length],{duration:TIN,delay:t,easing:E,fill:'both'});
a.animate([{opacity:0},{opacity:1,offset:.12},{opacity:1,offset:.42},{opacity:0,offset:.56},{opacity:0}],{duration:TIN,delay:t,fill:'both'});
b.animate(outs[l],{duration:TOUT,delay:t2,easing:E,fill:'both'});
b.animate([{opacity:0},{opacity:1,offset:.1},{opacity:1,offset:.7},{opacity:0}],{duration:TOUT,delay:t2,fill:'both'}).onfinish=tick(l);
if(!seen[l]){seen[l]=1;port[l].animate([{opacity:0},{opacity:1}],{duration:300,delay:t3-300,fill:'backwards'})}
port[l].animate([{transform:'scale(1.45)'},{transform:'scale(1)'}],{duration:420,delay:t3-260,easing:E});
dh[l].animate([{opacity:0},{opacity:.6,offset:.25},{opacity:0}],{duration:700,delay:t3-300});
end=t3+160});
clicks.push(click);
gb.animate([{transform:'translateY(0px)'},{transform:`translateY(${G}px)`,offset:.35},{transform:'translateY(0px)'}],{duration:520,delay:click,easing:E});
}
q('.dsc-tks',V).appendChild(bag);

q('.dsc-tks',V).animate([{opacity:1},{opacity:1}],{duration:Math.max(end+600,PERIOD-FADE)}).onfinish=cycle;
}
function still(){
all().forEach(a=>a.cancel());clear();GR=null;
const {port,dh}=P,cnt={},seen={},bag=document.createDocumentFragment(),waves=Math.ceil(SEQ.length/WAVE),CW=620,CS=55;
const o=(e,k,d,t,f)=>e.animate(k,{duration:d,delay:t,easing:'ease-out',fill:f||'none'});
for(const k in K){K[k].textContent='0';cnt[k]=0}
const tick=l=>()=>{K[l].textContent=++cnt[l]};
const end=(waves-1)*CW+360+WAVE*CS+600,g=q('.dsc-gt',V).getBBox(),cx=g.x+g.width/2,cy=g.y+g.height/2,rt=g.width/2-3;
const ins=qa('.dsc-in',V),outs={},gb=q('.dsc-gb',V),gs=q('.dsc-gs',V);
qa('.dsc-out',V).forEach(p=>{outs[p.dataset.l]=p});
[...ins,...Object.values(outs)].forEach(p=>o(p,[{opacity:.4},{opacity:.4,offset:.92},{opacity:1}],end+300,0));
for(let w=0;w<waves;w++){
const w0=w*CW,a=(w*12-90)*Math.PI/180,m=document.createElementNS(NS,'circle'),ls=new Set(SEQ.slice(w*WAVE,(w+1)*WAVE));
m.setAttribute('cx',cx+rt*Math.cos(a));m.setAttribute('cy',cy+rt*Math.sin(a));m.setAttribute('r',V.dataset.r*.6);m.setAttribute('class','dsc-tw');bag.appendChild(m);
o(m,[{opacity:0},{opacity:1,offset:.12},{opacity:.35,offset:.4},{opacity:.35,offset:.85},{opacity:0}],end-w0,w0+160,'backwards');
ins.forEach(p=>o(p,[{opacity:.4},{opacity:1,offset:.3},{opacity:.4}],620,w0));
ls.forEach(l=>o(outs[l],[{opacity:.4},{opacity:1,offset:.3},{opacity:.4}],620,w0+240));
o(gb,[{opacity:1},{opacity:0,offset:.3},{opacity:1}],520,w0+160);o(gs,[{opacity:0},{opacity:1,offset:.3},{opacity:0}],520,w0+160);
SEQ.slice(w*WAVE,(w+1)*WAVE).forEach((l,j)=>{
const t=w0+360+j*CS,h=port[l].cloneNode();
h.setAttribute('r',port[l].getAttribute('r')*2.2);h.setAttribute('class','dsc-ph dsc-o'+l);bag.appendChild(h);
o(h,[{opacity:0},{opacity:.9,offset:.25},{opacity:0}],560,t,'backwards');
if(!seen[l]){seen[l]=1;o(port[l],[{opacity:0},{opacity:1}],300,t,'backwards')}
o(dh[l],[{opacity:0},{opacity:.5,offset:.25},{opacity:0}],560,t);
K[l].animate([],{duration:110,delay:t}).onfinish=tick(l);
o(K[l],[{opacity:.55},{opacity:1}],320,t+110)})}
q('.dsc-tkt',V).appendChild(bag);
}
function cycle(){
const fx=qa('.dsc-pt,.dsc-ct',V).map(e=>e.animate([{opacity:1},{opacity:0}],{duration:FADE,easing:'ease-out',fill:'forwards'}));
if(!landed&&!calm){landed=true;INF.push(q('.dsc-mk',V).animate([{opacity:.2,transform:'scale(.82)'},{opacity:1,transform:'scale(1)'}],{duration:760,delay:120,easing:E,fill:'backwards'}))}
fx[0].onfinish=start;
}
function sync(){
const want=vis&&!document.hidden&&!paused;
if(want&&!live){live=true;cycle()}
all().forEach(a=>{if(want){if(a.playState==='paused')a.play()}else if(a.playState==='running')a.pause()});
}
function loop(e,k,o){INF.push(e.animate(k,Object.assign({iterations:Infinity,direction:'alternate',easing:'ease-in-out'},o)))}
function setup(){
all().forEach(a=>a.cancel());INF=[];clear();landed=false;
F.forEach((v,e)=>{e.textContent=v});
calm=mq.matches&&!force;V=q(wd.matches?'.dsc-vd':'.dsc-vm');
K={};qa('[data-k]',V).forEach(e=>{K[e.dataset.k]=e});geo();
RP.hidden=false;PZ.hidden=calm;
if(!calm){
qa('.dsc-pa path',V).forEach(p=>INF.push(p.animate([{strokeDashoffset:'0px'},{strokeDashoffset:'-20px'}],{duration:1400,iterations:Infinity})));
loop(q('.dsc-gw',V),[{opacity:.72},{opacity:1}],{duration:5200});
loop(q('.dsc-a1',V),[{transform:'translate(-14px,6px) scale(1)'},{transform:'translate(16px,-8px) scale(1.1)'}],{duration:11000});
loop(q('.dsc-a2',V),[{transform:'translate(12px,8px) scale(1.08)'},{transform:'translate(-18px,-6px) scale(.94)'}],{duration:14000});
INF.push(q('.dsc-rr',V).animate([{transform:'rotate(0deg)'},{transform:'rotate(-360deg)'}],{duration:90000,iterations:Infinity}));
qa('.dsc-mt circle',V).forEach((m,j)=>{const x=j%2?6:-6;INF.push(m.animate([{opacity:0,transform:'translate(0px,0px)'},{opacity:.55,transform:`translate(${x/2}px,-14px)`},{opacity:0,transform:`translate(${x}px,-28px)`}],{duration:5200+j%5*800,delay:-j*610,iterations:Infinity}))});
}
live=false;sync();
}
const lab=()=>{BL.textContent=paused?PZ.dataset.play:PZ.dataset.pause;R.classList.toggle('dsc-pd',paused)};
PZ.addEventListener('click',()=>{paused=!paused;lab();sync()});
RP.addEventListener('click',()=>{paused=false;lab();live=true;cycle();sync()});
if(window.IntersectionObserver)new IntersectionObserver(es=>{vis=es[es.length-1].isIntersecting;sync()},{threshold:.2}).observe(R);else vis=true;
document.addEventListener('visibilitychange',sync);
mq.addEventListener('change',setup);wd.addEventListener('change',setup);
setup();
})();