import { COCKTAILS } from '../data/cocktails';
import { LIB_CATEGORIE, LIB_METHODE, LIB_TYPE, VERRES, type Fiche } from '../data/types';

export type Question = { cocktailId: string; enonce: string; choix: string[]; bonne: string };

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

type Generateur = (c: Fiche) => Question | null;

const GENERATEURS: Generateur[] = [
  (c) => ({
    cocktailId: c.id,
    enonce: `Quelle est la méthode de réalisation du ${c.nom} ?`,
    bonne: LIB_METHODE[c.methode],
    choix: melanger(Object.values(LIB_METHODE)),
  }),
  (c) => ({
    cocktailId: c.id,
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
      cocktailId: c.id,
      enonce: `Quelle quantité de « ${principal.nom.toLowerCase()} » dans le ${c.nom} ?`,
      bonne: `${q} ml`,
      choix: choix(`${q} ml`, leurres),
    };
  },
  (c) => ({
    cocktailId: c.id,
    enonce: `Quel cocktail du socle se compose de : ${c.ingredients.map((i) => i.nom.toLowerCase()).join(', ')} ?`,
    bonne: c.nom,
    choix: choix(
      c.nom,
      COCKTAILS.filter((x) => x.categorieOfficielle === c.categorieOfficielle).map((x) => x.nom),
    ),
  }),
  (c) =>
    c.garniture
      ? {
          cocktailId: c.id,
          enonce: `Quelle est la garniture du ${c.nom} ?`,
          bonne: c.garniture,
          choix: choix(
            c.garniture,
            COCKTAILS.map((x) => x.garniture).filter(Boolean),
          ),
        }
      : null,
  (c) => ({
    cocktailId: c.id,
    enonce: `Le ${c.nom} est-il un short drink ou un long drink ?`,
    bonne: LIB_CATEGORIE[c.categorieOfficielle ?? 'short'],
    choix: Object.values(LIB_CATEGORIE),
  }),
  (c) => ({
    cocktailId: c.id,
    enonce: `À quel type appartient le ${c.nom} ?`,
    bonne: LIB_TYPE[c.type],
    choix: Object.values(LIB_TYPE),
  }),
  (c) => ({
    cocktailId: c.id,
    enonce: `Quel cocktail est décrit par : « ${c.descripteurs} » et servi en verre ${c.verre} ?`,
    bonne: c.nom,
    choix: choix(
      c.nom,
      // Écarte les cocktails qui partagent descripteurs et verre : la question n'aurait pas de réponse unique.
      COCKTAILS.filter((x) => !(x.descripteurs === c.descripteurs && x.verre === c.verre)).map((x) => x.nom),
    ),
  }),
];

export function genererQuiz(nombre = 10): Question[] {
  const cocktails = melanger(COCKTAILS).slice(0, nombre);
  return cocktails.map((c) => {
    for (const g of melanger(GENERATEURS)) {
      const q = g(c);
      if (q && q.choix.length >= 2) return q;
    }
    return GENERATEURS[0](c)!;
  });
}
