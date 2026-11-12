import { Stack, useLocalSearchParams } from 'expo-router';
import { Card, GrandTitre, P, Page, Rubriques } from '../../components/ui';
import { ARTICLE_PAR_ID } from '../../data/alcools';

export default function ArticleBases() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = ARTICLE_PAR_ID[id];

  if (!a) {
    return (
      <Page>
        <Card>
          <P>Article introuvable.</P>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Stack.Screen options={{ title: '' }} />
      <GrandTitre sousTitre={a.accroche}>{a.titre}</GrandTitre>
      <Card>
        <Rubriques items={a.sections} />
      </Card>
    </Page>
  );
}
