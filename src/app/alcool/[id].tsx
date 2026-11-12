import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Bouteille } from '../../components/Illustrations';
import { Flux, Frise } from '../../components/visuels';
import { Card, Chip, GrandTitre, P, Page, Rubriques, Tag, Titre } from '../../components/ui';
import { ALCOOL_PAR_ID } from '../../data/alcools';
import { COCKTAIL_PAR_ID } from '../../data/cocktails';
import { C, S } from '../../theme';

export default function FicheAlcool() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const a = ALCOOL_PAR_ID[id];

  if (!a) {
    return (
      <Page>
        <Card>
          <P>Fiche introuvable.</P>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Stack.Screen options={{ title: '' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: S.md }}>
        <View style={{ flex: 1, gap: S.md, alignItems: 'flex-start' }}>
          <Tag>{a.famille}</Tag>
          <GrandTitre sousTitre={a.accroche}>{a.nom}</GrandTitre>
        </View>
        <Bouteille couleur={a.couleur} taille={58} />
      </View>

      {a.aromes?.length ? (
        <Card>
          <Titre>Arômes typiques</Titre>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
            {a.aromes.map((x) => (
              <Tag key={x}>{x}</Tag>
            ))}
          </View>
        </Card>
      ) : null}

      <Card>
        <Titre>Repères</Titre>
        {a.reperes.map(([l, v]) => (
          <View key={l} style={{ gap: 2 }}>
            <Text style={s.label}>{l}</Text>
            <Text style={s.valeur}>{v}</Text>
          </View>
        ))}
      </Card>

      {a.dates?.length ? (
        <Card>
          <Titre>Frise</Titre>
          <Frise dates={a.dates} />
        </Card>
      ) : null}

      <Card>
        <Titre>Histoire</Titre>
        {a.histoire.map((p) => (
          <P key={p}>{p}</P>
        ))}
      </Card>

      <Card>
        <Titre>Élaboration</Titre>
        {a.etapes?.length ? <Flux etapes={a.etapes} /> : null}
        {a.elaboration.map((p) => (
          <P key={p}>{p}</P>
        ))}
      </Card>

      <Card>
        <Titre>Catégories et mentions</Titre>
        <Rubriques items={a.categories} />
      </Card>

      <Card>
        <Titre>À savoir</Titre>
        {a.aSavoir.map((p) => (
          <View key={p} style={{ flexDirection: 'row', gap: S.sm }}>
            <Text style={{ color: C.accent, fontSize: 15 }}>•</Text>
            <Text style={s.puce}>{p}</Text>
          </View>
        ))}
      </Card>

      {a.service ? (
        <Card style={{ backgroundColor: C.accentDark, boxShadow: 'none' }}>
          <Titre>Service et usage au bar</Titre>
          <P>{a.service}</P>
        </Card>
      ) : null}

      {a.cocktails.length ? (
        <Card>
          <Titre>Dans le socle</Titre>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
            {a.cocktails.map((cid) => (
              <Chip key={cid} label={COCKTAIL_PAR_ID[cid].nom} onPress={() => router.push(`/cocktail/${cid}`)} />
            ))}
          </View>
        </Card>
      ) : null}

      <P muted>L’abus d’alcool est dangereux pour la santé, à consommer avec modération.</P>
    </Page>
  );
}

const s = StyleSheet.create({
  label: { color: C.muted, fontSize: 12 },
  valeur: { color: C.text, fontSize: 15, lineHeight: 21 },
  puce: { color: C.text, fontSize: 15, lineHeight: 22, flex: 1 },
});
