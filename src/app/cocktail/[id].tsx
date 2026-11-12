import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { FicheView } from '../../components/FicheView';
import { Bouton, Card, P, Page } from '../../components/ui';
import { COCKTAIL_PAR_ID } from '../../data/cocktails';
import { exporterFiche } from '../../lib/pdf';
import { S } from '../../theme';

export default function CocktailSocle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
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

  return (
    <Page
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
      <Stack.Screen options={{ title: fiche.nom }} />
      <FicheView fiche={fiche} />
    </Page>
  );
}
