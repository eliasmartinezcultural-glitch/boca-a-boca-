const categories = [
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
  {name:"Pequeñas tareas y changas",icon:"🧰",terms:"mandados colgar cuadros cambiar canilla armar muebles cortar leña tareas"}
];

const quick = ["Plomería","Electricidad","Jardinería","Costura","Mecánica","Informática","Vidriero","Zapatero","Afilador"];
const grid = document.querySelector("#categoryGrid");
const input = document.querySelector("#searchInput");
const count = document.querySelector("#resultCount");
const empty = document.querySelector("#emptyResults");

function renderCategories(query = "") {
  const term = normalize(query);
  const filtered = categories.filter(item => normalize(item.name + " " + item.terms).includes(term));
  grid.innerHTML = filtered.map(item => `
    <button class="category-card" type="button" data-category="${item.name}" aria-label="Buscar en ${item.name}">
      <span class="category-icon">${item.icon}</span>
      <span><strong>${item.name}</strong><small>Explorar especialidades →</small></span>
    </button>`).join("");
  count.textContent = term ? `${filtered.length} categorías encontradas` : `${categories.length} familias de oficios y tareas`;
  empty.hidden = filtered.length !== 0;
}
function normalize(value) {
  return value.toLocaleLowerCase("es-AR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
document.querySelector("#quickCategories").innerHTML = quick.map(label => `<button class="quick-chip" type="button" data-search="${label}">${label}</button>`).join("");
input.addEventListener("input", () => renderCategories(input.value));
document.querySelector("#searchButton").addEventListener("click", () => renderCategories(input.value));
document.querySelector("#clearSearch").addEventListener("click", () => { input.value = ""; renderCategories(); });
document.querySelector("#quickCategories").addEventListener("click", event => {
  const chip = event.target.closest("[data-search]");
  if (!chip) return;
  input.value = chip.dataset.search;
  renderCategories(input.value);
  document.querySelector("#explorar").scrollIntoView({behavior:"smooth"});
});
grid.addEventListener("click", event => {
  const card = event.target.closest("[data-category]");
  if (!card) return;
  input.value = card.dataset.category;
  renderCategories(input.value);
  document.querySelector("#searchInput").focus();
});
renderCategories();