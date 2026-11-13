import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View, type ColorValue } from 'react-native';

import { C, OMBRE_FORTE } from '../../theme';

type IconName = keyof typeof Ionicons.glyphMap;

/** Icône d'onglet : elle rebondit et s'entoure d'une pastille quand l'onglet devient actif. */
function IconeOnglet({ nom, color, focused }: { nom: IconName; color: ColorValue; focused: boolean }) {
  const v = useRef(new Animated.Value(focused ? 1 : 0)).current;
  useEffect(() => {
    Animated.spring(v, { toValue: focused ? 1 : 0, useNativeDriver: Platform.OS !== 'web', speed: 14, bounciness: 14 }).start();
  }, [v, focused]);
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 54, height: 30 }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: 54,
          height: 30,
          borderRadius: 15,
          backgroundColor: C.accentDark,
          opacity: v,
          transform: [{ scaleX: v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }],
        }}
      />
      <Animated.View style={{ transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.14] }) }] }}>
        <Ionicons
          name={focused ? nom : (`${nom}-outline` as IconName)}
          size={22}
          color={typeof color === 'string' ? color : C.muted}
        />
      </Animated.View>
    </View>
  );
}

const icone =
  (nom: IconName) =>
  ({ color, focused }: { color: ColorValue; focused: boolean }) => <IconeOnglet nom={nom} color={color} focused={focused} />;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.accent,
        tabBarInactiveTintColor: C.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        sceneStyle: { backgroundColor: C.bg },
        // Barre flottante : une pilule blanche détachée du bord de l'écran.
        tabBarStyle: {
          position: 'absolute',
          bottom: 14,
          marginHorizontal: 16,
          height: 66,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 33,
          borderTopWidth: 0,
          backgroundColor: 'rgba(255,255,255,0.78)',
          boxShadow: OMBRE_FORTE,
          overflow: 'hidden',
        },
        // Verre dépoli : le contenu défile en transparence sous la barre.
        tabBarBackground: () => <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Socle', tabBarIcon: icone('wine') }} />
      <Tabs.Screen name="fiches" options={{ title: 'Mes fiches', tabBarIcon: icone('document-text') }} />
      <Tabs.Screen name="culture" options={{ title: 'Culture', tabBarIcon: icone('library') }} />
      <Tabs.Screen name="outils" options={{ title: 'Outils', tabBarIcon: icone('calculator') }} />
    </Tabs>
  );
}
