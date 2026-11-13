/* ───────── Knowtail — site vitrine ───────── */

/* ▼ À LA SORTIE DE L'APPLICATION : collez ici les liens des stores.
   Dès qu'un lien est renseigné, le bouton correspondant s'active tout seul. */
const STORE_LINKS = {
  ios: "",      // ex. "https://apps.apple.com/app/idXXXXXXXXX"
  android: "",  // ex. "https://play.google.com/store/apps/details?id=xxx"
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, root = document) => root.querySelector(s);
const el = (tag, props = {}, ...children) => {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
};

/* ── Boutons de téléchargement ── */
let anyStore = false;
document.querySelectorAll(".store").forEach((a) => {
  const url = STORE_LINKS[a.dataset.store];
  if (url) {
    anyStore = true;
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.removeAttribute("aria-disabled");
    $("small", a).textContent = "Télécharger sur";
  } else {
    a.addEventListener("click", (e) => e.preventDefault());
  }
});
if (anyStore) {
  $("#dlnote").textContent = "Disponible dès maintenant sur votre store.";
  const note = $(".hero-note");
  note.textContent = note.textContent.replace("Bientôt disponible", "Disponible");
}
$("#year").textContent = new Date().getFullYear();

/* ── Navigation ── */
const nav = $("#nav");
const onScrollNav = () => nav.classList.toggle("scrolled", scrollY > 20);
onScrollNav();
addEventListener("scroll", onScrollNav, { passive: true });

/* ── Apparition au défilement ── */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
    if (e.target.id === "sheet") typeName();
  }),
  { threshold: 0.18, rootMargin: "0px 0px -40px" }
);
document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

/* ── Téléphone du hero : inclinaison au pointeur ── */
const tilt = $("#tilt"), phone = $("#phone");
if (!reduceMotion && matchMedia("(hover: hover)").matches) {
  tilt.addEventListener("pointermove", (e) => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    phone.style.setProperty("--ry", `${x * 22}deg`);
    phone.style.setProperty("--rx", `${-y * 16}deg`);
  });
  tilt.addEventListener("pointerleave", () => {
    phone.style.removeProperty("--ry");
    phone.style.removeProperty("--rx");
  });
}

/* ── Parallaxe tablette / téléphone ── */
const devices = $("#devices");
if (!reduceMotion) {
  let ticking = false;
  const parallax = () => {
    const r = devices.getBoundingClientRect();
    const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
    devices.style.setProperty("--p", p.toFixed(3));
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }, { passive: true });
  parallax();
}

/* ── Explorateur de classiques ── */
const COCKTAILS = [
  { name: "Negroni", origin: "Italie · 1919", glass: "g-rocks", liq: "#e0603f", tags: ["Au verre", "Old fashioned", "Amer"],
    items: [["Gin", "3 cl"], ["Bitter Campari", "3 cl"], ["Vermouth rouge", "3 cl"]], garnish: "demi-tranche d'orange" },
  { name: "Daiquiri", origin: "Cuba · v. 1900", glass: "g-coupe", liq: "#eee6b4", tags: ["Shaker", "Coupe", "Acidulé"],
    items: [["Rhum blanc", "6 cl"], ["Jus de citron vert", "2 cl"], ["Sucre fin", "2 c. à bar"]], garnish: "aucune" },
  { name: "Old Fashioned", origin: "États-Unis · XIXᵉ s.", glass: "g-rocks", liq: "#d9963a", tags: ["Au verre", "Old fashioned", "Puissant"],
    items: [["Bourbon ou rye", "4,5 cl"], ["Sucre", "1 morceau"], ["Angostura bitters", "quelques traits"]], garnish: "zeste d'orange" },
  { name: "Margarita", origin: "Mexique · v. 1940", glass: "g-coupe", liq: "#e6ecae", tags: ["Shaker", "Coupe", "Givrage sel"],
    items: [["Tequila", "5 cl"], ["Triple sec", "2 cl"], ["Jus de citron vert", "1,5 cl"]], garnish: "demi-givrage au sel" },
  { name: "Manhattan", origin: "États-Unis · v. 1880", glass: "g-coupe", liq: "#c0452f", tags: ["Verre à mélange", "Coupe", "Rond"],
    items: [["Rye whiskey", "5 cl"], ["Vermouth rouge", "2 cl"], ["Angostura bitters", "1 trait"]], garnish: "cerise au marasquin" },
];
const ctabs = $("#ctabs"), ccard = $("#ccard");

function showCocktail(i) {
  const c = COCKTAILS[i];
  [...ctabs.children].forEach((b, j) => b.setAttribute("aria-selected", j === i));
  $("#cglass use").setAttribute("href", `#${c.glass}`);
  $("#cglass").style.setProperty("--liq", c.liq);
  $("#corigin").textContent = c.origin;
  $("#cname").textContent = c.name;
  $("#ctags").replaceChildren(...c.tags.map((t) => el("span", { textContent: t })));
  $("#clist").replaceChildren(...c.items.map(([k, v]) => el("li", {}, el("span", { textContent: k }), el("b", { textContent: v }))));
  $("#cgarnish").textContent = `Garniture · ${c.garnish}`;
  [...$(".ec-body").children].forEach((n, k) => n.style.setProperty("--n", k));
  ccard.classList.remove("swap");
  void ccard.offsetWidth; // relance l'animation
  ccard.classList.add("swap");
}
COCKTAILS.forEach((c, i) => {
  const b = el("button", { type: "button", textContent: c.name });
  b.setAttribute("role", "tab");
  b.addEventListener("click", () => { clearInterval(autoplay); showCocktail(i); });
  ctabs.append(b);
});
let current = 0;
showCocktail(0);
// Défile tout seul tant que le visiteur n'a pas touché un onglet
let autoplay = reduceMotion ? 0 : setInterval(() => {
  const r = ccard.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight || document.hidden) return;
  current = (current + 1) % COCKTAILS.length;
  showCocktail(current);
}, 4200);

/* ── Fiche technique : nom tapé lettre à lettre ── */
function typeName() {
  const t = $(".type");
  const text = t.dataset.text;
  if (reduceMotion) { t.textContent = text; return; }
  let i = 0;
  const tick = () => {
    t.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, 70 + Math.random() * 60);
  };
  setTimeout(tick, 400);
}

/* ── Quiz ── */
const QUESTIONS = [
  { q: "Quel spiritueux est la base du Negroni ?", a: ["Vodka", "Gin", "Rhum", "Tequila"], ok: 1,
    fact: "Gin, bitter et vermouth rouge à parts égales : la recette tient en une ligne." },
  { q: "Que désigne un « dry shake » ?", a: ["Un shake sans glace", "Un cocktail sans sucre", "Un shake très court", "Un cocktail sans alcool"], ok: 0,
    fact: "On shake d'abord sans glace pour émulsionner le blanc d'œuf, puis une seconde fois avec glace." },
  { q: "De quel pays le Daiquiri est-il originaire ?", a: ["Mexique", "Brésil", "Cuba", "Porto Rico"], ok: 2,
    fact: "Il porte le nom d'un village proche de Santiago de Cuba." },
  { q: "Quel bitter aromatise traditionnellement l'Old Fashioned ?", a: ["Suze", "Campari", "Fernet", "Angostura"], ok: 3,
    fact: "Quelques traits d'Angostura sur le sucre, avant le whiskey." },
];
const qstage = $("#qstage"), qcount = $("#qcount"), qbar = $("#qbar");
let qi = 0, score = 0;

function stagger() { [...qstage.children].forEach((n, k) => n.style.setProperty("--n", k)); }

function renderQuestion() {
  const Q = QUESTIONS[qi];
  qcount.textContent = `Question ${qi + 1} / ${QUESTIONS.length}`;
  qbar.style.width = `${(qi / QUESTIONS.length) * 100}%`;
  const opts = Q.a.map((label, i) => {
    const b = el("button", { type: "button", className: "quiz-opt", textContent: label });
    b.addEventListener("click", () => answer(i, opts));
    return b;
  });
  qstage.replaceChildren(el("h3", { textContent: Q.q }), ...opts);
  stagger();
}

function answer(i, opts) {
  const Q = QUESTIONS[qi];
  opts.forEach((b) => (b.disabled = true));
  opts[Q.ok].classList.add("good");
  if (i === Q.ok) score++; else opts[i].classList.add("bad");
  qbar.style.width = `${((qi + 1) / QUESTIONS.length) * 100}%`;
  const last = qi === QUESTIONS.length - 1;
  const next = el("button", { type: "button", className: "btn quiz-next", textContent: last ? "Voir mon score" : "Question suivante →" });
  next.addEventListener("click", () => { qi++; last ? renderScore() : renderQuestion(); });
  qstage.append(el("p", { className: "quiz-fact", textContent: Q.fact }), next);
  next.focus({ preventScroll: true });
}

function renderScore() {
  qcount.textContent = "Résultat";
  const verdict = score === QUESTIONS.length ? "Sans faute. Le bar n'a pas de secret pour vous."
    : score >= QUESTIONS.length / 2 ? "Belle base ! Knowtail vous aidera à combler le reste."
    : "Il y a de quoi progresser — c'est exactement ce pour quoi Knowtail existe.";
  const again = el("button", { type: "button", className: "btn quiz-next", textContent: "Rejouer" });
  again.addEventListener("click", () => { qi = 0; score = 0; renderQuestion(); });
  const scoreEl = el("p", { className: "quiz-score", textContent: score }, el("small", { textContent: ` / ${QUESTIONS.length}` }));
  qstage.replaceChildren(scoreEl, el("h3", { textContent: verdict }),
    el("p", { className: "quiz-fact", textContent: "Dans l'application, les quiz couvrent tout l'univers du bar." }), again);
  stagger();
}
renderQuestion();
