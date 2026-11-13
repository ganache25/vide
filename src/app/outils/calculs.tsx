import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, ChampNombre, Chips, P, Page, Titre } from '../../components/ui';
import { euro, nombre } from '../../lib/calc';
import { C, S } from '../../theme';

type UniteVol = 'ml' | 'cl' | 'oz';
const EN_ML: Record<UniteVol, number> = { ml: 1, cl: 10, oz: 29.5735 };

function Champ({ label, valeur, onChange }: { label: string; valeur: number | null; onChange: (n: number | null) => void }) {
  return (
    <View style={s.champ}>
      <Text style={s.champLabel}>{label}</Text>
      <ChampNombre label={label} valeur={valeur} onChange={onChange} style={{ width: 96 }} />
    </View>
  );
}

function Resultat({ label, valeur, fort }: { label: string; valeur: string; fort?: boolean }) {
  return (
    <View style={s.resultat}>
      <Text style={s.resLabel}>{label}</Text>
      <Text style={[s.resValeur, fort && { color: C.accent, fontSize: 20 }]}>{valeur}</Text>
    </View>
  );
}

export default function Calculs() {
  const [prix, setPrix] = useState<number | null>(21);
  const [contenance, setContenance] = useState<number | null>(70);
  const [dose, setDose] = useState<number | null>(40);
  const [ratio, setRatio] = useState<number | null>(20);

  const [vol, setVol] = useState<number | null>(40);
  const [unite, setUnite] = useState<UniteVol>('ml');

  const ok = !!prix && !!contenance && !!dose;
  const prixCl = ok ? prix / contenance : 0;
  const coutDose = (prixCl * (dose ?? 0)) / 10;
  const doses = ok ? Math.floor((contenance * 10) / dose) : 0;
  const pvHT = ratio ? coutDose / (ratio / 100) : 0;

  const ml = (vol ?? 0) * EN_ML[unite];

  return (
    <Page>
      <Card>
        <Titre>Coût d’une dose</Titre>
        <Champ label="Prix d’achat de la bouteille (€ HT)" valeur={prix} onChange={setPrix} />
        <Champ label="Contenance (cl)" valeur={contenance} onChange={setContenance} />
        <Chips<string>
          valeur={String(contenance)}
          onChange={(v) => setContenance(Number(v))}
          options={['50', '70', '75', '100'].map((v) => ({ v, l: `${v} cl` }))}
        />
        <Champ label="Dose servie (ml)" valeur={dose} onChange={setDose} />
        <Chips<string>
          valeur={String(dose)}
          onChange={(v) => setDose(Number(v))}
          options={['20', '30', '40', '50', '60'].map((v) => ({ v, l: `${v} ml` }))}
        />
        <Champ label="Ratio matière visé (%)" valeur={ratio} onChange={setRatio} />
        {ok ? (
          <View style={s.bloc}>
            <Resultat label="Prix au cl" valeur={`${euro(prixCl)} HT`} />
            <Resultat label="Doses par bouteille" valeur={String(doses)} />
            <Resultat label="Coût de la dose" valeur={`${euro(coutDose)} HT`} fort />
            <Resultat label="Prix de vente HT" valeur={euro(pvHT)} />
            <Resultat label="Prix de vente TTC (TVA 20 %)" valeur={euro(pvHT * 1.2)} fort />
          </View>
        ) : (
          <P muted>Renseignez le prix, la contenance et la dose pour afficher le calcul.</P>
        )}
        <P muted>
          Coefficient multiplicateur correspondant : {ratio ? nombre(100 / ratio, 1) : '—'}. Le nombre de doses est
          théorique, sans perte ni surdosage.
        </P>
      </Card>

      <Card>
        <Titre>Convertisseur de volumes</Titre>
        <View style={s.champ}>
          <ChampNombre label="Volume à convertir" valeur={vol} onChange={setVol} style={{ width: 110 }} />
          <Chips<UniteVol>
            valeur={unite}
            onChange={setUnite}
            options={[
              { v: 'ml', l: 'ml' },
              { v: 'cl', l: 'cl' },
              { v: 'oz', l: 'oz' },
            ]}
          />
        </View>
        <View style={s.bloc}>
          <Resultat label="Millilitres" valeur={`${nombre(ml, 1)} ml`} />
          <Resultat label="Centilitres" valeur={`${nombre(ml / 10, 2)} cl`} />
          <Resultat label="Onces liquides (US)" valeur={`${nombre(ml / EN_ML.oz, 2)} oz`} />
          <Resultat label="Mesures de 40 ml" valeur={nombre(ml / 40, 2)} />
        </View>
        <P muted>
          1 once liquide américaine = 29,57 ml. La « mesure » est le standard français de 40 ml cité par le socle ; un
          trait représente environ 3 à 5 gouttes.
        </P>
      </Card>
    </Page>
  );
}

const s = StyleSheet.create({
  champ: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: S.md, flexWrap: 'wrap' },
  champLabel: { color: C.text, fontSize: 15, flex: 1, minWidth: 150 },
  bloc: { backgroundColor: C.cardAlt, borderRadius: 18, padding: S.lg, gap: S.sm + 2 },
  resultat: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: S.md },
  resLabel: { color: C.muted, fontSize: 14, flex: 1 },
  resValeur: { color: C.text, fontSize: 16, fontWeight: '700', fontVariant: ['tabular-nums'] },
});
