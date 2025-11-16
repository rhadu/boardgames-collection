import { type Game, GameCondition } from "./types"

// Sample data - replace with your actual collection
export const GAMES: Game[] = [
  // Oathsworn - Base Game + Secret Box
  {
    id: "251661",
    title: "Oathsworn: Into the Deepwood – Base Game + Secret Box",
    year: 2020,
    language: "English",
    players: "1–4",
    playtime: "30-90",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Cooperative", "Campaign", "Miniatures", "Dark fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/251661/oathsworn-into-the-deepwood",
    kickstarterLink:
      "https://www.kickstarter.com/projects/shadowborne-games/oathsworn-into-the-deepwood",
    images: [
      "https://cf.geekdo-images.com/dezQ4YjF03lZVxTdI-UJYw__imagepage/img/k9KlpcnG4DPLQy8BrrrfHvBOiG4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6863204.jpg",
    ],
    highlights: [
      "High-budget campaign game with rich components and story",
      "Secret Box version adds collector extras",
    ],
    notes: "",
  },
  // This War of Mine: The Board Game
  {
    id: "188920", // BGG ID
    title: "This War of Mine: The Board Game",
    year: 2017, // published 2017. :contentReference[oaicite:1]{index=1}
    language: "English",
    players: "1–6", // 1 to 6 players. :contentReference[oaicite:2]{index=2}
    playtime: "45–120 minutes", // advertised time. :contentReference[oaicite:3]{index=3}
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0, // your selling price (fill in)
    currency: "EUR", // set your currency
    tags: ["Cooperative", "Survival", "Story-driven", "Modern war", "Campaign"], // based on theme & mechanics
    isKickstarter: true, // this game had a Kickstarter launch. :contentReference[oaicite:4]{index=4}
    retailPrice: 69.99, // MSRP $69.99 USD. :contentReference[oaicite:5]{index=5}
    bggLink:
      "https://boardgamegeek.com/boardgame/188920/this-war-of-mine-the-board-game",
    kickstarterLink:
      "https://www.kickstarter.com/projects/awakenrealms/this-war-of-mine-the-board-game", // from KS campaign
    images: [
      "https://cf.geekdo-images.com/gQOQW7p1RWHzY54Lrs-_pA__imagepage/img/oqafX3UqrqNZz5215t4FEuIQm0E=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3315915.jpg",
    ],
    highlights: [
      "Co-op survival of civilians in a war-torn city",
      "Strong narrative / scenario book with ~2000 events", // from description. :contentReference[oaicite:6]{index=6}
      "Solitaire-friendly to full group 6-player",
    ],
    notes: "Based on the award-winning video game; intense theme and choices.",
  },
  // Nemesis
  {
    id: "167355", // BGG ID
    title: "Nemesis",
    year: 2018, // published 2018. :contentReference[oaicite:8]{index=8}
    language: "English",
    players: "1–5", // 1 to 5 players. :contentReference[oaicite:9]{index=9}
    playtime: "90–180 minutes", // typical time. :contentReference[oaicite:10]{index=10}
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "EUR",
    tags: [
      "Semi-cooperative",
      "Sci-fi horror",
      "Betrayal",
      "Asymmetrical",
      "Survival",
    ],
    isKickstarter: true, // It launched via Kickstarter originally. :contentReference[oaicite:11]{index=11}
    retailPrice: 159.99, // MSRP ~$159.99 USD. :contentReference[oaicite:12]{index=12}
    bggLink: "https://boardgamegeek.com/boardgame/167355/nemesis",
    kickstarterLink:
      "https://www.kickstarter.com/projects/awakenrealms/nemesis-board-game",
    images: [
      "https://cf.geekdo-images.com/4KSmlm59w0GwLIlgDnJDAQ__imagepage/img/Zb31zpGVlnDGPeHj75Xkye1KDNE=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8211747.png",
    ],
    highlights: [
      "Crew wakes on alien-infested spaceship; hidden objectives create tension",
      "Great component quality, heavy theme and miniatures",
      "Solo mode + full group mode; high replayability",
    ],
    notes: "Semi-cooperative with strong betrayal potential; not light.",
  },
  // The Lord of the Rings: Journeys in Middle-Earth
  {
    id: "269385",
    title: "The Lord of the Rings: Journeys in Middle-Earth",
    year: 2019,
    language: "English",
    players: "1–5",
    playtime: "60–120 minutes",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 250, // your selling price (fill in)
    currency: "RON",
    tags: ["Cooperative", "Fantasy", "App-driven", "Campaign", "Middle-earth"],
    isKickstarter: false,
    retailPrice: undefined, // you might research the MSRP if desired
    bggLink:
      "https://boardgamegeek.com/boardgame/269385/the-lord-of-the-rings-journeys-in-middle-earth",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/1XA2-niwTBa0HEB7hOz3Dw__imagepage/img/dniEqT1lS-wh6hmCijPi3PQCwWs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4530974.jpg",
    ],
    highlights: [
      "App-driven narrative campaign in Tolkien’s Middle-earth",
      "Supports solo up to 5 players in cooperative mode",
      "Strong immersion with miniatures, scenarios & branching story",
    ],
    notes:
      "Highly rated adventure board game where players explore locales, fight foes, and make story-shaping decisions.",
  },
  // Aeon Trespass: Odyssey
  {
    id: "1121",
    title: "Aeon Trespass: Odyssey",
    year: 2019,
    language: "English",
    players: "1-4",
    playtime: "200+ hours (campaign)",
    condition: GameCondition.FACTORY_SEALED,
    price: 0,
    currency: "N/A",
    tags: [
      "Cooperative",
      "Campaign",
      "Boss battler",
      "Miniatures",
      "Sci-fi",
      "Mythology",
    ],
    isKickstarter: true,
    bggLink: "https://boardgamegeek.com/boardgame/242705/aeon-trespass-odyssey",
    kickstarterLink:
      "https://www.kickstarter.com/projects/intotheunknown/aeon-trespass-odyssey-second-printing-plus-all-new-content",
    images: [
      "https://cf.geekdo-images.com/l5vgu2EcX8qm7_p9zhROuQ__imagepage/img/J2UX3OwZDoYo8uNrIdRKWQPvZFc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4874391.jpg",
    ],
    highlights: [
      "Epic 1-4 player cooperative campaign board game.",
      "Features adventures, base building, and tactical battles against giant monsters (Primordials).",
      "Over 200 hours of unique content, including more than 1500 cards and a novel's worth of narrative.",
      "Merges ideas from video games like XCOM, Dark Souls, Monster Hunter, and JRPGs.",
      "Highly detailed miniatures, some almost 6 inches tall.",
      "Multiple successful Kickstarter campaigns, including a 'Second Printing Plus All-New Content' campaign that raised €2,865,907.",
    ],
    notes:
      "Considered a very heavy and complicated game, often compared to Kingdom Death Monster. Designed for multi-session play with extensive campaign progression and story. Features multiple cycles and expansions, with the core game offering three cycles.",
  },

  // Catan (aka Settlers of Catan)
  {
    id: "13",
    title: "Catan",
    year: 1995,
    language: "English",
    players: "3–4",
    playtime: "60–120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Trading",
      "Resource management",
      "Route building",
      "Dice",
      "Hex grid",
    ],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/13/catan",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/0XODRpReiZBFUffEcqT5-Q__imagepage/img/enC7UTvCAnb6j1Uazvh0OBQjvxw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic9156909.png",
    ],
    highlights: [
      "Classic gateway euro about trading and building",
      "Interactive table talk and blocking",
      "Endlessly replayable modular map",
    ],
    notes: "Deschis, stare bună.",
  },
  // Terraforming Mars (+ Turmoil expansion)
  {
    id: "167791",
    title: "Terraforming Mars (+ Turmoil expansion)",
    year: 2016,
    language: "English",
    players: "1–5",
    playtime: "120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Engine building",
      "Science",
      "Card drafting",
      "Tableau",
      "Economic",
    ],
    isKickstarter: true, // Turmoil expansion had a KS
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/167791/terraforming-mars",
    kickstarterLink:
      "https://www.kickstarter.com/projects/strongholdgames/terraforming-mars-turmoil",
    images: [
      "https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__imagepage/img/FS1RE8Ue6nk1pNbPI3l-OSapQGc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3536616.jpg",
    ],
    highlights: [
      "Build engines with synergistic project cards",
      "Solo or up to 5 players; huge replayability",
      "Turmoil adds political arena & global events",
    ],
    notes: "Include expansion Turmoil — 10, sigilat.",
  },
  // Maximum Apocalypse: Legendary Edition
  {
    id: "275564",
    title: "Maximum Apocalypse: Legendary Edition",
    year: 2020,
    language: "English",
    players: "1–6",
    playtime: "45–90",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Cooperative", "Survival", "Scenario", "Modular map", "Campaign"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/275564/maximum-apocalypse-legendary-edition",
    kickstarterLink:
      "https://www.kickstarter.com/projects/mikegnade/maximum-apocalypse-legendary-edition-with-miniatur",
    images: [
      "https://cf.geekdo-images.com/VbKia1bW_oUcSfrX4HeGKA__imagepage/img/to9beka9cPwga2gBrBFufVrvDPE=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5152233.png",
    ],
    highlights: [
      "Co-op roguelike missions in multiple apocalypses",
      "Legendary box bundles tons of content",
      "Solo-friendly with scalable difficulty",
    ],
    notes: "9.5, cu extensii.",
  },
  // Destinies
  {
    id: "285192",
    title: "Destinies",
    year: 2021,
    language: "English",
    players: "1–3",
    playtime: "120–150",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["App-driven", "Story-driven", "Adventure", "Fantasy", "Competitive"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/285192/destinies",
    kickstarterLink:
      "https://www.kickstarter.com/projects/lucky-duck-games/time-of-legends-destinies",
    images: [
      "https://cf.geekdo-images.com/oaD1ZQ3yGj6lacLdtqgdnQ__imagepage/img/fk6BConHqwDOSHeKbOavfrFs7Fo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5558118.png",
    ],
    highlights: [
      "App-assisted narrative quests in a dark medieval world",
      "No GM needed; competitive race to fulfill destinies",
      "Multiple scenarios with meaningful choices",
    ],
    notes: "10, sigilat.",
  },
  // Sleeping Gods (+ Tides of Ruin expansion)
  {
    id: "255984",
    title: "Sleeping Gods (+ Tides of Ruin)",
    year: 2021,
    language: "English",
    players: "1–4",
    playtime: "60–120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Cooperative",
      "Open world",
      "Campaign",
      "Story-driven",
      "Exploration",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/255984/sleeping-gods",
    kickstarterLink:
      "https://www.kickstarter.com/projects/953146955/sleeping-gods",
    images: [
      "https://cf.geekdo-images.com/Zdt8l4oTBpFICsMyNof7Jg__imagepage/img/ToI3nXdkLu4Dy3J8o-yAWrdN4i8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5975244.png",
    ],
    highlights: [
      "Massive open-world campaign with branching stories",
      "Seamless save system for multi-session play",
      "Tides of Ruin adds a second atlas & more content",
    ],
    notes: "9.5, desigilat dar nejucat. Include expansion Tides of Ruin.",
  },
  // Altar Quest and expansions
  {
    id: "273703",
    title: "Altar Quest and expansions",
    year: 2020,
    language: "English",
    players: "1–4",
    playtime: "90–180",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Dungeon crawl", "Card driven", "Modular", "Campaign"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/273703/altar-quest",
    kickstarterLink:
      "https://www.kickstarter.com/projects/blacklistgames/altar-quest",
    images: [
      "https://cf.geekdo-images.com/lFwe59N5i-m2lhGA48vizw__imagepage/img/6gVyN2cktEJoT0CfTVtRYwp4Xu0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5871397.png",
    ],
    highlights: [
      "Modern card-driven dungeon crawl",
      "Modular scenarios, high replayability",
      "Includes expansions for more content",
    ],
    notes: "",
  },
  // Tainted Grail + Age of Legends & Last Knight campaigns + Echoes of the Past
  {
    id: "264220",
    title:
      "Tainted Grail + Age of Legends & Last Knight campaigns + Echoes of the Past",
    year: 2019,
    language: "English",
    players: "1–4",
    playtime: "120–180",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Narrative",
      "Cooperative",
      "Dark fantasy",
      "Campaign",
      "App-driven",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/264220/tainted-grail-the-fall-of-avalon",
    kickstarterLink:
      "https://www.kickstarter.com/projects/awakenrealms/tainted-grail-the-fall-of-avalon",
    images: [
      "https://cf.geekdo-images.com/aAwBzPzta4joKfFZt05hCw__imagepage/img/VTB2LcmXNC4XPpCOVfkfa4qO0cY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4385726.jpg",
    ],
    highlights: [
      "Epic cooperative campaign in a dark fantasy Arthurian world",
      "Multiple story campaigns included",
      "Strong narrative and high immersion",
    ],
    notes: "",
  },
  // Etherfields (sigilat) + extensie sigilată
  {
    id: "280794",
    title: "Etherfields + extensie sigilată",
    year: 2020,
    language: "English",
    players: "1–4",
    playtime: "90–150",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Narrative", "Dream world", "Exploration", "Cooperative"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/280794/etherfields",
    kickstarterLink:
      "https://www.kickstarter.com/projects/awakenrealms/etherfields-board-game",
    images: [
      "https://cf.geekdo-images.com/K1yVmbbWCsQuiWk-7x-V-Q__imagepage/img/m1-zglSNfjIgV6pqXAhb9ThePEI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7455627.png",
    ],
    highlights: [
      "Narrative-heavy “dream crawler” cooperative adventure",
      "Sandbox exploration in a surreal world",
      "Includes sealed expansion for extra content",
    ],
    notes: "",
  },
  // Bătălia cuplurilor
  {
    id: "191077",
    title: "Bătălia cuplurilor",
    year: 2018,
    language: "Romanian",
    players: "2-8",
    playtime: "45-60 minutes",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Party", "Adult", "Couples", "Social"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/191077/gierki-malzenskie",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/7pDLiSwMtClYGY7zPTYuxg__imagepage/img/cLyEEC8bkwIniDYQ-9G5nHNdAJ0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2825868.png",
    ],
    highlights: [
      "Fun board game for couples testing how well they know each other",
      "Two game modes: just couple vs couple or group of couples",
    ],
    notes: "",
  },
  // Black Rose Wars
  {
    id: "239942",
    title: "Black Rose Wars",
    year: 2018,
    language: "English",
    players: "2-4",
    playtime: "90+",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Deck-building", "Fantasy", "Combat", "Strategy", "Miniatures"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/239942/black-rose-wars",
    kickstarterLink:
      "https://www.kickstarter.com/projects/lmstudio/black-rose-wars",
    images: [
      "https://cf.geekdo-images.com/Nam2TVpVSvHIuAsbocL9cw__imagepage/img/4hjyTRE6DUV2v4bAsB8H1jK48B4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6892325.jpg",
    ],
    highlights: [
      "Competitive fantasy deck-building game of mages battling for supremacy in the Lodge",
      "Tactical miniatures + spells + sabotage mechanics",
    ],
    notes: "",
  },
  // The 7th Continent
  {
    id: "180263",
    title: "The 7th Continent",
    year: 2017,
    language: "English",
    players: "1-4",
    playtime: "1000+ minutes (campaign)",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Exploration",
      "Choose-your-own-adventure",
      "Cooperative",
      "Survival",
      "Campaign",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/180263/the-7th-continent",
    kickstarterLink:
      "https://www.kickstarter.com/projects/seriouspoulp/the-7th-continent-what-goes-up-must-come-down",
    images: [
      "https://cf.geekdo-images.com/OYne8uBCHv5oEgRfpOrV0A__imagepage/img/v6rKjbb4X_1AKBRehocJ3_v-9kQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2648303.jpg",
    ],
    highlights: [
      "Massive solo/co-op exploration game where you lift curses in a mysterious land",
      "Save system and huge replay campaign",
    ],
    notes: "",
  },
  // Mage Knight
  {
    id: "96848",
    title: "Mage Knight",
    year: 2011,
    language: "English",
    players: "1-4",
    playtime: "60-240 minutes",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Strategy",
      "Deck-building",
      "Fantasy",
      "Exploration",
      "Solo friendly",
    ],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/96848/mage-knight-board-game",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/DUO2hz9AlLOH8p9ED-lCWg__imagepage/img/ROAuGFhL9abZxxzvXUCJJuvtkOk=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1083380.jpg",
    ],
    highlights: [
      "Epic solo/coop strategy game praised for depth and replayability",
      "Combines deck-building, map exploration and role-playing elements",
    ],
    notes: "",
  },
  // Middara Act 1
  {
    id: "218148",
    title: "Middara: Unintentional Malum – Act 1",
    year: 2020,
    language: "English",
    players: "1–4",
    playtime: "90–240",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Dungeon crawl", "Campaign", "Cooperative", "Narrative", "Fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/169427/middara-unintentional-malum-act-1",
    kickstarterLink:
      "https://www.kickstarter.com/projects/succubuspublishing/middara-unintentional-malum-the-complete-trilogy",
    images: [
      "https://cf.geekdo-images.com/hRuD1y5BxdNpssgBqamS0A__imagepage/img/3YIXet5DK8WN9Wur_YwMY0jqsCQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4595897.jpg",
    ],
    highlights: [
      "Massive cooperative campaign with anime-inspired art",
      "Hundreds of hours of branching story content",
      "High-quality miniatures and tactical battles",
    ],
    notes: "",
  },
  // Black Orchestra
  {
    id: "193042",
    title: "Black Orchestra",
    year: 2016,
    language: "English",
    players: "1–5",
    playtime: "90–120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Cooperative", "Historical", "Strategy", "WWII", "Deduction"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/156858/black-orchestra",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/mvE22ut60-N5qzhE9guINw__imagepage/img/LoV1rtyGXoje25DlEb8QNAMfmTc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6973676.png",
    ],
    highlights: [
      "Play as conspirators plotting to assassinate Hitler",
      "Tense cooperative decision-making and risk management",
      "Solo or group play with historical flavor",
    ],
    notes: "",
  },

  // Spirit Island
  {
    id: "162886",
    title: "Spirit Island",
    year: 2017,
    language: "English",
    players: "1–4",
    playtime: "90–120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Cooperative",
      "Area control",
      "Asymmetric powers",
      "Strategy",
      "Environmental",
    ],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/162886/spirit-island",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/kjCm4ZvPjIZxS-mYgSPy1g__imagepage/img/py7KzNjXVOuVesFZB7LwqCbvALY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7013651.jpg",
    ],
    highlights: [
      "Play elemental spirits defending their island from colonizers",
      "Deep cooperative engine-building and synergy",
      "Challenging solo and multiplayer modes",
    ],
    notes: "",
  },

  // The Big Score
  {
    id: "231257",
    title: "The Big Score",
    year: 2018,
    language: "English",
    players: "1–6",
    playtime: "30–60",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Heist", "Drafting", "Push your luck", "Party", "Simultaneous play"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/226445/the-big-score",
    kickstarterLink:
      "https://www.kickstarter.com/projects/vanrydergames/the-big-score",
    images: [
      "https://cf.geekdo-images.com/CrEG1gRqArALQXxUgt91lg__imagepage/img/N2Lh5hBzhMQZLORWPXFX8eXomUo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3929782.jpg",
    ],
    highlights: [
      "Clever mix of drafting, cooperation, and betrayal",
      "Heist-themed party strategy game",
      "Quick setup and satisfying risk-reward balance",
    ],
    notes: "",
  },

  // Anachrony
  {
    id: "278292",
    title: "Anachrony",
    year: 2017,
    language: "English",
    players: "1–4",
    playtime: "30–120",
    condition: GameCondition.FACTORY_SEALED,
    price: 0,
    currency: "RON",
    tags: [
      "Worker placement",
      "Time travel",
      "Sci-fi",
      "Resource management",
      "Engine building",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/278292/anachrony-infinity-box",
    kickstarterLink:
      "https://www.kickstarter.com/projects/mindclash/anachrony-fractures-of-time-expansion-and-infinity",
    images: [
      "https://cf.geekdo-images.com/Tuy9MAvPx4TRGV1vvT6wxQ__imagepagezoom/img/LSablpr36KWc0VDWxSBgYqUPtcg=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic5960363.png",
      "https://cf.geekdo-images.com/Tuy9MAvPx4TRGV1vvT6wxQ__imagepage/img/_wL2RSJvMPIerOryz9ph68zTuyw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5960363.png",
    ],
    highlights: [
      "Time-travel-themed worker placement with deep strategy",
      "Borrow resources from the future—repay them later",
      "Multiple paths to victory and strong solo mode",
    ],
    notes: "",
  },
  // Zombicide 2nd Edition
  {
    id: "268864",
    title: "Zombicide: 2nd Edition",
    year: 2021,
    language: "English",
    players: "1–6",
    playtime: "60–120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Cooperative",
      "Zombies",
      "Miniatures",
      "Dice rolling",
      "Scenario based",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/286751/zombicide-2nd-edition",
    kickstarterLink:
      "https://www.kickstarter.com/projects/cmon/zombicide-2nd-edition",
    images: [
      "https://cf.geekdo-images.com/81AiTz4hp4TlnzeCMqQMAw__imagepage/img/RuczD90TmVP6o38-MhJPr45vHGU=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6091316.jpg",
    ],
    highlights: [
      "Revamped version of the classic co-op zombie survival game",
      "Streamlined rules and new missions",
      "Highly modular with tons of expansions",
    ],
    notes: "",
  },

  // The Isofarian Guard
  {
    id: "298753",
    title: "The Isofarian Guard",
    year: 2024,
    language: "English",
    players: "1–2",
    playtime: "60–120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Bag building", "Narrative", "Adventure", "Cooperative", "Fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/281526/the-isofarian-guard",
    kickstarterLink:
      "https://www.kickstarter.com/projects/skykingdomgames/the-isofarian-guard",
    images: [
      "https://cf.geekdo-images.com/nrUQztbbeNWfMIrf9ZQ8bQ__imagepage/img/q_p0SFXP0PDCFVgvbvu1SDmtBLw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6428537.jpg",
    ],
    highlights: [
      "Story-driven adventure with bag-building combat",
      "Deep narrative campaign for 1–2 players",
      "Voice-acted companion app enhances immersion",
    ],
    notes: "",
  },

  // Legends Untold: The Weeping Caves
  {
    id: "233840",
    title: "Legends Untold: The Weeping Caves Novice Set",
    year: 2018,
    language: "English",
    players: "1–4",
    playtime: "30–120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Dungeon crawl", "Adventure", "Modular", "Card game", "Cooperative"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/198832/legends-untold-weeping-caves-novice-set",
    kickstarterLink:
      "https://www.kickstarter.com/projects/legendsuntold/legends-untold-as-deep-as-an-rpg-as-fast-as-a-card",
    images: [
      "https://cf.geekdo-images.com/U8xMKqgssP2TRB4Hoxo5Kg__imagepage/img/Lk72KY68pBANEEIjIzHrPmECOxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4175300.jpg",
    ],
    highlights: [
      "Compact, modular dungeon crawl with deep mechanics",
      "Quick setup, high replayability",
      "Cooperative play for 1–4 adventurers",
    ],
    notes: "",
  },

  // Legends Untold: The Great Sewers
  {
    id: "233841",
    title: "Legends Untold: The Great Sewers Novice Set",
    year: 2018,
    language: "English",
    players: "1–4",
    playtime: "30–120",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Dungeon crawl", "Adventure", "Modular", "Cooperative", "Fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/216179/legends-untold-the-great-sewers-novice-set",
    kickstarterLink:
      "https://www.kickstarter.com/projects/legendsuntold/legends-untold-as-deep-as-an-rpg-as-fast-as-a-card",
    images: [
      "https://cf.geekdo-images.com/7YzQXGT7fwe1y6C_yxnkyw__imagepage/img/TKmcrKmsEZbQP35dVuP5TbpqEpA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4178316.jpg",
    ],
    highlights: [
      "Second standalone set in the Legends Untold series",
      "Features new heroes, monsters, and locations",
      "Fully compatible with The Weeping Caves set",
    ],
    notes: "",
  },

  // Maquis
  {
    id: "154736",
    title: "Maquis",
    year: 2013,
    language: "English",
    players: "1",
    playtime: "20–30",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Solo", "Worker placement", "WWII", "Covert ops"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/148729/maquis",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/wgHvFfiPzMJUFrP4OLKtwQ__imagepage/img/_hUqxMm_x66gY5ZniEG6p_Qd1QM=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5009864.jpg",
    ],
    highlights: [
      "Solo worker placement set in Nazi-occupied France",
      "Quick setup, tense missions",
      "Compact and easy to learn",
    ],
    notes: "",
  },

  // Fire in the Library
  {
    id: "247615",
    title: "Fire in the Library",
    year: 2019,
    language: "English",
    players: "1–6",
    playtime: "15–30",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Push your luck", "Set collection", "Family"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/240744/fire-in-the-library",
    kickstarterLink:
      "https://www.kickstarter.com/projects/weirdgiraffegames/fire-in-the-library-board-game",
    images: [
      "https://cf.geekdo-images.com/SdhKN7EefPC86-qHsIX7Mw__imagepage/img/RSlZBKTeeBV2-FBZ9YkHKdFv4ck=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3995178.jpg",
    ],
    highlights: [
      "Push-your-luck game about saving books from a burning library",
      "Fast turns and simultaneous play",
      "Great family and filler game",
    ],
    notes: "",
  },

  // Facade Games: Deadwood 1876
  {
    id: "245197",
    title: "Deadwood 1876",
    year: 2018,
    language: "English",
    players: "2–9",
    playtime: "20–40",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Bluffing", "Hidden teams", "Social deduction", "Western", "Dice"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/245197/deadwood-1876",
    kickstarterLink:
      "https://www.kickstarter.com/projects/travishancock/deadwood-1876-a-safe-robbing-game-of-teamwork-and",
    images: [
      "https://cf.geekdo-images.com/dClkAV6XTDv9Guu7J0ObXA__imagepage/img/kNLvipAey03P95-VP5v07lff5VY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4252510.jpg",
    ],
    highlights: [
      "Hidden-team bluffing and dice duels in the Wild West",
      "Gorgeous book-box design from Facade Games",
      "Fast, chaotic, perfect for groups",
    ],
    notes: "",
  },

  // Facade Games: Tortuga 1667
  {
    id: "218530",
    title: "Tortuga 1667",
    year: 2017,
    language: "English",
    players: "2–9",
    playtime: "20–40",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Hidden roles", "Pirates", "Social deduction", "Team play", "Party"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/218530/tortuga-1667",
    kickstarterLink:
      "https://www.kickstarter.com/projects/travis/tortuga-1667-a-pirate-game-of-mutiny-plunder-and-d",
    images: [
      "https://cf.geekdo-images.com/rT6zVN1zRbEMHok5V_zoGQ__imagepage/img/8EemiWUV9cS7CXBMWAPBtNneugo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3747083.png",
    ],
    highlights: [
      "Pirate-themed social deduction with secret alliances",
      "Compact cloth map and beautiful components",
      "Great party game from Facade Games",
    ],
    notes: "",
  },

  // Facade Games: Salem 1692
  {
    id: "175549",
    title: "Salem 1692",
    year: 2017,
    language: "English",
    players: "4–12",
    playtime: "20–40",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Bluffing", "Hidden roles", "Witch hunt", "Deduction", "Party"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/175549/salem-1692",
    kickstarterLink:
      "https://www.kickstarter.com/projects/travishancock/salem-a-strategic-card-game-of-deception-for-4-12",
    images: [
      "https://cf.geekdo-images.com/xUurReSy2Amlx4hGj1fPvQ__imagepage/img/JeVnUUuC07NrrLtz-XG8tW2VxKU=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4204062.jpg",
    ],
    highlights: [
      "Hidden-role witch-hunt game for large groups",
      "Beautiful period-style cards in a book-box case",
      "Part of Facade Games’ Dark Cities series",
    ],
    notes: "",
  },

  // Black Sonata + The Fair Youth Expansion
  {
    id: "231218",
    title: "Black Sonata + The Fair Youth Expansion",
    year: 2017,
    language: "English",
    players: "1",
    playtime: "30–45",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Solo", "Deduction", "Hidden movement", "Puzzle", "Thematic"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/231218/black-sonata",
    kickstarterLink:
      "https://www.kickstarter.com/projects/sideroomgames/black-sonata-the-fair-youth-expansion",
    images: [
      "https://cf.geekdo-images.com/UgE_mVxqPMMNKOvXWqC71g__imagepage/img/ZQTmGgOtHd0wkdLcUqIaoFumf_4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3657983.jpg",
    ],
    highlights: [
      "Unique solo hidden-movement and deduction hybrid",
      "Ingenious card system—no app needed",
      "Expansion adds new modes and challenges",
    ],
    notes: "",
  },

  // Exploding Kittens + Hidden Compartment
  {
    id: "172225",
    title: "Exploding Kittens + Hidden Compartment Box",
    year: 2015,
    language: "English",
    players: "2–5",
    playtime: "15–20",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Party", "Card game", "Humor", "Family", "Light"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/172225/exploding-kittens",
    kickstarterLink:
      "https://www.kickstarter.com/projects/elanlee/exploding-kittens",
    images: [
      "https://cf.geekdo-images.com/N8bL53-pRU7zaXDTrEaYrw__imagepage/img/qdivOjtkEd8Jma35bdI3mOwaoZg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2691976.png",
    ],
    highlights: [
      "Massively popular quick card game of exploding cats",
      "Hidden Compartment box edition adds secret storage",
      "Fun for all ages and quick to teach",
    ],
    notes: "",
  },

  // Set a Watch Deluxe Edition
  {
    id: "228855",
    title: "Set a Watch: Deluxe Edition",
    year: 2019,
    language: "English",
    players: "1–4",
    playtime: "45–75",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Cooperative", "Puzzle", "Fantasy", "Dice", "Adventure"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/228855/set-a-watch",
    kickstarterLink:
      "https://www.kickstarter.com/projects/rockmanorgames/set-a-watch",
    images: [
      "https://cf.geekdo-images.com/E_-9WT4_6-kABS796Q-piA__imagepagezoom/img/9NEQGDK_xq8pDXEw4SXVyNRp1BY=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic4162054.png",
    ],
    highlights: [
      "Cooperative puzzle and dice management adventure",
      "Players guard a camp against waves of monsters",
      "Deluxe Edition includes upgraded components and inserts",
    ],
    notes: "",
  },
  // Villagers
  {
    id: "241724",
    title: "Villagers",
    year: 2020,
    language: "English",
    players: "1–5",
    playtime: "20–40",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Card drafting", "Engine building", "Tableau", "Medium"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/241724/villagers",
    kickstarterLink:
      "https://www.kickstarter.com/projects/sinisterfish/villagers-card-drafting-and-village-building-for-1",
    images: [
      "https://cf.geekdo-images.com/rMMSvnXuBPZSihIaVtVT-A__imagepage/img/LgLkMAZ8deMPvBhphEVrhj0xkW4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4996383.png",
    ],
    highlights: [
      "Rebuild a village after a plague through engine-building and drafting",
      "Solo mode and 1-5 players support",
      "Beautiful artwork and easy to teach",
    ],
    notes: "",
  },

  // Vampire Chapters - Banu Hakim Expansion
  {
    id: "277025",
    title: "Vampire: The Masquerade – CHAPTERS + Banu Hakim Expansion",
    year: 2023,
    language: "English",
    players: "1–4",
    playtime: "30–60",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Narrative", "Story-driven", "Card game", "Campaign"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/277025/vampire-the-masquerade-chapters",
    kickstarterLink:
      "https://www.kickstarter.com/projects/flyosgames/vampire-the-masquerade-chapters",
    images: [
      "https://cf.geekdo-images.com/heM6HlMcOUSvUENmEjKEug__imagepage/img/Mgzpi2-5BG_QOm2wxU05DGj2Lxw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7656159.jpg",
    ],
    highlights: [
      "Story-driven board game in the Vampire: The Masquerade universe",
      "Expansion Banu Hakim adds playable clan and new campaign elements",
    ],
    notes: "",
  },

  // Joking Hazard
  {
    id: "193621",
    title: "Joking Hazard",
    year: 2016,
    language: "English",
    players: "3–10",
    playtime: "15–20",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Party", "Card game", "Humor", "Family"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/193621/joking-hazard",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/ohrUtQ0FGHPSFxfSX2Ltmg__imagepage/img/TgNFfWis7aS_Es1d4zaV2x8v33g=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6411897.png",
    ],
    highlights: [
      "Create hilarious 3-panel comics with cards themed around Cyanide & Happiness",
      "Fast party game with lots of laughs and replayability",
      "Expandable via many expansions",
    ],
    notes: "",
  },

  // Age of Civilization
  {
    id: "264647",
    title: "Age of Civilization",
    year: 2019,
    language: "English",
    players: "1–4",
    playtime: "20–30",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Civilization", "Light strategy", "Engine building", "Pocket"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/264647/age-of-civilization",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/YgJq8cRIW8RbjW_lHVnZAg__imagepage/img/NuT97ZV-TZb7fTJHuNiUwWLmTyo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4403459.jpg",
    ],
    highlights: [
      "Compact civilization game where you lead up to three civilizations",
      "Quick play time around 20-30 minutes",
      "Great stepping stone into heavier strategy games",
    ],
    notes: "",
  },
  // Tiny Epic Galaxies
  {
    id: "163967",
    title: "Tiny Epic Galaxies",
    year: 2015,
    language: "English",
    players: "1–5",
    playtime: "30–60",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Dice", "Engine building", "Space", "Resource management", "Solo"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/163967/tiny-epic-galaxies",
    kickstarterLink: undefined,
    images: [
      "https://cf.geekdo-images.com/c_87h8o0AOrfCO3hxMjjrA__imagepage/img/Cm_v3dxblZyurF0b9cGQF3dZFHA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2349732.jpg",
    ],
    highlights: [
      "Compact dice-based strategy game of galactic conquest",
      "Simultaneous turns keep downtime low",
      "Excellent solo mode and deep replayability",
    ],
    notes: "",
  },

  // Tiny Epic Dinosaurs
  {
    id: "315953",
    title: "Tiny Epic Dinosaurs",
    year: 2020,
    language: "English",
    players: "1–4",
    playtime: "45–60",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: [
      "Worker placement",
      "Resource management",
      "Dinosaurs",
      "Contract fulfillment",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/315953/tiny-epic-dinosaurs-deluxe-edition",
    kickstarterLink:
      "https://www.kickstarter.com/projects/tinyepic/tiny-epic-dinosaurs",
    images: [
      "https://cf.geekdo-images.com/Iowxfr--os4h-IDWFSR4Dg__imagepage/img/qF-OgC_JCfojOrPht14RokabDGU=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7085817.png",
    ],
    highlights: [
      "Manage your ranch of dinosaurs in a compact worker-placement game",
      "Combines efficiency puzzles with adorable dino meeples",
      "Solo and multiplayer modes with strong replay value",
    ],
    notes: "",
  },

  // Tiny Epic Zombies
  {
    id: "266219",
    title: "Tiny Epic Zombies",
    year: 2018,
    language: "English",
    players: "1–5",
    playtime: "30–45",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Cooperative", "Zombies", "Variable player powers", "Dice", "Solo"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/266219/tiny-epic-zombies-deluxe-edition",
    kickstarterLink:
      "https://www.kickstarter.com/projects/tinyepic/tiny-epic-zombies-a-game-of-brutal-survival",
    images: [
      "https://cf.geekdo-images.com/M1TZo8Z-ia_jT5BVA9dPgw__imagepage/img/eqGJ_l0UityeWYDmUlskdKw6f8Q=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4448589.jpg",
    ],
    highlights: [
      "Fast-paced zombie survival in the Mall of Everything",
      "Play cooperatively, competitively, or one-vs-many",
      "Includes ITEMeeples with swappable weapons",
    ],
    notes: "",
  },

  // Tiny Epic Mechs
  {
    id: "313163",
    title: "Tiny Epic Mechs",
    year: 2019,
    language: "English",
    players: "1–4",
    playtime: "30–45",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Programming", "Battle", "Area control", "Mechs", "Solo"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/313163/tiny-epic-mechs-deluxe-edition",
    kickstarterLink:
      "https://www.kickstarter.com/projects/tinyepic/tiny-epic-mechs-mechanized-entertainment-combat-he",
    images: [
      "https://cf.geekdo-images.com/S3rl2wo45h5LbgKKFe5o0A__imagepage/img/boPSDnugK8NqJxExeVgjOiUigTc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5128019.png",
    ],
    highlights: [
      "Program actions and battle opponents in arena combat",
      "ITEMeeples can equip weapons and climb into giant mechs",
      "Compact, tactical fun with solo and versus play",
    ],
    notes: "",
  },

  // Tiny Epic Tactics
  {
    id: "268875",
    title: "Tiny Epic Tactics",
    year: 2019,
    language: "English",
    players: "1–4",
    playtime: "30–60",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Tactical combat", "Modular map", "Fantasy", "Competitive", "Solo"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/285998/tiny-epic-tactics-deluxe-edition",
    kickstarterLink:
      "https://www.kickstarter.com/projects/tinyepic/tiny-epic-tactics-featuring-a-3d-environment",
    images: [
      "https://cf.geekdo-images.com/0MmfDcnr2ZzmZlXWzaIk_g__imagepage/img/0J3viKg4WM1nV1kb_KS6mtYuMBI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6259971.jpg",
    ],
    highlights: [
      "3D terrain boxes create a tactical battlefield",
      "Multiple play modes: competitive, cooperative, or solo",
      "Portable, clever design with deep strategy",
    ],
    notes: "",
  },
  // Tiny Epic Defenders
  {
    id: "155708",
    title: "Tiny Epic Defenders",
    year: 2015,
    language: "English",
    players: "1–4",
    playtime: "30–60",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Tower defense", "Cooperative", "ITEMeeples", "Fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/155708/tiny-epic-defenders",
    kickstarterLink:
      "https://www.kickstarter.com/projects/coe/tiny-epic-defenders",
    images: [
      "https://cf.geekdo-images.com/nYkO7uYLlmA_5VzskORp1A__imagepage/img/w3gXTZy1p-c5asTdTduGhOrF_js=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2044766.jpg",
    ],
    highlights: [
      "Small-box cooperative defending against bosses",
      "Uses ITEMeeples® for heroes & upgrades",
      "Solo mode supported",
    ],
    notes: "",
  },

  // Tiny Epic Defenders: The Dark War
  {
    id: "228935",
    title: "Tiny Epic Defenders: The Dark War",
    year: 2018,
    language: "English",
    players: "1–4",
    playtime: "45-60 minutes",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Cooperative", "Campaign", "Expansion", "ITEMeeples"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/228935/tiny-epic-defenders-the-dark-war",
    kickstarterLink:
      "https://www.kickstarter.com/projects/coe/tiny-epic-defenders-the-dark-war-and-ted-2nd-editi",
    images: [
      "https://cf.geekdo-images.com/kxMU2ZYz-AZBaBeSDWfcLg__imagepage/img/UmJnwvUl2WhYDOY7Tnye2KUqjkQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3594414.jpg",
    ],
    highlights: [
      "Expansion to Tiny Epic Defenders adding campaign mode",
      "New heroic characters and dire enemies",
    ],
    notes: "",
  },

  // Tiny Epic Pirates
  {
    id: "309430",
    title: "Tiny Epic Pirates",
    year: 2021,
    language: "English",
    players: "1–4",
    playtime: "45",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Adventure", "Pirates", "Action combo", "Variable rondel"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/309430/tiny-epic-pirates",
    kickstarterLink:
      "https://www.kickstarter.com/projects/tinyepic/tiny-epic-pirates",
    images: [
      "https://cf.geekdo-images.com/OACc4dCZKetKnT2hzAO1Mg__imagepage/img/Od4CPozcAgYaaaGJhYAt0KWdX9w=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5410377.jpg",
    ],
    highlights: [
      "Pirate-themed compact strategy game with rondel and combos",
      "High seas, treasure hunting and ship battles",
    ],
    notes: "",
  },

  // Tiny Epic Game of Thrones
  {
    id: "409978",
    title: "Tiny Epic Game of Thrones™",
    year: 2025,
    language: "English",
    players: "1–5",
    playtime: "60",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Fantasy", "Battle", "Strategy", "Licence"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/409978/tiny-epic-game-of-thrones",
    kickstarterLink:
      "https://www.kickstarter.com/projects/tinyepic/tiny-epic-game-of-thrones",
    images: [
      "https://cf.geekdo-images.com/vl_bFvP8d8yHuJkT6X90ZA__imagepage/img/Wn4_Uz-cNHuD2DS-OWbOga9E1ew=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7929314.jpg",
    ],
    highlights: [
      "Tiny Epic version of the Game of Thrones universe",
      "Mix of cooperation and competition in Westeros",
    ],
    notes: "",
  },

  // Tiny Epic Dungeons
  {
    id: "331787",
    title: "Tiny Epic Dungeons",
    year: 2020,
    language: "English",
    players: "1–5",
    playtime: "30-60",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["Dungeon crawl", "Modular map", "Miniatures", "Adventure"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/331787/tiny-epic-dungeons",
    kickstarterLink:
      "https://www.kickstarter.com/projects/tinyepic/tiny-epic-dungeons",
    images: [
      "https://cf.geekdo-images.com/rDOnDFAwGXi_fVsfp-ZCqw__imagepage/img/AI2muWbKW16rLM_kJmXEz0gfhVc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6029065.jpg",
    ],
    highlights: [
      "Compact dungeon-crawl design in tiny box format",
      "Modular board and variable heroes",
    ],
    notes: "",
  },
]
