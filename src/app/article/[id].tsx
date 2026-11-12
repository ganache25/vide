import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Card, P, Page, Rubriques } from '../../components/ui';
import { ARTICLE_PAR_ID } from '../../data/alcools';
import { C, S } from '../../theme';

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
      <Stack.Screen options={{ title: 'Les bases' }} />
      <View style={{ gap: S.sm }}>
        <Text style={{ color: C.text, fontSize: 28, fontWeight: '800' }}>{a.titre}</Text>
        <Text style={{ color: C.accent, fontSize: 16, fontStyle: 'italic' }}>{a.accroche}</Text>
      </View>
      <Card>
        <Rubriques items={a.sections} />
      </Card>
    </Page>
  );
}
