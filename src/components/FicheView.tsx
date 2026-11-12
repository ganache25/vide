import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { LIB_CATEGORIE, LIB_GLACE, LIB_METHODE, LIB_TYPE, type Fiche, type Methode } from '../data/types';
import { calculer, categorieDe, euro, libelleQuantite, nombre } from '../lib/calc';
import { C, S } from '../theme';
import { Card, P, Tag, Titre } from './ui';

export const ICONE_METHODE: Record<Methode, keyof typeof Ionicons.glyphMap> = {
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

export function FicheView({ fiche }: { fiche: Fiche }) {
  const c = calculer(fiche.ingredients, fiche.ratio);
  const tav = fiche.tavOfficiel ?? Math.round(c.tav);
  return (
    <>
      <View style={{ gap: S.sm }}>
        <Text style={s.nom}>{fiche.nom}</Text>
        {fiche.descripteurs ? <Text style={s.desc}>{fiche.descripteurs}</Text> : null}
        <View style={s.tags}>
          <Tag>{LIB_CATEGORIE[categorieDe(fiche)]}</Tag>
          <Tag>{LIB_TYPE[fiche.type]}</Tag>
          <Tag>{LIB_METHODE[fiche.methode]}</Tag>
          <Tag>TAV {tav} %</Tag>
        </View>
      </View>

      {fiche.historique ? (
        <Card>
          <Titre>Historique</Titre>
          <P>{fiche.historique}</P>
        </Card>
      ) : null}

      <Card>
        <Titre>Ingrédients</Titre>
        <View>
          {fiche.ingredients.map((i, k) => (
            <View key={k} style={s.ing}>
              <Text style={s.ingQte}>{libelleQuantite(i)}</Text>
              <Text style={s.ingNom}>{i.nom}</Text>
            </View>
          ))}
        </View>
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
        <View style={{ gap: S.sm }}>
          {fiche.technique.map((t, k) => (
            <View key={k} style={s.etape}>
              <Text style={s.etapeNum}>{k + 1}</Text>
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
        <Card>
          <Titre>N.B.</Titre>
          {fiche.nb.map((n) => (
            <P key={n}>{n}</P>
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
        <Titre>Chiffres</Titre>
        <View style={s.metas}>
          <Meta label="Contenance" valeur={`${nombre(c.volume)} ml`} />
          {fiche.tavOfficiel != null ? <Meta label="TAV publié (socle)" valeur={`${fiche.tavOfficiel} %`} /> : null}
          <Meta label="TAV calculé" valeur={`${nombre(c.tav, 1)} %`} />
          <Meta label="Alcool pur" valeur={`${nombre(c.alcoolPur, 1)} g`} />
          <Meta label="Verres standard" valeur={nombre(c.verresStandard, 1)} />
          <Meta label="Coût matière HT" valeur={euro(c.coutMatiere)} />
          <Meta label={`Prix TTC (ratio ${nombre(fiche.ratio)} %)`} valeur={euro(c.prixTTC)} />
        </View>
        <P muted>
          {fiche.source === 'socle'
            ? 'TAV calculé et coûts indicatifs établis avec la mercuriale du socle (décoration comptée à 10 % du coût matière) ; le TAV publié peut s’en écarter selon les produits retenus. Créez une revisite pour saisir vos propres prix.'
            : `Décoration comptée à 10 % du coût matière. Prix de vente HT ${euro(c.prixHT)}, TVA ${c.tva} %.`}
        </P>
      </Card>
    </>
  );
}

const s = StyleSheet.create({
  nom: { color: C.text, fontSize: 30, fontWeight: '800', letterSpacing: 0.5 },
  desc: { color: C.accent, fontSize: 16, fontStyle: 'italic' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: S.sm, marginTop: S.xs },
  ing: {
    flexDirection: 'row',
    gap: S.md,
    paddingVertical: 9,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  ingQte: { color: C.accent, fontSize: 16, fontWeight: '700', width: 104, fontVariant: ['tabular-nums'] },
  ingNom: { color: C.text, fontSize: 16, flex: 1 },
  metas: { flexDirection: 'row', flexWrap: 'wrap', rowGap: S.md },
  meta: { width: '50%', paddingRight: S.sm, gap: 2 },
  metaLabel: { color: C.muted, fontSize: 12 },
  metaValeur: { color: C.text, fontSize: 16, fontWeight: '600' },
  etape: { flexDirection: 'row', gap: S.md },
  etapeNum: { color: C.accent, fontSize: 15, fontWeight: '700', width: 20, textAlign: 'right' },
  etapeTxt: { color: C.text, fontSize: 15, lineHeight: 22, flex: 1 },
  varNom: { color: C.accent, fontSize: 15, fontWeight: '700' },
});
