// Classiques hors socle : les cocktails officiels de l'IBA (International Bartenders Association) qui ne
// figurent pas dans le Socle des cocktails de référence. Recettes, méthodes et garnitures reprises de la
// liste officielle publiée sur iba-world.com (consultée en novembre 2026), traduites en français.
// Les historiques et descripteurs sont rédigés pour l'application.

import { PRODUIT_PAR_ID, type Unite } from './produits';
import type { Fiche, Glace, Ingredient, Methode, TypeCocktail, Variante } from './types';

const p = (id: string, qte: number | null, nom?: string): Ingredient => {
  const prod = PRODUIT_PAR_ID[id];
  if (!prod) throw new Error(`Produit inconnu : ${id}`);
  return { nom: nom ?? prod.nom, qte, unite: prod.unite, tav: prod.tav, prix: prod.prix, pid: id };
};
const x = (nom: string, qte: number | null, unite: Unite): Ingredient => ({ nom, qte, unite, tav: 0, prix: 0 });

export const CATEGORIES_IBA = ['Inoubliables', 'Classiques contemporains', 'Nouvelle ère'] as const;
export type CategorieIBA = (typeof CATEGORIES_IBA)[number];

type Def = {
  id: string;
  nom: string;
  cat: CategorieIBA;
  desc: string;
  histo: string;
  type: TypeCocktail;
  methode: Methode;
  verre: string;
  glace: Glace;
  ing: Ingredient[];
  garniture: string;
  tech: string[];
  couleur: string;
  decor?: string[];
  variantes?: Variante[];
  nb?: string[];
};

const I: CategorieIBA = 'Inoubliables';
const CC: CategorieIBA = 'Classiques contemporains';
const NE: CategorieIBA = 'Nouvelle ère';

// Formules de méthode IBA les plus fréquentes.
const SHAKER_COUPE = ['Verser tous les ingrédients dans le shaker', 'Frapper avec de la glace', 'Passer dans un verre à cocktail rafraîchi'];
const SHAKER_ROCKS = ['Verser tous les ingrédients dans le shaker', 'Frapper avec de la glace', 'Passer dans un verre Rocks rempli de glace'];
const MELANGE_COUPE = ['Verser tous les ingrédients dans le verre à mélange rempli de glace', 'Bien mélanger', 'Passer dans un verre à cocktail rafraîchi'];
const DIRECT_ROCKS = ['Verser tous les ingrédients directement dans un verre Rocks rempli de glace', 'Mélanger délicatement'];
const DIRECT_HIGHBALL = ['Monter tous les ingrédients directement dans un verre Highball rempli de glace', 'Mélanger délicatement'];

const DEFS: Def[] = [
  // ───────────── Inoubliables ─────────────
  {
    id: 'alexander', nom: 'Alexander', cat: I, desc: 'Crémeux, gourmand et doux', type: 'after', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Apparu aux États-Unis au début du XXe siècle, d’abord au gin ; la version au cognac, dite Brandy Alexander, s’impose après la Prohibition.',
    ing: [p('cognac', 30, 'Cognac'), p('creme-cacao-brun', 30), p('creme-liquide', 30)],
    garniture: 'Noix de muscade fraîchement râpée', tech: [...SHAKER_COUPE, 'Râper de la noix de muscade sur le dessus'], couleur: '#D9B88F', decor: ['mousse'],
  },
  {
    id: 'angel-face', nom: 'Angel Face', cat: I, desc: 'Fruité, puissant et sec', type: 'before', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Publié par Harry Craddock dans The Savoy Cocktail Book en 1930.',
    ing: [p('gin', 30), p('apricot-brandy', 30), p('calvados', 30, 'Calvados')],
    garniture: '', tech: SHAKER_COUPE, couleur: '#E3A85A',
  },
  {
    id: 'between-the-sheets', nom: 'Between the Sheets', cat: I, desc: 'Puissant, acidulé et zesté', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Cousin du Sidecar, attribué aux années 1930 et souvent associé à Harry MacElhone, du Harry’s New York Bar à Paris.',
    ing: [p('rhum-blanc', 30), p('cognac', 30, 'Cognac'), p('triple-sec', 30), p('citron', 20)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#EED69A',
  },
  {
    id: 'boulevardier', nom: 'Boulevardier', cat: I, desc: 'Puissant, amer et boisé', type: 'before', methode: 'verre-melange', verre: 'Coupe', glace: 'sans',
    histo: 'Attribué à Erskine Gwynne, éditeur à Paris du magazine The Boulevardier ; la recette paraît dans Barflies and Cocktails de Harry MacElhone en 1927.',
    ing: [p('bourbon', 45, 'Bourbon ou rye'), p('bitter', 30, 'Bitter'), p('vermouth-rouge', 30)],
    garniture: 'Zeste d’orange, éventuellement zeste de citron', tech: MELANGE_COUPE, couleur: '#9E2A22', decor: ['zeste:orange'],
  },
  {
    id: 'brandy-crusta', nom: 'Brandy Crusta', cat: I, desc: 'Puissant, acidulé et parfumé', type: 'allday', methode: 'verre-melange', verre: 'Coupe', glace: 'sans',
    histo: 'Créé vers 1850 par Joseph Santini à La Nouvelle-Orléans et publié par Jerry Thomas en 1862 : l’ancêtre du Sidecar.',
    ing: [p('cognac', 52.5, 'Brandy'), p('maraschino', 7.5), p('curacao-orange', 5), p('citron', 15), p('sirop-sucre', 5), p('aromatic-bitters', 2)],
    garniture: 'Rim de sucre, long zeste d’orange (ou de citron)',
    tech: ['Frotter le bord d’un verre fin avec une tranche d’orange (ou de citron), puis le givrer au sucre en poudre', 'Mélanger tous les ingrédients avec de la glace dans le verre à mélange', 'Passer dans le verre préparé'],
    couleur: '#E2A64E', decor: ['sel', 'longZeste'],
    nb: ['Le bord givré de sucre, la « croûte », a donné son nom au cocktail.'],
  },
  {
    id: 'casino', nom: 'Casino', cat: I, desc: 'Sec, floral et acidulé', type: 'before', methode: 'shaker', verre: 'Rocks', glace: 'cubes',
    histo: 'Publié dans les recueils londoniens de l’entre-deux-guerres, dont le Savoy Cocktail Book (1930).',
    ing: [p('gin', 40, 'Old Tom gin'), p('maraschino', 10), p('citron', 10), p('orange-bitters', 2)],
    garniture: 'Zeste de citron et cerise au marasquin', tech: SHAKER_ROCKS, couleur: '#EEEBD2', decor: ['zeste:citron', 'cerise'],
  },
  {
    id: 'clover-club', nom: 'Clover Club', cat: I, desc: 'Fruité, soyeux et acidulé', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Né avant 1910 au Bellevue-Stratford Hotel de Philadelphie, où se réunissait le club d’hommes qui lui a donné son nom.',
    ing: [p('gin', 45), p('sirop-framboise', 15), p('citron', 15), x('Blanc d’œuf (quelques gouttes)', null, 'goutte')],
    garniture: 'Framboises fraîches', tech: SHAKER_COUPE, couleur: '#E0607E', decor: ['mousse', 'framboises'],
  },
  {
    id: 'hanky-panky', nom: 'Hanky Panky', cat: I, desc: 'Vineux, amer et herbacé', type: 'before', methode: 'verre-melange', verre: 'Coupe', glace: 'sans',
    histo: 'Créé par Ada Coleman, cheffe barmaid de l’American Bar du Savoy à Londres, au début du XXe siècle.',
    ing: [p('gin', 45, 'London dry gin'), p('vermouth-rouge', 45), p('fernet', 7.5)],
    garniture: 'Zeste d’orange', tech: MELANGE_COUPE, couleur: '#7E2A1E', decor: ['zeste:orange'],
  },
  {
    id: 'john-collins', nom: 'John Collins', cat: I, desc: 'Frais, acidulé et désaltérant', type: 'allday', methode: 'direct', verre: 'Highball', glace: 'cubes',
    histo: 'Doit son nom à un serveur du Limmer’s Hotel de Londres au XIXe siècle ; publié par Jerry Thomas dès 1876.',
    ing: [p('gin', 45), p('citron', 30), p('sirop-sucre', 15), p('eau-gazeuse', 60)],
    garniture: 'Tranche de citron et cerise au marasquin', tech: DIRECT_HIGHBALL, couleur: '#F2F1DE', decor: ['tranche:citron', 'cerise', 'paille'],
    variantes: [{ nom: 'Tom Collins', texte: 'Avec du gin Old Tom.' }],
  },
  {
    id: 'last-word', nom: 'Last Word', cat: I, desc: 'Herbacé, acidulé et complexe', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Né au Detroit Athletic Club pendant la Prohibition, oublié puis remis à la mode à Seattle au début des années 2000.',
    ing: [p('gin', 22.5), p('chartreuse-verte', 22.5), p('maraschino', 22.5), p('citron-vert', 22.5)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#C9D58A',
  },
  {
    id: 'martinez', nom: 'Martinez', cat: I, desc: 'Vineux, rond et épicé', type: 'before', methode: 'verre-melange', verre: 'Coupe', glace: 'sans',
    histo: 'Considéré comme l’ancêtre du Martini ; la recette paraît dans les guides américains des années 1880.',
    ing: [p('gin', 45, 'London dry gin'), p('vermouth-rouge', 45), p('maraschino', 5), p('orange-bitters', 2)],
    garniture: 'Zeste de citron', tech: MELANGE_COUPE, couleur: '#9B3A22', decor: ['zeste:citron'],
  },
  {
    id: 'mary-pickford', nom: 'Mary Pickford', cat: I, desc: 'Fruité, rond et doux', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Créé à La Havane pendant la Prohibition en l’honneur de l’actrice canadienne Mary Pickford.',
    ing: [p('rhum-blanc', 45), p('ananas', 45), p('maraschino', 7.5), p('sirop-grenadine', 5)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#F0A7A0',
  },
  {
    id: 'monkey-gland', nom: 'Monkey Gland', cat: I, desc: 'Fruité, anisé et acidulé', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Créé dans les années 1920 par Harry MacElhone, du Harry’s New York Bar à Paris.',
    ing: [p('gin', 45), p('orange', 45), p('absinthe', 15), p('sirop-grenadine', 15)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#EE8A4A',
  },
  {
    id: 'paradise', nom: 'Paradise', cat: I, desc: 'Fruité, doux et rond', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Publié par Harry Craddock dans The Savoy Cocktail Book en 1930.',
    ing: [p('gin', 30), p('apricot-brandy', 20), p('orange', 15)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#F0A848',
  },
  {
    id: 'porto-flip', nom: 'Porto Flip', cat: I, desc: 'Onctueux, vineux et épicé', type: 'after', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Le flip, mélange d’œuf, de vin ou de spiritueux et de sucre, est l’une des plus anciennes familles de boissons ; cette version figure chez Jerry Thomas.',
    ing: [p('cognac', 15, 'Brandy'), p('porto-tawny', 45), p('jaune-oeuf', 10)],
    garniture: 'Noix de muscade fraîchement râpée', tech: [...SHAKER_COUPE, 'Râper de la noix de muscade sur le dessus'], couleur: '#8E3A2A', decor: ['mousse'],
  },
  {
    id: 'ramos-fizz', nom: 'Ramos Fizz', cat: I, desc: 'Aérien, floral et crémeux', type: 'allday', methode: 'shaker', verre: 'Highball', glace: 'sans',
    histo: 'Inventé par Henry C. Ramos en 1888 à La Nouvelle-Orléans ; on raconte qu’une chaîne de barmen se passait le shaker pendant douze minutes.',
    ing: [p('gin', 45), p('citron-vert', 15), p('citron', 15), p('sirop-sucre', 30), p('creme-liquide', 60), p('blanc-oeuf', 30), p('fleur-oranger', 3), p('vanille', 2), p('eau-gazeuse', null, 'Eau gazeuse (pour compléter)')],
    garniture: '',
    tech: ['Verser tous les ingrédients sauf l’eau gazeuse dans le shaker avec de la glace', 'Frapper deux minutes', 'Passer à la passoire fine, remettre dans le shaker et frapper une minute sans glace', 'Verser dans un verre Highball et compléter d’eau gazeuse'],
    couleur: '#F4F0E2', decor: ['mousse'],
  },
  {
    id: 'remember-the-maine', nom: 'Remember the Maine', cat: I, desc: 'Puissant, fruité et anisé', type: 'before', methode: 'verre-melange', verre: 'Coupe', glace: 'sans',
    histo: 'Publié en 1939 par Charles H. Baker ; son nom rappelle le cuirassé américain coulé dans le port de La Havane en 1898.',
    ing: [p('rye', 60, 'Rye whiskey'), p('vermouth-rouge', 22.5), p('cherry-brandy', 15), p('absinthe', 7.5)],
    garniture: 'Zeste de citron',
    tech: ['Rincer une coupe à l’absinthe en la faisant tourner, puis jeter l’excédent', 'Mélanger les autres ingrédients dans le verre à mélange rempli de glace aux trois quarts', 'Passer dans la coupe rincée'],
    couleur: '#7A2A22', decor: ['zeste:citron'],
  },
  {
    id: 'rusty-nail', nom: 'Rusty Nail', cat: I, desc: 'Puissant, miellé et boisé', type: 'after', methode: 'direct', verre: 'Rocks', glace: 'cubes',
    histo: 'Mélange de scotch et de Drambuie popularisé dans les années 1950 et 1960.',
    ing: [p('blend-whisky', 45, 'Scotch whisky'), p('drambuie', 25)],
    garniture: 'Zeste de citron', tech: DIRECT_ROCKS, couleur: '#C17A2A', decor: ['zeste:citron'],
  },
  {
    id: 'sazerac', nom: 'Sazerac', cat: I, desc: 'Puissant, anisé et épicé', type: 'before', methode: 'verre-melange', verre: 'Rocks', glace: 'sans',
    histo: 'Le cocktail emblématique de La Nouvelle-Orléans, autour des bitters de l’apothicaire Antoine Peychaud ; d’abord au cognac Sazerac, puis au rye.',
    ing: [p('cognac', 50, 'Cognac'), p('absinthe', 10), p('sucre-morceau', 1, 'Morceau de sucre'), p('peychaud', 2)],
    garniture: 'Zeste de citron',
    tech: ['Rincer un verre Rocks rafraîchi à l’absinthe, y mettre de la glace pilée et réserver', 'Mélanger les autres ingrédients sur glace dans le verre à mélange', 'Vider la glace et l’excédent d’absinthe du verre', 'Passer le cocktail dans le verre préparé'],
    couleur: '#B5532A', decor: ['zeste:citron'],
    nb: ['Après la guerre de Sécession, le rye whiskey a remplacé le cognac, devenu difficile à trouver.'],
  },
  {
    id: 'stinger', nom: 'Stinger', cat: I, desc: 'Puissant, mentholé et frais', type: 'after', methode: 'verre-melange', verre: 'Martini', glace: 'sans',
    histo: 'Digestif new-yorkais de la Belle Époque, apprécié de la haute société américaine.',
    ing: [p('cognac', 50, 'Cognac'), p('creme-menthe-blanche', 20)],
    garniture: 'Feuille de menthe (facultatif)', tech: ['Verser les ingrédients dans le verre à mélange rempli de glace', 'Bien mélanger', 'Passer dans un verre Martini rafraîchi'], couleur: '#E0C79A',
  },
  {
    id: 'tuxedo', nom: 'Tuxedo', cat: I, desc: 'Sec, floral et anisé', type: 'before', methode: 'verre-melange', verre: 'Martini', glace: 'sans',
    histo: 'Né au Tuxedo Club de Tuxedo Park, dans l’État de New York, à la fin du XIXe siècle.',
    ing: [p('gin', 30, 'Old Tom gin'), p('vermouth-dry', 30), p('maraschino', 2.5), p('absinthe', 1.25), p('orange-bitters', 3)],
    garniture: 'Cerise et zeste de citron', tech: ['Verser tous les ingrédients dans le verre à mélange rempli de glace', 'Bien mélanger', 'Passer dans un verre Martini rafraîchi'], couleur: '#EEEFE0', decor: ['cerise:fond', 'zeste:citron'],
  },
  {
    id: 'vieux-carre', nom: 'Vieux Carré', cat: I, desc: 'Puissant, épicé et complexe', type: 'before', methode: 'verre-melange', verre: 'Coupe', glace: 'sans',
    histo: 'Créé en 1938 par Walter Bergeron à l’hôtel Monteleone de La Nouvelle-Orléans ; son nom désigne le Quartier français.',
    ing: [p('rye', 30, 'Rye whiskey'), p('cognac', 30, 'Cognac'), p('vermouth-rouge', 30), p('benedictine', 5), p('peychaud', 2)],
    garniture: 'Zeste d’orange et cerise au marasquin', tech: MELANGE_COUPE, couleur: '#9A4A26', decor: ['zeste:orange', 'cerise:fond'],
  },
  {
    id: 'white-lady', nom: 'White Lady', cat: I, desc: 'Sec, acidulé et zesté', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Associé à Harry MacElhone (Londres, 1919, puis Paris) et à Harry Craddock, qui le publie au gin en 1930.',
    ing: [p('gin', 40), p('triple-sec', 30), p('citron', 20)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#F1EFDC',
  },

  // ───────────── Classiques contemporains ─────────────
  {
    id: 'black-russian', nom: 'Black Russian', cat: CC, desc: 'Puissant, corsé et doux', type: 'after', methode: 'direct', verre: 'Rocks', glace: 'cubes',
    histo: 'Créé en 1949 par Gustave Tops à l’hôtel Metropole de Bruxelles, en l’honneur de l’ambassadrice américaine Perle Mesta.',
    ing: [p('vodka', 50), p('liqueur-cafe', 20)],
    garniture: '', tech: DIRECT_ROCKS, couleur: '#3B2418',
    variantes: [{ nom: 'White Russian', texte: 'Verser un filet de crème fraîche sur le dessus et la mélanger lentement.' }],
  },
  {
    id: 'cardinale', nom: 'Cardinale', cat: CC, desc: 'Sec, amer et vineux', type: 'before', methode: 'verre-melange', verre: 'Coupe', glace: 'sans',
    histo: 'Variante sèche du Negroni, avec le vermouth dry à la place du rouge ; citée par le socle comme variante.',
    ing: [p('gin', 40), p('vermouth-dry', 20), p('bitter', 10, 'Bitter')],
    garniture: 'Zeste de citron', tech: MELANGE_COUPE, couleur: '#D0484A', decor: ['zeste:citron'],
  },
  {
    id: 'corpse-reviver-2', nom: 'Corpse Reviver n° 2', cat: CC, desc: 'Acidulé, zesté et anisé', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Les « corpse revivers » étaient des remèdes du lendemain ; le n° 2 est publié par Harry Craddock en 1930.',
    ing: [p('gin', 30), p('triple-sec', 30, 'Cointreau'), p('lillet-blanc', 30), p('citron', 30), x('Absinthe', 1, 'trait')],
    garniture: 'Zeste d’orange', tech: SHAKER_COUPE, couleur: '#EFE6B8', decor: ['zeste:orange'],
  },
  {
    id: 'cuba-libre', nom: 'Cuba Libre', cat: CC, desc: 'Frais, sucré et désaltérant', type: 'allday', methode: 'direct', verre: 'Highball', glace: 'cubes',
    histo: 'Né à La Havane au tout début du XXe siècle, après la guerre hispano-américaine ; son nom reprend le cri des indépendantistes.',
    ing: [p('rhum-blanc', 50), p('cola', 120), p('citron-vert', 10)],
    garniture: 'Quartier de citron vert', tech: ['Monter tous les ingrédients dans un verre Highball rempli de glace'], couleur: '#4A2414', decor: ['quartier:citron-vert', 'paille'],
  },
  {
    id: 'french-connection', nom: 'French Connection', cat: CC, desc: 'Rond, amandé et chaleureux', type: 'after', methode: 'direct', verre: 'Rocks', glace: 'cubes',
    histo: 'Popularisé dans les années 1970, et nommé d’après le film de 1971.',
    ing: [p('cognac', 35, 'Cognac'), p('amaretto', 35)],
    garniture: '', tech: DIRECT_ROCKS, couleur: '#B5642A',
  },
  {
    id: 'garibaldi', nom: 'Garibaldi', cat: CC, desc: 'Amer, fruité et désaltérant', type: 'before', methode: 'direct', verre: 'Highball', glace: 'cubes',
    histo: 'Nommé d’après Giuseppe Garibaldi, artisan de l’unité italienne : le rouge du bitter milanais rejoint l’orange du Sud.',
    ing: [p('bitter', 45, 'Bitter'), p('orange', 120, 'Jus d’orange pressé')],
    garniture: 'Quartier d’orange', tech: ['Monter tous les ingrédients dans un verre Highball rempli de glace'], couleur: '#E8603A', decor: ['quartier:orange'],
  },
  {
    id: 'grasshopper', nom: 'Grasshopper', cat: CC, desc: 'Mentholé, crémeux et gourmand', type: 'after', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Attribué à Tujague’s, à La Nouvelle-Orléans, au début du XXe siècle ; très populaire dans les années 1950.',
    ing: [p('creme-cacao-blanc', 20), p('creme-menthe-verte', 20), p('creme-liquide', 20)],
    garniture: 'Feuille de menthe (facultatif)', tech: ['Verser tous les ingrédients dans le shaker rempli de glace', 'Frapper vivement quelques secondes', 'Passer dans un verre à cocktail rafraîchi'], couleur: '#A9D7A0', decor: ['mousse'],
  },
  {
    id: 'hemingway-special', nom: 'Hemingway Special', cat: CC, desc: 'Sec, acidulé et fruité', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'La version sans sucre du Daiquiri préparée pour Ernest Hemingway au Floridita de La Havane ; le socle la cite en variante, avec d’autres dosages.',
    ing: [p('ron-cubain', 60, 'Rhum'), p('pamplemousse', 40), p('maraschino', 15), p('citron-vert', 15)],
    garniture: '', tech: ['Verser tous les ingrédients dans le shaker avec de la glace', 'Bien frapper', 'Passer dans un grand verre à cocktail'], couleur: '#F2D6C0',
  },
  {
    id: 'irish-coffee', nom: 'Irish Coffee', cat: CC, desc: 'Chaud, corsé et crémeux', type: 'after', methode: 'direct', verre: 'Toddy', glace: 'sans',
    histo: 'Créé en 1943 par Joe Sheridan à l’aérogare de Foynes, en Irlande, pour réchauffer des passagers transatlantiques.',
    ing: [p('irish-whiskey', 50, 'Irish whiskey'), p('cafe-chaud', 120), p('creme-liquide', 50, 'Crème fraîche froide'), p('sucre-poudre', 1)],
    garniture: '',
    tech: ['Verser le café chaud dans un verre à Irish coffee préchauffé', 'Ajouter le whiskey et au moins une cuillère de sucre ; mélanger jusqu’à dissolution', 'Faire couler délicatement la crème froide sur le dos d’une cuillère, juste au-dessus du café', 'La crème doit flotter sans se mélanger'],
    couleur: '#3B2418', decor: ['mousse'],
    nb: ['Le sucre peut être remplacé par du sirop de sucre.'],
  },
  {
    id: 'kir', nom: 'Kir', cat: CC, desc: 'Fruité, vineux et léger', type: 'before', methode: 'direct', verre: 'Vin', glace: 'sans',
    histo: 'Le « blanc-cassis » bourguignon, rebaptisé d’après le chanoine Félix Kir, maire de Dijon, qui le servait aux réceptions après la guerre.',
    ing: [p('vin-blanc', 90), p('creme-cassis', 10)],
    garniture: '', tech: ['Verser la crème de cassis dans le verre', 'Compléter de vin blanc'], couleur: '#C0506A',
    variantes: [{ nom: 'Kir Royal', texte: 'Le champagne remplace le vin blanc.' }],
  },
  {
    id: 'lemon-drop-martini', nom: 'Lemon Drop Martini', cat: CC, desc: 'Acidulé, frais et zesté', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Né à San Francisco dans les années 1970, au bar Henry Africa’s.',
    ing: [p('vodka', 30), p('triple-sec', 20), p('citron', 15)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#F2E7A0',
  },
  {
    id: 'long-island-iced-tea', nom: 'Long Island Iced Tea', cat: CC, desc: 'Puissant, sucré et acidulé', type: 'allday', methode: 'direct', verre: 'Highball', glace: 'cubes',
    histo: 'Attribué à Robert « Rosebud » Butt, à Long Island, dans les années 1970 : cinq spiritueux, et pourtant la couleur d’un thé glacé.',
    ing: [p('vodka', 15), p('tequila', 15), p('rhum-blanc', 15), p('gin', 15), p('triple-sec', 15, 'Cointreau'), p('citron', 25), p('sirop-sucre', 30), p('cola', null, 'Cola (pour compléter)')],
    garniture: 'Tranche de citron (facultatif)', tech: ['Verser tous les ingrédients dans un verre Highball rempli de glace', 'Mélanger délicatement'], couleur: '#A86A3A', decor: ['tranche:citron', 'paille'],
  },
  {
    id: 'mimosa', nom: 'Mimosa', cat: CC, desc: 'Fruité, pétillant et léger', type: 'allday', methode: 'direct', verre: 'Flûte', glace: 'sans',
    histo: 'Attribué à Frank Meier, du Ritz à Paris, vers 1925 ; le socle le cite comme variante du Bellini.',
    ing: [p('orange', 75, 'Jus d’orange pressé'), p('prosecco', 75)],
    garniture: 'Zeste d’orange (facultatif)', tech: ['Verser le jus d’orange dans la flûte', 'Ajouter doucement le vin effervescent', 'Mélanger délicatement'], couleur: '#F4B23E', decor: ['zeste:orange'],
    variantes: [{ nom: 'Buck’s Fizz', texte: 'Autre nom du même cocktail, né au Buck’s Club de Londres en 1921.' }],
  },
  {
    id: 'pisco-sour', nom: 'Pisco Sour', cat: CC, desc: 'Acidulé, soyeux et parfumé', type: 'allday', methode: 'shaker', verre: 'Vin', glace: 'sans',
    histo: 'Créé à Lima dans les années 1920 par l’Américain Victor Morris ; le Pérou et le Chili s’en disputent la paternité.',
    ing: [p('pisco', 60), p('citron', 30), p('sirop-sucre', 20), p('blanc-oeuf', 20, 'Blanc d’un œuf')],
    garniture: 'Quelques traits d’amer sur la mousse', tech: ['Verser tous les ingrédients dans le shaker avec de la glace', 'Frapper', 'Passer dans un verre à pied rafraîchi'], couleur: '#F1EBC6', decor: ['mousse'],
  },
  {
    id: 'rabo-de-galo', nom: 'Rabo de Galo', cat: CC, desc: 'Amer, vineux et puissant', type: 'before', methode: 'direct', verre: 'Rocks', glace: 'cubes',
    histo: 'La « queue de coq » brésilienne, née dans les années 1950 à São Paulo : traduction littérale de « cocktail ».',
    ing: [p('cachaca', 60), p('vermouth-rouge', 20), p('cynar', 15), p('aromatic-bitters', 2, 'Aromatic bitters (facultatif)')],
    garniture: 'Zeste d’orange', tech: ['Verser tous les ingrédients dans un verre Rocks', 'Ajouter de la glace et mélanger brièvement'], couleur: '#8E3A22', decor: ['zeste:orange'],
  },
  {
    id: 'sea-breeze', nom: 'Sea Breeze', cat: CC, desc: 'Fruité, acidulé et désaltérant', type: 'allday', methode: 'direct', verre: 'Highball', glace: 'cubes',
    histo: 'Popularisé dans les années 1980 par les producteurs de cranberry américains.',
    ing: [p('vodka', 40), p('cranberry', 120, 'Jus de cranberry'), p('pamplemousse', 30)],
    garniture: 'Zeste d’orange et cerise', tech: ['Monter tous les ingrédients dans un verre Highball rempli de glace'], couleur: '#E05A6A', decor: ['zeste:orange', 'cerise'],
  },
  {
    id: 'singapore-sling', nom: 'Singapore Sling', cat: CC, desc: 'Fruité, épicé et exotique', type: 'allday', methode: 'shaker', verre: 'Hurricane', glace: 'cubes',
    histo: 'Créé vers 1915 par Ngiam Tong Boon au Long Bar du Raffles Hotel de Singapour.',
    ing: [p('gin', 30), p('cherry-brandy', 15, 'Liqueur de cerise'), p('triple-sec', 7.5, 'Cointreau'), p('benedictine', 7.5), p('ananas', 120), p('citron-vert', 15), p('sirop-grenadine', 10), p('aromatic-bitters', 1)],
    garniture: 'Ananas et cerise au marasquin', tech: ['Verser tous les ingrédients dans le shaker rempli de glace', 'Bien frapper', 'Passer dans un verre Hurricane'], couleur: '#EE7A78', decor: ['ananas', 'cerise', 'paille'],
  },
  {
    id: 'vesper', nom: 'Vesper', cat: CC, desc: 'Puissant, sec et zesté', type: 'before', methode: 'shaker', verre: 'Martini', glace: 'sans',
    histo: 'Imaginé par Ian Fleming pour James Bond dans Casino Royale, en 1953.',
    ing: [p('gin', 45), p('vodka', 15), p('lillet-blanc', 7.5)],
    garniture: 'Zeste de citron', tech: ['Verser tous les ingrédients dans le shaker rempli de glace', 'Frapper', 'Passer dans un verre à cocktail rafraîchi'], couleur: '#EEEDDC', decor: ['zeste:citron'],
  },
  {
    id: 'zombie', nom: 'Zombie', cat: CC, desc: 'Puissant, exotique et épicé', type: 'allday', methode: 'shaker', verre: 'Highball', glace: 'pilee',
    histo: 'Créé en 1934 par Donn Beach (Don the Beachcomber) à Hollywood ; il en limitait la consommation à deux par client.',
    ing: [p('rhum-jamaicain', 45, 'Rhum ambré de Jamaïque'), p('rhum-trad-vieux', 45, 'Rhum doré de Porto Rico'), p('black-rum', 30, 'Rhum Demerara'), p('citron-vert', 20), p('falernum', 15), x('Donn’s Mix', 15, 'ml'), p('sirop-grenadine', 5), p('aromatic-bitters', 1), p('absinthe', 0.3, 'Pastis (6 gouttes)')],
    garniture: 'Feuilles de menthe',
    tech: ['Verser tous les ingrédients dans un blender avec 170 g de glace concassée', 'Mixer quelques secondes par impulsions', 'Servir dans un grand verre'],
    couleur: '#C96A2A', decor: ['menthe', 'paille'],
    nb: ['Donn’s Mix : 2 volumes de jus de pamplemousse frais pour 1 volume de sirop de cannelle.'],
  },

  // ───────────── Nouvelle ère ─────────────
  {
    id: 'bees-knees', nom: 'Bee’s Knees', cat: NE, desc: 'Miellé, acidulé et frais', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Né pendant la Prohibition, quand le miel adoucissait des gins de mauvaise qualité ; l’expression signifie « le top ».',
    ing: [p('gin', 52.5, 'Dry gin'), p('sirop-miel', 10), p('citron', 22.5), p('orange', 22.5)],
    garniture: 'Zeste de citron ou d’orange (facultatif)',
    tech: ['Mélanger le miel avec les jus de citron et d’orange jusqu’à dissolution', 'Ajouter le gin et frapper avec de la glace', 'Passer dans un verre à cocktail rafraîchi'],
    couleur: '#F2D27A', decor: ['zeste:citron'],
  },
  {
    id: 'canchanchara', nom: 'Canchanchara', cat: NE, desc: 'Miellé, acidulé et rustique', type: 'allday', methode: 'direct', verre: 'Rocks', glace: 'pilee',
    histo: 'Boisson des combattants cubains de l’indépendance au XIXe siècle, servie à Trinidad (Cuba) dans des gobelets de terre cuite.',
    ing: [p('ron-cubain', 60, 'Aguardiente cubain'), p('citron-vert', 15), p('sirop-miel', 15, 'Miel brut'), p('eau', 50)],
    garniture: 'Quartier de citron vert',
    tech: ['Mélanger le miel, l’eau et le jus de citron vert, et en napper le fond et les parois du verre', 'Ajouter la glace concassée, puis le rhum', 'Mélanger énergiquement de bas en haut'],
    couleur: '#EAD9A0', decor: ['quartier:citron-vert'],
  },
  {
    id: 'chartreuse-swizzle', nom: 'Chartreuse Swizzle', cat: NE, desc: 'Herbacé, exotique et frais', type: 'allday', methode: 'direct', verre: 'Highball', glace: 'pilee',
    histo: 'Créé en 2002 par Marcovaldo Dionysos à San Francisco.',
    ing: [p('chartreuse-verte', 45), p('ananas', 30), p('citron-vert', 22.5), p('falernum', 15)],
    garniture: 'Feuilles de menthe et noix de muscade râpée',
    tech: ['Verser tous les ingrédients dans un verre haut et ajouter de la glace pilée', 'Mélanger vigoureusement au swizzle stick (ou à la cuillère de bar)', 'Compléter de glace pilée'],
    couleur: '#B9D46A', decor: ['menthe', 'paille'],
  },
  {
    id: 'dons-special-daiquiri', nom: 'Don’s Special Daiquiri', cat: NE, desc: 'Exotique, fruité et miellé', type: 'allday', methode: 'shaker', verre: 'Copa', glace: 'pilee',
    histo: 'Recette de Donn Beach, le fondateur de la culture Tiki, à Hollywood.',
    ing: [p('rhum-jamaicain', 30, 'Rhum doré de Jamaïque'), p('ron-cubain', 15, 'Ron cubain'), p('sirop-passion', 15), p('citron-vert', 15), p('sirop-miel', 15)],
    garniture: 'Demi-fruit de la passion',
    tech: ['Mixer quelques secondes au blender avec de la glace pilée', 'Verser dans un verre à pied', 'Compléter de glace pilée'],
    couleur: '#F2B84A', decor: ['passion'],
  },
  {
    id: 'fernandito', nom: 'Fernandito', cat: NE, desc: 'Amer, herbacé et désaltérant', type: 'allday', methode: 'direct', verre: 'Rocks', glace: 'cubes',
    histo: 'Le « Fernet con coca », boisson nationale de fait en Argentine, surtout à Córdoba.',
    ing: [p('fernet', 50, 'Fernet-Branca'), p('cola', null, 'Cola (pour compléter)')],
    garniture: '', tech: ['Verser le fernet dans un grand verre Rocks rempli de glace', 'Compléter de cola', 'Mélanger délicatement'], couleur: '#3A1E14',
  },
  {
    id: 'french-martini', nom: 'French Martini', cat: NE, desc: 'Fruité, soyeux et gourmand', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Né à New York à la fin des années 1980, avec la vague des « martinis » colorés.',
    ing: [p('vodka', 45), p('liqueur-framboise', 15), p('ananas', 15)],
    garniture: 'Huiles d’un zeste de citron exprimées', tech: SHAKER_COUPE, couleur: '#C2506E', decor: ['mousse'],
  },
  {
    id: 'grand-margarita', nom: 'Grand Margarita', cat: NE, desc: 'Puissant, zesté et acidulé', type: 'allday', methode: 'shaker', verre: 'Rocks', glace: 'cubes',
    histo: 'Version de la Margarita où le Grand Marnier remplace le triple sec.',
    ing: [p('tequila', 45, 'Tequila 100 % agave'), p('grand-marnier', 30), p('citron-vert', 15)],
    garniture: 'Rim de sel, tranche de citron vert',
    tech: ['Givrer le bord du verre Rocks au sel de mer', 'Verser les ingrédients dans le shaker', 'Mettre de la glace dans le verre et le shaker, frapper fort 10 secondes', 'Passer dans le verre'],
    couleur: '#EED48A', decor: ['sel', 'tranche:citron-vert'],
  },
  {
    id: 'iba-tiki', nom: 'IBA Tiki', cat: NE, desc: 'Exotique, fruité et épicé', type: 'allday', methode: 'shaker', verre: 'Tiki', glace: 'pilee',
    histo: 'Cocktail créé pour la liste de l’IBA, autour de deux rhums cubains vieillis.',
    ing: [p('ron-cubain', 30, 'Rhum cubain vieux'), p('rhum-trad-vieux', 30, 'Rhum cubain fumé'), p('amaretto', 15), p('liqueur-noisette', 5), p('maraschino', 0.3, 'Maraschino (5 gouttes)'), p('puree-passion', 30), p('ananas', 90), p('citron-vert', 30), x('Tranche de gingembre', 1, 'pièce')],
    garniture: 'Agrumes et tranche d’ananas séchée',
    tech: ['Piler une fine tranche de gingembre dans le shaker', 'Ajouter les autres ingrédients et frapper vigoureusement avec de la glace', 'Passer dans un mug Tiki rafraîchi rempli de glace pilée'],
    couleur: '#F2A23A', decor: ['ananas', 'paille'],
  },
  {
    id: 'illegal', nom: 'Illegal', cat: NE, desc: 'Fumé, épicé et acidulé', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Création new-yorkaise des années 2010, qui marie mezcal et rhum overproof dans l’esprit des alcools de contrebande.',
    ing: [p('mezcal', 30, 'Mezcal espadín'), p('rhum-overproof', 15, 'Rhum blanc overproof de Jamaïque'), p('falernum', 15), p('maraschino', 5), p('citron-vert', 22.5), p('sirop-sucre', 15), x('Blanc d’œuf (quelques gouttes, facultatif)', null, 'goutte')],
    garniture: '',
    tech: ['Verser tous les ingrédients dans le shaker', 'Frapper vigoureusement avec de la glace', 'Passer dans un verre à cocktail rafraîchi, ou sur glace dans un gobelet de terre cuite'],
    couleur: '#E7E3C6',
  },
  {
    id: 'jungle-bird', nom: 'Jungle Bird', cat: NE, desc: 'Amer, exotique et fruité', type: 'allday', methode: 'shaker', verre: 'Rocks', glace: 'cubes',
    histo: 'Servi à partir de 1978 à l’Aviary Bar du Kuala Lumpur Hilton, en Malaisie.',
    ing: [p('black-rum', 45, 'Rhum blackstrap'), p('bitter', 22.5, 'Bitter'), p('ananas', 45), p('citron-vert', 15), p('sirop-demerara', 15)],
    garniture: 'Quartier d’ananas', tech: SHAKER_ROCKS, couleur: '#B8402E', decor: ['ananas'],
  },
  {
    id: 'missionarys-downfall', nom: 'Missionary’s Downfall', cat: NE, desc: 'Frais, mentholé et fruité', type: 'allday', methode: 'shaker', verre: 'Copa', glace: 'pilee',
    histo: 'Création de Donn Beach, le fondateur de la culture Tiki, servie glacée au blender.',
    ing: [p('rhum-blanc', 30), p('liqueur-peche-brandy', 15), p('citron-vert', 15), p('sirop-miel', 30, 'Mélange de miel'), p('menthe', 10), p('morceaux-ananas', 4)],
    garniture: 'Brin de menthe et tranche d’ananas', tech: ['Mixer tous les ingrédients au blender avec un demi-verre de glace pilée', 'Servir dans un grand verre à pied'], couleur: '#C8DE8E', decor: ['menthe', 'ananas'],
  },
  {
    id: 'naked-and-famous', nom: 'Naked and Famous', cat: NE, desc: 'Fumé, amer et acidulé', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Créé en 2011 par Joaquín Simó au bar Death & Co à New York, sur le modèle du Last Word.',
    ing: [p('mezcal', 22.5), p('chartreuse-jaune', 22.5), p('aperitif-amer', 22.5, 'Aperol'), p('citron-vert', 22.5)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#F09A4A',
  },
  {
    id: 'new-york-sour', nom: 'New York Sour', cat: NE, desc: 'Puissant, acidulé et vineux', type: 'allday', methode: 'shaker', verre: 'Rocks', glace: 'cubes',
    histo: 'Whiskey Sour couronné de vin rouge, apparu dans les années 1880 à Chicago avant de prendre le nom de New York.',
    ing: [p('rye', 60, 'Rye whiskey ou bourbon'), p('sirop-sucre', 22.5), p('citron', 30), x('Blanc d’œuf (quelques gouttes)', null, 'goutte'), p('vin-rouge', 15, 'Vin rouge (shiraz ou malbec)')],
    garniture: 'Zeste de citron ou d’orange et cerise',
    tech: ['Verser tous les ingrédients sauf le vin dans le shaker', 'Frapper vigoureusement avec de la glace', 'Passer dans un verre Rocks rafraîchi rempli de glace', 'Faire flotter le vin rouge sur le dessus'],
    couleur: '#D9A04A', decor: ['float', 'zeste:citron', 'cerise'],
  },
  {
    id: 'old-cuban', nom: 'Old Cuban', cat: NE, desc: 'Pétillant, mentholé et élégant', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Créé en 2001 par Audrey Saunders à New York : un Mojito habillé de champagne.',
    ing: [p('menthe', 7), p('rhum-trad-vieux', 45, 'Rhum vieux'), p('citron-vert', 22.5), p('sirop-sucre', 30), p('aromatic-bitters', 2), p('champagne', 60, 'Champagne brut ou prosecco')],
    garniture: 'Brins de menthe',
    tech: ['Verser tous les ingrédients sauf le vin dans le shaker', 'Frapper avec de la glace', 'Passer dans un verre à cocktail élégant rafraîchi', 'Compléter de vin effervescent'],
    couleur: '#E6DA9A', decor: ['menthe'],
  },
  {
    id: 'paper-plane', nom: 'Paper Plane', cat: NE, desc: 'Amer, acidulé et équilibré', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Créé en 2007 par Sam Ross, l’auteur du Penicillin ; nommé d’après une chanson de M.I.A.',
    ing: [p('bourbon', 30), p('amaro', 30, 'Amaro Nonino'), p('aperitif-amer', 30, 'Aperol'), p('citron', 30)],
    garniture: '', tech: SHAKER_COUPE, couleur: '#EE8A3E',
  },
  {
    id: 'pisco-punch', nom: 'Pisco Punch', cat: NE, desc: 'Fruité, épicé et vineux', type: 'allday', methode: 'shaker', verre: 'Vin', glace: 'sans',
    histo: 'La gloire du Bank Exchange Saloon de San Francisco à la fin du XIXe siècle ; sa recette exacte fut longtemps tenue secrète.',
    ing: [p('pisco', 60), p('ananas', 22.5), p('sirop-sucre', 15), p('citron', 15), p('vin-blanc', 30), p('clou-girofle', 3)],
    garniture: '',
    tech: ['Écraser doucement les clous de girofle dans le sirop', 'Ajouter les autres ingrédients sauf le vin', 'Frapper vigoureusement et passer à la passoire fine dans un grand verre à pied', 'Ajouter le vin sur le dessus et mélanger délicatement'],
    couleur: '#F1E2A6',
  },
  {
    id: 'russian-spring-punch', nom: 'Russian Spring Punch', cat: NE, desc: 'Pétillant, fruité et acidulé', type: 'allday', methode: 'shaker', verre: 'Highball', glace: 'cubes',
    histo: 'Créé par Dick Bradsell à Londres dans les années 1980.',
    ing: [p('vodka', 25), p('citron', 25), p('creme-cassis', 15), p('sirop-sucre', 10), p('prosecco', null, 'Vin effervescent (pour compléter)')],
    garniture: 'Mûres et, éventuellement, tranche de citron',
    tech: ['Verser tous les ingrédients sauf le vin effervescent dans le shaker', 'Frapper avec de la glace', 'Passer dans un grand verre rempli de glace et compléter de vin effervescent'],
    couleur: '#B0405E', decor: ['mures', 'tranche:citron'],
  },
  {
    id: 'sherry-cobbler', nom: 'Sherry Cobbler', cat: NE, desc: 'Vineux, frais et léger', type: 'allday', methode: 'shaker', verre: 'Julep', glace: 'pilee',
    histo: 'La boisson à la mode des États-Unis vers 1840 ; elle a popularisé la paille et la glace pilée.',
    ing: [p('sherry-amontillado', 45), p('sherry-palo-cortado', 45), p('sucre-poudre', 1, 'Sucre extra-fin'), x('Quarts de rondelle d’orange', 2, 'pièce'), x('Quarts de rondelle de citron', 2, 'pièce')],
    garniture: 'Fruits rouges, quart de rondelle d’orange et de citron, paille',
    tech: ['Mettre le xérès, le sucre et les quarts d’agrumes dans le shaker avec de la glace', 'Frapper vivement', 'Passer dans une timbale à julep remplie de glace pilée'],
    couleur: '#D9A04A', decor: ['framboises', 'demiTranche:orange', 'paille'],
  },
  {
    id: 'south-side', nom: 'South Side', cat: NE, desc: 'Frais, mentholé et acidulé', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Associé aux bars clandestins de Chicago et au 21 Club de New York pendant la Prohibition.',
    ing: [p('gin', 60, 'London dry gin'), p('citron', 30), p('sirop-sucre', 15), p('menthe', 6), x('Blanc d’œuf (quelques gouttes, facultatif)', null, 'goutte')],
    garniture: 'Brins de menthe', tech: ['Verser tous les ingrédients dans le shaker', 'Bien frapper avec de la glace', 'Passer à la passoire fine dans un verre à cocktail rafraîchi'], couleur: '#D6E8B0', decor: ['menthe'],
    nb: ['Avec le blanc d’œuf, frapper plus vigoureusement.'],
  },
  {
    id: 'spicy-fifty', nom: 'Spicy Fifty', cat: NE, desc: 'Piquant, floral et vanillé', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Créé à Londres dans les années 2000 par Salvatore Calabrese, au bar Fifty.',
    ing: [p('vodka-vanille', 50), p('cordial-sureau', 15), p('citron-vert', 15), p('sirop-miel', 10), p('piment', 2)],
    garniture: 'Piment rouge', tech: ['Verser tous les ingrédients dans le shaker', 'Bien frapper avec de la glace', 'Passer à la passoire fine dans un verre à cocktail rafraîchi'], couleur: '#F2DCA6', decor: ['piment'],
  },
  {
    id: 'suffering-bastard', nom: 'Suffering Bastard', cat: NE, desc: 'Épicé, puissant et désaltérant', type: 'allday', methode: 'shaker', verre: 'Highball', glace: 'cubes',
    histo: 'Créé en 1942 par Joe Scialom au Shepheard’s Hotel du Caire, comme remède du lendemain pour les officiers britanniques.',
    ing: [p('cognac', 30, 'Cognac ou brandy'), p('gin', 30), p('citron-vert', 15), p('aromatic-bitters', 2), p('ginger-beer', null, 'Ginger beer (pour compléter)')],
    garniture: 'Brin de menthe, éventuellement tranche d’orange',
    tech: ['Verser tous les ingrédients sauf la ginger beer dans le shaker et frapper avec de la glace', 'Verser sans filtrer dans un verre Collins', 'Compléter de ginger beer'],
    couleur: '#D9AE5A', decor: ['menthe', 'tranche:orange'],
  },
  {
    id: 'three-dots-and-a-dash', nom: 'Three Dots and a Dash', cat: NE, desc: 'Exotique, épicé et fruité', type: 'allday', methode: 'shaker', verre: 'Copa', glace: 'pilee',
    histo: 'Création de Donn Beach pendant la Seconde Guerre mondiale : son nom est le V de la victoire en morse.',
    ing: [p('rhum-agricole-vieux', 45, 'Rhum agricole de Martinique'), p('rhum-trad-vieux', 15, 'Rhum vieux d’assemblage'), p('falernum', 7.5), p('allspice-dram', 7.5), p('citron-vert', 15), p('orange', 15), p('sirop-miel', 15), p('aromatic-bitters', 2)],
    garniture: 'Trois cerises et un morceau d’ananas',
    tech: ['Mixer brièvement au blender avec environ 340 g de glace pilée', 'Verser dans un verre à pied', 'Compléter de glace pilée'],
    couleur: '#E89A3A', decor: ['ananas', 'cerise'],
  },
  {
    id: 'tipperary', nom: 'Tipperary', cat: NE, desc: 'Herbacé, vineux et puissant', type: 'before', methode: 'verre-melange', verre: 'Martini', glace: 'sans',
    histo: 'Publié en 1916 par Hugo Ensslin à New York, et nommé d’après le comté irlandais.',
    ing: [p('irish-whiskey', 50, 'Irish whiskey'), p('vermouth-rouge', 25), p('chartreuse-verte', 15), p('aromatic-bitters', 2)],
    garniture: 'Tranche d’orange', tech: ['Verser tous les ingrédients dans le verre à mélange rempli de glace', 'Bien mélanger', 'Passer dans un verre Martini rafraîchi'], couleur: '#A0602A', decor: ['demiTranche:orange'],
  },
  {
    id: 'tommys-margarita', nom: 'Tommy’s Margarita', cat: NE, desc: 'Acidulé, végétal et frais', type: 'allday', methode: 'shaker', verre: 'Rocks', glace: 'cubes',
    histo: 'Créé dans les années 1990 par Julio Bermejo au restaurant Tommy’s de San Francisco ; le socle le cite en variante.',
    ing: [p('tequila', 60, 'Tequila 100 % agave'), p('citron-vert', 30), p('sirop-agave', 30, 'Nectar d’agave')],
    garniture: 'Tranche de citron vert', tech: SHAKER_ROCKS, couleur: '#E4E7A8', decor: ['tranche:citron-vert'],
  },
  {
    id: 'trinidad-sour', nom: 'Trinidad Sour', cat: NE, desc: 'Épicé, amandé et intense', type: 'allday', methode: 'shaker', verre: 'Coupe', glace: 'sans',
    histo: 'Créé en 2009 par Giuseppe González à New York : l’aromatic bitters, d’ordinaire dosé au trait, devient l’ingrédient principal.',
    ing: [p('aromatic-bitters', null, 'Aromatic bitters (45 ml)'), p('sirop-orgeat', 30), p('citron', 22.5), p('rye', 15, 'Rye whiskey')],
    garniture: '', tech: SHAKER_COUPE, couleur: '#7A1F22',
    nb: ['45 ml d’aromatic bitters : l’application ne compte pas cet ingrédient, dosé au trait, dans la contenance ni le TAV.'],
  },
  {
    id: 've-n-to', nom: 'Ve.N.To', cat: NE, desc: 'Floral, miellé et acidulé', type: 'allday', methode: 'shaker', verre: 'Rocks', glace: 'cubes',
    histo: 'Création italienne autour de la grappa ; son nom rappelle la Vénétie.',
    ing: [p('grappa', 45, 'Grappa blanche'), p('citron', 22.5), p('sirop-miel', 15, 'Mélange de miel (eau de camomille possible)'), p('cordial-camomille', 15), x('Blanc d’œuf (quelques gouttes, facultatif)', null, 'goutte')],
    garniture: 'Zeste de citron et raisins blancs',
    tech: ['Verser tous les ingrédients dans le shaker', 'Frapper vigoureusement avec de la glace', 'Passer dans un petit verre Rocks rafraîchi rempli de glace'],
    couleur: '#EFE6B0', decor: ['zeste:citron'],
  },
];

export const COCKTAILS_HS: Fiche[] = DEFS.map((d) => ({
  id: d.id,
  source: 'iba',
  nom: d.nom,
  descripteurs: d.desc,
  historique: d.histo,
  type: d.type,
  methode: d.methode,
  verre: d.verre,
  glace: d.glace,
  ingredients: d.ing,
  garniture: d.garniture,
  technique: d.tech,
  variantes: d.variantes ?? [],
  nb: d.nb ?? [],
  notes: '',
  ratio: 20,
  categorieIBA: d.cat,
  couleur: d.couleur,
  decor: d.decor ?? [],
}));
