# Contexto del proyecto Maravilla Films

Documento de referencia para agentes y colaboradores. Describe el estado y las convenciones del proyecto; las instrucciones operativas obligatorias están en `AGENTS.md`.

## Objetivo y tono

Web corporativa de Maravilla Films, productora audiovisual independiente. Debe transmitir una identidad cinematográfica, cuidada y profesional, pero cercana y con personalidad. La sección de equipo puede usar un tono más desenfadado; las páginas legales, de contacto y compra deben ser claras y sobrias.

## Tecnología y despliegue

- Astro 6 con páginas `.astro` y estilos SCSS locales/globales.
- Node.js `>=22.12.0`.
- Sitio estático desplegado en Cloudflare Pages.
- `functions/api/contact.js`: endpoint del formulario de contacto.
- Resend envía los mensajes a `producciones@maravillafilms.com` mediante la variable secreta `RESEND_API_KEY` configurada en Cloudflare.
- Dominio de producción: `https://maravillafilms.com`.
- Comandos principales: `npm run dev` y `npm run build`.

## Estructura principal

- `src/layouts/Layout.astro`: layout global, metadatos, cabecera, navegación, pie, tipografías y variables de diseño.
- `src/pages/index.astro`: inicio, hero audiovisual, proyectos y noticias.
- `src/pages/about.astro`: equipo y productores ejecutivos.
- `src/pages/catalogo.astro`: catálogo audiovisual.
- `src/pages/el-ramo.astro`: ficha del cortometraje y carrusel del rodaje.
- `src/pages/raices-ancestrales.astro`: proyecto documental.
- `src/pages/contact.astro`: formulario de contacto.
- `src/pages/editorial.astro`: catálogo de Editorial Cumbre Serena.
- `src/pages/editorial/*`: fichas individuales de los libros.
- `src/components/EditorialBookPage.astro`: plantilla compartida de las fichas editoriales.
- `src/components/LegalPage.astro`: plantilla de páginas legales.
- `public/img`, `public/video`: recursos estáticos optimizados.
- `public/robots.txt`, `public/sitemap.xml`: rastreo e indexación.

## Navegación pública

El menú principal contiene:

- Inicio
- Quiénes somos
- Catálogo
- Editorial
- Contacto

La navegación debe mantenerse consistente tanto en escritorio como en el menú móvil.

## Sistema visual

### Maravilla Films

- Fondo principal: `#000000`.
- Superficie profunda: `#0D0E10`.
- Superficie: `#101114`.
- Superficie elevada: `#17181B`.
- Texto principal: `#F5F5F5`.
- Gris claro: `#B0AEAF`.
- Azul de acento: `#0050FB`.

### Editorial Cumbre Serena

- Turquesa principal: `#10A9BD`.
- Contraste oscuro: `#031013`.

### Tipografía y composición

- `--font-body`: Playfair Display; aporta el tono editorial y cinematográfico.
- `--font-title`: Barlow; títulos, navegación, etiquetas y botones.
- Ancho máximo habitual: `1200px`.
- Usar fondos oscuros, espacio generoso, jerarquía clara y animaciones discretas.
- Evitar componentes genéricos, colores arbitrarios, bordes excesivamente redondeados y efectos llamativos ajenos a la marca.

## Convenciones responsive

- Diseñar primero para móvil.
- No asumir alturas fijas de viewport para contenido esencial.
- Comprobar que textos, controles del hero, carruseles y navegación no se superponen.
- En tablet y escritorio, ampliar progresivamente sin alterar el orden semántico móvil.
- Los objetivos táctiles deben ser cómodos y los controles multimedia accesibles.

## Imágenes y vídeo

- Conservar siempre los originales del usuario.
- Preferir WebP para imágenes publicadas y MP4 optimizado para vídeo cuando sea compatible.
- Los archivos `_opt.webp` suelen ser las versiones preparadas para la web; verificar referencias antes de eliminar duplicados.
- No recortar rostros, carteles o portadas sin autorización. Usar `object-fit` y `object-position` de forma deliberada.
- Mantener atributos `alt` descriptivos y carga diferida salvo en recursos prioritarios del primer viewport.

## Hero de inicio

- Presenta proyectos audiovisuales con vídeo, imagen, estado y controles.
- Los vídeos se reproducen automáticamente cuando el navegador lo permite y avanzan en bucle entre proyectos.
- Mantener controles de reproducción y volumen, además del botón central contextual.
- En móvil, los controles deben centrarse respecto a la pantalla de vídeo, no respecto al viewport completo.

## Catálogo audiovisual

- Orden actual: El Ramo, Bélmez: la historia de Carne y Cal, Esto no es Hollywood y Raíces ancestrales.
- Las tarjetas usan escenas horizontales; las tarjetas del inicio utilizan carteles verticales.
- No mezclar ambos lenguajes visuales: inicio presenta cartelería y catálogo presenta escenas.

## Equipo

- Fotografías horizontales, en color y con ampliación sutil al pasar el cursor.
- Todas las incorporaciones nuevas deben seguir el mismo formato.
- El tono de las biografías puede ser amistoso y humorístico sin perder profesionalidad.

## Editorial Cumbre Serena

- Es una editorial de Maravilla Films y utiliza turquesa como acento propio.
- Libros actuales: `El poder de una lágrima` y `Carne y Cal`.
- Las portadas del catálogo enlazan a su ficha interna.
- El botón `Comprar` enlaza a Amazon en una pestaña nueva.
- Las fichas individuales comparten `EditorialBookPage.astro` e incluyen portada, sinopsis, compra y ficha técnica.
- No inventar ISBN, fechas, páginas, formatos, biografías ni datos comerciales; solicitar los datos faltantes.

## SEO y legal

- `Layout.astro` gestiona título, descripción, canonical, Open Graph y datos estructurados.
- Las páginas públicas deben ser indexables salvo decisión expresa.
- Al crear o retirar una ruta pública, revisar `public/sitemap.xml` y los enlaces internos pertinentes.
- Páginas legales: privacidad, cookies y aviso legal.
- No modificar textos legales sustancialmente sin datos confirmados o revisión adecuada.

## Criterio de finalización

Un cambio está listo cuando:

1. Cumple exactamente la petición.
2. Funciona primero en móvil y después en los tamaños afectados.
3. No rompe rutas, recursos ni integraciones existentes.
4. `npm run build` termina correctamente.
5. El usuario ha revisado el resultado local cuando el cambio es visual.
6. El push solo se realiza tras autorización expresa.

