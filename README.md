# Ankush Sharma — Portfolio

Static site: HTML, CSS and JavaScript. Libraries are bundled in `js/vendor` (Three.js r128, GSAP 3.12.5 + ScrollTrigger, Lenis 1.1.13). Fonts load from Google Fonts.

## Run locally
    npx serve .
(or `python3 -m http.server`) then open the printed address. Open it through a server, not by double-clicking the file.

## Deploy
Vercel, Netlify or GitHub Pages: upload this folder as-is. There is no build step.

## Edit
- Text and links: `index.html`
- Colours and layout: `css/style.css` (colour tokens are at the top, in `:root`)
- Star field, scroll and animations: `js/main.js`

## Notes
- Scroll is handled by Lenis only, driven by the GSAP ticker. Do not add a second smooth-scroll library.
- `prefers-reduced-motion` turns off smooth scroll, text reveals and star movement.
