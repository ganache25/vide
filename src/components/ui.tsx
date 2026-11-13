import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Alert,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { C, F, HAUTEUR_ONGLETS, OMBRE, R, S } from '../theme';
import { Bulles, Degrade, Reflet, vibrer } from './fx';

export type IconName = keyof typeof Ionicons.glyphMap;

const NATIF = Platform.OS !== 'web';

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental?.(true);

/** Apparition douce : fondu et léger glissement vers le haut, décalable pour un effet de cascade. */
export function Apparition({
  children,
  delai = 0,
  style,
}: {
  children: ReactNode;
  delai?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, {
      toValue: 1,
      duration: 380,
      delay: delai,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: NATIF,
    }).start();
  }, [v, delai]);
  return (
    <Animated.View
      style={[
        style,
        { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }] },
      ]}>
      {children}
    </Animated.View>
  );
}

/** Zone pressable qui se contracte légèrement sous le doigt. */
export function Touche({
  children,
  onPress,
  style,
  label,
  selected,
  expanded,
  hitSlop,
}: {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
  selected?: boolean;
  expanded?: boolean;
  hitSlop?: number;
}) {
  const echelle = useRef(new Animated.Value(1)).current;
  const vers = (toValue: number) =>
    Animated.spring(echelle, { toValue, useNativeDriver: NATIF, speed: 40, bounciness: 6 }).start();
  return (
    <Pressable
      onPress={
        onPress
          ? () => {
              vibrer();
              onPress();
            }
          : undefined
      }
      onPressIn={() => vers(0.96)}
      onPressOut={() => vers(1)}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected, expanded }}>
      <Animated.View style={[style, { transform: [{ scale: echelle }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

export function Page({
  children,
  footer,
  onglet,
  scrollY,
}: {
  children: ReactNode;
  footer?: ReactNode;
  /** Reçoit la position de défilement, pour les effets de parallaxe. */
  scrollY?: Animated.Value;
  /** Écran d'onglet : réserve la place de la barre d'onglets flottante. */
  onglet?: boolean;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={st.page}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={
          scrollY
            ? Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: NATIF })
            : undefined
        }
        contentContainerStyle={[
          st.pageContent,
          onglet && { paddingTop: insets.top + S.xl, paddingBottom: insets.bottom + HAUTEUR_ONGLETS + S.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Apparition style={st.colonne}>{children}</Apparition>
      </Animated.ScrollView>
      {footer ? (
        <View style={[st.footer, { paddingBottom: S.md + insets.bottom }]}>
          <View style={st.colonne}>{footer}</View>
        </View>
      ) : null}
    </View>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[st.card, style]}>{children}</View>;
}

export function Titre({ children, droite }: { children: ReactNode; droite?: ReactNode }) {
  return (
    <View style={st.titreLigne}>
      <Text style={st.titre}>{children}</Text>
      {droite}
    </View>
  );
}

/** Grand titre d'écran en serif d'affichage. */
export function GrandTitre({ children, sousTitre }: { children: ReactNode; sousTitre?: string }) {
  return (
    <View style={{ gap: S.xs }}>
      <Text style={st.grandTitre}>{children}</Text>
      {sousTitre ? <Text style={st.sousTitre}>{sousTitre}</Text> : null}
    </View>
  );
}

export function P({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return <Text style={[st.p, muted && st.pMuted]}>{children}</Text>;
}

export function Chip({
  label,
  actif,
  onPress,
  icone,
}: {
  label: string;
  actif?: boolean;
  onPress?: () => void;
  icone?: IconName;
}) {
  return (
    <Touche onPress={onPress} selected={!!actif} style={[st.chip, actif && st.chipActif]}>
      {icone ? <Ionicons name={icone} size={14} color={actif ? C.onAccent : C.accent} /> : null}
      <Text style={[st.chipTxt, actif && st.chipTxtActif]}>{label}</Text>
    </Touche>
  );
}

export function Chips<T extends string>({
  options,
  valeur,
  onChange,
  defilant,
}: {
  options: { v: T; l: string; icone?: IconName }[];
  valeur: T;
  onChange: (v: T) => void;
  defilant?: boolean;
}) {
  const items = options.map((o) => (
    <Chip key={o.v} label={o.l} icone={o.icone} actif={o.v === valeur} onPress={() => onChange(o.v)} />
  ));
  if (defilant) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={st.chipsDefilant}
        contentContainerStyle={st.chipsLigne}>
        {items}
      </ScrollView>
    );
  }
  return <View style={st.chipsWrap}>{items}</View>;
}

export function Tag({ children, ton = 'accent' }: { children: ReactNode; ton?: 'accent' | 'neutre' }) {
  return (
    <View style={[st.tag, ton === 'neutre' && { backgroundColor: C.cardAlt }]}>
      <Text style={[st.tagTxt, ton === 'neutre' && { color: C.muted }]}>{children}</Text>
    </View>
  );
}

export function Bouton({
  label,
  icone,
  onPress,
  variante = 'plein',
  style,
}: {
  label: string;
  icone?: IconName;
  onPress: () => void;
  variante?: 'plein' | 'contour' | 'danger';
  style?: StyleProp<ViewStyle>;
}) {
  const plein = variante === 'plein';
  const couleur = plein ? C.onAccent : variante === 'danger' ? C.danger : C.accent;
  return (
    <View style={style}>
      <Touche
        onPress={onPress}
        style={[
          st.bouton,
          plein ? st.boutonPlein : st.boutonContour,
          variante === 'danger' && { backgroundColor: C.dangerSoft },
        ]}>
        {plein ? <Degrade style={[StyleSheet.absoluteFill, { borderRadius: R.pill }]} /> : null}
        {icone ? <Ionicons name={icone} size={18} color={couleur} /> : null}
        <Text style={[st.boutonTxt, { color: couleur }]}>{label}</Text>
      </Touche>
    </View>
  );
}

export function Champ(props: TextInputProps & { label?: string }) {
  const { label, style, ...rest } = props;
  return (
    <View style={{ gap: 6 }}>
      {label ? <Text style={st.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={C.muted}
        {...rest}
        style={[st.input, rest.multiline && { minHeight: 96, textAlignVertical: 'top' }, style]}
      />
    </View>
  );
}

/** Champ numérique tolérant la virgule française. */
export function ChampNombre({
  valeur,
  onChange,
  style,
  label,
}: {
  valeur: number | null;
  onChange: (n: number | null) => void;
  style?: TextInputProps['style'];
  label?: string;
}) {
  const formate = (n: number | null) => (n == null ? '' : String(n).replace('.', ','));
  const [txt, setTxt] = useState(formate(valeur));
  useEffect(() => {
    const courant = txt.trim() === '' ? null : Number(txt.replace(',', '.'));
    if (courant !== valeur) setTxt(formate(valeur));
    // Resynchronise seulement quand la valeur change de l'extérieur (boutons +/−).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valeur]);
  return (
    <TextInput
      accessibilityLabel={label}
      value={txt}
      keyboardType="decimal-pad"
      selectTextOnFocus
      placeholderTextColor={C.muted}
      onChangeText={(t) => {
        const propre = t.replace(/[^0-9.,]/g, '');
        setTxt(propre);
        if (propre.trim() === '') return onChange(null);
        const n = Number(propre.replace(',', '.'));
        if (Number.isFinite(n)) onChange(n);
      }}
      style={[st.input, st.inputNombre, style]}
    />
  );
}

export function Recherche({
  valeur,
  onChange,
  placeholder,
}: {
  valeur: string;
  onChange: (t: string) => void;
  placeholder: string;
}) {
  return (
    <View style={st.recherche}>
      <Ionicons name="search" size={18} color={C.accent} />
      <TextInput
        value={valeur}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={C.muted}
        style={st.rechercheInput}
        autoCorrect={false}
      />
      {valeur ? (
        <Pressable onPress={() => onChange('')} accessibilityLabel="Effacer la recherche" hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={C.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}

/** Ligne de liste en carte : pastille à gauche, titre, sous-titre, complément à droite. */
export function Ligne({
  titre,
  sousTitre,
  droite,
  icone,
  monogramme,
  visuel,
  onPress,
  delai,
}: {
  titre: string;
  sousTitre?: string;
  droite?: ReactNode;
  icone?: IconName;
  monogramme?: string;
  /** Illustration à la place de l'icône. */
  visuel?: ReactNode;
  onPress: () => void;
  delai?: number;
}) {
  return (
    <Apparition delai={delai}>
      <Touche onPress={onPress} style={st.ligne}>
        {visuel ? <View style={st.pastille}>{visuel}</View> : null}
        {!visuel && (icone || monogramme) ? (
          <View style={st.pastille}>
            {icone ? (
              <Ionicons name={icone} size={20} color={C.accent} />
            ) : (
              <Text style={st.monogramme}>{monogramme}</Text>
            )}
          </View>
        ) : null}
        <View style={{ flex: 1, gap: 2, minWidth: 0 }}>
          <Text style={st.ligneTitre} numberOfLines={2}>
            {titre}
          </Text>
          {sousTitre ? (
            <Text style={st.ligneSous} numberOfLines={2}>
              {sousTitre}
            </Text>
          ) : null}
        </View>
        {droite}
        <Ionicons name="chevron-forward" size={16} color={C.border} />
      </Touche>
    </Apparition>
  );
}

export function Liste({ children }: { children: ReactNode }) {
  return <View style={{ gap: S.sm + 2 }}>{children}</View>;
}

export function Depliant({
  titre,
  children,
  ouvertParDefaut,
  icone,
}: {
  titre: string;
  children: ReactNode;
  ouvertParDefaut?: boolean;
  icone?: IconName;
}) {
  const [ouvert, setOuvert] = useState(!!ouvertParDefaut);
  const rotation = useRef(new Animated.Value(ouvertParDefaut ? 1 : 0)).current;
  const basculer = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(rotation, { toValue: ouvert ? 0 : 1, duration: 220, useNativeDriver: NATIF }).start();
    setOuvert((o) => !o);
  };
  return (
    <Card style={{ padding: 0, gap: 0 }}>
      <Pressable
        onPress={basculer}
        accessibilityRole="button"
        accessibilityState={{ expanded: ouvert }}
        style={st.depliantTete}>
        {icone ? (
          <View style={[st.pastille, { width: 36, height: 36 }]}>
            <Ionicons name={icone} size={18} color={C.accent} />
          </View>
        ) : null}
        <Text style={st.depliantTitre}>{titre}</Text>
        <Animated.View
          style={{
            transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }],
          }}>
          <Ionicons name="chevron-down" size={18} color={C.accent} />
        </Animated.View>
      </Pressable>
      {ouvert ? <Apparition style={st.depliantCorps}>{children}</Apparition> : null}
    </Card>
  );
}

export function Rubriques({ items }: { items: { titre: string; texte: string }[] }) {
  return (
    <View style={{ gap: S.lg }}>
      {items.map((r) => (
        <View key={r.titre} style={{ gap: 3 }}>
          <Text style={st.rubriqueTitre}>{r.titre}</Text>
          <Text style={st.p}>{r.texte}</Text>
        </View>
      ))}
    </View>
  );
}

/** Bloc d'accroche bordeaux en tête d'écran. */
export function Hero({
  surtitre,
  titre,
  texte,
  children,
}: {
  surtitre?: string;
  titre: string;
  texte?: string;
  children?: ReactNode;
}) {
  return (
    <View style={st.hero}>
      <Degrade style={StyleSheet.absoluteFill} />
      <View style={[st.bulle, { width: 220, height: 220, top: -90, right: -60 }]} />
      <View style={[st.bulle, { width: 140, height: 140, bottom: -70, right: 70, opacity: 0.07 }]} />
      <Bulles />
      <Reflet />
      {surtitre ? <Text style={st.heroSur}>{surtitre}</Text> : null}
      <Text style={st.heroTitre}>{titre}</Text>
      {texte ? <Text style={st.heroTexte}>{texte}</Text> : null}
      {children}
    </View>
  );
}

/** Confirmation compatible web (Alert.alert n'y affiche pas de boutons). */
export function confirmer(titre: string, message: string, action: () => void, libelle = 'Supprimer') {
  if (Platform.OS === 'web') {
    if (window.confirm(`${titre}\n\n${message}`)) action();
    return;
  }
  Alert.alert(titre, message, [
    { text: 'Annuler', style: 'cancel' },
    { text: libelle, style: 'destructive', onPress: action },
  ]);
}

export const st = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.bg },
  pageContent: { padding: S.lg + 2, paddingBottom: S.xl * 2, alignItems: 'center' },
  colonne: { width: '100%', maxWidth: 720, gap: S.lg + 2 },
  footer: {
    backgroundColor: C.card,
    paddingHorizontal: S.lg,
    paddingVertical: S.md,
    alignItems: 'center',
    borderTopLeftRadius: R.lg,
    borderTopRightRadius: R.lg,
    boxShadow: '0 -6px 24px rgba(86, 18, 42, 0.08)',
  },
  card: { backgroundColor: C.card, borderRadius: R.lg, padding: S.lg + 2, gap: S.md, boxShadow: OMBRE },
  titreLigne: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: S.md },
  titre: { color: C.accent, fontSize: 12, fontWeight: '700', letterSpacing: 1.6, textTransform: 'uppercase' },
  grandTitre: { color: C.text, fontFamily: F.display, fontSize: 34, lineHeight: 40 },
  sousTitre: { color: C.accent, fontSize: 16, lineHeight: 22, fontStyle: 'italic' },
  p: { color: C.text, fontSize: 15, lineHeight: 23 },
  pMuted: { color: C.muted, fontSize: 13, lineHeight: 19 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: R.pill,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  chipActif: { backgroundColor: C.accent, borderColor: C.accent },
  chipTxt: { color: C.text, fontSize: 14, fontWeight: '500' },
  chipTxtActif: { color: C.onAccent, fontWeight: '700' },
  chipsDefilant: { marginHorizontal: -(S.lg + 2), flexGrow: 0 },
  chipsLigne: { gap: S.sm, paddingHorizontal: S.lg + 2 },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: S.sm },
  tag: { backgroundColor: C.accentDark, borderRadius: R.pill, paddingHorizontal: 10, paddingVertical: 4 },
  tagTxt: { color: C.accent, fontSize: 12, fontWeight: '700' },
  bouton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: S.sm,
    paddingVertical: 14,
    paddingHorizontal: S.lg + 2,
    borderRadius: R.pill,
  },
  boutonPlein: { backgroundColor: C.accent, boxShadow: '0 8px 20px rgba(122, 31, 61, 0.28)' },
  boutonContour: { backgroundColor: C.accentDark },
  boutonTxt: { fontSize: 15, fontWeight: '700' },
  label: { color: C.muted, fontSize: 13, fontWeight: '500' },
  input: {
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: R.sm + 2,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: C.text,
    fontSize: 16,
  },
  inputNombre: { textAlign: 'center', paddingHorizontal: 4, minWidth: 56 },
  recherche: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.sm,
    backgroundColor: C.card,
    borderRadius: R.pill,
    paddingHorizontal: 18,
    boxShadow: OMBRE,
  },
  rechercheInput: { flex: 1, color: C.text, fontSize: 16, paddingVertical: 13 },
  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.md,
    padding: S.md + 2,
    backgroundColor: C.card,
    borderRadius: R.md + 2,
    boxShadow: OMBRE,
  },
  pastille: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: C.accentDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramme: { color: C.accent, fontFamily: F.display, fontSize: 20 },
  ligneTitre: { color: C.text, fontSize: 17, fontWeight: '700' },
  ligneSous: { color: C.muted, fontSize: 13, lineHeight: 18 },
  depliantTete: { flexDirection: 'row', alignItems: 'center', padding: S.lg, gap: S.md },
  depliantTitre: { color: C.text, fontSize: 16, fontWeight: '700', flex: 1 },
  depliantCorps: { paddingHorizontal: S.lg + 2, paddingBottom: S.lg + 2, gap: S.md },
  rubriqueTitre: { color: C.accent, fontSize: 15, fontWeight: '700' },
  hero: {
    backgroundColor: C.accent,
    borderRadius: R.lg + 6,
    padding: S.xl,
    gap: S.sm,
    overflow: 'hidden',
    boxShadow: '0 14px 34px rgba(122, 31, 61, 0.30)',
  },
  bulle: { position: 'absolute', borderRadius: 999, backgroundColor: '#FFFFFF', opacity: 0.09 },
  heroSur: { color: '#E9CFA0', fontSize: 12, fontWeight: '700', letterSpacing: 1.6, textTransform: 'uppercase' },
  heroTitre: { color: '#FFFFFF', fontFamily: F.display, fontSize: 32, lineHeight: 38 },
  heroTexte: { color: '#F6E3E8', fontSize: 15, lineHeight: 22 },
});
