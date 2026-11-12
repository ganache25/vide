// Catalogue d'ingrédients. Les TAV et les prix au cl marqués « mercuriale » proviennent de
// l'annexe « Mercuriale bar » du Socle des cocktails de référence (12-2024). Ce sont des
// valeurs indicatives : chaque prix et chaque TAV reste modifiable dans une fiche.

export type Unite = 'ml' | 'trait' | 'goutte' | 'bar spoon' | 'feuille' | 'pièce' | 'pincée';

export const UNITES: Unite[] = ['ml', 'trait', 'goutte', 'bar spoon', 'feuille', 'pièce', 'pincée'];

export type Produit = {
  id: string;
  nom: string;
  famille: string;
  tav: number;
  /** Prix HT par unité par défaut (€ par ml pour les liquides). */
  prix: number;
  unite: Unite;
  /** Quantité proposée par défaut à l'ajout. */
  dose: number;
};

const ml = (id: string, nom: string, famille: string, tav: number, prixCl: number, dose = 20): Produit => ({
  id,
  nom,
  famille,
  tav,
  prix: prixCl / 10,
  unite: 'ml',
  dose,
});
const autre = (id: string, nom: string, famille: string, unite: Unite, prix = 0, dose = 1, tav = 0): Produit => ({
  id,
  nom,
  famille,
  tav,
  prix,
  unite,
  dose,
});

const EDV = 'Eaux-de-vie';
const LIQ = 'Liqueurs et crèmes';
const ABA = 'Bitters et amers';
const ABV = 'Vermouths et vins';
const JUS = 'Jus et purées';
const SIR = 'Sirops et sucres';
const SODA = 'Sodas et eaux';
const DIV = 'Frais et divers';

export const PRODUITS: Produit[] = [
  ml('gin', 'Gin', EDV, 37.5, 0.21, 40),
  ml('vodka', 'Vodka', EDV, 37.5, 0.17, 40),
  ml('vodka-vanille', 'Vodka vanille', EDV, 38, 0.26, 30),
  ml('tequila', 'Tequila', EDV, 37.5, 0.21, 40),
  ml('cachaca', 'Cachaça', EDV, 40, 0.17, 40),
  ml('pisco', 'Pisco', EDV, 40, 0.2, 40),
  ml('ron-cubain', 'Ron cubain 3 años', EDV, 37.5, 0.26, 40),
  ml('rhum-blanc', 'Rhum blanc', EDV, 37.5, 0.26, 40),
  ml('rhum-agricole-blanc', 'Rhum agricole blanc', EDV, 40, 0.17, 40),
  ml('rhum-agricole-vieux', 'Rhum agricole vieux', EDV, 40, 0.29, 25),
  ml('rhum-trad-vieux', 'Rhum traditionnel vieux (ambré)', EDV, 37.5, 0.36, 50),
  ml('rhum-jamaicain', 'Rhum vieux jamaïcain', EDV, 37.5, 0.36, 25),
  ml('black-rum', 'Black rum', EDV, 37.5, 0.31, 40),
  ml('cognac', 'Cognac VSOP', EDV, 40, 0.43, 40),
  ml('armagnac', 'Armagnac VSOP', EDV, 40, 0.43, 40),
  ml('calvados', 'Calvados VSOP', EDV, 40, 0.43, 40),
  ml('bourbon', 'Bourbon', EDV, 40, 0.29, 50),
  ml('rye', 'Rye whiskey', EDV, 37.5, 0.43, 50),
  ml('blend-whisky', 'Blend whisky (scotch)', EDV, 40, 0.29, 40),
  ml('whisky-tourbe', 'Scotch whisky tourbé', EDV, 40, 0.57, 10),

  ml('triple-sec', 'Triple sec', LIQ, 40, 0.26, 20),
  ml('curacao-orange', 'Curaçao orange', LIQ, 40, 0.26, 15),
  ml('maraschino', 'Maraschino', LIQ, 32, 0.2, 15),
  ml('creme-violette', 'Crème de violette', LIQ, 16, 0.2, 5),
  ml('creme-mure', 'Crème de mûre', LIQ, 15, 0.2, 10),
  ml('liqueur-cafe', 'Liqueur de café', LIQ, 20, 0.2, 10),
  ml('liqueur-passion', 'Liqueur de fruit de la passion', LIQ, 17, 0.2, 20),
  ml('liqueur-peche', 'Liqueur de pêche', LIQ, 15, 0.2, 10),
  ml('liqueur-fruits', 'Liqueur de fruits (autre)', LIQ, 15, 0.2, 15),
  ml('liqueur-plantes', 'Liqueur de plantes (autre)', LIQ, 18, 0.2, 15),
  ml('gentiane', 'Liqueur de gentiane', LIQ, 16, 0.2, 30),
  ml('chartreuse-verte', 'Chartreuse verte', LIQ, 55, 0.56, 15),
  ml('falernum', 'Velvet falernum', LIQ, 15, 0.29, 20),

  autre('aromatic-bitters', 'Aromatic bitters', ABA, 'trait', 0.17, 2),
  autre('orange-bitters', 'Bitters orange', ABA, 'trait', 0.17, 2),
  ml('bitter', 'Bitter (type Campari)', ABA, 25, 0.22, 30),
  ml('aperitif-amer', 'Apéritif amer léger (type Aperol)', ABA, 15, 0.16, 50),

  ml('vermouth-dry', 'Vermouth dry', ABV, 18, 0.16, 15),
  ml('vermouth-rouge', 'Vermouth rouge', ABV, 15, 0.09, 20),
  ml('vermouth-blanc', 'Vermouth blanc', ABV, 15, 0.09, 30),
  ml('sherry-fino', 'Sherry fino', ABV, 15, 0.3, 35),
  ml('champagne', 'Champagne', ABV, 12.5, 0.24, 80),
  ml('prosecco', 'Prosecco / vin effervescent', ABV, 11.5, 0.14, 60),

  ml('citron', 'Jus de citron', JUS, 0, 0.05, 20),
  ml('citron-vert', 'Jus de citron vert', JUS, 0, 0.08, 20),
  ml('orange', "Jus d'orange", JUS, 0, 0.03, 40),
  ml('ananas', "Jus d'ananas", JUS, 0, 0.03, 40),
  ml('pamplemousse', 'Jus de pamplemousse', JUS, 0, 0.03, 40),
  ml('tomate', 'Jus de tomate', JUS, 0, 0.03, 70),
  ml('cranberry', 'Nectar de cranberry', JUS, 0, 0.03, 40),
  ml('pomme', 'Jus de pomme trouble', JUS, 0, 0.03, 60),
  ml('gingembre', 'Jus de gingembre frais', JUS, 0, 0.03, 10),
  ml('puree-peche', 'Purée / nectar de pêche blanche', JUS, 0, 0.14, 40),
  ml('puree-passion', 'Purée de fruit de la passion', JUS, 0, 0.14, 30),
  ml('puree-fruits', 'Purée de fruits (autre)', JUS, 0, 0.14, 30),

  ml('sirop-sucre', 'Sirop de sucre', SIR, 0, 0.03, 10),
  ml('sirop-grenadine', 'Sirop de grenadine', SIR, 0, 0.04, 5),
  ml('sirop-orgeat', "Sirop d'orgeat", SIR, 0, 0.04, 15),
  ml('sirop-fruits', 'Sirop de fruits (autre)', SIR, 0, 0.04, 10),
  ml('sirop-vanille', 'Sirop de vanille', SIR, 0, 0.11, 10),
  ml('sirop-miel', 'Sirop de miel', SIR, 0, 0.11, 10),
  ml('sirop-agave', "Sirop d'agave", SIR, 0, 0.11, 10),
  autre('sucre-poudre', 'Sucre poudre', SIR, 'bar spoon'),
  autre('sucre-morceau', 'Morceau de sucre', SIR, 'pièce'),

  ml('eau-gazeuse', 'Eau gazeuse', SODA, 0, 0.01, 50),
  ml('ginger-ale', 'Ginger ale', SODA, 0, 0.07, 100),
  ml('ginger-beer', 'Ginger beer', SODA, 0, 0.08, 100),

  ml('blanc-oeuf', "Blanc d'œuf ou aquafaba", DIV, 0, 0.04, 20),
  ml('creme-coco', 'Crème de noix de coco', DIV, 0, 0.09, 20),
  ml('espresso', 'Café espresso', DIV, 0, 0.05, 25),
  autre('demi-citron-vert', 'Demi-citron vert en morceaux', DIV, 'pièce', 0.27),
  autre('menthe', 'Feuilles de menthe', DIV, 'feuille', 0, 10),
  autre('basilic', 'Feuilles de basilic', DIV, 'feuille', 0, 10),
  autre('tabasco', 'Tabasco', DIV, 'goutte', 0, 2),
  autre('sauce-anglaise', 'Sauce anglaise (Worcestershire)', DIV, 'trait'),
  autre('sel-celeri', 'Sel au céleri', DIV, 'pincée'),
];

export const PRODUIT_PAR_ID: Record<string, Produit> = Object.fromEntries(PRODUITS.map((p) => [p.id, p]));

export const FAMILLES_PRODUITS = [EDV, LIQ, ABA, ABV, JUS, SIR, SODA, DIV];
