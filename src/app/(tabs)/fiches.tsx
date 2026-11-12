import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

import { Bouton, Card, Ligne, P, Page, Recherche, Tag, Titre } from '../../components/ui';
import { COCKTAIL_PAR_ID } from '../../data/cocktails';
import { LIB_METHODE } from '../../data/types';
import { calculer, euro } from '../../lib/calc';
import { useFiches } from '../../lib/store';
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

  return (
    <Page>
      <Bouton label="Nouvelle fiche technique" icone="add" onPress={() => router.push('/editeur')} />

      {!charge ? null : fiches.length === 0 ? (
        <Card>
          <Titre>Aucune fiche pour l’instant</Titre>
          <P>
            Créez une fiche de zéro, ou ouvrez un cocktail du socle et touchez « Créer une revisite » : la
            recette, la technique et les coûts sont repris, il ne reste qu’à adapter.
          </P>
          <P muted>
            Le TAV, la catégorie, le coût matière et le prix de vente se calculent automatiquement pendant
            la saisie. Les fiches sont enregistrées sur cet appareil.
          </P>
        </Card>
      ) : (
        <>
          {fiches.length > 5 ? (
            <Recherche valeur={q} onChange={setQ} placeholder="Rechercher dans mes fiches…" />
          ) : null}
          <Card style={{ padding: 0, gap: 0, overflow: 'hidden' }}>
            {liste.map((f) => {
              const c = calculer(f.ingredients, f.ratio);
              const base = f.baseId ? COCKTAIL_PAR_ID[f.baseId] : undefined;
              return (
                <Ligne
                  key={f.id}
                  titre={f.nom || 'Sans nom'}
                  sousTitre={`${base ? `Revisite · ${base.nom} · ` : ''}${LIB_METHODE[f.methode]} · ${euro(c.coutMatiere)} HT`}
                  droite={<Tag>{Math.round(c.tav)} %</Tag>}
                  onPress={() => router.push(`/fiche/${f.id}`)}
                />
              );
            })}
          </Card>
          {liste.length === 0 ? <P muted>Aucune fiche ne correspond à cette recherche.</P> : null}
        </>
      )}
    </Page>
  );
}
