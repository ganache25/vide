import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Bouton, Card, Champ, ChampNombre, Chips, P, Page, Recherche, Titre, confirmer } from '../../components/ui';
import { FAMILLES_PRODUITS, PRODUIT_PAR_ID, type Produit } from '../../data/produits';
import {
  ajouterProduit,
  majProduitPerso,
  nouvelId,
  supprimerProduit,
  surchargerProduit,
  useMercuriale,
} from '../../lib/store';
import { normaliser } from '../../lib/texte';
import { C, S } from '../../theme';

function LigneProduit({ p, modifie, perso }: { p: Produit; modifie: boolean; perso: boolean }) {
  const estMl = p.unite === 'ml';
  const maj = (patch: { prix?: number; tav?: number }) =>
    void (perso ? majProduitPerso(p.id, patch) : surchargerProduit(p.id, patch));
  return (
    <View style={s.ligne}>
      <View style={s.tete}>
        <Text style={s.nom}>{p.nom}</Text>
        {modifie ? (
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={`Rétablir le prix indicatif de ${p.nom}`}
            onPress={() => void surchargerProduit(p.id, null)}>
            <Ionicons name="refresh-circle" size={24} color={C.accent} />
          </Pressable>
        ) : null}
        {perso ? (
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={`Supprimer ${p.nom}`}
            onPress={() =>
              confirmer('Supprimer ce produit ?', `« ${p.nom} » sera retiré de votre mercuriale.`, () =>
                void supprimerProduit(p.id),
              )
            }>
            <Ionicons name="trash-outline" size={20} color={C.danger} />
          </Pressable>
        ) : null}
      </View>
      <View style={s.champs}>
        {estMl ? (
          <View style={s.champ}>
            <Text style={s.label}>TAV %</Text>
            <ChampNombre label={`TAV de ${p.nom}`} valeur={p.tav} onChange={(v) => maj({ tav: Math.min(100, v ?? 0) })} style={s.petit} />
          </View>
        ) : null}
        <View style={s.champ}>
          <Text style={s.label}>{estMl ? '€ HT / cl' : `€ HT / ${p.unite}`}</Text>
          <ChampNombre
            label={`Prix de ${p.nom}`}
            valeur={Number((estMl ? p.prix * 10 : p.prix).toFixed(3))}
            onChange={(v) => maj({ prix: estMl ? (v ?? 0) / 10 : (v ?? 0) })}
            style={s.petit}
          />
        </View>
      </View>
    </View>
  );
}

export default function MaMercuriale() {
  const { mercuriale, catalogue } = useMercuriale();
  const [q, setQ] = useState('');
  const [nom, setNom] = useState('');
  const [famille, setFamille] = useState(FAMILLES_PRODUITS[0]);
  const [tav, setTav] = useState<number | null>(40);
  const [prixCl, setPrixCl] = useState<number | null>(null);
  const [erreur, setErreur] = useState('');

  const n = normaliser(q);
  const filtres = useMemo(() => catalogue.filter((p) => !n || normaliser(p.nom).includes(n)), [catalogue, n]);

  const ajouter = () => {
    if (!nom.trim()) return setErreur('Indiquez le nom du produit.');
    setErreur('');
    void ajouterProduit({
      id: `perso-${nouvelId()}`,
      nom: nom.trim(),
      famille,
      tav: tav ?? 0,
      prix: (prixCl ?? 0) / 10,
      unite: 'ml',
      dose: 20,
    });
    setNom('');
    setPrixCl(null);
  };

  return (
    <Page>
      <P muted>
        Les prix indicatifs viennent de la mercuriale du socle. Remplacez-les par vos prix d’achat HT : ils seront
        utilisés pour chaque nouvel ingrédient ajouté à une fiche et pour les revisites. Les fiches déjà enregistrées
        ne changent pas.
      </P>

      <Card>
        <Titre>Ajouter un produit</Titre>
        <Champ label="Nom" value={nom} onChangeText={setNom} placeholder="Ex. : Mezcal espadín" />
        <Chips<string> defilant valeur={famille} onChange={setFamille} options={FAMILLES_PRODUITS.map((f) => ({ v: f, l: f }))} />
        <View style={s.champs}>
          <View style={s.champ}>
            <Text style={s.label}>TAV %</Text>
            <ChampNombre label="TAV du nouveau produit" valeur={tav} onChange={setTav} style={s.petit} />
          </View>
          <View style={s.champ}>
            <Text style={s.label}>€ HT / cl</Text>
            <ChampNombre label="Prix au cl du nouveau produit" valeur={prixCl} onChange={setPrixCl} style={s.petit} />
          </View>
        </View>
        {erreur ? <Text style={{ color: C.danger, fontSize: 14 }}>{erreur}</Text> : null}
        <Bouton label="Ajouter à ma mercuriale" icone="add" variante="contour" onPress={ajouter} />
      </Card>

      <Recherche valeur={q} onChange={setQ} placeholder="Rechercher un produit…" />

      {[...FAMILLES_PRODUITS].map((fam) => {
        const items = filtres.filter((p) => p.famille === fam);
        if (!items.length) return null;
        return (
          <Card key={fam}>
            <Titre>{fam}</Titre>
            <View>
              {items.map((p) => (
                <LigneProduit
                  key={p.id}
                  p={p}
                  perso={!PRODUIT_PAR_ID[p.id]}
                  modifie={!!mercuriale.surcharges[p.id]}
                />
              ))}
            </View>
          </Card>
        );
      })}
      {!filtres.length ? <P muted>Aucun produit ne correspond.</P> : null}
    </Page>
  );
}

const s = StyleSheet.create({
  ligne: { paddingVertical: S.md, borderBottomWidth: 1, borderBottomColor: C.border, gap: S.sm },
  tete: { flexDirection: 'row', alignItems: 'center', gap: S.md },
  nom: { color: C.text, fontSize: 16, fontWeight: '600', flex: 1 },
  champs: { flexDirection: 'row', flexWrap: 'wrap', columnGap: S.lg, rowGap: S.sm },
  champ: { flexDirection: 'row', alignItems: 'center', gap: S.sm },
  label: { color: C.muted, fontSize: 12 },
  petit: { paddingVertical: 6, fontSize: 14, width: 76, minWidth: 0 },
});
