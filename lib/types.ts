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
  image: string // Deprecated: kept for backward compatibility, use images[0] instead
  images: string[] // Array of images: first is official, rest are custom
  highlights: string[]
  notes?: string
}

