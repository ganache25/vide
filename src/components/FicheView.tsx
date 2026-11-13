import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LIB_CATEGORIE, LIB_GLACE, LIB_METHODE, LIB_TYPE, type Fiche, type Ingredient, type Methode } from '../data/types';
import { allergenes } from '../lib/allergenes';
import { calculer, categorieDe, euro, libelleQuantite, nombre } from '../lib/calc';
import { choisirPhoto, supprimerPhoto, usePhoto } from '../lib/photos';
import { C, DEGRADE_SCENE, F, R, S } from '../theme';
import { Bulles, Compteur, Degrade } from './fx';
import { MethodeAnimee } from './MethodeAnimee';
import { Verre } from './Illustrations';
import { Card, ChampNombre, Chip, P, Tag, Titre, type IconName } from './ui';
import { Proportions } from './visuels';

export const ICONE_METHODE: Record<Methode, IconName> = {
  shaker: 'flask',
  'verre-melange': 'beaker',
  direct: 'wine',
};

function Meta({ label, valeur }: { label: string; valeur: string }) {
  return (
    <View style={s.meta}>
      <Text style={s.metaLabel}>{label}</Text>
      <Text style={s.metaValeur}>{valeur}</Text>
    </View>
  );
}

/** Quantité multipliée pour une préparation en nombre : passe en litres au-delà de 1 000 ml. */
function quantiteBatch(i: Ingredient, n: number): string {
  if (i.qte == null) return '';
  const total = i.qte * n;
  if (i.unite === 'ml' && total >= 1000) return `${nombre(total / 1000, 2)} L`;
  return libelleQuantite({ ...i, qte: Math.round(total * 10) / 10 });
}

const PETILLANT = /champagne|prosecco|effervescent|gazeuse|ginger|soda|tonic|bière|cidre/i;

/** Grande scène d'en-tête : la photo de l'utilisateur, ou le verre dessiné qui se remplit. */
function Scene({ fiche, scrollY }: { fiche: Fiche; scrollY?: Animated.Value }) {
  const insets = useSafeAreaInsets();
  const photo = usePhoto(fiche.id);
  const [erreur, setErreur] = useState('');
  const y = scrollY ?? new Animated.Value(0);
  const petillant = fiche.ingredients.some((i) => PETILLANT.test(i.nom));
  return (
    <View style={[s.scene, { paddingTop: insets.top + 46 }]}>
      <Degrade couleurs={DEGRADE_SCENE} style={StyleSheet.absoluteFill} />
      {photo ? (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [
                { translateY: y.interpolate({ inputRange: [-200, 0, 300], outputRange: [-40, 0, 90], extrapolate: 'clamp' }) },
                { scale: y.interpolate({ inputRange: [-200, 0], outputRange: [1.35, 1.05], extrapolateRight: 'clamp' }) },
              ],
            },
          ]}>
          <Image source={{ uri: photo }} style={StyleSheet.absoluteFill} resizeMode="cover" accessibilityLabel={`Photo du cocktail ${fiche.nom}`} />
        </Animated.View>
      ) : (
        <>
          <Bulles nombre={7} />
          <View style={s.halo} />
          <Animated.View
            style={{
              opacity: y.interpolate({ inputRange: [0, 240], outputRange: [1, 0.2], extrapolate: 'clamp' }),
              transform: [
                { translateY: y.interpolate({ inputRange: [-200, 0, 300], outputRange: [-30, 0, 70], extrapolate: 'clamp' }) },
                { scale: y.interpolate({ inputRange: [-200, 0], outputRange: [1.3, 1], extrapolateRight: 'clamp' }) },
              ],
            }}>
            <Verre verre={fiche.verre} couleur={fiche.couleur} taille={170} anime riche bulles={petillant} garniture={fiche.garniture} trait="#F8E9ED" />
          </Animated.View>
        </>
      )}
      <View style={s.sceneActions}>
        {photo ? (
          <Pressable
            onPress={() => void supprimerPhoto(fiche.id)}
            accessibilityRole="button"
            accessibilityLabel="Retirer la photo"
            style={s.sceneBouton}>
            <Ionicons name="trash-outline" size={17} color="#FFFFFF" />
          </Pressable>
        ) : null}
        <Pressable
          onPress={async () => setErreur((await choisirPhoto(fiche.id)) ?? '')}
          accessibilityRole="button"
          accessibilityLabel={photo ? 'Changer la photo' : 'Ajouter une photo'}
          style={s.sceneBouton}>
          <Ionicons name="camera-outline" size={18} color="#FFFFFF" />
          <Text style={s.sceneBoutonTxt}>{photo ? 'Changer' : 'Ma photo'}</Text>
        </Pressable>
      </View>
      {erreur ? <Text style={s.sceneErreur}>{erreur}</Text> : null}
    </View>
  );
}

export function FicheView({ fiche, scrollY }: { fiche: Fiche; scrollY?: Animated.Value }) {
  const [verres, setVerres] = useState(1);
  const c = calculer(fiche.ingredients, fiche.ratio);
  const tav = fiche.tavOfficiel ?? Math.round(c.tav);
  const all = allergenes(fiche);
  const n = Math.max(1, verres);

  return (
    <>
      <Scene fiche={fiche} scrollY={scrollY} />

      <View style={{ gap: S.sm }}>
        <Text style={s.nom}>{fiche.nom}</Text>
        {fiche.descripteurs ? <Text style={s.desc}>{fiche.descripteurs}</Text> : null}
        <View style={s.tags}>
          <Tag>{LIB_CATEGORIE[categorieDe(fiche)]}</Tag>
          <Tag>{LIB_TYPE[fiche.type]}</Tag>
          <Tag>{LIB_METHODE[fiche.methode]}</Tag>
        </View>
      </View>

      <View style={s.chiffres}>
        <Degrade style={StyleSheet.absoluteFill} />
        <View style={s.chiffre}>
          <Compteur valeur={tav} suffixe=" %" style={s.chiffreValeur} />
          <Text style={s.chiffreLabel}>TAV</Text>
        </View>
        <View style={s.sep} />
        <View style={s.chiffre}>
          <Compteur valeur={c.volume} suffixe=" ml" style={s.chiffreValeur} />
          <Text style={s.chiffreLabel}>Contenance</Text>
        </View>
        <View style={s.sep} />
        <View style={s.chiffre}>
          <Compteur valeur={c.coutMatiere} decimales={2} suffixe=" €" style={s.chiffreValeur} />
          <Text style={s.chiffreLabel}>Coût HT</Text>
        </View>
      </View>

      {fiche.historique ? (
        <Card>
          <Titre>Historique</Titre>
          <P>{fiche.historique}</P>
        </Card>
      ) : null}

      <Card>
        <Titre droite={n > 1 ? <Tag>{n} verres</Tag> : undefined}>Ingrédients</Titre>
        <View>
          {fiche.ingredients.map((i, k) => (
            <View key={k} style={[s.ing, k === fiche.ingredients.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={s.ingQte}>{quantiteBatch(i, n)}</Text>
              <Text style={s.ingNom}>{i.nom}</Text>
            </View>
          ))}
        </View>
        <Proportions ingredients={fiche.ingredients} />
        <View style={s.batch}>
          <View style={s.batchTete}>
            <Ionicons name="layers-outline" size={18} color={C.accent} />
            <Text style={s.batchLabel}>Nombre de verres à préparer</Text>
          </View>
          <View style={s.batchChips}>
            {[1, 4, 10, 20].map((v) => (
              <Chip key={v} label={String(v)} actif={n === v} onPress={() => setVerres(v)} />
            ))}
            <ChampNombre
              label="Nombre de verres"
              valeur={verres}
              onChange={(v) => setVerres(Math.min(500, Math.round(v ?? 1)))}
              style={{ width: 60, paddingVertical: 7, fontSize: 14 }}
            />
          </View>
        </View>
        {n > 1 ? (
          <P muted>
            Total : {c.volume * n >= 1000 ? `${nombre((c.volume * n) / 1000, 2)} L` : `${nombre(c.volume * n)} ml`} avant
            dilution · coût matière {euro(c.coutMatiere * n)} HT. Pour un pré-batch, garder à part les jus frais, les
            produits effervescents et les émulsifiants.
          </P>
        ) : null}
      </Card>

      <Card>
        <Titre>Service</Titre>
        <View style={s.metas}>
          <Meta label="Méthode" valeur={LIB_METHODE[fiche.methode]} />
          <Meta label="Verre" valeur={fiche.verre} />
          <Meta label="Glace" valeur={LIB_GLACE[fiche.glace]} />
          <Meta label="Garniture" valeur={fiche.garniture || '/'} />
        </View>
      </Card>

      <Card>
        <Titre>Technique</Titre>
        <MethodeAnimee fiche={fiche} />
        <View style={{ gap: S.md }}>
          {fiche.technique.map((t, k) => (
            <View key={k} style={s.etape}>
              <View style={s.etapeNum}>
                <Text style={s.etapeNumTxt}>{k + 1}</Text>
              </View>
              <Text style={s.etapeTxt}>{t}</Text>
            </View>
          ))}
        </View>
      </Card>

      {fiche.variantes.length ? (
        <Card>
          <Titre>Variantes</Titre>
          {fiche.variantes.map((v) => (
            <View key={v.nom} style={{ gap: 2 }}>
              <Text style={s.varNom}>{v.nom}</Text>
              <P>{v.texte}</P>
            </View>
          ))}
        </Card>
      ) : null}

      {fiche.nb.length ? (
        <Card style={{ backgroundColor: C.accentDark, boxShadow: 'none' }}>
          <Titre>N.B.</Titre>
          {fiche.nb.map((x) => (
            <P key={x}>{x}</P>
          ))}
        </Card>
      ) : null}

      {fiche.notes ? (
        <Card>
          <Titre>Notes</Titre>
          <P>{fiche.notes}</P>
        </Card>
      ) : null}

      <Card>
        <Titre>Allergènes à signaler</Titre>
        {all.length ? (
          <View style={s.tags}>
            {all.map((a) => (
              <Tag key={a}>{a}</Tag>
            ))}
          </View>
        ) : (
          <P>Aucun allergène repéré dans la liste des ingrédients.</P>
        )}
        <P muted>Repérage indicatif d’après le nom des ingrédients : vérifiez toujours l’étiquette des produits utilisés.</P>
      </Card>

      <Card>
        <Titre>Chiffres</Titre>
        <View style={s.metas}>
          {fiche.tavOfficiel != null ? <Meta label="TAV publié (socle)" valeur={`${fiche.tavOfficiel} %`} /> : null}
          <Meta label="TAV calculé" valeur={`${nombre(c.tav, 1)} %`} />
          <Meta label="Alcool pur" valeur={`${nombre(c.alcoolPur, 1)} g`} />
          <Meta label="Verres standard" valeur={nombre(c.verresStandard, 1)} />
          <Meta label="Coût matière HT" valeur={euro(c.coutMatiere)} />
          <Meta label={`Prix TTC (ratio ${nombre(fiche.ratio)} %)`} valeur={euro(c.prixTTC)} />
        </View>
        <P muted>
          {fiche.source === 'socle'
            ? 'TAV calculé et coûts indicatifs établis avec la mercuriale du socle (décoration comptée à 10 % du coût matière) ; le TAV publié peut s’en écarter selon les produits retenus.'
            : `Décoration comptée à 10 % du coût matière. Prix de vente HT ${euro(c.prixHT)}, TVA ${c.tva} %.`}
        </P>
      </Card>
    </>
  );
}

const s = StyleSheet.create({
  scene: {
    height: 330,
    marginHorizontal: -(S.lg + 2),
    marginTop: -(S.lg + 2),
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: '#FFFFFF', opacity: 0.07 },
  sceneActions: { position: 'absolute', right: S.lg, bottom: S.lg, flexDirection: 'row', gap: S.sm },
  sceneBouton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.32)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  sceneBoutonTxt: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  sceneErreur: { position: 'absolute', left: S.lg, right: S.lg, top: 100, color: '#FFFFFF', backgroundColor: 'rgba(0,0,0,0.5)', padding: S.sm, borderRadius: 10, fontSize: 13, textAlign: 'center' },
  nom: { color: C.text, fontFamily: F.display, fontSize: 40, lineHeight: 46 },
  desc: { color: C.accent, fontSize: 17, fontStyle: 'italic' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: S.sm, marginTop: S.xs },
  chiffres: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.accent,
    borderRadius: R.lg,
    paddingVertical: S.lg,
    overflow: 'hidden',
    boxShadow: '0 12px 28px rgba(122, 31, 61, 0.26)',
  },
  chiffre: { flex: 1, alignItems: 'center', gap: 2 },
  chiffreValeur: { color: '#FFFFFF', fontFamily: F.display, fontSize: 22 },
  chiffreLabel: { color: '#F3D5DD', fontSize: 12 },
  sep: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.22)' },
  ing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: S.md,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  ingQte: { color: C.accent, fontSize: 16, fontWeight: '700', width: 104, fontVariant: ['tabular-nums'] },
  ingNom: { color: C.text, fontSize: 16, flex: 1 },
  batch: { gap: S.sm + 2, backgroundColor: C.cardAlt, borderRadius: R.md, padding: S.md + 2 },
  batchTete: { flexDirection: 'row', alignItems: 'center', gap: S.sm },
  batchLabel: { color: C.text, fontSize: 14, fontWeight: '600' },
  batchChips: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: S.sm },
  metas: { flexDirection: 'row', flexWrap: 'wrap', rowGap: S.md },
  meta: { width: '50%', paddingRight: S.sm, gap: 2 },
  metaLabel: { color: C.muted, fontSize: 12 },
  metaValeur: { color: C.text, fontSize: 16, fontWeight: '600' },
  etape: { flexDirection: 'row', gap: S.md, alignItems: 'flex-start' },
  etapeNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: C.accentDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etapeNumTxt: { color: C.accent, fontSize: 13, fontWeight: '700' },
  etapeTxt: { color: C.text, fontSize: 15, lineHeight: 22, flex: 1, paddingTop: 2 },
  varNom: { color: C.accent, fontSize: 15, fontWeight: '700' },
});
