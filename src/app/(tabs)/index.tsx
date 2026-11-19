import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ICONE_METHODE } from '../../components/FicheView';
import { vibrer } from '../../components/fx';
import { Verre } from '../../components/Illustrations';
import { Card, Chips, Hero, Ligne, Liste, P, Page, Recherche, Tag } from '../../components/ui';
import { COCKTAILS } from '../../data/cocktails';
import { CATEGORIES_IBA, COCKTAILS_HS, type CategorieIBA } from '../../data/cocktailsHorsSocle';
import { LIB_METHODE, type Methode } from '../../data/types';
import { BASES, basesDe, type Base } from '../../lib/bases';
import { calculer, categorieDe } from '../../lib/calc';
import { useFavoris } from '../../lib/store';
import { normaliser } from '../../lib/texte';
import { C, OMBRE, R, S } from '../../theme';

type Partie = 'socle' | 'hors';
type FiltreCat = 'tous' | 'short' | 'long' | 'favoris';
type FiltreIBA = 'toutes' | CategorieIBA;
type FiltreMeth = 'toutes' | Methode;
type FiltreBase = 'toutes' | Base;

export default function Socle() {
  const router = useRouter();
  const favoris = useFavoris();
  const [partie, setPartie] = useState<Partie>('socle');
  const [iba, setIba] = useState<FiltreIBA>('toutes');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<FiltreCat>('tous');
  const [meth, setMeth] = useState<FiltreMeth>('toutes');
  const [base, setBase] = useState<FiltreBase>('toutes');

  const liste = useMemo(() => {
    const n = normaliser(q);
    const source = partie === 'socle' ? COCKTAILS : COCKTAILS_HS;
    return source.filter((c) => {
      if (cat === 'favoris' ? !favoris.includes(c.id) : cat !== 'tous' && categorieDe(c) !== cat) return false;
      if (partie === 'hors' && iba !== 'toutes' && c.categorieIBA !== iba) return false;
      if (meth !== 'toutes' && c.methode !== meth) return false;
      if (base !== 'toutes' && !basesDe(c).includes(base)) return false;
      if (!n) return true;
      const foin = normaliser(
        [c.nom, c.descripteurs, ...c.ingredients.map((i) => i.nom), ...c.variantes.map((v) => v.nom)].join(' '),
      );
      return foin.includes(n);
    });
  }, [q, cat, meth, base, favoris, partie, iba]);

  return (
    <Page onglet>
      <View style={s.segment}>
        {(
          [
            ['socle', 'Socle', COCKTAILS.length],
            ['hors', 'Hors socle', COCKTAILS_HS.length],
          ] as const
        ).map(([v, l, n]) => (
          <Pressable
            key={v}
            onPress={() => {
              vibrer();
              setPartie(v);
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected: partie === v }}
            style={[s.segmentBouton, partie === v && s.segmentActif]}>
            <Text style={[s.segmentTxt, partie === v && s.segmentTxtActif]}>{l}</Text>
            <Text style={[s.segmentN, partie === v && s.segmentTxtActif]}>{n}</Text>
          </Pressable>
        ))}
      </View>

      <Hero
        surtitre={partie === 'socle' ? 'Socle des cocktails de référence' : 'Classiques internationaux · IBA'}
        titre={partie === 'socle' ? '36 classiques, une seule référence' : `${COCKTAILS_HS.length} classiques hors socle`}
        texte={
          partie === 'socle'
            ? 'Recettes en ml, techniques et variantes du référentiel officiel, prêtes à être revisitées.'
            : 'Les cocktails officiels de l’International Bartenders Association absents du socle : recettes de la liste IBA.'
        }>
        <View style={s.stats}>
          {partie === 'socle' ? (
            <>
              <Stat n="18" l="short drinks" />
              <Stat n="18" l="long drinks" />
            </>
          ) : (
            CATEGORIES_IBA.map((c) => <Stat key={c} n={String(COCKTAILS_HS.filter((x) => x.categorieIBA === c).length)} l={c.toLowerCase()} />)
          )}
          {partie === 'socle' ? <Stat n={String(favoris.length)} l={favoris.length > 1 ? 'favoris' : 'favori'} /> : null}
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
        {partie === 'hors' ? (
          <Chips<FiltreIBA>
            defilant
            valeur={iba}
            onChange={setIba}
            options={[{ v: 'toutes', l: 'Toutes catégories IBA' }, ...CATEGORIES_IBA.map((c) => ({ v: c, l: c }))]}
          />
        ) : null}
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
        {liste.length} cocktail{liste.length > 1 ? 's' : ''} sur {partie === 'socle' ? COCKTAILS.length : COCKTAILS_HS.length}
      </Text>

      {liste.length ? (
        <Liste>
          {liste.map((c, k) => (
            <Ligne
              key={c.id}
              delai={Math.min(k, 8) * 35}
              visuel={<Verre verre={c.verre} couleur={c.couleur} decor={c.decor} taille={34} />}
              titre={c.nom}
              sousTitre={`${c.descripteurs} · ${LIB_METHODE[c.methode]} · ${c.verre}`}
              droite={<Tag>{c.tavOfficiel ?? Math.round(calculer(c.ingredients, c.ratio).tav)} %</Tag>}
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
        {partie === 'socle'
          ? 'Source : Socle des cocktails de référence, référentiel officiel des cocktails classiques (version finale 12-2024, édition 2025), qui remplace le carnet de cocktails contemporains de l’APEB.'
          : 'Source : liste officielle des cocktails de l’IBA (International Bartenders Association, iba-world.com), traduite en français. Les historiques sont rédigés pour l’application ; TAV et coûts calculés avec une mercuriale indicative.'}
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
  segment: { flexDirection: 'row', backgroundColor: C.accentDark, borderRadius: R.pill, padding: 4 },
  segmentBouton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 11, borderRadius: R.pill },
  segmentActif: { backgroundColor: C.card, boxShadow: OMBRE },
  segmentTxt: { color: C.accent, fontSize: 15, fontWeight: '600' },
  segmentTxtActif: { color: C.accentDeep, fontWeight: '800' },
  segmentN: { color: C.accent, fontSize: 12, fontWeight: '700', opacity: 0.7 },
  stats: { flexDirection: 'row', gap: S.sm, marginTop: S.sm },
  stat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.13)', borderRadius: 16, paddingVertical: 10, alignItems: 'center' },
  statN: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  statL: { color: '#F3D5DD', fontSize: 12 },
  compte: { color: C.muted, fontSize: 13, fontWeight: '500' },
});
