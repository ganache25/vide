import type { Unite } from './produits';

export type Methode = 'shaker' | 'verre-melange' | 'direct';
export type TypeCocktail = 'before' | 'after' | 'allday';
export type Categorie = 'short' | 'long';
export type Glace = 'sans' | 'cubes' | 'pilee';

export type Ingredient = {
  nom: string;
  /** null = quantité libre (« sel au céleri », « au goût »). */
  qte: number | null;
  unite: Unite;
  tav: number;
  /** Prix HT par unité (€ par ml pour les liquides). */
  prix: number;
};

export type Variante = { nom: string; texte: string };

export type Fiche = {
  id: string;
  source: 'socle' | 'perso';
  nom: string;
  descripteurs: string;
  historique: string;
  type: TypeCocktail;
  methode: Methode;
  verre: string;
  glace: Glace;
  ingredients: Ingredient[];
  garniture: string;
  technique: string[];
  variantes: Variante[];
  nb: string[];
  notes: string;
  /** Ratio matière visé, en % du prix de vente HT. */
  ratio: number;
  /** Valeurs publiées dans le socle (fiches officielles uniquement). */
  categorieOfficielle?: Categorie;
  tavOfficiel?: number;
  /** Cocktail du socle dont la fiche est une revisite. */
  baseId?: string;
  updatedAt?: number;
};

export const LIB_METHODE: Record<Methode, string> = {
  shaker: 'Shaker',
  'verre-melange': 'Verre à mélange',
  direct: 'Direct au verre',
};

export const LIB_TYPE: Record<TypeCocktail, string> = {
  before: 'Before dinner',
  after: 'After dinner',
  allday: 'All day cocktail',
};

export const LIB_CATEGORIE: Record<Categorie, string> = { short: 'Short drink', long: 'Long drink' };

export const LIB_GLACE: Record<Glace, string> = { sans: 'Sans glace', cubes: 'Glaçons', pilee: 'Glace pilée' };

export const VERRES = [
  'Shot',
  'Mule',
  'Rocks',
  'Highball',
  'Dégustation',
  'Nick & Nora',
  'Coupe',
  'Martini',
  'Vin',
  'Flûte',
  'Digestif',
  'Absinthe',
  'Toddy',
  'Punch',
  'Hurricane',
  'Copa',
  'Bière',
  'Julep',
  'Tiki',
  'Fantaisie',
];
