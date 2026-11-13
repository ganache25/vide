// Compléments illustrés des fiches « Culture produits » : frise de dates, étapes d'élaboration,
// arômes typiques, conseil de service, teinte de la bouteille. Plus les fiches de produits sans alcool.

import type { Alcool } from './alcools';

export type Plus = {
  dates: [string, string][];
  etapes: string[];
  aromes: string[];
  service: string;
  couleur: string;
};

export const PLUS: Record<string, Plus> = {
  gin: {
    dates: [
      ['XVIIe s.', 'Le genièvre néerlandais se diffuse en Europe du Nord.'],
      ['1689', 'Guillaume d’Orange monte sur le trône d’Angleterre : la distillation locale est encouragée.'],
      ['1751', 'Le Gin Act met fin à la « Gin Craze » londonienne.'],
      ['1830', 'L’alambic à colonne ouvre la voie au London Dry.'],
      ['2008', 'Le Gin Basil Smash symbolise le renouveau du gin.'],
    ],
    etapes: ['Alcool neutre', 'Botaniques', 'Redistillation', 'Réduction'],
    aromes: ['Genièvre', 'Agrumes', 'Coriandre', 'Épices', 'Floral', 'Résineux'],
    service: 'Sec et très froid en Martini, allongé de tonic, ou en sour. Un zeste d’agrume réveille ses botaniques.',
    couleur: '#DCEAE4',
  },
  vodka: {
    dates: [
      ['1405', 'Première mention écrite du mot en Pologne.'],
      ['Fin XIXe s.', 'Rectification et filtration au charbon fixent le style moderne.'],
      ['Années 1930', 'La marque Smirnoff est relancée aux États-Unis.'],
      ['1941', 'Création du Moscow Mule.'],
      ['1988', 'Le Cosmopolitan est mis au point à New York.'],
    ],
    etapes: ['Moût', 'Fermentation', 'Rectification', 'Filtration', 'Réduction'],
    aromes: ['Neutre', 'Céréale', 'Poivre blanc', 'Crémeux', 'Minéral'],
    service: 'Glacée et pure dans la tradition d’Europe de l’Est ; en cocktail, elle porte les autres ingrédients sans les masquer.',
    couleur: '#E9EEF2',
  },
  whisky: {
    dates: [
      ['1494', 'Première trace écrite en Écosse : le frère John Cor.'],
      ['1823', 'L’Excise Act légalise et structure la distillation écossaise.'],
      ['1830', 'Brevet de l’alambic à colonne de Coffey.'],
      ['1920-1933', 'Prohibition aux États-Unis.'],
      ['1923', 'Fondation de la distillerie Yamazaki au Japon.'],
      ['1964', 'Le bourbon est reconnu produit distinctif des États-Unis.'],
    ],
    etapes: ['Maltage', 'Brassage', 'Fermentation', 'Distillation', 'Fût de chêne'],
    aromes: ['Céréale', 'Vanille', 'Caramel', 'Fruits secs', 'Fumé', 'Épices', 'Miel'],
    service: 'Sec, avec quelques gouttes d’eau pour l’ouvrir, ou sur un gros glaçon. Rye et bourbon pour les classiques américains.',
    couleur: '#C98A3C',
  },
  rhum: {
    dates: [
      ['Vers 1650', 'Premiers rhums à la Barbade.'],
      ['1655', 'Le rhum devient la ration de la Royal Navy.'],
      ['1694', 'Le père Labat arrive en Martinique et perfectionne la distillation.'],
      ['Fin XIXe s.', 'Naissance du rhum agricole.'],
      ['1970', 'Black Tot Day : fin de la ration de la Navy.'],
      ['1996', 'AOC Martinique.'],
    ],
    etapes: ['Canne', 'Jus ou mélasse', 'Fermentation', 'Distillation', 'Repos ou fût'],
    aromes: ['Canne fraîche', 'Vanille', 'Fruits exotiques', 'Mélasse', 'Épices', 'Banane'],
    service: 'Blanc en ti-punch ou en cocktail frais, vieux en dégustation. Marier deux styles donne de la profondeur (Mai Tai).',
    couleur: '#B9762F',
  },
  cachaca: {
    dates: [
      ['XVIe s.', 'Premières distillations de jus de canne au Brésil.'],
      ['1948', 'Première recette publiée de la Caipirinha.'],
    ],
    etapes: ['Canne', 'Jus frais', 'Fermentation', 'Distillation', 'Repos'],
    aromes: ['Canne verte', 'Herbacé', 'Fruits blancs', 'Poivre'],
    service: 'Pilée avec citron vert et sucre en Caipirinha ; les versions vieillies se dégustent sèches.',
    couleur: '#E6E9C8',
  },
  tequila: {
    dates: [
      ['XVIe s.', 'La distillation arrive au Mexique : naissance du vino de mezcal.'],
      ['1795', 'Première licence officielle, accordée à la famille Cuervo.'],
      ['1873', 'Fondation de la maison Sauza.'],
      ['1974', 'Appellation d’origine Tequila.'],
      ['1994', 'Appellation d’origine Mezcal.'],
      ['2006', 'Création de la catégorie extra añejo.'],
    ],
    etapes: ['Agave', 'Cuisson', 'Broyage', 'Fermentation', 'Double distillation'],
    aromes: ['Agave cuit', 'Poivre', 'Agrumes', 'Terreux', 'Fumé (mezcal)', 'Vanille (añejo)'],
    service: 'Blanco pour les cocktails vifs, reposado et añejo en dégustation. Le mezcal se sirote, parfois avec une tranche d’orange.',
    couleur: '#E3D9A6',
  },
  cognac: {
    dates: [
      ['XVIe s.', 'Les marchands hollandais font distiller les vins des Charentes.'],
      ['1715', 'Fondation de la maison Martell.'],
      ['1765', 'Fondation de la maison Hennessy.'],
      ['Années 1870', 'Le phylloxéra détruit le vignoble.'],
      ['1909', 'Délimitation de l’aire de production.'],
      ['1936', 'Reconnaissance de l’AOC.'],
      ['2018', 'Le XO passe à 10 ans minimum.'],
    ],
    etapes: ['Vendange', 'Vin blanc', 'Double distillation', 'Fût de chêne', 'Assemblage'],
    aromes: ['Fruits confits', 'Vanille', 'Fleur de vigne', 'Épices', 'Rancio', 'Noix'],
    service: 'En verre tulipe, à température ambiante. VS et VSOP sont parfaits en cocktail (Sidecar, Horse’s Neck).',
    couleur: '#A8612A',
  },
  armagnac: {
    dates: [
      ['1310', 'Vital Dufour décrit les vertus de l’« aygue ardente ».'],
      ['1909', 'Délimitation de l’aire d’appellation.'],
      ['1936', 'Reconnaissance de l’AOC.'],
      ['2005', 'Appellation Blanche armagnac.'],
    ],
    etapes: ['Vendange', 'Vin blanc', 'Distillation continue', 'Pièces de chêne', 'Assemblage ou millésime'],
    aromes: ['Pruneau', 'Fruits confits', 'Vanille', 'Rancio', 'Cuir', 'Épices'],
    service: 'En verre tulipe, lentement. Une alternative de caractère dans un Old-Fashioned.',
    couleur: '#93501F',
  },
  calvados: {
    dates: [
      ['1553', 'Gilles de Gouberville note la distillation du cidre.'],
      ['1942', 'Premières appellations d’origine.'],
      ['1997', 'AOC Calvados Domfrontais.'],
    ],
    etapes: ['Pommes', 'Pressurage', 'Cidre', 'Distillation', 'Fût de chêne'],
    aromes: ['Pomme cuite', 'Poire', 'Vanille', 'Beurre', 'Épices douces'],
    service: 'Jeune et frais en long drink avec un tonic, vieux en digestif.',
    couleur: '#C28B3A',
  },
  pisco: {
    dates: [
      ['XVIe s.', 'La vigne est plantée au Pérou.'],
      ['XIXe s.', 'Le Pisco Punch triomphe à San Francisco.'],
      ['Années 1920', 'Le Pisco Sour naît à Lima.'],
    ],
    etapes: ['Raisin', 'Vin', 'Distillation unique', 'Repos en cuve'],
    aromes: ['Raisin muscaté', 'Fleurs blanches', 'Agrumes', 'Herbes'],
    service: 'En Sour avec blanc d’œuf, ou en Chilcano allongé de ginger ale.',
    couleur: '#EDE7CF',
  },
  'fruits-marcs': {
    dates: [['XVIIe s.', 'Essor de la distillation des fruits en Alsace, en Lorraine et en Forêt-Noire.']],
    etapes: ['Fruits', 'Fermentation ou macération', 'Distillation', 'Repos en verre'],
    aromes: ['Fruit frais', 'Noyau', 'Amande', 'Floral'],
    service: 'Fraîches, en petit verre tulipe ; au bar, à la bar spoon pour parfumer.',
    couleur: '#EEF0E6',
  },
  liqueurs: {
    dates: [
      ['1605', 'Les chartreux reçoivent le manuscrit de l’élixir.'],
      ['1764', 'Chartreuse verte.'],
      ['1821', 'Maraschino Luxardo à Zadar.'],
      ['1841', 'Crème de cassis de Dijon.'],
      ['1875', 'Triple sec de Cointreau à Angers.'],
      ['1880', 'Grand Marnier.'],
    ],
    etapes: ['Macération ou infusion', 'Distillation', 'Assemblage', 'Sucrage', 'Repos'],
    aromes: ['Orange', 'Fruits rouges', 'Plantes', 'Café', 'Amande', 'Violette'],
    service: 'Dosées au ml : elles apportent sucre et parfum. Les crèmes de fruits ouvertes se gardent au frais.',
    couleur: '#D9772B',
  },
  amers: {
    dates: [
      ['1806', 'Première définition du cocktail : spiritueux, sucre, eau et bitters.'],
      ['1824', 'Création de l’amer d’Angostura.'],
      ['1860', 'Bitter de Gaspare Campari.'],
      ['1885', 'Gentiane Salers.'],
      ['1889', 'Suze.'],
      ['1919', 'Aperol.'],
    ],
    etapes: ['Plantes et écorces', 'Macération', 'Filtration', 'Sucrage', 'Coloration'],
    aromes: ['Orange amère', 'Gentiane', 'Quinquina', 'Rhubarbe', 'Clou de girofle', 'Cannelle'],
    service: 'Au trait pour les aromatic bitters, sur glace et allongés pour les bitters apéritifs.',
    couleur: '#C43A2F',
  },
  anises: {
    dates: [
      ['1805', 'Distillerie Pernod à Pontarlier.'],
      ['1915', 'Interdiction de l’absinthe en France.'],
      ['1932', 'Pastis de Paul Ricard.'],
      ['2011', 'L’absinthe retrouve officiellement son nom en France.'],
    ],
    etapes: ['Plantes', 'Macération', 'Distillation', 'Coloration', 'Réduction'],
    aromes: ['Anis', 'Fenouil', 'Réglisse', 'Armoise', 'Menthe'],
    service: 'Toujours allongés d’eau fraîche, la glace en dernier ; l’absinthe en rinçage de verre.',
    couleur: '#B9CC7A',
  },
  vermouth: {
    dates: [
      ['1786', 'Carpano crée le vermouth à Turin.'],
      ['1813', 'Vermouth sec de Joseph Noilly.'],
      ['1821', 'Maison Dolin à Chambéry.'],
      ['Vers 1880', 'Le Manhattan fait entrer le vermouth dans le cocktail.'],
      ['1904', 'Première recette publiée du Dry Martini.'],
    ],
    etapes: ['Vin blanc', 'Extraits de plantes', 'Sucrage', 'Mutage', 'Repos'],
    aromes: ['Armoise', 'Herbes', 'Vanille', 'Orange', 'Épices', 'Caramel'],
    service: 'Frais, sur glace avec un zeste. Ouvert, il se garde au réfrigérateur quelques semaines.',
    couleur: '#8E2F2A',
  },
  'vins-mutes': {
    dates: [
      ['Fin XIIIe s.', 'Arnaud de Villeneuve décrit le mutage.'],
      ['1703', 'Traité de Methuen : essor du porto en Angleterre.'],
      ['1756', 'Délimitation du vignoble du Douro.'],
      ['XIXe s.', 'Le Sherry Cobbler triomphe aux États-Unis.'],
    ],
    etapes: ['Vendange', 'Fermentation', 'Mutage', 'Élevage', 'Assemblage'],
    aromes: ['Amande', 'Noix', 'Fruits secs', 'Pruneau', 'Salin (fino)', 'Caramel'],
    service: 'Fino très frais, porto tawny légèrement rafraîchi. Idéals pour des cocktails à faible TAV.',
    couleur: '#7A2B22',
  },
  effervescents: {
    dates: [
      ['1668', 'Dom Pérignon arrive à l’abbaye d’Hautvillers.'],
      ['1816', 'Remuage sur pupitres chez Clicquot.'],
      ['1855', 'Première mention du Champagne Cocktail.'],
      ['1936', 'AOC Champagne.'],
      ['1948', 'Création du Bellini.'],
      ['2009', 'Prosecco DOC.'],
    ],
    etapes: ['Vin de base', 'Assemblage', 'Prise de mousse', 'Vieillissement sur lies', 'Dosage'],
    aromes: ['Agrumes', 'Pomme', 'Brioche', 'Fleurs blanches', 'Poire'],
    service: 'Entre 6 et 9 °C. Toujours ajoutés en dernier, sans shaker, puis mélangés d’un seul geste.',
    couleur: '#E9D48A',
  },
  'biere-cidre': {
    dates: [
      ['1516', 'Décret de pureté bavarois.'],
      ['1842', 'Première pils à Plzeň.'],
      ['1876', 'Pasteur publie ses Études sur la bière.'],
      ['Années 1980', 'Essor des brasseries artisanales.'],
    ],
    etapes: ['Maltage', 'Brassage', 'Houblonnage', 'Fermentation', 'Garde'],
    aromes: ['Céréale', 'Houblon', 'Agrumes', 'Caramel', 'Torréfié', 'Levure'],
    service: 'Verre propre rincé à l’eau froide, col de mousse de deux doigts.',
    couleur: '#D9A441',
  },
  sake: {
    dates: [['XVIe s.', 'Apparition du shochu dans l’île de Kyushu.']],
    etapes: ['Polissage du riz', 'Cuisson vapeur', 'Kōji', 'Fermentation', 'Pressurage'],
    aromes: ['Riz', 'Poire', 'Melon', 'Fleurs', 'Umami'],
    service: 'Frais pour les ginjō, tiède pour certains junmai. Bouteille ouverte au réfrigérateur.',
    couleur: '#F1EFE2',
  },
};

const FRAIS = 'Produits frais et sans alcool';

export const NOUVEAUX: (Alcool & Plus)[] = [
  {
    id: 'agrumes',
    nom: 'Agrumes',
    famille: FRAIS,
    accroche: 'L’acidité et le parfum : le « sour » de l’équilibre des 3 S.',
    reperes: [
      ['Les indispensables', 'Citron jaune, citron vert, orange, pamplemousse'],
      ['Ce qu’on utilise', 'Le jus (acidité) et le zeste (huiles essentielles)'],
      ['À éviter', 'L’albédo, la partie blanche, qui est amère'],
    ],
    histoire: [
      'Originaires d’Asie, les agrumes gagnent la Méditerranée par les routes commerciales arabes, puis les Amériques avec les navigateurs européens.',
      'Au XVIIIe siècle, on découvre que le jus d’agrumes prévient le scorbut : la Royal Navy en fait une ration obligatoire à partir de 1795, mêlée au rhum et à l’eau. Les marins britanniques y gagnent leur surnom de « limeys », et le bar ses premiers punchs et sours.',
      'En 1867, Lauchlan Rose brevette un jus de citron vert conservé au sucre plutôt qu’à l’alcool : le premier « lime cordial ».',
    ],
    elaboration: [
      'Le jus se presse le jour même, se filtre et se garde au froid dans un flacon daté.',
      'Le zeste se prélève à l’éplucheur, sans albédo, puis s’exprime au-dessus du verre pour libérer ses essences.',
    ],
    categories: [
      { titre: 'Citron jaune', texte: 'Acidité franche et droite : Sidecar, Fizz, Sour.' },
      { titre: 'Citron vert', texte: 'Plus aromatique et légèrement amer : Daiquiri, Margarita, Mojito.' },
      { titre: 'Orange', texte: 'Peu acide, sucrée : jus pour les long drinks, zeste pour les cocktails bruns.' },
      { titre: 'Pamplemousse', texte: 'Amertume et fraîcheur : Paloma, Hemingway Special.' },
      { titre: 'Yuzu, bergamote, cédrat', texte: 'Agrumes de parfum, utilisés surtout en zeste, sirop ou liqueur.' },
    ],
    aSavoir: [
      'Un agrume à température ambiante, roulé sous la paume, donne plus de jus.',
      'Zeste exprimé côté peau vers le verre, puis frotté sur le bord.',
      'Les agrumes non traités sont à privilégier dès que l’on utilise la peau.',
    ],
    cocktails: ['daiquiri', 'margarita', 'sidecar', 'sour', 'fizz', 'paloma', 'mojito', 'caipirinha'],
    dates: [
      ['1795', 'La Royal Navy rend la ration de jus d’agrumes obligatoire.'],
      ['1867', 'Premier lime cordial de Lauchlan Rose.'],
    ],
    etapes: ['Laver', 'Zester', 'Presser', 'Filtrer', 'Conserver au froid'],
    aromes: ['Acidulé', 'Zesté', 'Floral', 'Amer', 'Frais'],
    service: 'Jus pressé du jour ; garniture taillée au dernier moment pour garder le parfum.',
    couleur: '#E9C83A',
  },
  {
    id: 'sucres',
    nom: 'Sucres et sirops',
    famille: FRAIS,
    accroche: 'Le « sweet » : la douceur qui arrondit et relie.',
    reperes: [
      ['Origines', 'Canne à sucre et betterave sucrière'],
      ['Sirop de sucre (socle)', 'Un volume d’eau pour un volume de sucre semoule'],
      ['Bar spoon', 'Environ 5 ml de sucre en poudre'],
    ],
    histoire: [
      'Le sucre de canne, venu d’Asie, reste longtemps une épice rare en Europe. Les plantations des Caraïbes et du Brésil, fondées sur l’esclavage, en font une denrée courante à partir du XVIIe siècle — et donnent au passage le rhum.',
      'En 1747, le chimiste Andreas Marggraf isole le sucre de la betterave. Pendant le blocus continental, Napoléon encourage sa culture en France à partir de 1811 : le sucre devient bon marché, et l’âge d’or des liqueurs et des sirops peut commencer.',
    ],
    elaboration: [
      'Sirop simple : sucre dissous dans l’eau, à froid ou à feu doux, sans cuisson prolongée.',
      'Sirops aromatisés : infusion ou macération d’épices, d’herbes, de fruits ou de fleurs dans le sirop.',
    ],
    categories: [
      { titre: 'Sucre blanc et cassonade', texte: 'Blanc : neutre. Cassonade et sucres bruns : notes de caramel, pour les eaux-de-vie vieillies.' },
      { titre: 'Sirop simple et sirop riche', texte: '1 pour 1, ou 2 volumes de sucre pour 1 d’eau.' },
      { titre: 'Miel et agave', texte: 'À détendre à l’eau chaude ; l’agave accompagne naturellement la tequila.' },
      { titre: 'Orgeat', texte: 'Sirop d’amande à la fleur d’oranger ; à l’origine préparé avec de l’orge.' },
      { titre: 'Grenadine', texte: 'Sirop de grenade à l’origine, aujourd’hui souvent de fruits rouges.' },
      { titre: 'Falernum, vanille, épices', texte: 'Les sirops de la tradition Tiki.' },
    ],
    aSavoir: [
      'Le sucre en poudre se dilue avant de frapper : c’est une étape de la technique du Daiquiri et du Sour.',
      'Les sirops maison s’étiquettent, se datent et se gardent au froid.',
    ],
    cocktails: ['old-fashioned', 'daiquiri', 'mojito', 'mai-tai', 'tequila-sunrise', 'penicillin'],
    dates: [
      ['1747', 'Marggraf isole le sucre de betterave.'],
      ['1811', 'Napoléon lance la culture de la betterave sucrière.'],
    ],
    etapes: ['Peser', 'Dissoudre', 'Aromatiser', 'Filtrer', 'Étiqueter'],
    aromes: ['Neutre', 'Caramel', 'Miel', 'Amande', 'Vanille'],
    service: 'À doser comme un spiritueux : au doseur, jamais à l’œil.',
    couleur: '#F1E6C8',
  },
  {
    id: 'cafe',
    nom: 'Café',
    famille: FRAIS,
    accroche: 'L’amertume et le corps des cocktails d’après-dîner.',
    reperes: [
      ['Espèces', 'Arabica (fin, acidulé) et robusta (corsé, plus caféiné)'],
      ['Espresso', 'Environ 25 à 30 ml extraits sous pression'],
      ['Au bar', 'Espresso Martini, Irish Coffee, cafés frappés'],
    ],
    histoire: [
      'Originaire d’Éthiopie, cultivé au Yémen, le café conquiert l’Empire ottoman puis l’Europe au XVIIe siècle, où les « cafés » deviennent des lieux de débat et de sociabilité.',
      'À Milan, Luigi Bezzera brevette en 1901 une machine qui prépare le café à la vapeur, tasse par tasse : l’espresso. En 1948, Achille Gaggia met au point l’extraction à haute pression, qui donne la crème caractéristique.',
      'L’Irish Coffee est servi pour la première fois en 1943 à l’aérogare de Foynes, en Irlande, par le chef Joe Sheridan. L’Espresso Martini naît à Londres en 1983.',
    ],
    elaboration: [
      'Les cerises du caféier sont récoltées, dépulpées et séchées ; les grains verts sont torréfiés, puis moulus juste avant l’extraction.',
      'Pour un cocktail, l’espresso est tiré à la minute : c’est sa crème, frappée avec de la glace, qui donne la mousse de l’Espresso Martini.',
    ],
    categories: [
      { titre: 'Espresso', texte: 'Court et concentré, la base des cocktails au café.' },
      { titre: 'Cold brew', texte: 'Infusion à froid de plusieurs heures : doux, peu acide, pratique en pré-batch.' },
      { titre: 'Liqueur de café', texte: 'Le complément sucré de l’espresso dans le shaker.' },
    ],
    aSavoir: [
      'Un espresso chaud fait fondre la glace : frapper fort et vite, puis passer aussitôt.',
      'Les trois grains de café de la garniture se déposent sur la mousse.',
    ],
    cocktails: ['espresso-martini'],
    dates: [
      ['1901', 'Brevet de la machine à espresso de Bezzera.'],
      ['1943', 'Premier Irish Coffee à Foynes.'],
      ['1948', 'Gaggia invente l’extraction à haute pression.'],
      ['1983', 'Espresso Martini de Dick Bradsell.'],
    ],
    etapes: ['Récolte', 'Séchage', 'Torréfaction', 'Mouture', 'Extraction'],
    aromes: ['Torréfié', 'Cacao', 'Fruits secs', 'Caramel', 'Acidulé'],
    service: 'Machine propre, grain frais, extraction à la demande.',
    couleur: '#4A2C1E',
  },
];
