# Boca a Boca · Agenda local

Agenda digital de oficios, profesionales, comercios y servicios de San Patricio del Chañar y localidades cercanas que trabajan en la zona.

## Criterio del proyecto
- Agenda local, no red social ni sistema de trueques.
- Prioridad visual y de orden para prestadores radicados en San Patricio del Chañar.
- También se admiten prestadores de localidades cercanas que efectivamente trabajen en Chañar.
- Contacto directo entre quien busca y quien ofrece el servicio.
- Alta básica gratuita; publicidad visual paga y claramente identificada.
- No se inventan prestadores, teléfonos, matrículas ni recomendaciones.

## Archivos
- `index.html`: portada y estructura.
- `styles.css`: diseño adaptable a celular, tablet y computadora.
- `agenda.js`: datos editables de prestadores y anuncios.
- `app.js`: buscador, filtros, fichas y espacios publicitarios.

## Cómo agregar un prestador
Editar el arreglo `prestadores` en `agenda.js`. Ejemplo de estructura (datos ficticios; no publicar):
```js
{
  nombre: "Nombre del prestador",
  rubro: "Plomería y gas",
  localidad: "San Patricio del Chañar",
  local: true,
  descripcion: "Descripción breve del servicio",
  whatsapp: "5492990000000",
  telefonoVisible: "299 000 0000",
  destacado: false,
  imagen: ""
}
```
- Usar `local: true` solo para personas o comercios radicados en San Patricio.
- Para prestadores de otras localidades que trabajan en Chañar, usar `local: false`.
- El orden prioriza prestadores locales. El campo `destacado` permite marcar una ficha comercial, pero no reemplaza la prioridad local.
- Publicar únicamente con autorización y datos revisados.
- No usar etiquetas como “de confianza”, “matriculado” o “habilitado” sin verificación correspondiente.

## Cómo agregar publicidad
Editar el arreglo `anuncios` en `agenda.js`:
```js
{
  marca: "Nombre del comercio",
  imagen: "assets/anuncio-comercio.jpg",
  enlace: "https://sitio-o-contacto-del-anunciante",
  alt: "Descripción del anuncio",
  activo: true
}
```
La imagen debe existir dentro del repositorio y el enlace debe ser proporcionado por el anunciante. Los anuncios se muestran identificados como publicidad. No implican recomendación ni garantía.

## Estado de las funciones
- Diseño responsive y navegación por rubros: implementados.
- Búsqueda de contactos y fichas: implementadas; todavía no hay prestadores reales cargados.
- Espacios visuales para publicidad: implementados; falta incorporar campañas contratadas.
- Formulario de alta: pendiente de conectar.
- Canal de contacto administrativo y comercial: pendiente de definir.
- GitHub Pages: verificar y activar desde Settings > Pages si todavía no está publicado.

## Limitación técnica
GitHub Pages sirve archivos estáticos: no recibe ni almacena altas por sí solo. En esta primera etapa los contactos se revisan y se agregan manualmente a `agenda.js`. Para automatizar el ingreso habrá que conectar un formulario externo o un servicio de datos. No anunciar que un formulario está activo hasta probarlo de punta a punta.

Desarrollado por Elías Martínez / Ocarina Producciones.
