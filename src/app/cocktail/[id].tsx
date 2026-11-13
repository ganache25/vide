import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';

import { FicheView } from '../../components/FicheView';
import { Bouton, Card, P, Page } from '../../components/ui';
import { COCKTAIL_PAR_ID } from '../../data/cocktails';
import { exporterFiche } from '../../lib/pdf';
import { basculerFavori, useFavoris } from '../../lib/store';
import { S } from '../../theme';

export default function CocktailSocle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const favoris = useFavoris();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fiche = COCKTAIL_PAR_ID[id];

  if (!fiche) {
    return (
      <Page>
        <Card>
          <P>Ce cocktail ne fait pas partie du socle.</P>
        </Card>
      </Page>
    );
  }

  const favori = favoris.includes(fiche.id);

  return (
    <Page
      scrollY={scrollY}
      footer={
        <View style={{ flexDirection: 'row', gap: S.sm }}>
          <Bouton
            label="Créer une revisite"
            icone="create"
            style={{ flex: 1 }}
            onPress={() => router.push(`/editeur?base=${fiche.id}`)}
          />
          <Bouton label="PDF" icone="share-outline" variante="contour" onPress={() => void exporterFiche(fiche)} />
        </View>
      }>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#FFFFFF',
          headerRight: () => (
            <Pressable
              onPress={() => void basculerFavori(fiche.id)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={favori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              style={{ paddingHorizontal: S.md }}>
              <Ionicons name={favori ? 'heart' : 'heart-outline'} size={26} color="#FFFFFF" />
            </Pressable>
          ),
        }}
      />
      <FicheView fiche={fiche} scrollY={scrollY} />
    </Page>
  );
}
