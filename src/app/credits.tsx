import { Linking, StyleSheet, Text, View } from 'react-native';

import { Card, GrandTitre, P, Page, Touche } from '../components/ui';
import { ALCOOL_PAR_ID } from '../data/alcools';
import { COCKTAIL_PAR_ID } from '../data/cocktails';
import { PHOTOS } from '../data/photos';
import { C, S } from '../theme';

const sujet = (cle: string) => (cle.startsWith('p-') ? ALCOOL_PAR_ID[cle.slice(2)]?.nom : COCKTAIL_PAR_ID[cle]?.nom) ?? cle;

export default function Credits() {
  return (
    <Page>
      <GrandTitre sousTitre="Auteurs et licences des photos d’illustration.">Crédits photo</GrandTitre>
      <P muted>
        Les photos proviennent de Wikimedia Commons et sont publiées sous licences libres. Elles ont été réduites pour
        l’application ; les photos sous licence « partage dans les mêmes conditions » restent diffusées sous leur
        licence d’origine. Touchez une ligne pour ouvrir la page source.
      </P>
      <Card>
        {Object.entries(PHOTOS).map(([cle, ph]) => (
          <Touche key={cle} onPress={() => void Linking.openURL(ph.source)} style={s.ligne}>
            <Text style={s.nom}>{sujet(cle)}</Text>
            <Text style={s.detail}>
              {ph.auteur} · {ph.licence}
            </Text>
          </Touche>
        ))}
      </Card>
      <View>
        <P muted>Sources documentaires : Socle des cocktails de référence (édition 2025) pour les recettes et le guide.</P>
      </View>
    </Page>
  );
}

const s = StyleSheet.create({
  ligne: { paddingVertical: S.sm + 2, borderBottomWidth: 1, borderBottomColor: C.border, gap: 2 },
  nom: { color: C.text, fontSize: 15, fontWeight: '700' },
  detail: { color: C.muted, fontSize: 13, lineHeight: 18 },
});
