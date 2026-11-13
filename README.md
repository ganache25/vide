# Knowtail — site vitrine

Site de présentation de **Knowtail**, l'application des professionnels du bar (iOS et Android, téléphones et tablettes).

Site statique, sans dépendance ni étape de build : `index.html`, `styles.css`, `script.js`.

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou lancer `python3 -m http.server` puis visiter http://localhost:8000.

## Activer les boutons de téléchargement

En haut de `script.js`, renseigner les liens des stores :

```js
const STORE_LINKS = {
  ios: "https://apps.apple.com/app/…",
  android: "https://play.google.com/store/apps/details?id=…",
};
```

Dès qu'un lien est renseigné, le bouton correspondant passe de « Bientôt sur » à « Télécharger sur » et devient cliquable.
