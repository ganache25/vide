import type { Fiche } from '../data/types';

export type Base = 'gin' | 'vodka' | 'rhum' | 'agave' | 'whisky' | 'cognac' | 'vin' | 'amer';

export const BASES: { v: Base; l: string }[] = [
  { v: 'gin', l: 'Gin' },
  { v: 'vodka', l: 'Vodka' },
  { v: 'rhum', l: 'Rhum et cachaça' },
  { v: 'agave', l: 'Tequila' },
  { v: 'whisky', l: 'Whisky' },
  { v: 'cognac', l: 'Cognac' },
  { v: 'vin', l: 'Vins et bulles' },
  { v: 'amer', l: 'Bitters' },
];

const PAR_PRODUIT: Record<string, Base> = {
  gin: 'gin',
  vodka: 'vodka',
  'vodka-vanille': 'vodka',
  tequila: 'agave',
  cachaca: 'rhum',
  'ron-cubain': 'rhum',
  'rhum-blanc': 'rhum',
  'rhum-agricole-blanc': 'rhum',
  'rhum-agricole-vieux': 'rhum',
  'rhum-trad-vieux': 'rhum',
  'rhum-jamaicain': 'rhum',
  'black-rum': 'rhum',
  cognac: 'cognac',
  bourbon: 'whisky',
  rye: 'whisky',
  'blend-whisky': 'whisky',
  'whisky-tourbe': 'whisky',
  bitter: 'amer',
  'aperitif-amer': 'amer',
  'vermouth-dry': 'vin',
  'vermouth-rouge': 'vin',
  'vermouth-blanc': 'vin',
  'sherry-fino': 'vin',
  champagne: 'vin',
  prosecco: 'vin',
};

export const basesDe = (f: Fiche): Base[] => [
  ...new Set(f.ingredients.map((i) => (i.pid ? PAR_PRODUIT[i.pid] : undefined)).filter((b): b is Base => !!b)),
];
