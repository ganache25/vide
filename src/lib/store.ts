import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import { PRODUITS, PRODUIT_PAR_ID, type Produit } from '../data/produits';
import type { Fiche, Ingredient } from '../data/types';

/** Petit magasin persistant : une valeur JSON par clé, relue au démarrage. */
function creerMagasin<T>(cle: string, initial: T, valide: (v: unknown) => boolean) {
  let valeur = initial;
  let charge = false;
  const abonnes = new Set<() => void>();
  const notifier = () => abonnes.forEach((f) => f());
  const sAbonner = (f: () => void) => {
    abonnes.add(f);
    return () => abonnes.delete(f);
  };

  void (async () => {
    try {
      const brut = await AsyncStorage.getItem(cle);
      const lu = brut ? JSON.parse(brut) : null;
      if (lu != null && valide(lu)) valeur = lu as T;
    } catch {
      // Stockage illisible : on garde la valeur initiale plutôt que de bloquer l'application.
    }
    charge = true;
    notifier();
  })();

  return {
    lire: () => valeur,
    async ecrire(suivant: T) {
      valeur = suivant;
      notifier();
      await AsyncStorage.setItem(cle, JSON.stringify(suivant));
    },
    use(): { valeur: T; charge: boolean } {
      const v = useSyncExternalStore(sAbonner, () => valeur, () => valeur);
      const c = useSyncExternalStore(sAbonner, () => charge, () => charge);
      return { valeur: v, charge: c };
    },
  };
}

// ───────────── Fiches personnelles ─────────────

const magasinFiches = creerMagasin<Fiche[]>('fiches.v1', [], Array.isArray);

export function enregistrerFiche(f: Fiche) {
  const fiches = magasinFiches.lire();
  const maj = { ...f, updatedAt: Date.now() };
  const existe = fiches.some((x) => x.id === f.id);
  return magasinFiches.ecrire(existe ? fiches.map((x) => (x.id === f.id ? maj : x)) : [maj, ...fiches]);
}

export const supprimerFiche = (id: string) => magasinFiches.ecrire(magasinFiches.lire().filter((x) => x.id !== id));

export const nouvelId = () => `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export function useFiches(): { fiches: Fiche[]; charge: boolean } {
  const { valeur, charge } = magasinFiches.use();
  return { fiches: valeur, charge };
}

// ───────────── Favoris du socle ─────────────

const magasinFavoris = creerMagasin<string[]>('favoris.v1', [], Array.isArray);

export const useFavoris = () => magasinFavoris.use().valeur;

export function basculerFavori(id: string) {
  const f = magasinFavoris.lire();
  return magasinFavoris.ecrire(f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
}

// ───────────── Mercuriale personnelle ─────────────

export type Mercuriale = {
  /** Prix et TAV saisis par l'utilisateur pour les produits du catalogue. */
  surcharges: Record<string, { prix?: number; tav?: number }>;
  /** Produits ajoutés par l'utilisateur. */
  perso: Produit[];
};

const magasinMercuriale = creerMagasin<Mercuriale>(
  'mercuriale.v1',
  { surcharges: {}, perso: [] },
  (v) => typeof v === 'object' && v !== null && 'surcharges' in v && 'perso' in v,
);

const fusionner = (m: Mercuriale): Produit[] => [
  ...PRODUITS.map((p) => ({ ...p, ...m.surcharges[p.id] })),
  ...m.perso,
];

export function useMercuriale(): { mercuriale: Mercuriale; catalogue: Produit[]; charge: boolean } {
  const { valeur, charge } = magasinMercuriale.use();
  return { mercuriale: valeur, catalogue: fusionner(valeur), charge };
}

export function surchargerProduit(id: string, patch: { prix?: number; tav?: number } | null) {
  const m = magasinMercuriale.lire();
  const surcharges = { ...m.surcharges };
  if (patch === null) delete surcharges[id];
  else surcharges[id] = { ...surcharges[id], ...patch };
  return magasinMercuriale.ecrire({ ...m, surcharges });
}

export function ajouterProduit(p: Produit) {
  const m = magasinMercuriale.lire();
  return magasinMercuriale.ecrire({ ...m, perso: [...m.perso, p] });
}

export function majProduitPerso(id: string, patch: Partial<Produit>) {
  const m = magasinMercuriale.lire();
  return magasinMercuriale.ecrire({ ...m, perso: m.perso.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
}

export function supprimerProduit(id: string) {
  const m = magasinMercuriale.lire();
  return magasinMercuriale.ecrire({ ...m, perso: m.perso.filter((p) => p.id !== id) });
}

/** Applique les prix et TAV de la mercuriale personnelle aux ingrédients issus du catalogue. */
export function appliquerMercuriale(ingredients: Ingredient[]): Ingredient[] {
  const { surcharges } = magasinMercuriale.lire();
  return ingredients.map((i) => {
    const s = i.pid ? surcharges[i.pid] : undefined;
    if (!s || !i.pid || !PRODUIT_PAR_ID[i.pid]) return { ...i };
    return { ...i, prix: s.prix ?? i.prix, tav: s.tav ?? i.tav };
  });
}

// ───────────── Niveau de détail de la culture produits ─────────────

export type NiveauDetail = 'essentiel' | 'standard' | 'complet';

export const NIVEAUX: { v: NiveauDetail; l: string }[] = [
  { v: 'essentiel', l: 'Essentiel' },
  { v: 'standard', l: 'Standard' },
  { v: 'complet', l: 'Complet' },
];

const magasinNiveau = creerMagasin<NiveauDetail>('niveauDetail.v1', 'standard', (v) =>
  ['essentiel', 'standard', 'complet'].includes(v as string),
);

export const useNiveauDetail = () => magasinNiveau.use().valeur;
export const choisirNiveauDetail = (n: NiveauDetail) => magasinNiveau.ecrire(n);
