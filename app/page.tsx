"use client"

import { useState, useMemo } from "react"
import { type Language } from "@/lib/i18n"
import { GAMES } from "@/lib/data"
import { type Game, GameCondition } from "@/lib/types"
import { HeroSection } from "@components/sections/hero-section"
import { FiltersSection } from "@components/sections/filters-section"
import { GamesGrid } from "@components/games-grid"
import { ContactSection } from "@components/sections/contact-section"
import { Footer } from "@components/footer"
import { GameDetailView } from "@components/game-detail-view"
import { ContactDialog } from "@components/contact-dialog"

export default function BoardGameCollection() {
  const [language, setLanguage] = useState<Language>("ro")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCondition, setSelectedCondition] = useState<string>("all")
  const [showKickstarterOnly, setShowKickstarterOnly] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [selectedGames, setSelectedGames] = useState<Set<string>>(new Set())
  const [selectedGameForDetails, setSelectedGameForDetails] = useState<Game | null>(null)
  const [bulkDealDialogOpen, setBulkDealDialogOpen] = useState(false)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)

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
      const matchesCondition = selectedCondition === "all" || game.condition === (selectedCondition as GameCondition)
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

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCondition("all")
    setShowKickstarterOnly(false)
    setSelectedTag("all")
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        language={language}
        onLanguageChange={setLanguage}
        totalGames={GAMES.length}
        bulkDiscountPrice={bulkDiscountPrice}
        totalInventoryValue={totalInventoryValue}
        onContactBulkDeal={() => setBulkDealDialogOpen(true)}
      />

      <FiltersSection
        language={language}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCondition={selectedCondition}
        onConditionChange={setSelectedCondition}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        allTags={allTags}
        showKickstarterOnly={showKickstarterOnly}
        onKickstarterOnlyChange={setShowKickstarterOnly}
        selectedGames={selectedGames}
        selectedGamesPrice={selectedGamesPrice}
        filteredGamesCount={filteredGames.length}
        totalGamesCount={GAMES.length}
        onClearSelection={clearSelection}
        onSelectAllFiltered={selectAllFiltered}
        onClearAllFilters={clearAllFilters}
        allGames={GAMES}
      />

      <section className={`container mx-auto px-4 py-12 md:py-16 max-w-[1280px] ${selectedGames.size > 0 ? "pb-28 md:pb-16" : ""}`}>
        <GamesGrid
          games={filteredGames}
          language={language}
          selectedGames={selectedGames}
          onToggleGameSelection={toggleGameSelection}
          onClearAllFilters={clearAllFilters}
          onViewGameDetails={setSelectedGameForDetails}
        />
      </section>

      <ContactSection language={language} onContact={() => setContactDialogOpen(true)} />

      <Footer language={language} />

      {/* Game Detail View */}
      <GameDetailView
        game={selectedGameForDetails}
        language={language}
        open={selectedGameForDetails !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedGameForDetails(null)
          }
        }}
        isSelected={selectedGameForDetails ? selectedGames.has(selectedGameForDetails.id) : false}
        onToggleSelection={() => {
          if (selectedGameForDetails) {
            toggleGameSelection(selectedGameForDetails.id)
          }
        }}
      />

      {/* Bulk Deal Contact Dialog */}
      <ContactDialog
        language={language}
        open={bulkDealDialogOpen}
        onOpenChange={setBulkDealDialogOpen}
        isBulkDeal={true}
      />

      {/* General Contact Dialog */}
      <ContactDialog
        language={language}
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
      />
    </div>
  )
}
