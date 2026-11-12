import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { Apparition, Bouton, Card, Hero, Ligne, Liste, P, Page, Titre, Touche } from '../../components/ui';
import { COCKTAIL_PAR_ID } from '../../data/cocktails';
import { genererQuiz, type Question } from '../../lib/quiz';
import { C, R, S } from '../../theme';

export default function Quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(() => genererQuiz());
  const [index, setIndex] = useState(0);
  const [reponses, setReponses] = useState<(string | null)[]>([]);
  const progression = useRef(new Animated.Value(0)).current;

  const total = questions.length;
  const fini = index >= total;
  const q = questions[index];
  const choisie = reponses[index] ?? null;

  useEffect(() => {
    Animated.timing(progression, {
      toValue: (index + (choisie ? 1 : 0)) / total,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [index, choisie, total, progression]);

  const recommencer = () => {
    setQuestions(genererQuiz());
    setIndex(0);
    setReponses([]);
  };

  if (fini) {
    const score = questions.filter((x, k) => reponses[k] === x.bonne).length;
    const ratees = questions.filter((x, k) => reponses[k] !== x.bonne);
    const aRevoir = [...new Set(ratees.map((x) => x.cocktailId))];
    return (
      <Page>
        <Hero
          surtitre="Résultat"
          titre={`${score} / ${total}`}
          texte={
            score === total
              ? 'Sans faute : le socle n’a plus de secret pour vous.'
              : score >= total * 0.7
                ? 'Solide. Encore quelques fiches à revoir.'
                : 'Le socle se travaille : reprenez les fiches ci-dessous.'
          }
        />
        {aRevoir.length ? (
          <>
            <Titre>À revoir</Titre>
            <Liste>
              {aRevoir.map((id) => (
                <Ligne
                  key={id}
                  icone="refresh"
                  titre={COCKTAIL_PAR_ID[id].nom}
                  sousTitre={ratees.find((x) => x.cocktailId === id)?.enonce}
                  onPress={() => router.push(`/cocktail/${id}`)}
                />
              ))}
            </Liste>
          </>
        ) : null}
        <Bouton label="Recommencer" icone="refresh" onPress={recommencer} />
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
        <Text style={s.compteur}>
          Question {index + 1} sur {total}
        </Text>
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
          <Text style={s.enonce}>{q.enonce}</Text>
        </Card>

        <View style={{ gap: S.sm + 2 }}>
          {q.choix.map((c) => {
            const estBonne = c === q.bonne;
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
            {choisie === q.bonne ? 'Bonne réponse.' : `La bonne réponse : ${q.bonne}.`} Fiche :{' '}
            {COCKTAIL_PAR_ID[q.cocktailId].nom}.
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
