// Contenu repris du « Socle des cocktails de référence » (version finale 12-2024, édition 2025).

export type Rubrique = { titre: string; texte: string };

export const BONNES_PRATIQUES: Rubrique[] = [
  {
    titre: 'Valoriser l’eau-de-vie de base',
    texte:
      'Il est d’usage d’utiliser une seule eau-de-vie afin de respecter ses caractéristiques gustatives. Cependant, il est possible de rencontrer, dans certains ouvrages ou certaines pratiques, des recettes comportant plusieurs eaux-de-vie.',
  },
  {
    titre: 'Maintenir l’équilibre des ingrédients',
    texte:
      'Le choix des ingrédients doit respecter la saisonnalité et valoriser l’eau-de-vie de base sélectionnée pour apporter une complémentarité gustative. Il est recommandé de se limiter à 6 ingrédients maximum pour veiller à l’équilibre organoleptique du cocktail.',
  },
  {
    titre: 'Connaître la règle des « 3 S »',
    texte:
      'SWEET : le sucré, la douceur du cocktail (liqueur, crème, fruit, sirop ou sucre en poudre extra fin). SOUR : l’acidité, le lien du cocktail (agrume, verjus ou solution acide). STRONG : la puissance, le corps du cocktail, apportée principalement par l’eau-de-vie ou le spiritueux.',
  },
  {
    titre: 'Garder à l’esprit la consommation responsable',
    texte:
      'Il est d’usage de limiter la quantité d’alcool utilisée dans une création. Toutes les boissons alcoolisées n’offrent pas la même puissance alcoolique : il faut prendre en compte le titre alcoométrique volumique d’un cocktail afin de proposer des offres adaptées (www.alcool-info-service.fr).',
  },
  {
    titre: 'Proposer une garniture comestible et de saison',
    texte:
      'La garniture est une valeur ajoutée : en plus du visuel, elle apporte une complémentarité gustative. Elle doit rester simple, de saison, évoquer si possible les ingrédients du cocktail. Dans un esprit anti-gaspillage, les fruits déshydratés peuvent remplacer les fruits frais. Pailles en matière écoresponsable, et à la demande du client.',
  },
  {
    titre: 'Adapter le dosage à la verrerie',
    texte:
      'Selon les fournisseurs, les verres possèdent une contenance différente. Il est donc important d’adapter la recette à la contenance réelle du verre.',
  },
  {
    titre: 'Respecter les principes d’élaboration',
    texte:
      'Verser les ingrédients du moins cher au plus cher lors d’une création ou d’une revisite, afin de limiter les pertes en cas d’erreur de dosage. Choisir la technique selon les ingrédients : shaker pour mélanger, émulsionner et rafraîchir en limitant la fonte de la glace (jus, crème, œuf…) ; verre à mélange pour mélanger et rafraîchir en apportant la dilution nécessaire aux produits alcooliques (pas pour les jus ni les sodas) ; direct au verre lorsque les ingrédients se mélangent facilement.',
  },
  {
    titre: 'Rédiger les recettes en ml',
    texte:
      'Pour simplifier l’exportation des recettes à l’international et faciliter l’adaptation à une verrerie irrégulière, privilégier les dosages exprimés en ml (rappel : 1 cl = 10 ml).',
  },
];

export const CATEGORIES: Rubrique[] = [
  { titre: 'Short drink', texte: 'Plutôt puissant. Il ne dépasse pas 100 ml (inférieur à 10 cl).' },
  { titre: 'Long drink', texte: 'Plutôt allongé. À partir de 100 ml (à partir de 10 cl).' },
];

export const TYPES: Rubrique[] = [
  {
    titre: 'Before dinner (apéritif)',
    texte: 'Plus ou moins amer, parfois sec, consommé de préférence avant le repas.',
  },
  {
    titre: 'After dinner (digestif)',
    texte: 'Plus ou moins liquoreux, parfois puissant, consommé de préférence après le repas.',
  },
  {
    titre: 'All day cocktail (tout moment)',
    texte: 'Plus ou moins fruité, souvent désaltérant, consommé quel que soit le moment de la journée.',
  },
];

export const FAMILLES: Rubrique[] = [
  {
    titre: 'Colada',
    texte:
      'Long drink, réalisé au shaker ou au blender, composé d’eau-de-vie, de crème de coco et de jus de fruit. Le plus connu est la Piña Colada.',
  },
  {
    titre: 'Fizz',
    texte:
      'Long drink, réalisé au shaker, composé d’eau-de-vie, de sucre, de citron et d’eau gazeuse. Le plus connu est le Gin Fizz.',
  },
  {
    titre: 'Julep',
    texte:
      'Short drink, réalisé directement dans une timbale, composé d’eau-de-vie vieillie, de sucre et de menthe fraîche. Le plus connu est le Mint Julep.',
  },
  {
    titre: 'Old-Fashioned',
    texte:
      'Short drink, réalisé directement au verre, composé d’eau-de-vie vieillie, de sucre et d’aromatic bitters. Le plus connu est le Rye Whiskey Old-Fashioned.',
  },
  {
    titre: 'Smash',
    texte:
      'Short drink, réalisé au shaker, composé d’une eau-de-vie, d’une herbe aromatique, de sucre et de citron ou d’un autre agrume. Le plus connu est le Gin Basil Smash.',
  },
  {
    titre: 'Sour',
    texte:
      'Short drink, réalisé au shaker, composé d’un spiritueux, de sucre, de citron ou d’un autre agrume. Souvent réalisé avec du blanc d’œuf ou un autre émulsifiant. Le plus connu est le Whiskey Sour.',
  },
  {
    titre: 'Tiki',
    texte:
      'Long drink, réalisé au shaker ou au blender, composé d’une eau-de-vie (généralement un ou plusieurs rhums), de sucre (ou sirop d’épices), de citron vert ou d’un autre agrume, et de plusieurs jus de fruits. Le plus connu est le Mai Tai.',
  },
  {
    titre: 'Collins',
    texte: 'Long drink, ayant la même composition qu’un Fizz, mais réalisé directement au verre.',
  },
  {
    titre: 'Daisy',
    texte:
      'Short drink, réalisé directement au shaker, composé d’eau-de-vie, de jus de citron, de curaçao et d’eau gazeuse.',
  },
  {
    titre: 'Flip',
    texte:
      'Short drink, composé d’un jaune d’œuf, d’une base de vin et/ou d’un spiritueux, et saupoudré de noix de muscade râpée.',
  },
  { titre: 'Highball', texte: 'Long drink, composé d’eau-de-vie et allongé avec un soda.' },
];

export const METHODES: { titre: string; etapes: string[] }[] = [
  {
    titre: 'Au verre à mélange',
    etapes: [
      'Mirer le verre',
      'Remplir le verre de glace',
      'Mirer le verre à mélange',
      'Remplir le verre à mélange de glace',
      'Rafraîchir le verre à mélange avec la cuillère de bar',
      'Rafraîchir le verre avec la cuillère de bar',
      'Retirer les glaçons du verre de service',
      'Égoutter la glace du verre à mélange',
      'Verser les ingrédients dans l’ordre de la recette dans le verre à mélange',
      'Mélanger à l’aide de la cuillère de bar pendant 15 à 20 secondes',
      'Passer dans le verre de service',
      'Garnir si besoin',
    ],
  },
  {
    titre: 'Au shaker',
    etapes: [
      'Mirer le verre',
      'Remplir le verre de glace',
      'Remplir la grande timbale du shaker de glace',
      'Rafraîchir avec la cuillère de bar',
      'Verser les ingrédients dans l’ordre de la recette dans la petite timbale',
      'Retirer les glaçons ou égoutter la glace en fonction de la recette',
      'Compléter de glace si besoin',
      'Égoutter la glace de la grande timbale du shaker',
      'Fermer le shaker et frapper 7 à 10 secondes',
      'Passer dans le verre',
      'Rafraîchir le complément dans la grande timbale du shaker avant de compléter le verre (sauf boissons effervescentes, stockées au frais)',
      'Mélanger si ajout d’un complément',
      'Selon la recette : garnir, ajouter stick et/ou paille',
    ],
  },
  {
    titre: 'Direct au verre',
    etapes: [
      'Mirer le verre',
      'Remplir le verre de glace',
      'Rafraîchir avec la cuillère de bar',
      'Égoutter le verre',
      'Compléter de glace si besoin',
      'Verser les ingrédients dans l’ordre de la recette',
      'Selon la recette : mélanger, garnir, ajouter stick et/ou paille',
    ],
  },
];

export const VERRERIE = {
  incontournables: ['Shot', 'Mule', 'Rocks', 'Highball', 'Dégustation', 'Nick & Nora', 'Coupe', 'Martini', 'Vin', 'Flûte'],
  complementaires: ['Digestif', 'Absinthe', 'Toddy', 'Punch', 'Hurricane', 'Copa', 'Bière', 'Julep', 'Tiki', 'Fantaisie'],
};

export const MATERIEL = [
  'Doseur (jigger)',
  'Passoire fine',
  'Passoire à cocktail',
  'Verre à mélange',
  'Shaker Boston',
  'Shaker continental',
  'Shaker trois pièces',
  'Pilon',
  'Cuillère de bar',
  'Presse-agrumes',
  'Passoire à julep',
  'Éplucheur',
  'Bec verseur',
];

export const LEXIQUE: [string, string][] = [
  ['Albédo', 'Partie intérieure blanche de l’écorce d’un agrume, parfois appelée « ziste ».'],
  ['Aquafaba', 'Jus de pois chiche utilisé comme émulsifiant.'],
  ['Aromatic bitters', 'Terme anglo-saxon signifiant amer concentré aromatisé.'],
  ['Bartender', 'Terme unisexe américain désignant à la fois le barman et la barmaid.'],
  ['Blender', 'Mixeur électrique.'],
  ['Bar spoon', 'Terme anglo-saxon signifiant cuillère à mélange ou cuillère de bar.'],
  ['Bar mat', 'Terme anglo-saxon signifiant tapis de bar.'],
  ['Bowl', 'Récipient de grand volume utilisé pour l’élaboration et le service des familles Punch, Tiki, etc.'],
  [
    'Cuban roll',
    'Technique qui consiste à transvaser les liquides d’une timbale à une autre, afin de les oxygéner et de les rafraîchir. Appelée autrefois « throwing ».',
  ],
  ['Collins', 'Famille de cocktails. Long drink ayant la même composition qu’un Fizz, mais réalisé directement au verre.'],
  ['Compléter', '(Topped) Allonger un cocktail d’un complément de type soda, eau gazeuse, champagne, etc.'],
  [
    'Daisy',
    'Famille de cocktails. Short drink réalisé au shaker, composé d’eau-de-vie, de jus de citron, de curaçao et d’eau gazeuse.',
  ],
  [
    'Décoction',
    'Résultat d’un procédé d’extraction à chaud recommandé pour les racines, les écorces, etc., dont les substances sont difficilement solubles.',
  ],
  [
    'Distillation',
    'Procédé de séparation et de concentration d’éléments aromatiques. Le liquide est chauffé, les vapeurs s’en dégagent puis sont refroidies pour redevenir un liquide concentré en arômes, nommé distillat.',
  ],
  ['Double filtration', '(Double strain) Filtrer le cocktail à l’aide d’une passoire fine en plus de la passoire à cocktail.'],
  [
    'Dry shake',
    'Technique au shaker qui consiste à frapper une première fois sans glace, avec un émulsifiant (blanc d’œuf, aquafaba, etc.).',
  ],
  ['Exprimer', 'Libérer les essences d’un zeste.'],
  ['Eau-de-vie', 'Boisson alcoolique obtenue par distillation de produits fermentés.'],
  ['Fat washing', 'Technique qui consiste à aromatiser un alcool à partir d’un corps gras.'],
  [
    'Fermentation alcoolique',
    'Procédé qui consiste à transformer le sucre en alcool sous l’action des levures, avec un dégagement de gaz carbonique (CO2).',
  ],
  [
    'Flip',
    'Short drink composé d’un jaune d’œuf, d’une base de vin et/ou d’un spiritueux, saupoudré de noix de muscade râpée.',
  ],
  ['Float', 'Verser un filet de liquide au-dessus d’un cocktail sans le mélanger.'],
  ['Frapper', 'Action de shaker.'],
  ['Frozen', 'Cocktail réalisé au blender avec de la glace pilée pour obtenir un aspect granité (ex. : Frozen Daiquiri).'],
  ['Garnir', 'Action d’ajouter un élément de décor dans une boisson.'],
  ['Givrer', '(Rim) Créer une décoration sur les parois d’un verre (ex. : Margarita).'],
  ['Highball', 'Long drink composé d’eau-de-vie et allongé avec un soda.'],
  ['Hot drink', 'Cocktail servi chaud (ex. : Irish Coffee, Grog).'],
  ['Infusion', 'Procédé d’extraction d’arômes dans un liquide, à chaud.'],
  ['Jigger', 'Terme anglo-saxon signifiant un doseur.'],
  ['Macération', 'Procédé d’extraction d’arômes dans un liquide, à froid.'],
  ['Mélanger', '(Stir) Remuer une boisson à l’aide de la cuillère de bar.'],
  ['Mesure', 'Terme désignant un volume de 40 ml (standard français).'],
  ['Mocktail', 'Cocktail sans alcool, de l’anglais « mock » signifiant imiter.'],
  [
    'Muter',
    'Empêcher ou stopper la fermentation alcoolique par l’ajout d’un alcool, afin de conserver les sucres naturels.',
  ],
  [
    'No low',
    'Contraction de « no alcohol » et « low alcohol by volume ». Désigne les cocktails sans alcool ou à faible titre alcoométrique volumique (consommation responsable).',
  ],
  ['Passer', 'Utiliser la passoire pour éliminer des excédents (glace, pépins, etc.).'],
  ['Passoire', '(Strainer) Ustensile de bar utilisé pour filtrer.'],
  [
    'Presse-agrumes',
    '(Juicer) électrique ou (squeezer) manuel, il permet d’obtenir des jus frais d’agrumes (citrons, oranges ou pamplemousses).',
  ],
  ['Pourer', 'Terme anglo-saxon désignant un bec verseur.'],
  ['Pré-batch', 'Terme anglo-saxon désignant la base d’un cocktail préparée à l’avance.'],
  ['Rainbow', 'Terme anglo-saxon désignant un arc-en-ciel (cocktail à étages).'],
  [
    'Reverse dry shake',
    'Technique au shaker qui consiste à frapper une seconde fois sans glace, avec un émulsifiant (blanc d’œuf, aquafaba, etc.).',
  ],
  ['Shaker Boston', '(Double tin) Shaker de deux timbales qui s’emboîtent avec un axe décalé.'],
  ['Shaker continental', '(Parisian shaker) Shaker de deux timbales qui s’emboîtent parfaitement.'],
  ['Shaker trois pièces', '(Cobbler shaker) Shaker qui se différencie par sa passoire intégrée.'],
  ['Shooter', 'Boisson d’une contenance de 30 à 60 ml servie dans un verre shot.'],
  ['Sparkling', 'Cocktail long drink complété d’une boisson effervescente.'],
  ['Spiritueux', 'Boissons fortement alcoolisées.'],
  ['Squeeze bottle', 'Flacon souple permettant une verse simple des purées et des jus.'],
  ['Sirop de sucre', 'Composé d’un volume d’eau et d’un volume de sucre semoule.'],
  [
    'Swizzle stick',
    'Bâtonnet, connu aux Antilles sous le nom de « bois lélé », qui permet de remuer certains cocktails tropicaux réalisés sur glace pilée.',
  ],
  ['Timbale', '(Tin) Partie en inox ou en verre d’un shaker Boston.'],
  ['Trait', '(Dash) Terme de mesure représentant environ 3 à 5 gouttes.'],
  ['Zeste', 'Partie extérieure de l’écorce d’un agrume contenant des essences.'],
];
