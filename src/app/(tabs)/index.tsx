import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { Card, Chips, Ligne, P, Page, Recherche, Tag } from '../../components/ui';
import { COCKTAILS } from '../../data/cocktails';
import { LIB_METHODE, type Categorie, type Methode } from '../../data/types';
import { normaliser } from '../../lib/texte';
import { C, S } from '../../theme';

type FiltreCat = 'tous' | Categorie;
type FiltreMeth = 'toutes' | Methode;

export default function Socle() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<FiltreCat>('tous');
  const [meth, setMeth] = useState<FiltreMeth>('toutes');

  const liste = useMemo(() => {
    const n = normaliser(q);
    return COCKTAILS.filter((c) => {
      if (cat !== 'tous' && c.categorieOfficielle !== cat) return false;
      if (meth !== 'toutes' && c.methode !== meth) return false;
      if (!n) return true;
      const foin = normaliser(
        [c.nom, c.descripteurs, ...c.ingredients.map((i) => i.nom), ...c.variantes.map((v) => v.nom)].join(' '),
      );
      return foin.includes(n);
    });
  }, [q, cat, meth]);

  return (
    <Page>
      <Recherche valeur={q} onChange={setQ} placeholder="Cocktail, ingrédient, variante…" />
      <View style={{ gap: S.sm }}>
        <Chips<FiltreCat>
          valeur={cat}
          onChange={setCat}
          options={[
            { v: 'tous', l: 'Tous' },
            { v: 'short', l: 'Short drinks' },
            { v: 'long', l: 'Long drinks' },
          ]}
        />
        <Chips<FiltreMeth>
          valeur={meth}
          onChange={setMeth}
          options={[
            { v: 'toutes', l: 'Toutes méthodes' },
            { v: 'shaker', l: 'Shaker' },
            { v: 'verre-melange', l: 'Verre à mélange' },
            { v: 'direct', l: 'Direct au verre' },
          ]}
        />
      </View>

      <Text style={{ color: C.muted, fontSize: 13 }}>
        {liste.length} cocktail{liste.length > 1 ? 's' : ''} sur {COCKTAILS.length}
      </Text>

      {liste.length ? (
        <Card style={{ padding: 0, gap: 0, overflow: 'hidden' }}>
          {liste.map((c) => (
            <Ligne
              key={c.id}
              titre={c.nom}
              sousTitre={`${c.descripteurs} · ${LIB_METHODE[c.methode]} · ${c.verre}`}
              droite={<Tag>{c.tavOfficiel} %</Tag>}
              onPress={() => router.push(`/cocktail/${c.id}`)}
            />
          ))}
        </Card>
      ) : (
        <Card>
          <P muted>Aucun cocktail du socle ne correspond à cette recherche.</P>
        </Card>
      )}

      <P muted>
        Source : Socle des cocktails de référence, référentiel officiel des cocktails classiques (version finale
        12-2024, édition 2025), qui remplace le carnet de cocktails contemporains de l’APEB.
      </P>
    </Page>
  );
}
