export interface PokemonEntry {
  id: number;
  gen: 1 | 2 | 3;
  fr: string;
  en: string;
  types: string[];
}

export const GENERATION_INFO = {
  1: { id: 1 as const, name: "Génération 1", region: "Kanto", range: "#001 - #151", count: 151, color: "from-rose-500 to-orange-500", starters: [1, 4, 7] },
  2: { id: 2 as const, name: "Génération 2", region: "Johto", range: "#152 - #251", count: 100, color: "from-amber-400 to-teal-500", starters: [152, 155, 158] },
  3: { id: 3 as const, name: "Génération 3", region: "Hoenn", range: "#252 - #386", count: 135, color: "from-emerald-500 to-blue-600", starters: [252, 255, 258] },
};

export const TYPE_LABELS: Record<string, { fr: string; color: string }> = {
  normal: { fr: "Normal", color: "bg-stone-400 text-stone-950" },
  fire: { fr: "Feu", color: "bg-orange-500 text-white" },
  water: { fr: "Eau", color: "bg-blue-500 text-white" },
  grass: { fr: "Plante", color: "bg-emerald-500 text-white" },
  electric: { fr: "Électrik", color: "bg-yellow-400 text-yellow-950" },
  ice: { fr: "Glace", color: "bg-cyan-300 text-cyan-950" },
  fighting: { fr: "Combat", color: "bg-red-700 text-white" },
  poison: { fr: "Poison", color: "bg-purple-500 text-white" },
  ground: { fr: "Sol", color: "bg-amber-600 text-white" },
  flying: { fr: "Vol", color: "bg-indigo-400 text-white" },
  psychic: { fr: "Psy", color: "bg-pink-500 text-white" },
  bug: { fr: "Insecte", color: "bg-lime-500 text-lime-950" },
  rock: { fr: "Roche", color: "bg-yellow-700 text-white" },
  ghost: { fr: "Spectre", color: "bg-violet-800 text-white" },
  dragon: { fr: "Dragon", color: "bg-indigo-600 text-white" },
  dark: { fr: "Ténèbres", color: "bg-neutral-700 text-white" },
  steel: { fr: "Acier", color: "bg-slate-400 text-slate-950" },
  fairy: { fr: "Fée", color: "bg-pink-300 text-pink-950" },
};

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getPokemonCryUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
}

export const POKEMON_LIST: PokemonEntry[] = [
  {
    "id": 1,
    "gen": 1,
    "fr": "Bulbizarre",
    "en": "Bulbasaur",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 2,
    "gen": 1,
    "fr": "Herbizarre",
    "en": "Ivysaur",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 3,
    "gen": 1,
    "fr": "Florizarre",
    "en": "Venusaur",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 4,
    "gen": 1,
    "fr": "Salamèche",
    "en": "Charmander",
    "types": [
      "fire"
    ]
  },
  {
    "id": 5,
    "gen": 1,
    "fr": "Reptincel",
    "en": "Charmeleon",
    "types": [
      "fire"
    ]
  },
  {
    "id": 6,
    "gen": 1,
    "fr": "Dracaufeu",
    "en": "Charizard",
    "types": [
      "fire",
      "flying"
    ]
  },
  {
    "id": 7,
    "gen": 1,
    "fr": "Carapuce",
    "en": "Squirtle",
    "types": [
      "water"
    ]
  },
  {
    "id": 8,
    "gen": 1,
    "fr": "Carabaffe",
    "en": "Wartortle",
    "types": [
      "water"
    ]
  },
  {
    "id": 9,
    "gen": 1,
    "fr": "Tortank",
    "en": "Blastoise",
    "types": [
      "water"
    ]
  },
  {
    "id": 10,
    "gen": 1,
    "fr": "Chenipan",
    "en": "Caterpie",
    "types": [
      "bug"
    ]
  },
  {
    "id": 11,
    "gen": 1,
    "fr": "Chrysacier",
    "en": "Metapod",
    "types": [
      "bug"
    ]
  },
  {
    "id": 12,
    "gen": 1,
    "fr": "Papilusion",
    "en": "Butterfree",
    "types": [
      "bug",
      "flying"
    ]
  },
  {
    "id": 13,
    "gen": 1,
    "fr": "Aspicot",
    "en": "Weedle",
    "types": [
      "bug",
      "poison"
    ]
  },
  {
    "id": 14,
    "gen": 1,
    "fr": "Coconfort",
    "en": "Kakuna",
    "types": [
      "bug",
      "poison"
    ]
  },
  {
    "id": 15,
    "gen": 1,
    "fr": "Dardargnan",
    "en": "Beedrill",
    "types": [
      "bug",
      "poison"
    ]
  },
  {
    "id": 16,
    "gen": 1,
    "fr": "Roucool",
    "en": "Pidgey",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 17,
    "gen": 1,
    "fr": "Roucoups",
    "en": "Pidgeotto",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 18,
    "gen": 1,
    "fr": "Roucarnage",
    "en": "Pidgeot",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 19,
    "gen": 1,
    "fr": "Rattata",
    "en": "Rattata",
    "types": [
      "normal"
    ]
  },
  {
    "id": 20,
    "gen": 1,
    "fr": "Rattatac",
    "en": "Raticate",
    "types": [
      "normal"
    ]
  },
  {
    "id": 21,
    "gen": 1,
    "fr": "Piafabec",
    "en": "Spearow",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 22,
    "gen": 1,
    "fr": "Rapasdepic",
    "en": "Fearow",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 23,
    "gen": 1,
    "fr": "Abo",
    "en": "Ekans",
    "types": [
      "poison"
    ]
  },
  {
    "id": 24,
    "gen": 1,
    "fr": "Arbok",
    "en": "Arbok",
    "types": [
      "poison"
    ]
  },
  {
    "id": 25,
    "gen": 1,
    "fr": "Pikachu",
    "en": "Pikachu",
    "types": [
      "electric"
    ]
  },
  {
    "id": 26,
    "gen": 1,
    "fr": "Raichu",
    "en": "Raichu",
    "types": [
      "electric"
    ]
  },
  {
    "id": 27,
    "gen": 1,
    "fr": "Sabelette",
    "en": "Sandshrew",
    "types": [
      "ground"
    ]
  },
  {
    "id": 28,
    "gen": 1,
    "fr": "Sablaireau",
    "en": "Sandslash",
    "types": [
      "ground"
    ]
  },
  {
    "id": 29,
    "gen": 1,
    "fr": "Nidoran♀",
    "en": "Nidoran♀",
    "types": [
      "poison"
    ]
  },
  {
    "id": 30,
    "gen": 1,
    "fr": "Nidorina",
    "en": "Nidorina",
    "types": [
      "poison"
    ]
  },
  {
    "id": 31,
    "gen": 1,
    "fr": "Nidoqueen",
    "en": "Nidoqueen",
    "types": [
      "poison",
      "ground"
    ]
  },
  {
    "id": 32,
    "gen": 1,
    "fr": "Nidoran♂",
    "en": "Nidoran♂",
    "types": [
      "poison"
    ]
  },
  {
    "id": 33,
    "gen": 1,
    "fr": "Nidorino",
    "en": "Nidorino",
    "types": [
      "poison"
    ]
  },
  {
    "id": 34,
    "gen": 1,
    "fr": "Nidoking",
    "en": "Nidoking",
    "types": [
      "poison",
      "ground"
    ]
  },
  {
    "id": 35,
    "gen": 1,
    "fr": "Mélofée",
    "en": "Clefairy",
    "types": [
      "fairy"
    ]
  },
  {
    "id": 36,
    "gen": 1,
    "fr": "Mélodelfe",
    "en": "Clefable",
    "types": [
      "fairy"
    ]
  },
  {
    "id": 37,
    "gen": 1,
    "fr": "Goupix",
    "en": "Vulpix",
    "types": [
      "fire"
    ]
  },
  {
    "id": 38,
    "gen": 1,
    "fr": "Feunard",
    "en": "Ninetales",
    "types": [
      "fire"
    ]
  },
  {
    "id": 39,
    "gen": 1,
    "fr": "Rondoudou",
    "en": "Jigglypuff",
    "types": [
      "normal",
      "fairy"
    ]
  },
  {
    "id": 40,
    "gen": 1,
    "fr": "Grodoudou",
    "en": "Wigglytuff",
    "types": [
      "normal",
      "fairy"
    ]
  },
  {
    "id": 41,
    "gen": 1,
    "fr": "Nosferapti",
    "en": "Zubat",
    "types": [
      "poison",
      "flying"
    ]
  },
  {
    "id": 42,
    "gen": 1,
    "fr": "Nosferalto",
    "en": "Golbat",
    "types": [
      "poison",
      "flying"
    ]
  },
  {
    "id": 43,
    "gen": 1,
    "fr": "Mystherbe",
    "en": "Oddish",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 44,
    "gen": 1,
    "fr": "Ortide",
    "en": "Gloom",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 45,
    "gen": 1,
    "fr": "Rafflesia",
    "en": "Vileplume",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 46,
    "gen": 1,
    "fr": "Paras",
    "en": "Paras",
    "types": [
      "bug",
      "grass"
    ]
  },
  {
    "id": 47,
    "gen": 1,
    "fr": "Parasect",
    "en": "Parasect",
    "types": [
      "bug",
      "grass"
    ]
  },
  {
    "id": 48,
    "gen": 1,
    "fr": "Mimitoss",
    "en": "Venonat",
    "types": [
      "bug",
      "poison"
    ]
  },
  {
    "id": 49,
    "gen": 1,
    "fr": "Aéromite",
    "en": "Venomoth",
    "types": [
      "bug",
      "poison"
    ]
  },
  {
    "id": 50,
    "gen": 1,
    "fr": "Taupiqueur",
    "en": "Diglett",
    "types": [
      "ground"
    ]
  },
  {
    "id": 51,
    "gen": 1,
    "fr": "Triopikeur",
    "en": "Dugtrio",
    "types": [
      "ground"
    ]
  },
  {
    "id": 52,
    "gen": 1,
    "fr": "Miaouss",
    "en": "Meowth",
    "types": [
      "normal"
    ]
  },
  {
    "id": 53,
    "gen": 1,
    "fr": "Persian",
    "en": "Persian",
    "types": [
      "normal"
    ]
  },
  {
    "id": 54,
    "gen": 1,
    "fr": "Psykokwak",
    "en": "Psyduck",
    "types": [
      "water"
    ]
  },
  {
    "id": 55,
    "gen": 1,
    "fr": "Akwakwak",
    "en": "Golduck",
    "types": [
      "water"
    ]
  },
  {
    "id": 56,
    "gen": 1,
    "fr": "Férosinge",
    "en": "Mankey",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 57,
    "gen": 1,
    "fr": "Colossinge",
    "en": "Primeape",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 58,
    "gen": 1,
    "fr": "Caninos",
    "en": "Growlithe",
    "types": [
      "fire"
    ]
  },
  {
    "id": 59,
    "gen": 1,
    "fr": "Arcanin",
    "en": "Arcanine",
    "types": [
      "fire"
    ]
  },
  {
    "id": 60,
    "gen": 1,
    "fr": "Ptitard",
    "en": "Poliwag",
    "types": [
      "water"
    ]
  },
  {
    "id": 61,
    "gen": 1,
    "fr": "Têtarte",
    "en": "Poliwhirl",
    "types": [
      "water"
    ]
  },
  {
    "id": 62,
    "gen": 1,
    "fr": "Tartard",
    "en": "Poliwrath",
    "types": [
      "water",
      "fighting"
    ]
  },
  {
    "id": 63,
    "gen": 1,
    "fr": "Abra",
    "en": "Abra",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 64,
    "gen": 1,
    "fr": "Kadabra",
    "en": "Kadabra",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 65,
    "gen": 1,
    "fr": "Alakazam",
    "en": "Alakazam",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 66,
    "gen": 1,
    "fr": "Machoc",
    "en": "Machop",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 67,
    "gen": 1,
    "fr": "Machopeur",
    "en": "Machoke",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 68,
    "gen": 1,
    "fr": "Mackogneur",
    "en": "Machamp",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 69,
    "gen": 1,
    "fr": "Chétiflor",
    "en": "Bellsprout",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 70,
    "gen": 1,
    "fr": "Boustiflor",
    "en": "Weepinbell",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 71,
    "gen": 1,
    "fr": "Empiflor",
    "en": "Victreebel",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 72,
    "gen": 1,
    "fr": "Tentacool",
    "en": "Tentacool",
    "types": [
      "water",
      "poison"
    ]
  },
  {
    "id": 73,
    "gen": 1,
    "fr": "Tentacruel",
    "en": "Tentacruel",
    "types": [
      "water",
      "poison"
    ]
  },
  {
    "id": 74,
    "gen": 1,
    "fr": "Racaillou",
    "en": "Geodude",
    "types": [
      "rock",
      "ground"
    ]
  },
  {
    "id": 75,
    "gen": 1,
    "fr": "Gravalanch",
    "en": "Graveler",
    "types": [
      "rock",
      "ground"
    ]
  },
  {
    "id": 76,
    "gen": 1,
    "fr": "Grolem",
    "en": "Golem",
    "types": [
      "rock",
      "ground"
    ]
  },
  {
    "id": 77,
    "gen": 1,
    "fr": "Ponyta",
    "en": "Ponyta",
    "types": [
      "fire"
    ]
  },
  {
    "id": 78,
    "gen": 1,
    "fr": "Galopa",
    "en": "Rapidash",
    "types": [
      "fire"
    ]
  },
  {
    "id": 79,
    "gen": 1,
    "fr": "Ramoloss",
    "en": "Slowpoke",
    "types": [
      "water",
      "psychic"
    ]
  },
  {
    "id": 80,
    "gen": 1,
    "fr": "Flagadoss",
    "en": "Slowbro",
    "types": [
      "water",
      "psychic"
    ]
  },
  {
    "id": 81,
    "gen": 1,
    "fr": "Magnéti",
    "en": "Magnemite",
    "types": [
      "electric",
      "steel"
    ]
  },
  {
    "id": 82,
    "gen": 1,
    "fr": "Magnéton",
    "en": "Magneton",
    "types": [
      "electric",
      "steel"
    ]
  },
  {
    "id": 83,
    "gen": 1,
    "fr": "Canarticho",
    "en": "Farfetch’d",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 84,
    "gen": 1,
    "fr": "Doduo",
    "en": "Doduo",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 85,
    "gen": 1,
    "fr": "Dodrio",
    "en": "Dodrio",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 86,
    "gen": 1,
    "fr": "Otaria",
    "en": "Seel",
    "types": [
      "water"
    ]
  },
  {
    "id": 87,
    "gen": 1,
    "fr": "Lamantine",
    "en": "Dewgong",
    "types": [
      "water",
      "ice"
    ]
  },
  {
    "id": 88,
    "gen": 1,
    "fr": "Tadmorv",
    "en": "Grimer",
    "types": [
      "poison"
    ]
  },
  {
    "id": 89,
    "gen": 1,
    "fr": "Grotadmorv",
    "en": "Muk",
    "types": [
      "poison"
    ]
  },
  {
    "id": 90,
    "gen": 1,
    "fr": "Kokiyas",
    "en": "Shellder",
    "types": [
      "water"
    ]
  },
  {
    "id": 91,
    "gen": 1,
    "fr": "Crustabri",
    "en": "Cloyster",
    "types": [
      "water",
      "ice"
    ]
  },
  {
    "id": 92,
    "gen": 1,
    "fr": "Fantominus",
    "en": "Gastly",
    "types": [
      "ghost",
      "poison"
    ]
  },
  {
    "id": 93,
    "gen": 1,
    "fr": "Spectrum",
    "en": "Haunter",
    "types": [
      "ghost",
      "poison"
    ]
  },
  {
    "id": 94,
    "gen": 1,
    "fr": "Ectoplasma",
    "en": "Gengar",
    "types": [
      "ghost",
      "poison"
    ]
  },
  {
    "id": 95,
    "gen": 1,
    "fr": "Onix",
    "en": "Onix",
    "types": [
      "rock",
      "ground"
    ]
  },
  {
    "id": 96,
    "gen": 1,
    "fr": "Soporifik",
    "en": "Drowzee",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 97,
    "gen": 1,
    "fr": "Hypnomade",
    "en": "Hypno",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 98,
    "gen": 1,
    "fr": "Krabby",
    "en": "Krabby",
    "types": [
      "water"
    ]
  },
  {
    "id": 99,
    "gen": 1,
    "fr": "Krabboss",
    "en": "Kingler",
    "types": [
      "water"
    ]
  },
  {
    "id": 100,
    "gen": 1,
    "fr": "Voltorbe",
    "en": "Voltorb",
    "types": [
      "electric"
    ]
  },
  {
    "id": 101,
    "gen": 1,
    "fr": "Électrode",
    "en": "Electrode",
    "types": [
      "electric"
    ]
  },
  {
    "id": 102,
    "gen": 1,
    "fr": "Noeunoeuf",
    "en": "Exeggcute",
    "types": [
      "grass",
      "psychic"
    ]
  },
  {
    "id": 103,
    "gen": 1,
    "fr": "Noadkoko",
    "en": "Exeggutor",
    "types": [
      "grass",
      "psychic"
    ]
  },
  {
    "id": 104,
    "gen": 1,
    "fr": "Osselait",
    "en": "Cubone",
    "types": [
      "ground"
    ]
  },
  {
    "id": 105,
    "gen": 1,
    "fr": "Ossatueur",
    "en": "Marowak",
    "types": [
      "ground"
    ]
  },
  {
    "id": 106,
    "gen": 1,
    "fr": "Kicklee",
    "en": "Hitmonlee",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 107,
    "gen": 1,
    "fr": "Tygnon",
    "en": "Hitmonchan",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 108,
    "gen": 1,
    "fr": "Excelangue",
    "en": "Lickitung",
    "types": [
      "normal"
    ]
  },
  {
    "id": 109,
    "gen": 1,
    "fr": "Smogo",
    "en": "Koffing",
    "types": [
      "poison"
    ]
  },
  {
    "id": 110,
    "gen": 1,
    "fr": "Smogogo",
    "en": "Weezing",
    "types": [
      "poison"
    ]
  },
  {
    "id": 111,
    "gen": 1,
    "fr": "Rhinocorne",
    "en": "Rhyhorn",
    "types": [
      "ground",
      "rock"
    ]
  },
  {
    "id": 112,
    "gen": 1,
    "fr": "Rhinoféros",
    "en": "Rhydon",
    "types": [
      "ground",
      "rock"
    ]
  },
  {
    "id": 113,
    "gen": 1,
    "fr": "Leveinard",
    "en": "Chansey",
    "types": [
      "normal"
    ]
  },
  {
    "id": 114,
    "gen": 1,
    "fr": "Saquedeneu",
    "en": "Tangela",
    "types": [
      "grass"
    ]
  },
  {
    "id": 115,
    "gen": 1,
    "fr": "Kangourex",
    "en": "Kangaskhan",
    "types": [
      "normal"
    ]
  },
  {
    "id": 116,
    "gen": 1,
    "fr": "Hypotrempe",
    "en": "Horsea",
    "types": [
      "water"
    ]
  },
  {
    "id": 117,
    "gen": 1,
    "fr": "Hypocéan",
    "en": "Seadra",
    "types": [
      "water"
    ]
  },
  {
    "id": 118,
    "gen": 1,
    "fr": "Poissirène",
    "en": "Goldeen",
    "types": [
      "water"
    ]
  },
  {
    "id": 119,
    "gen": 1,
    "fr": "Poissoroy",
    "en": "Seaking",
    "types": [
      "water"
    ]
  },
  {
    "id": 120,
    "gen": 1,
    "fr": "Stari",
    "en": "Staryu",
    "types": [
      "water"
    ]
  },
  {
    "id": 121,
    "gen": 1,
    "fr": "Staross",
    "en": "Starmie",
    "types": [
      "water",
      "psychic"
    ]
  },
  {
    "id": 122,
    "gen": 1,
    "fr": "M. Mime",
    "en": "Mr. Mime",
    "types": [
      "psychic",
      "fairy"
    ]
  },
  {
    "id": 123,
    "gen": 1,
    "fr": "Insécateur",
    "en": "Scyther",
    "types": [
      "bug",
      "flying"
    ]
  },
  {
    "id": 124,
    "gen": 1,
    "fr": "Lippoutou",
    "en": "Jynx",
    "types": [
      "ice",
      "psychic"
    ]
  },
  {
    "id": 125,
    "gen": 1,
    "fr": "Élektek",
    "en": "Electabuzz",
    "types": [
      "electric"
    ]
  },
  {
    "id": 126,
    "gen": 1,
    "fr": "Magmar",
    "en": "Magmar",
    "types": [
      "fire"
    ]
  },
  {
    "id": 127,
    "gen": 1,
    "fr": "Scarabrute",
    "en": "Pinsir",
    "types": [
      "bug"
    ]
  },
  {
    "id": 128,
    "gen": 1,
    "fr": "Tauros",
    "en": "Tauros",
    "types": [
      "normal"
    ]
  },
  {
    "id": 129,
    "gen": 1,
    "fr": "Magicarpe",
    "en": "Magikarp",
    "types": [
      "water"
    ]
  },
  {
    "id": 130,
    "gen": 1,
    "fr": "Léviator",
    "en": "Gyarados",
    "types": [
      "water",
      "flying"
    ]
  },
  {
    "id": 131,
    "gen": 1,
    "fr": "Lokhlass",
    "en": "Lapras",
    "types": [
      "water",
      "ice"
    ]
  },
  {
    "id": 132,
    "gen": 1,
    "fr": "Métamorph",
    "en": "Ditto",
    "types": [
      "normal"
    ]
  },
  {
    "id": 133,
    "gen": 1,
    "fr": "Évoli",
    "en": "Eevee",
    "types": [
      "normal"
    ]
  },
  {
    "id": 134,
    "gen": 1,
    "fr": "Aquali",
    "en": "Vaporeon",
    "types": [
      "water"
    ]
  },
  {
    "id": 135,
    "gen": 1,
    "fr": "Voltali",
    "en": "Jolteon",
    "types": [
      "electric"
    ]
  },
  {
    "id": 136,
    "gen": 1,
    "fr": "Pyroli",
    "en": "Flareon",
    "types": [
      "fire"
    ]
  },
  {
    "id": 137,
    "gen": 1,
    "fr": "Porygon",
    "en": "Porygon",
    "types": [
      "normal"
    ]
  },
  {
    "id": 138,
    "gen": 1,
    "fr": "Amonita",
    "en": "Omanyte",
    "types": [
      "rock",
      "water"
    ]
  },
  {
    "id": 139,
    "gen": 1,
    "fr": "Amonistar",
    "en": "Omastar",
    "types": [
      "rock",
      "water"
    ]
  },
  {
    "id": 140,
    "gen": 1,
    "fr": "Kabuto",
    "en": "Kabuto",
    "types": [
      "rock",
      "water"
    ]
  },
  {
    "id": 141,
    "gen": 1,
    "fr": "Kabutops",
    "en": "Kabutops",
    "types": [
      "rock",
      "water"
    ]
  },
  {
    "id": 142,
    "gen": 1,
    "fr": "Ptéra",
    "en": "Aerodactyl",
    "types": [
      "rock",
      "flying"
    ]
  },
  {
    "id": 143,
    "gen": 1,
    "fr": "Ronflex",
    "en": "Snorlax",
    "types": [
      "normal"
    ]
  },
  {
    "id": 144,
    "gen": 1,
    "fr": "Artikodin",
    "en": "Articuno",
    "types": [
      "ice",
      "flying"
    ]
  },
  {
    "id": 145,
    "gen": 1,
    "fr": "Électhor",
    "en": "Zapdos",
    "types": [
      "electric",
      "flying"
    ]
  },
  {
    "id": 146,
    "gen": 1,
    "fr": "Sulfura",
    "en": "Moltres",
    "types": [
      "fire",
      "flying"
    ]
  },
  {
    "id": 147,
    "gen": 1,
    "fr": "Minidraco",
    "en": "Dratini",
    "types": [
      "dragon"
    ]
  },
  {
    "id": 148,
    "gen": 1,
    "fr": "Draco",
    "en": "Dragonair",
    "types": [
      "dragon"
    ]
  },
  {
    "id": 149,
    "gen": 1,
    "fr": "Dracolosse",
    "en": "Dragonite",
    "types": [
      "dragon",
      "flying"
    ]
  },
  {
    "id": 150,
    "gen": 1,
    "fr": "Mewtwo",
    "en": "Mewtwo",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 151,
    "gen": 1,
    "fr": "Mew",
    "en": "Mew",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 152,
    "gen": 2,
    "fr": "Germignon",
    "en": "Chikorita",
    "types": [
      "grass"
    ]
  },
  {
    "id": 153,
    "gen": 2,
    "fr": "Macronium",
    "en": "Bayleef",
    "types": [
      "grass"
    ]
  },
  {
    "id": 154,
    "gen": 2,
    "fr": "Méganium",
    "en": "Meganium",
    "types": [
      "grass"
    ]
  },
  {
    "id": 155,
    "gen": 2,
    "fr": "Héricendre",
    "en": "Cyndaquil",
    "types": [
      "fire"
    ]
  },
  {
    "id": 156,
    "gen": 2,
    "fr": "Feurisson",
    "en": "Quilava",
    "types": [
      "fire"
    ]
  },
  {
    "id": 157,
    "gen": 2,
    "fr": "Typhlosion",
    "en": "Typhlosion",
    "types": [
      "fire"
    ]
  },
  {
    "id": 158,
    "gen": 2,
    "fr": "Kaiminus",
    "en": "Totodile",
    "types": [
      "water"
    ]
  },
  {
    "id": 159,
    "gen": 2,
    "fr": "Crocrodil",
    "en": "Croconaw",
    "types": [
      "water"
    ]
  },
  {
    "id": 160,
    "gen": 2,
    "fr": "Aligatueur",
    "en": "Feraligatr",
    "types": [
      "water"
    ]
  },
  {
    "id": 161,
    "gen": 2,
    "fr": "Fouinette",
    "en": "Sentret",
    "types": [
      "normal"
    ]
  },
  {
    "id": 162,
    "gen": 2,
    "fr": "Fouinar",
    "en": "Furret",
    "types": [
      "normal"
    ]
  },
  {
    "id": 163,
    "gen": 2,
    "fr": "Hoothoot",
    "en": "Hoothoot",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 164,
    "gen": 2,
    "fr": "Noarfang",
    "en": "Noctowl",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 165,
    "gen": 2,
    "fr": "Coxy",
    "en": "Ledyba",
    "types": [
      "bug",
      "flying"
    ]
  },
  {
    "id": 166,
    "gen": 2,
    "fr": "Coxyclaque",
    "en": "Ledian",
    "types": [
      "bug",
      "flying"
    ]
  },
  {
    "id": 167,
    "gen": 2,
    "fr": "Mimigal",
    "en": "Spinarak",
    "types": [
      "bug",
      "poison"
    ]
  },
  {
    "id": 168,
    "gen": 2,
    "fr": "Migalos",
    "en": "Ariados",
    "types": [
      "bug",
      "poison"
    ]
  },
  {
    "id": 169,
    "gen": 2,
    "fr": "Nostenfer",
    "en": "Crobat",
    "types": [
      "poison",
      "flying"
    ]
  },
  {
    "id": 170,
    "gen": 2,
    "fr": "Loupio",
    "en": "Chinchou",
    "types": [
      "water",
      "electric"
    ]
  },
  {
    "id": 171,
    "gen": 2,
    "fr": "Lanturn",
    "en": "Lanturn",
    "types": [
      "water",
      "electric"
    ]
  },
  {
    "id": 172,
    "gen": 2,
    "fr": "Pichu",
    "en": "Pichu",
    "types": [
      "electric"
    ]
  },
  {
    "id": 173,
    "gen": 2,
    "fr": "Mélo",
    "en": "Cleffa",
    "types": [
      "fairy"
    ]
  },
  {
    "id": 174,
    "gen": 2,
    "fr": "Toudoudou",
    "en": "Igglybuff",
    "types": [
      "normal",
      "fairy"
    ]
  },
  {
    "id": 175,
    "gen": 2,
    "fr": "Togepi",
    "en": "Togepi",
    "types": [
      "fairy"
    ]
  },
  {
    "id": 176,
    "gen": 2,
    "fr": "Togetic",
    "en": "Togetic",
    "types": [
      "fairy",
      "flying"
    ]
  },
  {
    "id": 177,
    "gen": 2,
    "fr": "Natu",
    "en": "Natu",
    "types": [
      "psychic",
      "flying"
    ]
  },
  {
    "id": 178,
    "gen": 2,
    "fr": "Xatu",
    "en": "Xatu",
    "types": [
      "psychic",
      "flying"
    ]
  },
  {
    "id": 179,
    "gen": 2,
    "fr": "Wattouat",
    "en": "Mareep",
    "types": [
      "electric"
    ]
  },
  {
    "id": 180,
    "gen": 2,
    "fr": "Lainergie",
    "en": "Flaaffy",
    "types": [
      "electric"
    ]
  },
  {
    "id": 181,
    "gen": 2,
    "fr": "Pharamp",
    "en": "Ampharos",
    "types": [
      "electric"
    ]
  },
  {
    "id": 182,
    "gen": 2,
    "fr": "Joliflor",
    "en": "Bellossom",
    "types": [
      "grass"
    ]
  },
  {
    "id": 183,
    "gen": 2,
    "fr": "Marill",
    "en": "Marill",
    "types": [
      "water",
      "fairy"
    ]
  },
  {
    "id": 184,
    "gen": 2,
    "fr": "Azumarill",
    "en": "Azumarill",
    "types": [
      "water",
      "fairy"
    ]
  },
  {
    "id": 185,
    "gen": 2,
    "fr": "Simularbre",
    "en": "Sudowoodo",
    "types": [
      "rock"
    ]
  },
  {
    "id": 186,
    "gen": 2,
    "fr": "Tarpaud",
    "en": "Politoed",
    "types": [
      "water"
    ]
  },
  {
    "id": 187,
    "gen": 2,
    "fr": "Granivol",
    "en": "Hoppip",
    "types": [
      "grass",
      "flying"
    ]
  },
  {
    "id": 188,
    "gen": 2,
    "fr": "Floravol",
    "en": "Skiploom",
    "types": [
      "grass",
      "flying"
    ]
  },
  {
    "id": 189,
    "gen": 2,
    "fr": "Cotovol",
    "en": "Jumpluff",
    "types": [
      "grass",
      "flying"
    ]
  },
  {
    "id": 190,
    "gen": 2,
    "fr": "Capumain",
    "en": "Aipom",
    "types": [
      "normal"
    ]
  },
  {
    "id": 191,
    "gen": 2,
    "fr": "Tournegrin",
    "en": "Sunkern",
    "types": [
      "grass"
    ]
  },
  {
    "id": 192,
    "gen": 2,
    "fr": "Héliatronc",
    "en": "Sunflora",
    "types": [
      "grass"
    ]
  },
  {
    "id": 193,
    "gen": 2,
    "fr": "Yanma",
    "en": "Yanma",
    "types": [
      "bug",
      "flying"
    ]
  },
  {
    "id": 194,
    "gen": 2,
    "fr": "Axoloto",
    "en": "Wooper",
    "types": [
      "water",
      "ground"
    ]
  },
  {
    "id": 195,
    "gen": 2,
    "fr": "Maraiste",
    "en": "Quagsire",
    "types": [
      "water",
      "ground"
    ]
  },
  {
    "id": 196,
    "gen": 2,
    "fr": "Mentali",
    "en": "Espeon",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 197,
    "gen": 2,
    "fr": "Noctali",
    "en": "Umbreon",
    "types": [
      "dark"
    ]
  },
  {
    "id": 198,
    "gen": 2,
    "fr": "Cornèbre",
    "en": "Murkrow",
    "types": [
      "dark",
      "flying"
    ]
  },
  {
    "id": 199,
    "gen": 2,
    "fr": "Roigada",
    "en": "Slowking",
    "types": [
      "water",
      "psychic"
    ]
  },
  {
    "id": 200,
    "gen": 2,
    "fr": "Feuforêve",
    "en": "Misdreavus",
    "types": [
      "ghost"
    ]
  },
  {
    "id": 201,
    "gen": 2,
    "fr": "Zarbi",
    "en": "Unown",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 202,
    "gen": 2,
    "fr": "Qulbutoké",
    "en": "Wobbuffet",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 203,
    "gen": 2,
    "fr": "Girafarig",
    "en": "Girafarig",
    "types": [
      "normal",
      "psychic"
    ]
  },
  {
    "id": 204,
    "gen": 2,
    "fr": "Pomdepik",
    "en": "Pineco",
    "types": [
      "bug"
    ]
  },
  {
    "id": 205,
    "gen": 2,
    "fr": "Foretress",
    "en": "Forretress",
    "types": [
      "bug",
      "steel"
    ]
  },
  {
    "id": 206,
    "gen": 2,
    "fr": "Insolourdo",
    "en": "Dunsparce",
    "types": [
      "normal"
    ]
  },
  {
    "id": 207,
    "gen": 2,
    "fr": "Scorplane",
    "en": "Gligar",
    "types": [
      "ground",
      "flying"
    ]
  },
  {
    "id": 208,
    "gen": 2,
    "fr": "Steelix",
    "en": "Steelix",
    "types": [
      "steel",
      "ground"
    ]
  },
  {
    "id": 209,
    "gen": 2,
    "fr": "Snubbull",
    "en": "Snubbull",
    "types": [
      "fairy"
    ]
  },
  {
    "id": 210,
    "gen": 2,
    "fr": "Granbull",
    "en": "Granbull",
    "types": [
      "fairy"
    ]
  },
  {
    "id": 211,
    "gen": 2,
    "fr": "Qwilfish",
    "en": "Qwilfish",
    "types": [
      "water",
      "poison"
    ]
  },
  {
    "id": 212,
    "gen": 2,
    "fr": "Cizayox",
    "en": "Scizor",
    "types": [
      "bug",
      "steel"
    ]
  },
  {
    "id": 213,
    "gen": 2,
    "fr": "Caratroc",
    "en": "Shuckle",
    "types": [
      "bug",
      "rock"
    ]
  },
  {
    "id": 214,
    "gen": 2,
    "fr": "Scarhino",
    "en": "Heracross",
    "types": [
      "bug",
      "fighting"
    ]
  },
  {
    "id": 215,
    "gen": 2,
    "fr": "Farfuret",
    "en": "Sneasel",
    "types": [
      "dark",
      "ice"
    ]
  },
  {
    "id": 216,
    "gen": 2,
    "fr": "Teddiursa",
    "en": "Teddiursa",
    "types": [
      "normal"
    ]
  },
  {
    "id": 217,
    "gen": 2,
    "fr": "Ursaring",
    "en": "Ursaring",
    "types": [
      "normal"
    ]
  },
  {
    "id": 218,
    "gen": 2,
    "fr": "Limagma",
    "en": "Slugma",
    "types": [
      "fire"
    ]
  },
  {
    "id": 219,
    "gen": 2,
    "fr": "Volcaropod",
    "en": "Magcargo",
    "types": [
      "fire",
      "rock"
    ]
  },
  {
    "id": 220,
    "gen": 2,
    "fr": "Marcacrin",
    "en": "Swinub",
    "types": [
      "ice",
      "ground"
    ]
  },
  {
    "id": 221,
    "gen": 2,
    "fr": "Cochignon",
    "en": "Piloswine",
    "types": [
      "ice",
      "ground"
    ]
  },
  {
    "id": 222,
    "gen": 2,
    "fr": "Corayon",
    "en": "Corsola",
    "types": [
      "water",
      "rock"
    ]
  },
  {
    "id": 223,
    "gen": 2,
    "fr": "Rémoraid",
    "en": "Remoraid",
    "types": [
      "water"
    ]
  },
  {
    "id": 224,
    "gen": 2,
    "fr": "Octillery",
    "en": "Octillery",
    "types": [
      "water"
    ]
  },
  {
    "id": 225,
    "gen": 2,
    "fr": "Cadoizo",
    "en": "Delibird",
    "types": [
      "ice",
      "flying"
    ]
  },
  {
    "id": 226,
    "gen": 2,
    "fr": "Démanta",
    "en": "Mantine",
    "types": [
      "water",
      "flying"
    ]
  },
  {
    "id": 227,
    "gen": 2,
    "fr": "Airmure",
    "en": "Skarmory",
    "types": [
      "steel",
      "flying"
    ]
  },
  {
    "id": 228,
    "gen": 2,
    "fr": "Malosse",
    "en": "Houndour",
    "types": [
      "dark",
      "fire"
    ]
  },
  {
    "id": 229,
    "gen": 2,
    "fr": "Démolosse",
    "en": "Houndoom",
    "types": [
      "dark",
      "fire"
    ]
  },
  {
    "id": 230,
    "gen": 2,
    "fr": "Hyporoi",
    "en": "Kingdra",
    "types": [
      "water",
      "dragon"
    ]
  },
  {
    "id": 231,
    "gen": 2,
    "fr": "Phanpy",
    "en": "Phanpy",
    "types": [
      "ground"
    ]
  },
  {
    "id": 232,
    "gen": 2,
    "fr": "Donphan",
    "en": "Donphan",
    "types": [
      "ground"
    ]
  },
  {
    "id": 233,
    "gen": 2,
    "fr": "Porygon2",
    "en": "Porygon2",
    "types": [
      "normal"
    ]
  },
  {
    "id": 234,
    "gen": 2,
    "fr": "Cerfrousse",
    "en": "Stantler",
    "types": [
      "normal"
    ]
  },
  {
    "id": 235,
    "gen": 2,
    "fr": "Queulorior",
    "en": "Smeargle",
    "types": [
      "normal"
    ]
  },
  {
    "id": 236,
    "gen": 2,
    "fr": "Debugant",
    "en": "Tyrogue",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 237,
    "gen": 2,
    "fr": "Kapoera",
    "en": "Hitmontop",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 238,
    "gen": 2,
    "fr": "Lippouti",
    "en": "Smoochum",
    "types": [
      "ice",
      "psychic"
    ]
  },
  {
    "id": 239,
    "gen": 2,
    "fr": "Élekid",
    "en": "Elekid",
    "types": [
      "electric"
    ]
  },
  {
    "id": 240,
    "gen": 2,
    "fr": "Magby",
    "en": "Magby",
    "types": [
      "fire"
    ]
  },
  {
    "id": 241,
    "gen": 2,
    "fr": "Écrémeuh",
    "en": "Miltank",
    "types": [
      "normal"
    ]
  },
  {
    "id": 242,
    "gen": 2,
    "fr": "Leuphorie",
    "en": "Blissey",
    "types": [
      "normal"
    ]
  },
  {
    "id": 243,
    "gen": 2,
    "fr": "Raikou",
    "en": "Raikou",
    "types": [
      "electric"
    ]
  },
  {
    "id": 244,
    "gen": 2,
    "fr": "Entei",
    "en": "Entei",
    "types": [
      "fire"
    ]
  },
  {
    "id": 245,
    "gen": 2,
    "fr": "Suicune",
    "en": "Suicune",
    "types": [
      "water"
    ]
  },
  {
    "id": 246,
    "gen": 2,
    "fr": "Embrylex",
    "en": "Larvitar",
    "types": [
      "rock",
      "ground"
    ]
  },
  {
    "id": 247,
    "gen": 2,
    "fr": "Ymphect",
    "en": "Pupitar",
    "types": [
      "rock",
      "ground"
    ]
  },
  {
    "id": 248,
    "gen": 2,
    "fr": "Tyranocif",
    "en": "Tyranitar",
    "types": [
      "rock",
      "dark"
    ]
  },
  {
    "id": 249,
    "gen": 2,
    "fr": "Lugia",
    "en": "Lugia",
    "types": [
      "psychic",
      "flying"
    ]
  },
  {
    "id": 250,
    "gen": 2,
    "fr": "Ho-Oh",
    "en": "Ho-Oh",
    "types": [
      "fire",
      "flying"
    ]
  },
  {
    "id": 251,
    "gen": 2,
    "fr": "Celebi",
    "en": "Celebi",
    "types": [
      "psychic",
      "grass"
    ]
  },
  {
    "id": 252,
    "gen": 3,
    "fr": "Arcko",
    "en": "Treecko",
    "types": [
      "grass"
    ]
  },
  {
    "id": 253,
    "gen": 3,
    "fr": "Massko",
    "en": "Grovyle",
    "types": [
      "grass"
    ]
  },
  {
    "id": 254,
    "gen": 3,
    "fr": "Jungko",
    "en": "Sceptile",
    "types": [
      "grass"
    ]
  },
  {
    "id": 255,
    "gen": 3,
    "fr": "Poussifeu",
    "en": "Torchic",
    "types": [
      "fire"
    ]
  },
  {
    "id": 256,
    "gen": 3,
    "fr": "Galifeu",
    "en": "Combusken",
    "types": [
      "fire",
      "fighting"
    ]
  },
  {
    "id": 257,
    "gen": 3,
    "fr": "Braségali",
    "en": "Blaziken",
    "types": [
      "fire",
      "fighting"
    ]
  },
  {
    "id": 258,
    "gen": 3,
    "fr": "Gobou",
    "en": "Mudkip",
    "types": [
      "water"
    ]
  },
  {
    "id": 259,
    "gen": 3,
    "fr": "Flobio",
    "en": "Marshtomp",
    "types": [
      "water",
      "ground"
    ]
  },
  {
    "id": 260,
    "gen": 3,
    "fr": "Laggron",
    "en": "Swampert",
    "types": [
      "water",
      "ground"
    ]
  },
  {
    "id": 261,
    "gen": 3,
    "fr": "Medhyèna",
    "en": "Poochyena",
    "types": [
      "dark"
    ]
  },
  {
    "id": 262,
    "gen": 3,
    "fr": "Grahyèna",
    "en": "Mightyena",
    "types": [
      "dark"
    ]
  },
  {
    "id": 263,
    "gen": 3,
    "fr": "Zigzaton",
    "en": "Zigzagoon",
    "types": [
      "normal"
    ]
  },
  {
    "id": 264,
    "gen": 3,
    "fr": "Linéon",
    "en": "Linoone",
    "types": [
      "normal"
    ]
  },
  {
    "id": 265,
    "gen": 3,
    "fr": "Chenipotte",
    "en": "Wurmple",
    "types": [
      "bug"
    ]
  },
  {
    "id": 266,
    "gen": 3,
    "fr": "Armulys",
    "en": "Silcoon",
    "types": [
      "bug"
    ]
  },
  {
    "id": 267,
    "gen": 3,
    "fr": "Charmillon",
    "en": "Beautifly",
    "types": [
      "bug",
      "flying"
    ]
  },
  {
    "id": 268,
    "gen": 3,
    "fr": "Blindalys",
    "en": "Cascoon",
    "types": [
      "bug"
    ]
  },
  {
    "id": 269,
    "gen": 3,
    "fr": "Papinox",
    "en": "Dustox",
    "types": [
      "bug",
      "poison"
    ]
  },
  {
    "id": 270,
    "gen": 3,
    "fr": "Nénupiot",
    "en": "Lotad",
    "types": [
      "water",
      "grass"
    ]
  },
  {
    "id": 271,
    "gen": 3,
    "fr": "Lombre",
    "en": "Lombre",
    "types": [
      "water",
      "grass"
    ]
  },
  {
    "id": 272,
    "gen": 3,
    "fr": "Ludicolo",
    "en": "Ludicolo",
    "types": [
      "water",
      "grass"
    ]
  },
  {
    "id": 273,
    "gen": 3,
    "fr": "Grainipiot",
    "en": "Seedot",
    "types": [
      "grass"
    ]
  },
  {
    "id": 274,
    "gen": 3,
    "fr": "Pifeuil",
    "en": "Nuzleaf",
    "types": [
      "grass",
      "dark"
    ]
  },
  {
    "id": 275,
    "gen": 3,
    "fr": "Tengalice",
    "en": "Shiftry",
    "types": [
      "grass",
      "dark"
    ]
  },
  {
    "id": 276,
    "gen": 3,
    "fr": "Nirondelle",
    "en": "Taillow",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 277,
    "gen": 3,
    "fr": "Hélédelle",
    "en": "Swellow",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 278,
    "gen": 3,
    "fr": "Goélise",
    "en": "Wingull",
    "types": [
      "water",
      "flying"
    ]
  },
  {
    "id": 279,
    "gen": 3,
    "fr": "Bekipan",
    "en": "Pelipper",
    "types": [
      "water",
      "flying"
    ]
  },
  {
    "id": 280,
    "gen": 3,
    "fr": "Tarsal",
    "en": "Ralts",
    "types": [
      "psychic",
      "fairy"
    ]
  },
  {
    "id": 281,
    "gen": 3,
    "fr": "Kirlia",
    "en": "Kirlia",
    "types": [
      "psychic",
      "fairy"
    ]
  },
  {
    "id": 282,
    "gen": 3,
    "fr": "Gardevoir",
    "en": "Gardevoir",
    "types": [
      "psychic",
      "fairy"
    ]
  },
  {
    "id": 283,
    "gen": 3,
    "fr": "Arakdo",
    "en": "Surskit",
    "types": [
      "bug",
      "water"
    ]
  },
  {
    "id": 284,
    "gen": 3,
    "fr": "Maskadra",
    "en": "Masquerain",
    "types": [
      "bug",
      "flying"
    ]
  },
  {
    "id": 285,
    "gen": 3,
    "fr": "Balignon",
    "en": "Shroomish",
    "types": [
      "grass"
    ]
  },
  {
    "id": 286,
    "gen": 3,
    "fr": "Chapignon",
    "en": "Breloom",
    "types": [
      "grass",
      "fighting"
    ]
  },
  {
    "id": 287,
    "gen": 3,
    "fr": "Parecool",
    "en": "Slakoth",
    "types": [
      "normal"
    ]
  },
  {
    "id": 288,
    "gen": 3,
    "fr": "Vigoroth",
    "en": "Vigoroth",
    "types": [
      "normal"
    ]
  },
  {
    "id": 289,
    "gen": 3,
    "fr": "Monaflèmit",
    "en": "Slaking",
    "types": [
      "normal"
    ]
  },
  {
    "id": 290,
    "gen": 3,
    "fr": "Ningale",
    "en": "Nincada",
    "types": [
      "bug",
      "ground"
    ]
  },
  {
    "id": 291,
    "gen": 3,
    "fr": "Ninjask",
    "en": "Ninjask",
    "types": [
      "bug",
      "flying"
    ]
  },
  {
    "id": 292,
    "gen": 3,
    "fr": "Munja",
    "en": "Shedinja",
    "types": [
      "bug",
      "ghost"
    ]
  },
  {
    "id": 293,
    "gen": 3,
    "fr": "Chuchmur",
    "en": "Whismur",
    "types": [
      "normal"
    ]
  },
  {
    "id": 294,
    "gen": 3,
    "fr": "Ramboum",
    "en": "Loudred",
    "types": [
      "normal"
    ]
  },
  {
    "id": 295,
    "gen": 3,
    "fr": "Brouhabam",
    "en": "Exploud",
    "types": [
      "normal"
    ]
  },
  {
    "id": 296,
    "gen": 3,
    "fr": "Makuhita",
    "en": "Makuhita",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 297,
    "gen": 3,
    "fr": "Hariyama",
    "en": "Hariyama",
    "types": [
      "fighting"
    ]
  },
  {
    "id": 298,
    "gen": 3,
    "fr": "Azurill",
    "en": "Azurill",
    "types": [
      "normal",
      "fairy"
    ]
  },
  {
    "id": 299,
    "gen": 3,
    "fr": "Tarinor",
    "en": "Nosepass",
    "types": [
      "rock"
    ]
  },
  {
    "id": 300,
    "gen": 3,
    "fr": "Skitty",
    "en": "Skitty",
    "types": [
      "normal"
    ]
  },
  {
    "id": 301,
    "gen": 3,
    "fr": "Delcatty",
    "en": "Delcatty",
    "types": [
      "normal"
    ]
  },
  {
    "id": 302,
    "gen": 3,
    "fr": "Ténéfix",
    "en": "Sableye",
    "types": [
      "dark",
      "ghost"
    ]
  },
  {
    "id": 303,
    "gen": 3,
    "fr": "Mysdibule",
    "en": "Mawile",
    "types": [
      "steel",
      "fairy"
    ]
  },
  {
    "id": 304,
    "gen": 3,
    "fr": "Galekid",
    "en": "Aron",
    "types": [
      "steel",
      "rock"
    ]
  },
  {
    "id": 305,
    "gen": 3,
    "fr": "Galegon",
    "en": "Lairon",
    "types": [
      "steel",
      "rock"
    ]
  },
  {
    "id": 306,
    "gen": 3,
    "fr": "Galeking",
    "en": "Aggron",
    "types": [
      "steel",
      "rock"
    ]
  },
  {
    "id": 307,
    "gen": 3,
    "fr": "Méditikka",
    "en": "Meditite",
    "types": [
      "fighting",
      "psychic"
    ]
  },
  {
    "id": 308,
    "gen": 3,
    "fr": "Charmina",
    "en": "Medicham",
    "types": [
      "fighting",
      "psychic"
    ]
  },
  {
    "id": 309,
    "gen": 3,
    "fr": "Dynavolt",
    "en": "Electrike",
    "types": [
      "electric"
    ]
  },
  {
    "id": 310,
    "gen": 3,
    "fr": "Élecsprint",
    "en": "Manectric",
    "types": [
      "electric"
    ]
  },
  {
    "id": 311,
    "gen": 3,
    "fr": "Posipi",
    "en": "Plusle",
    "types": [
      "electric"
    ]
  },
  {
    "id": 312,
    "gen": 3,
    "fr": "Négapi",
    "en": "Minun",
    "types": [
      "electric"
    ]
  },
  {
    "id": 313,
    "gen": 3,
    "fr": "Muciole",
    "en": "Volbeat",
    "types": [
      "bug"
    ]
  },
  {
    "id": 314,
    "gen": 3,
    "fr": "Lumivole",
    "en": "Illumise",
    "types": [
      "bug"
    ]
  },
  {
    "id": 315,
    "gen": 3,
    "fr": "Rosélia",
    "en": "Roselia",
    "types": [
      "grass",
      "poison"
    ]
  },
  {
    "id": 316,
    "gen": 3,
    "fr": "Gloupti",
    "en": "Gulpin",
    "types": [
      "poison"
    ]
  },
  {
    "id": 317,
    "gen": 3,
    "fr": "Avaltout",
    "en": "Swalot",
    "types": [
      "poison"
    ]
  },
  {
    "id": 318,
    "gen": 3,
    "fr": "Carvanha",
    "en": "Carvanha",
    "types": [
      "water",
      "dark"
    ]
  },
  {
    "id": 319,
    "gen": 3,
    "fr": "Sharpedo",
    "en": "Sharpedo",
    "types": [
      "water",
      "dark"
    ]
  },
  {
    "id": 320,
    "gen": 3,
    "fr": "Wailmer",
    "en": "Wailmer",
    "types": [
      "water"
    ]
  },
  {
    "id": 321,
    "gen": 3,
    "fr": "Wailord",
    "en": "Wailord",
    "types": [
      "water"
    ]
  },
  {
    "id": 322,
    "gen": 3,
    "fr": "Chamallot",
    "en": "Numel",
    "types": [
      "fire",
      "ground"
    ]
  },
  {
    "id": 323,
    "gen": 3,
    "fr": "Camérupt",
    "en": "Camerupt",
    "types": [
      "fire",
      "ground"
    ]
  },
  {
    "id": 324,
    "gen": 3,
    "fr": "Chartor",
    "en": "Torkoal",
    "types": [
      "fire"
    ]
  },
  {
    "id": 325,
    "gen": 3,
    "fr": "Spoink",
    "en": "Spoink",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 326,
    "gen": 3,
    "fr": "Groret",
    "en": "Grumpig",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 327,
    "gen": 3,
    "fr": "Spinda",
    "en": "Spinda",
    "types": [
      "normal"
    ]
  },
  {
    "id": 328,
    "gen": 3,
    "fr": "Kraknoix",
    "en": "Trapinch",
    "types": [
      "ground"
    ]
  },
  {
    "id": 329,
    "gen": 3,
    "fr": "Vibraninf",
    "en": "Vibrava",
    "types": [
      "ground",
      "dragon"
    ]
  },
  {
    "id": 330,
    "gen": 3,
    "fr": "Libégon",
    "en": "Flygon",
    "types": [
      "ground",
      "dragon"
    ]
  },
  {
    "id": 331,
    "gen": 3,
    "fr": "Cacnea",
    "en": "Cacnea",
    "types": [
      "grass"
    ]
  },
  {
    "id": 332,
    "gen": 3,
    "fr": "Cacturne",
    "en": "Cacturne",
    "types": [
      "grass",
      "dark"
    ]
  },
  {
    "id": 333,
    "gen": 3,
    "fr": "Tylton",
    "en": "Swablu",
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "id": 334,
    "gen": 3,
    "fr": "Altaria",
    "en": "Altaria",
    "types": [
      "dragon",
      "flying"
    ]
  },
  {
    "id": 335,
    "gen": 3,
    "fr": "Mangriff",
    "en": "Zangoose",
    "types": [
      "normal"
    ]
  },
  {
    "id": 336,
    "gen": 3,
    "fr": "Séviper",
    "en": "Seviper",
    "types": [
      "poison"
    ]
  },
  {
    "id": 337,
    "gen": 3,
    "fr": "Séléroc",
    "en": "Lunatone",
    "types": [
      "rock",
      "psychic"
    ]
  },
  {
    "id": 338,
    "gen": 3,
    "fr": "Solaroc",
    "en": "Solrock",
    "types": [
      "rock",
      "psychic"
    ]
  },
  {
    "id": 339,
    "gen": 3,
    "fr": "Barloche",
    "en": "Barboach",
    "types": [
      "water",
      "ground"
    ]
  },
  {
    "id": 340,
    "gen": 3,
    "fr": "Barbicha",
    "en": "Whiscash",
    "types": [
      "water",
      "ground"
    ]
  },
  {
    "id": 341,
    "gen": 3,
    "fr": "Écrapince",
    "en": "Corphish",
    "types": [
      "water"
    ]
  },
  {
    "id": 342,
    "gen": 3,
    "fr": "Colhomard",
    "en": "Crawdaunt",
    "types": [
      "water",
      "dark"
    ]
  },
  {
    "id": 343,
    "gen": 3,
    "fr": "Balbuto",
    "en": "Baltoy",
    "types": [
      "ground",
      "psychic"
    ]
  },
  {
    "id": 344,
    "gen": 3,
    "fr": "Kaorine",
    "en": "Claydol",
    "types": [
      "ground",
      "psychic"
    ]
  },
  {
    "id": 345,
    "gen": 3,
    "fr": "Lilia",
    "en": "Lileep",
    "types": [
      "rock",
      "grass"
    ]
  },
  {
    "id": 346,
    "gen": 3,
    "fr": "Vacilys",
    "en": "Cradily",
    "types": [
      "rock",
      "grass"
    ]
  },
  {
    "id": 347,
    "gen": 3,
    "fr": "Anorith",
    "en": "Anorith",
    "types": [
      "rock",
      "bug"
    ]
  },
  {
    "id": 348,
    "gen": 3,
    "fr": "Armaldo",
    "en": "Armaldo",
    "types": [
      "rock",
      "bug"
    ]
  },
  {
    "id": 349,
    "gen": 3,
    "fr": "Barpau",
    "en": "Feebas",
    "types": [
      "water"
    ]
  },
  {
    "id": 350,
    "gen": 3,
    "fr": "Milobellus",
    "en": "Milotic",
    "types": [
      "water"
    ]
  },
  {
    "id": 351,
    "gen": 3,
    "fr": "Morphéo",
    "en": "Castform",
    "types": [
      "normal"
    ]
  },
  {
    "id": 352,
    "gen": 3,
    "fr": "Kecleon",
    "en": "Kecleon",
    "types": [
      "normal"
    ]
  },
  {
    "id": 353,
    "gen": 3,
    "fr": "Polichombr",
    "en": "Shuppet",
    "types": [
      "ghost"
    ]
  },
  {
    "id": 354,
    "gen": 3,
    "fr": "Branette",
    "en": "Banette",
    "types": [
      "ghost"
    ]
  },
  {
    "id": 355,
    "gen": 3,
    "fr": "Skelénox",
    "en": "Duskull",
    "types": [
      "ghost"
    ]
  },
  {
    "id": 356,
    "gen": 3,
    "fr": "Téraclope",
    "en": "Dusclops",
    "types": [
      "ghost"
    ]
  },
  {
    "id": 357,
    "gen": 3,
    "fr": "Tropius",
    "en": "Tropius",
    "types": [
      "grass",
      "flying"
    ]
  },
  {
    "id": 358,
    "gen": 3,
    "fr": "Éoko",
    "en": "Chimecho",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 359,
    "gen": 3,
    "fr": "Absol",
    "en": "Absol",
    "types": [
      "dark"
    ]
  },
  {
    "id": 360,
    "gen": 3,
    "fr": "Okéoké",
    "en": "Wynaut",
    "types": [
      "psychic"
    ]
  },
  {
    "id": 361,
    "gen": 3,
    "fr": "Stalgamin",
    "en": "Snorunt",
    "types": [
      "ice"
    ]
  },
  {
    "id": 362,
    "gen": 3,
    "fr": "Oniglali",
    "en": "Glalie",
    "types": [
      "ice"
    ]
  },
  {
    "id": 363,
    "gen": 3,
    "fr": "Obalie",
    "en": "Spheal",
    "types": [
      "ice",
      "water"
    ]
  },
  {
    "id": 364,
    "gen": 3,
    "fr": "Phogleur",
    "en": "Sealeo",
    "types": [
      "ice",
      "water"
    ]
  },
  {
    "id": 365,
    "gen": 3,
    "fr": "Kaimorse",
    "en": "Walrein",
    "types": [
      "ice",
      "water"
    ]
  },
  {
    "id": 366,
    "gen": 3,
    "fr": "Coquiperl",
    "en": "Clamperl",
    "types": [
      "water"
    ]
  },
  {
    "id": 367,
    "gen": 3,
    "fr": "Serpang",
    "en": "Huntail",
    "types": [
      "water"
    ]
  },
  {
    "id": 368,
    "gen": 3,
    "fr": "Rosabyss",
    "en": "Gorebyss",
    "types": [
      "water"
    ]
  },
  {
    "id": 369,
    "gen": 3,
    "fr": "Relicanth",
    "en": "Relicanth",
    "types": [
      "water",
      "rock"
    ]
  },
  {
    "id": 370,
    "gen": 3,
    "fr": "Lovdisc",
    "en": "Luvdisc",
    "types": [
      "water"
    ]
  },
  {
    "id": 371,
    "gen": 3,
    "fr": "Draby",
    "en": "Bagon",
    "types": [
      "dragon"
    ]
  },
  {
    "id": 372,
    "gen": 3,
    "fr": "Drackhaus",
    "en": "Shelgon",
    "types": [
      "dragon"
    ]
  },
  {
    "id": 373,
    "gen": 3,
    "fr": "Drattak",
    "en": "Salamence",
    "types": [
      "dragon",
      "flying"
    ]
  },
  {
    "id": 374,
    "gen": 3,
    "fr": "Terhal",
    "en": "Beldum",
    "types": [
      "steel",
      "psychic"
    ]
  },
  {
    "id": 375,
    "gen": 3,
    "fr": "Métang",
    "en": "Metang",
    "types": [
      "steel",
      "psychic"
    ]
  },
  {
    "id": 376,
    "gen": 3,
    "fr": "Métalosse",
    "en": "Metagross",
    "types": [
      "steel",
      "psychic"
    ]
  },
  {
    "id": 377,
    "gen": 3,
    "fr": "Regirock",
    "en": "Regirock",
    "types": [
      "rock"
    ]
  },
  {
    "id": 378,
    "gen": 3,
    "fr": "Regice",
    "en": "Regice",
    "types": [
      "ice"
    ]
  },
  {
    "id": 379,
    "gen": 3,
    "fr": "Registeel",
    "en": "Registeel",
    "types": [
      "steel"
    ]
  },
  {
    "id": 380,
    "gen": 3,
    "fr": "Latias",
    "en": "Latias",
    "types": [
      "dragon",
      "psychic"
    ]
  },
  {
    "id": 381,
    "gen": 3,
    "fr": "Latios",
    "en": "Latios",
    "types": [
      "dragon",
      "psychic"
    ]
  },
  {
    "id": 382,
    "gen": 3,
    "fr": "Kyogre",
    "en": "Kyogre",
    "types": [
      "water"
    ]
  },
  {
    "id": 383,
    "gen": 3,
    "fr": "Groudon",
    "en": "Groudon",
    "types": [
      "ground"
    ]
  },
  {
    "id": 384,
    "gen": 3,
    "fr": "Rayquaza",
    "en": "Rayquaza",
    "types": [
      "dragon",
      "flying"
    ]
  },
  {
    "id": 385,
    "gen": 3,
    "fr": "Jirachi",
    "en": "Jirachi",
    "types": [
      "steel",
      "psychic"
    ]
  },
  {
    "id": 386,
    "gen": 3,
    "fr": "Deoxys",
    "en": "Deoxys",
    "types": [
      "psychic"
    ]
  }
];
