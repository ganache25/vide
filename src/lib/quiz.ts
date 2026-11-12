import { ALCOOLS } from '../data/alcools';
import { COCKTAILS } from '../data/cocktails';
import { BARS, FIGURES, LIVRES } from '../data/cultureBar';
import { FAMILLES, LEXIQUE } from '../data/guide';
import { OUTILS, VERRERIE_DETAIL } from '../data/materiel';
import { LIB_CATEGORIE, LIB_METHODE, LIB_TYPE, VERRES, type Fiche } from '../data/types';

export type Theme = 'tout' | 'socle' | 'produits' | 'materiel' | 'culture' | 'lexique';

export const THEMES: { v: Theme; l: string }[] = [
  { v: 'tout', l: 'Tout' },
  { v: 'socle', l: 'Socle' },
  { v: 'produits', l: 'Produits' },
  { v: 'materiel', l: 'Matériel' },
  { v: 'culture', l: 'Culture bar' },
  { v: 'lexique', l: 'Lexique' },
];

export type Question = {
  theme: Exclude<Theme, 'tout'>;
  enonce: string;
  choix: string[];
  bonne: string;
  /** Ce qu'il faut revoir en cas d'erreur, et où. */
  sujet: string;
  lien: string;
};

const hasard = (n: number) => Math.floor(Math.random() * n);

function melanger<T>(t: T[]): T[] {
  const a = [...t];
  for (let i = a.length - 1; i > 0; i--) {
    const j = hasard(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Complète la bonne réponse par des leurres distincts, puis mélange. */
function choix(bonne: string, leurres: string[], n = 4): string[] {
  const uniques = [...new Set(leurres)].filter((l) => l !== bonne);
  return melanger([bonne, ...melanger(uniques).slice(0, n - 1)]);
}

const min = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

// ───────────── Socle ─────────────

type Gen<T> = (x: T) => Omit<Question, 'theme' | 'sujet' | 'lien'> | null;

const GEN_SOCLE: Gen<Fiche>[] = [
  (c) => ({
    enonce: `Quelle est la méthode de réalisation du ${c.nom} ?`,
    bonne: LIB_METHODE[c.methode],
    choix: melanger(Object.values(LIB_METHODE)),
  }),
  (c) => ({
    enonce: `Dans quel verre sert-on le ${c.nom} ?`,
    bonne: c.verre,
    choix: choix(c.verre, VERRES.slice(0, 10)),
  }),
  (c) => {
    const principal = [...c.ingredients]
      .filter((i) => i.unite === 'ml' && i.qte != null && i.tav >= 15)
      .sort((a, b) => (b.qte ?? 0) - (a.qte ?? 0))[0];
    if (!principal?.qte) return null;
    const q = principal.qte;
    const leurres = [q - 20, q - 10, q - 5, q + 5, q + 10, q + 20].filter((v) => v > 0).map((v) => `${v} ml`);
    return {
      enonce: `Quelle quantité de « ${min(principal.nom)} » dans le ${c.nom} ?`,
      bonne: `${q} ml`,
      choix: choix(`${q} ml`, leurres),
    };
  },
  (c) => ({
    enonce: `Quel cocktail du socle se compose de : ${c.ingredients.map((i) => min(i.nom)).join(', ')} ?`,
    bonne: c.nom,
    choix: choix(
      c.nom,
      COCKTAILS.filter((x) => x.categorieOfficielle === c.categorieOfficielle).map((x) => x.nom),
    ),
  }),
  (c) =>
    c.garniture
      ? {
          enonce: `Quelle est la garniture du ${c.nom} ?`,
          bonne: c.garniture,
          choix: choix(c.garniture, COCKTAILS.map((x) => x.garniture).filter(Boolean)),
        }
      : null,
  (c) => ({
    enonce: `Le ${c.nom} est-il un short drink ou un long drink ?`,
    bonne: LIB_CATEGORIE[c.categorieOfficielle ?? 'short'],
    choix: Object.values(LIB_CATEGORIE),
  }),
  (c) => ({
    enonce: `À quel type appartient le ${c.nom} ?`,
    bonne: LIB_TYPE[c.type],
    choix: Object.values(LIB_TYPE),
  }),
  (c) => ({
    enonce: `Quel cocktail est décrit par « ${c.descripteurs} » et servi en verre ${c.verre} ?`,
    bonne: c.nom,
    // Écarte les cocktails qui partagent descripteurs et verre : la réponse doit être unique.
    choix: choix(c.nom, COCKTAILS.filter((x) => !(x.descripteurs === c.descripteurs && x.verre === c.verre)).map((x) => x.nom)),
  }),
  (c) =>
    c.variantes.length
      ? (() => {
          const v = c.variantes[hasard(c.variantes.length)];
          // Les variantes sans nom propre (« Ratios », « Sans émulsifiant ») ne font pas de bonnes questions.
          if (!/^[A-Z].* /.test(v.nom) && !/^[A-Z][a-z]+$/.test(v.nom)) return null;
          if (['Ratios', 'Sans émulsifiant'].includes(v.nom)) return null;
          return {
            enonce: `De quel cocktail du socle le ${v.nom} est-il une variante ?`,
            bonne: c.nom,
            choix: choix(c.nom, COCKTAILS.filter((x) => x.variantes.length).map((x) => x.nom)),
          };
        })()
      : null,
  (c) => ({
    enonce: `Quel est le TAV publié par le socle pour le ${c.nom} ?`,
    bonne: `${c.tavOfficiel} %`,
    choix: choix(
      `${c.tavOfficiel} %`,
      [-12, -7, 7, 12, 18].map((d) => (c.tavOfficiel ?? 0) + d).filter((v) => v > 0 && v <= 45).map((v) => `${v} %`),
    ),
  }),
];

function questionSocle(): Question {
  const c = COCKTAILS[hasard(COCKTAILS.length)];
  for (const g of melanger(GEN_SOCLE)) {
    const q = g(c);
    if (q && q.choix.length >= 2) return { ...q, theme: 'socle', sujet: c.nom, lien: `/cocktail/${c.id}` };
  }
  return { ...GEN_SOCLE[0](c)!, theme: 'socle', sujet: c.nom, lien: `/cocktail/${c.id}` };
}

// ───────────── Culture produits ─────────────

const AVEC_MATIERE = ALCOOLS.filter((a) => a.reperes.some((r) => r[0] === 'Matière première'));
const AVEC_DATES = ALCOOLS.filter((a) => (a.dates?.length ?? 0) > 0);
const TOUTES_DATES = AVEC_DATES.flatMap((a) => a.dates!.map((d) => d[0]));

function questionProduits(): Question {
  const sorte = hasard(5);
  if (sorte === 0) {
    const a = AVEC_MATIERE[hasard(AVEC_MATIERE.length)];
    const bonne = a.reperes.find((r) => r[0] === 'Matière première')![1];
    return {
      theme: 'produits',
      enonce: `Quelle est la matière première : ${a.nom} ?`,
      bonne,
      choix: choix(bonne, AVEC_MATIERE.map((x) => x.reperes.find((r) => r[0] === 'Matière première')![1])),
      sujet: a.nom,
      lien: `/alcool/${a.id}`,
    };
  }
  if (sorte === 1) {
    const a = AVEC_DATES[hasard(AVEC_DATES.length)];
    const [an, evenement] = a.dates![hasard(a.dates!.length)];
    return {
      theme: 'produits',
      enonce: `De quand date cet événement ? ${evenement}`,
      bonne: an,
      choix: choix(an, TOUTES_DATES),
      sujet: a.nom,
      lien: `/alcool/${a.id}`,
    };
  }
  if (sorte === 2) {
    const a = ALCOOLS[hasard(ALCOOLS.length)];
    const cat = a.categories[hasard(a.categories.length)];
    return {
      theme: 'produits',
      enonce: `À quoi correspond « ${cat.titre} » (${a.nom}) ?`,
      bonne: cat.texte,
      choix: choix(cat.texte, a.categories.map((x) => x.texte), 3),
      sujet: a.nom,
      lien: `/alcool/${a.id}`,
    };
  }
  if (sorte === 3) {
    const avec = ALCOOLS.filter((a) => (a.etapes?.length ?? 0) > 0);
    const a = avec[hasard(avec.length)];
    return {
      theme: 'produits',
      enonce: `Quel produit suit ces étapes d’élaboration : ${a.etapes!.map(min).join(' → ')} ?`,
      bonne: a.nom,
      choix: choix(a.nom, avec.filter((x) => x.etapes!.join() !== a.etapes!.join()).map((x) => x.nom)),
      sujet: a.nom,
      lien: `/alcool/${a.id}`,
    };
  }
  const a = ALCOOLS[hasard(ALCOOLS.length)];
  return {
    theme: 'produits',
    enonce: `Quel produit correspond à cette description ? « ${a.accroche} »`,
    bonne: a.nom,
    choix: choix(a.nom, ALCOOLS.filter((x) => x.famille !== a.famille || x.id === a.id).map((x) => x.nom)),
    sujet: a.nom,
    lien: `/alcool/${a.id}`,
  };
}

// ───────────── Matériel ─────────────

function questionMateriel(): Question {
  const sorte = hasard(4);
  if (sorte === 0) {
    const v = VERRERIE_DETAIL[hasard(VERRERIE_DETAIL.length)];
    return {
      theme: 'materiel',
      enonce: `Quel verre correspond à cette description ? ${v.usage}`,
      bonne: v.nom,
      choix: choix(v.nom, VERRERIE_DETAIL.map((x) => x.nom)),
      sujet: `Verre ${v.nom}`,
      lien: '/materiel',
    };
  }
  const o = OUTILS[hasard(OUTILS.length)];
  if (sorte === 1 && o.alias) {
    return {
      theme: 'materiel',
      enonce: `Quel outil appelle-t-on aussi « ${o.alias} » ?`,
      bonne: o.nom,
      choix: choix(o.nom, OUTILS.map((x) => x.nom)),
      sujet: o.nom,
      lien: '/materiel',
    };
  }
  if (sorte === 2) {
    return {
      theme: 'materiel',
      enonce: `À quoi sert : ${min(o.nom)} ?`,
      bonne: o.role,
      choix: choix(o.role, OUTILS.map((x) => x.role)),
      sujet: o.nom,
      lien: '/materiel',
    };
  }
  return {
    theme: 'materiel',
    enonce: `Quel outil a ce rôle ? ${o.role}`,
    bonne: o.nom,
    // Deux outils peuvent partager un rôle proche : on écarte ceux du même groupe.
    choix: choix(o.nom, OUTILS.filter((x) => x.groupe !== o.groupe).map((x) => x.nom)),
    sujet: o.nom,
    lien: '/materiel',
  };
}

// ───────────── Culture bar ─────────────

function questionCulture(): Question {
  const sorte = hasard(4);
  if (sorte === 0) {
    const b = BARS[hasard(BARS.length)];
    return {
      theme: 'culture',
      enonce: `Dans quelle ville se trouve ce bar : ${b.nom} ?`,
      bonne: b.ville,
      choix: choix(b.ville, [...BARS.map((x) => x.ville), 'Milan', 'Dublin']),
      sujet: b.nom,
      lien: '/culture-bar',
    };
  }
  if (sorte === 1) {
    const l = LIVRES[hasard(LIVRES.length)];
    return {
      theme: 'culture',
      enonce: `Qui a écrit « ${l.titre} » (${l.annee}) ?`,
      bonne: l.auteur,
      choix: choix(l.auteur, [...LIVRES.map((x) => x.auteur), ...FIGURES.map((x) => x.nom)]),
      sujet: l.titre,
      lien: '/culture-bar',
    };
  }
  const f = FIGURES[hasard(FIGURES.length)];
  if (sorte === 2) {
    return {
      theme: 'culture',
      enonce: `Qui est : ${min(f.role)} ?`,
      bonne: f.nom,
      choix: choix(f.nom, FIGURES.map((x) => x.nom)),
      sujet: f.nom,
      lien: '/culture-bar',
    };
  }
  return {
    theme: 'culture',
    enonce: `Que retient-on de ${f.nom} ?`,
    bonne: f.role,
    choix: choix(f.role, FIGURES.map((x) => x.role)),
    sujet: f.nom,
    lien: '/culture-bar',
  };
}

// ───────────── Lexique et familles ─────────────

function questionLexique(): Question {
  if (hasard(5) === 0) {
    const fam = FAMILLES[hasard(FAMILLES.length)];
    return {
      theme: 'lexique',
      enonce: `Quelle famille de cocktails correspond à cette définition ? ${fam.texte.replace(/ Le plus connu.*$/, '')}`,
      bonne: fam.titre,
      choix: choix(fam.titre, FAMILLES.map((x) => x.titre)),
      sujet: `Famille ${fam.titre}`,
      lien: '/guide',
    };
  }
  const [terme, definition] = LEXIQUE[hasard(LEXIQUE.length)];
  if (hasard(2) === 0) {
    return {
      theme: 'lexique',
      enonce: `Quel terme correspond à cette définition ? ${definition}`,
      bonne: terme,
      choix: choix(terme, LEXIQUE.map((x) => x[0])),
      sujet: terme,
      lien: '/guide',
    };
  }
  return {
    theme: 'lexique',
    enonce: `Que signifie « ${terme} » ?`,
    bonne: definition,
    choix: choix(definition, LEXIQUE.map((x) => x[1]), 3),
    sujet: terme,
    lien: '/guide',
  };
}

const PAR_THEME: Record<Exclude<Theme, 'tout'>, () => Question> = {
  socle: questionSocle,
  produits: questionProduits,
  materiel: questionMateriel,
  culture: questionCulture,
  lexique: questionLexique,
};

// En mode « Tout », le socle pèse double : c'est le cœur du référentiel.
const MELANGE: Exclude<Theme, 'tout'>[] = ['socle', 'socle', 'produits', 'materiel', 'culture', 'lexique'];

export function genererQuiz(theme: Theme = 'tout', nombre = 10): Question[] {
  const questions: Question[] = [];
  const vus = new Set<string>();
  let essais = 0;
  while (questions.length < nombre && essais < nombre * 30) {
    essais++;
    const t = theme === 'tout' ? MELANGE[questions.length % MELANGE.length] : theme;
    const q = PAR_THEME[t]();
    if (vus.has(q.enonce) || q.choix.length < 2 || !q.choix.includes(q.bonne)) continue;
    vus.add(q.enonce);
    questions.push(q);
  }
  return theme === 'tout' ? melanger(questions) : questions;
}
