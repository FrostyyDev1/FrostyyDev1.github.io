# Jacob Wiseman — IT portfolio

Static portfolio for IT support, desktop support, help desk, and networking roles. Built with Next.js and exported for GitHub Pages.

Live site: https://frostyydev1.github.io/

## Stack

- Next.js (App Router) with `output: "export"` and trailing slashes
- React 19
- Tailwind CSS 4, with the type and color system in `src/app/globals.css`
- Instrument Sans, Instrument Serif, and Geist Mono

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run lint
npm run build
```

The static site is written to `out/`. GitHub Actions (`.github/workflows/deploy-pages.yml`) builds on pushes to `main` and deploys that folder. This repository does not deploy from a pull request.

Set `NEXT_PUBLIC_SITE_URL` when the canonical host is not `https://frostyydev1.github.io`.

## Before this is shown to recruiters

- **Email.** Search for `TODO: add email` and `mailto:TODO` in `src/content/site.ts`. Replace both with a real address. Do not add a phone number unless Jacob asks for one.
- **Portrait.** The site uses a JW monogram. When a real photo exists, render it from `public/jacob-photo.jpg` in `src/components/Portrait.tsx`.
- **Credential links.** `public/certs/` holds the official Credly badge images for CompTIA A+ ce, CompTIA Network+ ce, and ITIL 4 Foundation. They are the public badge artwork, not Jacob's personal Credly or PeopleCert share URLs. Add those share links only when he has them. Do not invent credential IDs.
- **Résumé.** The linked file is `public/resume-public.pdf` (same bytes as `public/resume.pdf`). It still lists an older company name and does not yet list ITIL 4 Foundation. Update that PDF so it matches NorthStar IT Services LLC and the certifications on the site.

## Pages

Home, About, Experience, Certifications, Contact, Projects, HomeLab, NorthStar IT, and Custom PCs.
