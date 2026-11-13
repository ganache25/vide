import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Outil, Verre } from '../components/Illustrations';
import { Card, Chip, Chips, GrandTitre, P, Page, Recherche, Rubriques, Tag, Titre } from '../components/ui';
import { COCKTAILS } from '../data/cocktails';
import { ENTRETIEN, GROUPES_OUTILS, OUTILS, VERRERIE_DETAIL } from '../data/materiel';
import { normaliser } from '../lib/texte';
import { C, F, R, S } from '../theme';

type Vue = 'outils' | 'verres';

export default function Materiel() {
  const router = useRouter();
  const [vue, setVue] = useState<Vue>('outils');
  const [q, setQ] = useState('');
  const n = normaliser(q);

  const outils = useMemo(
    () => OUTILS.filter((o) => !n || normaliser(`${o.nom} ${o.alias ?? ''} ${o.role}`).includes(n)),
    [n],
  );
  const verres = useMemo(
    () => VERRERIE_DETAIL.filter((v) => !n || normaliser(`${v.nom} ${v.usage}`).includes(n)),
    [n],
  );

  return (
    <Page>
      <GrandTitre sousTitre="À quoi sert chaque outil, et comment s’en servir.">Matériel de bar</GrandTitre>
      <Chips<Vue>
        valeur={vue}
        onChange={setVue}
        options={[
          { v: 'outils', l: `Outils (${OUTILS.length})`, icone: 'construct' },
          { v: 'verres', l: `Verrerie (${VERRERIE_DETAIL.length})`, icone: 'wine' },
        ]}
      />
      <Recherche valeur={q} onChange={setQ} placeholder={vue === 'outils' ? 'Shaker, passoire, jigger…' : 'Coupe, highball, flûte…'} />

      {vue === 'outils'
        ? GROUPES_OUTILS.map((g) => {
            const items = outils.filter((o) => o.groupe === g);
            if (!items.length) return null;
            return (
              <View key={g} style={{ gap: S.md }}>
                <Titre>{g}</Titre>
                {items.map((o) => (
                  <Card key={o.id}>
                    <View style={s.tete}>
                      <View style={s.visuel}>
                        <Outil id={o.id} taille={56} />
                      </View>
                      <View style={{ flex: 1, gap: 3 }}>
                        <Text style={s.nom}>{o.nom}</Text>
                        {o.alias ? <Text style={s.alias}>{o.alias}</Text> : null}
                        <Text style={s.role}>{o.role}</Text>
                      </View>
                    </View>
                    <P>{o.usage}</P>
                    <View style={s.conseil}>
                      <Text style={s.conseilTitre}>Le conseil</Text>
                      <Text style={s.conseilTxt}>{o.conseil}</Text>
                    </View>
                  </Card>
                ))}
              </View>
            );
          })
        : [true, false].map((inc) => {
            const items = verres.filter((v) => v.incontournable === inc);
            if (!items.length) return null;
            return (
              <View key={String(inc)} style={{ gap: S.md }}>
                <Titre>{inc ? 'Les incontournables' : 'Les complémentaires'}</Titre>
                {items.map((v) => {
                  const cocktails = COCKTAILS.filter((c) => c.verre === v.nom);
                  return (
                    <Card key={v.nom}>
                      <View style={s.tete}>
                        <View style={s.visuel}>
                          <Verre verre={v.nom} couleur={cocktails[0]?.couleur ?? C.accent} decor={cocktails[0]?.decor} taille={56} />
                        </View>
                        <View style={{ flex: 1, gap: 4, alignItems: 'flex-start' }}>
                          <Text style={s.nom}>{v.nom}</Text>
                          <Tag>{v.contenance}</Tag>
                        </View>
                      </View>
                      <P>{v.usage}</P>
                      {cocktails.length ? (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
                          {cocktails.map((c) => (
                            <Chip key={c.id} label={c.nom} onPress={() => router.push(`/cocktail/${c.id}`)} />
                          ))}
                        </View>
                      ) : null}
                    </Card>
                  );
                })}
              </View>
            );
          })}

      {(vue === 'outils' ? outils : verres).length === 0 ? <P muted>Aucun résultat pour cette recherche.</P> : null}

      <Card>
        <Titre>Les bons gestes</Titre>
        <Rubriques items={ENTRETIEN} />
      </Card>
      <P muted>Liste établie d’après les parties 5 et 6 du socle. Contenances indicatives, variables selon les fabricants.</P>
    </Page>
  );
}

const s = StyleSheet.create({
  tete: { flexDirection: 'row', alignItems: 'center', gap: S.md },
  visuel: { width: 84, height: 84, borderRadius: R.md, backgroundColor: C.accentDark, alignItems: 'center', justifyContent: 'center' },
  nom: { color: C.text, fontFamily: F.display, fontSize: 22, lineHeight: 26 },
  alias: { color: C.muted, fontSize: 13, fontStyle: 'italic' },
  role: { color: C.accent, fontSize: 14, fontWeight: '700', lineHeight: 19 },
  conseil: { backgroundColor: C.cardAlt, borderRadius: R.sm + 2, padding: S.md, gap: 2 },
  conseilTitre: { color: C.accent, fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  conseilTxt: { color: C.text, fontSize: 14, lineHeight: 20 },
});
