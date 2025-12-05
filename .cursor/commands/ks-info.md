Add extra info inside notes and/or highlights based on the extra details i'm providing for this selected game entry. 

The purpose of notes and highlights is to provide additional details to potential buyers of this game i own and want to sell

The extra details could be pledge info from KS, notes that i have about the game

Format them correctly, add en and ro translations. 

DON'T EVER INCLUDE PRICE. DO NOT INCLUDE DELIVERY DETAILS AS I ALREADY OWN THE GAME
DO NOT REPEAT YOURSELF in highlights and notes. 

Notes can be kept empty if nothing is needed that is not covered by highlights

If no extra details are provided just translate the current notes and highlights


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