// Direction artistique : blancs chauds et bordeaux. Surfaces blanches sans bordure, ombres
// douces teintées de bordeaux, grands rayons, titres en serif d'affichage.

export const C = {
  bg: '#FBF8F6',
  card: '#FFFFFF',
  cardAlt: '#F8F1F1',
  border: '#EEE3E1',
  text: '#26161B',
  muted: '#8C777D',
  accent: '#7A1F3D',
  accentDeep: '#56122A',
  /** Fond teinté pour pastilles et étiquettes. */
  accentDark: '#F6E7EB',
  onAccent: '#FFFFFF',
  danger: '#B3261E',
  green: '#2E7D5B',
  greenSoft: '#E6F3EC',
  dangerSoft: '#FBE9E7',
  /** Touche de champagne, réservée aux détails précieux. */
  or: '#C2A06A',
};

/** Dégradés bordeaux : du plus lumineux au plus profond. */
export const DEGRADE = ['#9A2B50', '#7A1F3D', '#4E0F25'] as const;
export const DEGRADE_SCENE = ['#8B2648', '#5A1430', '#2E0915'] as const;

export const S = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

export const R = { sm: 12, md: 18, lg: 24, pill: 999 };

export const F = { display: 'DMSerifDisplay_400Regular' };

export const OMBRE = '0 8px 28px rgba(86, 18, 42, 0.07)';
export const OMBRE_FORTE = '0 12px 32px rgba(86, 18, 42, 0.16)';

/** Marge basse à réserver sous le contenu des onglets, la barre d'onglets étant flottante. */
export const HAUTEUR_ONGLETS = 96;
