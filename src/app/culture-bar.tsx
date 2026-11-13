import { StyleSheet, Text, View } from 'react-native';

import { Verre } from '../components/Illustrations';
import { Card, Depliant, GrandTitre, P, Page, Rubriques, Tag, Titre } from '../components/ui';
import { Frise } from '../components/visuels';
import { BARS, BRIGADE, EPOQUES, FIGURES, FRISE_BAR, LIVRES, REPERES_METIER, SERVICE, TYPES_BARS } from '../data/cultureBar';
import { C, F, S } from '../theme';

export default function CultureBar() {
  return (
    <Page>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: S.md }}>
        <View style={{ flex: 1 }}>
          <GrandTitre sousTitre="D’où vient le métier, qui l’a façonné, comment il s’exerce.">Culture bar</GrandTitre>
        </View>
        <Verre verre="Coupe" couleur="#E0607E" taille={72} anime />
      </View>

      <Card>
        <Titre>Deux siècles de cocktail</Titre>
        <Frise dates={FRISE_BAR} />
      </Card>

      <Depliant icone="hourglass" titre="Les grandes époques">
        <Rubriques items={EPOQUES} />
      </Depliant>

      <View style={{ gap: S.md }}>
        <Titre>Les grandes figures</Titre>
        {FIGURES.map((f) => (
          <Card key={f.nom}>
            <View style={s.tete}>
              <View style={s.medaillon}>
                <Text style={s.initiales}>
                  {f.nom
                    .split(' ')
                    .map((m) => m[0])
                    .slice(0, 2)
                    .join('')}
                </Text>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={s.nom}>{f.nom}</Text>
                <Text style={s.epoque}>{f.epoque}</Text>
              </View>
            </View>
            <Text style={s.role}>{f.role}</Text>
            <P>{f.texte}</P>
          </Card>
        ))}
      </View>

      <Depliant icone="location" titre="Les bars mythiques">
        {BARS.map((b) => (
          <View key={b.nom} style={{ gap: 3 }}>
            <View style={s.ligne}>
              <Text style={s.sous}>{b.nom}</Text>
              <Tag>{b.ville}</Tag>
            </View>
            <Text style={s.epoque}>{b.annee}</Text>
            <P>{b.texte}</P>
          </View>
        ))}
      </Depliant>

      <Depliant icone="book" titre="Les livres fondateurs">
        {LIVRES.map((l) => (
          <View key={l.titre} style={{ gap: 3 }}>
            <Text style={s.sous}>{l.titre}</Text>
            <Text style={s.epoque}>
              {l.auteur} · {l.annee}
            </Text>
            <P>{l.texte}</P>
          </View>
        ))}
      </Depliant>

      <Depliant icone="people" titre="La brigade du bar">
        <Rubriques items={BRIGADE} />
      </Depliant>

      <Depliant icone="storefront" titre="Les types de bars">
        <Rubriques items={TYPES_BARS} />
      </Depliant>

      <Card>
        <Titre>Les étapes du service</Titre>
        <View style={{ gap: S.md }}>
          {SERVICE.map((e, k) => (
            <View key={e} style={{ flexDirection: 'row', gap: S.md, alignItems: 'flex-start' }}>
              <View style={s.num}>
                <Text style={s.numTxt}>{k + 1}</Text>
              </View>
              <Text style={s.etape}>{e}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Depliant icone="ribbon" titre="Formation, associations et concours">
        <Rubriques items={REPERES_METIER} />
      </Depliant>
    </Page>
  );
}

const s = StyleSheet.create({
  tete: { flexDirection: 'row', alignItems: 'center', gap: S.md },
  medaillon: { width: 52, height: 52, borderRadius: 26, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  initiales: { color: C.onAccent, fontFamily: F.display, fontSize: 20 },
  nom: { color: C.text, fontFamily: F.display, fontSize: 22 },
  epoque: { color: C.muted, fontSize: 13 },
  role: { color: C.accent, fontSize: 15, fontWeight: '700', lineHeight: 21 },
  ligne: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: S.sm },
  sous: { color: C.text, fontSize: 16, fontWeight: '700', flex: 1 },
  num: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.accentDark, alignItems: 'center', justifyContent: 'center' },
  numTxt: { color: C.accent, fontSize: 13, fontWeight: '700' },
  etape: { color: C.text, fontSize: 15, lineHeight: 22, flex: 1, paddingTop: 2 },
});
