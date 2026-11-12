// Fiches de connaissance des alcools : histoire, élaboration, catégories, repères réglementaires.
// Contenu rédigé pour l'application (hors socle). Les TAV minimaux cités sont ceux de la
// réglementation européenne sur les boissons spiritueuses (règlement UE 2019/787) ou des cahiers
// des charges des appellations concernées.

import type { Rubrique } from './guide';

export type Alcool = {
  id: string;
  nom: string;
  famille: string;
  accroche: string;
  reperes: [string, string][];
  histoire: string[];
  elaboration: string[];
  categories: Rubrique[];
  aSavoir: string[];
  /** Identifiants des cocktails du socle qui l'utilisent. */
  cocktails: string[];
};

export type Article = { id: string; titre: string; accroche: string; sections: Rubrique[] };

const EDV_GRAIN = 'Eaux-de-vie de grain';
const EDV_CANNE = 'Eaux-de-vie de canne';
const EDV_AGAVE = 'Eaux-de-vie d’agave';
const EDV_VIN = 'Eaux-de-vie de vin et de fruit';
const LIQ = 'Liqueurs, amers et anisés';
const VINS = 'Vins, vermouths et vins mutés';

export const FAMILLES_ALCOOLS = [EDV_GRAIN, EDV_CANNE, EDV_AGAVE, EDV_VIN, LIQ, VINS];

export const ALCOOLS: Alcool[] = [
  {
    id: 'gin',
    nom: 'Gin',
    famille: EDV_GRAIN,
    accroche: 'Un alcool neutre aromatisé au genièvre : la colonne vertébrale du bar classique.',
    reperes: [
      ['Matière première', 'Alcool d’origine agricole (céréales le plus souvent)'],
      ['Arôme dominant', 'Baies de genévrier (Juniperus communis)'],
      ['TAV minimum', '37,5 %'],
      ['Berceau', 'Pays-Bas (genièvre), puis Angleterre'],
    ],
    histoire: [
      'L’ancêtre du gin est le genièvre (jenever) des Pays-Bas et des Flandres : une eau-de-vie de grains aromatisée aux baies de genévrier, d’abord vendue comme remède. On en attribue souvent la paternité au médecin Franciscus Sylvius, à Leyde, au XVIIe siècle, mais des recettes de spiritueux au genièvre existent déjà au siècle précédent.',
      'Les soldats anglais le découvrent sur les champs de bataille des Provinces-Unies : c’est le « courage hollandais » (Dutch courage). L’arrivée de Guillaume d’Orange sur le trône d’Angleterre en 1689, puis les taxes sur les eaux-de-vie françaises, encouragent la distillation locale.',
      'Dans la première moitié du XVIIIe siècle, Londres s’enivre d’un gin bon marché et souvent frelaté : c’est la « Gin Craze ». Les Gin Acts successifs, notamment celui de 1751, finissent par encadrer la production et la vente.',
      'Au XIXe siècle, l’alambic à colonne (brevet d’Aeneas Coffey, 1830) donne un alcool beaucoup plus pur : le gin n’a plus besoin d’être sucré pour être buvable. Le style « Old Tom », adouci, cède la place au London Dry. Dans les colonies britanniques, on le marie à l’eau tonique à la quinine : le gin tonic est né.',
    ],
    elaboration: [
      'On part d’un alcool neutre à environ 96 %, que l’on aromatise avec des « botaniques » : genièvre obligatoirement, puis coriandre, racine d’angélique, écorces d’agrumes, iris, cardamome, réglisse…',
      'Les botaniques sont macérées dans l’alcool puis redistillées en alambic, ou bien placées dans un panier traversé par les vapeurs (infusion en vapeur), ce qui donne un profil plus léger.',
      'Le distillat est ensuite réduit à l’eau jusqu’au degré de mise en bouteille.',
    ],
    categories: [
      { titre: 'Gin', texte: 'Alcool neutre aromatisé, y compris par simple ajout d’arômes (« compound gin »).' },
      {
        titre: 'Distilled gin',
        texte: 'Aromatisation obtenue par redistillation de l’alcool en présence des botaniques ; des arômes peuvent être ajoutés ensuite.',
      },
      {
        titre: 'London gin (London Dry)',
        texte:
          'Un procédé et non une origine : tous les arômes viennent de la redistillation, rien n’est ajouté après hormis de l’eau, et le sucre est limité à 0,1 g par litre.',
      },
      { titre: 'Old Tom', texte: 'Style historique légèrement sucré, entre le genièvre et le London Dry.' },
      { titre: 'Genièvre', texte: 'L’ancêtre néerlandais et belge, à base de « vin de malt », au goût céréalier.' },
      {
        titre: 'Sloe gin',
        texte: 'Une liqueur (25 % minimum) obtenue par macération de prunelles dans du gin.',
      },
    ],
    aSavoir: [
      'Le goût de genièvre doit rester prédominant : c’est la définition légale du gin.',
      'Le gin n’est pas vieilli, sauf rares exceptions (« barrel aged »).',
      'C’est l’eau-de-vie la plus présente dans les cocktails classiques.',
    ],
    cocktails: ['aviation', 'bramble', 'dry-martini', 'gin-basil-smash', 'negroni', 'fizz', 'french-75'],
  },
  {
    id: 'vodka',
    nom: 'Vodka',
    famille: EDV_GRAIN,
    accroche: 'L’eau-de-vie la plus neutre, née entre la Pologne et la Russie.',
    reperes: [
      ['Matière première', 'Céréales (blé, seigle, maïs), pomme de terre, parfois betterave ou raisin'],
      ['TAV minimum', '37,5 %'],
      ['Berceau', 'Pologne et Russie'],
      ['Vieillissement', 'Aucun'],
    ],
    histoire: [
      'Pologne et Russie se disputent sa paternité. Le mot — un diminutif de « voda » (eau), « petite eau » — apparaît dans des registres polonais dès 1405. Comme partout en Europe, l’eau-de-vie est d’abord un remède, avant de devenir une boisson de table aux XVIe et XVIIe siècles.',
      'En Russie, l’État fait très tôt de la vodka un monopole et une ressource fiscale majeure. À la fin du XIXe siècle, la rectification en colonne et la filtration sur charbon de bois fixent le style moderne, pur et net ; le standard de 40 % s’impose alors.',
      'Après la révolution de 1917, des distillateurs émigrés diffusent la vodka en Occident. La marque Smirnoff, relancée aux États-Unis dans les années 1930, la popularise dans les cocktails : le Moscow Mule est créé en 1941 précisément pour la faire connaître.',
      'Dans la seconde moitié du XXe siècle, sa neutralité en fait l’alcool de base le plus vendu au monde pour les long drinks.',
    ],
    elaboration: [
      'Un moût de céréales ou de pommes de terre est fermenté, puis distillé en colonne et rectifié jusqu’à environ 96 % pour éliminer la quasi-totalité des composés aromatiques.',
      'L’alcool est filtré (charbon actif, parfois quartz ou autres médias), puis réduit avec une eau très pure. La qualité de l’eau compte autant que celle de l’alcool.',
    ],
    categories: [
      { titre: 'Vodka', texte: 'Neutre, non aromatisée. La matière première doit être indiquée si elle n’est ni céréale ni pomme de terre.' },
      {
        titre: 'Vodka aromatisée',
        texte: 'Parfumée (vanille, citron, piment, herbe de bison…) ; TAV minimum de 37,5 % également.',
      },
    ],
    aSavoir: [
      'Blé : rondeur ; seigle : notes épicées ; pomme de terre : texture plus grasse.',
      'Sa neutralité met en valeur les autres ingrédients : c’est un support, pas un parfum.',
    ],
    cocktails: ['cosmopolitan', 'espresso-martini', 'pornstar-martini', 'bloody-mary', 'moscow-mule', 'sex-on-the-beach'],
  },
  {
    id: 'whisky',
    nom: 'Whisky et whiskey',
    famille: EDV_GRAIN,
    accroche: 'Eau-de-vie de céréales vieillie sous bois : scotch, irish, bourbon, rye, japonais.',
    reperes: [
      ['Matière première', 'Orge maltée, maïs, seigle, blé'],
      ['TAV minimum', '40 % (Union européenne, Écosse, États-Unis)'],
      ['Vieillissement', '3 ans minimum en fût de chêne (Écosse, Irlande, UE)'],
      ['Orthographe', 'Whisky (Écosse, Canada, Japon) · Whiskey (Irlande, États-Unis)'],
    ],
    histoire: [
      'Le mot vient du gaélique « uisge beatha », l’eau-de-vie. L’art de distiller, transmis par les moines, s’implante en Irlande et en Écosse au Moyen Âge. La plus ancienne trace écrite écossaise date de 1494 : les rôles de l’Échiquier attribuent du malt au frère John Cor « pour faire de l’aqua vitae ».',
      'Lourdement taxée après l’union de l’Écosse et de l’Angleterre, la distillation devient largement clandestine au XVIIIe siècle. L’Excise Act de 1823 rend la licence abordable et lance l’industrie légale. L’alambic à colonne de Coffey (1830) permet le whisky de grain, puis les blends, plus légers, qui conquièrent le monde — aidés par le phylloxéra qui prive l’Europe de cognac à la fin du XIXe siècle.',
      'Aux États-Unis, les colons distillent le seigle puis le maïs. La révolte du whiskey (1791-1794) répond à la première taxe fédérale. Le bourbon, né au Kentucky, est reconnu « produit distinctif des États-Unis » par le Congrès en 1964. La Prohibition (1920-1933) ruine la plupart des distilleries américaines, et par ricochet le whiskey irlandais, alors dominant.',
      'Au Japon, Shinjiro Torii fonde la distillerie Yamazaki en 1923 avec Masataka Taketsuru, formé en Écosse : c’est l’acte de naissance du whisky japonais.',
    ],
    elaboration: [
      'Maltage : l’orge germe puis est séchée, parfois à la fumée de tourbe, qui donne les notes fumées. Brassage : les céréales moulues sont mélangées à l’eau chaude pour extraire les sucres. Fermentation : les levures donnent une « bière » d’environ 8 %.',
      'Distillation : double distillation en alambic à repasse (pot still) pour les malts écossais, souvent triple en Irlande ; distillation continue en colonne pour les whiskies de grain et la plupart des bourbons.',
      'Vieillissement en fûts de chêne : fûts neufs fortement brûlés pour le bourbon ; fûts de réemploi (ex-bourbon, ex-xérès) en Écosse. Le bois apporte la couleur et l’essentiel des arômes. La « part des anges » désigne l’évaporation annuelle.',
    ],
    categories: [
      {
        titre: 'Scotch whisky',
        texte:
          'Distillé et vieilli au moins 3 ans en Écosse. Single malt (100 % orge maltée, une seule distillerie, pot still), single grain, blended malt, blended grain et blended scotch (malt + grain). Régions : Speyside, Highlands, Lowlands, Islay (tourbé), Campbeltown.',
      },
      {
        titre: 'Irish whiskey',
        texte: 'Vieilli 3 ans minimum en Irlande, souvent triple distillé. Le « single pot still » associe orge maltée et non maltée.',
      },
      {
        titre: 'Bourbon',
        texte:
          'Produit aux États-Unis, au moins 51 % de maïs, vieilli en fûts de chêne neufs brûlés. « Straight » : 2 ans minimum. Le Tennessee whiskey ajoute une filtration sur charbon d’érable (Lincoln County Process).',
      },
      { titre: 'Rye whiskey', texte: 'Au moins 51 % de seigle aux États-Unis : plus sec et épicé que le bourbon.' },
      { titre: 'Whisky japonais', texte: 'Inspiré du modèle écossais, réputé pour sa précision et ses assemblages.' },
    ],
    aSavoir: [
      'L’âge indiqué sur l’étiquette est celui du plus jeune whisky de l’assemblage.',
      'Un single malt n’est pas un fût unique (« single cask ») : c’est le produit d’une seule distillerie.',
      'Rye pour un Manhattan plus sec, bourbon pour plus de rondeur ; scotch pour le Rob Roy.',
    ],
    cocktails: ['manhattan', 'mint-julep', 'old-fashioned', 'penicillin', 'sour'],
  },
  {
    id: 'rhum',
    nom: 'Rhum, rum et ron',
    famille: EDV_CANNE,
    accroche: 'L’eau-de-vie de la canne à sucre, aux trois grandes traditions.',
    reperes: [
      ['Matière première', 'Mélasse (rhum traditionnel) ou pur jus de canne (rhum agricole)'],
      ['TAV minimum', '37,5 % (40 % pour l’AOC Martinique)'],
      ['Berceau', 'Caraïbes, XVIIe siècle'],
      ['Appellation', 'AOC Martinique depuis 1996'],
    ],
    histoire: [
      'La canne à sucre, originaire d’Asie, est plantée aux Antilles par les Européens dès la fin du XVe siècle. Au XVIIe siècle, sur les plantations — fondées sur l’esclavage —, on distille les résidus de la fabrication du sucre. Vers 1650, à la Barbade, l’alcool brûlant qui en sort s’appelle « kill-devil » ou « rumbullion ».',
      'Aux Antilles françaises, le père Labat perfectionne les alambics à la fin du XVIIe siècle ; on parle alors de « guildive » ou de « tafia ». Le rhum devient une monnaie du commerce triangulaire et la ration quotidienne de la Royal Navy à partir de 1655, tradition qui ne s’éteint que le 31 juillet 1970, le « Black Tot Day ».',
      'À la fin du XIXe siècle, l’effondrement du cours du sucre pousse les planteurs martiniquais à distiller directement le jus de canne frais : c’est la naissance du rhum agricole.',
      'Au XXe siècle, Cuba impose le style léger (ron ligero) qui fait le succès du Daiquiri et du Mojito, tandis que la culture Tiki, lancée en Californie dans les années 1930 par Don the Beachcomber puis Trader Vic, remet à l’honneur les rhums puissants et les assemblages.',
    ],
    elaboration: [
      'Rhum traditionnel (ou de sucrerie) : la mélasse, résidu de la fabrication du sucre, est diluée, fermentée puis distillée. Il représente la très grande majorité de la production mondiale.',
      'Rhum agricole : la canne fraîche est broyée, son jus (vesou) fermente puis est distillé en colonne créole à environ 70 %, ce qui conserve des arômes végétaux très marqués.',
      'Distillation en colonne pour les styles légers, en alambic à repasse (pot still) pour les styles lourds et riches en esters, typiques de la Jamaïque.',
      'Sous climat tropical, le vieillissement est rapide et la part des anges élevée.',
    ],
    categories: [
      { titre: 'Blanc', texte: 'Non vieilli ou brièvement reposé : la base des cocktails frais.' },
      { titre: 'Ambré', texte: 'Passage sous bois de quelques mois à quelques années (« élevé sous bois » : 12 mois minimum en AOC Martinique).' },
      {
        titre: 'Vieux',
        texte: '3 ans minimum en fût pour l’AOC Martinique : VO (3 ans), VSOP (4 ans), XO (6 ans).',
      },
      { titre: 'Ron (tradition hispanique)', texte: 'Cuba, Porto Rico, Venezuela… Mélasse, colonne, style léger et rond.' },
      {
        titre: 'Rum (tradition britannique)',
        texte: 'Jamaïque, Barbade, Guyana… Mélasse, souvent pot still, style lourd et aromatique. Black rum : très coloré, comme celui du Dark and Stormy.',
      },
      { titre: 'Rhum (tradition française)', texte: 'Martinique, Guadeloupe, Réunion… Rhum agricole de pur jus de canne.' },
      { titre: 'Overproof', texte: 'Rhum embouteillé à très haut degré (au-delà de 57 %).' },
    ],
    aSavoir: [
      'La mention « agricole » est réservée aux rhums de pur jus de canne des départements français d’outre-mer et de Madère.',
      'Le Mai Tai du socle associe un rhum vieux agricole et un rhum vieux jamaïcain : deux traditions dans le même verre.',
    ],
    cocktails: ['daiquiri', 'mojito', 'mai-tai', 'dark-and-stormy', 'pina-colada', 'planters-punch', 'rum-swizzle'],
  },
  {
    id: 'cachaca',
    nom: 'Cachaça',
    famille: EDV_CANNE,
    accroche: 'L’eau-de-vie de jus de canne du Brésil, âme de la Caipirinha.',
    reperes: [
      ['Matière première', 'Jus de canne à sucre frais fermenté'],
      ['TAV', '38 à 48 % (réglementation brésilienne)'],
      ['Origine', 'Brésil, exclusivement'],
    ],
    histoire: [
      'Les Portugais introduisent la canne à sucre au Brésil au XVIe siècle. Dans les moulins à sucre, on distille très tôt le jus fermenté : la cachaça est ainsi l’une des plus anciennes eaux-de-vie du Nouveau Monde, antérieure au rhum des Caraïbes.',
      'Longtemps boisson des esclaves et du peuple, un temps interdite par la couronne portugaise qui protégeait ses propres eaux-de-vie, elle devient un symbole national. C’est aujourd’hui l’un des spiritueux les plus consommés au monde, essentiellement au Brésil.',
    ],
    elaboration: [
      'Le jus de canne frais fermente, puis est distillé en alambic de cuivre (cachaça artisanale) ou en colonne (cachaça industrielle).',
      'Elle peut être embouteillée jeune (branca, prata) ou vieillie (ouro, envelhecida), parfois dans des bois brésiliens comme l’amburana ou le jequitibá, qui donnent des profils uniques.',
    ],
    categories: [
      { titre: 'Branca / prata', texte: 'Non vieillie : végétale et vive, pour la Caipirinha.' },
      { titre: 'Envelhecida / ouro', texte: 'Vieillie sous bois, plus ronde et épicée.' },
    ],
    aSavoir: [
      'Proche du rhum agricole par sa matière première, mais distillée à plus bas degré, avec un goût très typé.',
      'Caipirinha vient de « caipira », qui désigne l’habitant de la campagne.',
    ],
    cocktails: ['caipirinha'],
  },
  {
    id: 'tequila',
    nom: 'Tequila et mezcal',
    famille: EDV_AGAVE,
    accroche: 'Les eaux-de-vie d’agave du Mexique, protégées par des appellations d’origine.',
    reperes: [
      ['Matière première', 'Agave bleu (tequila) · une trentaine d’agaves, surtout l’espadín (mezcal)'],
      ['TAV', '35 à 55 % (normes mexicaines)'],
      ['Origine', 'Jalisco et quatre autres États (tequila) · Oaxaca principalement (mezcal)'],
      ['Appellation d’origine', 'Tequila : 1974 · Mezcal : 1994'],
    ],
    histoire: [
      'Bien avant l’arrivée des Espagnols, les peuples du Mexique font fermenter la sève d’agave pour obtenir le pulque. Au XVIe siècle, les colons introduisent la distillation : naît le « vino de mezcal », eau-de-vie d’agave cuit.',
      'Autour de la ville de Tequila, dans l’État de Jalisco, la production se structure : la famille Cuervo obtient la première licence officielle en 1795, Sauza suit en 1873. Le « mezcal de Tequila » devient simplement « tequila » et s’exporte grâce au chemin de fer.',
      'La Margarita, apparue à la fin des années 1930, puis la Tequila Sunrise des années 1970, l’installent dans tous les bars du monde. Depuis les années 2000, les tequilas 100 % agave et les mezcals artisanaux connaissent un essor spectaculaire.',
    ],
    elaboration: [
      'L’agave met de 6 à 8 ans, parfois plus, à mûrir. Le jimador coupe les feuilles pour ne garder que le cœur, la piña.',
      'Tequila : les piñas sont cuites à la vapeur (four ou autoclave), broyées, et leur jus fermente avant une double distillation.',
      'Mezcal : les piñas sont rôties dans des fours creusés en terre, sur des pierres chauffées au bois, ce qui donne le caractère fumé ; broyage à la meule (tahona), fermentation en cuves ouvertes, distillation en petits alambics de cuivre ou d’argile.',
    ],
    categories: [
      { titre: '100 % agave', texte: 'Tous les sucres fermentés proviennent de l’agave bleu. À privilégier.' },
      { titre: 'Tequila (« mixto »)', texte: 'Au moins 51 % de sucres d’agave, complétés par d’autres sucres.' },
      { titre: 'Blanco (plata)', texte: 'Non vieillie, ou reposée moins de 2 mois : l’agave à l’état pur.' },
      { titre: 'Reposado', texte: 'De 2 mois à 1 an sous bois.' },
      { titre: 'Añejo', texte: 'De 1 à 3 ans en fût.' },
      { titre: 'Extra añejo', texte: '3 ans et plus (catégorie créée en 2006).' },
    ],
    aSavoir: [
      'Toute tequila est historiquement un mezcal, mais l’inverse n’est pas vrai.',
      'L’agave n’est pas un cactus : c’est une plante de la famille des asperges.',
      'Le socle demande une tequila blanco 100 % agave pour la Paloma.',
    ],
    cocktails: ['margarita', 'paloma', 'tequila-sunrise'],
  },
  {
    id: 'cognac',
    nom: 'Cognac',
    famille: EDV_VIN,
    accroche: 'L’eau-de-vie de vin des Charentes, doublement distillée et longuement vieillie.',
    reperes: [
      ['Matière première', 'Vin blanc, d’ugni blanc presque exclusivement'],
      ['TAV minimum', '40 %'],
      ['Distillation', 'Double, en alambic charentais'],
      ['Appellation', 'AOC (aire délimitée en 1909, appellation reconnue en 1936)'],
    ],
    histoire: [
      'Au XVIe siècle, les marchands hollandais achètent les vins des Charentes, qui voyagent mal. Ils les font distiller pour les conserver : c’est le « brandewijn », le vin brûlé, à l’origine du mot brandy.',
      'Au XVIIe siècle apparaît la double distillation, qui donne une eau-de-vie plus fine, et l’on découvre qu’elle se bonifie dans les fûts de chêne. Les grandes maisons de négoce se fondent au XVIIIe siècle : Martell en 1715, Rémy Martin en 1724, Hennessy en 1765.',
      'Le phylloxéra détruit le vignoble à partir des années 1870. Il est replanté sur porte-greffes américains, majoritairement en ugni blanc. La zone de production est délimitée en 1909 et l’appellation d’origine contrôlée reconnue en 1936.',
      'Avant la Prohibition, le cognac est une base majeure des cocktails : le Mint Julep ou le Sazerac se faisaient à l’origine avec lui.',
    ],
    elaboration: [
      'Un vin blanc acide et peu alcoolisé (environ 9 %) est distillé deux fois dans un alambic charentais en cuivre : la première chauffe donne le brouillis (environ 30 %), la seconde, dite « bonne chauffe », donne une eau-de-vie d’environ 70 %. La distillation doit être terminée le 31 mars qui suit la vendange.',
      'Vieillissement en fûts de chêne (Limousin ou Tronçais), puis assemblage par le maître de chai, qui marie eaux-de-vie d’âges et de crus différents.',
    ],
    categories: [
      { titre: 'VS', texte: '2 ans de vieillissement minimum.' },
      { titre: 'VSOP', texte: '4 ans minimum.' },
      { titre: 'Napoléon', texte: '6 ans minimum.' },
      { titre: 'XO', texte: '10 ans minimum (depuis 2018).' },
      { titre: 'XXO', texte: '14 ans minimum.' },
      {
        titre: 'Les six crus',
        texte:
          'Grande Champagne, Petite Champagne, Borderies, Fins Bois, Bons Bois et Bois Ordinaires. « Fine Champagne » : assemblage de Grande et Petite Champagne, avec au moins 50 % de Grande Champagne.',
      },
    ],
    aSavoir: [
      'Le compte d’âge porte sur la plus jeune eau-de-vie de l’assemblage.',
      'La « Champagne » du cognac n’a aucun rapport avec le vin de Champagne : le mot désigne un sol calcaire.',
    ],
    cocktails: ['sidecar', 'champagne-cocktail', 'horses-neck', 'mint-julep'],
  },
  {
    id: 'armagnac',
    nom: 'Armagnac',
    famille: EDV_VIN,
    accroche: 'La plus ancienne eau-de-vie de France, gasconne et de caractère.',
    reperes: [
      ['Matière première', 'Vin blanc : ugni blanc, baco, folle blanche, colombard'],
      ['TAV minimum', '40 %'],
      ['Distillation', 'Continue, en alambic armagnacais (le plus souvent)'],
      ['Appellation', 'AOC depuis 1936'],
    ],
    histoire: [
      'En 1310, le prieur Vital Dufour décrit à Eauze les quarante vertus de l’« aygue ardente » : c’est le plus ancien témoignage sur une eau-de-vie en France. L’armagnac précède ainsi le cognac de plusieurs siècles.',
      'Longtemps resté une affaire de petits producteurs et de distillateurs ambulants, loin des ports, il s’est moins exporté que son cousin charentais. L’aire d’appellation est délimitée en 1909 et l’AOC reconnue en 1936.',
    ],
    elaboration: [
      'La distillation se fait le plus souvent en une seule passe, dans un alambic continu à plateaux propre à la région. L’eau-de-vie sort à bas degré (52 à 60 % en général), ce qui lui laisse beaucoup de matière aromatique.',
      'Vieillissement en « pièces » de chêne de 400 litres environ. L’armagnac se décline volontiers en millésimes, ce qui est rare pour le cognac.',
    ],
    categories: [
      { titre: 'Les trois terroirs', texte: 'Bas-Armagnac (le plus réputé), Armagnac-Ténarèze et Haut-Armagnac.' },
      { titre: 'VS', texte: '1 an de vieillissement minimum.' },
      { titre: 'VSOP', texte: '4 ans minimum.' },
      { titre: 'XO et Hors d’âge', texte: '10 ans minimum.' },
      { titre: 'Blanche armagnac', texte: 'Eau-de-vie blanche non vieillie, dotée de sa propre appellation depuis 2005.' },
    ],
    aSavoir: [
      'Plus rustique et plus ample que le cognac : pruneau, fruits confits, rancio.',
      'Excellente eau-de-vie brune pour un Old-Fashioned ou un Sour à la française.',
    ],
    cocktails: ['old-fashioned', 'sour'],
  },
  {
    id: 'calvados',
    nom: 'Calvados',
    famille: EDV_VIN,
    accroche: 'L’eau-de-vie de cidre de Normandie.',
    reperes: [
      ['Matière première', 'Cidre et poiré (pommes et poires à cidre)'],
      ['TAV minimum', '40 %'],
      ['Vieillissement', '2 ans minimum en fût de chêne (3 ans pour le Domfrontais)'],
      ['Appellation', 'AOC depuis 1942'],
    ],
    histoire: [
      'La première mention écrite d’une eau-de-vie de cidre en Normandie date de 1553 : le gentilhomme Gilles de Gouberville la consigne dans son journal. Une corporation de distillateurs d’eau-de-vie de cidre se constitue vers 1600.',
      'Le nom vient du département du Calvados, créé à la Révolution. La consommation s’envole à la fin du XIXe siècle, lorsque le phylloxéra prive le pays d’eaux-de-vie de vin. Les appellations sont reconnues à partir de 1942.',
      'La première recette « 75 », ancêtre du French 75, était réalisée au calvados à Paris pendant la Première Guerre mondiale.',
    ],
    elaboration: [
      'Les pommes (douces, douces-amères, amères et acidulées) sont pressées ; le moût fermente naturellement en cidre pendant plusieurs semaines.',
      'Le cidre est distillé en alambic à repasse (double distillation, obligatoire en Pays d’Auge) ou en alambic à colonne (obligatoire en Domfrontais).',
      'Vieillissement en fûts de chêne, puis assemblage.',
    ],
    categories: [
      { titre: 'AOC Calvados', texte: 'L’appellation la plus large ; repasse ou colonne.' },
      { titre: 'AOC Calvados Pays d’Auge', texte: 'Double distillation en alambic à repasse.' },
      { titre: 'AOC Calvados Domfrontais', texte: 'Au moins 30 % de poires à poiré, distillation en colonne, 3 ans de fût minimum.' },
      {
        titre: 'Comptes d’âge',
        texte: 'Fine ou VS : 2 ans · Vieux ou Réserve : 3 ans · VO, VSOP ou Vieille Réserve : 4 ans · XO ou Hors d’âge : 6 ans.',
      },
    ],
    aSavoir: [
      'Le « trou normand » : un petit verre de calvados au milieu du repas.',
      'Très à l’aise en cocktail : en Sour, en Old-Fashioned ou en long drink avec un tonic.',
    ],
    cocktails: ['old-fashioned', 'sour'],
  },
  {
    id: 'pisco',
    nom: 'Pisco',
    famille: EDV_VIN,
    accroche: 'L’eau-de-vie de raisin du Pérou et du Chili.',
    reperes: [
      ['Matière première', 'Vin de cépages aromatiques (quebranta, italia, torontel, muscat…)'],
      ['TAV', '38 à 48 % au Pérou'],
      ['Origine', 'Pérou et Chili, qui en revendiquent chacun l’appellation'],
    ],
    histoire: [
      'Les Espagnols plantent la vigne au Pérou au XVIe siècle. L’eau-de-vie produite dans les vallées de la côte sud est expédiée depuis le port de Pisco, qui lui donne son nom.',
      'Au XIXe siècle, elle gagne la Californie de la ruée vers l’or : le Pisco Punch fait la gloire des bars de San Francisco. Le Pisco Sour est créé à Lima dans les années 1920, au bar de l’Américain Victor Morris.',
    ],
    elaboration: [
      'Au Pérou, le vin est distillé une seule fois, directement au degré de mise en bouteille : ni eau ajoutée, ni passage sous bois. Le pisco repose en cuves neutres.',
      'Au Chili, la réduction à l’eau et le vieillissement en fût sont autorisés.',
    ],
    categories: [
      { titre: 'Puro', texte: 'Un seul cépage (quebranta le plus souvent).' },
      { titre: 'Acholado', texte: 'Assemblage de plusieurs cépages.' },
      { titre: 'Mosto verde', texte: 'Distillé à partir d’un moût dont la fermentation n’est pas achevée : plus rond et plus riche.' },
    ],
    aSavoir: ['Le socle le cite pour le Chilcano de Pisco, variante du Moscow Mule, et il est la base du célèbre Pisco Sour.'],
    cocktails: ['moscow-mule', 'sour'],
  },
  {
    id: 'liqueurs',
    nom: 'Liqueurs et crèmes',
    famille: LIQ,
    accroche: 'Alcool, sucre et arômes : la palette du barman.',
    reperes: [
      ['Définition', 'Spiritueux sucré et aromatisé (fruits, plantes, épices, crème…)'],
      ['TAV minimum', '15 %'],
      ['Sucre', '100 g/l minimum · 250 g/l pour une « crème de » · 400 g/l pour la crème de cassis'],
    ],
    histoire: [
      'Les liqueurs naissent de la pharmacopée médiévale : au XIIIe siècle, des médecins comme Arnaud de Villeneuve font macérer plantes et épices dans l’eau-de-vie, que l’on adoucit au miel puis au sucre. Les monastères en font des élixirs.',
      'Les moines chartreux reçoivent en 1605 le manuscrit d’un « élixir de longue vie » ; ils en tirent l’Élixir végétal en 1737, la Chartreuse verte en 1764 et la jaune en 1838. La recette, aux 130 plantes, reste secrète.',
      'Au XIXe siècle, le sucre devenu bon marché et l’alcool neutre de colonne ouvrent l’âge d’or des liquoristes : le maraschino de Zadar (Luxardo, 1821), la crème de cassis de Dijon (1841), la Bénédictine (1863), le triple sec de Cointreau à Angers (1875), le Grand Marnier (1880). Les Hollandais, eux, exploitent depuis le XVIIe siècle les écorces d’oranges amères de l’île de Curaçao.',
    ],
    elaboration: [
      'Macération (à froid) ou infusion (à chaud) des fruits et des plantes dans l’alcool ; distillation des macérations pour les arômes les plus fins (écorces d’agrumes, graines, plantes).',
      'Assemblage des alcoolats, ajout de sucre et d’eau, parfois de colorants, puis repos avant mise en bouteille.',
    ],
    categories: [
      {
        titre: 'Liqueurs d’agrumes',
        texte: 'Triple sec (incolore, écorces d’oranges douces et amères), curaçao (orange, bleu…), liqueurs à base de cognac.',
      },
      { titre: 'Liqueurs de fruits', texte: 'Maraschino (cerise marasque), liqueurs de pêche, de fruit de la passion, de melon…' },
      { titre: 'Crèmes de fruits', texte: 'Plus sucrées : cassis, mûre, framboise, pêche de vigne.' },
      { titre: 'Liqueurs de plantes', texte: 'Chartreuse, Bénédictine, génépi, liqueurs de menthe, de violette, de sureau.' },
      { titre: 'Liqueurs de grains et de noyaux', texte: 'Café, cacao, amande (amaretto), noisette.' },
      { titre: 'Liqueurs à la crème', texte: 'Crème de lait et whiskey ou autre eau-de-vie.' },
      { titre: 'Falernum', texte: 'Liqueur (ou sirop) des Caraïbes au citron vert, au gingembre, au clou de girofle et à l’amande.' },
    ],
    aSavoir: [
      '« Crème de » ne signifie pas qu’il y a de la crème, mais beaucoup de sucre.',
      'Dans la règle des 3 S, la liqueur est à la fois « sweet » et aromatique : la doser au ml près.',
      'Après ouverture, les crèmes de fruits s’oxydent : les conserver au frais.',
    ],
    cocktails: ['aviation', 'bramble', 'cosmopolitan', 'espresso-martini', 'margarita', 'sidecar', 'mai-tai', 'sex-on-the-beach', 'rum-swizzle'],
  },
  {
    id: 'amers',
    nom: 'Bitters et amers',
    famille: LIQ,
    accroche: 'Du trait d’aromatic bitters au bitter italien : l’amertume qui structure.',
    reperes: [
      ['Aromatic bitters', 'Amers concentrés, dosés au trait (souvent 35 à 45 %)'],
      ['Bitters apéritifs', 'Amers à boire, de 11 à 30 % environ'],
      ['Plantes clés', 'Gentiane, quinquina, écorce d’orange amère, rhubarbe, absinthe'],
    ],
    histoire: [
      'Les amers sont d’abord des remèdes digestifs. En 1806, un journal américain définit pour la première fois le mot « cocktail » : un mélange de spiritueux, de sucre, d’eau et de bitters. Sans bitters, pas de cocktail au sens d’origine — c’est exactement la formule de l’Old-Fashioned.',
      'En 1824, à Angostura, au Venezuela, le médecin Johann Siegert met au point son amer aromatique ; la production s’installe à Trinité en 1875. À La Nouvelle-Orléans, l’apothicaire Antoine Peychaud crée le sien vers 1830.',
      'En Italie, Gaspare Campari lance son bitter rouge à Milan en 1860 : il donnera l’Americano puis le Negroni. Les frères Barbieri présentent l’Aperol à Padoue en 1919. Fernet-Branca naît à Milan en 1845. En France, la gentiane inspire Salers (1885) et Suze (1889).',
    ],
    elaboration: [
      'Macération ou infusion de racines, d’écorces, de plantes et d’agrumes dans un alcool neutre, puis filtration, sucrage plus ou moins marqué et coloration éventuelle.',
    ],
    categories: [
      { titre: 'Aromatic bitters', texte: 'L’assaisonnement du cocktail : 1 trait = 3 à 5 gouttes. Aromatiques, à l’orange, au céleri, au chocolat…' },
      { titre: 'Bitters italiens', texte: 'Rouges et francs (type Campari) ou plus légers et orangés (type Aperol) : base du Spritz, de l’Americano, du Negroni.' },
      { titre: 'Amari', texte: 'Amers digestifs italiens, plus ou moins sucrés : fernet, amaro alpin, amaro aux agrumes.' },
      { titre: 'Gentianes', texte: 'Apéritifs français à la racine de gentiane, jaune d’or, base du White Negroni.' },
      { titre: 'Quinquinas', texte: 'Vins ou apéritifs amérisés à l’écorce de quinquina.' },
    ],
    aSavoir: [
      'L’amertume équilibre le sucre et allonge la finale : quelques traits changent un cocktail.',
      'Selon le socle, la marque du spiritueux choisi précède le mot Spritz pour nommer le cocktail.',
    ],
    cocktails: ['negroni', 'americano', 'spritz', 'old-fashioned', 'manhattan', 'champagne-cocktail', 'horses-neck'],
  },
  {
    id: 'anises',
    nom: 'Absinthe et anisés',
    famille: LIQ,
    accroche: 'La fée verte, le pastis et leurs cousins méditerranéens.',
    reperes: [
      ['Plantes clés', 'Grande absinthe, anis vert, fenouil, badiane, réglisse'],
      ['TAV', 'Absinthe : souvent 45 à 72 % · Pastis : 40 % minimum (45 % pour le pastis de Marseille)'],
      ['Service', 'Allongé d’eau fraîche (environ 5 volumes pour un pastis)'],
    ],
    histoire: [
      'L’absinthe moderne naît à la fin du XVIIIe siècle dans le Val-de-Travers, en Suisse. Henri-Louis Pernod ouvre sa distillerie à Pontarlier en 1805. Popularisée par les soldats de retour d’Algérie, puis par l’envolée du prix du vin due au phylloxéra, elle devient la boisson de la Belle Époque — « l’heure verte ».',
      'Accusée de rendre fou, cible des ligues de tempérance et des viticulteurs, elle est interdite en Suisse en 1910 et en France en 1915. Elle ne redevient autorisée qu’à la fin du XXe siècle, et retrouve officiellement son nom en France en 2011.',
      'Privés d’absinthe, les Français se tournent vers les anisés sans absinthe, autorisés dans les années 1920. Paul Ricard lance son « vrai pastis de Marseille » en 1932.',
    ],
    elaboration: [
      'Absinthe : macération de grande absinthe, d’anis vert et de fenouil dans l’alcool, redistillation, puis éventuelle coloration naturelle aux plantes (petite absinthe, hysope, mélisse).',
      'Pastis : macération de réglisse et aromatisation à l’anéthol (badiane, fenouil) dans un alcool neutre, avec ajout de sucre.',
    ],
    categories: [
      { titre: 'Absinthe', texte: 'Blanche ou verte, non sucrée ; servie avec de l’eau glacée versée sur un sucre.' },
      { titre: 'Pastis', texte: 'Anisé à la réglisse ; « de Marseille » à 45 %.' },
      { titre: 'Anis', texte: 'Sans réglisse. Cousins : ouzo grec, raki turc, arak du Levant, sambuca italienne.' },
    ],
    aSavoir: [
      'Le « louche » : l’anéthol, soluble dans l’alcool mais pas dans l’eau, trouble la boisson quand on la dilue.',
      'En cocktail, l’absinthe s’utilise surtout en rinçage du verre ou au trait.',
    ],
    cocktails: [],
  },
  {
    id: 'vermouth',
    nom: 'Vermouth',
    famille: VINS,
    accroche: 'Vin aromatisé et fortifié : l’allié du gin, du whiskey et des bitters.',
    reperes: [
      ['Base', 'Au moins 75 % de vin, fortifié et aromatisé'],
      ['TAV', '14,5 à 22 %'],
      ['Plante obligatoire', 'Armoise (absinthe), « Wermut » en allemand'],
      ['Berceaux', 'Turin, Chambéry, Marseillan'],
    ],
    histoire: [
      'Les vins aux plantes existent depuis l’Antiquité. Le vermouth moderne naît à Turin en 1786, lorsque Antonio Benedetto Carpano commercialise un vin muscat aromatisé et sucré : il devient l’apéritif de la cour de Savoie.',
      'En France, Joseph Noilly met au point en 1813 un vermouth sec, vieilli en plein air à Marseillan ; la maison Dolin se fonde à Chambéry en 1821. On parlera longtemps de « vermouth italien » pour le rouge doux et de « vermouth français » pour le sec.',
      'Arrivé aux États-Unis dans la seconde moitié du XIXe siècle, le vermouth transforme le cocktail : Manhattan, Martinez, puis Dry Martini lui doivent leur existence.',
    ],
    elaboration: [
      'Un vin blanc neutre est aromatisé par des extraits de plantes, d’écorces et d’épices (armoise, gentiane, quinquina, agrumes, camomille, vanille…), sucré, puis fortifié à l’alcool.',
      'La couleur du vermouth rouge vient du caramel, et non d’un vin rouge.',
    ],
    categories: [
      { titre: 'Rouge (rosso, sweet)', texte: 'Doux, ambré, épicé. Manhattan, Negroni, Americano.' },
      { titre: 'Dry', texte: 'Sec et très peu sucré. Dry Martini, Bamboo.' },
      { titre: 'Blanc (bianco)', texte: 'Doux et vanillé, incolore. White Negroni.' },
      { titre: 'Vermouth di Torino', texte: 'Indication géographique protégée du Piémont.' },
    ],
    aSavoir: [
      'C’est un vin : une fois ouvert, il se garde au réfrigérateur et se consomme en quelques semaines.',
      'Un vermouth oxydé est la première cause d’un Martini ou d’un Negroni raté.',
    ],
    cocktails: ['bamboo', 'dry-martini', 'manhattan', 'negroni', 'americano'],
  },
  {
    id: 'vins-mutes',
    nom: 'Xérès, porto et vins mutés',
    famille: VINS,
    accroche: 'Des vins renforcés à l’eau-de-vie, du plus sec au plus doux.',
    reperes: [
      ['Principe', 'Ajout d’eau-de-vie de vin pendant ou après la fermentation'],
      ['TAV', '15 à 22 %'],
      ['Origines', 'Jerez (Espagne), Douro (Portugal), Madère, Roussillon…'],
    ],
    histoire: [
      'Le mutage se développe pour stabiliser des vins destinés à voyager par mer. Les marchands anglais, grands amateurs de « sherry » et de porto, en structurent le commerce : le traité de Methuen (1703) favorise les vins portugais en Angleterre.',
      'En France, Arnaud de Villeneuve décrit le principe du mutage à la fin du XIIIe siècle : c’est l’origine des vins doux naturels du Roussillon.',
      'Le xérès est un pilier des premiers cocktails : le Sherry Cobbler est l’une des boissons les plus populaires du XIXe siècle américain, et le Bamboo est créé autour du fino.',
    ],
    elaboration: [
      'Xérès : vin blanc sec de cépage palomino, fortifié après fermentation, puis élevé en solera (assemblage progressif de plusieurs années). Sous un voile de levures appelé « flor », il reste pâle et sec ; sans flor, il s’oxyde et brunit.',
      'Porto : l’eau-de-vie est ajoutée en cours de fermentation, ce qui conserve le sucre naturel du raisin.',
    ],
    categories: [
      { titre: 'Fino et manzanilla', texte: 'Xérès secs, pâles, élevés sous flor (environ 15 %). À servir très frais.' },
      { titre: 'Amontillado et oloroso', texte: 'Xérès oxydatifs, ambrés, aux notes de noix.' },
      { titre: 'Pedro ximénez (PX)', texte: 'Xérès très doux, de raisins passerillés.' },
      { titre: 'Porto ruby et tawny', texte: 'Ruby : jeune et fruité. Tawny : vieilli en fût, notes de fruits secs. Vintage : millésimé, de garde.' },
      { titre: 'Autres', texte: 'Madère, marsala, vins doux naturels (banyuls, maury, rivesaltes), pineau des Charentes (mistelle).' },
    ],
    aSavoir: [
      'Un fino ouvert se garde quelques jours au froid, pas plus.',
      'Idéal pour des cocktails « low ABV » : beaucoup de goût, peu d’alcool.',
    ],
    cocktails: ['bamboo'],
  },
  {
    id: 'effervescents',
    nom: 'Champagne et vins effervescents',
    famille: VINS,
    accroche: 'La bulle qui allonge, allège et fait briller un cocktail.',
    reperes: [
      ['Champagne', 'AOC · chardonnay, pinot noir, meunier · seconde fermentation en bouteille'],
      ['Prosecco', 'DOC de Vénétie et du Frioul · cépage glera · cuve close'],
      ['TAV', '11 à 12,5 % environ'],
      ['Brut', 'Moins de 12 g de sucre par litre'],
    ],
    histoire: [
      'Jusqu’au XVIIe siècle, la bulle est un accident : le froid de l’hiver interrompt la fermentation, qui reprend au printemps dans la bouteille. Le moine Dom Pérignon (1638-1715), à l’abbaye d’Hautvillers, perfectionne surtout l’art de l’assemblage. Les Anglais, grâce à leurs bouteilles de verre épais, sont les premiers à apprécier volontairement le vin mousseux.',
      'Au XIXe siècle, la veuve Clicquot met au point le remuage sur pupitres (1816) et la maîtrise du dosage permet la naissance du brut. L’appellation Champagne est protégée, puis reconnue en AOC en 1936.',
      'Le Champagne Cocktail est mentionné dès 1855 ; le Bellini naît à Venise en 1948 ; le Spritz moderne consacre le prosecco.',
    ],
    elaboration: [
      'Méthode traditionnelle (champagne, crémant, cava) : un vin tranquille est mis en bouteille avec une liqueur de tirage ; la seconde fermentation crée la bulle. Vieillissement sur lies (15 mois minimum pour un champagne non millésimé, 3 ans pour un millésimé), remuage, dégorgement, puis dosage.',
      'Méthode en cuve close (Charmat) : la prise de mousse se fait en cuve sous pression, ce qui préserve le fruit et réduit les coûts. C’est la méthode du prosecco.',
    ],
    categories: [
      { titre: 'Dosages', texte: 'Brut nature, extra-brut, brut, extra-dry, sec, demi-sec, doux — du moins sucré au plus sucré.' },
      { titre: 'Blanc de blancs / blanc de noirs', texte: 'Issu uniquement de raisins blancs, ou uniquement de raisins noirs.' },
      { titre: 'Crémants', texte: 'Méthode traditionnelle hors Champagne : Alsace, Bourgogne, Loire, Limoux…' },
    ],
    aSavoir: [
      'Toujours stocké au frais et ajouté en dernier : on ne passe jamais une boisson effervescente au shaker.',
      '« Extra-dry » est plus sucré que « brut ».',
      'Le socle indique que le prosecco est à privilégier pour le Spritz.',
    ],
    cocktails: ['bellini', 'champagne-cocktail', 'french-75', 'spritz', 'pornstar-martini'],
  },
];

export const ALCOOL_PAR_ID: Record<string, Alcool> = Object.fromEntries(ALCOOLS.map((a) => [a.id, a]));

export const ARTICLES: Article[] = [
  {
    id: 'histoire',
    titre: 'Petite histoire de l’alcool',
    accroche: 'De la fermentation préhistorique au cocktail moderne.',
    sections: [
      {
        titre: 'Les boissons fermentées',
        texte:
          'La fermentation est connue depuis la préhistoire : bière en Mésopotamie et en Égypte, vin dans le Caucase puis tout autour de la Méditerranée, hydromel, saké, pulque. Jusqu’au Moyen Âge, toutes les boissons alcoolisées sont des boissons fermentées, à faible degré.',
      },
      {
        titre: 'L’invention de la distillation',
        texte:
          'L’alambic est connu des alchimistes d’Alexandrie, puis perfectionné par les savants du monde arabe à partir du VIIIe siècle, qui distillent parfums et remèdes. Les mots « alambic » (al-anbiq) et « alcool » (al-kuhl) viennent de l’arabe. Au XIIe siècle, l’école de médecine de Salerne distille le vin : c’est l’« aqua vitae », l’eau-de-vie, d’abord un médicament.',
      },
      {
        titre: 'De la pharmacie à la taverne',
        texte:
          'Du XVe au XVIIe siècle, l’eau-de-vie sort des monastères et des officines. Chaque région distille ce qu’elle a : le vin (cognac, armagnac), le grain (whisky, genièvre, vodka), le cidre (calvados), puis, dans les colonies, la canne à sucre (rhum, cachaça) et l’agave (mezcal).',
      },
      {
        titre: 'La révolution de la colonne',
        texte:
          'En 1830, l’Irlandais Aeneas Coffey brevette un alambic à colonne à distillation continue. Il produit vite, à moindre coût, un alcool très pur. C’est la naissance des alcools neutres, du London Dry gin, de la vodka moderne, des blends et de l’industrie des liqueurs.',
      },
      {
        titre: 'L’âge d’or du cocktail',
        texte:
          'Le mot « cocktail » est défini en 1806 aux États-Unis. La glace devient disponible toute l’année au XIXe siècle et Jerry Thomas publie le premier guide du barman en 1862. La Prohibition (1920-1933) disperse les barmen américains vers La Havane, Londres et Paris. Après des décennies de recettes simplifiées, la renaissance du cocktail, depuis les années 1990-2000, remet à l’honneur produits frais et recettes classiques.',
      },
    ],
  },
  {
    id: 'fabrication',
    titre: 'Fermentation, distillation, vieillissement',
    accroche: 'Les trois gestes qui font un spiritueux.',
    sections: [
      {
        titre: 'Fermentation alcoolique',
        texte:
          'Les levures transforment le sucre en alcool et en gaz carbonique. Le sucre est directement disponible dans les fruits, la canne ou le miel ; l’amidon des céréales doit d’abord être transformé en sucre (maltage, brassage), tout comme les réserves de l’agave (cuisson). Une boisson fermentée dépasse rarement 15 %.',
      },
      {
        titre: 'Distillation',
        texte:
          'L’alcool s’évapore à 78,3 °C, avant l’eau. En chauffant un liquide fermenté, on recueille des vapeurs plus riches en alcool, que l’on condense. Le distillateur écarte les « têtes » et les « queues » pour ne garder que le « cœur de chauffe ».',
      },
      {
        titre: 'Alambic à repasse (pot still)',
        texte:
          'Distillation discontinue, en deux chauffes le plus souvent. Elle donne des eaux-de-vie riches et aromatiques, autour de 70 % : cognac, single malt, calvados Pays d’Auge, rums lourds.',
      },
      {
        titre: 'Alambic à colonne',
        texte:
          'Distillation continue sur plateaux. Selon le réglage, elle donne une eau-de-vie de caractère (armagnac, rhum agricole, bourbon) ou un alcool neutre à 96 % (vodka, base des gins et des liqueurs).',
      },
      {
        titre: 'Vieillissement',
        texte:
          'En fût de chêne, l’eau-de-vie se colore, s’arrondit, s’oxyde lentement et extrait du bois vanilline et tanins. Le type de chêne, la chauffe du fût, son précédent contenu et le climat comptent autant que la durée. Une partie s’évapore : c’est la « part des anges ».',
      },
      {
        titre: 'Réduction et assemblage',
        texte:
          'Avant la mise en bouteille, l’eau-de-vie est ramenée à son degré de vente par ajout d’eau, puis assemblée pour obtenir un style constant. « Brut de fût » (cask strength) signifie sans réduction.',
      },
    ],
  },
  {
    id: 'classification',
    titre: 'Classer les boissons du bar',
    accroche: 'Boissons fermentées, spiritueux, apéritifs : s’y retrouver.',
    sections: [
      { titre: 'Boissons fermentées', texte: 'Vin, bière, cidre, poiré, saké, hydromel : obtenues par la seule fermentation.' },
      {
        titre: 'Eaux-de-vie',
        texte:
          'Obtenues par distillation d’un produit fermenté. Blanches (non vieillies) : gin, vodka, tequila blanco, rhum blanc, eaux-de-vie de fruits. Brunes (vieillies sous bois) : cognac, armagnac, calvados, whisky, rhum vieux.',
      },
      { titre: 'Liqueurs et crèmes', texte: 'Spiritueux sucrés et aromatisés, à partir de 15 %.' },
      {
        titre: 'Apéritifs à base de vin (ABV)',
        texte: 'Vermouths, quinquinas, vins aromatisés. Dans la mercuriale du socle : vermouth dry et vermouth rouge.',
      },
      {
        titre: 'Apéritifs à base d’alcool (ABA)',
        texte: 'Bitters, amers, gentianes, anisés. Dans la mercuriale du socle : aromatic bitters, bitters italiens.',
      },
      { titre: 'Vins mutés', texte: 'Vins renforcés à l’eau-de-vie : xérès, porto, madère, vins doux naturels ; et mistelles comme le pineau.' },
      {
        titre: 'Le TAV',
        texte:
          'Le titre alcoométrique volumique est le pourcentage d’alcool pur dans le volume total, à 20 °C. 40 % vol. signifie 40 ml d’alcool pur pour 100 ml. Le « proof » américain vaut le double du TAV (80 proof = 40 %).',
      },
    ],
  },
  {
    id: 'responsable',
    titre: 'Service responsable et repères',
    accroche: 'Ce que tout professionnel doit avoir en tête derrière le bar.',
    sections: [
      {
        titre: 'Le verre standard',
        texte:
          'En France, un verre standard contient environ 10 g d’alcool pur. Calcul : volume (ml) × TAV (%) × 0,8 ÷ 100. Exemple : 40 ml de spiritueux à 40 % = 12,8 g. Un cocktail peut donc représenter bien plus d’un verre standard : l’application l’affiche sur chaque fiche.',
      },
      {
        titre: 'Repères de consommation',
        texte:
          'Santé publique France recommande aux adultes de ne pas dépasser 10 verres standard par semaine, pas plus de 2 par jour, et de garder des jours sans alcool. Informations et aide : www.alcool-info-service.fr.',
      },
      {
        titre: 'Ce que dit la loi (France)',
        texte:
          'La vente et l’offre d’alcool aux mineurs de moins de 18 ans sont interdites, tout comme le fait de servir une personne manifestement ivre. L’exploitation d’un débit de boissons suppose une licence et un permis d’exploitation. Une offre de boissons sans alcool doit être présentée, et des boissons sans alcool proposées à prix réduit pendant les « happy hours ». Vérifiez toujours les textes en vigueur et les arrêtés locaux.',
      },
      {
        titre: 'No low et mocktails',
        texte:
          'Le socle rappelle que tous les cocktails de référence peuvent être déclinés en mocktails avec les produits sans alcool du marché, et encourage les créations à faible TAV. Prévoir une vraie carte sans alcool fait partie du métier.',
      },
    ],
  },
];

export const ARTICLE_PAR_ID: Record<string, Article> = Object.fromEntries(ARTICLES.map((a) => [a.id, a]));
