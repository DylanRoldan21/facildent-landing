const WA='51986466346', LAT=-11.9885757, LNG=-77.0813928;
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
$('#yr').textContent=new Date().getFullYear();

/* Datos */
const SPECS=[
 {n:'Implantología',img:'implantologia',s:'La solución definitiva para recuperar tu sonrisa.',d:'Reemplazamos piezas perdidas con implantes que se ven, se sienten y funcionan como dientes naturales.',b:['Funcionalidad para masticar','Estética natural','Solución duradera']},
 {n:'Ortodoncia',img:'ortodoncia',s:'Alineamos tu sonrisa, mejoramos tu vida.',d:'Corregimos la posición de los dientes y la mordida con brackets y alternativas modernas, con controles periódicos.',b:['Alineación precisa','Sonrisa armónica','Resultados duraderos']},
 {n:'Endodoncia',img:'endodoncia',s:'Aliviamos el dolor, salvamos tu sonrisa.',d:'Tratamos la infección del nervio del diente para eliminar el dolor y conservar tu pieza natural.',b:['Tratamiento seguro','Eliminamos la infección','Conservamos tu diente']},
 {n:'Rehabilitación Oral',img:'rehabilitacion',s:'Recuperamos la función y estética de tu sonrisa.',d:'Devolvemos la salud y la forma de tu boca con coronas, prótesis y tratamientos integrales.',b:['Funcionalidad','Estética','Confianza al sonreír']},
 {n:'Cirugía Maxilofacial',img:'cirugia',s:'Transformamos tu rostro, mejoramos tu calidad de vida.',d:'Procedimientos quirúrgicos de boca, maxilares y rostro, realizados por especialistas.',b:['Funcionalidad','Estética facial','Atención especializada']},
 {n:'Odontopediatría',img:'odontopediatria',s:'Cuidamos su sonrisa, cuidamos su futuro.',d:'Atención dental para los más pequeños en un ambiente amigable, para que pierdan el miedo al dentista.',b:['Prevención desde temprano','Ambiente seguro y amigable','Sonrisas sanas, niños felices']},
];
const EXTRA=['Profilaxis','Blanqueamiento','Carillas','Prótesis','Periodoncia','Otra consulta'];
const REVIEWS=[
 ['Rosbely Delgado','Reseña de Google','Muy buena su atención. Explican a detalle los pro y contra del procedimiento a realizar. La señora de atención muy amable y atenta. 100% recomendado.'],
 ['Adrian Arnold','Reseña de Google','Excelente atención por parte del personal y del doctor.'],
 ['Guisella Santamaria Angeles','Reseña de Google','Muy buena atención, recomendado.'],
 ['Luis C.','Reseña de Google','Me dejaron muy pepa, con la sonrisa de cuevita. 10/10 el servicio.'],
 ['Wilder Polo Huamán','Reseña de Google','Está bonito. Eso sí que está muy bonito.'],
];

/* Loader */
addEventListener('load',()=>setTimeout(()=>{$('#loader').classList.add('out');document.body.classList.add('ready');setTimeout(openAd,900)},1300));
setTimeout(()=>{$('#loader').classList.add('out');document.body.classList.add('ready')},4000);

/* Nav */
let lastY=0;addEventListener('scroll',()=>{const y=scrollY;$('#nav').classList.toggle('hide',y>lastY&&y>400);lastY=y},{passive:true});
$('#burger').onclick=()=>$('#nav').classList.toggle('menu');
$$('.nav ul a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('menu'));

/* Reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
function countUp(el){const t=+el.dataset.count,t0=performance.now(),dur=1800;(function f(now){const p=Math.min(1,(now-t0)/dur),v=Math.round(t*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString('es-PE');if(p<1)requestAnimationFrame(f)})(t0)}
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){countUp(e.target);cio.unobserve(e.target)}}),{threshold:.6});
$$('[data-count]').forEach(el=>cio.observe(el));

/* Marquee */
const words=[...(new Date()<=new Date('2026-12-31T23:59:59-05:00')?['Hasta 30% dscto.']:[]),...SPECS.map(s=>s.n),'+10,000 pacientes','Aliados con Vitis'];
$('#mq').innerHTML=[...words,...words].map(w=>`<span>${w}</span>`).join('');

/* Anillo 3D */
const ring=$('#ring'),cards=[...SPECS,{txt:true}];
ring.innerHTML=cards.map((s,i)=>s.txt?`<div class="card3d txt" data-i="-1"><div><span class="eyebrow" style="color:#9fd8ff">Y mucho más</span><h3>Más tratamientos</h3><p>Prevención, estética y cuidado integral para toda la familia.</p></div><ul>${['Profilaxis','Blanqueamiento','Carillas','Prótesis','Periodoncia','Resinas'].map(x=>`<li>${x}</li>`).join('')}</ul></div>`:`<div class="card3d" data-i="${i}"><img src="assets/${s.img}-foto.webp" alt="${s.n}" draggable="false"><div class="cb"><small>Especialidad</small><h3>${s.n}</h3><p>${s.s}</p></div><span class="more">+</span></div>`).join('');
const els=[...ring.children],N=els.length,step=360/N;
let rot=0,vel=-.08,drag=false,sx=0,moved=0,auto=true;
function radius(){return innerWidth<600?Math.max(300,innerWidth*.7):Math.min(560,innerWidth*.42)}
function render(){const R=radius();els.forEach((el,i)=>{const a=i*step+rot;const rad=a*Math.PI/180;const z=Math.cos(rad);el.style.transform=`rotateY(${a}deg) translateZ(${R}px)`;el.style.filter=`brightness(${.55+.45*((z+1)/2)})`;el.style.zIndex=Math.round(z*100)})}
const MOB=matchMedia('(max-width:700px)');
if(MOB.matches){document.getElementById('stage').classList.add('flat');els.forEach(el=>el.style.transform='')}
(function loop(){if(MOB.matches){requestAnimationFrame(loop);return}if(!drag){rot+=vel;if(!auto)vel*=.95;if(Math.abs(vel)<.02&&!auto){auto=true;vel=-.08}}render();requestAnimationFrame(loop)})();
const st=$('#stage');
st.addEventListener('click',e=>{if(!MOB.matches)return;const c=e.target.closest('.card3d');if(!c)return;if(c.dataset.i>=0)openSpec(+c.dataset.i);else openChat()});
st.addEventListener('pointerdown',e=>{if(MOB.matches)return;drag=true;sx=e.clientX;moved=0;st.setPointerCapture(e.pointerId)});
st.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-sx;sx=e.clientX;moved+=Math.abs(dx);rot+=dx*.25;vel=dx*.25});
st.addEventListener('pointerup',e=>{drag=false;auto=false;if(moved<6){const c=document.elementsFromPoint(e.clientX,e.clientY).find(n=>n.classList&&n.classList.contains('card3d'));if(c&&c.dataset.i>=0)openSpec(+c.dataset.i);else if(c)openChat()}});
$('#prev').onclick=()=>{if(MOB.matches){$('#ring').scrollBy({left:-260,behavior:'smooth'});return}auto=false;vel=4};$('#next').onclick=()=>{if(MOB.matches){$('#ring').scrollBy({left:260,behavior:'smooth'});return}auto=false;vel=-4};

/* Modal */
function openSpec(i){const s=SPECS[i];$('#mImg').src=`assets/${s.img}-foto.webp`;$('#mTitle').textContent=s.n;$('#mText').textContent=s.d;$('#mList').innerHTML=s.b.map(x=>`<li>${x}</li>`).join('');$('#mWa').href=wa(`Hola Fácil Dent 👋, quisiera información sobre ${s.n}.`);$('#modal').classList.add('open')}
$('#modal').onclick=e=>{if(e.target.id==='modal'||e.target.dataset.close!==undefined)$('#modal').classList.remove('open')};
addEventListener('keydown',e=>{if(e.key==='Escape'){closeAd();$('#modal').classList.remove('open');closeChat()}});

/* Antes / Después */
const cmp=$('#compare'),aft=$('#after'),hd=$('#handle');
function setPos(p){p=Math.max(0,Math.min(100,p));aft.style.clipPath=`inset(0 0 0 ${p}%)`;hd.style.left=p+'%';$$('.toggle button').forEach(b=>b.classList.toggle('on',(p>50)===(b.dataset.pos==='0')))}
let cd=false;cmp.addEventListener('pointerdown',e=>{cd=true;cmp.setPointerCapture(e.pointerId);mv(e)});cmp.addEventListener('pointermove',e=>cd&&mv(e));cmp.addEventListener('pointerup',()=>cd=false);
function mv(e){aft.style.transition=hd.style.transition='none';const r=cmp.getBoundingClientRect();setPos((e.clientX-r.left)/r.width*100)}
$$('.toggle button').forEach(b=>b.onclick=()=>{aft.style.transition='clip-path .8s cubic-bezier(.2,.8,.2,1)';hd.style.transition='left .8s cubic-bezier(.2,.8,.2,1)';setPos(+b.dataset.pos)});
// animación inicial
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();aft.style.transition='clip-path 1.6s cubic-bezier(.2,.8,.2,1)';hd.style.transition='left 1.6s cubic-bezier(.2,.8,.2,1)';setPos(85);setTimeout(()=>setPos(50),1700)}},{threshold:.5}).observe(cmp);

/* Video doctor sonido */
/* Hero playlist */
(function(){const vs=$$('.hv'),bars=$$('.vprog i');let k=0;
  function play(i){vs.forEach((v,j)=>{v.classList.toggle('on',j===i);if(j!==i){v.pause()}});bars.forEach((b,j)=>b.style.setProperty('--p',j<i?1:0));const v=vs[i];v.currentTime=0;v.play().catch(()=>{});$('#vcap').textContent=v.dataset.cap}
  vs.forEach((v,i)=>{v.addEventListener('ended',()=>{k=(i+1)%vs.length;play(k)});v.addEventListener('timeupdate',()=>{if(v.duration)bars[i].style.setProperty('--p',v.currentTime/v.duration)})});
  play(0)})();
/* Promoción: se oculta sola al terminar */
const PROMO_END=new Date('2026-12-31T23:59:59-05:00');const PROMO_ON=new Date()<=PROMO_END;
if(!PROMO_ON){$$('[data-promo]').forEach(e=>e.remove())}
/* Anuncio inicial (una vez por sesión) */
function adSeen(){try{return sessionStorage.getItem('fd_ad')}catch(_){return null}}
function openAd(){if(adSeen()||!PROMO_ON)return;$('#ad').classList.add('open');try{sessionStorage.setItem('fd_ad','1')}catch(_){}}
function closeAd(){$('#ad').classList.remove('open')}
$('#adX').onclick=closeAd;$('#adSkip').onclick=closeAd;$('#ad').addEventListener('click',e=>{if(e.target.id==='ad')closeAd()});
$('#adWa').href=wa('Hola Fácil Dent 👋, vi la promoción de noviembre–diciembre en su web y quiero aprovechar el descuento.');
if(PROMO_ON)$('#promoWa').href=wa('Hola Fácil Dent 👋, quiero aprovechar la promoción de noviembre–diciembre (hasta 30% de descuento).');
$('#vitisWa').href=wa('Hola Fácil Dent 👋, quiero recomendar a alguien para una profilaxis dental y recibir mi enjuague Vitis.');
if(PROMO_ON)(function tick(){const end=new Date('2026-12-31T23:59:59-05:00'),d=Math.max(0,end-new Date());$('#cd').textContent=Math.floor(d/864e5);$('#ch').textContent=Math.floor(d/36e5)%24;$('#cm').textContent=Math.floor(d/6e4)%60;$('#cs').textContent=Math.floor(d/1e3)%60;setTimeout(tick,1000)})();
(function(){const n=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Lima'}));const h=n.getHours(),wd=n.getDay()>=1&&n.getDay()<=6,lunch=wd&&h>=13&&h<15;const open=wd&&h>=9&&h<21&&!lunch;$$('.open-now').forEach(e=>{e.classList.add(open?'on':'off');e.textContent=open?'Abierto ahora':(lunch?'En refrigerio · vuelve 3 p. m.':'Cerrado ahora')})})();

/* Reseñas */
const rv=REVIEWS.map(([n,t,x])=>`<div class="review"><div class="who"><span class="av">${n[0]}</span><div><b>${n}</b><small>${t} · <span class="stars">★★★★★</span></small></div><svg class="g-ic" viewBox="0 0 48 48"><path fill="#4285F4" d="M45 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2.1 5-4.4 6.6v5.5h7.1c4.2-3.8 6.5-9.5 6.5-16.1z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.6-3.9-12.3-9.1H4.4v5.7C8 40.9 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.7 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.4C2.9 17.1 2 20.4 2 24s.9 6.9 2.4 9.9l7.3-5.7z"/><path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8 7.1 4.4 14.1l7.3 5.7c1.7-5.2 6.6-9.1 12.3-9.1z"/></svg></div><p>${x}</p></div>`).join('');
$('#revTrack').innerHTML=rv+rv;

/* Formulario */
$('#fEsp').innerHTML='<option value="" disabled selected hidden></option>'+[...SPECS.map(s=>s.n),...EXTRA].map(x=>`<option>${x}</option>`).join('');
const fFec=$('#fFec');fFec.min=new Date().toISOString().split('T')[0];
$('#fCel').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,''));
$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  const okc=$('#fOk');$('.consent').classList.toggle('err',!okc.checked);if(!okc.checked){okc.focus();return}
  const req=[$('#fNom'),$('#fApe'),$('#fCel'),$('#fEsp')];let ok=true;
  req.forEach(f=>{const bad=!f.value.trim()||(f.id==='fCel'&&f.value.length<9);f.classList.toggle('err',bad);if(bad)ok=false});
  if(!ok)return;
  const turno=document.querySelector('[name=turno]:checked').value;
  const fecha=fFec.value?new Date(fFec.value+'T12:00').toLocaleDateString('es-PE',{weekday:'long',day:'numeric',month:'long'}):'Lo antes posible';
  let t=`Hola Fácil Dent 👋, quiero agendar una cita.\n\n👤 Nombre: ${$('#fNom').value.trim()} ${$('#fApe').value.trim()}\n📱 Celular: ${$('#fCel').value}\n🦷 Especialidad: ${$('#fEsp').value}\n📅 Fecha preferida: ${fecha}\n🕘 Turno: ${turno}`;
  if($('#fMsg').value.trim())t+=`\n💬 Consulta: ${$('#fMsg').value.trim()}`;
  const url=wa(t);$('#okWa').href=url;$('#formIn').style.display='none';$('#ok').classList.add('show');
  try{window.open(url,'_blank')}catch(_){}
});

/* Próximamente parallax */
$('#soonWa').href=wa('Hola Fácil Dent 👋, quiero enterarme de la apertura de la sede en Pueblo Libre.');
addEventListener('scroll',()=>{const r=$('#soon').getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0){const p=(r.top/innerHeight);$('#soonImg').style.transform=`scale(1.15) translateY(${p*40}px)`}},{passive:true});

/* Mapa (Google Maps embebido, sin clave) */
const DEST=`${LAT},${LNG}`;
function setMap(url){const f=$('#gmap');if(f)f.src=url}
function hav(a,b,c,d){const R=6371,t=x=>x*Math.PI/180,dl=t(c-a),dn=t(d-b);const h=Math.sin(dl/2)**2+Math.cos(t(a))*Math.cos(t(c))*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(h))}
function showInfo(title,sub){const info=$('#rInfo');info.textContent='';const b=document.createElement('b');b.textContent=title;info.append(b,sub||'')}
async function routeFrom(la,ln){
  let km=hav(la,ln,LAT,LNG)*1.3,min=null;
  try{const ctl=new AbortController();setTimeout(()=>ctl.abort(),6000);const r=await fetch(`https://router.project-osrm.org/route/v1/driving/${ln.toFixed(6)},${la.toFixed(6)};${LNG},${LAT}?overview=false`,{signal:ctl.signal});const j=await r.json();if(j.routes&&j.routes[0]){km=j.routes[0].distance/1000;min=Math.round(j.routes[0].duration/60*1.4)}}catch(_){}
  if(min===null)min=Math.round(km/22*60+3);
  const walk=Math.round(km/4.8*60);
  showInfo(`Estás a ${km<1?Math.round(km*1000)+' m':km.toFixed(1)+' km'}`,`≈ ${min} min en auto${km<3?` · ${walk} min caminando`:''}`);
  setMap(`https://www.google.com/maps?saddr=${la.toFixed(6)},${ln.toFixed(6)}&daddr=${DEST}&hl=es&output=embed`);
  const g=$('#gmBtn');g.href=`https://www.google.com/maps/dir/?api=1&origin=${la},${ln}&destination=${DEST}`;g.textContent='Ver ruta en Google Maps';
}
$('#howBtn').onclick=()=>{
  if(!navigator.geolocation){showInfo('Tu navegador no comparte ubicación','Escribe tu dirección o distrito.');$('#addr').focus();return}
  showInfo('Buscando tu ubicación…','Acepta el permiso del navegador.');
  navigator.geolocation.getCurrentPosition(p=>routeFrom(p.coords.latitude,p.coords.longitude),
    ()=>{showInfo('No pudimos ver tu ubicación','Escribe tu dirección o distrito al lado.');$('#addr').focus()},{enableHighAccuracy:true,timeout:10000,maximumAge:60000});
};
$('#addrForm').addEventListener('submit',e=>{
  e.preventDefault();const q=$('#addr').value.trim().replace(/[<>]/g,'').slice(0,120);if(q.length<3)return;
  const from=q+', Lima, Perú';
  setMap(`https://www.google.com/maps?saddr=${encodeURIComponent(from)}&daddr=${DEST}&hl=es&output=embed`);
  showInfo('Ruta desde '+(q.length>26?q.slice(0,24)+'…':q),'Distancia y tiempo en el mapa.');
  const g=$('#gmBtn');g.href=`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${DEST}`;g.textContent='Ver ruta en Google Maps';
});

/* Asistente */
const chat=$('#chat'),body=$('#chatBody');let started=false;
function openChat(){chat.classList.add('open');$('#teaser').classList.remove('show');if(!started){started=true;flow('start')}}
function closeChat(){chat.classList.remove('open')}
$('#fab').onclick=()=>chat.classList.contains('open')?closeChat():openChat();
$('#chatX').onclick=closeChat;
$$('[data-open-chat]').forEach(b=>b.addEventListener('click',openChat));
setTimeout(()=>{if(!started){$('#teaser').classList.add('show');setTimeout(()=>$('#teaser').classList.remove('show'),9000)}},7000);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function say(t){const ty=document.createElement('div');ty.className='msg bot typing';ty.innerHTML='<i></i><i></i><i></i>';body.append(ty);body.scrollTop=1e5;await sleep(650+t.length*8);ty.remove();const m=document.createElement('div');m.className='msg bot';m.innerHTML=t;body.append(m);body.scrollTop=1e5}
function me(t){const m=document.createElement('div');m.className='msg me';m.textContent=t;body.append(m);body.scrollTop=1e5}
function opts(list){const o=document.createElement('div');o.className='opts';list.forEach(([l,fn])=>{const b=document.createElement('button');b.textContent=l;b.onclick=()=>{o.remove();me(l);fn()};o.append(b)});body.append(o);body.scrollTop=1e5}
function go(text,label='Continuar en WhatsApp'){const g=document.createElement('div');g.className='wa-go';g.innerHTML=`<a href="${wa(text)}" target="_blank" rel="noopener">💬 ${label}</a>`;body.append(g);body.scrollTop=1e5}
async function flow(k){
  if(k==='start'){await say('¡Hola! 👋 Soy el asistente virtual de <b>Fácil Dent</b>.');await say('¿En qué te puedo ayudar hoy?');opts([['📅 Quiero atenderme',()=>flow('cita')],['🦷 Consultar especialidad',()=>flow('esp')],['📍 Ubicación y horario',()=>flow('loc')],['🙋 Hablar con un asesor',()=>flow('asesor')]])}
  if(k==='cita'){await say('¡Genial! ¿Para qué tipo de tratamiento sería?');opts([...SPECS.map(s=>[s.n,()=>cita(s.n)]),['Otro / No sé',()=>cita('una evaluación general')]])}
  if(k==='esp'){await say('Estas son nuestras especialidades principales. ¿Cuál te interesa?');opts(SPECS.map((s,i)=>[s.n,async()=>{await say(`<b>${s.n}</b>: ${s.d}`);go(`Hola Fácil Dent 👋, quisiera información sobre ${s.n}.`,'Preguntar por WhatsApp')}]))}
  if(k==='loc'){await say('📍 Estamos en <b>Av. Los Olivos 104, San Martín de Porres</b>.');await say('🕘 Atendemos de <b>lunes a sábado de 9:00 a. m. a 9:00 p. m.</b> (refrigerio de 1:00 a 3:00 p. m.)');go('Hola Fácil Dent 👋, quisiera saber su horario de atención.');}
  if(k==='asesor'){await say('¡Claro! Te conecto con nuestro equipo por WhatsApp 😊');go('Hola Fácil Dent 👋, quisiera hablar con un asesor.')}
}
async function cita(e){await say(`Perfecto, ${e==='una evaluación general'?'te agendamos una evaluación':'cita para <b>'+e+'</b>'}. ¿Qué turno prefieres?`);opts([['Mañana',()=>fin(e,'mañana')],['Tarde',()=>fin(e,'tarde')],['Noche',()=>fin(e,'noche')]])}
async function fin(e,t){await say('¡Listo! ✅ Toca el botón y comunícate con nosotros por WhatsApp para confirmar tu cita.');go(`Hola Fácil Dent 👋, quiero atenderme. Me interesa ${e} en el turno de la ${t}.`)}

/* Privacidad + Libro de Reclamaciones */
// EDITAR: cuando registres tu libro gratis en Indecopi (Tu Libro de Reclamaciones), pega aquí tu enlace:
const LIBRO_URL='';
$('#libroBtn').href=LIBRO_URL||wa('Hola Fácil Dent, deseo registrar una queja o reclamo (Libro de Reclamaciones).');
$$('[data-priv]').forEach(b=>b.addEventListener('click',()=>$('#priv').classList.add('open')));
$('#priv').addEventListener('click',e=>{if(e.target.id==='priv'||e.target.hasAttribute('data-close-priv'))$('#priv').classList.remove('open')});
addEventListener('keydown',e=>{if(e.key==='Escape')$('#priv').classList.remove('open')});
/* FAQ: solo una abierta a la vez */
$$('.faq-i').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.faq-i').forEach(o=>{if(o!==d)o.open=false})}));
/* Medición de conversiones (lista para Meta Pixel / Google Tag) */
window.dataLayer=window.dataLayer||[];
document.addEventListener('click',e=>{const a=e.target.closest('a[href*="wa.me"],a[href^="tel:"]');if(!a)return;const ev=a.href.startsWith('tel:')?'llamada':'whatsapp';window.dataLayer.push({event:ev,origen:a.id||a.textContent.trim().slice(0,30)});try{if(window.fbq)fbq('track','Contact');if(window.gtag)gtag('event','generate_lead',{method:ev})}catch(_){}});

/* Chat: mensaje libre -> WhatsApp */
$('#chatForm').addEventListener('submit',async e=>{e.preventDefault();const t=$('#chatIn').value.trim().replace(/[<>]/g,'').slice(0,300);if(!t)return;$('#chatIn').value='';me(t);await say('¡Gracias! Te conecto con la clínica para responder tu consulta 😊');go('Hola Fácil Dent 👋, tengo una consulta: '+t,'Enviar mi consulta por WhatsApp')});

/* Mapa: vigilancia y respaldo automático */
(function(){const f=$('#gmap');if(!f)return;let ok=false,tries=0;
  const ALT='https://maps.google.com/maps?q=-11.9885757,-77.0813928&z=17&hl=es&output=embed';
  f.addEventListener('load',()=>{ok=true});
  const watch=()=>{ok=false;setTimeout(()=>{if(ok)return;tries++;if(tries===1){f.src=ALT;watch()}else{f.style.opacity='0';$('#croquis').style.zIndex='4'}},9000)};
  new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();watch()}},{rootMargin:'300px'}).observe(f);
  addEventListener('offline',()=>{f.style.opacity='0';$('#croquis').style.zIndex='4'});
  addEventListener('online',()=>{f.style.opacity='1';$('#croquis').style.zIndex='1'});
})();
