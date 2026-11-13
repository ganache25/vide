import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Verre } from '../components/Illustrations';
import { Bouton, Card, Champ, ChampNombre, Chips, P, Page, Recherche, Titre, st } from '../components/ui';
import { COCKTAIL_PAR_ID } from '../data/cocktails';
import { FAMILLES_PRODUITS, UNITES, type Produit } from '../data/produits';
import {
  LIB_CATEGORIE,
  TEINTES_COCKTAIL,
  VERRES,
  type Fiche,
  type Glace,
  type Ingredient,
  type Methode,
  type TypeCocktail,
} from '../data/types';
import { calculer, euro, nombre, techniqueType } from '../lib/calc';
import { appliquerMercuriale, enregistrerFiche, nouvelId, useFiches, useMercuriale } from '../lib/store';
import { normaliser } from '../lib/texte';
import { C, F, S } from '../theme';

const vierge = (): Fiche => ({
  id: nouvelId(),
  source: 'perso',
  nom: '',
  descripteurs: '',
  historique: '',
  type: 'allday',
  methode: 'shaker',
  verre: 'Coupe',
  glace: 'sans',
  ingredients: [],
  garniture: '',
  technique: techniqueType('shaker', 'Coupe', 'sans', ''),
  variantes: [],
  nb: [],
  notes: '',
  ratio: 20,
});

/** Copie une fiche (du socle ou personnelle) en nouvelle fiche personnelle. */
const copier = (f: Fiche, nom: string, baseId?: string): Fiche => ({
  ...f,
  id: nouvelId(),
  source: 'perso',
  nom,
  ingredients: f.ingredients.map((i) => ({ ...i })),
  technique: [...f.technique],
  variantes: [],
  nb: [],
  categorieOfficielle: undefined,
  // La garniture dessinée suit désormais le texte saisi, et non plus la fiche du socle.
  decor: undefined,
  tavOfficiel: undefined,
  baseId,
  updatedAt: undefined,
});

const pas = (i: Ingredient) => (i.unite === 'ml' ? 5 : 1);

function LigneIngredient({
  ing,
  onChange,
  onRemove,
}: {
  ing: Ingredient;
  onChange: (i: Ingredient) => void;
  onRemove: () => void;
}) {
  const estMl = ing.unite === 'ml';
  const uniteSuivante = () => {
    const k = UNITES.indexOf(ing.unite);
    onChange({ ...ing, unite: UNITES[(k + 1) % UNITES.length] });
  };
  return (
    <View style={s.ing}>
      <View style={s.ingTete}>
        <TextInput
          value={ing.nom}
          onChangeText={(nom) => onChange({ ...ing, nom })}
          placeholder="Ingrédient"
          placeholderTextColor={C.muted}
          accessibilityLabel="Nom de l’ingrédient"
          style={s.ingNom}
        />
        <Pressable onPress={onRemove} hitSlop={10} accessibilityLabel={`Retirer ${ing.nom}`}>
          <Ionicons name="close-circle" size={24} color={C.muted} />
        </Pressable>
      </View>
      <View style={s.ingCorps}>
        <Pressable
          style={s.rond}
          accessibilityLabel="Diminuer la quantité"
          onPress={() => onChange({ ...ing, qte: Math.max(0, (ing.qte ?? 0) - pas(ing)) })}>
          <Ionicons name="remove" size={20} color={C.accent} />
        </Pressable>
        <ChampNombre label="Quantité" valeur={ing.qte} onChange={(qte) => onChange({ ...ing, qte })} style={{ flex: 1, minWidth: 0 }} />
        <Pressable
          style={s.rond}
          accessibilityLabel="Augmenter la quantité"
          onPress={() => onChange({ ...ing, qte: (ing.qte ?? 0) + pas(ing) })}>
          <Ionicons name="add" size={20} color={C.accent} />
        </Pressable>
        <Pressable onPress={uniteSuivante} style={s.unite} accessibilityLabel={`Unité : ${ing.unite}, toucher pour changer`}>
          <Text style={s.uniteTxt}>{ing.unite}</Text>
          <Ionicons name="swap-vertical" size={14} color={C.muted} />
        </Pressable>
      </View>
      <View style={s.ingDetails}>
        {estMl ? (
          <View style={s.detail}>
            <Text style={s.detailLabel}>TAV %</Text>
            <ChampNombre
              label="TAV en pourcentage"
              valeur={ing.tav}
              onChange={(v) => onChange({ ...ing, tav: Math.min(100, v ?? 0) })}
              style={s.petit}
            />
          </View>
        ) : null}
        <View style={s.detail}>
          <Text style={s.detailLabel}>{estMl ? '€ HT / cl' : `€ HT / ${ing.unite}`}</Text>
          <ChampNombre
            label="Prix hors taxes"
            valeur={Number((estMl ? ing.prix * 10 : ing.prix).toFixed(3))}
            onChange={(v) => onChange({ ...ing, prix: estMl ? (v ?? 0) / 10 : (v ?? 0) })}
            style={s.petit}
          />
        </View>
      </View>
    </View>
  );
}

function Selecteur({
  visible,
  onClose,
  onPick,
}: {
  visible: boolean;
  onClose: () => void;
  onPick: (i: Ingredient) => void;
}) {
  const [q, setQ] = useState('');
  const n = normaliser(q);
  const { catalogue } = useMercuriale();
  const resultats = useMemo(() => catalogue.filter((p) => !n || normaliser(p.nom).includes(n)), [catalogue, n]);
  const choisir = (p: Produit) => {
    onPick({ nom: p.nom, qte: p.dose, unite: p.unite, tav: p.tav, prix: p.prix, pid: p.id });
    setQ('');
  };
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={s.modalFond}>
        <View style={s.modal}>
          <View style={s.modalTete}>
            <Text style={s.modalTitre}>Ajouter un ingrédient</Text>
            <Pressable onPress={onClose} hitSlop={10} accessibilityLabel="Fermer">
              <Ionicons name="close" size={26} color={C.text} />
            </Pressable>
          </View>
          <Recherche valeur={q} onChange={setQ} placeholder="Gin, citron, sirop…" />
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ gap: S.md, paddingBottom: S.xl }}>
            {q.trim() ? (
              <Bouton
                label={`Ingrédient libre : « ${q.trim()} »`}
                icone="add"
                variante="contour"
                onPress={() => {
                  onPick({ nom: q.trim(), qte: 20, unite: 'ml', tav: 0, prix: 0 });
                  setQ('');
                }}
              />
            ) : null}
            {[...FAMILLES_PRODUITS, ...new Set(resultats.map((p) => p.famille).filter((f) => !FAMILLES_PRODUITS.includes(f)))].map((fam) => {
              const items = resultats.filter((p) => p.famille === fam);
              if (!items.length) return null;
              return (
                <View key={fam} style={{ gap: S.sm }}>
                  <Text style={st.titre}>{fam}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
                    {items.map((p) => (
                      <Pressable key={p.id} onPress={() => choisir(p)} style={st.chip} accessibilityRole="button">
                        <Text style={st.chipTxt}>
                          {p.nom}
                          {p.tav ? <Text style={{ color: C.muted }}>  {nombre(p.tav, p.tav % 1 ? 1 : 0)} %</Text> : null}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              );
            })}
            {!resultats.length && !q.trim() ? <P muted>Aucun ingrédient.</P> : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default function Editeur() {
  const { id, base, copie } = useLocalSearchParams<{ id?: string; base?: string; copie?: string }>();
  const router = useRouter();
  const { fiches, charge: fichesChargees } = useFiches();
  const { charge: mercurialeChargee } = useMercuriale();
  const charge = fichesChargees && mercurialeChargee;

  const [fiche, setFiche] = useState<Fiche | null>(null);
  // Tant que la technique n'a pas été retouchée à la main, elle suit méthode, verre, glace et garniture.
  const [techAuto, setTechAuto] = useState(true);
  const [selecteur, setSelecteur] = useState(false);
  const [erreur, setErreur] = useState('');
  const initialise = useRef(false);

  useEffect(() => {
    if (initialise.current || !charge) return;
    initialise.current = true;
    const existante = id ? fiches.find((f) => f.id === id) : undefined;
    const aCopier = copie ? fiches.find((f) => f.id === copie) : undefined;
    const socle = base ? COCKTAIL_PAR_ID[base] : undefined;
    if (existante) {
      setFiche(existante);
      setTechAuto(false);
    } else if (aCopier) {
      setFiche(copier(aCopier, `${aCopier.nom} (copie)`, aCopier.baseId));
      setTechAuto(false);
    } else if (socle) {
      // Une revisite reprend la recette du socle avec les prix de la mercuriale personnelle.
      setFiche({ ...copier(socle, `${socle.nom} revisité`, socle.id), ingredients: appliquerMercuriale(socle.ingredients) });
      setTechAuto(false);
    } else {
      setFiche(vierge());
    }
  }, [charge, fiches, id, base, copie]);

  if (!fiche) return <Page>{null}</Page>;

  const maj = (patch: Partial<Fiche>) => {
    setErreur('');
    setFiche((f) => {
      if (!f) return f;
      const suivant = { ...f, ...patch };
      const touche = 'methode' in patch || 'verre' in patch || 'glace' in patch || 'garniture' in patch;
      if (techAuto && touche) {
        suivant.technique = techniqueType(suivant.methode, suivant.verre, suivant.glace, suivant.garniture);
      }
      return suivant;
    });
  };
  const majIng = (k: number, ing: Ingredient) =>
    maj({ ingredients: fiche.ingredients.map((x, j) => (j === k ? ing : x)) });

  const c = calculer(fiche.ingredients, fiche.ratio);

  const enregistrer = async () => {
    if (!fiche.nom.trim()) return setErreur('Donnez un nom à la fiche avant de l’enregistrer.');
    if (!fiche.ingredients.length) return setErreur('Ajoutez au moins un ingrédient.');
    const propre: Fiche = {
      ...fiche,
      nom: fiche.nom.trim(),
      ingredients: fiche.ingredients.filter((i) => i.nom.trim()),
      technique: fiche.technique.map((t) => t.trim()).filter(Boolean),
    };
    try {
      await enregistrerFiche(propre);
    } catch {
      return setErreur('L’enregistrement a échoué : le stockage de l’appareil est indisponible.');
    }
    if (id) router.back();
    else router.replace(`/fiche/${propre.id}`);
  };

  return (
    <Page
      footer={
        <View style={{ gap: S.sm }}>
          <View style={s.resume}>
            <Resume label="Contenance" valeur={`${nombre(c.volume)} ml`} />
            <Resume label="TAV" valeur={`${nombre(c.tav, 1)} %`} />
            <Resume label="Coût HT" valeur={euro(c.coutMatiere)} />
            <Resume label="Prix TTC" valeur={euro(c.prixTTC)} />
          </View>
          {erreur ? <Text style={s.erreur}>{erreur}</Text> : null}
          <Bouton label="Enregistrer la fiche" icone="checkmark" onPress={() => void enregistrer()} />
        </View>
      }>
      <Stack.Screen options={{ title: id ? 'Modifier la fiche' : 'Nouvelle fiche' }} />

      <Card>
        <Champ label="Nom du cocktail" value={fiche.nom} onChangeText={(nom) => maj({ nom })} placeholder="Ex. : Basilic Collins" />
        <Champ
          label="Descripteurs (3 mots)"
          value={fiche.descripteurs}
          onChangeText={(descripteurs) => maj({ descripteurs })}
          placeholder="Ex. : Frais, acidulé et végétal"
        />
      </Card>

      <Card>
        <Titre
          droite={
            <Text style={s.compteur}>
              {fiche.ingredients.length} / 6 conseillés
            </Text>
          }>
          Ingrédients
        </Titre>
        {fiche.ingredients.map((ing, k) => (
          <LigneIngredient
            key={k}
            ing={ing}
            onChange={(i) => majIng(k, i)}
            onRemove={() => maj({ ingredients: fiche.ingredients.filter((_, j) => j !== k) })}
          />
        ))}
        <Bouton label="Ajouter un ingrédient" icone="add" variante="contour" onPress={() => setSelecteur(true)} />
        <P muted>
          Verser du moins cher au plus cher. Seuls les ingrédients en ml comptent dans la contenance et le TAV.
        </P>
      </Card>

      <Card>
        <Titre>Méthode</Titre>
        <Chips<Methode>
          valeur={fiche.methode}
          onChange={(methode) => maj({ methode })}
          options={[
            { v: 'shaker', l: 'Shaker' },
            { v: 'verre-melange', l: 'Verre à mélange' },
            { v: 'direct', l: 'Direct au verre' },
          ]}
        />
        <Titre>Verre</Titre>
        <Chips<string>
          defilant
          valeur={fiche.verre}
          onChange={(verre) => maj({ verre })}
          options={VERRES.map((v) => ({ v, l: v }))}
        />
        <Titre>Glace dans le verre</Titre>
        <Chips<Glace>
          valeur={fiche.glace}
          onChange={(glace) => maj({ glace })}
          options={[
            { v: 'sans', l: 'Sans glace' },
            { v: 'cubes', l: 'Glaçons' },
            { v: 'pilee', l: 'Glace pilée' },
          ]}
        />
        <Titre>Type</Titre>
        <Chips<TypeCocktail>
          valeur={fiche.type}
          onChange={(type) => maj({ type })}
          options={[
            { v: 'before', l: 'Before dinner' },
            { v: 'allday', l: 'All day' },
            { v: 'after', l: 'After dinner' },
          ]}
        />
        <Titre droite={<Verre verre={fiche.verre} couleur={fiche.couleur} garniture={fiche.garniture} taille={40} />}>Teinte du cocktail</Titre>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
          {TEINTES_COCKTAIL.map((t) => (
            <Pressable
              key={t}
              onPress={() => maj({ couleur: t })}
              accessibilityRole="button"
              accessibilityLabel={`Teinte ${t}`}
              accessibilityState={{ selected: fiche.couleur === t }}
              style={[s.teinte, { backgroundColor: t }, fiche.couleur === t && s.teinteActive]}
            />
          ))}
        </View>
        <Champ
          label="Garniture"
          value={fiche.garniture}
          onChangeText={(garniture) => maj({ garniture })}
          placeholder="Ex. : zeste de citron exprimé"
        />
      </Card>

      <Card>
        <Titre
          droite={
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setTechAuto(true);
                setFiche((f) =>
                  f ? { ...f, technique: techniqueType(f.methode, f.verre, f.glace, f.garniture) } : f,
                );
              }}>
              <Text style={s.lien}>Technique type</Text>
            </Pressable>
          }>
          Technique
        </Titre>
        <Champ
          multiline
          value={fiche.technique.join('\n')}
          onChangeText={(t) => {
            setTechAuto(false);
            setFiche((f) => (f ? { ...f, technique: t.split('\n') } : f));
          }}
          placeholder="Une étape par ligne"
          style={{ minHeight: 190 }}
        />
        <P muted>
          {techAuto
            ? 'Générée selon la méthode, le verre et la glace choisis. Une étape par ligne, modifiable.'
            : 'Une étape par ligne. « Technique type » la régénère depuis la méthode choisie.'}
        </P>
      </Card>

      <Card>
        <Titre>Prix de vente</Titre>
        <View style={s.ratio}>
          <Text style={s.ratioLabel}>Ratio matière visé (%)</Text>
          <ChampNombre label="Ratio matière en pourcentage" valeur={fiche.ratio} onChange={(v) => maj({ ratio: v ?? 0 })} />
        </View>
        <P muted>
          {LIB_CATEGORIE[c.categorie]} · {nombre(c.alcoolPur, 1)} g d’alcool pur ({nombre(c.verresStandard, 1)} verre
          standard) · ingrédients {euro(c.coutIngredients)} + décoration {euro(c.coutDecoration)} · prix HT{' '}
          {euro(c.prixHT)} · TVA {c.tva} %
        </P>
      </Card>

      <Card>
        <Champ
          label="Historique ou inspiration"
          multiline
          value={fiche.historique}
          onChangeText={(historique) => maj({ historique })}
        />
        <Champ label="Notes" multiline value={fiche.notes} onChangeText={(notes) => maj({ notes })} />
      </Card>

      <Selecteur
        visible={selecteur}
        onClose={() => setSelecteur(false)}
        onPick={(i) => {
          maj({ ingredients: [...fiche.ingredients, i] });
          setSelecteur(false);
        }}
      />
    </Page>
  );
}

function Resume({ label, valeur }: { label: string; valeur: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={s.resumeValeur}>{valeur}</Text>
      <Text style={s.resumeLabel}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  ing: { backgroundColor: C.cardAlt, borderRadius: 18, padding: S.md + 2, gap: S.sm },
  ingTete: { flexDirection: 'row', alignItems: 'center', gap: S.sm },
  ingNom: { flex: 1, color: C.text, fontSize: 16, fontWeight: '600', paddingVertical: 4 },
  ingCorps: { flexDirection: 'row', alignItems: 'center', gap: S.sm },
  rond: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.card,
  },
  unite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
  },
  uniteTxt: { color: C.text, fontSize: 14 },
  ingDetails: { flexDirection: 'row', flexWrap: 'wrap', columnGap: S.lg, rowGap: S.sm },
  detail: { flexDirection: 'row', alignItems: 'center', gap: S.sm },
  detailLabel: { color: C.muted, fontSize: 12 },
  petit: { paddingVertical: 5, fontSize: 14, width: 68, minWidth: 0, flexGrow: 0 },
  compteur: { color: C.muted, fontSize: 12 },
  teinte: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: C.border },
  teinteActive: { borderWidth: 3, borderColor: C.accent },
  lien: { color: C.accent, fontSize: 13, fontWeight: '600' },
  ratio: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: S.md },
  ratioLabel: { color: C.text, fontSize: 15, flex: 1 },
  resume: { flexDirection: 'row' },
  resumeValeur: { color: C.accent, fontSize: 17, fontWeight: '800', fontVariant: ['tabular-nums'] },
  resumeLabel: { color: C.muted, fontSize: 11 },
  erreur: { color: C.danger, fontSize: 14, textAlign: 'center' },
  modalFond: { flex: 1, backgroundColor: 'rgba(38, 22, 27, 0.45)', justifyContent: 'flex-end', alignItems: 'center' },
  modal: {
    width: '100%',
    maxWidth: 720,
    maxHeight: '88%',
    backgroundColor: C.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: S.lg,
    gap: S.md,
  },
  modalTete: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalTitre: { color: C.text, fontFamily: F.display, fontSize: 24 },
});
