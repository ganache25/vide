import { Stack, useLocalSearchParams } from 'expo-router';
import { SchemaAlambic, SchemaColonne } from '../../components/Illustrations';
import { Card, GrandTitre, P, Page, Rubriques, Titre } from '../../components/ui';
import { Frise } from '../../components/visuels';
import { FRISE_BAR } from '../../data/cultureBar';
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
      {a.id === 'fabrication' ? (
        <>
          <Card>
            <Titre>Alambic à repasse</Titre>
            <SchemaAlambic />
            <P muted>Distillation discontinue, en deux chauffes : cognac, single malt, calvados Pays d’Auge.</P>
          </Card>
          <Card>
            <Titre>Alambic à colonne</Titre>
            <SchemaColonne />
            <P muted>Distillation continue sur plateaux : armagnac, rhum agricole, bourbon, alcool neutre.</P>
          </Card>
        </>
      ) : null}
      {a.id === 'histoire' ? (
        <Card>
          <Titre>Frise du bar</Titre>
          <Frise dates={FRISE_BAR} />
        </Card>
      ) : null}
      <Card>
        <Rubriques items={a.sections} />
      </Card>
    </Page>
  );
}
