import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { FicheView } from '../../components/FicheView';
import { Bouton, Card, P, Page, confirmer } from '../../components/ui';
import { COCKTAIL_PAR_ID } from '../../data/cocktails';
import { exporterFiche } from '../../lib/pdf';
import { supprimerFiche, useFiches } from '../../lib/store';
import { S } from '../../theme';

export default function MaFiche() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { fiches, charge } = useFiches();
  const fiche = fiches.find((f) => f.id === id);

  if (!fiche) {
    return (
      <Page>
        {charge ? (
          <Card>
            <P>Cette fiche n’existe plus sur cet appareil.</P>
          </Card>
        ) : null}
      </Page>
    );
  }

  const base = fiche.baseId ? COCKTAIL_PAR_ID[fiche.baseId] : undefined;

  return (
    <Page
      footer={
        <View style={{ flexDirection: 'row', gap: S.sm }}>
          <Bouton
            label="Modifier"
            icone="create"
            style={{ flex: 1 }}
            onPress={() => router.push(`/editeur?id=${fiche.id}`)}
          />
          <Bouton label="PDF" icone="share-outline" variante="contour" onPress={() => void exporterFiche(fiche)} />
        </View>
      }>
      <Stack.Screen options={{ title: fiche.nom || 'Ma fiche' }} />
      {base ? <P muted>Revisite du cocktail de référence {base.nom}.</P> : null}
      <FicheView fiche={fiche} />
      <View style={{ flexDirection: 'row', gap: S.sm }}>
        <Bouton
          label="Dupliquer"
          icone="copy-outline"
          variante="contour"
          style={{ flex: 1 }}
          onPress={() => router.push(`/editeur?copie=${fiche.id}`)}
        />
        <Bouton
          label="Supprimer"
          icone="trash-outline"
          variante="danger"
          style={{ flex: 1 }}
          onPress={() =>
            confirmer('Supprimer cette fiche ?', `« ${fiche.nom} » sera définitivement supprimée.`, () => {
              void supprimerFiche(fiche.id);
              router.back();
            })
          }
        />
      </View>
    </Page>
  );
}
