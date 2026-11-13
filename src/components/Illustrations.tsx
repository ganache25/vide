// Illustrations vectorielles dessinées pour l'application : verres (avec liquide animé),
// outils du bar, bouteille, schémas de distillation et triangle des 3 S.

import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Path, Polygon, Rect, Stop, Text as T } from 'react-native-svg';

import { C } from '../theme';

const RectAnime = Animated.createAnimatedComponent(Rect);
const GAnime = Animated.createAnimatedComponent(G);
const CercleAnime = Animated.createAnimatedComponent(Circle);
const TraceAnime = Animated.createAnimatedComponent(Path);

/** Valeur qui tourne en boucle de 0 à 1, pour les animations continues. */
function useBoucle(duree: number, actif = true) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!actif) return;
    const boucle = Animated.loop(Animated.timing(v, { toValue: 1, duration: duree, easing: Easing.linear, useNativeDriver: false }));
    boucle.start();
    return () => boucle.stop();
  }, [v, duree, actif]);
  return v;
}

/** Mélange une couleur hexadécimale avec du blanc (t = 0 : inchangée, t = 1 : blanc). */
function eclaircir(hex: string, t: number) {
  const n = parseInt(hex.replace('#', ''), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((x) => Math.round(x + (255 - x) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

const TRAIT = { stroke: C.accentDeep, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

// Chaque verre : contour complet, forme de la coupe (zone du liquide), haut et bas du liquide.
type Forme = { contour: string; coupe: string; haut: number; bas: number; glace?: boolean; bord: [number, number] };

const FORMES: Record<string, Forme> = {
  martini: {
    contour: 'M18 22 L82 22 L50 62 Z M50 62 L50 104 M32 106 L68 106',
    coupe: 'M18 22 L82 22 L50 62 Z',
    haut: 28,
    bas: 62,
    bord: [76, 24],
  },
  coupe: {
    contour: 'M20 26 Q20 60 50 62 Q80 60 80 26 Z M50 62 L50 104 M32 106 L68 106',
    coupe: 'M20 26 Q20 60 50 62 Q80 60 80 26 Z',
    haut: 32,
    bas: 62,
    bord: [76, 28],
  },
  nicknora: {
    contour: 'M30 20 Q26 62 50 64 Q74 62 70 20 Z M50 64 L50 104 M34 106 L66 106',
    coupe: 'M30 20 Q26 62 50 64 Q74 62 70 20 Z',
    haut: 28,
    bas: 64,
    bord: [68, 22],
  },
  rocks: {
    contour: 'M22 44 L26 104 Q26 108 30 108 L70 108 Q74 108 74 104 L78 44 Z',
    coupe: 'M22 44 L26 104 Q26 108 30 108 L70 108 Q74 108 74 104 L78 44 Z',
    haut: 58,
    bas: 108,
    glace: true,
    bord: [75, 46],
  },
  highball: {
    contour: 'M30 14 L32 104 Q32 108 36 108 L64 108 Q68 108 68 104 L70 14 Z',
    coupe: 'M30 14 L32 104 Q32 108 36 108 L64 108 Q68 108 68 104 L70 14 Z',
    haut: 28,
    bas: 108,
    glace: true,
    bord: [68, 16],
  },
  flute: {
    contour: 'M38 10 Q34 70 50 74 Q66 70 62 10 Z M50 74 L50 104 M36 106 L64 106',
    coupe: 'M38 10 Q34 70 50 74 Q66 70 62 10 Z',
    haut: 20,
    bas: 74,
    bord: [60, 12],
  },
  vin: {
    contour: 'M28 14 Q14 64 50 68 Q86 64 72 14 Z M50 68 L50 104 M34 106 L66 106',
    coupe: 'M28 14 Q14 64 50 68 Q86 64 72 14 Z',
    haut: 34,
    bas: 68,
    glace: true,
    bord: [70, 16],
  },
  mule: {
    contour: 'M24 34 L28 104 Q28 108 32 108 L68 108 Q72 108 72 104 L76 34 Z M76 48 Q94 50 92 68 Q90 84 74 84',
    coupe: 'M24 34 L28 104 Q28 108 32 108 L68 108 Q72 108 72 104 L76 34 Z',
    haut: 44,
    bas: 108,
    glace: true,
    bord: [73, 36],
  },
  julep: {
    contour: 'M26 26 L34 104 Q34 108 38 108 L62 108 Q66 108 66 104 L74 26 Z M28 40 L72 40',
    coupe: 'M26 26 L34 104 Q34 108 38 108 L62 108 Q66 108 66 104 L74 26 Z',
    haut: 34,
    bas: 108,
    glace: true,
    bord: [71, 28],
  },
  shot: {
    contour: 'M34 60 L38 104 Q38 108 42 108 L58 108 Q62 108 62 104 L66 60 Z',
    coupe: 'M34 60 L38 104 Q38 108 42 108 L58 108 Q62 108 62 104 L66 60 Z',
    haut: 68,
    bas: 108,
    bord: [64, 62],
  },
  hurricane: {
    contour: 'M34 10 Q22 40 38 58 Q46 68 40 80 Q50 86 60 80 Q54 68 62 58 Q78 40 66 10 Z M50 84 L50 104 M34 106 L66 106',
    coupe: 'M34 10 Q22 40 38 58 Q46 68 40 80 Q50 86 60 80 Q54 68 62 58 Q78 40 66 10 Z',
    haut: 22,
    bas: 84,
    glace: true,
    bord: [64, 12],
  },
  ballon: {
    contour: 'M30 30 Q12 74 50 78 Q88 74 70 30 Z M50 78 L50 104 M34 106 L66 106',
    coupe: 'M30 30 Q12 74 50 78 Q88 74 70 30 Z',
    haut: 56,
    bas: 78,
    bord: [68, 32],
  },
  biere: {
    contour: 'M30 16 L32 104 Q32 108 36 108 L64 108 Q68 108 68 104 L70 16 Z M70 34 Q90 36 88 60 Q86 80 68 80',
    coupe: 'M30 16 L32 104 Q32 108 36 108 L64 108 Q68 108 68 104 L70 16 Z',
    haut: 26,
    bas: 108,
    bord: [68, 18],
  },
};

const PAR_VERRE: Record<string, keyof typeof FORMES> = {
  Martini: 'martini',
  Coupe: 'coupe',
  'Nick & Nora': 'nicknora',
  Rocks: 'rocks',
  Highball: 'highball',
  Flûte: 'flute',
  Vin: 'vin',
  Copa: 'vin',
  Mule: 'mule',
  Julep: 'julep',
  Shot: 'shot',
  Hurricane: 'hurricane',
  Tiki: 'hurricane',
  Fantaisie: 'hurricane',
  Digestif: 'ballon',
  Dégustation: 'ballon',
  Absinthe: 'flute',
  Toddy: 'mule',
  Punch: 'mule',
  Bière: 'biere',
};

let compteur = 0;

const FRUITS: [RegExp, string][] = [
  [/citron vert/, '#8DB33A'],
  [/pamplemousse/, '#F28C7C'],
  [/orange/, '#F09A2A'],
  [/ananas/, '#F2C230'],
  [/citron/, '#F1D43B'],
];

/** Garniture dessinée sur le bord du verre, déduite du texte de la fiche. */
function Garniture({ texte, x, y, surface }: { texte: string; x: number; y: number; surface: number }) {
  const t = texte.toLowerCase();
  const fruit = FRUITS.find(([re]) => re.test(t))?.[1];
  const elements: React.ReactNode[] = [];
  if (/tranche|quartier|demi-fruit/.test(t) && (fruit || /passion/.test(t))) {
    const c = fruit ?? '#7A3A6A';
    elements.push(
      <G key="tranche" transform={`rotate(-24 ${x} ${y})`}>
        <Path d={`M${x - 11} ${y} A11 11 0 0 1 ${x + 11} ${y} Z`} fill={c} stroke={C.accentDeep} strokeWidth={1.4} />
        <Path d={`M${x - 7} ${y} A7 7 0 0 1 ${x + 7} ${y} Z`} fill="#FFFFFF" opacity={0.45} />
        <Line x1={x} y1={y} x2={x} y2={y - 10} stroke={C.accentDeep} strokeWidth={0.8} opacity={0.5} />
      </G>,
    );
  }
  if (/zeste/.test(t)) {
    elements.push(
      <Path
        key="zeste"
        d={`M${x - 2} ${y - 2} q8 -10 2 -16 q-8 -4 -6 6 q3 8 12 2`}
        fill="none"
        stroke={fruit ?? '#F1D43B'}
        strokeWidth={3.4}
        strokeLinecap="round"
      />,
    );
  }
  if (/cerise/.test(t)) {
    elements.push(
      <G key="cerise">
        <Path d={`M${x - 16} ${y + 4} q2 -14 10 -18`} fill="none" stroke="#5B3A1E" strokeWidth={1.4} strokeLinecap="round" />
        <Circle cx={x - 16} cy={y + 6} r={5.5} fill="#A3122B" stroke={C.accentDeep} strokeWidth={1.2} />
        <Circle cx={x - 18} cy={y + 4} r={1.4} fill="#FFFFFF" opacity={0.7} />
      </G>,
    );
  }
  if (/olive/.test(t)) {
    elements.push(
      <G key="olive">
        <Line x1={x + 4} y1={y - 12} x2={x - 26} y2={y + 18} stroke="#8A6A3A" strokeWidth={1.6} strokeLinecap="round" />
        <Ellipse cx={x - 16} cy={y + 8} rx={6} ry={4.6} fill="#7E9A3C" stroke={C.accentDeep} strokeWidth={1.1} transform={`rotate(-45 ${x - 16} ${y + 8})`} />
      </G>,
    );
  }
  if (/menthe|basilic|céleri/.test(t)) {
    elements.push(
      <G key="feuilles">
        {[-28, 0, 26].map((r) => (
          <Ellipse
            key={r}
            cx={x - 14}
            cy={y - 12}
            rx={4.4}
            ry={9}
            fill="#4E9A57"
            stroke="#2F6B3A"
            strokeWidth={1}
            transform={`rotate(${r} ${x - 14} ${y - 2})`}
          />
        ))}
      </G>,
    );
  }
  if (/café/.test(t)) {
    elements.push(
      <G key="cafe">
        {[42, 50, 58].map((cx, k) => (
          <Ellipse key={cx} cx={cx} cy={surface + 3 + (k % 2)} rx={3} ry={2} fill="#3B2418" transform={`rotate(${k * 30 - 30} ${cx} ${surface + 3})`} />
        ))}
      </G>,
    );
  }
  if (/gingembre/.test(t)) {
    elements.push(<Ellipse key="gingembre" cx={x - 4} cy={y - 2} rx={7} ry={3} fill="#E8CF8E" stroke={C.accentDeep} strokeWidth={1} transform={`rotate(-30 ${x - 4} ${y - 2})`} />);
  }
  return <>{elements}</>;
}

const VAGUE = `M-100 0 ${Array.from({ length: 12 }, (_, k) => `q12.5 ${k % 2 ? 4.4 : -4.4} 25 0`).join(' ')} L200 14 L-100 14 Z`;

/**
 * Verre dessiné, rempli de la couleur du cocktail.
 * `anime` : le liquide monte à l'apparition. `riche` : dégradé, vague en surface, reflet, garniture.
 */
export function Verre({
  verre,
  couleur = C.accent,
  taille = 48,
  anime,
  vide,
  riche,
  bulles,
  garniture,
  trait = C.accentDeep,
  niveau,
}: {
  verre: string;
  couleur?: string;
  taille?: number;
  anime?: boolean;
  vide?: boolean;
  riche?: boolean;
  bulles?: boolean;
  garniture?: string;
  /** Couleur du contour (clair sur fond sombre). */
  trait?: string;
  /** Niveau de remplissage piloté de l'extérieur, de 0 à 1. */
  niveau?: Animated.Value | Animated.AnimatedInterpolation<number>;
}) {
  const f = FORMES[PAR_VERRE[verre] ?? 'highball'];
  const id = useRef(`v${++compteur}`).current;
  const interne = useRef(new Animated.Value(anime ? 0 : 1)).current;
  const niv = (niveau ?? interne) as Animated.Value;
  const onde = useBoucle(2600, !!riche);
  const montee = useBoucle(3200, !!bulles);
  useEffect(() => {
    if (!anime || niveau) return;
    interne.setValue(0);
    Animated.timing(interne, {
      toValue: 1,
      duration: 1500,
      delay: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [anime, niveau, interne, verre, couleur]);
  const hauteur = f.bas - f.haut;
  const surface = niv.interpolate({ inputRange: [0, 1], outputRange: [f.bas, f.haut] });
  return (
    <Svg width={taille} height={taille * 1.2} viewBox="0 0 100 120">
      <Defs>
        <ClipPath id={id}>
          <Path d={f.coupe} />
        </ClipPath>
        <LinearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={eclaircir(couleur, 0.28)} />
          <Stop offset="1" stopColor={couleur} />
        </LinearGradient>
      </Defs>
      {riche ? <Ellipse cx={50} cy={112} rx={30} ry={4} fill="#000000" opacity={0.18} /> : null}
      {riche ? <Path d={f.coupe} fill="#FFFFFF" opacity={0.08} /> : null}
      {!vide ? (
        <G clipPath={`url(#${id})`}>
          <RectAnime
            x={0}
            width={100}
            fill={riche ? `url(#${id}g)` : couleur}
            opacity={0.92}
            y={surface}
            height={niv.interpolate({ inputRange: [0, 1], outputRange: [0, hauteur] })}
          />
          {riche ? (
            <GAnime translateY={Animated.subtract(surface, 2)}>
              <GAnime translateX={onde.interpolate({ inputRange: [0, 1], outputRange: [0, -50] })}>
                <Path d={VAGUE} fill={eclaircir(couleur, 0.38)} />
              </GAnime>
            </GAnime>
          ) : null}
          {f.glace ? (
            <>
              <Rect x={38} y={f.haut + hauteur * 0.18} width={16} height={16} rx={3} fill="#FFFFFF" opacity={0.45} transform={`rotate(12 46 ${f.haut + hauteur * 0.3})`} />
              <Rect x={48} y={f.haut + hauteur * 0.5} width={15} height={15} rx={3} fill="#FFFFFF" opacity={0.35} transform={`rotate(-14 55 ${f.haut + hauteur * 0.6})`} />
            </>
          ) : null}
          {bulles
            ? [42, 50, 57, 46, 54].map((cx, k) => {
                const t = Animated.modulo(Animated.add(montee, k * 0.21), 1);
                return (
                  <CercleAnime
                    key={k}
                    cx={cx}
                    r={1.3 + (k % 3) * 0.5}
                    fill="#FFFFFF"
                    cy={t.interpolate({ inputRange: [0, 1], outputRange: [f.bas - 4, f.haut + 4] })}
                    opacity={t.interpolate({ inputRange: [0, 0.15, 0.85, 1], outputRange: [0, 0.8, 0.6, 0] })}
                  />
                );
              })
            : null}
          {riche ? <Rect x={34} y={0} width={5} height={120} fill="#FFFFFF" opacity={0.16} /> : null}
        </G>
      ) : null}
      <Path d={f.contour} {...TRAIT} stroke={trait} />
      {riche && garniture ? <Garniture texte={garniture} x={f.bord[0]} y={f.bord[1]} surface={f.haut} /> : null}
    </Svg>
  );
}

// ───────────── Outils du bar ─────────────

const plein = { fill: '#FFFFFF', stroke: C.accentDeep, strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;

const OUTILS: Record<string, React.ReactNode> = {
  doseur: (
    <>
      <Polygon points="30,14 70,14 56,58 44,58" {...plein} />
      <Polygon points="44,58 56,58 66,104 34,104" {...plein} />
      <Line x1="36" y1="34" x2="64" y2="34" {...TRAIT} />
    </>
  ),
  boston: (
    <>
      <Path d="M30 46 L36 108 L64 108 L70 46 Z" {...plein} />
      <Path d="M36 46 L40 10 L66 14 L64 46" {...plein} fill="#EBC3CE" />
    </>
  ),
  continental: (
    <>
      <Path d="M32 52 L37 108 L63 108 L68 52 Z" {...plein} />
      <Path d="M32 52 Q34 20 50 12 Q66 20 68 52 Z" {...plein} fill="#EBC3CE" />
    </>
  ),
  cobbler: (
    <>
      <Path d="M32 56 L37 108 L63 108 L68 56 Z" {...plein} />
      <Path d="M32 56 Q36 34 42 30 L58 30 Q64 34 68 56 Z" {...plein} fill="#EBC3CE" />
      <Rect x="42" y="10" width="16" height="20" rx="3" {...plein} />
    </>
  ),
  'verre-melange': (
    <>
      <Path d="M26 22 L32 106 L68 106 L74 22 Z" {...plein} fill="#EBC3CE" />
      <Path d="M26 22 L20 16" {...TRAIT} />
      <Path d="M36 40 L64 70 M64 40 L36 70 M40 76 L60 96 M60 76 L40 96" {...TRAIT} strokeWidth={1.4} />
    </>
  ),
  cuillere: (
    <>
      <Line x1="50" y1="8" x2="50" y2="88" {...TRAIT} />
      <Path d="M46 20 L54 26 M46 34 L54 40 M46 48 L54 54 M46 62 L54 68" {...TRAIT} strokeWidth={1.6} />
      <Ellipse cx="50" cy="100" rx="9" ry="13" {...plein} />
    </>
  ),
  hawthorne: (
    <>
      <Circle cx="46" cy="64" r="30" {...plein} />
      <Circle cx="46" cy="64" r="20" {...TRAIT} strokeDasharray="4 4" />
      <Path d="M70 46 L94 22" {...TRAIT} strokeWidth={5} />
      <Circle cx="38" cy="58" r="2.5" fill={C.accentDeep} />
      <Circle cx="54" cy="58" r="2.5" fill={C.accentDeep} />
      <Circle cx="46" cy="72" r="2.5" fill={C.accentDeep} />
    </>
  ),
  julep: (
    <>
      <Ellipse cx="44" cy="70" rx="28" ry="26" {...plein} />
      <Path d="M66 52 L94 20" {...TRAIT} strokeWidth={5} />
      {[34, 44, 54].map((x) => [60, 70, 80].map((y) => <Circle key={`${x}${y}`} cx={x} cy={y} r="2.4" fill={C.accentDeep} />))}
    </>
  ),
  fine: (
    <>
      <Path d="M20 50 Q46 100 72 50 Z" {...plein} />
      <Ellipse cx="46" cy="50" rx="26" ry="7" {...plein} fill="#EBC3CE" />
      <Path d="M72 50 L96 44" {...TRAIT} strokeWidth={5} />
      <Path d="M30 62 L62 62 M36 72 L56 72" {...TRAIT} strokeWidth={1.4} />
    </>
  ),
  pilon: (
    <>
      <Path d="M42 12 Q50 6 58 12 L60 84 L40 84 Z" {...plein} />
      <Rect x="36" y="84" width="28" height="24" rx="5" {...plein} fill={C.accentDeep} />
    </>
  ),
  presse: (
    <>
      <Path d="M14 60 Q14 96 46 96 Q78 96 78 60 Z" {...plein} />
      <Path d="M14 60 L78 60" {...TRAIT} />
      <Path d="M30 60 Q46 28 62 60" {...plein} fill="#EBC3CE" />
      <Path d="M78 66 L98 60" {...TRAIT} strokeWidth={5} />
    </>
  ),
  eplucheur: (
    <>
      <Rect x="44" y="56" width="12" height="52" rx="5" {...plein} fill={C.accentDeep} />
      <Path d="M36 14 Q30 36 44 56 L56 56 Q70 36 64 14" {...TRAIT} />
      <Line x1="38" y1="26" x2="62" y2="26" {...TRAIT} strokeWidth={4} />
    </>
  ),
  bec: (
    <>
      <Path d="M40 60 L40 108 L60 108 L60 60 Z" {...plein} />
      <Path d="M34 60 L66 60" {...TRAIT} strokeWidth={5} />
      <Path d="M48 60 Q46 34 70 14" {...TRAIT} strokeWidth={5} />
    </>
  ),
  blender: (
    <>
      <Path d="M30 14 L36 76 L64 76 L70 14 Z" {...plein} fill="#EBC3CE" />
      <Path d="M70 26 Q84 28 82 44 Q80 56 68 56" {...TRAIT} />
      <Path d="M32 76 L28 108 L72 108 L68 76 Z" {...plein} />
      <Circle cx="50" cy="92" r="5" fill={C.accentDeep} />
    </>
  ),
  swizzle: (
    <>
      <Line x1="50" y1="8" x2="50" y2="92" {...TRAIT} strokeWidth={3.5} />
      <Path d="M50 92 L30 108 M50 92 L42 112 M50 92 L58 112 M50 92 L70 108 M50 92 L50 114" {...TRAIT} strokeWidth={3} />
    </>
  ),
  pince: (
    <>
      <Path d="M50 10 Q30 50 34 104 M50 10 Q70 50 66 104" {...TRAIT} strokeWidth={4} />
      <Rect x="40" y="86" width="20" height="20" rx="4" {...plein} fill="#EBC3CE" />
    </>
  ),
  couteau: (
    <>
      <Rect x="10" y="76" width="80" height="12" rx="4" {...plein} />
      <Path d="M22 68 L70 68 Q62 46 22 52 Z" {...plein} fill="#EBC3CE" />
      <Rect x="70" y="56" width="22" height="12" rx="4" {...plein} fill={C.accentDeep} />
    </>
  ),
  squeeze: (
    <>
      <Rect x="32" y="46" width="36" height="62" rx="8" {...plein} />
      <Path d="M40 46 L44 30 L56 30 L60 46 Z" {...plein} fill="#EBC3CE" />
      <Path d="M47 30 L50 10 L53 30" {...plein} fill={C.accentDeep} />
    </>
  ),
  siphon: (
    <>
      <Path d="M34 44 Q34 34 50 34 Q66 34 66 44 L66 104 Q66 108 62 108 L38 108 Q34 108 34 104 Z" {...plein} />
      <Rect x="42" y="18" width="16" height="16" rx="3" {...plein} fill={C.accentDeep} />
      <Path d="M58 24 L80 24 L80 34" {...TRAIT} strokeWidth={4} />
      <Path d="M42 22 L24 14" {...TRAIT} strokeWidth={4} />
    </>
  ),
  tapis: (
    <>
      <Rect x="10" y="50" width="80" height="36" rx="6" {...plein} />
      <Path d="M20 60 L80 60 M20 68 L80 68 M20 76 L80 76" {...TRAIT} strokeWidth={1.4} />
    </>
  ),
  pelle: (
    <>
      <Path d="M20 60 L60 44 L78 84 L34 100 Z" {...plein} />
      <Path d="M68 60 L94 36" {...TRAIT} strokeWidth={6} />
    </>
  ),
};

export function Outil({ id, taille = 48 }: { id: string; taille?: number }) {
  return (
    <Svg width={taille} height={taille * 1.2} viewBox="0 0 100 120">
      {OUTILS[id] ?? OUTILS.doseur}
    </Svg>
  );
}

/** Bouteille stylisée, teintée selon le produit. */
export function Bouteille({ couleur = C.accent, taille = 56 }: { couleur?: string; taille?: number }) {
  return (
    <Svg width={taille} height={taille * 1.6} viewBox="0 0 60 96">
      <Path d="M24 4 L36 4 L36 26 Q48 34 48 48 L48 86 Q48 92 42 92 L18 92 Q12 92 12 86 L12 48 Q12 34 24 26 Z" fill={couleur} opacity={0.9} />
      <Path d="M24 4 L36 4 L36 26 Q48 34 48 48 L48 86 Q48 92 42 92 L18 92 Q12 92 12 86 L12 48 Q12 34 24 26 Z" {...TRAIT} strokeWidth={2} />
      <Rect x="12" y="52" width="36" height="24" fill="#FFFFFF" opacity={0.85} />
      <Line x1="18" y1="60" x2="42" y2="60" stroke={C.accentDeep} strokeWidth={1.6} />
      <Line x1="22" y1="67" x2="38" y2="67" stroke={C.accentDeep} strokeWidth={1.2} />
      <Rect x="23" y="2" width="14" height="8" rx="2" fill={C.accentDeep} />
    </Svg>
  );
}


const teinte = { fill: C.accentDark, stroke: C.accentDeep, strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;

const POLICE = 'system-ui, -apple-system, sans-serif';
const etiquette = { fontSize: 11, fill: C.text, fontWeight: '600', fontFamily: POLICE } as const;
const petite = { fontSize: 9.5, fill: C.muted, fontFamily: POLICE } as const;
const CHAUD = '#E0863A';

/** Pointillés qui circulent le long d'un tracé : matérialise un flux de vapeur ou de liquide. */
function FluxTrace({ d, t, couleur = CHAUD, sens = 1, large = 2.6 }: { d: string; t: Animated.Value; couleur?: string; sens?: 1 | -1; large?: number }) {
  return (
    <TraceAnime
      d={d}
      fill="none"
      stroke={couleur}
      strokeWidth={large}
      strokeLinecap="round"
      strokeDasharray="2 10"
      strokeDashoffset={t.interpolate({ inputRange: [0, 1], outputRange: [0, -24 * sens] })}
    />
  );
}

function Goutte({ x, de, a, t, couleur = C.accent }: { x: number; de: number; a: number; t: Animated.Value; couleur?: string }) {
  return (
    <CercleAnime
      cx={x}
      r={3}
      fill={couleur}
      cy={t.interpolate({ inputRange: [0, 1], outputRange: [de, a] })}
      opacity={t.interpolate({ inputRange: [0, 0.15, 0.8, 1], outputRange: [0, 1, 1, 0] })}
    />
  );
}

/** Schéma animé d'un alambic à repasse (distillation discontinue). */
export function SchemaAlambic() {
  const t = useBoucle(1400);
  const lent = useBoucle(7000);
  const flamme = t.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [1, 0.55, 0.95, 0.6, 1] });
  return (
    <Svg width="100%" height={210} viewBox="0 0 340 210">
      <Defs>
        <ClipPath id="recette">
          <Path d="M214 176 L250 176 L246 198 L218 198 Z" />
        </ClipPath>
      </Defs>
      <Rect x="24" y="170" width="92" height="14" rx="4" fill={C.accentDeep} />
      <TraceAnime d="M50 170 L60 148 L70 170 Z" fill={CHAUD} opacity={flamme} />
      <TraceAnime d="M70 170 L80 144 L90 170 Z" fill="#F2B04A" opacity={Animated.subtract(1.55, flamme)} />
      <Path d="M30 150 Q20 96 70 92 Q120 96 110 150 Z" {...teinte} />
      {[52, 70, 88].map((x, k) => {
        const b = Animated.modulo(Animated.add(t, k * 0.33), 1);
        return (
          <CercleAnime
            key={x}
            cx={x}
            r={3}
            fill="#FFFFFF"
            stroke={C.accent}
            strokeWidth={1}
            cy={b.interpolate({ inputRange: [0, 1], outputRange: [144, 112] })}
            opacity={b.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 1, 1, 0] })}
          />
        );
      })}
      <Path d="M56 92 Q52 60 70 54 Q88 60 84 92" {...teinte} fill="#FFFFFF" />
      <Path d="M70 54 Q72 26 110 26 L196 40" {...TRAIT} strokeWidth={7} />
      <FluxTrace d="M70 88 L70 54 Q72 26 110 26 L196 40" t={t} couleur="#FFD9B0" />
      <Rect x="196" y="30" width="70" height="120" rx="8" {...teinte} fill="#EAF2F6" />
      <Path d="M210 44 L252 56 L210 68 L252 80 L210 92 L252 104 L210 116 L252 128 L232 144 L232 168" {...TRAIT} strokeWidth={4} />
      <FluxTrace d="M210 44 L252 56 L210 68 L252 80 L210 92 L252 104 L210 116 L252 128 L232 144 L232 168" t={t} couleur="#FFFFFF" large={2} />
      <Goutte x={232} de={168} a={186} t={t} />
      <G clipPath="url(#recette)">
        <RectAnime
          x={210}
          width={44}
          fill={C.accent}
          opacity={0.75}
          y={lent.interpolate({ inputRange: [0, 0.9, 1], outputRange: [198, 180, 180] })}
          height={lent.interpolate({ inputRange: [0, 0.9, 1], outputRange: [0, 18, 18] })}
        />
      </G>
      <Path d="M214 176 L250 176 L246 198 L218 198 Z" {...TRAIT} />
      <T x="70" y="202" textAnchor="middle" {...etiquette}>Chaudière et foyer</T>
      <T x="140" y="16" textAnchor="middle" {...etiquette}>Col de cygne</T>
      <T x="276" y="70" {...etiquette}>Serpentin</T>
      <T x="276" y="84" {...petite}>(eau froide)</T>
      <T x="262" y="192" {...etiquette}>Distillat</T>
    </Svg>
  );
}

/** Schéma animé d'un alambic à colonne (distillation continue). */
export function SchemaColonne() {
  const t = useBoucle(1400);
  const plateaux = [44, 66, 88, 110, 132, 154];
  return (
    <Svg width="100%" height={210} viewBox="0 0 380 210">
      <Rect x="130" y="20" width="64" height="170" rx="10" {...teinte} fill="#FFFFFF" />
      {plateaux.map((y) => (
        <Line key={y} x1="136" y1={y} x2="188" y2={y} {...TRAIT} strokeDasharray="6 5" strokeWidth={1.8} />
      ))}
      <FluxTrace d="M150 180 L150 30" t={t} />
      <FluxTrace d="M174 180 L174 30" t={t} />
      <FluxTrace d="M162 76 L162 184" t={t} couleur={C.accent} />
      <Path d="M60 76 L130 76" {...TRAIT} strokeWidth={6} />
      <FluxTrace d="M60 76 L130 76" t={t} couleur="#FFFFFF" large={2} />
      <Polygon points="122,68 134,76 122,84" fill={C.accentDeep} />
      <Path d="M60 172 L130 172" {...TRAIT} strokeWidth={6} />
      <FluxTrace d="M60 172 L130 172" t={t} couleur="#FFD9B0" large={2} />
      <Polygon points="122,164 134,172 122,180" fill={C.accentDeep} />
      <Path d="M194 34 L262 34 L262 72" {...TRAIT} strokeWidth={6} />
      <FluxTrace d="M194 34 L262 34 L262 72" t={t} couleur="#FFD9B0" large={2} />
      <Rect x="240" y="72" width="44" height="52" rx="8" {...teinte} fill="#EAF2F6" />
      <Path d="M262 124 L262 146" {...TRAIT} strokeWidth={4} />
      <Goutte x={262} de={146} a={160} t={t} />
      <Path d="M194 180 L270 180" {...TRAIT} strokeWidth={6} />
      <FluxTrace d="M194 180 L270 180" t={t} couleur="#FFFFFF" large={2} />
      <T x="56" y="64" textAnchor="middle" {...etiquette}>Vin ou moût</T>
      <T x="56" y="160" textAnchor="middle" {...etiquette}>Vapeur</T>
      <T x="162" y="14" textAnchor="middle" {...etiquette}>Colonne à plateaux</T>
      <T x="292" y="96" {...etiquette}>Condenseur</T>
      <T x="272" y="158" {...etiquette}>Distillat</T>
      <T x="278" y="184" {...petite}>Vinasses</T>
    </Svg>
  );
}

/** Triangle animé de l'équilibre des 3 S : chaque sommet s'allume tour à tour. */
export function Triangle3S() {
  const t = useBoucle(4200);
  const sommets: [number, number][] = [
    [170, 22],
    [286, 158],
    [54, 158],
  ];
  return (
    <Svg width="100%" height={190} viewBox="0 0 340 190">
      <Polygon points="170,22 286,158 54,158" fill={C.accentDark} stroke={C.accent} strokeWidth={2.4} strokeLinejoin="round" />
      <TraceAnime
        d="M170 22 L286 158 L54 158 Z"
        fill="none"
        stroke={C.or}
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeDasharray="60 476"
        strokeDashoffset={t.interpolate({ inputRange: [0, 1], outputRange: [0, -536] })}
      />
      {sommets.map(([x, y], k) => {
        const p = Animated.modulo(Animated.add(t, 1 - k / 3), 1);
        return (
          <CercleAnime
            key={k}
            cx={x}
            cy={y}
            fill={C.accent}
            r={p.interpolate({ inputRange: [0, 0.12, 0.3, 1], outputRange: [5, 10, 5, 5] })}
          />
        );
      })}
      <CercleAnime cx="170" cy="112" fill={C.accent} r={t.interpolate({ inputRange: [0, 0.5, 1], outputRange: [25, 28, 25] })} />
      <T x="170" y="109" textAnchor="middle" fontSize={10} fill="#FFFFFF" fontWeight="700" fontFamily={POLICE}>ÉQUI-</T>
      <T x="170" y="121" textAnchor="middle" fontSize={10} fill="#FFFFFF" fontWeight="700" fontFamily={POLICE}>LIBRE</T>
      <T x="170" y="14" textAnchor="middle" fontSize={13} fill={C.accent} fontWeight="700" fontFamily={POLICE}>STRONG · la puissance</T>
      <T x="62" y="180" textAnchor="middle" fontSize={13} fill={C.accent} fontWeight="700" fontFamily={POLICE}>SWEET · le sucré</T>
      <T x="278" y="180" textAnchor="middle" fontSize={13} fill={C.accent} fontWeight="700" fontFamily={POLICE}>SOUR · l’acidité</T>
    </Svg>
  );
}
