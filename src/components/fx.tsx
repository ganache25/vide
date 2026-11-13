// Effets visuels : dégradés, bulles, compteurs animés, reflet, anneau de score, confettis, retour haptique.

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { C, DEGRADE } from '../theme';

const NATIF = Platform.OS !== 'web';
const CercleAnime = Animated.createAnimatedComponent(Circle);

/** Légère vibration sur les gestes importants (sans effet sur le web). */
export function vibrer(fort = false) {
  if (!NATIF) return;
  Haptics.impactAsync(fort ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

export function Degrade({
  children,
  style,
  couleurs = DEGRADE,
}: {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  couleurs?: readonly [string, string, ...string[]];
}) {
  return (
    <LinearGradient colors={couleurs} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={style}>
      {children}
    </LinearGradient>
  );
}

/** Bulles qui montent en boucle, comme dans une flûte : à poser en fond d'un bloc sombre. */
export function Bulles({ nombre = 9, couleur = '#FFFFFF' }: { nombre?: number; couleur?: string }) {
  const bulles = useMemo(
    () =>
      Array.from({ length: nombre }, (_, k) => ({
        gauche: `${6 + ((k * 37) % 88)}%` as const,
        taille: 5 + ((k * 7) % 12),
        duree: 4200 + ((k * 911) % 3600),
        delai: (k * 620) % 3800,
        v: new Animated.Value(0),
      })),
    [nombre],
  );
  useEffect(() => {
    const boucles = bulles.map((b) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(b.delai),
          Animated.timing(b.v, { toValue: 1, duration: b.duree, easing: Easing.linear, useNativeDriver: NATIF }),
        ]),
      ),
    );
    boucles.forEach((b) => b.start());
    return () => boucles.forEach((b) => b.stop());
  }, [bulles]);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {bulles.map((b, k) => (
        <Animated.View
          key={k}
          style={{
            position: 'absolute',
            bottom: -20,
            left: b.gauche,
            width: b.taille,
            height: b.taille,
            borderRadius: b.taille,
            borderWidth: 1,
            borderColor: couleur,
            backgroundColor: 'rgba(255,255,255,0.10)',
            opacity: b.v.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 0.55, 0.35, 0] }),
            transform: [
              { translateY: b.v.interpolate({ inputRange: [0, 1], outputRange: [0, -300] }) },
              { translateX: b.v.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, 6, 0, -6, 0] }) },
            ],
          }}
        />
      ))}
    </View>
  );
}

/** Reflet lumineux qui balaie un bloc à intervalles réguliers. */
export function Reflet() {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const boucle = Animated.loop(
      Animated.sequence([
        Animated.delay(2600),
        Animated.timing(v, { toValue: 1, duration: 1300, easing: Easing.inOut(Easing.quad), useNativeDriver: NATIF }),
        Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: NATIF }),
      ]),
    );
    boucle.start();
    return () => boucle.stop();
  }, [v]);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View
        style={{
          position: 'absolute',
          top: -40,
          bottom: -40,
          width: 70,
          backgroundColor: 'rgba(255,255,255,0.13)',
          transform: [{ translateX: v.interpolate({ inputRange: [0, 1], outputRange: [-120, 520] }) }, { rotate: '18deg' }],
        }}
      />
    </View>
  );
}

/** Nombre qui défile jusqu'à sa valeur. */
export function Compteur({
  valeur,
  decimales = 0,
  suffixe = '',
  style,
  duree = 900,
}: {
  valeur: number;
  decimales?: number;
  suffixe?: string;
  style?: StyleProp<TextStyle>;
  duree?: number;
}) {
  const v = useRef(new Animated.Value(0)).current;
  const [affiche, setAffiche] = useState(0);
  useEffect(() => {
    const id = v.addListener(({ value }) => setAffiche(value));
    Animated.timing(v, { toValue: valeur, duration: duree, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    return () => v.removeListener(id);
  }, [v, valeur, duree]);
  return (
    <Text style={style}>
      {affiche.toFixed(decimales).replace('.', ',')}
      {suffixe}
    </Text>
  );
}

/** Anneau de progression qui se trace jusqu'à la fraction donnée. */
export function Anneau({ fraction, taille = 150, children }: { fraction: number; taille?: number; children?: ReactNode }) {
  const v = useRef(new Animated.Value(0)).current;
  const r = 44;
  const perimetre = 2 * Math.PI * r;
  useEffect(() => {
    Animated.timing(v, { toValue: fraction, duration: 1200, delay: 200, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [v, fraction]);
  return (
    <View style={{ width: taille, height: taille, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={taille} height={taille} viewBox="0 0 100 100" style={StyleSheet.absoluteFill}>
        <Circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.18)" strokeWidth={7} fill="none" />
        <CercleAnime
          cx="50"
          cy="50"
          r={r}
          stroke={C.or}
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${perimetre} ${perimetre}`}
          strokeDashoffset={v.interpolate({ inputRange: [0, 1], outputRange: [perimetre, 0] })}
          transform="rotate(-90 50 50)"
        />
      </Svg>
      {children}
    </View>
  );
}

const TEINTES_CONFETTIS = ['#C2A06A', '#FFFFFF', '#E0607E', '#F3D5DD', '#9A2B50'];

/** Pluie de confettis, jouée une fois. */
export function Confettis({ nombre = 26 }: { nombre?: number }) {
  const v = useRef(new Animated.Value(0)).current;
  const pieces = useMemo(
    () =>
      Array.from({ length: nombre }, (_, k) => ({
        gauche: `${(k * 53) % 100}%` as const,
        derive: ((k * 29) % 80) - 40,
        chute: 260 + ((k * 41) % 160),
        tours: 2 + (k % 4),
        depart: (k % 7) * 0.05,
        couleur: TEINTES_CONFETTIS[k % TEINTES_CONFETTIS.length],
        large: 6 + (k % 3) * 2,
      })),
    [nombre],
  );
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 2600, delay: 500, easing: Easing.out(Easing.quad), useNativeDriver: NATIF }).start();
  }, [v]);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map((p, k) => {
        const t = v.interpolate({ inputRange: [0, p.depart, 1], outputRange: [0, 0, 1] });
        return (
          <Animated.View
            key={k}
            style={{
              position: 'absolute',
              top: -14,
              left: p.gauche,
              width: p.large,
              height: p.large * 1.6,
              borderRadius: 2,
              backgroundColor: p.couleur,
              opacity: t.interpolate({ inputRange: [0, 0.05, 0.85, 1], outputRange: [0, 1, 1, 0] }),
              transform: [
                { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [0, p.chute] }) },
                { translateX: t.interpolate({ inputRange: [0, 1], outputRange: [0, p.derive] }) },
                { rotate: t.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.tours * 180}deg`] }) },
              ],
            }}
          />
        );
      })}
    </View>
  );
}
