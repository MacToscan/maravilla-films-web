# Maravilla Films — instrucciones para agentes

Estas normas se aplican a todo el repositorio. Antes de cambios amplios, consulta `docs/PROJECT_CONTEXT.md`.

## Forma de trabajar

- Responde al usuario en español y con lenguaje claro, salvo que pida otra cosa.
- Trabaja siempre con enfoque **mobile-first** y valida después tablet y escritorio.
- Si falta un dato que pueda cambiar materialmente el resultado, pregunta antes de editar.
- Limítate al cambio solicitado: no refactorices, rediseñes ni añadas mejoras no pedidas.
- Reutiliza el contexto y lee únicamente los archivos necesarios; minimiza comandos, búsquedas y ciclos de prueba.
- Si una herramienta entra en reintentos o falla repetidamente, detente e informa al usuario.
- Conserva los cambios manuales y cualquier trabajo ajeno existente en el árbol de trabajo.

## Git y verificaciones

- **Nunca hagas push sin autorización expresa del usuario.**
- Antes de cualquier push, ejecuta `npm run build` y comprueba primero el resultado local cuando el cambio sea visual.
- No hagas commit salvo que el usuario lo solicite o autorice claramente.
- No uses operaciones destructivas de Git ni elimines archivos sin comprobar que no se utilizan.

## Diseño y contenido

- Conserva la estética oscura, cinematográfica, minimalista y editorial de la marca.
- Reutiliza las variables globales de `src/layouts/Layout.astro`; no disperses colores estructurales nuevos.
- El ancho principal de contenido es `1200px`.
- Tipografías: Playfair Display para cuerpo/editorial y Barlow para títulos e interfaz.
- No sobrescribas recursos originales. Crea versiones optimizadas en WebP cuando sea necesario.
- Mantén accesibilidad básica: HTML semántico, textos alternativos, etiquetas y navegación por teclado.

## Integraciones y seguridad

- Producción se despliega en Cloudflare Pages.
- El formulario usa una Pages Function y Resend. Nunca expongas `RESEND_API_KEY` ni otros secretos en el cliente o en Git.
- Los enlaces externos deben usar `target="_blank"` con `rel="noopener noreferrer"` cuando corresponda.
- No cambies DNS, correo, Cloudflare, Resend ni servicios externos sin autorización explícita.

