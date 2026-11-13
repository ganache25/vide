import { useRouter } from 'expo-router';

import { Card, GrandTitre, Hero, Ligne, Liste, P, Page } from '../../components/ui';
import { useFiches, useMercuriale } from '../../lib/store';

export default function Outils() {
  const router = useRouter();
  const { mercuriale } = useMercuriale();
  const { fiches } = useFiches();
  const personnalises = Object.keys(mercuriale.surcharges).length + mercuriale.perso.length;

  return (
    <Page onglet>
      <GrandTitre sousTitre="Réviser, chiffrer, convertir.">Outils</GrandTitre>

      <Hero
        surtitre="Révision"
        titre="Testez vos connaissances"
        texte="Socle, produits, matériel, culture bar, lexique : choisissez le thème et le nombre de questions.">
        <Ligne icone="school" titre="Lancer le quiz" sousTitre="Cinq thèmes, de 5 à 30 questions" onPress={() => router.push('/outils/quiz')} />
      </Hero>

      <Liste>
        <Ligne
          icone="pricetags"
          titre="Ma mercuriale"
          sousTitre={
            personnalises
              ? `${personnalises} produit${personnalises > 1 ? 's' : ''} à vos prix`
              : 'Saisissez vos prix d’achat : ils alimentent vos fiches'
          }
          onPress={() => router.push('/outils/mercuriale')}
        />
        <Ligne
          icone="calculator"
          titre="Calculateurs"
          sousTitre="Coût d’une dose, prix de vente, conversions ml · cl · oz"
          onPress={() => router.push('/outils/calculs')}
        />
        <Ligne
          icone="add-circle"
          titre="Nouvelle fiche technique"
          sousTitre={fiches.length ? `${fiches.length} fiche${fiches.length > 1 ? 's' : ''} enregistrée${fiches.length > 1 ? 's' : ''}` : 'TAV, coût et prix calculés en direct'}
          onPress={() => router.push('/editeur')}
        />
        <Ligne
          icone="images"
          titre="Crédits photo"
          sousTitre="Auteurs et licences des photos d’illustration"
          onPress={() => router.push('/credits')}
        />
      </Liste>

      <Card>
        <P muted>
          Pour préparer une recette en grande quantité, ouvrez une fiche et choisissez le nombre de verres sous la liste
          des ingrédients.
        </P>
      </Card>
    </Page>
  );
}
