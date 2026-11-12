import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ICONE_METHODE } from '../../components/FicheView';
import { Verre } from '../../components/Illustrations';
import { Card, Chips, Hero, Ligne, Liste, P, Page, Recherche, Tag } from '../../components/ui';
import { COCKTAILS } from '../../data/cocktails';
import { LIB_METHODE, type Methode } from '../../data/types';
import { BASES, basesDe, type Base } from '../../lib/bases';
import { useFavoris } from '../../lib/store';
import { normaliser } from '../../lib/texte';
import { C, S } from '../../theme';

type FiltreCat = 'tous' | 'short' | 'long' | 'favoris';
type FiltreMeth = 'toutes' | Methode;
type FiltreBase = 'toutes' | Base;

export default function Socle() {
  const router = useRouter();
  const favoris = useFavoris();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<FiltreCat>('tous');
  const [meth, setMeth] = useState<FiltreMeth>('toutes');
  const [base, setBase] = useState<FiltreBase>('toutes');

  const liste = useMemo(() => {
    const n = normaliser(q);
    return COCKTAILS.filter((c) => {
      if (cat === 'favoris' ? !favoris.includes(c.id) : cat !== 'tous' && c.categorieOfficielle !== cat) return false;
      if (meth !== 'toutes' && c.methode !== meth) return false;
      if (base !== 'toutes' && !basesDe(c).includes(base)) return false;
      if (!n) return true;
      const foin = normaliser(
        [c.nom, c.descripteurs, ...c.ingredients.map((i) => i.nom), ...c.variantes.map((v) => v.nom)].join(' '),
      );
      return foin.includes(n);
    });
  }, [q, cat, meth, base, favoris]);

  return (
    <Page onglet>
      <Hero
        surtitre="Socle des cocktails de référence"
        titre="36 classiques, une seule référence"
        texte="Recettes en ml, techniques et variantes du référentiel officiel, prêtes à être revisitées.">
        <View style={s.stats}>
          <Stat n="18" l="short drinks" />
          <Stat n="18" l="long drinks" />
          <Stat n={String(favoris.length)} l={favoris.length > 1 ? 'favoris' : 'favori'} />
        </View>
      </Hero>

      <Recherche valeur={q} onChange={setQ} placeholder="Cocktail, ingrédient, variante…" />

      <View style={{ gap: S.sm + 2 }}>
        <Chips<FiltreCat>
          defilant
          valeur={cat}
          onChange={setCat}
          options={[
            { v: 'tous', l: 'Tous' },
            { v: 'short', l: 'Short drinks' },
            { v: 'long', l: 'Long drinks' },
            { v: 'favoris', l: 'Favoris', icone: 'heart' },
          ]}
        />
        <Chips<FiltreBase>
          defilant
          valeur={base}
          onChange={setBase}
          options={[{ v: 'toutes', l: 'Toutes bases' }, ...BASES]}
        />
        <Chips<FiltreMeth>
          defilant
          valeur={meth}
          onChange={setMeth}
          options={[
            { v: 'toutes', l: 'Toutes méthodes' },
            { v: 'shaker', l: 'Shaker', icone: ICONE_METHODE.shaker },
            { v: 'verre-melange', l: 'Verre à mélange', icone: ICONE_METHODE['verre-melange'] },
            { v: 'direct', l: 'Direct au verre', icone: ICONE_METHODE.direct },
          ]}
        />
      </View>

      <Text style={s.compte}>
        {liste.length} cocktail{liste.length > 1 ? 's' : ''} sur {COCKTAILS.length}
      </Text>

      {liste.length ? (
        <Liste>
          {liste.map((c, k) => (
            <Ligne
              key={c.id}
              delai={Math.min(k, 8) * 35}
              visuel={<Verre verre={c.verre} couleur={c.couleur} taille={30} />}
              titre={c.nom}
              sousTitre={`${c.descripteurs} · ${LIB_METHODE[c.methode]} · ${c.verre}`}
              droite={<Tag>{c.tavOfficiel} %</Tag>}
              onPress={() => router.push(`/cocktail/${c.id}`)}
            />
          ))}
        </Liste>
      ) : (
        <Card>
          <P>
            {cat === 'favoris' && !favoris.length
              ? 'Aucun favori pour l’instant : touchez le cœur en haut d’une fiche pour la retrouver ici.'
              : 'Aucun cocktail du socle ne correspond à ces critères.'}
          </P>
        </Card>
      )}

      <P muted>
        Source : Socle des cocktails de référence, référentiel officiel des cocktails classiques (version finale
        12-2024, édition 2025), qui remplace le carnet de cocktails contemporains de l’APEB.
      </P>
    </Page>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statN}>{n}</Text>
      <Text style={s.statL}>{l}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  stats: { flexDirection: 'row', gap: S.sm, marginTop: S.sm },
  stat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.13)', borderRadius: 16, paddingVertical: 10, alignItems: 'center' },
  statN: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  statL: { color: '#F3D5DD', fontSize: 12 },
  compte: { color: C.muted, fontSize: 13, fontWeight: '500' },
});
