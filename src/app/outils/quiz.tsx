import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { Apparition, Bouton, Card, Chips, Hero, Ligne, Liste, P, Page, Tag, Titre, Touche } from '../../components/ui';
import { THEMES, genererQuiz, type Question, type Theme } from '../../lib/quiz';
import { C, R, S } from '../../theme';

export default function Quiz() {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>('tout');
  const [nombre, setNombre] = useState('10');
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [reponses, setReponses] = useState<(string | null)[]>([]);
  const progression = useRef(new Animated.Value(0)).current;

  const total = questions?.length ?? 1;
  const fini = !!questions && index >= total;
  const q = questions?.[index];
  const choisie = reponses[index] ?? null;

  useEffect(() => {
    Animated.timing(progression, {
      toValue: (index + (choisie ? 1 : 0)) / total,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [index, choisie, total, progression]);

  const lancer = () => {
    setQuestions(genererQuiz(theme, Number(nombre)));
    setIndex(0);
    setReponses([]);
  };

  if (!questions) {
    return (
      <Page>
        <Hero surtitre="Révision" titre="Composez votre quiz" texte="Les questions sont tirées au hasard dans les contenus de l’application : aucune série ne se ressemble." />
        <Card>
          <Titre>Thème</Titre>
          <Chips<Theme> valeur={theme} onChange={setTheme} options={THEMES} />
          <Titre>Nombre de questions</Titre>
          <Chips<string>
            valeur={nombre}
            onChange={setNombre}
            options={['5', '10', '20', '30'].map((v) => ({ v, l: v }))}
          />
        </Card>
        <Bouton label="Commencer" icone="play" onPress={lancer} />
      </Page>
    );
  }

  if (fini) {
    const score = questions.filter((x, k) => reponses[k] === x.bonne).length;
    const ratees = questions.filter((x, k) => reponses[k] !== x.bonne);
    const aRevoir = [...new Map(ratees.map((x) => [x.sujet, x])).values()];
    return (
      <Page>
        <Hero
          surtitre="Résultat"
          titre={`${score} / ${total}`}
          texte={
            score === total
              ? 'Sans faute : bravo.'
              : score >= total * 0.7
                ? 'Solide. Encore quelques points à revoir.'
                : 'Ça se travaille : reprenez les points ci-dessous.'
          }
        />
        {aRevoir.length ? (
          <>
            <Titre>À revoir</Titre>
            <Liste>
              {aRevoir.map((x) => (
                <Ligne key={x.sujet} icone="refresh" titre={x.sujet} sousTitre={x.enonce} onPress={() => router.push(x.lien)} />
              ))}
            </Liste>
          </>
        ) : null}
        <Bouton label="Rejouer le même thème" icone="refresh" onPress={lancer} />
        <Bouton label="Changer de thème" icone="options" variante="contour" onPress={() => setQuestions(null)} />
      </Page>
    );
  }

  return (
    <Page
      footer={
        choisie ? (
          <Bouton
            label={index === total - 1 ? 'Voir le résultat' : 'Question suivante'}
            icone="arrow-forward"
            onPress={() => setIndex((i) => i + 1)}
          />
        ) : undefined
      }>
      <View style={{ gap: S.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={s.compteur}>
            Question {index + 1} sur {total}
          </Text>
          <Tag>{THEMES.find((t) => t.v === q!.theme)?.l}</Tag>
        </View>
        <View style={s.barre}>
          <Animated.View
            style={[
              s.barrePleine,
              { width: progression.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
            ]}
          />
        </View>
      </View>

      <Apparition key={index} style={{ gap: S.lg }}>
        <Card>
          <Text style={s.enonce}>{q!.enonce}</Text>
        </Card>

        <View style={{ gap: S.sm + 2 }}>
          {q!.choix.map((c) => {
            const estBonne = c === q!.bonne;
            const estChoisie = c === choisie;
            const etat = !choisie ? 'neutre' : estBonne ? 'bonne' : estChoisie ? 'fausse' : 'attenuee';
            return (
              <Touche
                key={c}
                selected={estChoisie}
                onPress={() => {
                  if (choisie) return;
                  setReponses((r) => {
                    const suivant = [...r];
                    suivant[index] = c;
                    return suivant;
                  });
                }}
                style={[
                  s.choix,
                  etat === 'bonne' && { backgroundColor: C.greenSoft, borderColor: C.green },
                  etat === 'fausse' && { backgroundColor: C.dangerSoft, borderColor: C.danger },
                  etat === 'attenuee' && { opacity: 0.55 },
                ]}>
                <Text style={s.choixTxt}>{c}</Text>
                {etat === 'bonne' ? <Ionicons name="checkmark-circle" size={22} color={C.green} /> : null}
                {etat === 'fausse' ? <Ionicons name="close-circle" size={22} color={C.danger} /> : null}
              </Touche>
            );
          })}
        </View>

        {choisie ? (
          <P muted>
            {choisie === q!.bonne ? 'Bonne réponse.' : `La bonne réponse : ${q!.bonne}`} À revoir : {q!.sujet}.
          </P>
        ) : null}
      </Apparition>
    </Page>
  );
}

const s = StyleSheet.create({
  compteur: { color: C.muted, fontSize: 13, fontWeight: '600' },
  barre: { height: 8, borderRadius: 4, backgroundColor: C.accentDark, overflow: 'hidden' },
  barrePleine: { height: 8, borderRadius: 4, backgroundColor: C.accent },
  enonce: { color: C.text, fontSize: 20, lineHeight: 28, fontWeight: '700' },
  choix: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: S.md,
    backgroundColor: C.card,
    borderRadius: R.md,
    borderWidth: 1.5,
    borderColor: C.border,
    paddingVertical: 15,
    paddingHorizontal: S.lg,
  },
  choixTxt: { color: C.text, fontSize: 16, fontWeight: '500', flex: 1 },
});
