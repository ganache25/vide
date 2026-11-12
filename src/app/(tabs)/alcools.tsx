import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { Card, Ligne, P, Page, Recherche, Titre } from '../../components/ui';
import { ALCOOLS, ARTICLES, FAMILLES_ALCOOLS } from '../../data/alcools';
import { normaliser } from '../../lib/texte';
import { S } from '../../theme';

export default function Alcools() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const n = normaliser(q);

  const alcools = useMemo(
    () =>
      ALCOOLS.filter(
        (a) =>
          !n ||
          normaliser(
            [a.nom, a.accroche, ...a.categories.map((c) => c.titre), ...a.reperes.map((r) => r[1])].join(' '),
          ).includes(n),
      ),
    [n],
  );
  const articles = useMemo(
    () => ARTICLES.filter((a) => !n || normaliser([a.titre, ...a.sections.map((s) => s.titre)].join(' ')).includes(n)),
    [n],
  );

  return (
    <Page>
      <Recherche valeur={q} onChange={setQ} placeholder="Gin, bourbon, VSOP, reposado…" />

      {articles.length ? (
        <View style={{ gap: S.sm }}>
          <Titre>Les bases</Titre>
          <Card style={{ padding: 0, gap: 0, overflow: 'hidden' }}>
            {articles.map((a) => (
              <Ligne key={a.id} titre={a.titre} sousTitre={a.accroche} onPress={() => router.push(`/article/${a.id}`)} />
            ))}
          </Card>
        </View>
      ) : null}

      {FAMILLES_ALCOOLS.map((fam) => {
        const items = alcools.filter((a) => a.famille === fam);
        if (!items.length) return null;
        return (
          <View key={fam} style={{ gap: S.sm }}>
            <Titre>{fam}</Titre>
            <Card style={{ padding: 0, gap: 0, overflow: 'hidden' }}>
              {items.map((a) => (
                <Ligne key={a.id} titre={a.nom} sousTitre={a.accroche} onPress={() => router.push(`/alcool/${a.id}`)} />
              ))}
            </Card>
          </View>
        );
      })}

      {!alcools.length && !articles.length ? (
        <Card>
          <P muted>Aucun résultat pour cette recherche.</P>
        </Card>
      ) : null}
    </Page>
  );
}
