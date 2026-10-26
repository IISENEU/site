/* =========================================================
   IISE Northeastern: site script
   1. Events: home page + events.html (edit the EVENTS array below)
   2. Mobile menu toggle
   3. Clean URLs (no .html, no #section) + section scrolling
   4. Email links (copy address + toast), glass, globe spin, reveal
   5. Footer year
   ========================================================= */

/*
 * ---------- EVENTS ----------
 * Source: "Fall 2026 Semester Planner" tab of the e-board's semester planner.
 * To add an event, copy one object and edit it. Order doesn't matter; events
 * are sorted by date. The home page shows the next HOME_EVENT_LIMIT events;
 * events.html shows all upcoming events, then past ones.
 *
 *   date:        "YYYY-MM-DD" (first day)
 *   endDate:     optional "YYYY-MM-DD" for multi-day events; keeps it listed until then
 *   time:        free text, e.g. "6:00 – 7:00 pm"
 *   tag:         optional label for anything that isn't a Monday general meeting
 *                (e.g. "Career fair", "Training"); tagged events get a charcoal date badge
 *   title, location, description: free text
 */
const HOME_EVENT_LIMIT = 6;

const EVENTS = [
  {
    date: "2026-09-08",
    title: "Fall Fest",
    tag: "Club fair",
    time: "12:00 – 4:00 pm",
    location: "TBA",
    description: "Find our table at Fall Fest and meet the e-board.",
  },
  {
    date: "2026-09-14",
    title: "Kickoff Meeting",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Speed-dating-style intros and an introduction to the club.",
  },
  {
    date: "2026-09-15",
    title: "COE Club Fair",
    tag: "Club fair",
    time: "7:30 – 8:00 pm",
    location: "TBA",
    description: "Stop by our table at the College of Engineering club fair.",
  },
  {
    date: "2026-09-21",
    title: "Resume & Job Search Workshop",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Resume and job search tips, followed by LinkedIn headshots from 7:30 to 8:00 pm.",
  },
  {
    date: "2026-09-28",
    title: "Disney Employer Event",
    time: "6:00 – 8:00 pm",
    location: "IV 022",
    description: "An employer event with Disney.",
  },
  {
    date: "2026-10-05",
    title: "Co-op Panel",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Students share what their co-ops were like and answer your questions.",
  },
  {
    date: "2026-10-08",
    title: "Combined Employer Fair",
    tag: "Career fair",
    time: "11:00 am – 2:00 pm",
    location: "Curry Ballroom",
    description: "Meet employers hiring for co-ops and full-time roles.",
  },
  {
    date: "2026-10-16",
    endDate: "2026-10-18",
    title: "Six Sigma Green Belt Training",
    tag: "Certification",
    time: "Fri 6–9 pm · Sat 9 am–5 pm · Sun 9 am–12 pm",
    location: "Room TBA",
    description: "A three-day Six Sigma Green Belt certification course. Pricing and registration are on the Certifications page.",
  },
  {
    date: "2026-10-19",
    title: "Employer Event: ABCorp",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "An employer event with ABCorp.",
  },
  {
    date: "2026-10-26",
    title: "St. Francis House Winter Care Kits",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Community engagement event: help put together winter care kits for St. Francis House, a Boston nonprofit that provides meals, shelter, and support services to neighbors in need.",
  },
  {
    date: "2026-11-02",
    title: "Course Registration",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Get advice from upperclassmen on picking next semester's classes.",
  },
  {
    date: "2026-11-09",
    title: "Skills Workshop",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "A consulting case interview workshop: how case interviews work and how to practice them.",
  },
  {
    date: "2026-11-16",
    title: "E-Board Elections",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Vote for the chapter's next executive board.",
  },
  {
    date: "2026-11-30",
    title: "IE Town Hall",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "An open conversation about the industrial engineering program.",
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Parse "YYYY-MM-DD" as a local date (new Date("YYYY-MM-DD") would be UTC and can shift a day).
function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function icon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#icon-" + name);
  svg.appendChild(use);
  return svg;
}

function eventCard(e, { past = false } = {}) {
  const card = el("li", ["card", "event", e.tag && "event-special", past && "event-past"].filter(Boolean).join(" "));

  const top = el("div", "event-top");
  const badge = el("time", "date-badge");
  badge.dateTime = e.date;
  badge.append(el("span", "month", MONTHS[e.dateObj.getMonth()]), el("span", "day", String(e.dateObj.getDate())));
  badge.setAttribute("aria-label", e.dateObj.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
  const heading = el("div", "event-heading");
  if (e.tag) heading.appendChild(el("span", "event-tag", e.tag));
  heading.appendChild(el("h3", null, e.title));
  top.append(badge, heading);

  const meta = el("ul", "event-meta");
  meta.setAttribute("role", "list");
  for (const [name, value, label] of [["clock", e.time, "Time"], ["pin", e.location, "Location"]]) {
    if (!value) continue;
    const li = el("li");
    li.append(icon(name), el("span", "visually-hidden", label + ": "), document.createTextNode(value));
    meta.appendChild(li);
  }

  card.append(top, meta, el("p", null, e.description));
  return card;
}

function fillList(list, events, emptyText, options) {
  list.replaceChildren();
  if (events.length === 0) {
    list.appendChild(el("li", "events-empty", emptyText));
    return;
  }
  for (const e of events) list.appendChild(eventCard(e, options));
}

// Home page: next few events. Events page: every upcoming event, plus past ones.
function renderEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const all = EVENTS
    .map((e) => ({ ...e, dateObj: parseDate(e.date), endObj: parseDate(e.endDate || e.date) }))
    .sort((a, b) => a.dateObj - b.dateObj);
  const upcoming = all.filter((e) => e.endObj >= today);
  const past = all.filter((e) => e.endObj < today).reverse();

  const empty = "No upcoming events — check back soon.";
  const home = document.getElementById("events-list");
  if (home) fillList(home, upcoming.slice(0, HOME_EVENT_LIMIT), empty);

  const upcomingList = document.getElementById("events-upcoming");
  if (upcomingList) fillList(upcomingList, upcoming, empty);

  const pastList = document.getElementById("events-past");
  if (pastList) {
    fillList(pastList, past, "", { past: true });
    document.getElementById("past-events").hidden = past.length === 0;
  }
}

/* ---------- Mobile menu ---------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".visually-hidden").textContent = open ? "Close menu" : "Menu";
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));

  // Close after choosing a link, on Escape, on outside click, or when resizing to desktop.
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) setOpen(false);
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", (mq) => {
    if (mq.matches) setOpen(false);
  });
}

/* ---------- Clean URLs ----------
 * Addresses stay as /, /events, /semester-project: no ".html" and no "#section".
 * Section links (About, Events, Get Involved) scroll in place without adding a
 * #hash, and old links like /index.html#events are tidied on arrival. */
const initialHash = location.hash;

function cleanPath(path) {
  return path.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
}

function goToSection(target, behavior) {
  target.scrollIntoView(behavior ? { behavior } : undefined); // default follows CSS smooth scroll + scroll-padding
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true }); // keep keyboard and screen-reader position in sync
}

function cleanUrl() {
  if (location.protocol === "file:") return;
  const clean = cleanPath(location.pathname);
  if (clean !== location.pathname || location.hash) history.replaceState(null, "", clean + location.search);
}

function initSectionLinks() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href*="#"]');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || cleanPath(url.pathname) !== cleanPath(location.pathname)) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    goToSection(target);
  });
}

// Arriving from another page (/#events): rendered events shift the layout,
// so align to the section once everything (including fonts) has loaded.
function scrollToInitialHash() {
  const target = initialHash && document.getElementById(decodeURIComponent(initialHash.slice(1)));
  if (target) goToSection(target, "instant");
}

/* ---------- Email links ----------
 * mailto: does nothing on computers without a mail app set up, so clicking
 * any email link also copies the address and says so. */
let toast, toastTimer;

function initEmailLinks() {
  toast = el("div", "toast");
  toast.setAttribute("role", "status"); // announced by screen readers
  document.body.appendChild(toast);

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="mailto:"]');
    if (!link) return;
    const address = decodeURIComponent(link.getAttribute("href").slice(7).split("?")[0]);
    copyText(address).then((ok) => showToast(ok ? "Email address copied: " + address : "Email us at " + address));
  });
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true, () => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

// Clipboard API needs HTTPS; this older method works everywhere.
function fallbackCopy(text) {
  const previous = document.activeElement;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;top:0;left:0;opacity:0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
  area.remove();
  if (previous) previous.focus({ preventScroll: true });
  return ok;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 4000);
}

/* ---------- Glass header ----------
 * Light glass over light content and dark glass over the hero and footer,
 * a lens that slides between nav links, and a highlight that follows the
 * pointer across buttons. Styles live under "Glass" in styles.css. */
function initGlass() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const bar = header.querySelector(".header-inner");

  // Adaptive appearance: check what is scrolling under the middle of the bar
  const darkSurfaces = [...document.querySelectorAll(".hero, .site-footer")];
  let queued = false;
  const update = () => {
    queued = false;
    const b = bar.getBoundingClientRect();
    const y = b.top + b.height / 2;
    const onDark = darkSurfaces.some((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= y && r.bottom >= y;
    });
    header.classList.toggle("on-dark", onDark);
  };
  const queue = () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  update();

  // Lens: only where people hover with a pointer
  const nav = header.querySelector(".site-nav");
  const list = nav && nav.querySelector("ul");
  if (list && window.matchMedia("(hover: hover)").matches) {
    const lens = el("span", "nav-lens");
    lens.setAttribute("aria-hidden", "true");
    list.prepend(lens);
    nav.classList.add("has-lens");
    const current = list.querySelector('a[aria-current="page"]:not(.nav-cta)');
    const moveTo = (a) => {
      if (!a || !a.offsetWidth) { lens.style.opacity = "0"; return; }
      const l = list.getBoundingClientRect();
      const r = a.getBoundingClientRect();
      lens.style.width = r.width + "px";
      lens.style.height = r.height + "px";
      lens.style.transform = `translate(${r.left - l.left}px, ${r.top - l.top}px)`;
      lens.style.opacity = "1";
    };
    list.querySelectorAll("a:not(.nav-cta)").forEach((a) => {
      a.addEventListener("mouseenter", () => moveTo(a));
      a.addEventListener("focus", () => moveTo(a));
    });
    list.addEventListener("mouseleave", () => moveTo(current));
    list.addEventListener("focusout", (e) => { if (!list.contains(e.relatedTarget)) moveTo(current); });
    // Start on the current page without sliding in
    lens.style.transition = "none";
    moveTo(current);
    void lens.offsetWidth;
    lens.style.transition = "";
    window.addEventListener("resize", () => moveTo(current));
    document.fonts && document.fonts.ready.then(() => moveTo(current));   // link widths change once fonts load
  }

  // Highlight that follows the pointer across controls
  document.addEventListener("pointermove", (e) => {
    const hero = e.target.closest(".hero");
    if (hero) hero.style.setProperty("--bx", e.clientX - hero.getBoundingClientRect().left + "px");   // hero bar highlight
    const control = e.target.closest(".btn, .nav-cta, .contact-btn, .social a, .card, .project, .cert-pricing, .cta-band, .involved-links");
    if (!control) return;
    const r = control.getBoundingClientRect();
    control.style.setProperty("--mx", e.clientX - r.left + "px");
    control.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });
}

/* ---------- Hero globe ----------
 * On load the globe turns on its axis and eases to a stop. Each line of
 * longitude is drawn as the front half of an ellipse whose width is
 * R * sin(longitude), so shifting every longitude by the same angle reads
 * as rotation. Static for people who prefer reduced motion. */
function initGlobe() {
  const group = document.querySelector(".hero-globe .globe-meridians");
  if (!group) return;
  const R = 92, CX = 100, TOP = 8, BOTTOM = 192, STEP = 30;   // a meridian every 30 degrees
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  group.replaceChildren(path);

  const draw = (turn) => {
    let d = "";
    for (let k = -6; k <= 6; k++) {
      const lon = turn + k * STEP;
      if (lon <= -90 || lon >= 90) continue;                  // back of the globe: hidden
      const s = Math.sin(lon * Math.PI / 180);
      const rx = Math.abs(R * s);
      d += rx < 0.5
        ? `M${CX} ${TOP}V${BOTTOM}`
        : `M${CX} ${TOP}A${rx.toFixed(2)} ${R} 0 0 ${s > 0 ? 1 : 0} ${CX} ${BOTTOM}`;
    }
    path.setAttribute("d", d);
  };

  const from = -120;   // degrees of spin before settling
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { draw(0); return; }
  draw(from);
  const start = performance.now() + 250;
  const duration = 2600;
  const tick = (now) => {
    const t = Math.min(Math.max((now - start) / duration, 0), 1);
    const eased = 1 - Math.pow(1 - t, 3);                     // fast start, gentle stop
    draw(from * (1 - eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Reveal on scroll ----------
 * Cards, headshots, and project panels fade up as they enter the view.
 * Skipped entirely for people who prefer reduced motion. */
function initReveal() {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const groups = document.querySelectorAll(".card-grid, .people, .past-grid, .contact-list");
  const singles = document.querySelectorAll(".project-feature, .cert, .involved-copy, .partners");
  const items = [];
  groups.forEach((g) => [...g.children].forEach((child, i) => {
    child.style.transitionDelay = (i % 5) * 70 + "ms";   // a short stagger across each row
    items.push(child);
  }));
  singles.forEach((el) => items.push(el));
  items.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("is-in");
      observer.unobserve(el);
      // Hand control back to hover effects once the entrance is done
      setTimeout(() => {
        el.classList.remove("reveal", "is-in");
        el.style.transitionDelay = "";
      }, 900);
    });
  }, { threshold: 0.12 });
  items.forEach((el) => observer.observe(el));
}

/* ---------- Footer year ---------- */
function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

cleanUrl();
renderEvents();
initNav();
initSectionLinks();
initEmailLinks();
initGlass();
initGlobe();
initReveal();
setYear();
window.addEventListener("load", scrollToInitialHash);
