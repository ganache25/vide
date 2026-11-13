# Fiches Bar

Application mobile (Expo / React Native) pour les professionnels du bar : fiches techniques rapides,
cocktails de référence et connaissance des alcools.

## Contenu

- **Socle** : les 36 cocktails du *Socle des cocktails de référence* (référentiel officiel des cocktails
  classiques, version finale 12-2024, édition 2025, qui remplace le carnet de cocktails contemporains de
  l'APEB) — recette en ml, historique, méthode, verre, garniture, technique, variantes, TAV. Recherche,
  filtres par catégorie, base et méthode, favoris.
- **Fiche** : quantités pour N verres (batch), allergènes repérés d'après les ingrédients, coûts, export PDF.
- **Mes fiches** : création de fiches techniques, de zéro ou en « revisite » d'un cocktail du socle.
  Contenance, catégorie, TAV, grammes d'alcool pur, coût matière et prix de vente sont calculés en direct.
  Les fiches sont enregistrées sur l'appareil.
- **Culture** (onglet) :
  - *Culture produits* : 22 fiches (spiritueux, liqueurs, vins, bières, saké, agrumes, sucres, café) avec
    frise de dates, étapes d'élaboration, arômes, service, plus neuf articles et des schémas d'alambics.
  - *Culture bar* : frise du cocktail, grandes époques, figures, bars mythiques, livres, brigade, service.
  - *Matériel de bar* : 21 outils et 20 verres illustrés, usage et conseils.
  - *Guide du socle* : bonnes pratiques, familles, méthodes, calcul du TAV, lexique.
- **Outils** : quiz (socle, produits, matériel, culture bar, lexique ; 5 à 30 questions), mercuriale
  personnelle, calculateur de coût d'une dose et convertisseur de volumes.
- **Effets visuels** : écran d'ouverture animé, grande scène d'en-tête sur chaque fiche (verre qui se
  remplit, vague, bulles, garniture, parallaxe), tutoriel animé de chaque méthode, schémas d'alambics
  animés, dégradés, barre d'onglets en verre dépoli, compteurs animés, retour haptique.
- **Photos** : l'utilisateur peut attacher sa propre photo à chaque fiche (réduite et enregistrée sur
  l'appareil, reprise dans le PDF). S'y ajoutent 16 photos d'illustration
  des produits, de Wikimedia Commons sous licences libres (`assets/photos`, crédits dans `src/data/photos.ts` et sur
  l'écran « Crédits photo »).
- **Garnitures** : chaque cocktail du socle est dessiné avec sa garniture exacte (liste dans
  `src/data/cocktails.ts`, dessins dans `src/components/Illustrations.tsx`).
- **Niveau de détail** : les fiches produits s'affichent en Essentiel, Standard ou Complet (choix mémorisé).
- **Carte** : export PDF de la carte du bar à partir des fiches personnelles.

Direction artistique : blancs chauds et bordeaux, titres en DM Serif Display, animations légères.

## Règles de calcul

- TAV = Σ(volume × TAV) ÷ contenance, selon la partie 8 du socle (ingrédients en ml uniquement, sans dilution).
- Coût matière = ingrédients + 10 % de décoration (règle de la mercuriale du socle).
- Prix de vente HT = coût matière ÷ ratio matière visé ; TVA 20 % (10 % sans alcool).
- Les TAV et prix par défaut viennent de l'annexe « Mercuriale bar » du socle et sont modifiables par fiche.

## Démarrer

```bash
npm install
npm start          # puis ouvrir dans Expo Go, ou :
npm run android
npm run ios
npm run web
npm run typecheck
```

## Organisation

- `src/app/` : écrans (Expo Router)
- `src/data/` : cocktails du socle, catalogue d'ingrédients, fiches alcools, guide
- `src/lib/` : calculs, stockage local, export PDF
- `src/components/` : composants d'interface

L'abus d'alcool est dangereux pour la santé, à consommer avec modération.

## Site vitrine

Le dossier `site/` contient le site de présentation de l'application (statique, sans build : `index.html`,
`styles.css`, `script.js`, captures d'écran dans `site/img`). Pour le voir : ouvrir `site/index.html`.

Le workflow `.github/workflows/pages.yml` publie le site à la racine de GitHub Pages et la version web de
l'application dans le sous-dossier `/app`.

Pour activer les boutons de téléchargement à la sortie, renseigner les liens des stores dans `STORE_LINKS`,
en haut de `site/script.js`.
