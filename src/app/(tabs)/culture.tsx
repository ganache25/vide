import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Bouteille, Outil, Triangle3S, Verre } from '../../components/Illustrations';
import { Apparition, GrandTitre, Page, Touche } from '../../components/ui';
import { ALCOOLS, ARTICLES } from '../../data/alcools';
import { BARS, FIGURES, LIVRES } from '../../data/cultureBar';
import { OUTILS, VERRERIE_DETAIL } from '../../data/materiel';
import { C, F, OMBRE, R, S } from '../../theme';

function Rubrique({
  titre,
  texte,
  detail,
  visuel,
  onPress,
  delai,
}: {
  titre: string;
  texte: string;
  detail: string;
  visuel: ReactNode;
  onPress: () => void;
  delai: number;
}) {
  return (
    <Apparition delai={delai}>
      <Touche onPress={onPress} style={s.carte}>
        <View style={s.visuel}>{visuel}</View>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={s.titre}>{titre}</Text>
          <Text style={s.texte}>{texte}</Text>
          <Text style={s.detail}>{detail}</Text>
        </View>
      </Touche>
    </Apparition>
  );
}

export default function Culture() {
  const router = useRouter();
  return (
    <Page onglet>
      <GrandTitre sousTitre="Les produits, le métier, les outils et le référentiel.">Culture</GrandTitre>

      <Rubrique
        delai={0}
        titre="Culture produits"
        texte="Spiritueux, liqueurs, vins, bières et produits frais : histoire, élaboration, arômes."
        detail={`${ALCOOLS.length} fiches · ${ARTICLES.length} articles`}
        visuel={
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
            <Bouteille couleur="#C98A3C" taille={30} />
            <Bouteille couleur="#DCEAE4" taille={36} />
            <Bouteille couleur="#8E2F2A" taille={30} />
          </View>
        }
        onPress={() => router.push('/produits')}
      />
      <Rubrique
        delai={70}
        titre="Culture bar"
        texte="L’histoire du cocktail, les grandes figures, les bars mythiques, le métier."
        detail={`${FIGURES.length} figures · ${BARS.length} bars · ${LIVRES.length} livres`}
        visuel={<Verre verre="Martini" couleur="#E8EEE6" taille={74} />}
        onPress={() => router.push('/culture-bar')}
      />
      <Rubrique
        delai={140}
        titre="Matériel de bar"
        texte="Chaque outil et chaque verre : à quoi il sert, comment s’en servir."
        detail={`${OUTILS.length} outils · ${VERRERIE_DETAIL.length} verres`}
        visuel={
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Outil id="boston" taille={50} />
            <Outil id="doseur" taille={40} />
          </View>
        }
        onPress={() => router.push('/materiel')}
      />
      <Rubrique
        delai={210}
        titre="Guide du socle"
        texte="Bonnes pratiques, familles, méthodes, calcul du TAV et lexique professionnel."
        detail="Référentiel officiel, édition 2025"
        visuel={
          <View style={{ width: 100 }}>
            <Triangle3S />
          </View>
        }
        onPress={() => router.push('/guide')}
      />
    </Page>
  );
}

const s = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.lg,
    backgroundColor: C.card,
    borderRadius: R.lg + 4,
    padding: S.lg,
    boxShadow: OMBRE,
  },
  visuel: {
    width: 104,
    height: 104,
    borderRadius: R.lg,
    backgroundColor: C.accentDark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  titre: { color: C.text, fontFamily: F.display, fontSize: 23, lineHeight: 28 },
  texte: { color: C.muted, fontSize: 14, lineHeight: 20 },
  detail: { color: C.accent, fontSize: 12, fontWeight: '700', marginTop: 2 },
});
