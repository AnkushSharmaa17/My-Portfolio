const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],rm=matchMedia('(prefers-reduced-motion:reduce)').matches,mob=innerWidth<700;
const K={'Languages':['JavaScript','TypeScript','C++'],'Frontend':['React.js','Next.js','HTML5','CSS3','Tailwind','Vite'],'Backend':['Node.js','Express.js','REST APIs','Socket.io'],'Databases':['MongoDB','Redis','DynamoDB'],'AI / LLM':['LangChain','Mistral AI','Gemini AI'],'Cloud and DevOps':['AWS (Lambda, API Gateway, ECS, ECR, EC2, S3, VPC, IAM)','Docker'],'Tools':['Git','GitHub','Postman','Supabase','VS Code','AWS CLI','Claude Code','GPT','Codex']};
$('#sk').innerHTML=Object.entries(K).map(([g,a])=>`<div><h3>${g}</h3><div class="chips">${a.map(x=>`<span>${x}</span>`).join('')}</div></div>`).join('');
const clk=()=>$('#clk').textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'})+' IST in India';clk();setInterval(clk,3e4);
// star field: drifting points, cursor repel, camera glides through depth as you scroll
let R,S,C,U,curve;const cv=$('#gl'),mouse={x:0,y:0};
try{R=new THREE.WebGLRenderer({canvas:cv,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,1.5));S=new THREE.Scene();C=new THREE.PerspectiveCamera(60,1,.1,60);
const N=mob?1800:4500,P=new Float32Array(N*3),Sd=new Float32Array(N);
for(let i=0;i<N;i++){P.set([(Math.random()-.5)*30,(Math.random()-.5)*26-4,10-Math.random()*26],i*3);Sd[i]=Math.random()}
const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('aSeed',new THREE.BufferAttribute(Sd,1));
U={uT:{value:0},uM:{value:new THREE.Vector2()},uPR:{value:R.getPixelRatio()}};
S.add(new THREE.Points(g,new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
vertexShader:`attribute float aSeed;uniform float uT,uPR;uniform vec2 uM;varying float vA,vS;void main(){vec3 p=position;float t=uT*.3;p+=vec3(sin(p.y*.6+t+aSeed*6.),cos(p.x*.5+t*1.2),sin(p.z*.4+t))*.5;vec2 d=p.xy-uM;float f=smoothstep(3.5,0.,length(d));p.xy+=normalize(d+.0001)*f*1.4;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.2+aSeed*1.8)*uPR*(10./-mv.z);vA=.2+aSeed*.5+f*.4;vS=aSeed;}`,
fragmentShader:`varying float vA,vS;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 c=vS>.96?vec3(1.,.5,.36):(vS>.7?vec3(.545,.914,1.):vec3(.95,.95,.92));gl_FragColor=vec4(c,smoothstep(.5,0.,d)*vA);}`})));
curve=new THREE.CatmullRomCurve3([[0,0,8],[2.5,-1,3],[-2.5,-3,-3],[1.5,-6,-8],[0,-8,-12]].map(a=>new THREE.Vector3(...a)))}catch(e){R=null;cv.style.display='none'}
const rs=()=>{if(R){R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()}};rs();addEventListener('resize',rs);
addEventListener('pointermove',e=>{mouse.x=e.clientX/innerWidth*2-1;mouse.y=-(e.clientY/innerHeight*2-1)});
// one scroll engine: Lenis driven by the GSAP ticker
gsap.registerPlugin(ScrollTrigger);let lenis;
if(!rm&&window.Lenis){lenis=new Lenis({lerp:.1});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
$$('[data-go]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=$(a.getAttribute('href'));lenis?lenis.scrollTo(t):t.scrollIntoView()}));
$$('section[data-t]').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 50%',end:'bottom 50%',onToggle:v=>v.isActive&&($('#lbl').textContent=s.dataset.t)}));
ScrollTrigger.create({start:0,end:'max',onUpdate:v=>gsap.set('#pg',{scaleX:v.progress})});
// achievement counters
$$('.stat b').forEach(b=>{const n=+b.dataset.n,o={v:0},set=()=>b.textContent=Math.round(o.v)+b.dataset.s;if(rm){o.v=n;set();return}
ScrollTrigger.create({trigger:b,start:'top 85%',once:true,onEnter:()=>gsap.to(o,{v:n,duration:1.8,ease:'power3.out',onUpdate:set})})});
if(!rm){gsap.from('h1 .l>span',{yPercent:110,duration:1.4,ease:'expo.out',stagger:.12,delay:.15});
gsap.from('#hero .lead,#hero .sub,#hero .row,#hero .tag',{y:24,opacity:0,duration:1,ease:'power3.out',stagger:.1,delay:.7});
$$('h2 .l>span').forEach(h=>gsap.from(h,{yPercent:110,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:h,start:'top 90%',once:true}}));
$$('.it').forEach(i=>gsap.from(i,{x:40,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:i,start:'top 85%',once:true}}));
gsap.to('#tlf',{scaleY:1,ease:'none',scrollTrigger:{trigger:'.tl',start:'top 70%',end:'bottom 70%',scrub:true}});
const cs=$$('.card');if(innerWidth>900)cs.forEach((c,i)=>cs[i+1]&&gsap.to(c,{scale:.94,opacity:.4,ease:'none',scrollTrigger:{trigger:cs[i+1],start:'top 80%',end:'top 15%',scrub:true}}))}
// project request path — one ScrollTrigger per .pipe
const caps=['A customer opens the Next.js storefront.','AWS Amplify serves the app.','API Gateway receives the API request.','Express, wrapped with serverless-http, runs on Lambda.','MongoDB Atlas stores data, S3 stores product images.'];
$$('.pipe').forEach(pipe=>{
  const nd=[...pipe.querySelectorAll('.nd')],cap=pipe.parentElement.querySelector('.cap')||pipe.nextElementSibling;
  let lc=-1;
  const setP=p=>{
    pipe.style.setProperty('--p',p);
    nd.forEach((n,i)=>n.classList.toggle('on',p>=i/4-.01));
    const c=Math.min(4,Math.round(p*4));
    if(c!==lc){lc=c;if(cap)cap.textContent=caps[c];}
  };
  setP(rm?1:0);
  if(rm)return;
  ScrollTrigger.create({trigger:pipe,start:'top 80%',once:true,onEnter:()=>{
    const o={p:0};
    gsap.to(o,{p:1,duration:3.2,ease:'power1.inOut',onUpdate:()=>setP(o.p)});
  }});
});
gsap.ticker.add(t=>{if(!R)return;const m=document.documentElement.scrollHeight-innerHeight,p=m>0?scrollY/m:0,q=curve.getPoint(p);C.position.copy(q);C.lookAt(curve.getPoint(Math.min(p+.03,1)));U.uT.value=rm?0:t;U.uM.value.set(q.x+mouse.x*8,q.y+mouse.y*5);R.render(S,C)});
