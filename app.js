const categories=[
{name:"Vidrios y aberturas",icon:"🪟",terms:"vidriero cristales espejos mamparas mosquiteros aluminio persianas"},
{name:"Calzado y cuero",icon:"👞",terms:"zapatero botas suelas talabartero guasquero marroquinería"},
{name:"Costura y textiles",icon:"🧵",terms:"costurera modista sastre arreglos ropa cortinas bordados tejidos"},
{name:"Herrería y metal",icon:"⚒️",terms:"herrero soldador tornero rejas portones cerrajero"},
{name:"Carpintería y muebles",icon:"🪚",terms:"carpintero muebles placares puertas restauración armado"},
{name:"Plomería y gas",icon:"🚿",terms:"plomero gasista sanitario destapaciones bombas termotanque riego"},
{name:"Electricidad y energía",icon:"💡",terms:"electricista iluminación tableros solar generador"},
{name:"Mecánica y vehículos",icon:"🚗",terms:"mecánico gomero chapista motos bicicletas electricidad automotor auxilio"},
{name:"Electrodomésticos",icon:"🧺",terms:"lavarropas heladera cocina televisor aire acondicionado refrigeración"},
{name:"Construcción y albañilería",icon:"🧱",terms:"albañil techista yesero cerámicos pintura membrana excavación"},
{name:"Jardín y exteriores",icon:"🌱",terms:"jardinero poda césped desmalezado vivero riego patio"},
{name:"Trabajos rurales",icon:"🚜",terms:"tractorista chacra viñedo alambrador cosecha maquinaria agrícola"},
{name:"Limpieza y hogar",icon:"🧹",terms:"limpieza vidrios tapizados lavadero planchado tanques alfombras"},
{name:"Peluquería y estética",icon:"✂️",terms:"peluquero barbero manicura maquillaje depilación peinados"},
{name:"Informática y tecnología",icon:"💻",terms:"computadora celular internet cámaras impresora redes diseño"},
{name:"Tapicería y restauración",icon:"🛋️",terms:"tapicero sillones colchones lustrado antigüedades"},
{name:"Oficios tradicionales",icon:"🪡",terms:"afilador relojero paraguas valijas encuadernador artesano luthier"},
{name:"Animales y mascotas",icon:"🐾",terms:"veterinario paseador cuidador peluquería canina herrador"},
{name:"Fletes y transporte",icon:"🚚",terms:"fletero mudanza reparto carga descarga mensajería"},
{name:"Eventos y creatividad",icon:"📸",terms:"fotógrafo video dj sonido músico decoración animador"},
{name:"Clases y enseñanza",icon:"📚",terms:"profesor apoyo escolar idiomas guitarra informática deporte"},
{name:"Cuidados y asistencia",icon:"🤲",terms:"niñera adultos mayores acompañamiento cuidador asistencia"},
{name:"Profesionales",icon:"📐",terms:"arquitecto agrimensor contador abogado escribano ingeniero matriculado"},
{name:"Pequeñas tareas y changas",icon:"🧰",terms:"mandados colgar cuadros cambiar canilla armar muebles cortar leña tareas"}];
const quick=["Plomería","Electricidad","Jardinería","Costura","Mecánica","Informática","Vidriero","Zapatero","Afilador"];
const data=window.BOCA_DATA||{prestadores:[],anuncios:[]};
const grid=document.querySelector("#categoryGrid"),providerGrid=document.querySelector("#providerGrid"),input=document.querySelector("#searchInput"),empty=document.querySelector("#emptyState"),count=document.querySelector("#resultCount");
let selectedCategory="";
function normalize(v){return String(v||"").toLocaleLowerCase("es-AR").normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function safe(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderCategories(){const term=normalize(input.value.trim());const list=categories.filter(c=>!term||normalize(c.name+" "+c.terms).includes(term));grid.innerHTML=list.map(c=>'<button class="category-card '+(selectedCategory===c.name?"selected":"")+'" type="button" data-category="'+safe(c.name)+'"><span class="category-icon">'+c.icon+'</span><span><strong>'+safe(c.name)+'</strong><small>Ver contactos y servicios →</small></span></button>').join("");}
function renderProviders(){const term=normalize(input.value.trim());const list=(data.prestadores||[]).filter(p=>{const t=normalize([p.nombre,p.rubro,p.localidad,p.descripcion].join(" "));return(!selectedCategory||normalize(p.rubro)===normalize(selectedCategory)||t.includes(normalize(selectedCategory)))&&(!term||t.includes(term));}).sort((a,b)=>Number(Boolean(b.local))-Number(Boolean(a.local))||Number(Boolean(b.destacado))-Number(Boolean(a.destacado)));count.textContent=list.length+" "+(list.length===1?"contacto":"contactos");document.querySelector("#resultsHeading").textContent=selectedCategory||"Personas y servicios de la zona";providerGrid.innerHTML=list.map(p=>{const phone=String(p.whatsapp||"").replace(/[^0-9]/g,"");const contact=phone?'<a href="https://wa.me/'+phone+'" target="_blank" rel="noopener">Contactar por WhatsApp ↗</a>':(p.telefonoVisible?'<a href="tel:'+safe(p.telefonoVisible)+'">Llamar: '+safe(p.telefonoVisible)+'</a>':"");return '<article class="provider-card"><span class="provider-badge">'+(p.local?"De San Patricio":"Trabaja en la zona")+'</span><h4>'+safe(p.nombre)+'</h4><div class="provider-meta">'+safe(p.rubro||"Servicio")+' · '+safe(p.localidad||"Zona de cobertura")+'</div><p>'+safe(p.descripcion||"Consultá disponibilidad y detalles del servicio.")+'</p>'+contact+'</article>';}).join("");empty.hidden=list.length>0;}
function renderAll(){renderCategories();renderProviders();}
document.querySelector("#quickSearches").className="quick-list";
document.querySelector("#quickSearches").innerHTML=quick.map(q=>'<button class="quick-chip" type="button" data-search="'+q+'">'+q+'</button>').join("");
document.querySelector("#searchForm").addEventListener("submit",e=>{e.preventDefault();selectedCategory="";renderAll();});
input.addEventListener("input",()=>{selectedCategory="";renderAll();});
document.querySelector("#showAll").addEventListener("click",()=>{input.value="";selectedCategory="";renderAll();});
document.querySelector("#quickSearches").addEventListener("click",e=>{const b=e.target.closest("[data-search]");if(!b)return;input.value=b.dataset.search;selectedCategory="";renderAll();document.querySelector("#agenda").scrollIntoView({behavior:"smooth"});});
grid.addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;selectedCategory=selectedCategory===b.dataset.category?"":b.dataset.category;input.value="";renderAll();document.querySelector("#directoryResults").scrollIntoView({behavior:"smooth",block:"start"});});
renderAll();