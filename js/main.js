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

  card.append(top, el("p", "event-desc", e.description), meta);   // time and place sit along the bottom
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

  addEventData(upcoming);

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

/* ---------- Next meeting ----------
 * Under the meeting details on the home page: the date and topic of the next
 * general meeting, taken from the same EVENTS list as the cards. */
function renderNextMeeting() {
  const line = document.getElementById("meeting-next");
  if (!line) return;
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const ended = (e) => {                                   // tonight's meeting is over once its end time passes
    const times = parseTimes(e.time);
    if (!times) return false;
    const [h, m] = times[1].split(":").map(Number);
    return now >= new Date(e.dateObj).setHours(h, m);
  };
  const next = EVENTS
    .filter((e) => !e.tag && e.location === "IV 022")
    .map((e) => ({ ...e, dateObj: parseDate(e.date) }))
    .filter((e) => e.dateObj > today || (e.dateObj.getTime() === today.getTime() && !ended(e)))
    .sort((a, b) => a.dateObj - b.dateObj)[0];
  if (!next) return;
  const when = next.dateObj.getTime() === today.getTime()
    ? "Tonight"
    : next.dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  line.append(el("span", "live-dot"), el("span", "meeting-next-label", "Next up"), el("strong", null, when), el("span", "meeting-next-topic", next.title));
  line.querySelector(".live-dot").setAttribute("aria-hidden", "true");
  line.hidden = false;
}

/* ---------- Event listings for search engines ----------
 * Publishes the upcoming events as schema.org Event data so Google can show
 * them as event listings. Built from the same EVENTS array as the cards. */
const CAMPUS_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "360 Huntington Ave",
  addressLocality: "Boston",
  addressRegion: "MA",
  postalCode: "02115",
  addressCountry: "US",
};

// "6:00 – 7:00 pm", "11:00 am – 2:00 pm", "Fri 6–9 pm · ..." -> ["18:00", "19:00"]
function parseTimes(text) {
  const m = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i.exec(text || "");
  if (!m) return null;
  const to24 = (h, min, ap) => {
    h = Number(h) % 12 + (ap.toLowerCase() === "pm" ? 12 : 0);
    return String(h).padStart(2, "0") + ":" + (min || "00");
  };
  return [to24(m[1], m[2], m[3] || m[6]), to24(m[4], m[5], m[6])];
}

// Boston's UTC offset on a given date ("-04:00" in summer, "-05:00" in winter)
function bostonOffset(dateStr) {
  try {
    const part = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", timeZoneName: "shortOffset" })
      .formatToParts(new Date(dateStr + "T12:00:00Z")).find((p) => p.type === "timeZoneName").value;   // "GMT-4"
    const h = Number(part.replace("GMT", "")) || 0;
    return (h < 0 ? "-" : "+") + String(Math.abs(h)).padStart(2, "0") + ":00";
  } catch (err) {
    return "";
  }
}

function addEventData(upcoming) {
  if (!upcoming.length || !(document.getElementById("events-list") || document.getElementById("events-upcoming"))) return;
  const events = upcoming.map((e) => {
    const t = parseTimes(e.time);
    const at = (date, time) => (time ? `${date}T${time}:00${bostonOffset(date)}` : date);
    const known = e.location && !/TBA/i.test(e.location);
    return {
      "@type": "Event",
      name: e.title,
      description: e.description,
      startDate: at(e.date, t && t[0]),
      endDate: e.endDate ? e.endDate : at(e.date, t && t[1]),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: known ? `${e.location}, Northeastern University` : "Northeastern University",
        address: CAMPUS_ADDRESS,
      },
      image: "https://iiseneu.org/assets/og-image.jpg",
      url: "https://iiseneu.org/events",
      organizer: { "@type": "Organization", name: "IISE Northeastern University Chapter", url: "https://iiseneu.org/" },
    };
  });
  const tag = document.createElement("script");
  tag.type = "application/ld+json";
  tag.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": events });
  document.head.appendChild(tag);
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
    document.documentElement.classList.toggle("menu-open", open);   // dims the page behind the phone menu
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

/* ---------- Current section ----------
 * On the home page the nav follows the reader: Home, About and Events take
 * turns as the current link while scrolling, and the glass lens follows. */
function initScrollSpy() {
  const sections = [...document.querySelectorAll('.site-nav a[href^="#"]:not(.nav-cta)')]
    .map((a) => ({ a, target: document.getElementById(a.getAttribute("href").slice(1)) }))
    .filter((s) => s.target);
  if (sections.length < 2) return;
  let active = sections.find((s) => s.a.hasAttribute("aria-current")) || sections[0];
  let queued = false;
  const update = () => {
    queued = false;
    const line = window.innerHeight * 0.35;   // a section counts once its top passes a third of the way up
    let next = sections[0];
    sections.forEach((s) => { if (s.target.getBoundingClientRect().top <= line) next = s; });
    if (next === active) return;
    active.a.removeAttribute("aria-current");
    next.a.setAttribute("aria-current", next.target.id === "top" ? "page" : "location");
    active = next;
    document.dispatchEvent(new Event("navcurrent"));
  };
  const queue = () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  update();
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
    const current = () => list.querySelector("a[aria-current]:not(.nav-cta)");
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
    list.addEventListener("mouseleave", () => moveTo(current()));
    list.addEventListener("focusout", (e) => { if (!list.contains(e.relatedTarget)) moveTo(current()); });
    // Start on the current page without sliding in
    lens.style.transition = "none";
    moveTo(current());
    void lens.offsetWidth;
    lens.style.transition = "";
    window.addEventListener("resize", () => moveTo(current()));
    document.fonts && document.fonts.ready.then(() => moveTo(current()));   // link widths change once fonts load
    bar.addEventListener("animationend", (e) => { if (e.target === bar) moveTo(current()); });   // re-measure after the bar's entrance
    // Follow the reader through the home page sections, unless the pointer or focus is on the nav
    document.addEventListener("navcurrent", () => {
      if (!list.matches(":hover") && !list.contains(document.activeElement)) moveTo(current());
    });
  }

  // Move the header glow off the bar when the pointer leaves it
  bar.addEventListener("pointerleave", () => {
    bar.style.removeProperty("--hx");
    bar.style.removeProperty("--hy");
  });

  // Highlight that follows the pointer across controls
  document.addEventListener("pointermove", (e) => {
    const bar = e.target.closest(".header-inner");
    if (bar) {                                                                      // header glow + rim
      const r = bar.getBoundingClientRect();
      bar.style.setProperty("--hx", e.clientX - r.left + "px");
      bar.style.setProperty("--hy", e.clientY - r.top + "px");
    }
    const hero = e.target.closest(".hero");
    if (hero) hero.style.setProperty("--bx", e.clientX - hero.getBoundingClientRect().left + "px");   // hero bar highlight
    const eventCard = e.target.closest(".event");
    if (eventCard) {                                                                 // date badge highlight
      const badge = eventCard.querySelector(".date-badge");
      const r = badge.getBoundingClientRect();
      badge.style.setProperty("--gx", e.clientX - r.left + "px");
      badge.style.setProperty("--gy", e.clientY - r.top + "px");
    }
    const control = e.target.closest(".btn, .nav-cta, .contact-btn, .social a, .card, .project, .cert-pricing, .cta-band, .involved-links, .meeting-card");
    if (!control) return;
    const r = control.getBoundingClientRect();
    control.style.setProperty("--mx", e.clientX - r.left + "px");
    control.style.setProperty("--my", e.clientY - r.top + "px");
    if (control.matches(".card, .project")) {                                       // gentle tilt toward the cursor
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      // Big panels tilt less: the same angle looks far more dramatic across a wide box
      const amp = control.matches(".project-feature") ? 1 : control.matches(".project") ? 1.5 : 4;
      control.style.setProperty("--rx", (-py * amp).toFixed(2) + "deg");
      control.style.setProperty("--ry", (px * amp).toFixed(2) + "deg");
    }
  }, { passive: true });
}

/* ---------- Hero globe ----------
 * On load the globe turns on its axis and eases to a stop. Each line of
 * longitude is drawn as the front half of an ellipse whose width is
 * R * sin(longitude), so shifting every longitude by the same angle reads
 * as rotation. It spins with momentum: flick the pointer across the header and
 * it keeps turning, then friction slows it. Static with reduced motion. */
function initGlobe() {
  const group = document.querySelector(".hero-globe .globe-meridians");
  if (!group) return;
  const R = 92, CX = 100, TOP = 8, BOTTOM = 192, STEP = 30;   // a meridian every 30 degrees
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  group.replaceChildren(path);

  const draw = (turn) => {
    let d = "";
    const base = ((turn % STEP) + STEP) % STEP;                 // the pattern repeats every STEP degrees
    for (let k = -4; k <= 4; k++) {
      const lon = base + k * STEP;
      if (lon <= -90 || lon >= 90) continue;                  // back of the globe: hidden
      const s = Math.sin(lon * Math.PI / 180);
      const rx = Math.abs(R * s);
      d += rx < 0.5
        ? `M${CX} ${TOP}V${BOTTOM}`
        : `M${CX} ${TOP}A${rx.toFixed(2)} ${R} 0 0 ${s > 0 ? 1 : 0} ${CX} ${BOTTOM}`;
    }
    path.setAttribute("d", d);
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { draw(0); return; }

  // Physics: the globe has spin (degrees per second) that friction slowly takes away.
  // Moving the pointer across the header grabs the surface and sets the spin, so a quick
  // flick keeps it turning after the pointer stops, and moving back spins it the other way.
  const FRICTION = 1.3;      // per second: higher stops sooner
  const GRIP = 0.35;         // how strongly each pointer move takes over the current spin
  const DEG_PER_PX = 0.12;   // pointer speed (px/s) to spin speed (deg/s)
  const MAX_SPIN = 720;      // deg/s
  let turn = 0, spin = 0, last = 0, running = false;
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    turn = (turn + spin * dt) % 360;
    spin *= Math.exp(-FRICTION * dt);
    draw(turn);
    if (Math.abs(spin) > 0.3) requestAnimationFrame(frame);
    else running = false;
  };
  const run = () => {
    if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
  };

  // Intro: one flick on load that coasts to a stop (about 120 degrees)
  draw(0);
  setTimeout(() => { spin = 160; run(); }, 250);

  const hero = group.closest(".hero");
  if (hero && window.matchMedia("(hover: hover)").matches) {
    let px = null, pt = 0;
    hero.addEventListener("pointermove", (e) => {
      const now = performance.now();
      if (px !== null) {
        const v = (e.clientX - px) / (Math.max(now - pt, 8) / 1000);    // px per second
        const target = Math.max(-MAX_SPIN, Math.min(MAX_SPIN, v * DEG_PER_PX));
        spin += (target - spin) * GRIP;
        run();
      }
      px = e.clientX;
      pt = now;
    });
    hero.addEventListener("pointerleave", () => { px = null; });  // let go: it coasts
  }
}

/* ---------- Title entrance ----------
 * Wraps each word of the hero title so CSS can raise it out of a mask one
 * word at a time. Only runs when html.anim is set (no reduced-motion preference). */
function initTitle() {
  if (!document.documentElement.classList.contains("anim")) return;
  document.querySelectorAll(".hero h1").forEach((h1) => {
    let i = 0;
    const split = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) { split(child); return; }
        if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const word = el("span", "word");
          const inner = el("span", "word-inner", part);
          inner.style.setProperty("--i", i++);
          word.appendChild(inner);
          frag.appendChild(word);
        });
        child.replaceWith(frag);
      });
    };
    split(h1);
    h1.classList.add("is-split");
  });
}

/* ---------- Scroll effects ----------
 * Hero content drifts up and fades as it scrolls away, and the header gets a
 * bit more compact. */
function initScrollFx() {
  if (!document.documentElement.classList.contains("anim")) return;
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  let queued = false;
  const update = () => {
    queued = false;
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 40);
    }
    if (hero) {
      const h = hero.offsetHeight;
      if (y < h) {
        const p = y / h;                                         // 0 at top, 1 when the hero is gone
        hero.style.setProperty("--hero-shift", (y * 0.28).toFixed(1) + "px");
        hero.style.setProperty("--hero-fade", (1 - p * 1.1).toFixed(3));
        hero.style.setProperty("--globe-shift", (y * 0.12).toFixed(1) + "px");
      }
    }
  };
  const queue = () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  update();
}

/* ---------- Reveal on scroll ----------
 * Cards, headshots, and project panels fade up as they enter the view.
 * Skipped entirely for people who prefer reduced motion. */
function initReveal() {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const groups = document.querySelectorAll(".people, .past-grid, .contact-list");   // card grids use the scroll spring instead
  const singles = document.querySelectorAll(".project-feature, .cert, .involved-copy, .partners, .section-head, .people-heading");
  const items = [];
  groups.forEach((g) => {
    // Stagger across a row only: in a single column (phones) each box arrives on its own, so no delay
    const kids = [...g.children];
    const perRow = kids.filter((c) => c.offsetTop === kids[0]?.offsetTop).length || 1;
    kids.forEach((child, i) => {
      child.style.transitionDelay = (i % perRow) * 70 + "ms";
      items.push(child);
    });
  });
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
  }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });   // start as soon as a box edges into view
  items.forEach((el) => observer.observe(el));
}

/* ---------- Scroll spring ----------
 * Cards are always on the page; instead of fading in, they react to scrolling
 * the way iOS message bubbles do. Each card trails the scroll a little (cards
 * further along the direction of travel trail more), then springs back with a
 * slight overshoot. Uses the CSS translate property so it stacks with the hover
 * tilt, which uses transform. Off with reduced motion. */
function initScrollSpring() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cards = [...document.querySelectorAll(".card-grid > .card")];
  if (!cards.length) return;

  const STIFFNESS = 190, DAMPING = 16;   // underdamped: settles with one small bounce
  const PULL = 0.24;                     // how much of each scroll step a card lags by
  const MAX = 18;                        // never trails by more than this many pixels
  const springs = cards.map((el) => ({ el, y: 0, v: 0 }));
  let lastScroll = window.scrollY;
  let lastTime = 0;
  let running = false;

  const step = (time) => {
    const dt = Math.min((time - lastTime) / 1000 || 1 / 60, 1 / 30);
    lastTime = time;
    let moving = false;
    for (const s of springs) {
      s.v += (-STIFFNESS * s.y - DAMPING * s.v) * dt;
      s.y += s.v * dt;
      if (Math.abs(s.y) < 0.05 && Math.abs(s.v) < 0.05) { s.y = 0; s.v = 0; }
      else moving = true;
      s.el.style.translate = s.y ? `0 ${s.y.toFixed(2)}px` : "";
    }
    running = moving;
    if (moving) requestAnimationFrame(step);
  };

  window.addEventListener("scroll", () => {
    const dy = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    const vh = window.innerHeight;
    if (!dy || Math.abs(dy) > vh * 0.4) return;                         // a jump (link, restore), not a scroll
    for (const s of springs) {
      const r = s.el.getBoundingClientRect();
      if (r.bottom < -vh * 0.25 || r.top > vh * 1.25) continue;      // off screen: leave it
      const pos = Math.min(Math.max((r.top - s.y + r.height / 2) / vh, 0), 1);   // 0 = top of screen, 1 = bottom
      const lag = 0.35 + 0.65 * (dy > 0 ? pos : 1 - pos);                       // trailing edge lags most
      s.y = Math.max(-MAX, Math.min(MAX, s.y + dy * PULL * lag));
    }
    if (!running) {
      running = true;
      lastTime = performance.now();
      requestAnimationFrame(step);
    }
  }, { passive: true });
}

/* ---------- Footer year ---------- */
function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

cleanUrl();
renderEvents();
renderNextMeeting();
initNav();
initSectionLinks();
initEmailLinks();
initScrollSpy();
initGlass();
initGlobe();
initTitle();
initScrollFx();
initReveal();
initScrollSpring();
setYear();
window.addEventListener("load", scrollToInitialHash);
