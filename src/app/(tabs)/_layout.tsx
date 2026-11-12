import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

import { C } from '../../theme';

type IconName = keyof typeof Ionicons.glyphMap;

const icone =
  (nom: IconName) =>
  ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons name={nom} size={size} color={typeof color === 'string' ? color : C.muted} />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: C.card },
        headerTitleStyle: { color: C.text },
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: C.card, borderTopColor: C.border },
        tabBarActiveTintColor: C.accent,
        tabBarInactiveTintColor: C.muted,
        sceneStyle: { backgroundColor: C.bg },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Socle', headerTitle: 'Cocktails de référence', tabBarIcon: icone('wine') }} />
      <Tabs.Screen name="fiches" options={{ title: 'Mes fiches', tabBarIcon: icone('document-text') }} />
      <Tabs.Screen name="alcools" options={{ title: 'Alcools', headerTitle: 'Connaître les alcools', tabBarIcon: icone('book') }} />
      <Tabs.Screen name="guide" options={{ title: 'Guide', headerTitle: 'Guide du barman', tabBarIcon: icone('school') }} />
    </Tabs>
  );
}
