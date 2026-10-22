# InfiCode

Sitio estático de InfiCode construido con Astro. El contenido original, los estilos, el JavaScript y las imágenes se conservan. Los recursos estáticos están en `public/`, la página de inicio compone las secciones desde `src/components/` y vive en `src/pages/index.astro`.

Las secciones y tarjetas aparecen suavemente al entrar en pantalla al hacer scroll. La animación respeta la preferencia de movimiento reducido del dispositivo. La sección de proyectos usa un carrusel inmersivo con avance automático cada dos segundos, control para pausar o reanudar, flechas, indicadores, teclado y gestos táctiles. Se pausa al pasar el cursor, al enfocarlo o cuando la pestaña queda en segundo plano. La sección de dinámica presenta la promoción vigente para nuevos proyectos web con precios especiales. El contacto tiene una presentación tecnológica en tema claro y conserva el envío a WhatsApp. El pie de página incluye navegación breve, redes y enlace para volver arriba.

## Componentes

- `Header.astro`
- `Preloader.astro`
- `Hero.astro`
- `SobreInfiCode.astro`
- `Servicios.astro`
- `Proyectos.astro`
- `DinamicasExclusivas.astro`
- `Contacto.astro`
- `Footer.astro`

## Desarrollo

```sh
npm install
npm run dev
```

## Compilar y previsualizar

```sh
npm run build
npm run preview
```
