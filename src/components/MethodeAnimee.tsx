// Tutoriel animé d'une méthode de réalisation : une courte séquence en boucle (outil en mouvement,
// versement, verre qui se remplit) avec la légende de l'étape en cours.

import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Fiche, Methode } from '../data/types';
import { C, R, S } from '../theme';
import { Bouteille, Outil, Verre } from './Illustrations';

const DUREE = 7500;

const LEGENDES: Record<Methode, [string, string, string]> = {
  shaker: ['Glace et ingrédients dans le shaker', 'Frapper 7 à 10 secondes', 'Passer dans le verre rafraîchi'],
  'verre-melange': ['Glace et ingrédients dans le verre à mélange', 'Mélanger 15 à 20 secondes', 'Passer dans le verre rafraîchi'],
  direct: ['Remplir le verre de glace et rafraîchir', 'Verser les ingrédients dans l’ordre', 'Mélanger, puis garnir'],
};

// Bornes des trois temps de la séquence.
const T1 = 0.26;
const T2 = 0.6;

/** Va-et-vient régulier entre -amp et +amp sur l'intervalle [de, a]. */
function oscillation(de: number, a: number, battements: number, amp: number) {
  const entree: number[] = [0, de];
  const sortie: number[] = [0, 0];
  const pas = (a - de) / (battements + 1);
  for (let k = 1; k <= battements; k++) {
    entree.push(de + k * pas);
    sortie.push(k % 2 ? amp : -amp);
  }
  entree.push(a, 1);
  sortie.push(0, 0);
  return { inputRange: entree, outputRange: sortie };
}

const deg = (o: { inputRange: number[]; outputRange: number[] }) => ({
  inputRange: o.inputRange,
  outputRange: o.outputRange.map((v) => `${v}deg`),
});

function Glacons({ t, x, y }: { t: Animated.Value; x: number; y: number }) {
  return (
    <>
      {[0, 1, 2].map((k) => {
        const de = 0.02 + k * 0.06;
        return (
          <Animated.View
            key={k}
            style={[
              s.glacon,
              {
                left: x + k * 9 - 9,
                top: y,
                opacity: t.interpolate({ inputRange: [0, de, de + 0.03, de + 0.12, de + 0.14, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
                transform: [
                  { translateY: t.interpolate({ inputRange: [0, de, de + 0.12, 1], outputRange: [-46, -46, 0, 0] }) },
                  { rotate: `${k * 25 - 20}deg` },
                ],
              },
            ]}
          />
        );
      })}
    </>
  );
}

export function MethodeAnimee({ fiche }: { fiche: Fiche }) {
  const t = useRef(new Animated.Value(0)).current;
  const [lecture, setLecture] = useState(true);
  const [temps, setTemps] = useState(0);
  const m = fiche.methode;
  const couleur = fiche.couleur ?? C.accent;

  useEffect(() => {
    const id = t.addListener(({ value }) => {
      const k = value < T1 ? 0 : value < T2 ? 1 : 2;
      setTemps((p) => (p === k ? p : k));
    });
    return () => t.removeListener(id);
  }, [t]);

  useEffect(() => {
    if (!lecture) return;
    t.setValue(0);
    const boucle = Animated.loop(Animated.timing(t, { toValue: 1, duration: DUREE, easing: Easing.linear, useNativeDriver: false }));
    boucle.start();
    return () => boucle.stop();
  }, [t, lecture, m]);

  const direct = m === 'direct';
  // Le verre se remplit pendant le versement : au 3e temps (shaker, verre à mélange) ou au 2e (direct).
  const niveau = direct
    ? t.interpolate({ inputRange: [0, T1 + 0.04, T2 - 0.02, 1], outputRange: [0, 0, 1, 1] })
    : t.interpolate({ inputRange: [0, T2 + 0.08, 0.93, 1], outputRange: [0, 0, 1, 1] });
  const jet = direct
    ? t.interpolate({ inputRange: [0, T1 + 0.03, T1 + 0.06, T2 - 0.04, T2 - 0.01, 1], outputRange: [0, 0, 1, 1, 0, 0] })
    : t.interpolate({ inputRange: [0, T2 + 0.07, T2 + 0.1, 0.92, 0.95, 1], outputRange: [0, 0, 1, 1, 0, 0] });

  // Outil principal : il frappe ou repose au 2e temps, puis s'incline pour verser au 3e.
  const outilX = t.interpolate({ inputRange: [0, T2, T2 + 0.07, 0.95, 1], outputRange: [0, 0, 100, 100, 0] });
  const outilY = t.interpolate({ inputRange: [0, T2, T2 + 0.07, 0.95, 1], outputRange: [0, 0, -72, -72, 0] });
  const bascule = t.interpolate({ inputRange: [0, T2, T2 + 0.07, 0.95, 1], outputRange: ['0deg', '0deg', '108deg', '108deg', '0deg'] });
  const frappe = oscillation(T1 + 0.03, T2 - 0.02, 13, 1);
  const cuillere = oscillation(direct ? T2 + 0.03 : T1 + 0.03, direct ? 0.96 : T2 - 0.02, 9, 1);

  return (
    <View style={s.cadre}>
      <View style={s.scene}>
        {/* Verre de service, à droite */}
        <View style={{ position: 'absolute', left: direct ? 138 : 196, top: 88 }}>
          <Verre verre={fiche.verre} couleur={couleur} taille={92} niveau={niveau} riche />
        </View>

        {direct ? (
          <>
            <Glacons t={t} x={176} y={124} />
            <Animated.View
              style={{
                position: 'absolute',
                left: 124,
                top: 24,
                opacity: t.interpolate({ inputRange: [0, T1, T1 + 0.04, T2 - 0.02, T2 + 0.02, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
                transform: [{ rotate: '112deg' }],
              }}>
              <Bouteille couleur={couleur} taille={46} />
            </Animated.View>
            <Animated.View style={[s.jet, { left: 181, top: 76, height: 66, backgroundColor: couleur, opacity: jet }]} />
            <Animated.View
              style={{
                position: 'absolute',
                left: 162,
                top: 46,
                opacity: t.interpolate({ inputRange: [0, T2, T2 + 0.04, 0.96, 1], outputRange: [0, 0, 1, 1, 0] }),
                transform: [
                  { translateX: t.interpolate({ ...cuillere, outputRange: cuillere.outputRange.map((v) => v * 9) }) },
                  { rotate: t.interpolate(deg({ ...cuillere, outputRange: cuillere.outputRange.map((v) => v * 9) })) },
                ],
              }}>
              <Outil id="cuillere" taille={46} />
            </Animated.View>
          </>
        ) : (
          <>
            <Glacons t={t} x={84} y={96} />
            <Animated.View
              style={{
                position: 'absolute',
                left: 44,
                top: 88,
                transform: [
                  { translateX: outilX },
                  { translateY: outilY },
                  { translateY: m === 'shaker' ? t.interpolate({ ...frappe, outputRange: frappe.outputRange.map((v) => v * 13) }) : 0 },
                  { rotate: bascule },
                  { rotate: m === 'shaker' ? t.interpolate(deg({ ...frappe, outputRange: frappe.outputRange.map((v) => v * 16 - (v ? 26 : 0)) })) : '0deg' },
                ],
              }}>
              <Outil id={m === 'shaker' ? 'boston' : 'verre-melange'} taille={84} />
            </Animated.View>
            {m === 'shaker'
              ? [0, 1].map((k) => (
                  <Animated.View
                    key={k}
                    style={[
                      s.arc,
                      { left: k ? 132 : 20, top: 100, transform: [{ scaleX: k ? 1 : -1 }] },
                      { opacity: t.interpolate({ ...frappe, outputRange: frappe.outputRange.map((v) => Math.abs(v) * 0.9) }) },
                    ]}
                  />
                ))
              : null}
            {m === 'verre-melange' ? (
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 64,
                  top: 44,
                  opacity: t.interpolate({ inputRange: [0, T1, T1 + 0.04, T2 - 0.03, T2, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
                  transform: [
                    { translateX: t.interpolate({ ...cuillere, outputRange: cuillere.outputRange.map((v) => v * 11) }) },
                    { rotate: t.interpolate(deg({ ...cuillere, outputRange: cuillere.outputRange.map((v) => v * 10) })) },
                  ],
                }}>
                <Outil id="cuillere" taille={52} />
              </Animated.View>
            ) : null}
            <Animated.View style={[s.jet, { left: 239, top: 78, height: 62, backgroundColor: couleur, opacity: jet }]} />
          </>
        )}
      </View>

      <View style={s.bas}>
        <Pressable
          onPress={() => setLecture((l) => !l)}
          accessibilityRole="button"
          accessibilityLabel={lecture ? 'Mettre l’animation en pause' : 'Relancer l’animation'}
          style={s.lecture}>
          <Ionicons name={lecture ? 'pause' : 'play'} size={16} color={C.onAccent} />
        </Pressable>
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={s.legende}>
            {temps + 1}. {LEGENDES[m][temps]}
          </Text>
          <View style={s.points}>
            {[0, 1, 2].map((k) => (
              <View key={k} style={[s.point, k === temps && s.pointActif]} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  cadre: { backgroundColor: C.cardAlt, borderRadius: R.md, overflow: 'hidden' },
  scene: { width: 300, height: 214, alignSelf: 'center' },
  glacon: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: C.accentDeep,
  },
  jet: { position: 'absolute', width: 5, borderRadius: 3 },
  arc: {
    position: 'absolute',
    width: 22,
    height: 44,
    borderRightWidth: 3,
    borderColor: C.accent,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  bas: { flexDirection: 'row', alignItems: 'center', gap: S.md, padding: S.md, backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.border },
  lecture: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  legende: { color: C.text, fontSize: 14, fontWeight: '700' },
  points: { flexDirection: 'row', gap: 5 },
  point: { width: 18, height: 4, borderRadius: 2, backgroundColor: C.border },
  pointActif: { backgroundColor: C.accent, width: 28 },
});
