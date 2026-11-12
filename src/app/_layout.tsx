import { DMSerifDisplay_400Regular, useFonts } from '@expo-google-fonts/dm-serif-display';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { C, F } from '../theme';

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: C.bg, card: C.bg, text: C.text, border: C.bg, primary: C.accent },
};

export default function RootLayout() {
  const [pret, erreur] = useFonts({ DMSerifDisplay_400Regular });
  // Si la police ne se charge pas, l'application s'affiche quand même avec la police système.
  if (!pret && !erreur) return <View style={{ flex: 1, backgroundColor: C.bg }} />;

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: C.bg },
          headerShadowVisible: false,
          headerTintColor: C.accent,
          headerTitleStyle: { color: C.text, fontFamily: F.display, fontSize: 20 },
          headerBackTitle: 'Retour',
          contentStyle: { backgroundColor: C.bg },
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cocktail/[id]" options={{ title: '' }} />
        <Stack.Screen name="fiche/[id]" options={{ title: '' }} />
        <Stack.Screen name="editeur" options={{ title: 'Fiche technique', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="alcool/[id]" options={{ title: '' }} />
        <Stack.Screen name="article/[id]" options={{ title: '' }} />
        <Stack.Screen name="outils/quiz" options={{ title: 'Quiz du socle' }} />
        <Stack.Screen name="outils/calculs" options={{ title: 'Calculateurs' }} />
        <Stack.Screen name="outils/mercuriale" options={{ title: 'Ma mercuriale' }} />
      </Stack>
    </ThemeProvider>
  );
}
