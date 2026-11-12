# Fiches Bar

Application mobile (Expo / React Native) pour les professionnels du bar : fiches techniques rapides,
cocktails de référence et connaissance des alcools.

## Contenu

- **Socle** : les 36 cocktails du *Socle des cocktails de référence* (référentiel officiel des cocktails
  classiques, version finale 12-2024, édition 2025, qui remplace le carnet de cocktails contemporains de
  l'APEB) — recette en ml, historique, méthode, verre, garniture, technique, variantes, TAV.
- **Mes fiches** : création de fiches techniques, de zéro ou en « revisite » d'un cocktail du socle.
  Contenance, catégorie, TAV, grammes d'alcool pur, coût matière et prix de vente sont calculés en direct.
  Export PDF. Les fiches sont enregistrées sur l'appareil.
- **Alcools** : histoire, élaboration, catégories et repères pour chaque grande famille (gin, vodka,
  whisky, rhum, cachaça, tequila et mezcal, cognac, armagnac, calvados, pisco, liqueurs, amers, anisés,
  vermouth, vins mutés, effervescents), plus des articles de base.
- **Guide** : bonnes pratiques, catégories, familles, méthodes, verrerie, calcul du TAV et lexique du socle.

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
