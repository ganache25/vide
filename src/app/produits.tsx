import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, View } from 'react-native';

import { Bouteille } from '../components/Illustrations';
import { Card, GrandTitre, Ligne, Liste, P, Page, Recherche, Titre } from '../components/ui';
import { ALCOOLS, ARTICLES, FAMILLES_ALCOOLS } from '../data/alcools';
import { PHOTOS } from '../data/photos';
import { normaliser } from '../lib/texte';
import { S } from '../theme';

export default function CultureProduits() {
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
      <GrandTitre sousTitre="Histoire, élaboration, arômes et repères pour chaque famille de produits.">Culture produits</GrandTitre>
      <Recherche valeur={q} onChange={setQ} placeholder="Gin, bourbon, VSOP, reposado…" />

      {articles.length ? (
        <View style={{ gap: S.md }}>
          <Titre>Les bases</Titre>
          <Liste>
            {articles.map((a, k) => (
              <Ligne
                key={a.id}
                delai={Math.min(k, 8) * 35}
                icone={a.icone}
                titre={a.titre}
                sousTitre={a.accroche}
                onPress={() => router.push(`/article/${a.id}`)}
              />
            ))}
          </Liste>
        </View>
      ) : null}

      {FAMILLES_ALCOOLS.map((fam) => {
        const items = alcools.filter((a) => a.famille === fam);
        if (!items.length) return null;
        return (
          <View key={fam} style={{ gap: S.md }}>
            <Titre>{fam}</Titre>
            <Liste>
              {items.map((a) => (
                <Ligne
                  key={a.id}
                  visuel={
                    PHOTOS[`p-${a.id}`] ? (
                      <Image source={PHOTOS[`p-${a.id}`].image} style={{ width: 46, height: 46, borderRadius: 23 }} resizeMode="cover" />
                    ) : (
                      <Bouteille couleur={a.couleur} taille={24} />
                    )
                  }
                  titre={a.nom}
                  sousTitre={a.accroche}
                  onPress={() => router.push(`/alcool/${a.id}`)}
                />
              ))}
            </Liste>
          </View>
        );
      })}

      {!alcools.length && !articles.length ? (
        <Card>
          <P>Aucun résultat pour cette recherche.</P>
        </Card>
      ) : null}
    </Page>
  );
}
