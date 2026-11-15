// Carte des maisons d'un produit : fond de carte dessiné (contours Natural Earth, domaine public),
// un onglet par zone, repères numérotés cliquables et fiche de la maison sélectionnée.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Path, Rect, Text as T } from 'react-native-svg';

import type { Maison } from '../data/maisons';
import monde from '../data/monde.json';
import { C, F, R, S } from '../theme';
import { vibrer } from './fx';
import { Apparition, Chips, Touche } from './ui';

type Pays = { b: number[]; a: number[][] };
const PAYS = monde as Pays[];

// Villes repères, affichées quand elles tombent dans le cadre, pour situer la zone.
const VILLES: [string, number, number][] = [
  ['Paris', 48.86, 2.35], ['Bordeaux', 44.84, -0.58], ['Angoulême', 45.65, 0.16], ['Saintes', 45.75, -0.63], ['La Rochelle', 46.16, -1.15],
  ['Reims', 49.26, 4.03], ['Épernay', 49.04, 3.95], ['Troyes', 48.3, 4.07], ['Caen', 49.18, -0.37], ['Rouen', 49.44, 1.1], ['Lisieux', 49.15, 0.23],
  ['Auch', 43.65, 0.59], ['Mont-de-Marsan', 43.89, -0.5], ['Agen', 44.2, 0.62], ['Toulouse', 43.6, 1.44], ['Lyon', 45.76, 4.84], ['Marseille', 43.3, 5.37],
  ['Strasbourg', 48.58, 7.75], ['Dijon', 47.32, 5.04], ['Lille', 50.63, 3.06], ['Nantes', 47.22, -1.55], ['Perpignan', 42.7, 2.9], ['Brest', 48.39, -4.49],
  ['Londres', 51.51, -0.13], ['Édimbourg', 55.95, -3.19], ['Glasgow', 55.86, -4.25], ['Inverness', 57.48, -4.22], ['Dublin', 53.35, -6.26], ['Belfast', 54.6, -5.93], ['Cork', 51.9, -8.47],
  ['Amsterdam', 52.37, 4.9], ['Bruxelles', 50.85, 4.35], ['Turin', 45.07, 7.69], ['Milan', 45.46, 9.19], ['Venise', 45.44, 12.33], ['Rome', 41.9, 12.5], ['Palerme', 38.12, 13.36],
  ['Madrid', 40.42, -3.7], ['Barcelone', 41.39, 2.17], ['Séville', 37.39, -5.98], ['Cadix', 36.53, -6.29], ['Lisbonne', 38.72, -9.14], ['Porto', 41.15, -8.61],
  ['Varsovie', 52.23, 21.01], ['Stockholm', 59.33, 18.07], ['Helsinki', 60.17, 24.94], ['Copenhague', 55.68, 12.57], ['Oslo', 59.91, 10.75], ['Moscou', 55.75, 37.62],
  ['Berlin', 52.52, 13.4], ['Munich', 48.14, 11.58], ['Prague', 50.08, 14.44], ['Vienne', 48.21, 16.37], ['Zurich', 47.37, 8.54], ['Genève', 46.2, 6.14], ['Athènes', 37.98, 23.73],
  ['Tokyo', 35.68, 139.69], ['Osaka', 34.69, 135.5], ['Sapporo', 43.06, 141.35], ['Hiroshima', 34.39, 132.46], ['Niigata', 37.9, 139.02],
  ['Louisville', 38.25, -85.76], ['Nashville', 36.16, -86.78], ['Guadalajara', 20.67, -103.35], ['Oaxaca', 17.07, -96.72], ['Mexico', 19.43, -99.13],
  ['La Havane', 23.11, -82.37], ['Kingston', 17.97, -76.79], ['Fort-de-France', 14.6, -61.07], ['Pointe-à-Pitre', 16.24, -61.53], ['Bridgetown', 13.1, -59.61], ['Caracas', 10.48, -66.9],
  ['Saint-Denis', -20.88, 55.45], ['Port-Louis', -20.16, 57.5], ['Lima', -12.05, -77.04], ['La Serena', -29.9, -71.25], ['Santiago', -33.45, -70.67],
  ['São Paulo', -23.55, -46.63], ['Rio de Janeiro', -22.91, -43.17], ['Belo Horizonte', -19.92, -43.94], ['Recife', -8.05, -34.9], ['Fortaleza', -3.73, -38.52], ['Salvador', -12.97, -38.5],
];

const L = 340;
const H = 250;
const CercleAnime = Animated.createAnimatedComponent(Circle);

/** Cadre géographique d'une zone : englobe les sites avec une marge, au format de la carte. */
function cadre(sites: Maison[]) {
  let x0 = Math.min(...sites.map((s) => s.lon));
  let x1 = Math.max(...sites.map((s) => s.lon));
  let y0 = Math.min(...sites.map((s) => s.lat));
  let y1 = Math.max(...sites.map((s) => s.lat));
  const lat0 = (y0 + y1) / 2;
  const k = Math.cos((lat0 * Math.PI) / 180); // un degré de longitude est plus court loin de l'équateur
  let dy = Math.max(y1 - y0, 0.5) * 1.5;
  let dx = Math.max((x1 - x0) * k, 0.5) * 1.5;
  if (dx / dy < L / H) dx = (dy * L) / H;
  else dy = (dx * H) / L;
  const cx = (x0 + x1) / 2;
  x0 = cx - dx / k / 2;
  x1 = cx + dx / k / 2;
  y0 = lat0 - dy / 2;
  y1 = lat0 + dy / 2;
  return {
    x0,
    x1,
    y0,
    y1,
    px: (lon: number) => ((lon - x0) / (x1 - x0)) * L,
    py: (lat: number) => ((y1 - lat) / (y1 - y0)) * H,
  };
}

/** Écarte les repères qui se chevauchent (plusieurs maisons dans la même ville). */
function espacer(points: { x: number; y: number }[], mini = 19) {
  const p = points.map((q) => ({ ...q }));
  for (let tour = 0; tour < 40; tour++) {
    let bouge = false;
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        let dx = p[j].x - p[i].x;
        let dy = p[j].y - p[i].y;
        let d = Math.hypot(dx, dy);
        if (d >= mini) continue;
        if (d < 0.01) {
          dx = Math.cos(j * 2.4);
          dy = Math.sin(j * 2.4);
          d = 1;
        }
        const pousse = (mini - d) / 2;
        p[i].x -= (dx / d) * pousse;
        p[i].y -= (dy / d) * pousse;
        p[j].x += (dx / d) * pousse;
        p[j].y += (dy / d) * pousse;
        bouge = true;
      }
    }
    if (!bouge) break;
  }
  return p.map((q) => ({ x: Math.min(L - 11, Math.max(11, q.x)), y: Math.min(H - 11, Math.max(11, q.y)) }));
}

export function CarteMaisons({ maisons }: { maisons: Maison[] }) {
  const zones = useMemo(() => [...new Set(maisons.map((m) => m.zone))], [maisons]);
  const [zone, setZone] = useState(zones[0]);
  const sites = useMemo(() => maisons.filter((m) => m.zone === zone), [maisons, zone]);
  const [choix, setChoix] = useState(0);
  const pouls = useRef(new Animated.Value(0)).current;

  useEffect(() => setChoix(0), [zone]);
  useEffect(() => {
    const boucle = Animated.loop(Animated.timing(pouls, { toValue: 1, duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: false }));
    boucle.start();
    return () => boucle.stop();
  }, [pouls]);

  const { terres, reperes, villes, situation } = useMemo(() => {
    const c = cadre(sites);
    const visibles = PAYS.filter((p) => p.b[0] <= c.x1 && p.b[2] >= c.x0 && p.b[1] <= c.y1 && p.b[3] >= c.y0);
    const chemins: string[] = [];
    for (const p of visibles) {
      for (const a of p.a) {
        let d = '';
        let dedans = false;
        for (let i = 0; i < a.length; i += 2) {
          const x = c.px(a[i]);
          const y = c.py(a[i + 1]);
          if (x > -L && x < 2 * L && y > -H && y < 2 * H) dedans = true;
          d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        if (dedans) chemins.push(`${d}Z`);
      }
    }
    const reperes = espacer(sites.map((s) => ({ x: c.px(s.lon), y: c.py(s.lat) })));
    const villes = VILLES.map(([nom, lat, lon]) => ({ nom, x: c.px(lon), y: c.py(lat) }))
      .filter((v) => v.x > 14 && v.x < L - 40 && v.y > 30 && v.y < H - 12)
      .filter((v) => reperes.every((r) => Math.hypot(r.x - v.x, r.y - v.y) > 15))
      .slice(0, 6);

    // Médaillon de situation : la même zone vue de beaucoup plus loin, avec le cadre de la carte.
    const large = (c.y1 - c.y0) < 9 ? Math.max(14, (c.y1 - c.y0) * 5) : 0;
    let situation: { chemins: string[]; cadre: [number, number, number, number] } | null = null;
    if (large) {
      const ML = 92;
      const MH = 68;
      const cy = (c.y0 + c.y1) / 2;
      const cx = (c.x0 + c.x1) / 2;
      const k = Math.cos((cy * Math.PI) / 180);
      const lx = (large * ML) / MH / k;
      const mx = (lon: number) => ((lon - (cx - lx / 2)) / lx) * ML;
      const my = (lat: number) => ((cy + large / 2 - lat) / large) * MH;
      const ch: string[] = [];
      for (const p of PAYS) {
        if (p.b[0] > cx + lx / 2 || p.b[2] < cx - lx / 2 || p.b[1] > cy + large / 2 || p.b[3] < cy - large / 2) continue;
        for (const a of p.a) {
          if (a.length < 24) continue;
          let d = '';
          for (let i = 0; i < a.length; i += 4) d += `${i ? 'L' : 'M'}${mx(a[i]).toFixed(1)} ${my(a[i + 1]).toFixed(1)}`;
          ch.push(`${d}Z`);
        }
      }
      situation = { chemins: ch, cadre: [mx(c.x0), my(c.y1), mx(c.x1) - mx(c.x0), my(c.y0) - my(c.y1)] };
    }
    return { terres: chemins, reperes, villes, situation };
  }, [sites]);

  const actif = sites[choix] ?? sites[0];

  return (
    <View style={{ gap: S.md }}>
      {zones.length > 1 ? <Chips<string> defilant valeur={zone} onChange={setZone} options={zones.map((z) => ({ v: z, l: z }))} /> : null}

      <View style={s.carte}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${L} ${H}`}>
          <Rect x={0} y={0} width={L} height={H} fill="#E9F0F3" />
          {terres.map((d, k) => (
            <Path key={k} d={d} fill="#F7ECEE" stroke="#D9BFC6" strokeWidth={0.8} strokeLinejoin="round" />
          ))}
          {villes.map((v) => (
            <G key={v.nom}>
              <Circle cx={v.x} cy={v.y} r={2.2} fill="#8C777D" />
              <T x={v.x + 5} y={v.y + 3.2} fontSize={9} fill="#6E5A60" fontFamily="system-ui, -apple-system, sans-serif">
                {v.nom}
              </T>
            </G>
          ))}
          {reperes.map((p, k) =>
            k === choix ? (
              <CercleAnime
                key={`h${k}`}
                cx={p.x}
                cy={p.y}
                fill={C.or}
                r={pouls.interpolate({ inputRange: [0, 1], outputRange: [9, 22] })}
                opacity={pouls.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] })}
              />
            ) : null,
          )}
          {reperes.map((p, k) => (
            <G
              key={k}
              onPress={() => {
                vibrer();
                setChoix(k);
              }}>
              <Circle cx={p.x} cy={p.y} r={14} fill="transparent" />
              <Circle cx={p.x} cy={p.y} r={k === choix ? 10.5 : 9} fill={k === choix ? C.accentDeep : C.accent} stroke="#FFFFFF" strokeWidth={1.8} />
              <T x={p.x} y={p.y + 3.4} textAnchor="middle" fontSize={9.5} fontWeight="700" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif">
                {k + 1}
              </T>
            </G>
          ))}
        </Svg>
        <Text style={s.legende}>{zone}</Text>
        {situation ? (
          <View style={s.situation}>
            <Svg width="100%" height="100%" viewBox="0 0 92 68">
              <Rect x={0} y={0} width={92} height={68} fill="#E9F0F3" />
              {situation.chemins.map((d, k) => (
                <Path key={k} d={d} fill="#F7ECEE" stroke="#D9BFC6" strokeWidth={0.5} />
              ))}
              <Rect
                x={Math.min(situation.cadre[0], 88)}
                y={Math.min(situation.cadre[1], 64)}
                width={Math.max(situation.cadre[2], 5)}
                height={Math.max(situation.cadre[3], 4)}
                fill="rgba(122,31,61,0.25)"
                stroke={C.accent}
                strokeWidth={1.4}
              />
            </Svg>
          </View>
        ) : null}
      </View>

      {actif ? (
        <Apparition key={`${zone}${choix}`} style={s.fiche}>
          <View style={s.ficheTete}>
            <View style={s.num}>
              <Text style={s.numTxt}>{choix + 1}</Text>
            </View>
            <View style={{ flex: 1, gap: 1 }}>
              <Text style={s.nom}>{actif.nom}</Text>
              <Text style={s.lieu}>
                {actif.lieu} · {actif.depuis}
              </Text>
            </View>
          </View>
          <Text style={s.texte}>{actif.texte}</Text>
        </Apparition>
      ) : null}

      <View style={s.liste}>
        {sites.map((m, k) => (
          <Touche key={m.nom} onPress={() => setChoix(k)} selected={k === choix} style={[s.ligne, k === choix && s.ligneActive]}>
            <Text style={[s.ligneNum, k === choix && { color: C.onAccent, backgroundColor: C.accent }]}>{k + 1}</Text>
            <Text style={[s.ligneNom, k === choix && { color: C.accent, fontWeight: '700' }]} numberOfLines={1}>
              {m.nom}
            </Text>
          </Touche>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  carte: { width: '100%', aspectRatio: L / H, borderRadius: R.md, overflow: 'hidden', backgroundColor: '#E9F0F3' },
  legende: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    color: C.accentDeep,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  situation: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 92,
    height: 68,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    boxShadow: '0 2px 8px rgba(86, 18, 42, 0.18)',
  },
  fiche: { backgroundColor: C.accentDark, borderRadius: R.md, padding: S.md + 2, gap: S.sm },
  ficheTete: { flexDirection: 'row', alignItems: 'center', gap: S.md },
  num: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  numTxt: { color: C.onAccent, fontSize: 14, fontWeight: '700' },
  nom: { color: C.text, fontFamily: F.display, fontSize: 20, lineHeight: 24 },
  lieu: { color: C.accent, fontSize: 13, fontWeight: '600' },
  texte: { color: C.text, fontSize: 15, lineHeight: 22 },
  liste: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 11,
    borderRadius: R.pill,
    backgroundColor: C.cardAlt,
    maxWidth: 260,
  },
  ligneActive: { backgroundColor: C.accentDark },
  ligneNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 11,
    fontWeight: '700',
    color: C.accent,
    backgroundColor: C.card,
    overflow: 'hidden',
  },
  ligneNom: { color: C.text, fontSize: 13 },
});
