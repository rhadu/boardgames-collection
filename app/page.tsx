"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type Language } from "@/lib/i18n"
import { GAMES } from "@/lib/data"
import { type Game, GameCondition } from "@/lib/types"
import { HeroSection } from "@components/sections/hero-section"
import { FiltersSection } from "@components/sections/filters-section"
import { GamesGrid } from "@components/games-grid"
import { ContactSection } from "@components/sections/contact-section"
import { Footer } from "@components/footer"
import { ContactDialog } from "@components/contact-dialog"

const SCROLL_POSITION_KEY = "mainPageScrollPosition"

export default function BoardGameCollection() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasRestoredScroll = useRef(false)
  const [language, setLanguage] = useState<Language>(() => {
    const langParam = searchParams.get("lang")
    return langParam === "en" ? "en" : "ro"
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCondition, setSelectedCondition] = useState<string>("all")
  const [showKickstarterOnly, setShowKickstarterOnly] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [selectedGames, setSelectedGames] = useState<Set<string>>(new Set())
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

  useEffect(() => {
    const langParam = searchParams.get("lang")
    const normalizedLang: Language = langParam === "en" ? "en" : "ro"
    setLanguage((prev) => (prev === normalizedLang ? prev : normalizedLang))
  }, [searchParams])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)

    const params = new URLSearchParams(Array.from(searchParams.entries()))

    if (lang === "ro") {
      params.delete("lang")
    } else {
      params.set("lang", lang)
    }

    const queryString = params.toString()
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false })
  }

  // Save scroll position before navigating away
  useEffect(() => {
    const saveScrollPosition = () => {
      if (pathname === "/") {
        sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString())
      }
    }

    // Save on scroll (throttled)
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        saveScrollPosition()
      }, 100)
    }

    // Save before page unload
    const handleBeforeUnload = () => {
      saveScrollPosition()
    }

    // Save when navigating away (Next.js router events)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveScrollPosition()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      clearTimeout(scrollTimeout)
    }
  }, [pathname])

  // Restore scroll position when returning to the page
  useEffect(() => {
    if (pathname === "/" && !hasRestoredScroll.current) {
      const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY)
      if (savedPosition) {
        // Wait for next tick to ensure DOM is ready
        const restoreScroll = () => {
          const position = parseInt(savedPosition, 10)
          // Use scrollTo with just the number for instant scroll
          window.scrollTo(0, position)
          hasRestoredScroll.current = true
        }
        
        // Try multiple times to ensure content is loaded
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            restoreScroll()
            // Fallback: try again after a short delay
            setTimeout(restoreScroll, 100)
          })
        })
      } else {
        hasRestoredScroll.current = true
      }
    } else if (pathname !== "/") {
      // Reset flag when navigating away
      hasRestoredScroll.current = false
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        language={language}
        onLanguageChange={handleLanguageChange}
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
        />
      </section>

      <ContactSection language={language} onContact={() => setContactDialogOpen(true)} />

      <Footer language={language} />

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
