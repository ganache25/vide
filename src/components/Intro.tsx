// Écran d'ouverture : le verre se remplit, le nom apparaît, puis l'écran s'efface.

import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';

import { C, DEGRADE_SCENE, F } from '../theme';
import { Bulles, Degrade } from './fx';
import { Verre } from './Illustrations';

const NATIF = Platform.OS !== 'web';

export function Intro() {
  const [visible, setVisible] = useState(true);
  const texte = useRef(new Animated.Value(0)).current;
  const sortie = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let annule = false;
    void AccessibilityInfo.isReduceMotionEnabled().then((reduit) => {
      if (annule) return;
      if (reduit) return setVisible(false);
      Animated.sequence([
        Animated.timing(texte, { toValue: 1, duration: 700, delay: 500, easing: Easing.out(Easing.cubic), useNativeDriver: NATIF }),
        Animated.delay(900),
        Animated.timing(sortie, { toValue: 0, duration: 500, easing: Easing.in(Easing.quad), useNativeDriver: NATIF }),
      ]).start(() => setVisible(false));
    });
    return () => {
      annule = true;
    };
  }, [texte, sortie]);

  if (!visible) return null;
  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, s.fond, { opacity: sortie, transform: [{ scale: sortie.interpolate({ inputRange: [0, 1], outputRange: [1.08, 1] }) }] }]}>
      <Degrade couleurs={DEGRADE_SCENE} style={StyleSheet.absoluteFill} />
      <Bulles nombre={12} />
      <View>
        <Verre verre="Coupe" couleur="#E0607E" taille={150} anime riche bulles trait="#F8E9ED" garniture="zeste de citron" />
      </View>
      <Animated.View
        style={{
          alignItems: 'center',
          opacity: texte,
          transform: [{ translateY: texte.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
        }}>
        <Text style={s.nom}>Fiches Bar</Text>
        <View style={s.filet} />
        <Text style={s.devise}>L’atelier du barman</Text>
      </Animated.View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  fond: { alignItems: 'center', justifyContent: 'center', gap: 18, zIndex: 100 },
  nom: { color: '#FFFFFF', fontFamily: F.display, fontSize: 44 },
  filet: { width: 46, height: 2, backgroundColor: C.or, marginVertical: 10 },
  devise: { color: '#F3D5DD', fontSize: 14, letterSpacing: 3, textTransform: 'uppercase' },
});
