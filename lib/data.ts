import { type Game, GameCondition } from "./types"

// Sample data - replace with your actual collection
export const GAMES: Game[] = [
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
    tags: [
      "co-operative",
      "survival",
      "story-driven",
      "modern war",
      "campaign",
    ], // based on theme & mechanics
    isKickstarter: true, // this game had a Kickstarter launch. :contentReference[oaicite:4]{index=4}
    retailPrice: 69.99, // MSRP $69.99 USD. :contentReference[oaicite:5]{index=5}
    bggLink:
      "https://boardgamegeek.com/boardgame/188920/this-war-of-mine-the-board-game",
    kickstarterLink:
      "https://www.kickstarter.com/projects/awakenrealms/this-war-of-mine-the-board-game", // from KS campaign
    images: [],
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
      "semi-cooperative",
      "sci-fi horror",
      "betrayal",
      "asymmetrical objectives",
      "survival",
    ],
    isKickstarter: true, // It launched via Kickstarter originally. :contentReference[oaicite:11]{index=11}
    retailPrice: 159.99, // MSRP ~$159.99 USD. :contentReference[oaicite:12]{index=12}
    bggLink: "https://boardgamegeek.com/boardgame/167355/nemesis",
    kickstarterLink:
      "https://www.kickstarter.com/projects/awakenrealms/nemesis-board-game",
    images: [],
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
    tags: ["co-operative", "fantasy", "app-driven", "campaign", "Middle-earth"],
    isKickstarter: false,
    retailPrice: undefined, // you might research the MSRP if desired
    bggLink:
      "https://boardgamegeek.com/boardgame/269385/the-lord-of-the-rings-journeys-in-middle-earth",
    kickstarterLink: undefined,
    images: [],
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
      "Campaign Game",
      "Miniatures",
      "Boss Battler",
      "Exploration",
      "Sci-fi",
      "Ancient Greece",
      "Mythology",
      "Heavy Game",
      "Complex Game",
    ],
    isKickstarter: true,
    bggLink: "https://boardgamegeek.com/boardgame/242705/aeon-trespass-odyssey",
    kickstarterLink:
      "https://www.kickstarter.com/projects/intotheunknown/aeon-trespass-odyssey-second-printing-plus-all-new-content",
    images: [
      "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__itemrep/img/giNUMut4HAl-zWyQkGG0YchmuLI=/fit-in/246x300/filters:strip_icc()/pic3490053.jpg",
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

  // Spirit Island
  {
    id: "3",
    title: "Spirit Island",
    year: 2017,
    language: "EN",
    players: "1-4",
    playtime: "90-120 min",
    condition: GameCondition.LIKE_NEW,
    price: 420,
    currency: "RON",
    tags: ["Cooperative", "Strategy", "Fantasy"],
    isKickstarter: true,
    bggLink: "https://boardgamegeek.com/boardgame/162886/spirit-island",
    kickstarterLink:
      "https://www.kickstarter.com/projects/2010555768/spirit-island",
    images: [
      "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__itemrep/img/giNUMut4HAl-zWyQkGG0YchmuLI=/fit-in/246x300/filters:strip_icc()/pic3490053.jpg", // BGG Official
      "https://cf.geekdo-images.com/e2e0wdO8oVNzD0ZAhzi6MQ__itemheader/img/Zj1GBUN2m-z4zX2-QWn31fiKEE4=/800x450/filters:quality(30):strip_icc()/pic3509697.jpg", // BGG Image 1
      "/custom/spirit-island-1.jpg", // Custom image 1
      "/custom/spirit-island-2.jpg", // Custom image 2
      "https://cf.geekdo-images.com/e2e0wdO8oVNzD0ZAhzi6MQ__itemheader/img/Zj1GBUN2m-z4zX2-QWn31fiKEE4=/800x450/filters:quality(30):strip_icc()/pic3509697.jpg", // BGG Image 1
      "https://cf.geekdo-images.com/e2e0wdO8oVNzD0ZAhzi6MQ__itemheader/img/Zj1GBUN2m-z4zX2-QWn31fiKEE4=/800x450/filters:quality(30):strip_icc()/pic3509697.jpg", // BGG Image 1
    ],
    highlights: [
      "Played twice",
      "All components present",
      "Includes promo spirits",
    ],
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
      "trading",
      "resource management",
      "route building",
      "dice",
      "hex grid",
    ],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/13/catan",
    kickstarterLink: undefined,
    images: [],
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
      "engine building",
      "science",
      "card drafting",
      "tableau",
      "economic",
    ],
    isKickstarter: true, // Turmoil expansion had a KS
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/167791/terraforming-mars",
    kickstarterLink:
      "https://www.kickstarter.com/projects/strongholdgames/terraforming-mars-turmoil",
    images: [],
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
    tags: ["cooperative", "survival", "scenario", "modular map", "campaign"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/275564/maximum-apocalypse-legendary-edition",
    kickstarterLink:
      "https://www.kickstarter.com/projects/mikegnade/maximum-apocalypse-legendary-edition-with-miniatur",
    images: [],
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
    tags: ["app-driven", "story-driven", "adventure", "fantasy", "competitive"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/285192/destinies",
    kickstarterLink:
      "https://www.kickstarter.com/projects/lucky-duck-games/time-of-legends-destinies",
    images: [],
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
      "cooperative",
      "open world",
      "campaign",
      "story-driven",
      "exploration",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/255984/sleeping-gods",
    kickstarterLink:
      "https://www.kickstarter.com/projects/953146955/sleeping-gods",
    images: [],
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
    tags: ["dungeon crawl", "card driven", "modular", "campaign"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/273703/altar-quest",
    kickstarterLink:
      "https://www.kickstarter.com/projects/blacklistgames/altar-quest",
    images: [],
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
      "narrative",
      "cooperative",
      "dark fantasy",
      "campaign",
      "app assisted",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/264220/tainted-grail-the-fall-of-avalon",
    kickstarterLink:
      "https://www.kickstarter.com/projects/awakenrealms/tainted-grail-the-fall-of-avalon",
    images: [],
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
    tags: ["narrative", "dream world", "exploration", "cooperative"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/280794/etherfields",
    kickstarterLink:
      "https://www.kickstarter.com/projects/awakenrealms/etherfields-board-game",
    images: [],
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
    tags: ["party", "adult", "couples", "social"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/191077/gierki-malzenskie",
    kickstarterLink: undefined,
    images: [],
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
    tags: ["deck-building", "fantasy", "combat", "strategy", "miniatures"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/239942/black-rose-wars",
    kickstarterLink:
      "https://www.kickstarter.com/projects/lmstudio/black-rose-wars",
    images: [],
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
      "exploration",
      "choose-your-own-adventure",
      "cooperative",
      "survival",
      "campaign",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/180263/the-7th-continent",
    kickstarterLink:
      "https://www.kickstarter.com/projects/seriouspoulp/the-7th-continent-what-goes-up-must-come-down",
    images: [],
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
      "strategy",
      "deck-building",
      "fantasy",
      "exploration",
      "solo friendly",
    ],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/96848/mage-knight-board-game",
    kickstarterLink: undefined,
    images: [],
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
    tags: ["dungeon crawl", "campaign", "cooperative", "narrative", "fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/169427/middara-unintentional-malum-act-1",
    kickstarterLink:
      "https://www.kickstarter.com/projects/succubuspublishing/middara-unintentional-malum-the-complete-trilogy",
    images: [],
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
    tags: ["cooperative", "historical", "strategy", "WWII", "deduction"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/156858/black-orchestra",
    kickstarterLink: undefined,
    images: [],
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
      "cooperative",
      "area control",
      "asymmetric powers",
      "strategy",
      "environmental",
    ],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/162886/spirit-island",
    kickstarterLink: undefined,
    images: [],
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
    tags: ["heist", "drafting", "push your luck", "party", "simultaneous play"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/226445/the-big-score",
    kickstarterLink:
      "https://www.kickstarter.com/projects/vanrydergames/the-big-score",
    images: [],
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
      "worker placement",
      "time travel",
      "sci-fi",
      "resource management",
      "engine building",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/278292/anachrony-infinity-box",
    kickstarterLink:
      "https://www.kickstarter.com/projects/mindclash/anachrony-fractures-of-time-expansion-and-infinity",
    images: [
      "https://cf.geekdo-images.com/Tuy9MAvPx4TRGV1vvT6wxQ__imagepagezoom/img/LSablpr36KWc0VDWxSBgYqUPtcg=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic5960363.png",
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
      "cooperative",
      "zombies",
      "miniatures",
      "dice rolling",
      "scenario based",
    ],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/286751/zombicide-2nd-edition",
    kickstarterLink:
      "https://www.kickstarter.com/projects/cmon/zombicide-2nd-edition",
    images: [],
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
    tags: ["bag building", "narrative", "adventure", "cooperative", "fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/281526/the-isofarian-guard",
    kickstarterLink:
      "https://www.kickstarter.com/projects/skykingdomgames/the-isofarian-guard",
    images: [],
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
    tags: ["dungeon crawl", "adventure", "modular", "card game", "cooperative"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/198832/legends-untold-weeping-caves-novice-set",
    kickstarterLink:
      "https://www.kickstarter.com/projects/legendsuntold/legends-untold-as-deep-as-an-rpg-as-fast-as-a-card",
    images: [],
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
    tags: ["dungeon crawl", "adventure", "modular", "cooperative", "fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/216179/legends-untold-the-great-sewers-novice-set",
    kickstarterLink:
      "https://www.kickstarter.com/projects/legendsuntold/legends-untold-as-deep-as-an-rpg-as-fast-as-a-card",
    images: [],
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
    tags: ["solo", "worker placement", "WWII", "covert ops", "print and play"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/148729/maquis",
    kickstarterLink: undefined,
    images: [],
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
    tags: ["press your luck", "set collection", "family", "push your luck"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/240744/fire-in-the-library",
    kickstarterLink:
      "https://www.kickstarter.com/projects/weirdgiraffegames/fire-in-the-library-board-game",
    images: [],
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
    tags: ["bluffing", "hidden teams", "social deduction", "western", "dice"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/245197/deadwood-1876",
    kickstarterLink:
      "https://www.kickstarter.com/projects/travishancock/deadwood-1876-a-safe-robbing-game-of-teamwork-and",
    images: [],
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
    tags: ["hidden roles", "pirates", "social deduction", "team play", "party"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/218530/tortuga-1667",
    kickstarterLink:
      "https://www.kickstarter.com/projects/travis/tortuga-1667-a-pirate-game-of-mutiny-plunder-and-d",
    images: [],
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
    tags: ["bluffing", "hidden roles", "witch hunt", "deduction", "party"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/175549/salem-1692",
    kickstarterLink:
      "https://www.kickstarter.com/projects/travishancock/salem-a-strategic-card-game-of-deception-for-4-12",
    images: [],
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
    tags: ["solo", "deduction", "hidden movement", "puzzle", "thematic"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/231218/black-sonata",
    kickstarterLink:
      "https://www.kickstarter.com/projects/sideroomgames/black-sonata-the-fair-youth-expansion",
    images: [],
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
    tags: ["party", "card game", "humor", "family", "light"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/172225/exploding-kittens",
    kickstarterLink:
      "https://www.kickstarter.com/projects/elanlee/exploding-kittens",
    images: [],
    highlights: [
      "Massively popular quick card game of exploding cats",
      "Hidden Compartment box edition adds secret storage",
      "Fun for all ages and quick to teach",
    ],
    notes: "",
  },

  // Set a Watch Deluxe Edition
  {
    id: "256676",
    title: "Set a Watch: Deluxe Edition",
    year: 2019,
    language: "English",
    players: "1–4",
    playtime: "45–75",
    condition: GameCondition.OPENED_UNPLAYED,
    price: 0,
    currency: "RON",
    tags: ["cooperative", "puzzle", "fantasy", "dice", "adventure"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/256676/set-a-watch",
    kickstarterLink:
      "https://www.kickstarter.com/projects/rockmanorgames/set-a-watch",
    images: [],
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
    tags: ["card drafting", "engine building", "tableau", "medium"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/241724/villagers",
    kickstarterLink:
      "https://www.kickstarter.com/projects/sinisterfish/villagers-card-drafting-and-village-building-for-1",
    images: [],
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
    tags: ["narrative", "story driven", "card game", "campaign"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink:
      "https://boardgamegeek.com/boardgame/277025/vampire-the-masquerade-chapters",
    kickstarterLink:
      "https://www.kickstarter.com/projects/flyosgames/vampire-the-masquerade-chapters",
    images: [],
    highlights: [
      "Story-driven board game in the Vampire: The Masquerade universe",
      "Expansion Banu Hakim adds playable clan and new campaign elements",
    ],
    notes: "",
  },

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
    tags: ["cooperative", "campaign", "miniatures", "dark fantasy"],
    isKickstarter: true,
    retailPrice: undefined,
    bggLink:
      "hhttps://boardgamegeek.com/boardgame/251661/oathsworn-into-the-deepwood",
    kickstarterLink:
      "https://www.kickstarter.com/projects/shadowborne-games/oathsworn-into-the-deepwood",
    images: [],
    highlights: [
      "High-budget campaign game with rich components and story",
      "Secret Box version adds collector extras",
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
    tags: ["party", "card game", "humor", "family"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/193621/joking-hazard",
    kickstarterLink: undefined,
    images: [],
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
    tags: ["civilization", "light strategy", "engine building", "pocket"],
    isKickstarter: false,
    retailPrice: undefined,
    bggLink: "https://boardgamegeek.com/boardgame/264647/age-of-civilization",
    kickstarterLink: undefined,
    images: [],
    highlights: [
      "Compact civilization game where you lead up to three civilizations",
      "Quick play time around 20-30 minutes",
      "Great stepping stone into heavier strategy games",
    ],
    notes: "",
  },
]
