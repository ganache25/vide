import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LIB_CATEGORIE, LIB_GLACE, LIB_METHODE, LIB_TYPE, type Fiche, type Ingredient, type Methode } from '../data/types';
import { allergenes } from '../lib/allergenes';
import { calculer, categorieDe, euro, libelleQuantite, nombre } from '../lib/calc';
import { C, F, R, S } from '../theme';
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

function Chiffre({ valeur, label }: { valeur: string; label: string }) {
  return (
    <View style={s.chiffre}>
      <Text style={s.chiffreValeur}>{valeur}</Text>
      <Text style={s.chiffreLabel}>{label}</Text>
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

export function FicheView({ fiche }: { fiche: Fiche }) {
  const [verres, setVerres] = useState(1);
  const c = calculer(fiche.ingredients, fiche.ratio);
  const tav = fiche.tavOfficiel ?? Math.round(c.tav);
  const all = allergenes(fiche);
  const n = Math.max(1, verres);

  return (
    <>
      <View style={s.entete}>
        <View style={{ flex: 1, gap: S.sm }}>
          <Text style={s.nom}>{fiche.nom}</Text>
          {fiche.descripteurs ? <Text style={s.desc}>{fiche.descripteurs}</Text> : null}
          <View style={s.tags}>
            <Tag>{LIB_CATEGORIE[categorieDe(fiche)]}</Tag>
            <Tag>{LIB_TYPE[fiche.type]}</Tag>
            <Tag>{LIB_METHODE[fiche.methode]}</Tag>
          </View>
        </View>
        <View style={s.verre}>
          <Verre verre={fiche.verre} couleur={fiche.couleur} taille={84} anime />
        </View>
      </View>

      <View style={s.chiffres}>
        <Chiffre valeur={`${tav} %`} label="TAV" />
        <View style={s.sep} />
        <Chiffre valeur={`${nombre(c.volume)} ml`} label="Contenance" />
        <View style={s.sep} />
        <Chiffre valeur={euro(c.coutMatiere)} label="Coût HT" />
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
  entete: { flexDirection: 'row', alignItems: 'center', gap: S.md },
  verre: { backgroundColor: C.card, borderRadius: R.lg, paddingVertical: S.sm, paddingHorizontal: S.xs, boxShadow: '0 8px 28px rgba(86, 18, 42, 0.07)' },
  nom: { color: C.text, fontFamily: F.display, fontSize: 36, lineHeight: 42 },
  desc: { color: C.accent, fontSize: 17, fontStyle: 'italic' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: S.sm, marginTop: S.xs },
  chiffres: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.accent,
    borderRadius: R.lg,
    paddingVertical: S.lg,
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
