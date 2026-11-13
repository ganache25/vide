import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, Depliant, GrandTitre, P, Page, Recherche, Rubriques, Tag, Titre } from '../components/ui';
import {
  BONNES_PRATIQUES,
  CATEGORIES,
  FAMILLES,
  LEXIQUE,
  MATERIEL,
  METHODES,
  TYPES,
  VERRERIE,
} from '../data/guide';
import { Triangle3S } from '../components/Illustrations';
import { normaliser } from '../lib/texte';
import { C, S } from '../theme';

function Etapes({ etapes }: { etapes: string[] }) {
  return (
    <View style={{ gap: S.sm }}>
      {etapes.map((e, k) => (
        <View key={k} style={{ flexDirection: 'row', gap: S.md }}>
          <Text style={s.num}>{k + 1}</Text>
          <Text style={s.txt}>{e}</Text>
        </View>
      ))}
    </View>
  );
}

function Etiquettes({ items }: { items: string[] }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
      {items.map((i) => (
        <Tag key={i}>{i}</Tag>
      ))}
    </View>
  );
}

export default function Guide() {
  const [q, setQ] = useState('');
  const termes = useMemo(() => {
    const n = normaliser(q);
    return n ? LEXIQUE.filter(([t, d]) => normaliser(`${t} ${d}`).includes(n)) : LEXIQUE;
  }, [q]);

  return (
    <Page>
      <GrandTitre sousTitre="Bonnes pratiques, familles, méthodes et lexique du référentiel.">Guide du socle</GrandTitre>
      <View style={{ gap: S.md }}>
        <Titre>Le socle en bref</Titre>
        <Depliant icone="sparkles" titre="Guide des bonnes pratiques pour les créations">
          <Triangle3S />
          <Rubriques items={BONNES_PRATIQUES.map((r, k) => ({ ...r, titre: `${k + 1}. ${r.titre}` }))} />
        </Depliant>
        <Depliant icone="pricetags" titre="Catégories et types de cocktails">
          <P muted>Catégorie = contenance</P>
          <Rubriques items={CATEGORIES} />
          <P muted>Type = temps (moment de consommation)</P>
          <Rubriques items={TYPES} />
        </Depliant>
        <Depliant icone="git-branch" titre="Familles de cocktails">
          <Rubriques items={FAMILLES} />
        </Depliant>
        <Depliant icone="list" titre="Méthodes de réalisation">
          {METHODES.map((m) => (
            <View key={m.titre} style={{ gap: S.sm }}>
              <Text style={s.sous}>{m.titre}</Text>
              <Etapes etapes={m.etapes} />
            </View>
          ))}
        </Depliant>
        <Depliant icone="wine" titre="Verrerie et matériel">
          <Text style={s.sous}>Verrerie : les incontournables</Text>
          <Etiquettes items={VERRERIE.incontournables} />
          <Text style={s.sous}>Verrerie : les complémentaires</Text>
          <Etiquettes items={VERRERIE.complementaires} />
          <Text style={s.sous}>Matériel du barman</Text>
          <Etiquettes items={MATERIEL} />
        </Depliant>
        <Depliant icone="calculator" titre="Calculer le TAV d’un cocktail">
          <P>
            On multiplie le volume de chaque ingrédient par son TAV, on additionne, puis on divise par la
            contenance du cocktail.
          </P>
          <View style={s.calcul}>
            <Text style={s.mono}>Americano</Text>
            <Text style={s.mono}>20 ml vermouth rouge × 14,5 = 290</Text>
            <Text style={s.mono}>50 ml bitter × 25 = 1 250</Text>
            <Text style={s.mono}>50 ml eau gazeuse × 0 = 0</Text>
            <Text style={s.mono}>Total = 1 540 · contenance = 120 ml</Text>
            <Text style={[s.mono, { color: C.accent, fontWeight: '700' }]}>1 540 ÷ 120 = 12,83 → TAV de 13 %</Text>
          </View>
          <P muted>L’éditeur de fiches fait ce calcul automatiquement à chaque modification.</P>
        </Depliant>
      </View>

      <View style={{ gap: S.md }}>
        <Titre>Lexique professionnel</Titre>
        <Recherche valeur={q} onChange={setQ} placeholder="Dry shake, float, muter…" />
        <Card>
          {termes.length ? (
            termes.map(([t, d]) => (
              <View key={t} style={{ gap: 2 }}>
                <Text style={s.terme}>{t}</Text>
                <Text style={s.txt}>{d}</Text>
              </View>
            ))
          ) : (
            <P muted>Aucun terme ne correspond.</P>
          )}
        </Card>
      </View>

      <P muted>Contenu repris du Socle des cocktails de référence (version finale 12-2024, édition 2025).</P>
    </Page>
  );
}

const s = StyleSheet.create({
  num: { color: C.accent, fontSize: 15, fontWeight: '700', width: 22, textAlign: 'right' },
  txt: { color: C.text, fontSize: 15, lineHeight: 22, flex: 1 },
  sous: { color: C.accent, fontSize: 15, fontWeight: '700', marginTop: S.xs },
  terme: { color: C.accent, fontSize: 15, fontWeight: '700' },
  calcul: { backgroundColor: C.cardAlt, borderRadius: 16, padding: S.md + 2, gap: 5 },
  mono: { color: C.text, fontSize: 14, fontVariant: ['tabular-nums'] },
});
