# Boca a Boca · Agenda local

Agenda digital de oficios, profesionales, trabajadores, comercios y empresas de San Patricio del Chañar y localidades cercanas que prestan servicios en la zona.

## Archivos
- `index.html`: estructura y contenido.
- `styles.css`: diseño adaptable a celular, tablet y computadora.
- `agenda.js`: datos editables de prestadores y anuncios.
- `app.js`: buscador, filtros por rubro y fichas.

## Criterios
- Prioridad visual para prestadores radicados en San Patricio del Chañar.
- También se admiten prestadores cercanos que trabajen en Chañar.
- No es una red social ni un sistema de trueques: es una agenda de contactos.
- La agenda básica será gratuita; la publicidad paga se identificará claramente.
- No se inventan prestadores, teléfonos, matrículas ni recomendaciones.

## Cómo sumar un prestador
Editar el arreglo `prestadores` en `agenda.js`. Estructura de ejemplo (datos ficticios, no publicar):
```js
{ nombre:"Nombre", rubro:"Plomería y gas", localidad:"San Patricio del Chañar", local:true, descripcion:"Descripción", whatsapp:"5492990000000", telefonoVisible:"299 000 0000", destacado:false }
```
Usar `local: true` solo para quienes estén radicados en San Patricio. Para prestadores de otras localidades que atiendan en Chañar, usar `local: false`. Publicar únicamente con autorización y datos revisados.

## Publicidad
El arreglo `anuncios` queda reservado para futuras piezas gráficas de anunciantes. Antes de activar campañas hay que definir contacto comercial, formatos, condiciones, vigencia y precios. Un anuncio pago no es una recomendación ni una garantía.

## Limitación técnica actual
GitHub Pages publica archivos estáticos: no recibe formularios ni guarda altas automáticamente. En esta etapa, los datos se incorporan manualmente en `agenda.js`. El formulario de inscripción y el canal comercial se conectarán cuando se definan los datos de contacto y el servicio externo. No se debe anunciar que una solicitud fue enviada mientras esa integración no exista.

Desarrollado por Elías Martínez / Ocarina Producciones.
