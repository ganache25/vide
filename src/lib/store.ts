import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import type { Fiche } from '../data/types';

const CLE = 'fiches.v1';

let fiches: Fiche[] = [];
let charge = false;
const abonnes = new Set<() => void>();

const notifier = () => abonnes.forEach((f) => f());

async function charger() {
  try {
    const brut = await AsyncStorage.getItem(CLE);
    const lu = brut ? JSON.parse(brut) : [];
    if (Array.isArray(lu)) fiches = lu;
  } catch {
    // Stockage illisible : on repart d'une liste vide plutôt que de bloquer l'application.
  }
  charge = true;
  notifier();
}
void charger();

async function ecrire(suivant: Fiche[]) {
  fiches = suivant;
  notifier();
  await AsyncStorage.setItem(CLE, JSON.stringify(suivant));
}

export function enregistrerFiche(f: Fiche) {
  const maj = { ...f, updatedAt: Date.now() };
  const existe = fiches.some((x) => x.id === f.id);
  return ecrire(existe ? fiches.map((x) => (x.id === f.id ? maj : x)) : [maj, ...fiches]);
}

export function supprimerFiche(id: string) {
  return ecrire(fiches.filter((x) => x.id !== id));
}

export const nouvelId = () => `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const sAbonner = (f: () => void) => {
  abonnes.add(f);
  return () => abonnes.delete(f);
};

export function useFiches(): { fiches: Fiche[]; charge: boolean } {
  const liste = useSyncExternalStore(sAbonner, () => fiches, () => fiches);
  const pret = useSyncExternalStore(sAbonner, () => charge, () => charge);
  return { fiches: liste, charge: pret };
}
