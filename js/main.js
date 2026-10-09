/* =========================================================
   IISE Northeastern: site script
   1. Events: home page + events.html (edit the EVENTS array below)
   2. Mobile menu toggle
   3. Cross-page anchor alignment
   4. Footer year
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
  // TODO: Add a description for the Community Engagement Event
  {
    date: "2026-10-26",
    title: "Community Engagement Event",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Details coming soon.",
  },
  {
    date: "2026-11-02",
    title: "Course Registration",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Get advice from upperclassmen on picking next semester's classes.",
  },
  // TODO: Add the topic for the second Skills workshop
  {
    date: "2026-11-09",
    title: "Skills Workshop",
    time: "6:00 – 7:00 pm",
    location: "IV 022",
    description: "Topic coming soon.",
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

/* ---------- Cross-page anchors ----------
 * Arriving from a stub page at index.html#events etc.: rendered events shift the
 * layout, so re-align to the target once everything (including fonts) has loaded. */
function scrollToHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "instant" });
}

/* ---------- Footer year ---------- */
function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

renderEvents();
initNav();
setYear();
window.addEventListener("load", scrollToHash);
