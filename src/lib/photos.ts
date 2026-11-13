// Photos ajoutées par l'utilisateur à une fiche. Chaque photo est réduite puis enregistrée sur
// l'appareil sous sa propre clé, pour rester sous les limites du stockage local.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useSyncExternalStore } from 'react';

const cle = (id: string) => `photo:${id}`;
const cache = new Map<string, string | null>();
const abonnes = new Set<() => void>();
const notifier = () => abonnes.forEach((f) => f());
const sAbonner = (f: () => void) => {
  abonnes.add(f);
  return () => abonnes.delete(f);
};

async function charger(id: string) {
  if (cache.has(id)) return;
  cache.set(id, null);
  try {
    const v = await AsyncStorage.getItem(cle(id));
    if (v) {
      cache.set(id, v);
      notifier();
    }
  } catch {
    // Photo illisible : la fiche s'affiche simplement sans elle.
  }
}

export function usePhoto(id: string): string | null {
  useEffect(() => void charger(id), [id]);
  return useSyncExternalStore(sAbonner, () => cache.get(id) ?? null, () => null);
}

export const photoDe = (id: string) => cache.get(id) ?? null;

/** Ouvre la photothèque, réduit l'image choisie et l'attache à la fiche. Renvoie un message en cas d'échec. */
export async function choisirPhoto(id: string): Promise<string | null> {
  try {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
    if (res.canceled || !res.assets?.[0]) return null;
    const image = await manipulateAsync(res.assets[0].uri, [{ resize: { width: 900 } }], {
      compress: 0.6,
      format: SaveFormat.JPEG,
      base64: true,
    });
    if (!image.base64) return 'L’image n’a pas pu être préparée.';
    const uri = `data:image/jpeg;base64,${image.base64}`;
    await AsyncStorage.setItem(cle(id), uri);
    cache.set(id, uri);
    notifier();
    return null;
  } catch {
    return 'La photo n’a pas pu être enregistrée (accès refusé ou stockage plein).';
  }
}

export async function supprimerPhoto(id: string) {
  cache.set(id, null);
  notifier();
  await AsyncStorage.removeItem(cle(id)).catch(() => {});
}
