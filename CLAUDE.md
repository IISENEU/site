# IISE Northeastern website (iiseneu.org)

Website for the Northeastern University chapter of the Institute of Industrial & Systems
Engineers. The person you're working with is the club's webmaster: a student, not
necessarily a developer. Explain changes in plain language, show them the result in the
local preview, and only push when they ask. For accounts and the handoff checklist, see
README.md.

## How the site works

- Plain HTML, CSS, and JavaScript. No framework, no build step, no package installs.
- Pages: `index.html`, `events.html`, `semester-project.html`, `certifications.html`,
  `leadership.html`, `contact.html`, and `404.html` (shown for any unknown address).
- One stylesheet (`css/styles.css`) and one script (`js/main.js`), shared by every page.
- Each page repeats the same header, phone menu, icon sprite (`<svg>` of `<symbol>`s),
  and footer. A change to any of those must be made in every page, including `404.html`.
- Images live in `assets/`; e-board headshots in `assets/team/`.

## Publishing

- GitHub Pages serves the `main` branch of `IISENEU/site`. Pushing to `main` goes live
  at iiseneu.org within a minute or two. There is no staging site, so preview first.
- `CNAME` holds the custom domain. Don't delete or rename it.
- **Cache busting:** GitHub Pages lets browsers cache files for 10 minutes. Every time
  `css/styles.css` or `js/main.js` changes, bump the `?v=` number on their links in all
  pages, or visitors may get new HTML with an old stylesheet:

  ```bash
  V=$(date +%Y%m%d%H%M); for f in *.html; do sed -i '' -E "s#css/styles\.css\?v=[0-9]+#css/styles.css?v=$V#; s#js/main\.js\?v=[0-9]+#js/main.js?v=$V#" "$f"; done
  ```

  (`sed -i ''` is the macOS form; on Linux drop the `''`.)
- Commit messages are short, plain-English summaries of what changed for visitors.

## Local preview

`.claude/launch.json` defines a server named `site` (port 8765) that runs
`.claude/serve.py`. It mimics GitHub Pages: `/events` serves `events.html`, unknown paths
get `404.html`, and nothing is cached. Start it with the preview tool (name `site`), or
by hand with `python3 .claude/serve.py 8765`, then open http://localhost:8765.

Check changes at desktop width and at phone width (375px), and check the console for
errors, before calling something done.

## Content that changes often

- **Events:** the `EVENTS` array at the top of `js/main.js`; the comment above it
  documents the fields. Monday general meetings have no `tag`; anything else gets a
  `tag` (e.g. "Career fair") and a dark date badge. Past events move to "Past events"
  on their own. The home page shows the next 6. The "Next up" line on the meeting card
  and the Google event listings (JSON-LD) are built from the same array.
- **Meeting time and room** ("Mondays, 6–7 pm", "IV 022") appear in several places:
  the meeting cards (home, contact), the phone menu, every footer, and the hero tagline
  on events.html. Search for them when they change.
- **Leadership:** `leadership.html`. Each person is a `<li class="person">` with a
  headshot in `assets/team/` (named `first-last.jpg`, cropped 4:5) and a LinkedIn link.
- **Semester project:** `semester-project.html`: the current project up top, past
  projects below with their logos in `assets/`.
- **Certifications:** `certifications.html`. Courses are always either Lean or Six
  Sigma Green Belt. The pricing panel styles (`.cert-pricing`) are kept for when a
  course with registration and prices is announced.
- **Links:** Instagram, LinkedIn, the Slack invite, the club email
  (iisenortheastern@gmail.com), and the donation page
  (givingday.northeastern.edu fund DN4493-83) are hard-coded in the pages.
- **Analytics:** Cloudflare Web Analytics snippet before `</body>` on every page,
  token `e42e8926c4fe4be58f8e5129a8d27846` (the club's Cloudflare account).
- `sitemap.xml` lists every page; add new pages there and update `lastmod` when a page
  changes meaningfully.

## Conventions

- **Clean URLs:** link to `events`, not `events.html`; home is `./`, sections are
  `./#about`. `js/main.js` (`cleanUrl`, `initSectionLinks`) removes `.html` and `#hash`
  from the address bar. `404.html` is served at any depth, so every link and file in it
  starts with `/` (`/css/styles.css`, `/events`).
- **Stylesheet order matters.** `css/styles.css` grew in layers: base styles first,
  then later sections that refine earlier ones (glass, black theme, textures). A later
  rule often overrides an earlier one, so before changing something, search the whole
  file for its selector and edit the last rule that applies. Sections start with
  `/* ---------- Name ---------- */` comments.
- **Braces:** a stray `}` makes browsers silently drop the rule after it. After editing
  CSS, check that braces balance.
- **Colors** live in `:root` at the top of the stylesheet: `--red` #CE1126 (brand red),
  `--red-on-dark` #E51E33 (red text on black), `--charcoal` #000 (dark surfaces),
  `--dark-hi` / `--dark-lo` (shading on dark boxes), `--ink` #141414 (text),
  `--muted` #5E5E5E. Greys are neutral; avoid warm or beige greys.
- **Fonts:** Oswald for headings, labels, and buttons (uppercase); Inter for body text.
- **Look and feel:**
  - Black headers with a grid texture and a pointer light.
  - A floating glass nav bar that switches to white text over dark areas (`initGlass`).
  - White and light-grey sections; grey sections (`.section-alt`) have a dot texture.
  - Dark boxes for calls to action (meeting card, `.cta-band`, pricing panel), with a
    faint globe in the corner (`--globe-lines`).
  - Section labels (`.eyebrow`) are small glass pills.
  - Cards trail the scroll slightly and spring back (`initScrollSpring`).
- **Accessibility:** keep the existing fallbacks for `prefers-reduced-motion`,
  `prefers-reduced-transparency`, and `prefers-contrast`; keep visible focus styles,
  alt text, and `aria-*` labels on icon-only links. Hover effects belong inside
  `@media (hover: hover)`.
- Use `.btn`, `.text-link`, `.card`, `.eyebrow`, and `.section` / `.section-alt` rather
  than new one-off styles.

## Unfinished: mailing list

The `mailing-list` branch adds "Join the mailing list" buttons and links across the site.
They all read one constant, `MAILING_LIST_URL` in `js/main.js`; while it's empty, they
show a "coming soon" message. To publish: switch to that branch, merge `main` into it,
set `MAILING_LIST_URL` to the sign-up form's address, preview, then merge it into `main`
and push.
