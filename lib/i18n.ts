export type Language = "ro" | "en"

export const translations = {
  ro: {
    // Hero Section
    premiumCollectionSale: "Colecție Premium de Vânzare",
    heroTitle: "Colecție de jocuri de masă curată din casă fără fumători",
    heroDescription:
      "jocuri premium, multe de pe Kickstarter. Toate păstrate vertical în condiție impecabilă. Cumpărați individual sau luați întreaga colecție la",
    heroDiscountText: "65% din valoarea de retail",

    // Trust Badges
    nonSmokerHome: "Casă fără fumători",
    storedVertically: "Păstrat vertical",
    kickstarterExclusives: "Exclusivități Kickstarter",
    manySealed: "Multe sigilate",

    // Bulk Deal
    bulkDealTitle: "Oferta Colecției Complete",
    bulkDealDescription: "Toate cele",
    bulkDealGames: "jocuri pentru",
    bulkDealSave: "Economisești",
    bulkDealDiscount: "reducere",
    contactBulkDeal: "Contact pentru Oferta en-gros",

    // Filters
    searchPlaceholder: "Caută jocuri...",
    allConditions: "Toate condițiile",
    allCategories: "Toate categoriile",
    kickstarterOnly: "Doar Kickstarter",
    filters: "Filtre",
    applyFilters: "Aplică filtre",
    activeFilters: "Filtre active",

    // Conditions
    factorySealed: "Sigilat din Fabrică",
    openedUnplayed: "Deschis dar Nejucat",
    likeNew: "Ca Nou",
    veryGood: "Foarte Bun",
    good: "Bun",

    // Selection
    gamesSelected: "jocuri selectate",
    game: "joc",
    total: "Total",
    clear: "Șterge",
    inquireSelection: "Întreabă despre selecție",
    selectAllVisible: "Selectează toate vizibile",
    showing: "Se afișează",
    of: "din",
    games: "jocuri",

    // Game Card
    sealed: "Sigilat",
    unplayed: "Nejucat",
    kickstarter: "Kickstarter",
    inquireGame: "Întreabă despre acest joc",
    viewBGG: "Vezi pe BoardGameGeek",
    viewKickstarter: "Vezi campania Kickstarter",

    // No Results
    noGamesMatch: "Niciun joc nu corespunde filtrelor",
    clearAllFilters: "Șterge toate filtrele",

    // Contact Section
    readyToAdd: "Gata să adaugi la colecția ta?",
    contactDescription:
      "Ridicare locală în București sau livrare disponibilă. Contactează-mă pentru fotografii, detalii sau pentru a face o ofertă.",
    email: "Email: adresa.ta@example.com",
    whatsapp: "WhatsApp / Telefon",
    contactFooter:
      "Toate jocurile din casă fără fumători, fără animale. Păstrate vertical pentru a preveni deteriorarea cutiilor. Multe jocuri sunt exclusivități Kickstarter cu extra-uri. Bucuros să ofer fotografii suplimentare și să răspund la întrebări.",

    // Footer
    copyright: "Colecție Premium de Jocuri de Masă",

    // Language
    language: "Limbă",
  },
  en: {
    // Hero Section
    premiumCollectionSale: "Premium Collection Sale",
    heroTitle: "Curated board game collection from smoke-free home",
    heroDescription:
      "premium titles, many from Kickstarter. All stored vertically in pristine condition. Buy individually or take the entire collection at",
    heroDiscountText: "65% of retail value",

    // Trust Badges
    nonSmokerHome: "Non-smoker home",
    storedVertically: "Stored vertically",
    kickstarterExclusives: "Kickstarter exclusives",
    manySealed: "Many sealed",

    // Bulk Deal
    bulkDealTitle: "Complete Collection Offer",
    bulkDealDescription: "All",
    bulkDealGames: "games for",
    bulkDealSave: "Save",
    bulkDealDiscount: "discount",
    contactBulkDeal: "Contact for Bulk Deal",

    // Filters
    searchPlaceholder: "Search games...",
    allConditions: "All conditions",
    allCategories: "All categories",
    kickstarterOnly: "Kickstarter only",
    filters: "Filters",
    applyFilters: "Apply filters",
    activeFilters: "Active filters",

    // Conditions
    factorySealed: "Factory Sealed",
    openedUnplayed: "Opened but Unplayed",
    likeNew: "Like New",
    veryGood: "Very Good",
    good: "Good",

    // Selection
    gamesSelected: "games selected",
    game: "game",
    total: "Total",
    clear: "Clear",
    inquireSelection: "Inquire about selection",
    selectAllVisible: "Select all visible",
    showing: "Showing",
    of: "of",
    games: "games",

    // Game Card
    sealed: "Sealed",
    unplayed: "Unplayed",
    kickstarter: "Kickstarter",
    inquireGame: "Inquire about this game",
    viewBGG: "View on BoardGameGeek",
    viewKickstarter: "View Kickstarter campaign",

    // No Results
    noGamesMatch: "No games match your filters",
    clearAllFilters: "Clear all filters",

    // Contact Section
    readyToAdd: "Ready to add to your collection?",
    contactDescription:
      "Local pickup in Bucharest or shipping available. Contact me for photos, details, or to make an offer.",
    email: "Email: your.email@example.com",
    whatsapp: "WhatsApp / Phone",
    contactFooter:
      "All games from a non-smoking, pet-free home. Stored vertically to prevent box damage. Many games are Kickstarter exclusives with extras. Happy to provide additional photos and answer questions.",

    // Footer
    copyright: "Premium Board Game Collection",

    // Language
    language: "Language",
  },
}

export function getTranslation(lang: Language, key: keyof (typeof translations)["en"]) {
  return translations[lang][key]
}
