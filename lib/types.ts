export type Game = {
  id: string
  title: string
  year?: number
  language: string
  players?: string
  playtime?: string
  condition: "Factory Sealed" | "Opened but Unplayed" | "Like New" | "Very Good" | "Good"
  price: number
  currency: string
  tags: string[]
  isKickstarter: boolean
  bggLink?: string
  kickstarterLink?: string
  image: string
  highlights: string[]
  notes?: string
}

