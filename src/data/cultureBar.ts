// Culture bar : histoire du métier, figures, lieux, livres, organisation. Contenu rédigé pour
// l'application, à partir de faits historiques largement documentés.

import type { Rubrique } from './guide';

export const FRISE_BAR: [string, string][] = [
  ['1638', 'Première recette de punch connue, en Inde : l’ancêtre des boissons mélangées.'],
  ['1806', 'Un journal de l’État de New York définit le « cock-tail » : spiritueux, sucre, eau et bitters.'],
  ['XIXe s.', 'La glace se vend toute l’année : naissance des juleps, cobblers et sours glacés.'],
  ['1862', 'Jerry Thomas publie le premier guide du barman.'],
  ['1911', 'Ouverture du New York Bar à Paris, futur Harry’s New York Bar.'],
  ['1920-1933', 'Prohibition aux États-Unis : les barmen s’exilent à La Havane, Londres et Paris.'],
  ['1930', 'Parution du Savoy Cocktail Book à Londres.'],
  ['Années 1930', 'Don the Beachcomber puis Trader Vic lancent la culture Tiki.'],
  ['1951', 'Fondation de l’International Bartenders Association (IBA).'],
  ['Années 1970-1980', 'L’âge sombre : mélanges tout prêts, sodas et couleurs vives.'],
  ['1987', 'Dale DeGroff remet les classiques et les jus frais à l’honneur à New York.'],
  ['Fin 1999', 'Milk & Honey ouvre à New York : le renouveau des bars à cocktails.'],
  ['2025', 'En France, le certificat de spécialisation Métiers du bar succède à la mention complémentaire.'],
];

export type Figure = { nom: string; epoque: string; role: string; texte: string };

export const FIGURES: Figure[] = [
  {
    nom: 'Jerry Thomas',
    epoque: '1830-1885',
    role: 'Auteur du premier guide du barman, en 1862',
    texte: 'Surnommé « le Professeur », il parcourt les États-Unis et fait du barman un artiste. Son guide fixe les premières familles de boissons ; son numéro le plus célèbre, le Blue Blazer, fait passer du whisky enflammé d’une timbale à l’autre.',
  },
  {
    nom: 'Harry Johnson',
    epoque: 'XIXe siècle',
    role: 'Auteur d’un manuel qui décrit pour la première fois la gestion d’un bar',
    texte: 'Son Bartenders’ Manual (1882) ne se contente pas des recettes : il explique comment accueillir, tenir son poste, former son équipe. C’est le premier traité du métier.',
  },
  {
    nom: 'Ada Coleman',
    epoque: '1875-1966',
    role: 'Cheffe barmaid de l’American Bar du Savoy, à Londres, de 1903 à 1925',
    texte: 'L’une des rares femmes à la tête d’un grand bar à son époque. On lui doit le Hanky Panky, à base de gin, de vermouth rouge et de fernet.',
  },
  {
    nom: 'Harry Craddock',
    epoque: '1876-1963',
    role: 'Auteur du Savoy Cocktail Book, en 1930',
    texte: 'Barman anglais formé aux États-Unis, revenu à Londres à cause de la Prohibition. Son recueil de 750 recettes reste une référence, et il popularise le White Lady et le Corpse Reviver n° 2.',
  },
  {
    nom: 'Harry MacElhone',
    epoque: '1890-1958',
    role: 'Patron du Harry’s New York Bar à Paris à partir de 1923',
    texte: 'Écossais, il rachète le bar de la rue Daunou et en fait le rendez-vous des Américains de Paris. Son nom est associé au French 75, au Sidecar et au Boulevardier.',
  },
  {
    nom: 'Constante Ribalaigua',
    epoque: '1888-1952',
    role: 'Maître du Daiquiri au Floridita de La Havane',
    texte: 'Surnommé « le roi du cocktail » à Cuba, il perfectionne le Daiquiri à la glace pilée et crée pour Ernest Hemingway la version qui porte son nom.',
  },
  {
    nom: 'Don the Beachcomber',
    epoque: '1907-1989',
    role: 'Inventeur du bar Tiki, à Hollywood, dans les années 1930',
    texte: 'Ernest Gantt, dit Donn Beach, imagine un décor polynésien de fantaisie et des mélanges secrets de rhums, de jus et d’épices, dont le Zombie.',
  },
  {
    nom: 'Trader Vic',
    epoque: '1902-1984',
    role: 'Créateur du Mai Tai et ambassadeur de la culture Tiki',
    texte: 'Victor Bergeron ouvre son restaurant à Oakland, en Californie, et exporte le style Tiki dans le monde entier.',
  },
  {
    nom: 'Dick Bradsell',
    epoque: '1959-2016',
    role: 'Créateur de l’Espresso Martini et du Bramble, à Londres',
    texte: 'Figure centrale du renouveau londonien des années 1980 et 1990, il signe plusieurs classiques modernes désormais inscrits au socle.',
  },
  {
    nom: 'Dale DeGroff',
    epoque: 'Né en 1948',
    role: 'Artisan du retour aux jus frais et aux classiques, à New York, dès 1987',
    texte: 'Au Rainbow Room, il bannit les mélanges industriels et remet les recettes d’avant la Prohibition à la carte. On le surnomme « King Cocktail ».',
  },
  {
    nom: 'Sasha Petraske',
    epoque: '1973-2015',
    role: 'Fondateur du bar Milk & Honey, à New York',
    texte: 'Porte discrète, réservation, règles de savoir-vivre, glace taillée, dosages précis : il fixe les codes du bar à cocktails contemporain. Le Penicillin y est créé en 2005.',
  },
];

export type Lieu = { nom: string; ville: string; annee: string; texte: string };

export const BARS: Lieu[] = [
  { nom: 'American Bar du Savoy', ville: 'Londres', annee: 'Années 1890', texte: 'Le bar d’hôtel par excellence, où se succèdent Ada Coleman et Harry Craddock.' },
  { nom: 'Harry’s New York Bar', ville: 'Paris', annee: '1911', texte: 'Rue Daunou : refuge des Américains pendant la Prohibition, lié au French 75 et au Sidecar.' },
  { nom: 'El Floridita', ville: 'La Havane', annee: 'XIXe s.', texte: 'Le « berceau du Daiquiri », où officiait Constante Ribalaigua.' },
  { nom: 'Harry’s Bar', ville: 'Venise', annee: '1931', texte: 'Giuseppe Cipriani y crée le Bellini en 1948.' },
  { nom: 'Bar Hemingway du Ritz', ville: 'Paris', annee: 'XXe s.', texte: 'Petit bar feutré de la place Vendôme, emblème du bar d’hôtel à la française.' },
  { nom: 'Milk & Honey', ville: 'New York', annee: 'Fin 1999', texte: 'Le bar qui lance le renouveau du cocktail artisanal.' },
];

export type Livre = { titre: string; auteur: string; annee: string; texte: string };

export const LIVRES: Livre[] = [
  { titre: 'How to Mix Drinks', auteur: 'Jerry Thomas', annee: '1862', texte: 'Le premier guide du barman jamais publié.' },
  { titre: 'Bartenders’ Manual', auteur: 'Harry Johnson', annee: '1882', texte: 'Recettes et, pour la première fois, tenue et gestion d’un bar.' },
  { titre: 'American Bar', auteur: 'Frank Newman', annee: '1904', texte: 'Publié à Paris : première recette imprimée du Dry Martini.' },
  { titre: 'Recipes for Mixed Drinks', auteur: 'Hugo Ensslin', annee: '1916', texte: 'Dernier grand recueil new-yorkais d’avant la Prohibition ; on y trouve l’Aviation.' },
  { titre: 'Cocktails: How to Mix Them', auteur: 'Robert Vermeire', annee: '1922', texte: 'Publié à Londres : première recette du Sidecar.' },
  { titre: 'The Savoy Cocktail Book', auteur: 'Harry Craddock', annee: '1930', texte: 'Le grand classique de l’entre-deux-guerres, toujours réédité.' },
];

export const EPOQUES: Rubrique[] = [
  { titre: 'Les origines : punchs et boissons mêlées', texte: 'Du XVIIe au XVIIIe siècle, on partage le punch au bol : alcool, agrume, sucre, eau et épices. C’est déjà l’équilibre des 3 S.' },
  { titre: 'L’âge d’or (1860-1920)', texte: 'Aux États-Unis, la glace, les bitters, le vermouth et les premiers livres donnent naissance aux grands classiques : Old-Fashioned, Manhattan, Martini, Sour, Fizz, Julep.' },
  { titre: 'La Prohibition (1920-1933)', texte: 'La fabrication et la vente d’alcool sont interdites aux États-Unis. Les bars clandestins, les « speakeasies », prospèrent ; les meilleurs barmen partent travailler à Cuba et en Europe, où ils diffusent leur savoir-faire.' },
  { titre: 'L’ère Tiki (années 1930-1960)', texte: 'Décors polynésiens, rhums assemblés, sirops d’épices et jus exotiques : le dépaysement devient un style, du Zombie au Mai Tai.' },
  { titre: 'L’âge sombre (années 1970-1990)', texte: 'Les préparations industrielles remplacent les produits frais. Les cocktails se font longs, sucrés et colorés ; la technique recule.' },
  { titre: 'La renaissance (depuis 1990-2000)', texte: 'Retour des jus pressés, de la glace de qualité, des recettes historiques et des spiritueux d’artisans. De nouveaux classiques apparaissent : Espresso Martini, Penicillin, Gin Basil Smash.' },
  { titre: 'Aujourd’hui', texte: 'Cocktails à faible TAV et sans alcool, saisonnalité, lutte contre le gaspillage, préparations maison : les bonnes pratiques du socle reflètent ces évolutions.' },
];

export const BRIGADE: Rubrique[] = [
  { titre: 'Chef barman · directeur de bar', texte: 'Conçoit la carte, fixe les prix, gère les stocks et les commandes, recrute, forme et anime l’équipe.' },
  { titre: 'Barman · barmaid', texte: 'Accueille, conseille, réalise les boissons, encaisse, et tient son poste propre et approvisionné.' },
  { titre: 'Commis de bar · barback', texte: 'Assure la mise en place, le réassort de glace, de verres et de produits ; c’est le poste d’apprentissage du métier.' },
  { titre: 'Les qualités attendues', texte: 'Sens de l’accueil, rigueur des dosages, mémoire des recettes, rapidité, discrétion, connaissance des produits et pratique des langues.' },
];

export const TYPES_BARS: Rubrique[] = [
  { titre: 'Bar d’hôtel', texte: 'Service classique, clientèle internationale, grande amplitude horaire.' },
  { titre: 'Bar à cocktails', texte: 'Carte de créations, produits frais et préparations maison.' },
  { titre: 'Speakeasy', texte: 'Bar à l’entrée cachée, inspiré des bars clandestins de la Prohibition.' },
  { titre: 'Bar Tiki', texte: 'Décor exotique, rhums et cocktails tropicaux.' },
  { titre: 'Pub et bar à bières', texte: 'Bières à la pression, ambiance conviviale, service au comptoir.' },
  { titre: 'Bar à vins', texte: 'Vins au verre, accords avec une petite restauration.' },
  { titre: 'Bar de restaurant', texte: 'Apéritifs, digestifs et accompagnement du repas, en lien avec la salle.' },
  { titre: 'Bar de nuit et discothèque', texte: 'Gros volumes, rapidité, long drinks et service à la bouteille.' },
];

export const SERVICE: string[] = [
  'Accueillir dès l’arrivée : un regard, un mot, même en plein service',
  'Installer, présenter la carte, servir l’eau',
  'Écouter et conseiller selon le moment et les goûts',
  'Prendre la commande et la reformuler',
  'Réaliser le cocktail devant le client, poste propre',
  'Servir sur un sous-verre, annoncer la boisson',
  'Suivre la table : renouveler, débarrasser, proposer',
  'Encaisser, remercier, prendre congé',
];

export const REPERES_METIER: Rubrique[] = [
  { titre: 'Se former en France', texte: 'Le certificat de spécialisation « Métiers du bar » succède à la mention complémentaire « Employé barman » à la rentrée 2025. Le brevet professionnel « Barman » permet ensuite d’évoluer vers l’encadrement. Le socle des cocktails de référence est le cadre commun de ces formations.' },
  { titre: 'Associations professionnelles', texte: 'L’International Bartenders Association (IBA), fondée en 1951 en Angleterre, fédère les associations nationales et publie une liste de cocktails officiels. En France, l’Association des Barmen de France (ABF) et l’Association des Professeurs Enseignant en Bar (APEB) animent la profession et la formation.' },
  { titre: 'Concours', texte: 'Concours de créations, de classiques et de « flair » (jonglerie avec bouteilles et timbales) rythment la vie du métier. Un jury y note la technique, la régularité, la présentation et le goût.' },
  { titre: 'La mise en place', texte: 'Avant l’ouverture : glace, jus pressés, sirops, garnitures, verrerie, bouteilles rangées dans l’ordre d’usage. Un service fluide se prépare avant le premier client.' },
];
