import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { C } from '../theme';

const theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: C.bg, card: C.card, text: C.text, border: C.border, primary: C.accent },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: C.card },
          headerTintColor: C.accent,
          headerTitleStyle: { color: C.text },
          headerBackTitle: 'Retour',
          contentStyle: { backgroundColor: C.bg },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cocktail/[id]" options={{ title: 'Fiche du socle' }} />
        <Stack.Screen name="fiche/[id]" options={{ title: 'Ma fiche' }} />
        <Stack.Screen name="editeur" options={{ title: 'Fiche technique' }} />
        <Stack.Screen name="alcool/[id]" options={{ title: 'Alcool' }} />
        <Stack.Screen name="article/[id]" options={{ title: 'Les bases' }} />
      </Stack>
    </ThemeProvider>
  );
}
