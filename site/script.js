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

/* ── Bandeau : les cocktails du socle ── */
const SOCLE = ["Aviation", "Bamboo", "Bramble", "Caipirinha", "Cosmopolitan", "Daiquiri", "Dry Martini", "Espresso Martini",
  "Gin Basil Smash", "Manhattan", "Margarita", "Mint Julep", "Negroni", "Old-Fashioned", "Penicillin", "Sidecar"];
const marquee = $("#marquee");
for (let k = 0; k < 2; k++) SOCLE.forEach((n) => marquee.append(el("span", { textContent: n }), el("i", { textContent: "✦" })));

/* ── Compteurs ── */
const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  countIO.unobserve(e.target);
  const end = +e.target.dataset.count, t0 = performance.now(), dur = 1400;
  if (reduceMotion) return;
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur);
    e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}), { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((n) => countIO.observe(n));

/* ── Visionneuse d'écrans (section socle) ── */
const viewer = $("#viewer");
const vTabs = [...viewer.querySelectorAll(".viewer-tabs button")];
const vImgs = [...viewer.querySelectorAll(".screens img")];
let vIndex = 0;
function showScreen(i) {
  vIndex = i;
  vTabs.forEach((b, k) => b.setAttribute("aria-selected", k === i));
  vImgs.forEach((im, k) => im.classList.toggle("on", k === i));
}
// Défile tout seul tant que le visiteur n'a pas touché un onglet
let autoplay = reduceMotion ? 0 : setInterval(() => {
  const r = viewer.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight || document.hidden) return;
  showScreen((vIndex + 1) % vImgs.length);
}, 3800);
vTabs.forEach((b, i) => b.addEventListener("click", () => { clearInterval(autoplay); showScreen(i); }));

/* ── Quiz ── */
const QUESTIONS = [
  { q: "Quel cocktail du socle se compose de sirop de sucre, jus de citron, gin et feuilles de basilic ?",
    a: ["Caipirinha", "Gin Basil Smash", "Penicillin", "Mint Julep"], ok: 1,
    fact: "Un classique moderne : frais, acidulé et végétal, préparé au shaker." },
  { q: "Selon quelle méthode prépare-t-on le Negroni ?", a: ["Direct au verre", "Au shaker", "Au verre à mélange", "Au blender"], ok: 0,
    fact: "30 ml de vermouth rouge, 30 ml de bitter, 30 ml de gin, directement dans un verre Rocks rempli de glace." },
  { q: "Quel outil appelle-t-on aussi « jigger » ?", a: ["La passoire", "Le pilon", "Le doseur", "La cuillère de bar"], ok: 2,
    fact: "Un double cône gradué : la régularité d'une carte commence par un dosage précis." },
  { q: "En quelle année Jerry Thomas publie-t-il le premier guide du barman ?", a: ["1806", "1930", "1911", "1862"], ok: 3,
    fact: "1806, c'est la première définition du mot « cock-tail » ; 1930, la parution du Savoy Cocktail Book." },
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
    el("p", { className: "quiz-fact", textContent: "Dans l'application : cinq thèmes, de 5 à 30 questions tirées au hasard." }), again);
  stagger();
}
renderQuestion();
