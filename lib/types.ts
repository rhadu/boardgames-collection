export enum GameCondition {
  FACTORY_SEALED = "FACTORY_SEALED",
  OPENED_UNPLAYED = "OPENED_UNPLAYED",
  LIKE_NEW = "LIKE_NEW",
  VERY_GOOD = "VERY_GOOD",
  GOOD = "GOOD",
}

export type Game = {
  id: string
  title: string
  slug: string
  year?: number
  language: string
  players?: string
  playtime?: string
  condition: GameCondition
  price: number
  retailPrice?: number
  currency: string
  tags: string[]
  isKickstarter: boolean
  bggLink?: string
  kickstarterLink?: string
  images: string[] // Array of images: first is official, rest are custom
  highlights: string[] | { ro?: string[]; en?: string[] }
  notes?: string | { ro?: string; en?: string }
}

// Helper function to map GameCondition enum to translation keys
export const getConditionTranslationKey = (
  condition: GameCondition,
): string => {
  const translationMap: Record<GameCondition, string> = {
    [GameCondition.FACTORY_SEALED]: "factorySealed",
    [GameCondition.OPENED_UNPLAYED]: "openedUnplayed",
    [GameCondition.LIKE_NEW]: "likeNew",
    [GameCondition.VERY_GOOD]: "veryGood",
    [GameCondition.GOOD]: "good",
  }
  return translationMap[condition]
}

// Helper function to get localized highlights
export const getLocalizedHighlights = (
  highlights: string[] | { ro?: string[]; en?: string[] },
  language: "ro" | "en",
): string[] => {
  // Backward compatibility: if it's a string array, return it as is
  if (Array.isArray(highlights)) {
    return highlights
  }
  
  // Try to get the language-specific version
  const langHighlights = highlights[language]
  if (langHighlights) {
    return langHighlights
  }
  
  // Fallback to the other language if available
  const fallbackLang = language === "ro" ? "en" : "ro"
  const fallbackHighlights = highlights[fallbackLang]
  if (fallbackHighlights) {
    return fallbackHighlights
  }
  
  // If neither is available, return empty array
  return []
}

// Helper function to get localized notes
export const getLocalizedNotes = (
  notes: string | { ro?: string; en?: string } | undefined,
  language: "ro" | "en",
): string | undefined => {
  // Backward compatibility: if it's a string, return it as is
  if (typeof notes === "string") {
    return notes
  }
  
  // If it's undefined, return undefined
  if (!notes) {
    return undefined
  }
  
  // Try to get the language-specific version
  const langNotes = notes[language]
  if (langNotes) {
    return langNotes
  }
  
  // Fallback to the other language if available
  const fallbackLang = language === "ro" ? "en" : "ro"
  const fallbackNotes = notes[fallbackLang]
  if (fallbackNotes) {
    return fallbackNotes
  }
  
  // If neither is available, return undefined
  return undefined
}
