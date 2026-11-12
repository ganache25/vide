import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, type ReactNode } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { C, S } from '../theme';

type IconName = keyof typeof Ionicons.glyphMap;

export function Page({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <View style={st.page}>
      <ScrollView
        contentContainerStyle={st.pageContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={st.colonne}>{children}</View>
      </ScrollView>
      {footer ? (
        <View style={st.footer}>
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

export function P({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return <Text style={[st.p, muted && { color: C.muted }]}>{children}</Text>;
}

export function Chip({
  label,
  actif,
  onPress,
}: {
  label: string;
  actif?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!actif }}
      style={[st.chip, actif && st.chipActif]}>
      <Text style={[st.chipTxt, actif && st.chipTxtActif]}>{label}</Text>
    </Pressable>
  );
}

export function Chips<T extends string>({
  options,
  valeur,
  onChange,
  defilant,
}: {
  options: { v: T; l: string }[];
  valeur: T;
  onChange: (v: T) => void;
  defilant?: boolean;
}) {
  const items = options.map((o) => (
    <Chip key={o.v} label={o.l} actif={o.v === valeur} onPress={() => onChange(o.v)} />
  ));
  if (defilant) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={st.chipsLigne}>
        {items}
      </ScrollView>
    );
  }
  return <View style={st.chipsWrap}>{items}</View>;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <View style={st.tag}>
      <Text style={st.tagTxt}>{children}</Text>
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
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        st.bouton,
        plein ? st.boutonPlein : st.boutonContour,
        variante === 'danger' && { borderColor: C.danger },
        pressed && { opacity: 0.7 },
        style,
      ]}>
      {icone ? <Ionicons name={icone} size={18} color={couleur} /> : null}
      <Text style={[st.boutonTxt, { color: couleur }]}>{label}</Text>
    </Pressable>
  );
}

export function Champ(props: TextInputProps & { label?: string }) {
  const { label, style, ...rest } = props;
  return (
    <View style={{ gap: S.xs }}>
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
      <Ionicons name="search" size={18} color={C.muted} />
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

export function Ligne({
  titre,
  sousTitre,
  droite,
  onPress,
}: {
  titre: string;
  sousTitre?: string;
  droite?: ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [st.ligne, pressed && { backgroundColor: C.cardAlt }]}>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={st.ligneTitre}>{titre}</Text>
        {sousTitre ? (
          <Text style={st.ligneSous} numberOfLines={2}>
            {sousTitre}
          </Text>
        ) : null}
      </View>
      {droite}
      <Ionicons name="chevron-forward" size={18} color={C.muted} />
    </Pressable>
  );
}

export function Depliant({
  titre,
  children,
  ouvertParDefaut,
}: {
  titre: string;
  children: ReactNode;
  ouvertParDefaut?: boolean;
}) {
  const [ouvert, setOuvert] = useState(!!ouvertParDefaut);
  return (
    <Card style={{ padding: 0 }}>
      <Pressable
        onPress={() => setOuvert((o) => !o)}
        accessibilityRole="button"
        accessibilityState={{ expanded: ouvert }}
        style={st.depliantTete}>
        <Text style={st.depliantTitre}>{titre}</Text>
        <Ionicons name={ouvert ? 'chevron-up' : 'chevron-down'} size={18} color={C.accent} />
      </Pressable>
      {ouvert ? <View style={st.depliantCorps}>{children}</View> : null}
    </Card>
  );
}

export function Rubriques({ items }: { items: { titre: string; texte: string }[] }) {
  return (
    <View style={{ gap: S.md }}>
      {items.map((r) => (
        <View key={r.titre} style={{ gap: 2 }}>
          <Text style={st.rubriqueTitre}>{r.titre}</Text>
          <Text style={st.p}>{r.texte}</Text>
        </View>
      ))}
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
  pageContent: { padding: S.lg, paddingBottom: S.xl * 2, alignItems: 'center' },
  colonne: { width: '100%', maxWidth: 720, gap: S.lg },
  footer: {
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.card,
    padding: S.md,
    alignItems: 'center',
  },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: S.lg,
    gap: S.md,
  },
  titreLigne: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titre: { color: C.accent, fontSize: 12, fontWeight: '700', letterSpacing: 1.4, textTransform: 'uppercase' },
  p: { color: C.text, fontSize: 15, lineHeight: 22 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
  },
  chipActif: { backgroundColor: C.accent, borderColor: C.accent },
  chipTxt: { color: C.text, fontSize: 14 },
  chipTxtActif: { color: C.onAccent, fontWeight: '700' },
  chipsLigne: { gap: S.sm, paddingRight: S.lg },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: S.sm },
  tag: { backgroundColor: C.accentDark, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  tagTxt: { color: C.accent, fontSize: 12, fontWeight: '600' },
  bouton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: S.sm,
    paddingVertical: 12,
    paddingHorizontal: S.lg,
    borderRadius: 12,
    borderWidth: 1,
  },
  boutonPlein: { backgroundColor: C.accent, borderColor: C.accent },
  boutonContour: { backgroundColor: 'transparent', borderColor: C.accent },
  boutonTxt: { fontSize: 15, fontWeight: '700' },
  label: { color: C.muted, fontSize: 13 },
  input: {
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: C.text,
    fontSize: 16,
  },
  inputNombre: { textAlign: 'center', paddingHorizontal: 4, minWidth: 56 },
  recherche: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.sm,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  rechercheInput: { flex: 1, color: C.text, fontSize: 16, paddingVertical: 11 },
  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.md,
    paddingVertical: 14,
    paddingHorizontal: S.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  ligneTitre: { color: C.text, fontSize: 17, fontWeight: '600' },
  ligneSous: { color: C.muted, fontSize: 13, lineHeight: 18 },
  depliantTete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: S.lg,
    gap: S.md,
  },
  depliantTitre: { color: C.text, fontSize: 16, fontWeight: '600', flex: 1 },
  depliantCorps: { paddingHorizontal: S.lg, paddingBottom: S.lg, gap: S.md },
  rubriqueTitre: { color: C.accent, fontSize: 15, fontWeight: '700' },
});
