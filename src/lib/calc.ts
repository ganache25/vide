import type { Categorie, Fiche, Glace, Ingredient, Methode } from '../data/types';

export type Calcul = {
  volume: number;
  tav: number;
  categorie: Categorie;
  /** Grammes d'alcool pur (densité de l'éthanol : 0,8 g/ml). */
  alcoolPur: number;
  /** Verres standard français (10 g d'alcool pur). */
  verresStandard: number;
  coutIngredients: number;
  coutDecoration: number;
  coutMatiere: number;
  prixHT: number;
  tva: number;
  prixTTC: number;
};

/**
 * Calcul selon la partie 8 du socle : TAV = Σ(volume × TAV) ÷ contenance du cocktail.
 * Seuls les ingrédients dosés en ml entrent dans la contenance (traits et gouttes sont
 * négligés, la dilution par la glace n'est pas comptée).
 * Coût matière : ingrédients + 10 % pour les éléments de décoration (règle de la mercuriale).
 */
export function calculer(ingredients: Ingredient[], ratio: number): Calcul {
  let volume = 0;
  let alcool = 0;
  let cout = 0;
  for (const i of ingredients) {
    const q = i.qte ?? 0;
    if (i.unite === 'ml') {
      volume += q;
      alcool += q * i.tav;
    }
    cout += q * i.prix;
  }
  const tav = volume > 0 ? alcool / volume : 0;
  const coutDecoration = cout * 0.1;
  const coutMatiere = cout + coutDecoration;
  const r = ratio > 0 ? ratio : 20;
  const prixHT = coutMatiere / (r / 100);
  // TVA en France : 20 % sur les boissons alcooliques, 10 % sur les boissons sans alcool servies.
  const tva = tav > 0 ? 20 : 10;
  const alcoolPur = (alcool / 100) * 0.8;
  return {
    volume,
    tav,
    categorie: volume < 100 ? 'short' : 'long',
    alcoolPur,
    verresStandard: alcoolPur / 10,
    coutIngredients: cout,
    coutDecoration,
    coutMatiere,
    prixHT,
    tva,
    prixTTC: prixHT * (1 + tva / 100),
  };
}

export const categorieDe = (f: Fiche): Categorie =>
  f.categorieOfficielle ?? calculer(f.ingredients, f.ratio).categorie;

export const euro = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;

export const nombre = (n: number, dec = 0) => n.toFixed(dec).replace('.', ',');

export function libelleQuantite(i: Ingredient): string {
  if (i.qte == null) return '';
  const q = nombre(i.qte, Number.isInteger(i.qte) ? 0 : 1);
  if (i.unite === 'ml') return `${q} ml`;
  if (i.unite === 'pièce') return q;
  const pluriel = i.qte > 1 && i.unite !== 'bar spoon' ? 's' : '';
  return `${q} ${i.unite}${pluriel}`;
}

const article = (verre: string) => (verre === 'Flûte' ? 'la Flûte' : `le verre ${verre}`);

/** Génère la technique type du socle (partie 4) selon la méthode, le verre et la glace. */
export function techniqueType(methode: Methode, verre: string, glace: Glace, garniture: string): string[] {
  const v = article(verre || 'de service');
  const g = glace === 'pilee' ? 'glace pilée' : 'glace';
  const fin = garniture.trim() ? [`Garnir : ${garniture.trim()}`] : [];
  if (methode === 'verre-melange') {
    return [
      `Mirer et remplir ${v} et le verre à mélange de glace`,
      'Rafraîchir le verre et le verre à mélange avec la cuillère de bar',
      glace === 'sans'
        ? 'Retirer la glace du verre et égoutter le verre à mélange'
        : 'Égoutter le verre, compléter de glace si besoin et égoutter le verre à mélange',
      'Verser les ingrédients dans le verre à mélange',
      'Mélanger 15 à 20 secondes à la cuillère de bar',
      glace === 'sans' ? 'Passer dans le verre rafraîchi' : `Passer dans le verre rempli de ${g}`,
      ...fin,
    ];
  }
  if (methode === 'shaker') {
    return [
      `Mirer et remplir ${v} de ${g}`,
      'Remplir la grande timbale du shaker de glace',
      'Rafraîchir le verre avec la cuillère de bar',
      'Verser les ingrédients dans la petite timbale du shaker',
      ...(glace === 'sans'
        ? ['Retirer la glace du verre et égoutter la grande timbale du shaker']
        : [`Égoutter le verre et compléter de ${g} si besoin`, 'Égoutter la grande timbale du shaker']),
      glace === 'sans'
        ? 'Frapper 7 à 10 secondes puis passer dans le verre rafraîchi'
        : `Frapper 7 à 10 secondes puis passer dans le verre rempli de ${g}`,
      ...fin,
    ];
  }
  return [
    `Mirer et remplir ${v} de ${g}`,
    'Rafraîchir le verre avec la cuillère de bar',
    glace === 'sans' ? 'Retirer la glace du verre' : `Égoutter le verre et compléter de ${g} si besoin`,
    'Verser les ingrédients dans l’ordre de la recette',
    'Mélanger',
    ...fin,
  ];
}
