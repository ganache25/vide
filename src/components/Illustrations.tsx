// Illustrations vectorielles dessinées pour l'application : verres (avec liquide animé),
// outils du bar, bouteille, schémas de distillation et triangle des 3 S.

import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, Path, Polygon, Rect, Text as T } from 'react-native-svg';

import { C } from '../theme';

const RectAnime = Animated.createAnimatedComponent(Rect);

const TRAIT = { stroke: C.accentDeep, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

// Chaque verre : contour complet, forme de la coupe (zone du liquide), haut et bas du liquide.
type Forme = { contour: string; coupe: string; haut: number; bas: number; glace?: boolean };

const FORMES: Record<string, Forme> = {
  martini: {
    contour: 'M18 22 L82 22 L50 62 Z M50 62 L50 104 M32 106 L68 106',
    coupe: 'M18 22 L82 22 L50 62 Z',
    haut: 28,
    bas: 62,
  },
  coupe: {
    contour: 'M20 26 Q20 60 50 62 Q80 60 80 26 Z M50 62 L50 104 M32 106 L68 106',
    coupe: 'M20 26 Q20 60 50 62 Q80 60 80 26 Z',
    haut: 32,
    bas: 62,
  },
  nicknora: {
    contour: 'M30 20 Q26 62 50 64 Q74 62 70 20 Z M50 64 L50 104 M34 106 L66 106',
    coupe: 'M30 20 Q26 62 50 64 Q74 62 70 20 Z',
    haut: 28,
    bas: 64,
  },
  rocks: {
    contour: 'M22 44 L26 104 Q26 108 30 108 L70 108 Q74 108 74 104 L78 44 Z',
    coupe: 'M22 44 L26 104 Q26 108 30 108 L70 108 Q74 108 74 104 L78 44 Z',
    haut: 58,
    bas: 108,
    glace: true,
  },
  highball: {
    contour: 'M30 14 L32 104 Q32 108 36 108 L64 108 Q68 108 68 104 L70 14 Z',
    coupe: 'M30 14 L32 104 Q32 108 36 108 L64 108 Q68 108 68 104 L70 14 Z',
    haut: 28,
    bas: 108,
    glace: true,
  },
  flute: {
    contour: 'M38 10 Q34 70 50 74 Q66 70 62 10 Z M50 74 L50 104 M36 106 L64 106',
    coupe: 'M38 10 Q34 70 50 74 Q66 70 62 10 Z',
    haut: 20,
    bas: 74,
  },
  vin: {
    contour: 'M28 14 Q14 64 50 68 Q86 64 72 14 Z M50 68 L50 104 M34 106 L66 106',
    coupe: 'M28 14 Q14 64 50 68 Q86 64 72 14 Z',
    haut: 34,
    bas: 68,
    glace: true,
  },
  mule: {
    contour: 'M24 34 L28 104 Q28 108 32 108 L68 108 Q72 108 72 104 L76 34 Z M76 48 Q94 50 92 68 Q90 84 74 84',
    coupe: 'M24 34 L28 104 Q28 108 32 108 L68 108 Q72 108 72 104 L76 34 Z',
    haut: 44,
    bas: 108,
    glace: true,
  },
  julep: {
    contour: 'M26 26 L34 104 Q34 108 38 108 L62 108 Q66 108 66 104 L74 26 Z M28 40 L72 40',
    coupe: 'M26 26 L34 104 Q34 108 38 108 L62 108 Q66 108 66 104 L74 26 Z',
    haut: 34,
    bas: 108,
    glace: true,
  },
  shot: {
    contour: 'M34 60 L38 104 Q38 108 42 108 L58 108 Q62 108 62 104 L66 60 Z',
    coupe: 'M34 60 L38 104 Q38 108 42 108 L58 108 Q62 108 62 104 L66 60 Z',
    haut: 68,
    bas: 108,
  },
  hurricane: {
    contour: 'M34 10 Q22 40 38 58 Q46 68 40 80 Q50 86 60 80 Q54 68 62 58 Q78 40 66 10 Z M50 84 L50 104 M34 106 L66 106',
    coupe: 'M34 10 Q22 40 38 58 Q46 68 40 80 Q50 86 60 80 Q54 68 62 58 Q78 40 66 10 Z',
    haut: 22,
    bas: 84,
    glace: true,
  },
  ballon: {
    contour: 'M30 30 Q12 74 50 78 Q88 74 70 30 Z M50 78 L50 104 M34 106 L66 106',
    coupe: 'M30 30 Q12 74 50 78 Q88 74 70 30 Z',
    haut: 56,
    bas: 78,
  },
  biere: {
    contour: 'M30 16 L32 104 Q32 108 36 108 L64 108 Q68 108 68 104 L70 16 Z M70 34 Q90 36 88 60 Q86 80 68 80',
    coupe: 'M30 16 L32 104 Q32 108 36 108 L64 108 Q68 108 68 104 L70 16 Z',
    haut: 26,
    bas: 108,
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

/** Verre dessiné, rempli de la couleur du cocktail ; le liquide monte à l'apparition si `anime`. */
export function Verre({
  verre,
  couleur = C.accent,
  taille = 48,
  anime,
  vide,
}: {
  verre: string;
  couleur?: string;
  taille?: number;
  anime?: boolean;
  vide?: boolean;
}) {
  const f = FORMES[PAR_VERRE[verre] ?? 'highball'];
  const id = useRef(`v${++compteur}`).current;
  const niveau = useRef(new Animated.Value(anime ? 0 : 1)).current;
  useEffect(() => {
    if (!anime) return;
    niveau.setValue(0);
    Animated.timing(niveau, {
      toValue: 1,
      duration: 1100,
      delay: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [anime, niveau, verre, couleur]);
  const hauteur = f.bas - f.haut;
  return (
    <Svg width={taille} height={taille * 1.2} viewBox="0 0 100 120">
      <Defs>
        <ClipPath id={id}>
          <Path d={f.coupe} />
        </ClipPath>
      </Defs>
      {!vide ? (
        <G clipPath={`url(#${id})`}>
          <RectAnime
            x={0}
            width={100}
            fill={couleur}
            opacity={0.9}
            y={niveau.interpolate({ inputRange: [0, 1], outputRange: [f.bas, f.haut] })}
            height={niveau.interpolate({ inputRange: [0, 1], outputRange: [0, hauteur] })}
          />
          {f.glace ? (
            <>
              <Rect x={38} y={f.haut + hauteur * 0.18} width={16} height={16} rx={3} fill="#FFFFFF" opacity={0.45} transform={`rotate(12 46 ${f.haut + hauteur * 0.3})`} />
              <Rect x={48} y={f.haut + hauteur * 0.5} width={15} height={15} rx={3} fill="#FFFFFF" opacity={0.35} transform={`rotate(-14 55 ${f.haut + hauteur * 0.6})`} />
            </>
          ) : null}
        </G>
      ) : null}
      <Path d={f.contour} {...TRAIT} />
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

const POLICE = 'system-ui, -apple-system, sans-serif';
const etiquette = { fontSize: 11, fill: C.text, fontWeight: '600', fontFamily: POLICE } as const;
const petite = { fontSize: 9.5, fill: C.muted, fontFamily: POLICE } as const;

const teinte = { fill: C.accentDark, stroke: C.accentDeep, strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;

/** Schéma d'un alambic à repasse (distillation discontinue). */
export function SchemaAlambic() {
  return (
    <Svg width="100%" height={210} viewBox="0 0 340 210">
      <Rect x="24" y="170" width="92" height="14" rx="4" fill={C.accentDeep} />
      <Path d="M52 170 L60 152 L68 170 M72 170 L80 148 L88 170" fill="#E0863A" />
      <Path d="M30 150 Q20 96 70 92 Q120 96 110 150 Z" {...teinte} />
      <Path d="M56 92 Q52 60 70 54 Q88 60 84 92" {...teinte} fill="#FFFFFF" />
      <Path d="M70 54 Q72 26 110 26 L196 40" {...TRAIT} strokeWidth={5} />
      <Rect x="196" y="30" width="70" height="120" rx="8" {...teinte} fill="#FFFFFF" />
      <Path d="M210 44 L252 56 L210 68 L252 80 L210 92 L252 104 L210 116 L252 128 L232 144 L232 168" {...TRAIT} />
      <Path d="M214 176 L250 176 L246 198 L218 198 Z" {...teinte} />
      <T x="70" y="126" textAnchor="middle" {...etiquette}>Chaudière</T>
      <T x="70" y="202" textAnchor="middle" {...petite}>Foyer</T>
      <T x="140" y="18" textAnchor="middle" {...etiquette}>Col de cygne</T>
      <T x="276" y="70" {...etiquette}>Serpentin</T>
      <T x="276" y="84" {...petite}>(eau froide)</T>
      <T x="262" y="192" {...etiquette}>Distillat</T>
    </Svg>
  );
}

/** Schéma d'un alambic à colonne (distillation continue). */
export function SchemaColonne() {
  const plateaux = [44, 66, 88, 110, 132, 154];
  return (
    <Svg width="100%" height={210} viewBox="0 0 380 210">
      <Rect x="130" y="20" width="64" height="170" rx="10" {...teinte} fill="#FFFFFF" />
      {plateaux.map((y) => (
        <Line key={y} x1="136" y1={y} x2="188" y2={y} {...TRAIT} strokeDasharray="6 5" strokeWidth={1.8} />
      ))}
      <Path d="M60 76 L130 76" {...TRAIT} strokeWidth={4} />
      <Polygon points="122,70 132,76 122,82" fill={C.accentDeep} />
      <Path d="M60 172 L130 172" {...TRAIT} strokeWidth={4} />
      <Polygon points="122,166 132,172 122,178" fill={C.accentDeep} />
      <Path d="M194 34 L262 34 L262 72" {...TRAIT} strokeWidth={4} />
      <Rect x="240" y="72" width="44" height="52" rx="8" {...teinte} />
      <Path d="M262 124 L262 150" {...TRAIT} strokeWidth={4} />
      <Path d="M194 180 L270 180" {...TRAIT} strokeWidth={4} />
      <Path d="M152 150 L152 60 M172 150 L172 60" stroke="#E0863A" strokeWidth={2} strokeDasharray="2 6" />
      <T x="56" y="66" textAnchor="middle" {...etiquette}>Vin ou moût</T>
      <T x="56" y="162" textAnchor="middle" {...etiquette}>Vapeur</T>
      <T x="162" y="14" textAnchor="middle" {...etiquette}>Colonne à plateaux</T>
      <T x="292" y="96" {...etiquette}>Condenseur</T>
      <T x="262" y="164" textAnchor="middle" {...etiquette}>Distillat</T>
      <T x="276" y="184" {...petite}>Vinasses</T>
    </Svg>
  );
}

/** Triangle de l'équilibre des 3 S. */
export function Triangle3S() {
  return (
    <Svg width="100%" height={190} viewBox="0 0 340 190">
      <Polygon points="170,22 286,158 54,158" fill={C.accentDark} stroke={C.accent} strokeWidth={2.4} strokeLinejoin="round" />
      <Circle cx="170" cy="112" r="26" fill={C.accent} />
      <T x="170" y="109" textAnchor="middle" fontSize={10} fill="#FFFFFF" fontWeight="700" fontFamily={POLICE}>ÉQUI-</T>
      <T x="170" y="121" textAnchor="middle" fontSize={10} fill="#FFFFFF" fontWeight="700" fontFamily={POLICE}>LIBRE</T>
      <T x="170" y="14" textAnchor="middle" fontSize={13} fill={C.accent} fontWeight="700" fontFamily={POLICE}>STRONG · la puissance</T>
      <T x="54" y="178" textAnchor="middle" fontSize={13} fill={C.accent} fontWeight="700" fontFamily={POLICE}>SWEET · le sucré</T>
      <T x="286" y="178" textAnchor="middle" fontSize={13} fill={C.accent} fontWeight="700" fontFamily={POLICE}>SOUR · l’acidité</T>
    </Svg>
  );
}
