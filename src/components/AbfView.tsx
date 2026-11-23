// Fiche de l'ABF (classeur « Liste des produits », 2020) rattachée à un produit, transcrite depuis le
// dossier fourni par l'utilisateur : sections dépliantes, étapes numérotées, listes et tableaux.

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import abf from '../data/abf.json';
import { C, R, S } from '../theme';
import { Card, Depliant, P, Tag, Titre } from './ui';

type Bloc =
  | { t: 'p'; texte: string }
  | { t: 'puce'; texte: string }
  | { t: 'etape'; n: number; texte: string; sous: string[] }
  | { t: 'table'; entete: string[]; lignes: string[][] };
type Fiche = { pages: string[]; sections: { titre: string; blocs: Bloc[] }[]; aVerifier?: string[] };

const FICHES = abf as unknown as Record<string, Fiche>;

export const aFicheABF = (id: string) => !!FICHES[id];

/** Met en valeur le libellé d'un paragraphe « Clé : valeur ». */
function Texte({ texte, style }: { texte: string; style?: object }) {
  const i = texte.indexOf(' : ');
  if (i > 0 && i < 45) {
    return (
      <Text style={[s.p, style]}>
        <Text style={s.cle}>{texte.slice(0, i)} : </Text>
        {texte.slice(i + 3)}
      </Text>
    );
  }
  return <Text style={[s.p, style]}>{texte}</Text>;
}

function Blocs({ blocs }: { blocs: Bloc[] }) {
  return (
    <View style={{ gap: S.sm + 2 }}>
      {blocs.map((b, k) => {
        if (b.t === 'p') return <Texte key={k} texte={b.texte} />;
        if (b.t === 'puce')
          return (
            <View key={k} style={s.puce}>
              <Text style={s.point}>•</Text>
              <Texte texte={b.texte} style={{ flex: 1 }} />
            </View>
          );
        if (b.t === 'etape')
          return (
            <View key={k} style={s.etape}>
              <View style={s.num}>
                <Text style={s.numTxt}>{b.n}</Text>
              </View>
              <View style={{ flex: 1, gap: 6 }}>
                <Texte texte={b.texte} />
                {b.sous.map((x, j) => (
                  <View key={j} style={s.puce}>
                    <Text style={s.point}>–</Text>
                    <Texte texte={x} style={{ flex: 1 }} />
                  </View>
                ))}
              </View>
            </View>
          );
        return (
          <View key={k} style={s.table}>
            <View style={[s.ligne, s.entete]}>
              {b.entete.map((c, j) => (
                <Text key={j} style={[s.cellule, s.enteteTxt, j === 0 && s.premiere]}>
                  {c}
                </Text>
              ))}
            </View>
            {b.lignes.map((l, j) => (
              <View key={j} style={[s.ligne, j % 2 === 1 && { backgroundColor: C.cardAlt }]}>
                {b.entete.map((_, c) => (
                  <Text key={c} style={[s.cellule, c === 0 && s.premiere]}>
                    {l[c] ?? ''}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

export function AbfView({ id }: { id: string }) {
  const f = FICHES[id];
  if (!f) return null;
  return (
    <Card>
      <Titre droite={<Tag>{f.pages.join(' · ')}</Tag>}>Fiche ABF</Titre>
      <P muted>
        Association des Barmen de France, classeur « Liste des produits » (mise à jour 2020), d’après le dossier
        MAF Barman 2027. Contenu repris tel quel, coquilles corrigées.
      </P>
      <View style={{ gap: S.sm }}>
        {f.sections.map((sec, k) => (
          <Depliant key={sec.titre} titre={sec.titre} ouvertParDefaut={k === 0}>
            <Blocs blocs={sec.blocs} />
          </Depliant>
        ))}
      </View>
      {f.aVerifier?.length ? (
        <View style={s.alerte}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: S.sm }}>
            <Ionicons name="alert-circle" size={18} color={C.accent} />
            <Text style={s.alerteTitre}>À vérifier ou mis à jour depuis 2020</Text>
          </View>
          {f.aVerifier.map((x) => (
            <View key={x} style={s.puce}>
              <Text style={s.point}>•</Text>
              <Text style={[s.p, { flex: 1 }]}>{x}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

const s = StyleSheet.create({
  p: { color: C.text, fontSize: 15, lineHeight: 22 },
  cle: { color: C.accent, fontWeight: '700' },
  puce: { flexDirection: 'row', gap: S.sm },
  point: { color: C.accent, fontSize: 15, lineHeight: 22, width: 10 },
  etape: { flexDirection: 'row', gap: S.md, alignItems: 'flex-start' },
  num: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.accentDark, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  numTxt: { color: C.accent, fontSize: 13, fontWeight: '700' },
  table: { borderRadius: R.sm, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  ligne: { flexDirection: 'row' },
  entete: { backgroundColor: C.accentDark },
  enteteTxt: { color: C.accent, fontWeight: '700' },
  cellule: { flex: 1, color: C.text, fontSize: 13, lineHeight: 18, paddingVertical: 7, paddingHorizontal: 8 },
  premiere: { flex: 1.3, fontWeight: '600' },
  alerte: { backgroundColor: C.accentDark, borderRadius: R.md, padding: S.md + 2, gap: S.sm },
  alerteTitre: { color: C.accent, fontSize: 14, fontWeight: '700' },
});
