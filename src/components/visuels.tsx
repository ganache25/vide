// Schémas construits en vues natives : frise chronologique, flux d'étapes, barre de proportions.

import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import type { Ingredient } from '../data/types';
import { C, R, S } from '../theme';
import { Apparition } from './ui';

export function Frise({ dates }: { dates: [string, string][] }) {
  return (
    <View>
      {dates.map(([an, texte], k) => (
        <Apparition key={an + texte} delai={Math.min(k, 8) * 70} style={s.friseLigne}>
          <View style={s.friseRail}>
            <View style={s.frisePoint} />
            {k < dates.length - 1 ? <View style={s.friseTrait} /> : null}
          </View>
          <View style={s.friseCorps}>
            <Text style={s.friseAn}>{an}</Text>
            <Text style={s.friseTexte}>{texte}</Text>
          </View>
        </Apparition>
      ))}
    </View>
  );
}

/** Étapes d'élaboration reliées par des flèches. */
export function Flux({ etapes }: { etapes: string[] }) {
  return (
    <View style={s.flux}>
      {etapes.map((e, k) => (
        <Apparition key={e} delai={k * 90} style={s.fluxItem}>
          <View style={s.fluxBoite}>
            <Text style={s.fluxNum}>{k + 1}</Text>
            <Text style={s.fluxTxt}>{e}</Text>
          </View>
          {k < etapes.length - 1 ? <Ionicons name="arrow-forward" size={14} color={C.accent} /> : null}
        </Apparition>
      ))}
    </View>
  );
}

const TEINTES = ['#7A1F3D', '#B5536C', '#D9A441', '#6F8F72', '#C97B4A', '#8C6FA8', '#4F7C8A', '#B8ADA8'];

/** Barre empilée animée : part de chaque ingrédient dans la contenance du cocktail. */
export function Proportions({ ingredients }: { ingredients: Ingredient[] }) {
  const liquides = ingredients.filter((i) => i.unite === 'ml' && (i.qte ?? 0) > 0);
  const total = liquides.reduce((t, i) => t + (i.qte ?? 0), 0);
  const largeur = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    largeur.setValue(0);
    Animated.timing(largeur, {
      toValue: 1,
      duration: 900,
      delay: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [largeur, total]);
  if (!total) return null;
  return (
    <View style={{ gap: S.sm + 2 }}>
      <View style={s.barre}>
        <Animated.View
          style={[s.barreContenu, { width: largeur.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]}>
          {liquides.map((i, k) => (
            <View key={k} style={{ flex: i.qte ?? 0, backgroundColor: TEINTES[k % TEINTES.length] }} />
          ))}
        </Animated.View>
      </View>
      <View style={s.legende}>
        {liquides.map((i, k) => (
          <View key={k} style={s.legendeItem}>
            <View style={[s.pastille, { backgroundColor: TEINTES[k % TEINTES.length] }]} />
            <Text style={s.legendeTxt}>
              {i.nom} · {Math.round(((i.qte ?? 0) / total) * 100)} %
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  friseLigne: { flexDirection: 'row', gap: S.md },
  friseRail: { width: 14, alignItems: 'center' },
  frisePoint: { width: 14, height: 14, borderRadius: 7, backgroundColor: C.accent, borderWidth: 3, borderColor: C.accentDark, marginTop: 3 },
  friseTrait: { flex: 1, width: 2, backgroundColor: C.accentDark },
  friseCorps: { flex: 1, paddingBottom: S.lg, gap: 2 },
  friseAn: { color: C.accent, fontSize: 15, fontWeight: '800' },
  friseTexte: { color: C.text, fontSize: 15, lineHeight: 21 },
  flux: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, rowGap: S.sm },
  fluxItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  fluxBoite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.accentDark,
    borderRadius: R.sm,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  fluxNum: { color: C.onAccent, backgroundColor: C.accent, width: 18, height: 18, borderRadius: 9, textAlign: 'center', fontSize: 11, fontWeight: '700', lineHeight: 18, overflow: 'hidden' },
  fluxTxt: { color: C.accentDeep, fontSize: 13, fontWeight: '600' },
  barre: { height: 18, borderRadius: 9, backgroundColor: C.cardAlt, overflow: 'hidden' },
  barreContenu: { height: 18, flexDirection: 'row' },
  legende: { flexDirection: 'row', flexWrap: 'wrap', columnGap: S.md, rowGap: 6 },
  legendeItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pastille: { width: 10, height: 10, borderRadius: 5 },
  legendeTxt: { color: C.muted, fontSize: 12 },
});
