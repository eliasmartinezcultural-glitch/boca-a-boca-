const categories=[
{name:"Vidrios y aberturas",icon:"🪟",terms:"vidriero cristales espejos mamparas mosquiteros aluminio persianas",desc:"Vidrios, ventanas y cerramientos"},
{name:"Calzado y cuero",icon:"👞",terms:"zapatero botas suelas talabartero guasquero marroquinería",desc:"Arreglos de calzado y cuero"},
{name:"Costura y textiles",icon:"🧵",terms:"costurera modista sastre arreglos ropa cortinas bordados tejidos",desc:"Costura, ropa y arreglos"},
{name:"Herrería y metal",icon:"⚒️",terms:"herrero soldador tornero rejas portones cerrajero",desc:"Metal, rejas y reparaciones"},
{name:"Carpintería y muebles",icon:"🪚",terms:"carpintero muebles placares puertas restauración armado",desc:"Muebles, madera y armado"},
{name:"Plomería y gas",icon:"🚿",terms:"plomero gasista sanitario destapaciones bombas termotanque riego",desc:"Agua, gas y sanitarios"},
{name:"Electricidad y energía",icon:"💡",terms:"electricista iluminación tableros solar generador",desc:"Instalaciones y electricidad"},
{name:"Mecánica y vehículos",icon:"🚗",terms:"mecánico gomero chapista motos bicicletas electricidad automotor auxilio",desc:"Autos, motos y bicicletas"},
{name:"Electrodomésticos",icon:"🧺",terms:"lavarropas heladera cocina televisor aire acondicionado refrigeración",desc:"Reparación de equipos"},
{name:"Construcción y albañilería",icon:"🧱",terms:"albañil techista yesero cerámicos pintura membrana excavación",desc:"Obra, pintura y reformas"},
{name:"Jardín y exteriores",icon:"🌱",terms:"jardinero poda césped desmalezado vivero riego patio",desc:"Patios, poda y mantenimiento"},
{name:"Trabajos rurales",icon:"🚜",terms:"tractorista chacra viñedo alambrador cosecha maquinaria agrícola",desc:"Tareas y maquinaria rural"},
{name:"Limpieza y hogar",icon:"🧹",terms:"limpieza vidrios tapizados lavadero planchado tanques alfombras",desc:"Limpieza y mantenimiento"},
{name:"Peluquería y estética",icon:"✂️",terms:"peluquero barbero manicura maquillaje depilación peinados",desc:"Peluquería y cuidado personal"},
{name:"Informática y tecnología",icon:"💻",terms:"computadora celular internet cámaras impresora redes diseño",desc:"PC, celulares y tecnología"},
{name:"Tapicería y restauración",icon:"🛋️",terms:"tapicero sillones colchones lustrado antigüedades",desc:"Tapizados y restauraciones"},
{name:"Oficios tradicionales",icon:"🪡",terms:"afilador relojero paraguas valijas encuadernador artesano luthier",desc:"Esos oficios que siempre hacen falta"},
{name:"Animales y mascotas",icon:"🐾",terms:"veterinario paseador cuidador peluquería canina herrador",desc:"Mascotas y animales"},
{name:"Fletes y transporte",icon:"🚚",terms:"fletero mudanza reparto carga descarga mensajería",desc:"Traslados, fletes y mudanzas"},
{name:"Eventos y creatividad",icon:"📸",terms:"fotógrafo video dj sonido músico decoración animador",desc:"Fotos, música y eventos"},
{name:"Clases y enseñanza",icon:"📚",terms:"profesor apoyo escolar idiomas guitarra informática deporte",desc:"Clases y acompañamiento"},
{name:"Cuidados y asistencia",icon:"🤲",terms:"niñera adultos mayores acompañamiento cuidador asistencia",desc:"Acompañamiento y cuidados"},
{name:"Profesionales",icon:"📐",terms:"arquitecto agrimensor contador abogado escribano ingeniero matriculado",desc:"Servicios profesionales"},
{name:"Pequeñas tareas y changas",icon:"🧰",terms:"mandados colgar cuadros cambiar canilla armar muebles cortar leña tareas",desc:"Ayudas y trabajos puntuales"}
];
const quick=["Plomería","Electricidad","Jardinería","Costura","Mecánica","Informática","Vidriero","Zapatero","Afilador"];
const data=window.BOCA_DATA||{prestadores:[],anuncios:[]};
const grid=document.querySelector("#categoryGrid"),providerGrid=document.querySelector("#providerGrid"),input=document.querySelector("#searchInput"),empty=document.querySelector("#emptyState"),count=document.querySelector("#resultCount");
let selectedCategory="";
function normalize(v){return String(v||"").toLocaleLowerCase("es-AR").normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function safe(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderCategories(){
 const term=normalize(input.value.trim());
 const list=categories.filter(c=>!term||normalize(c.name+" "+c.terms).includes(term));
 grid.innerHTML=list.map((c,i)=>'<button class="category-card tone-'+(i%6)+' '+(selectedCategory===c.name?"selected":"")+'" type="button" data-category="'+safe(c.name)+'"><span class="category-card-top"><span class="category-icon">'+c.icon+'</span><span class="category-arrow">↗</span></span><span><strong>'+safe(c.name)+'</strong><small>'+safe(c.desc)+'</small></span></button>').join("");
}
function renderProviders(){
 const term=normalize(input.value.trim());
 const list=(data.prestadores||[]).filter(p=>{
  const searchable=normalize([p.nombre,p.rubro,p.localidad,p.descripcion,p.tipo].join(" "));
  const selected=categories.find(c=>c.name===selectedCategory); 
  const categoryTerms=selected?selected.terms.split(" "):[]; 
  const categoryMatch=!selectedCategory||normalize(p.rubro).includes(normalize(selectedCategory))||categoryTerms.some(term=>searchable.includes(normalize(term)));
  return categoryMatch&&(!term||searchable.includes(term));
 }).sort((a,b)=>Number(Boolean(b.local))-Number(Boolean(a.local))||Number(Boolean(b.destacado))-Number(Boolean(a.destacado))||String(a.nombre).localeCompare(String(b.nombre),"es"));
 count.textContent=list.length+" "+(list.length===1?"contacto":"contactos");
 document.querySelector("#resultsHeading").textContent=selectedCategory||"Personas y servicios";
 providerGrid.innerHTML=list.map(p=>{
  const phone=String(p.whatsapp||"").replace(/[^0-9]/g,"");
  const contact=phone?'<a class="provider-contact" href="https://wa.me/'+phone+'" target="_blank" rel="noopener">WhatsApp <span>↗</span></a>':(p.telefonoVisible?'<a class="provider-contact" href="tel:'+safe(p.telefonoVisible)+'">Llamar <span>↗</span></a>':"");
  const image=p.imagen?'<img class="provider-image" src="'+safe(p.imagen)+'" alt="" loading="lazy">':'<div class="provider-image provider-image-placeholder">'+safe((p.nombre||"B").trim().charAt(0).toUpperCase())+'</div>';
  return '<article class="provider-card '+(p.destacado?'provider-featured':'')+'">'+image+'<div class="provider-card-content"><div class="provider-tags"><span class="provider-badge">'+(p.local?"Prestador local":"Trabaja en Chañar")+'</span>'+(p.destacado?'<span class="featured-badge">DESTACADO</span>':"")+'</div><h4>'+safe(p.nombre)+'</h4><div class="provider-meta">'+safe(p.rubro||"Servicio")+' · '+safe(p.localidad||"Zona de cobertura")+'</div><p>'+safe(p.descripcion||"Consultá disponibilidad y detalles del servicio.")+'</p>'+contact+'</div></article>';
 }).join("");
 empty.hidden=list.length>0;
}
function renderAds(){
 const active=(data.anuncios||[]).filter(a=>a.activo!==false&&a.imagen);
 const container=document.querySelector("#adGrid");
 if(!active.length)return;
 container.innerHTML=active.map((a,i)=>'<a class="ad-live '+(i===0?'ad-live-main':'')+'" href="'+safe(a.enlace||"#sumar")+'" target="'+(a.enlace?'_blank':'_self')+'" rel="noopener"><span class="ad-label">PUBLICIDAD</span><img src="'+safe(a.imagen)+'" alt="'+safe(a.alt||a.marca||"Anuncio")+'" loading="lazy"><span class="ad-live-name">'+safe(a.marca||"Comercio local")+'</span></a>').join("");
}
function renderAll(){renderCategories();renderProviders();}
document.querySelector("#quickSearches").innerHTML=quick.map(q=>'<button class="quick-chip" type="button" data-search="'+safe(q)+'">'+safe(q)+'</button>').join("");
document.querySelector("#searchForm").addEventListener("submit",e=>{e.preventDefault();selectedCategory="";renderAll();document.querySelector("#directoryResults").scrollIntoView({behavior:"smooth",block:"start"});});
input.addEventListener("input",()=>{selectedCategory="";renderAll();});
document.querySelector("#showAll").addEventListener("click",()=>{input.value="";selectedCategory="";renderAll();});
document.querySelector("#quickSearches").addEventListener("click",e=>{const b=e.target.closest("[data-search]");if(!b)return;input.value=b.dataset.search;selectedCategory="";renderAll();document.querySelector("#directoryResults").scrollIntoView({behavior:"smooth",block:"start"});});
grid.addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;selectedCategory=selectedCategory===b.dataset.category?"":b.dataset.category;input.value="";renderAll();document.querySelector("#directoryResults").scrollIntoView({behavior:"smooth",block:"start"});});
renderAds();renderAll();