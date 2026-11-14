// Approfondissements des fiches « Culture produits » : dégustation, régions, lecture d'étiquette,
// conservation, idées reçues et classiques associés. Contenu rédigé pour l'application.

import type { Rubrique } from './guide';

export type Savoir = {
  degustation?: { oeil: string; nez: string; bouche: string };
  regions?: Rubrique[];
  etiquette?: Rubrique[];
  conservation?: string;
  ideesRecues?: Rubrique[];
  /** Cocktails classiques hors socle où le produit s'illustre. */
  classiques?: string[];
};

export const SAVOIR: Record<string, Savoir> = {
  gin: {
    degustation: {
      oeil: 'Incolore et limpide ; légèrement paille pour les gins passés sous bois.',
      nez: 'Genièvre résineux en tête, puis agrumes, coriandre, notes florales ou épicées selon la recette.',
      bouche: 'Sèche et vive, poivrée ; finale fraîche où le genièvre revient.',
    },
    regions: [
      { titre: 'Angleterre', texte: 'Berceau du London Dry ; Plymouth a longtemps eu son propre style, plus rond.' },
      { titre: 'Pays-Bas et Belgique', texte: 'Patrie du genièvre, l’ancêtre malté.' },
      { titre: 'Espagne', texte: 'Très grand pays consommateur : le gin tonic servi en verre ballon (copa) y est une institution.' },
      { titre: 'Nouvelle vague', texte: 'Depuis les années 2000, des distilleries artisanales partout dans le monde, France comprise, travaillent des botaniques locales.' },
    ],
    etiquette: [
      { titre: 'London Dry', texte: 'Un procédé : tout vient de la redistillation, sans arôme ni sucre ajoutés ensuite.' },
      { titre: 'Navy Strength', texte: 'Embouteillé à 57 % ou plus, dans la tradition de la marine britannique.' },
      { titre: 'Old Tom', texte: 'Style légèrement sucré, recherché pour les recettes du XIXe siècle.' },
      { titre: 'Contemporain', texte: 'Gin où d’autres botaniques (agrumes, fleurs, concombre) prennent le pas sur le genièvre.' },
    ],
    conservation: 'Bouteille debout, à l’abri de la lumière. Stable plusieurs années, mais les arômes s’estompent une fois la bouteille bien entamée.',
    ideesRecues: [
      { titre: '« Le London Dry vient de Londres »', texte: 'Non : il peut être produit n’importe où.' },
      { titre: '« Le gin est distillé à partir de genièvre »', texte: 'Non : c’est un alcool neutre, le plus souvent de céréales, aromatisé au genièvre.' },
    ],
    classiques: ['Gin Tonic', 'Tom Collins', 'Gimlet', 'White Lady', 'Clover Club', 'Last Word', 'Martinez'],
  },
  vodka: {
    degustation: {
      oeil: 'Parfaitement incolore et brillante.',
      nez: 'Discret : céréale, mie de pain, parfois une pointe poivrée ou minérale.',
      bouche: 'Tout se joue sur la texture — ronde, grasse ou tranchante — et sur la netteté de la finale.',
    },
    regions: [
      { titre: 'Pologne', texte: 'Seigle et pomme de terre : vodkas de caractère, épicées ou onctueuses.' },
      { titre: 'Russie', texte: 'Blé surtout : style doux et rond.' },
      { titre: 'Pays nordiques', texte: 'Blé d’hiver et orge, eaux très pures.' },
      { titre: 'France', texte: 'Vodkas de blé ou de raisin, positionnées haut de gamme.' },
    ],
    etiquette: [
      { titre: 'Matière première', texte: 'Blé, seigle, pomme de terre, raisin… : c’est elle qui donne la texture.' },
      { titre: '« Distillée x fois »', texte: 'Un argument commercial plus qu’un gage de qualité.' },
      { titre: 'Aromatisée', texte: 'Vodka parfumée (vanille, agrumes, herbe de bison…).' },
    ],
    conservation: 'Très stable. Le congélateur la rend sirupeuse mais gomme ses arômes comme ses défauts.',
    ideesRecues: [
      { titre: '« La vodka n’a aucun goût »', texte: 'Dégustées pures côte à côte, une vodka de seigle et une de pomme de terre se distinguent nettement.' },
      { titre: '« Plus elle est distillée, meilleure elle est »', texte: 'La qualité de la matière première, de l’eau et de la filtration compte davantage.' },
    ],
    classiques: ['Vodka Martini', 'White Russian', 'Black Russian', 'Kamikaze', 'Screwdriver', 'Caipiroska', 'Vesper'],
  },
  whisky: {
    degustation: {
      oeil: 'De l’or pâle à l’acajou selon le fût ; le colorant caramel est autorisé pour le scotch.',
      nez: 'Céréale et fruits (jeunes), vanille et coco (fût de bourbon), fruits secs (fût de xérès), fumée et iode (tourbe).',
      bouche: 'Attaque douce ou épicée, milieu de bouche gras, finale plus ou moins longue ; quelques gouttes d’eau l’ouvrent.',
    },
    regions: [
      { titre: 'Écosse', texte: 'Speyside (fruité), Highlands (variés), Lowlands (légers), Islay (tourbés, marins), Campbeltown.' },
      { titre: 'Irlande', texte: 'Triple distillation fréquente : souplesse et fruité.' },
      { titre: 'États-Unis', texte: 'Kentucky pour le bourbon, Tennessee et sa filtration au charbon d’érable.' },
      { titre: 'Canada', texte: 'Whiskies légers, traditionnellement appelés « rye ».' },
      { titre: 'Japon', texte: 'Précision et art de l’assemblage.' },
      { titre: 'France', texte: 'Une production en plein essor, avec des indications géographiques en Bretagne et en Alsace.' },
    ],
    etiquette: [
      { titre: 'Single malt', texte: 'Orge maltée, une seule distillerie.' },
      { titre: 'Single cask', texte: 'Un seul fût, donc une édition limitée.' },
      { titre: 'Cask strength (brut de fût)', texte: 'Embouteillé sans réduction, souvent entre 50 et 65 %.' },
      { titre: 'Non filtré à froid', texte: 'Garde plus de matière ; peut se troubler avec l’eau ou le froid.' },
      { titre: 'Straight', texte: 'Whiskey américain vieilli 2 ans minimum, sans additif.' },
      { titre: 'Bottled in bond', texte: 'États-Unis : une distillerie, une saison, 4 ans de fût, 50 %.' },
    ],
    conservation: 'Debout : l’alcool attaque le liège. Ouvert, il se garde des années, mais s’évente quand la bouteille est presque vide.',
    ideesRecues: [
      { titre: '« Plus il est vieux, meilleur il est »', texte: 'L’âge apporte du boisé, pas forcément de l’équilibre.' },
      { titre: '« Single malt = un seul fût »', texte: 'Non : c’est l’assemblage de fûts d’une même distillerie.' },
    ],
    classiques: ['Whisky Highball', 'Sazerac', 'Boulevardier', 'Rob Roy', 'Blood and Sand', 'Rusty Nail', 'Irish Coffee'],
  },
  rhum: {
    degustation: {
      oeil: 'Incolore, paille, ambré ou acajou ; la couleur ne dit pas l’âge.',
      nez: 'Blanc agricole : canne fraîche, agrumes, poivre. Vieux : vanille, fruits secs, épices, boisé. Jamaïque : fruits très mûrs.',
      bouche: 'Vive et végétale ou ronde et pâtissière selon le style ; les rhums à esters sont explosifs.',
    },
    regions: [
      { titre: 'Martinique', texte: 'Rhum agricole sous AOC.' },
      { titre: 'Guadeloupe et Marie-Galante', texte: 'Agricoles de caractère, souvent à haut degré.' },
      { titre: 'Jamaïque', texte: 'Pot still et longues fermentations : rhums riches en esters.' },
      { titre: 'Barbade', texte: 'Équilibre entre colonne et pot still.' },
      { titre: 'Cuba', texte: 'Style léger filtré au charbon.' },
      { titre: 'Guyana', texte: 'Rhums Demerara, sombres et profonds.' },
      { titre: 'La Réunion et Maurice', texte: 'Traditionnels et agricoles de l’océan Indien.' },
    ],
    etiquette: [
      { titre: 'Agricole', texte: 'Pur jus de canne des départements français d’outre-mer ou de Madère.' },
      { titre: 'Solera', texte: 'Assemblage progressif de plusieurs âges : le chiffre affiché n’est pas un âge minimum.' },
      { titre: 'Overproof', texte: 'Très haut degré, pour les flambages et les cocktails Tiki.' },
      { titre: 'Épicé (spiced)', texte: 'Boisson à base de rhum aromatisée, souvent sucrée.' },
      { titre: 'Sucre ajouté', texte: 'Dans l’Union européenne, un rhum ne peut être édulcoré au-delà de 20 g par litre.' },
    ],
    conservation: 'Debout, à l’abri de la chaleur. Le rhum ne vieillit plus une fois en bouteille.',
    ideesRecues: [
      { titre: '« Ambré veut dire vieux »', texte: 'Un ambré n’a passé que peu de temps sous bois, et peut être coloré au caramel.' },
      { titre: '« Le rhum blanc est un rhum bas de gamme »', texte: 'Les grands blancs agricoles sont parmi les rhums les plus expressifs.' },
    ],
    classiques: ['Ti-punch', 'Cuba Libre', 'Zombie', 'Hurricane', 'El Presidente', 'Jungle Bird', 'Painkiller'],
  },
  cachaca: {
    degustation: {
      oeil: 'Incolore, ou dorée après passage sous bois.',
      nez: 'Canne verte, herbe coupée, fruits blancs ; cannelle et vanille pour l’amburana.',
      bouche: 'Végétale et franche, plus rustique qu’un rhum agricole.',
    },
    regions: [
      { titre: 'Minas Gerais', texte: 'Cœur de la cachaça artisanale d’alambic.' },
      { titre: 'São Paulo', texte: 'Gros volumes de cachaça de colonne.' },
      { titre: 'Paraty (Rio de Janeiro)', texte: 'Tradition historique du littoral.' },
    ],
    etiquette: [
      { titre: 'De alambique / artesanal', texte: 'Distillée en alambic de cuivre.' },
      { titre: 'Envelhecida', texte: 'Au moins la moitié de l’assemblage a vieilli un an en fût.' },
      { titre: 'Premium / Extra premium', texte: 'Entièrement vieillie, respectivement 1 an et 3 ans au minimum.' },
    ],
    conservation: 'Comme un rhum : debout, à température ambiante.',
    classiques: ['Batida', 'Rabo de Galo', 'Caipirinha aux fruits'],
  },
  tequila: {
    degustation: {
      oeil: 'Incolore (blanco), paille (reposado), ambrée (añejo).',
      nez: 'Agave cuit, poivre, agrumes ; vanille et caramel avec l’âge ; fumée pour le mezcal.',
      bouche: 'Végétale et poivrée, légèrement sucrée par l’agave ; finale minérale.',
    },
    regions: [
      { titre: 'Los Altos (Jalisco)', texte: 'Hautes terres rouges : tequilas fruitées et florales.' },
      { titre: 'Vallée de Tequila', texte: 'Basses terres volcaniques : profils terreux et herbacés.' },
      { titre: 'Oaxaca', texte: 'Capitale du mezcal.' },
    ],
    etiquette: [
      { titre: '100 % de agave', texte: 'Aucun autre sucre : la mention à chercher en premier.' },
      { titre: 'NOM', texte: 'Numéro qui identifie la distillerie ; plusieurs marques peuvent en partager une.' },
      { titre: 'Cristalino', texte: 'Tequila vieillie puis filtrée pour redevenir incolore.' },
      { titre: 'Joven / oro', texte: 'Blanco colorée ou assemblée avec une tequila vieillie.' },
    ],
    conservation: 'Debout, à l’abri de la lumière ; stable après ouverture.',
    ideesRecues: [
      { titre: '« Il y a un ver dans la tequila »', texte: 'Jamais. On en trouve dans certains mezcals : un argument commercial récent, pas une tradition de qualité.' },
      { titre: '« Sel et citron obligatoires »', texte: 'Le rituel sert surtout à masquer les tequilas médiocres ; une bonne tequila se sirote.' },
    ],
    classiques: ['Tommy’s Margarita', 'Batanga', 'El Diablo', 'Tequila Old-Fashioned', 'Naked and Famous (mezcal)'],
  },
  cognac: {
    degustation: {
      oeil: 'De l’or à l’ambre profond ; la teinte peut être ajustée au caramel.',
      nez: 'Fleur de vigne et fruits frais (jeunes), fruits confits, vanille, épices, puis rancio (vieux).',
      bouche: 'Souple, sans brûlure, avec une longue finale ; servir à température ambiante, sans chauffer le verre.',
    },
    regions: [
      { titre: 'Grande Champagne', texte: 'Finesse florale, très longue aptitude au vieillissement.' },
      { titre: 'Petite Champagne', texte: 'Proche de la Grande, un peu moins longue.' },
      { titre: 'Borderies', texte: 'Le plus petit cru : rondeur et notes de violette.' },
      { titre: 'Fins Bois', texte: 'Eaux-de-vie fruitées qui vieillissent vite.' },
      { titre: 'Bons Bois et Bois Ordinaires', texte: 'Profils plus rustiques, influence océanique.' },
    ],
    etiquette: [
      { titre: 'Fine Champagne', texte: 'Assemblage de Grande et Petite Champagne, au moins 50 % de Grande.' },
      { titre: 'Extra, Hors d’âge', texte: 'Au-delà du XO : les plus vieux assemblages de la maison.' },
      { titre: 'Mention de cru', texte: 'Cognac issu d’un seul des six crus.' },
    ],
    conservation: 'Debout. Le cognac ne vieillit plus en bouteille ; une bouteille très entamée s’oxyde lentement.',
    ideesRecues: [
      { titre: '« Plus il est foncé, plus il est vieux »', texte: 'La couleur peut être corrigée ; seul le compte d’âge renseigne.' },
      { titre: '« Il faut chauffer le verre »', texte: 'La chaleur fait ressortir l’alcool et écrase les arômes.' },
    ],
    classiques: ['Vieux Carré', 'Brandy Alexander', 'Between the Sheets', 'Stinger', 'French Connection', 'Japanese Cocktail'],
  },
  armagnac: {
    degustation: {
      oeil: 'Ambre soutenu, reflets acajou.',
      nez: 'Pruneau, fruits confits, vanille, boisé, puis rancio.',
      bouche: 'Ample et chaleureuse, plus charnue que le cognac.',
    },
    regions: [
      { titre: 'Bas-Armagnac', texte: 'Sables fauves : finesse et notes de pruneau.' },
      { titre: 'Armagnac-Ténarèze', texte: 'Sols argilo-calcaires : puissance et longue garde.' },
      { titre: 'Haut-Armagnac', texte: 'Production confidentielle.' },
    ],
    etiquette: [
      { titre: 'Millésime', texte: 'Eau-de-vie d’une seule année de récolte.' },
      { titre: 'Date de mise en bouteille', texte: 'Essentielle : l’armagnac ne vieillit plus ensuite.' },
      { titre: 'Brut de fût', texte: 'Sans réduction à l’eau.' },
      { titre: 'Cépages', texte: 'Le baco apporte la structure, la folle blanche la finesse florale.' },
    ],
    conservation: 'Debout, à l’abri de la lumière.',
    classiques: ['Old-Fashioned à l’armagnac', 'Sidecar gascon', 'Pousse-rapière'],
  },
  calvados: {
    degustation: {
      oeil: 'Or pâle à ambre.',
      nez: 'Pomme fraîche et fleurs (jeune), pomme cuite, épices, noix et vanille (vieux).',
      bouche: 'Fruitée et vive, puis ronde et longue avec l’âge.',
    },
    regions: [
      { titre: 'Pays d’Auge', texte: 'Double distillation : calvados fins et de garde.' },
      { titre: 'Domfrontais', texte: 'Poire et granit : fruité vif.' },
      { titre: 'AOC Calvados', texte: 'La zone la plus vaste, des styles variés.' },
    ],
    etiquette: [
      { titre: 'Comptes d’âge', texte: 'Fine ou VS (2 ans), Vieux (3), VSOP (4), XO ou Hors d’âge (6).' },
      { titre: 'Pommeau de Normandie', texte: 'Mistelle : moût de pomme muté au calvados, à ne pas confondre.' },
    ],
    conservation: 'Debout ; stable après ouverture.',
    classiques: ['Jack Rose', 'Calvados tonic', 'Corpse Reviver n° 1', 'Serendipity'],
  },
  pisco: {
    degustation: {
      oeil: 'Incolore et brillant.',
      nez: 'Raisin frais, fleurs blanches, agrumes ; très aromatique pour les cépages muscatés.',
      bouche: 'Ronde, fruitée, sans boisé.',
    },
    regions: [
      { titre: 'Pérou', texte: 'Cinq régions côtières : Lima, Ica, Arequipa, Moquegua et Tacna.' },
      { titre: 'Chili', texte: 'Régions d’Atacama et de Coquimbo.' },
    ],
    etiquette: [
      { titre: 'Puro, acholado, mosto verde', texte: 'Un cépage, un assemblage, ou un moût partiellement fermenté.' },
      { titre: 'Cépages aromatiques ou non', texte: 'Italia et torontel (parfumés) ; quebranta (plus neutre, structuré).' },
      { titre: 'Chili', texte: 'Classement par degré : de 30 % (corriente) à 43 % (gran pisco).' },
    ],
    conservation: 'Debout, à l’abri de la lumière.',
    classiques: ['Pisco Sour', 'Chilcano', 'Pisco Punch', 'El Capitán'],
  },
  'fruits-marcs': {
    degustation: {
      oeil: 'Incolore et cristalline (eaux-de-vie blanches) ; dorée pour les marcs vieillis.',
      nez: 'Le fruit, net et intense ; note d’amande pour les fruits à noyau.',
      bouche: 'Sèche, puissante, très longue sur le fruit.',
    },
    regions: [
      { titre: 'Alsace et Lorraine', texte: 'Kirsch, mirabelle, quetsche, framboise, poire.' },
      { titre: 'Forêt-Noire, Suisse, Autriche', texte: 'La grande tradition germanique des eaux-de-vie de fruits.' },
      { titre: 'Italie du Nord', texte: 'Grappa de Vénétie, du Piémont et du Trentin.' },
      { titre: 'Bourgogne', texte: 'Marc et fine.' },
    ],
    etiquette: [
      { titre: 'Eau-de-vie de…', texte: 'Fruits fermentés puis distillés.' },
      { titre: 'Esprit de… / Geist', texte: 'Fruits macérés dans l’alcool puis redistillés (petits fruits).' },
      { titre: 'Grappa monovitigno', texte: 'Issue d’un seul cépage.' },
    ],
    conservation: 'Debout, au frais ; les arômes de fruit s’atténuent lentement après ouverture.',
    classiques: ['Rose (kirsch et vermouth)', 'Caffè corretto (grappa)'],
  },
  liqueurs: {
    degustation: {
      oeil: 'Toutes les couleurs ; la viscosité trahit la richesse en sucre.',
      nez: 'L’ingrédient vedette, qui doit rester net et naturel.',
      bouche: 'Sucrée par définition : l’acidité ou l’amertume du cocktail vient l’équilibrer.',
    },
    regions: [
      { titre: 'France', texte: 'Angers (triple sec), Dijon (cassis), Voiron (Chartreuse), Fécamp (Bénédictine).' },
      { titre: 'Italie', texte: 'Amaretto, limoncello, sambuca, maraschino.' },
      { titre: 'Pays-Bas', texte: 'Les liquoristes d’Amsterdam, actifs depuis le XVIe siècle.' },
      { titre: 'Caraïbes', texte: 'Falernum, liqueur de piment de la Jamaïque, liqueurs de café.' },
    ],
    etiquette: [
      { titre: 'Crème de…', texte: 'Au moins 250 g de sucre par litre (400 g pour le cassis).' },
      { titre: 'Triple sec', texte: 'Liqueur d’orange incolore et sèche, autour de 40 %.' },
      { titre: 'Arômes naturels', texte: 'À privilégier : les arômes de synthèse se reconnaissent vite en cocktail.' },
    ],
    conservation: 'Liqueurs fortes : stables. Crèmes de fruits : au frais, quelques mois. Liqueurs à la crème : au frais, selon la date indiquée.',
    ideesRecues: [
      { titre: '« Une liqueur est un alcool léger »', texte: 'Certaines dépassent 40 %, la Chartreuse verte atteint 55 %.' },
    ],
    classiques: ['Kir', 'Last Word', 'Bijou', 'Grasshopper', 'Amaretto Sour', 'B-52'],
  },
  amers: {
    degustation: {
      oeil: 'Du jaune d’or (gentiane) au rouge vif (bitter) et au brun (amaro).',
      nez: 'Écorces d’orange, racines, épices, herbes médicinales.',
      bouche: 'L’amertume en fin de bouche fait saliver : c’est elle qui ouvre l’appétit.',
    },
    regions: [
      { titre: 'Italie', texte: 'Milan, Turin et la Vénétie pour les bitters ; chaque région a son amaro.' },
      { titre: 'France', texte: 'Gentianes d’Auvergne, quinquinas et amers du Nord.' },
      { titre: 'Trinité et La Nouvelle-Orléans', texte: 'Les deux grands aromatic bitters historiques.' },
      { titre: 'Europe centrale', texte: 'Liqueurs amères aux herbes, de l’Allemagne à la Hongrie.' },
    ],
    etiquette: [
      { titre: 'Bitter / aperitivo', texte: 'Amer apéritif, à allonger.' },
      { titre: 'Amaro', texte: 'Amer digestif italien.' },
      { titre: 'Fernet', texte: 'Famille d’amari très secs, mentholés et puissants.' },
      { titre: 'Aromatic bitters', texte: 'Concentré à doser au trait, non destiné à être bu seul.' },
    ],
    conservation: 'Aromatic bitters : quasi illimitée. Bitters apéritifs peu alcoolisés : mieux au frais après ouverture.',
    classiques: ['Garibaldi', 'Milano-Torino', 'Boulevardier', 'Paper Plane', 'Trinidad Sour', 'Hanky Panky'],
  },
  anises: {
    degustation: {
      oeil: 'Limpide puis opalescent dès que l’on ajoute l’eau : le louche.',
      nez: 'Anis, fenouil, réglisse ; herbes alpines pour l’absinthe.',
      bouche: 'Fraîche, douce, très persistante.',
    },
    regions: [
      { titre: 'Pontarlier et Val-de-Travers', texte: 'Berceau franco-suisse de l’absinthe.' },
      { titre: 'Provence', texte: 'Le pastis.' },
      { titre: 'Méditerranée orientale', texte: 'Ouzo grec, raki turc, arak libanais.' },
      { titre: 'Espagne et Italie', texte: 'Anís et sambuca.' },
    ],
    etiquette: [
      { titre: 'Pastis de Marseille', texte: '45 % et une teneur renforcée en anéthol.' },
      { titre: 'Absinthe blanche ou verte', texte: 'La verte est colorée par une seconde macération de plantes.' },
      { titre: 'Thuyone', texte: 'Molécule de l’absinthe, dont la teneur est limitée par la réglementation.' },
    ],
    conservation: 'À température ambiante : le froid fait précipiter l’anéthol et trouble la bouteille.',
    ideesRecues: [
      { titre: '« L’absinthe rend fou »', texte: 'La thuyone y est présente en trop faible quantité ; c’est l’alcoolisme de l’époque qui était en cause.' },
    ],
    classiques: ['Sazerac (rinçage)', 'Corpse Reviver n° 2', 'Death in the Afternoon', 'Mauresque', 'Perroquet', 'Tomate'],
  },
  vermouth: {
    degustation: {
      oeil: 'Paille (dry), doré (blanc), acajou (rouge).',
      nez: 'Herbes sèches, armoise, agrumes ; vanille et épices pour le rouge.',
      bouche: 'Vineuse, plus ou moins sucrée, toujours terminée par une amertume.',
    },
    regions: [
      { titre: 'Turin', texte: 'Le Vermouth di Torino, doux et épicé, protégé par une indication géographique.' },
      { titre: 'Chambéry', texte: 'Style léger et floral ; berceau du vermouth blanc.' },
      { titre: 'Marseillan', texte: 'Vermouth sec, vieilli en plein air.' },
      { titre: 'Espagne', texte: 'Le « vermut » de Reus, servi à l’heure de l’apéritif avec olive et orange.' },
    ],
    etiquette: [
      { titre: 'Rosso, bianco, dry, extra dry', texte: 'Du plus sucré au plus sec.' },
      { titre: 'Superiore', texte: 'Vermouth di Torino plus titré, avec une part minimale de vins du Piémont.' },
      { titre: 'Quinquina, americano, chinato', texte: 'Vins aromatisés voisins, amérisés à la quinine ou à la gentiane.' },
    ],
    conservation: 'Au réfrigérateur dès l’ouverture, bien rebouché : un mois environ, puis il s’oxyde.',
    ideesRecues: [
      { titre: '« Le vermouth rouge est fait de vin rouge »', texte: 'Il est presque toujours élaboré à partir de vin blanc, coloré au caramel.' },
      { titre: '« Il se garde indéfiniment »', texte: 'C’est un vin : un vermouth éventé gâche le cocktail.' },
    ],
    classiques: ['Vermouth cassis', 'Adonis', 'Martinez', 'Bijou', 'Gibson', 'Boulevardier'],
  },
  'vins-mutes': {
    degustation: {
      oeil: 'Paille (fino), ambre (amontillado), acajou (oloroso, tawny), rubis (ruby).',
      nez: 'Amande et levure (fino), noix et caramel (oloroso), fruits noirs (ruby), fruits secs (tawny).',
      bouche: 'Du très sec et salin au liquoreux ; toujours une grande longueur.',
    },
    regions: [
      { titre: 'Jerez', texte: 'Le triangle Jerez, Sanlúcar, El Puerto, en Andalousie.' },
      { titre: 'Douro', texte: 'Vignoble en terrasses du porto.' },
      { titre: 'Madère', texte: 'Vins chauffés, presque indestructibles.' },
      { titre: 'Sicile', texte: 'Marsala.' },
      { titre: 'Roussillon', texte: 'Banyuls, maury, rivesaltes : les vins doux naturels.' },
      { titre: 'Charentes', texte: 'Pineau, mistelle au cognac.' },
    ],
    etiquette: [
      { titre: 'En rama', texte: 'Xérès mis en bouteille presque sans filtration.' },
      { titre: 'Palo cortado', texte: 'Xérès rare, entre l’amontillado et l’oloroso.' },
      { titre: 'LBV, vintage, colheita', texte: 'Portos millésimés : mise tardive, grande année, ou tawny d’une seule récolte.' },
      { titre: '10, 20, 30, 40 ans', texte: 'Âge moyen indicatif d’un tawny.' },
    ],
    conservation: 'Fino : quelques jours au frais. Oloroso et tawny : plusieurs semaines. Vintage : un à deux jours après ouverture.',
    classiques: ['Sherry Cobbler', 'Adonis', 'Porto Tonic', 'Rebujito', 'Coffee Cocktail'],
  },
  effervescents: {
    degustation: {
      oeil: 'Finesse et persistance de la bulle, cordon régulier.',
      nez: 'Agrumes et fleurs blanches (jeunes), brioche et fruits secs (vieillis sur lies).',
      bouche: 'L’équilibre entre acidité, dosage et mousse ; un verre à vin exprime mieux les arômes qu’une flûte étroite.',
    },
    regions: [
      { titre: 'Champagne', texte: 'Montagne de Reims, Vallée de la Marne, Côte des Blancs, Côte des Bar.' },
      { titre: 'Crémants', texte: 'Huit appellations françaises, de l’Alsace à Limoux.' },
      { titre: 'Italie', texte: 'Prosecco (cuve close), Franciacorta (méthode traditionnelle), Asti (doux).' },
      { titre: 'Espagne', texte: 'Cava, en méthode traditionnelle.' },
    ],
    etiquette: [
      { titre: 'Dosage', texte: 'Brut nature (moins de 3 g/l), extra-brut (jusqu’à 6), brut (moins de 12), extra-dry (12 à 17), sec, demi-sec, doux.' },
      { titre: 'Blanc de blancs / de noirs', texte: 'Raisins blancs seuls, ou raisins noirs seuls.' },
      { titre: 'Millésimé', texte: 'Vin d’une seule année, vieilli au moins trois ans.' },
      { titre: 'RM, NM', texte: 'Récoltant-manipulant (vigneron) ou négociant-manipulant (maison).' },
    ],
    conservation: 'Couché, au frais et à l’ombre. Ouvert : un bouchon stoppeur garde la bulle un à deux jours.',
    ideesRecues: [
      { titre: '« Une petite cuillère garde les bulles »', texte: 'Sans effet : seul un bouchon hermétique fonctionne.' },
      { titre: '« Extra-dry est plus sec que brut »', texte: 'C’est l’inverse.' },
    ],
    classiques: ['Kir Royal', 'Mimosa', 'Black Velvet', 'Airmail', 'Old Cuban', 'Death in the Afternoon'],
  },
  'biere-cidre': {
    degustation: {
      oeil: 'Couleur du malt, tenue de la mousse, limpidité ou trouble assumé.',
      nez: 'Céréale, houblon (agrumes, résine, fleurs), levure (fruits, épices), torréfaction.',
      bouche: 'Équilibre entre le sucre du malt et l’amertume du houblon ; la bulle porte l’ensemble.',
    },
    regions: [
      { titre: 'Belgique', texte: 'Trappistes, lambics, blanches, saisons.' },
      { titre: 'Allemagne et République tchèque', texte: 'Lagers, pils, bières de blé.' },
      { titre: 'Îles britanniques', texte: 'Ales, bitters, stouts, porters.' },
      { titre: 'États-Unis', texte: 'Le mouvement craft et ses IPA.' },
      { titre: 'Normandie et Bretagne', texte: 'Cidres et poirés, dont plusieurs appellations.' },
    ],
    etiquette: [
      { titre: 'IBU', texte: 'Échelle de l’amertume.' },
      { titre: 'EBC', texte: 'Échelle de la couleur.' },
      { titre: 'Double, triple', texte: 'Bières d’abbaye de plus en plus fortes.' },
      { titre: 'Refermentée en bouteille', texte: 'Levure vivante : verser doucement, laisser le dépôt.' },
      { titre: 'Brut, demi-sec, doux', texte: 'Pour le cidre, selon le sucre restant.' },
    ],
    conservation: 'Au frais, debout, à l’abri de la lumière, qui donne un faux goût. Respecter la date indiquée ; un fût entamé se boit en quelques jours.',
    classiques: ['Michelada', 'Panaché', 'Monaco', 'Picon bière', 'Black Velvet', 'Stone Fence (cidre)'],
  },
  sake: {
    degustation: {
      oeil: 'Incolore à légèrement doré ; laiteux pour le nigori.',
      nez: 'Riz cuit, poire, melon, banane, fleurs blanches.',
      bouche: 'Douce, soyeuse, peu acide, avec une saveur umami.',
    },
    regions: [
      { titre: 'Niigata', texte: 'Sakés secs et légers.' },
      { titre: 'Hyōgo (Nada)', texte: 'Sakés structurés ; berceau du riz Yamada Nishiki.' },
      { titre: 'Kyoto (Fushimi)', texte: 'Style doux et soyeux.' },
      { titre: 'Hiroshima', texte: 'Sakés ronds, eau très douce.' },
    ],
    etiquette: [
      { titre: 'Taux de polissage', texte: 'Part du grain conservée : plus elle est faible, plus le saké est fin.' },
      { titre: 'Namazake', texte: 'Non pasteurisé : à garder impérativement au froid.' },
      { titre: 'Genshu', texte: 'Non dilué, donc plus fort.' },
      { titre: 'Honjōzō', texte: 'Léger ajout d’alcool distillé, pour alléger et parfumer.' },
    ],
    conservation: 'Au frais et à l’ombre, à boire dans l’année. Ouvert : une à deux semaines au réfrigérateur.',
    ideesRecues: [
      { titre: '« Le saké se boit chaud »', texte: 'Les sakés fins se servent frais ; seuls certains gagnent à être tiédis.' },
      { titre: '« C’est un alcool fort »', texte: 'Environ 15 % : le degré d’un vin puissant.' },
    ],
    classiques: ['Saketini', 'Saké Highball', 'Samurai Rock'],
  },
  agrumes: {
    regions: [
      { titre: 'Méditerranée', texte: 'Sicile, Espagne, Menton pour le citron.' },
      { titre: 'Mexique et Brésil', texte: 'Grands producteurs de citron vert.' },
      { titre: 'Corse', texte: 'Clémentine, cédrat.' },
      { titre: 'Japon', texte: 'Yuzu, sudachi.' },
    ],
    etiquette: [
      { titre: 'Non traité après récolte', texte: 'Indispensable dès que l’on utilise le zeste.' },
      { titre: 'Variétés', texte: 'Le citron vert courant est la lime de Tahiti ; la key lime, plus petite, est plus parfumée.' },
      { titre: 'Rendement', texte: 'Compter environ 3 à 5 cl de jus par citron jaune, 2 à 3 cl par citron vert, selon la taille et la saison.' },
    ],
    conservation: 'Fruits entiers au frais une à deux semaines. Jus : le jour même. Zestes : à la minute.',
    ideesRecues: [
      { titre: '« Citron jaune et citron vert sont interchangeables »', texte: 'Acidité et parfum diffèrent : un Daiquiri au citron jaune n’est plus un Daiquiri.' },
      { titre: '« Le jus en bouteille fait l’affaire »', texte: 'Pasteurisé, il perd sa vivacité ; le socle demande des jus frais.' },
    ],
    classiques: ['Citronnade', 'Gimlet', 'Tom Collins', 'Whiskey Sour'],
  },
  sucres: {
    regions: [
      { titre: 'Canne', texte: 'Brésil, Inde, Caraïbes, La Réunion.' },
      { titre: 'Betterave', texte: 'France, Allemagne, Europe du Nord.' },
      { titre: 'Érable et agave', texte: 'Québec ; Mexique.' },
    ],
    etiquette: [
      { titre: 'Cassonade', texte: 'Sucre roux de canne.' },
      { titre: 'Vergeoise', texte: 'Sucre de betterave recuit, au goût de caramel.' },
      { titre: 'Muscovado', texte: 'Sucre de canne non raffiné, riche en mélasse.' },
      { titre: 'Demerara', texte: 'Gros cristaux blonds, classique des cocktails Tiki.' },
      { titre: 'Degré Brix', texte: 'Concentration en sucre : environ 50 pour un sirop 1 pour 1, 66 pour un sirop riche.' },
    ],
    conservation: 'Sirop simple : quelques semaines au froid. Sirop riche : plus longtemps. Jeter au moindre trouble ou à la moindre odeur.',
    classiques: ['Ti-punch (sirop de canne)', 'Old-Fashioned (sucre brun)', 'Mai Tai (orgeat)'],
  },
  cafe: {
    degustation: {
      oeil: 'Une crème noisette, fine et persistante, sur l’espresso.',
      nez: 'Torréfaction, cacao, fruits secs, parfois des notes florales ou fruitées.',
      bouche: 'Équilibre entre amertume, acidité et douceur ; corps sirupeux.',
    },
    regions: [
      { titre: 'Brésil', texte: 'Premier producteur : cafés ronds, chocolatés.' },
      { titre: 'Colombie et Amérique centrale', texte: 'Arabicas équilibrés, acidulés.' },
      { titre: 'Éthiopie', texte: 'Berceau de l’arabica : floral, fruité.' },
      { titre: 'Vietnam', texte: 'Grand producteur de robusta.' },
    ],
    etiquette: [
      { titre: 'Arabica / robusta', texte: 'Finesse et acidité, ou corps, amertume et caféine.' },
      { titre: 'Date de torréfaction', texte: 'Le café est au mieux dans les semaines qui suivent.' },
      { titre: 'Origine unique ou assemblage', texte: 'Un terroir identifiable, ou un profil constant.' },
    ],
    conservation: 'En grains, à l’abri de l’air et de la lumière ; moudre à la minute.',
    classiques: ['Irish Coffee', 'Carajillo', 'White Russian', 'Espresso Tonic', 'Café frappé'],
  },
};
