import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Verre } from '../../components/Illustrations';
import { Compteur } from '../../components/fx';
import { Bouton, Card, GrandTitre, Ligne, Liste, P, Page, Recherche, Tag, Titre } from '../../components/ui';
import { COCKTAIL_PAR_ID } from '../../data/cocktails';
import { LIB_METHODE } from '../../data/types';
import { calculer, euro } from '../../lib/calc';
import { exporterCarte } from '../../lib/pdf';
import { useFiches } from '../../lib/store';
import { C, F, OMBRE, R, S } from '../../theme';
import { normaliser } from '../../lib/texte';

export default function MesFiches() {
  const router = useRouter();
  const { fiches, charge } = useFiches();
  const [q, setQ] = useState('');

  const liste = useMemo(() => {
    const n = normaliser(q);
    if (!n) return fiches;
    return fiches.filter((f) => normaliser([f.nom, ...f.ingredients.map((i) => i.nom)].join(' ')).includes(n));
  }, [fiches, q]);

  const moyennes = useMemo(() => {
    if (!fiches.length) return { cout: 0, tav: 0 };
    const c = fiches.map((f) => calculer(f.ingredients, f.ratio));
    return {
      cout: c.reduce((t, x) => t + x.coutMatiere, 0) / c.length,
      tav: c.reduce((t, x) => t + x.tav, 0) / c.length,
    };
  }, [fiches]);

  return (
    <Page onglet>
      <GrandTitre sousTitre="Vos créations et vos revisites, chiffrées en direct.">Mes fiches</GrandTitre>
      <Bouton label="Nouvelle fiche technique" icone="add" onPress={() => router.push('/editeur')} />

      {!charge ? null : fiches.length === 0 ? (
        <Card>
          <Titre>Aucune fiche pour l’instant</Titre>
          <P>
            Créez une fiche de zéro, ou ouvrez un cocktail du socle et touchez « Créer une revisite » : la recette,
            la technique et les coûts sont repris, il ne reste qu’à adapter.
          </P>
          <P muted>
            Le TAV, la catégorie, le coût matière et le prix de vente se calculent pendant la saisie, avec les prix de
            votre mercuriale (onglet Outils). Les fiches sont enregistrées sur cet appareil.
          </P>
        </Card>
      ) : (
        <>
          <View style={st.tuiles}>
            <View style={st.tuile}>
              <Compteur valeur={fiches.length} style={st.valeur} />
              <Text style={st.label}>fiche{fiches.length > 1 ? 's' : ''}</Text>
            </View>
            <View style={st.tuile}>
              <Compteur valeur={moyennes.cout} decimales={2} suffixe=" €" style={st.valeur} />
              <Text style={st.label}>coût moyen HT</Text>
            </View>
            <View style={st.tuile}>
              <Compteur valeur={moyennes.tav} suffixe=" %" style={st.valeur} />
              <Text style={st.label}>TAV moyen</Text>
            </View>
          </View>
          <Bouton label="Exporter la carte (PDF)" icone="restaurant-outline" variante="contour" onPress={() => void exporterCarte(fiches)} />
          {fiches.length > 5 ? <Recherche valeur={q} onChange={setQ} placeholder="Rechercher dans mes fiches…" /> : null}
          <Liste>
            {liste.map((f, k) => {
              const c = calculer(f.ingredients, f.ratio);
              const base = f.baseId ? COCKTAIL_PAR_ID[f.baseId] : undefined;
              return (
                <Ligne
                  key={f.id}
                  delai={Math.min(k, 8) * 35}
                  visuel={<Verre verre={f.verre} couleur={f.couleur} garniture={f.garniture} taille={34} />}
                  titre={f.nom || 'Sans nom'}
                  sousTitre={`${base ? `Revisite · ${base.nom} · ` : ''}${LIB_METHODE[f.methode]} · ${euro(c.coutMatiere)} HT`}
                  droite={<Tag>{Math.round(c.tav)} %</Tag>}
                  onPress={() => router.push(`/fiche/${f.id}`)}
                />
              );
            })}
          </Liste>
          {liste.length === 0 ? <P muted>Aucune fiche ne correspond à cette recherche.</P> : null}
        </>
      )}
    </Page>
  );
}

const st = StyleSheet.create({
  tuiles: { flexDirection: 'row', gap: S.sm + 2 },
  tuile: { flex: 1, backgroundColor: C.card, borderRadius: R.md + 2, paddingVertical: S.lg, alignItems: 'center', gap: 2, boxShadow: OMBRE },
  valeur: { color: C.accent, fontFamily: F.display, fontSize: 24 },
  label: { color: C.muted, fontSize: 12 },
});
