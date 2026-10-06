# Jacob Wiseman — IT portfolio

A static Next.js site for IT support, help desk, and desktop support roles. It is built to export to HTML and deploy on GitHub Pages at [frostyydev1.github.io](https://frostyydev1.github.io/).

The live site updates only when `main` is pushed. This redesign is meant to be reviewed on a pull request first. The deploy workflow is unchanged.

## Stack

- Next.js (App Router) with `output: 'export'` and `trailingSlash: true`
- React
- Tailwind CSS v4, with the design system in `src/app/globals.css`
- Instrument Sans, Instrument Serif (real italic), and Geist Mono via `next/font`

Global element resets sit in `@layer base`, so utility classes are not overridden by `a { color: inherit }` or `button { font: inherit }`.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

`npm run build` writes the static site to `out/`. GitHub Pages publishes that folder from `main` only (`.github/workflows/deploy-pages.yml`).

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/experience/` | Roles, education, certifications |
| `/projects/` | HomeLab and PC repair |
| `/projects/homelab/` | HomeLab case study |
| `/projects/northstar-it/` | PC repair case study |
| `/projects/custom-pcs/` | Redirects to the repair case study |
| `/certifications/` | CompTIA A+, Network+, ITIL 4 Foundation |
| `/about/` | About |
| `/contact/` | Contact |
| `/resume-public.pdf` | One-page résumé (same file as `/resume.pdf`) |

Unknown URLs use `src/app/not-found.tsx`. `robots.txt` and `sitemap.xml` are generated at build time.

## How to fill in your details

Every unknown fact is a `[bracketed]` placeholder. Edit **one file**: [`src/content/site.ts`](src/content/site.ts). Search for `[` in that file. Do not invent counts, dates, client stories, or badge art. If you do not have a fact, delete the sentence instead of guessing.

The résumé lists **HyperFrame Technologies** (CEO / Founder, Feb 2025–present, Elkview, WV). The previous site called the PC repair work **NorthStar IT**. Those names are not treated as the same business. Pick one public name and use it on the site, the résumé, and LinkedIn.

### Placeholders

| What | Where it shows | What to do |
| --- | --- | --- |
| `[your@email]` | Hero “Email me”, contact page | Replace `gap.email`. The `mailto:` link uses the same value. |
| `[phone]` | Contact page | Replace `gap.phone`, or remove the phone row in `src/app/contact/page.tsx` if you do not want a number public. |
| `[Add real photo]` | Homepage portrait | Save a 4:5 photo as `public/portrait.jpg` and set `assets.portrait` to `"/portrait.jpg"`. It is shown in black and white. |
| `[open to on-site / hybrid]` | Contact location line | Replace `gap.availability`. |
| `[Business name]` | Home, experience, repair case study | Résumé: HyperFrame Technologies. Previous site: NorthStar IT. The URL `/projects/northstar-it/` can stay. |
| `[year]` | Repair card and results | The year PC repair started, only if you know it. Feb 2025 is the résumé date for the founder role, not automatically the repair start. |
| `[N]` repairs and `[N]` builds | Repair card and results | Counts you can account for. Delete the phrase if you will not publish a number. |
| `[city]` | Repair card | Where the clients are. Elkview and South Charleston are job locations, not automatically the client area. |
| `[Add: number of jobs and the most common issues]` | Experience summary | Usual jobs and a count, or delete the sentence. |
| `[Mon YYYY]` earned | All three certifications | Month and year each cert was earned. The three cards share `gap.earned` today. Split them in the `certifications` array if the months differ. |
| `[Mon YYYY]` expires | Certifications page | Expiry month, or replace with “does not expire” when that is true. |
| Credly URLs | Certification cards | Set `verifyUrl` on each item in `certifications` to your own Credly share URL. Leave it empty until you have it. Do not link a generic catalog page. |
| Badge images | Hero proof row and certification cards | Download the PNGs from your Credly or PeopleCert account. Save `public/badges/comptia-a-plus.png`, `public/badges/comptia-network-plus.png`, and `public/badges/itil-4-foundation.png`, then set `assets.badges`. Do not redraw the logos. See `public/badges/README.md`. |
| `[what you want to grow into, e.g. systems or networking]` | About | Replace `gap.growInto` in your own words. |
| `[how quickly you reply]` | Contact | Replace `gap.replyTime`. |
| `[Mon YYYY]` lab start, `[RAM]`, `[storage]`, `[distro]` | HomeLab meta | When the lab went into use, Pi 5 memory, disk, and the Linux image. |
| `[model]` and `[resolver]` | HomeLab diagram | Edit the diagram text in `src/components/site/graphics.ts`. |
| HomeLab configuration lines | “What I configured” | `gap.dnsSetup`, `blocklists`, `dnsTransport`, `tailscaleMode`, the monitor fields, `proxyHost`, `watchtowerSchedule`, `watchtowerPins`. |
| Three HomeLab stories | “Things that broke” | Replace every bracket in `homelab.stories`. Delete a story rather than leaving the example. |
| `[XX]%`, `[99.X]%`, monitored `[N]` | HomeLab results | Read them off Pi-hole and Uptime Kuma. Do not estimate. |
| HomeLab screenshots | HomeLab figures | Save images under `public/lab/` and set `assets.homelab.pihole` and `assets.homelab.uptime`. Redact IP addresses. Set `gap.shotDate` and `gap.queryDays`. |
| HomeLab “next” lines | “What I'm adding next” | Replace `homelab.next` with plans you actually intend, or delete the section. |
| `[e.g. compose files, volumes, restart policies]` | HomeLab services table | One concrete thing Docker taught you (`gap.dockerLearned`). |
| Three repair stories | PC repair case study | Replace `repair.stories` with real jobs. No client last names. |
| Repair photos | PC repair figures | Set `assets.repair.overview` and `assets.repair.verification` to files in `public/repair/`. |
| Repair “next” lines | PC repair case study | Replace `repair.next`, or delete the section. |
| Off the clock | About | `site.offClock` comes from the playlist on the previous site (Noah Kahan, Harrison Boe). Delete that paragraph in `src/app/about/page.tsx` if you do not want it. |
| ITIL on the PDF | `public/resume-public.pdf` | The PDF lists CompTIA A+ and Network+ only. It has no email or phone. Export a new PDF when you add those and ITIL 4 Foundation. This repo does not rewrite the PDF. `resume.pdf` is the same file, kept so the old URL still works. |

`export const placeholders` at the bottom of `src/content/site.ts` is the same list, in shorter form.

## What is already filled in

From the résumé and the previous site, and not guessed:

- Jacob Wiseman, Elkview, WV (Charleston area), [linkedin.com/in/jacob20](https://www.linkedin.com/in/jacob20)
- CompTIA A+, CompTIA Network+, ITIL 4 Foundation (ITIL is not on the current PDF)
- B.S. Information Technology, Colorado State University, expected Sep 2027
- High school diploma, Herbert Hoover High School, Elkview, WV, May 2024
- Founder, sole operator, Feb 2025–present (résumé title: CEO / Founder, HyperFrame Technologies)
- Registration Specialist, WVU Medicine, South Charleston, Aug 2025–Aug 2026
- Barista, Target, South Charleston, Jun 2024–Feb 2025
- Training Manager, Taco Bell, Elkview, Mar 2022–Apr 2024
- HomeLab on a Raspberry Pi 5: Pi-hole, Tailscale (WireGuard), Uptime Kuma, Nginx Proxy Manager, Docker, Glances, Watchtower, Homarr, File Browser, on a Ubiquiti network
- PC repair process: Understand, Diagnose, Resolve, Verify

## Design

Near-black background, soft white type, cobalt `#315CFF` for fills and large marks, warm ivory for panels and the second line of the name. One fade-and-rise on scroll. It is turned off when `prefers-reduced-motion` is set. There is no intro, starfield, cursor glow, terminal, or game.
