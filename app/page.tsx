"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ExternalLink, Package, Sparkles, ShieldCheck, TrendingUp, Search, X, CheckCircle2, Globe } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"

// Game data structure with all important fields
type Game = {
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

// Sample data - replace with your actual collection
const GAMES: Game[] = [
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
    bggLink: "https://boardgamegeek.com/boardgame/291457/gloomhaven-jaws-of-the-lion",
    image: "/gloomhaven-jaws-of-the-lion-board-game-box.jpg",
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
    bggLink: "https://boardgamegeek.com/boardgame/253956/wingspan-european-expansion",
    kickstarterLink: "https://www.kickstarter.com/projects/stonemaiergames/wingspan",
    image: "/wingspan-european-expansion-board-game.jpg",
    highlights: ["Box opened only to check contents", "All components mint", "Kickstarter exclusive"],
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
    kickstarterLink: "https://www.kickstarter.com/projects/2010555768/spirit-island",
    image: "/spirit-island-board-game-box.jpg",
    highlights: ["Played twice", "All components present", "Includes promo spirits"],
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
    kickstarterLink: "https://www.kickstarter.com/projects/roxley/brass-an-industrial-revolution",
    image: "/brass-birmingham-deluxe-board-game.jpg",
    highlights: ["Deluxe edition", "Never opened", "Metal coins included"],
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
    image: "/terraforming-mars-board-game.jpg",
    highlights: ["Cards sleeved", "Player boards included", "Light wear on box"],
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
    kickstarterLink: "https://www.kickstarter.com/projects/jameystegmaier/scythe",
    image: "/scythe-board-game-box-cover.jpg",
    highlights: ["Legendary Box", "All expansions", "Never opened"],
  },
]

export default function BoardGameCollection() {
  const [language, setLanguage] = useState<Language>("ro")
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCondition, setSelectedCondition] = useState<string>("all")
  const [showKickstarterOnly, setShowKickstarterOnly] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [selectedGames, setSelectedGames] = useState<Set<string>>(new Set())

  // Calculate totals
  const totalInventoryValue = useMemo(() => GAMES.reduce((sum, game) => sum + game.price, 0), [])

  const bulkDiscountPrice = useMemo(() => Math.round(totalInventoryValue * 0.65), [totalInventoryValue])

  const selectedGamesPrice = useMemo(() => {
    return Array.from(selectedGames).reduce((sum, id) => {
      const game = GAMES.find((g) => g.id === id)
      return sum + (game?.price || 0)
    }, 0)
  }, [selectedGames])

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    GAMES.forEach((game) => game.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
  }, [])

  // Filter games
  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCondition = selectedCondition === "all" || game.condition === selectedCondition
      const matchesKickstarter = !showKickstarterOnly || game.isKickstarter
      const matchesTag = selectedTag === "all" || game.tags.includes(selectedTag)

      return matchesSearch && matchesCondition && matchesKickstarter && matchesTag
    })
  }, [searchQuery, selectedCondition, showKickstarterOnly, selectedTag])

  const toggleGameSelection = (id: string) => {
    const newSelection = new Set(selectedGames)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedGames(newSelection)
  }

  const selectAllFiltered = () => {
    const allIds = new Set(filteredGames.map((g) => g.id))
    setSelectedGames(allIds)
  }

  const clearSelection = () => {
    setSelectedGames(new Set())
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ro">RO</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="max-w-4xl">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">{t("premiumCollectionSale")}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">{t("heroTitle")}</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {GAMES.length} {t("heroDescription")}{" "}
              <span className="font-semibold text-foreground">{t("heroDiscountText")}</span>.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="w-5 h-5 text-sealed" />
                <span>{t("nonSmokerHome")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-5 h-5 text-sealed" />
                <span>{t("storedVertically")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-5 h-5 text-kickstarter" />
                <span>{t("kickstarterExclusives")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>{t("manySealed")}</span>
              </div>
            </div>

            {/* Bulk Deal Callout */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">💎 {t("bulkDealTitle")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("bulkDealDescription")} {GAMES.length} {t("bulkDealGames")}{" "}
                      <span className="font-bold text-foreground">{bulkDiscountPrice.toLocaleString()} RON</span>
                      <span className="ml-2 line-through text-muted-foreground">
                        {totalInventoryValue.toLocaleString()} RON
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("bulkDealSave")} {(totalInventoryValue - bulkDiscountPrice).toLocaleString()} RON (35%{" "}
                      {t("bulkDealDiscount")})
                    </p>
                  </div>
                  <Button size="lg" className="whitespace-nowrap">
                    {t("contactBulkDeal")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder={t("allConditions")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allConditions")}</SelectItem>
                  <SelectItem value="Factory Sealed">{t("factorySealed")}</SelectItem>
                  <SelectItem value="Opened but Unplayed">{t("openedUnplayed")}</SelectItem>
                  <SelectItem value="Like New">{t("likeNew")}</SelectItem>
                  <SelectItem value="Very Good">{t("veryGood")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-3">
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger>
                  <SelectValue placeholder={t("allCategories")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allCategories")}</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <Checkbox
                id="ks-only"
                checked={showKickstarterOnly}
                onCheckedChange={(checked) => setShowKickstarterOnly(checked as boolean)}
              />
              <Label htmlFor="ks-only" className="text-sm cursor-pointer">
                {t("kickstarterOnly")}
              </Label>
            </div>
          </div>

          {/* Selection Controls */}
          {selectedGames.size > 0 && (
            <div className="mt-4 flex items-center justify-between bg-primary/10 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">
                  {selectedGames.size} {selectedGames.size === 1 ? t("game") : t("gamesSelected")}
                </span>
                <span className="text-muted-foreground">
                  {t("total")}: {selectedGamesPrice.toLocaleString()} RON
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  <X className="w-4 h-4 mr-1" />
                  {t("clear")}
                </Button>
                <Button size="sm">{t("inquireSelection")}</Button>
              </div>
            </div>
          )}

          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm" onClick={selectAllFiltered}>
              {t("selectAllVisible")}
            </Button>
            <span className="text-sm text-muted-foreground self-center">
              {t("showing")} {filteredGames.length} {t("of")} {GAMES.length} {t("games")}
            </span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className={`group overflow-hidden transition-all hover:shadow-lg ${
                selectedGames.has(game.id) ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  className="w-full aspect-square object-cover"
                />

                {/* Selection Checkbox */}
                <button
                  onClick={() => toggleGameSelection(game.id)}
                  className={`absolute top-3 left-3 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    selectedGames.has(game.id)
                      ? "bg-primary border-primary"
                      : "bg-white/90 border-white/90 hover:bg-white"
                  }`}
                >
                  {selectedGames.has(game.id) && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                </button>

                {/* Condition Badge */}
                <div className="absolute top-3 right-3">
                  {game.condition === "Factory Sealed" && (
                    <Badge className="bg-sealed text-white shadow-lg">🎁 {t("sealed")}</Badge>
                  )}
                  {game.condition === "Opened but Unplayed" && (
                    <Badge className="bg-primary text-primary-foreground shadow-lg">✨ {t("unplayed")}</Badge>
                  )}
                </div>

                {/* Kickstarter Badge */}
                {game.isKickstarter && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-kickstarter text-white shadow-lg">⚡ {t("kickstarter")}</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-5">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1 leading-tight text-balance">{game.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {game.year && <span>{game.year}</span>}
                    <span>•</span>
                    <span>{game.language}</span>
                  </div>
                </div>

                {/* Game Info */}
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                  {game.players && <span>👥 {game.players}</span>}
                  {game.playtime && <span>⏱️ {game.playtime}</span>}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {game.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="text-sm space-y-1 mb-4">
                  {game.highlights.slice(0, 2).map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold">
                      {game.price.toLocaleString()}{" "}
                      <span className="text-base font-normal text-muted-foreground">{game.currency}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {game.bggLink && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={game.bggLink} target="_blank" rel="noopener noreferrer" title={t("viewBGG")}>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {game.kickstarterLink && (
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="border-kickstarter/30 hover:bg-kickstarter/10 bg-transparent"
                      >
                        <a
                          href={game.kickstarterLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={t("viewKickstarter")}
                        >
                          <Sparkles className="w-4 h-4 text-kickstarter" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <Button className="w-full mt-3" variant="default">
                  {t("inquireGame")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">{t("noGamesMatch")}</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setSelectedCondition("all")
                setShowKickstarterOnly(false)
                setSelectedTag("all")
              }}
            >
              {t("clearAllFilters")}
            </Button>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t("readyToAdd")}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t("contactDescription")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg">
                {t("email")}
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-transparent">
                {t("whatsapp")}
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">{t("contactFooter")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>
            {t("copyright")} © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
