(function(){
 const form=document.getElementById("signupForm");if(!form)return;
 const message=document.getElementById("signupMessage"),cfg=window.BOCA_SUPABASE||{};
 const ready=Boolean(cfg.url&&cfg.anonKey),endpoint=ready?cfg.url.replace(/\/$/,"")+"/rest/v1/prestadores":null;
 function say(t,c){message.textContent=t;message.className="signup-message "+(c||"");}
 function digits(v){let n=String(v||"").replace(/[^0-9]/g,"");if(n.length===10)n="549"+n;return n;}
 async function load(){
  if(!ready)return;
  try{
   const r=await fetch(endpoint+"?select=nombre,oficio,telefono,created_at&order=created_at.desc",{headers:{apikey:cfg.anonKey,Authorization:"Bearer "+cfg.anonKey}});
   if(!r.ok)throw Error("load");
   const rows=await r.json();window.BOCA_DATA=window.BOCA_DATA||{prestadores:[],anuncios:[]};
   window.BOCA_DATA.prestadores=rows.map(x=>({nombre:x.nombre,rubro:x.oficio,whatsapp:digits(x.telefono),local:false,agenda:true,localidad:"San Patricio del Chañar y alrededores",descripcion:"Contacto publicado por su titular.",destacado:false}));
   if(window.bocaRenderProviders)window.bocaRenderProviders();
  }catch(e){say("No pudimos cargar los contactos en este momento. Probá nuevamente más tarde.","error");}
 }
 form.addEventListener("submit",async e=>{
  e.preventDefault();if(form.website.value)return;
  if(!ready){say("El formulario todavía no está conectado a la base de datos. La publicación automática aún no está activa.","error");return;}
  const nombre=form.nombre.value.trim(),oficio=form.oficio.value.trim(),telefono=form.telefono.value.trim(),n=digits(telefono);
  if(nombre.length<2||oficio.length<2||n.length<8||n.length>15){say("Revisá los datos: ingresá un nombre, un oficio y un teléfono válido.","error");return;}
  const btn=form.querySelector("button[type=submit]");btn.disabled=true;btn.textContent="PUBLICANDO…";say("Estamos publicando tu contacto…");
  try{
   const r=await fetch(endpoint,{method:"POST",headers:{apikey:cfg.anonKey,Authorization:"Bearer "+cfg.anonKey,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({nombre,oficio,telefono})});
   if(!r.ok)throw Error("insert");
   form.reset();say("¡Listo! Tu contacto fue publicado. Ya puede aparecer en la agenda.","success");await load();
  }catch(e){say("No se pudo publicar. Revisá tu conexión e intentá nuevamente.","error");}
  finally{btn.disabled=false;btn.innerHTML='PUBLICAR MIS DATOS <span>↗</span>';}
 });
 if(!ready)say("Formulario preparado. La publicación automática se activará al conectar la base de datos.");
 load();
})();
