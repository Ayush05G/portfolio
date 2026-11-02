# Portfolio — Netflix Edition

An interactive, **Netflix-inspired** personal portfolio built with **React + Vite** and **Framer Motion**.

It opens directly into a Netflix-style browse experience: a clear introduction,
selected projects, structured case studies and an experience spotlight. The logo
intro and **"Who's watching?"** profiles are optional under More. Recruiter and
Developer views use their respective resumes.

## Run it

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Make it yours

**Almost everything you'll want to change lives in one file:** [`src/data.ts`](src/data.ts).

- **`profile`** — your name, tagline, and the billboard "metadata" (`match`, `year`, `rating`, `genres`) plus your email, optional résumé link, and optional video `trailer`.
- **`profiles`** — the "Who's watching?" avatars. Each has a `name` and a `color` (CSS gradient for the avatar). One is hidden behind the Konami code.
- **`socials`** — your GitHub / LinkedIn / etc. (the "Let's Connect" cards).
- **`about`** — your bio paragraphs and the quick-fact cards.
- **`skills`** — each skill is a card in the "Skills & Technologies" row. `level` (0–100) drives the little bar; `tag` is the small label.
- **`projects`** — the "Featured Projects" row. Each has a `blurb` (card) and `longDescription` (modal), `tags`, `match`, `year`, optional `link`/`repo`, an `accent` color, and an optional `related` list to hand-pick its "Because you watched" row.
- **`seasons`** — experience & education as Seasons & Episodes (the "Experience" section).
- **`statsConfig` / `statsFallback`** — the live GitHub + LeetCode row and its offline numbers.

### Résumé

Drop a `resume.pdf` into `public/`, then set `resumeUrl: '/resume.pdf'` in `profile`. A "Résumé" button then appears in the nav.

To refresh both public resumes from the sibling Resume Maker portal's current
master profile and PDF layout:

```bash
node scripts/refresh-resumes.mjs
```

Pass the portal directory as the first argument if it lives elsewhere. Its
dependencies must already be installed. The script reads the portal without
changing it, removes the phone before rendering, and builds separate Product
and Developer selections. It keeps the site's verified `600+` solved lower
bound and omits the profile's unsupported Top 100K claim. It fails if a selected
bullet or skill no longer exists, or the PDF cannot fit on one page. Review
both PDFs visually after regeneration. Full provenance and candidate additions
from the November review are in [the content audit](docs/content-audit-2026-11-03.md).

### Billboard video trailer

`node scripts/make-trailer.mjs` rebuilds `public/trailer/trailer.mp4` + `poster.jpg` (requires ffmpeg) — it composes branded frames from the real project chart SVGs in `public/projects/` and assembles a Ken Burns slideshow. To use your own screen recording instead, encode it with

```bash
ffmpeg -i raw.mov -t 22 -vf "scale=1280:-2,fps=24" -an -c:v libx264 -crf 28 -pix_fmt yuv420p -movflags +faststart public/trailer/trailer.mp4
```

and keep it under ~4 MB. The trailer mounts only after the visitor explicitly
chooses Watch the portfolio trailer. Delete `profile.trailer` in `data.ts` to
remove that action. Sound is off by default and follows the global preference.

### Colors & branding

Design tokens are CSS variables at the top of [`src/index.css`](src/index.css). The Netflix red is `--nf-red` — change it (and `--nf-black`) to re-theme the whole site.

## Deploy

`npm run build` outputs a static site to `/dist` — host it free on **Netlify**, **Vercel**, **GitHub Pages**, or **Cloudflare Pages** (build command `npm run build`, output dir `dist`), or drag the `dist` folder onto Netlify.

## Features

- Direct entry to the portfolio; optional Netflix-style intro and profile selection under More
- Clear hero actions for selected work, the profile-specific resume, email and LinkedIn
- Three featured projects with real product previews where available; expand to see all six
- Structured project case studies and a Bachatt experience spotlight, with supporting evidence and limits
- Skills grouped by use with project evidence, rather than numeric self-ratings
- Work / Resume / Contact / More navigation on mobile; optional stats and learning below the main content
- Labelled dialogs with focus trapping/restoration, background isolation and sticky project close controls
- Sound off by default with a saved global preference; reduced-motion-aware animation and scrolling
- Analytics events for project/demo/case-study views, resume downloads and contact actions, without form contents

Implementation priorities, screenshot sources and validation notes are recorded in
[the usability refresh](docs/ux-refresh-2026-11-03.md).

> Netflix-inspired for fun — not affiliated with or endorsed by Netflix.
