import { type Game } from "./types"

// Sample data - replace with your actual collection
export const GAMES: Game[] = [
  {
    id: "1",
    title: "Gloomhaven: Jaws of the Lion",
    year: 2020,
    language: "EN",
    players: "1-4",
    playtime: "30-120 min",
    condition: "Factory Sealed",
    price: 350,
    currency: "RON",
    tags: ["Campaign", "Dungeon Crawler", "Fantasy"],
    isKickstarter: false,
    bggLink:
      "https://boardgamegeek.com/boardgame/291457/gloomhaven-jaws-of-the-lion",
    image:
      "https://cf.geekdo-images.com/_HhIdavYW-hid20Iq3hhmg__itemrep/img/a4ec0KY1ksmrKP_2lom7qzCQw_U=/fit-in/246x300/filters:strip_icc()/pic5055631.jpg",
    images: [
      "https://cf.geekdo-images.com/_HhIdavYW-hid20Iq3hhmg__itemrep/img/a4ec0KY1ksmrKP_2lom7qzCQw_U=/fit-in/246x300/filters:strip_icc()/pic5055631.jpg", // BGG Official
      "https://cf.geekdo-images.com/p_tFmkN241jAI-gH1dO00A__itemheader/img/6mYUjt8tjxZXdl4WfboB9fuJLDw=/800x450/filters:quality(30):strip_icc()/pic5491564.jpg", // BGG Image 1
      "/custom/gloomhaven-jaws-of-the-lion-1.jpg", // Custom image 1
    ],
    highlights: ["Never opened", "Shrink wrap intact", "Perfect condition"],
  },
  {
    id: "2",
    title: "Wingspan European Expansion",
    year: 2019,
    language: "EN",
    players: "1-5",
    playtime: "40-70 min",
    condition: "Opened but Unplayed",
    price: 180,
    currency: "RON",
    tags: ["Engine Building", "Animals", "Card Game"],
    isKickstarter: true,
    bggLink:
      "https://boardgamegeek.com/boardgame/253956/wingspan-european-expansion",
    kickstarterLink:
      "https://www.kickstarter.com/projects/stonemaiergames/wingspan",
    image: "/wingspan-european-expansion-board-game.jpg",
    images: [
      "/wingspan-european-expansion-board-game.jpg", // Official
      "/custom/wingspan-european-expansion-1.jpg", // Custom image 1
    ],
    highlights: [
      "Box opened only to check contents",
      "All components mint",
      "Kickstarter exclusive",
    ],
  },
  {
    id: "3",
    title: "Spirit Island",
    year: 2017,
    language: "EN",
    players: "1-4",
    playtime: "90-120 min",
    condition: "Like New",
    price: 420,
    currency: "RON",
    tags: ["Cooperative", "Strategy", "Fantasy"],
    isKickstarter: true,
    bggLink: "https://boardgamegeek.com/boardgame/162886/spirit-island",
    kickstarterLink:
      "https://www.kickstarter.com/projects/2010555768/spirit-island",
    image:
      "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__itemrep/img/giNUMut4HAl-zWyQkGG0YchmuLI=/fit-in/246x300/filters:strip_icc()/pic3490053.jpg",
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
  {
    id: "4",
    title: "Brass: Birmingham",
    year: 2018,
    language: "EN",
    players: "2-4",
    playtime: "60-120 min",
    condition: "Factory Sealed",
    price: 480,
    currency: "RON",
    tags: ["Economic", "Industry", "Network Building"],
    isKickstarter: true,
    bggLink: "https://boardgamegeek.com/boardgame/224517/brass-birmingham",
    kickstarterLink:
      "https://www.kickstarter.com/projects/roxley/brass-an-industrial-revolution",
    image:
      "https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__itemrep/img/IwUOQfhP5c0KcRJBY4X_hi3LpsY=/fit-in/246x300/filters:strip_icc()/pic3536616.jpg",
    images: [
      "https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__itemrep/img/IwUOQfhP5c0KcRJBY4X_hi3LpsY=/fit-in/246x300/filters:strip_icc()/pic3536616.jpg", // BGG Official
      "https://cf.geekdo-images.com/h4xbkoKIsRL6Mk0K_1g_VQ__itemheader/img/PhWOLZLJHy5FBwdN0gGIDs_NCb0=/800x450/filters:quality(30):strip_icc()/pic3540110.jpg", // BGG Image 1
      "/custom/brass-birmingham-1.jpg", // Custom image 1
    ],
    highlights: [
      "Deluxe edition",
      "Never opened",
      "Metal coins included",
      "testing long highlight text to see how it looks and how it behaves,testing long highlight text to see how it looks and how it behaves with multiple lines",
      "multiple highlights",
      "check multiple rows",
      "check multiple columns",
      "testing long highlight text to see how it looks and how it behaves",
      "testing long highlight text to see how it looks and how it behaves",
      "testing long highlight text to see how it looks and how it behaves",
      "testing long highlight text to see how it looks and how it behaves",
      "testing long highlight text to see how it looks and how it behaves",
      "testing long highlight text to see how it looks and how it behaves",
    ],
  },
  {
    id: "5",
    title: "Terraforming Mars",
    year: 2016,
    language: "EN",
    players: "1-5",
    playtime: "120 min",
    condition: "Very Good",
    price: 280,
    currency: "RON",
    tags: ["Science Fiction", "Economic", "Card Game"],
    isKickstarter: false,
    bggLink: "https://boardgamegeek.com/boardgame/167791/terraforming-mars",
    image:
      "https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__itemrep/img/RVh5N-_HcMziJ3M6Q1eLTlj8XIQ=/fit-in/246x300/filters:strip_icc()/pic3163924.jpg",
    images: [
      "https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__itemrep/img/RVh5N-_HcMziJ3M6Q1eLTlj8XIQ=/fit-in/246x300/filters:strip_icc()/pic3163924.jpg", // BGG Official
      "https://cf.geekdo-images.com/hyqVOyVvyUAVu3PmlP9scg__itemheader/img/v7NmHYsHsKLKrqi8ZbVZY5aoJw4=/800x450/filters:quality(30):strip_icc()/pic2977400.jpg", // BGG Image 1
      "/custom/terraforming-mars-1.jpg", // Custom image 1
    ],
    highlights: [
      "Cards sleeved",
      "Player boards included",
      "Light wear on box",
    ],
  },
  {
    id: "6",
    title: "Scythe",
    year: 2016,
    language: "EN",
    players: "1-5",
    playtime: "90-115 min",
    condition: "Factory Sealed",
    price: 520,
    currency: "RON",
    tags: ["Area Control", "Economic", "Sci-Fi"],
    isKickstarter: true,
    bggLink: "https://boardgamegeek.com/boardgame/169786/scythe",
    kickstarterLink:
      "https://www.kickstarter.com/projects/jameystegmaier/scythe",
    image:
      "https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__opengraph/img/10P2KjknnofwYAqlJkBUXpz0I40=/0x0:4259x2236/fit-in/1200x630/filters:strip_icc()/pic3163924.jpg",
    images: [
      "https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__opengraph/img/10P2KjknnofwYAqlJkBUXpz0I40=/0x0:4259x2236/fit-in/1200x630/filters:strip_icc()/pic3163924.jpg", // BGG Official
      "https://cf.geekdo-images.com/hyqVOyVvyUAVu3PmlP9scg__itemheader/img/v7NmHYsHsKLKrqi8ZbVZY5aoJw4=/800x450/filters:quality(30):strip_icc()/pic2977400.jpg", // BGG Image 1
      "/custom/scythe-1.jpg", // Custom image 1
      "/custom/scythe-2.jpg", // Custom image 2
    ],
    highlights: ["Legendary Box", "All expansions", "Never opened"],
  },
]
