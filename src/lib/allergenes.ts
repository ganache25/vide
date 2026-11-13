import type { Fiche } from '../data/types';
import { normaliser } from './texte';

// Repérage indicatif des allergènes à déclaration obligatoire (règlement UE 1169/2011) à partir
// des noms d'ingrédients. Ce n'est qu'une aide : seule l'étiquette du produit utilisé fait foi.
const REGLES: [string, RegExp][] = [
  ['Œuf', /\b(oeuf|blanc d oeuf|jaune d oeuf|advocaat)\b/],
  ['Lait', /\b(lait(?! de coco| d amande| d avoine)|creme liquide|creme fraiche|creme fleurette|liqueur a la creme|yaourt|beurre)\b/],
  ['Fruits à coque', /\b(orgeat|amande|amaretto|noisette|noix(?! de coco)|pistache|falernum|praline)\b/],
  ['Céleri', /\bceleri\b/],
  ['Poisson', /\b(sauce anglaise|worcestershire|anchois)\b/],
  ['Sulfites', /\b(vin|champagne|prosecco|vermouth|sherry|xeres|porto|madere|cidre|cremant)\b/],
  ['Gluten', /\b(biere|stout)\b/],
  ['Soja', /\bsoja\b/],
  ['Sésame', /\bsesame\b/],
  ['Arachide', /\b(arachide|cacahuete)\b/],
  ['Moutarde', /\bmoutarde\b/],
];

export function allergenes(f: Fiche): string[] {
  const texte = normaliser([...f.ingredients.map((i) => i.nom), f.garniture].join(' | ')).replace(/œ/g, 'oe');
  return REGLES.filter(([, re]) => re.test(texte)).map(([nom]) => nom);
}
