import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

import { C, OMBRE_FORTE } from '../../theme';

type IconName = keyof typeof Ionicons.glyphMap;

const icone =
  (nom: IconName) =>
  ({ color, focused }: { color: ColorValue; focused: boolean }) => (
    <Ionicons
      name={focused ? nom : (`${nom}-outline` as IconName)}
      size={23}
      color={typeof color === 'string' ? color : C.muted}
    />
  );

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
          backgroundColor: C.card,
          boxShadow: OMBRE_FORTE,
        },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Socle', tabBarIcon: icone('wine') }} />
      <Tabs.Screen name="fiches" options={{ title: 'Mes fiches', tabBarIcon: icone('document-text') }} />
      <Tabs.Screen name="alcools" options={{ title: 'Alcools', tabBarIcon: icone('book') }} />
      <Tabs.Screen name="guide" options={{ title: 'Guide', tabBarIcon: icone('school') }} />
      <Tabs.Screen name="outils" options={{ title: 'Outils', tabBarIcon: icone('calculator') }} />
    </Tabs>
  );
}
