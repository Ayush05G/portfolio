# Portfolio — Netflix Edition

An interactive, **Netflix-inspired** personal portfolio built with **React + Vite** and **Framer Motion**.

It opens with a logo "sting", then a **"Who's watching?"** profile gate, and drops you into a Netflix-style browse experience: a billboard hero (you, as the featured "title"), horizontally-scrolling rows of cards for Projects / Skills / Journey, and a detail modal when you click a project.

## Run it

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Make it yours

**Almost everything you'll want to change lives in one file:** [`src/data.js`](src/data.js).

- **`profile`** — your name, tagline, and the billboard "metadata" (`match`, `year`, `rating`, `genres`) plus your email and optional résumé link.
- **`profiles`** — the "Who's watching?" avatars. Each has a `name` and a `color` (CSS gradient for the avatar).
- **`socials`** — your GitHub / LinkedIn / etc. (the "Let's Connect" cards).
- **`about`** — your bio paragraphs and the quick-fact cards.
- **`skills`** — each skill is a card in the "Skills & Technologies" row. `level` (0–100) drives the little bar; `tag` is the small label.
- **`projects`** — the "Featured Projects" row. Each has a `blurb` (card) and `longDescription` (modal), `tags`, `match`, `year`, optional `link`/`repo`, and an `accent` color (any hex — it tints the card art and the modal header).
- **`timeline`** — the "My Journey" row.

### Résumé
Drop a `resume.pdf` into `public/`, then set `resumeUrl: '/resume.pdf'` in `profile`. A "Résumé" button then appears in the nav.

### Colors & branding
Design tokens are CSS variables at the top of [`src/index.css`](src/index.css). The Netflix red is `--nf-red` — change it (and `--nf-black`) to re-theme the whole site.

## Deploy

`npm run build` outputs a static site to `/dist` — host it free on **Netlify**, **Vercel**, **GitHub Pages**, or **Cloudflare Pages** (build command `npm run build`, output dir `dist`), or drag the `dist` folder onto Netlify.

## Features

- Netflix-style logo intro + **"Who's watching?"** profile gate
- Sticky nav (transparent → solid on scroll) with your red logo and section highlighting
- **Billboard hero** with match %, genres, and Play / More Info buttons
- Horizontally-scrolling **card rows** with hover-scale and left/right arrows
- **Detail modal** for projects (Esc or click-outside to close)
- Animated skill bars, responsive layout, respects `prefers-reduced-motion`

> Netflix-inspired for fun — not affiliated with or endorsed by Netflix.
