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
  highlights: string[]
  notes?: string
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
