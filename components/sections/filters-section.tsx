"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Checkbox } from "@components/ui/checkbox"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@components/ui/dialog"
import { Badge } from "@components/ui/badge"
import { Search, X, Filter, SlidersHorizontal } from "lucide-react"
import { type Language, getTranslation, translations } from "@/lib/i18n"
import { ContactDialog } from "@components/contact-dialog"
import { type Game, GameCondition, getConditionTranslationKey } from "@/lib/types"

type FiltersSectionProps = {
  language: Language
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCondition: string
  onConditionChange: (condition: string) => void
  selectedTag: string
  onTagChange: (tag: string) => void
  allTags: string[]
  showKickstarterOnly: boolean
  onKickstarterOnlyChange: (show: boolean) => void
  selectedGames: Set<string>
  selectedGamesPrice: number
  filteredGamesCount: number
  totalGamesCount: number
  onClearSelection: () => void
  onSelectAllFiltered: () => void
  onClearAllFilters: () => void
  allGames: Game[]
}

type FilterContentProps = {
  t: (key: Parameters<typeof getTranslation>[1]) => string
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCondition: string
  onConditionChange: (condition: string) => void
  selectedTag: string
  onTagChange: (tag: string) => void
  allTags: string[]
  showKickstarterOnly: boolean
  onKickstarterOnlyChange: (show: boolean) => void
  selectedGames: Set<string>
  selectedGamesPrice: number
  onClearSelection: () => void
  onOpenContactDialog: () => void
  onSelectAllFiltered: () => void
  filteredGamesCount: number
  totalGamesCount: number
}

function FilterContent({
  t,
  searchQuery,
  onSearchChange,
  selectedCondition,
  onConditionChange,
  selectedTag,
  onTagChange,
  allTags,
  showKickstarterOnly,
  onKickstarterOnlyChange,
  selectedGames,
  selectedGamesPrice,
  onClearSelection,
  onOpenContactDialog,
  onSelectAllFiltered,
  filteredGamesCount,
  totalGamesCount,
}: FilterContentProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="md:col-span-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-background border-muted-foreground/20 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <Select value={selectedCondition} onValueChange={onConditionChange}>
            <SelectTrigger className="bg-background border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors">
              <SelectValue placeholder={t("allConditions")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allConditions")}</SelectItem>
              <SelectItem value={GameCondition.FACTORY_SEALED}>{t("factorySealed")}</SelectItem>
              <SelectItem value={GameCondition.OPENED_UNPLAYED}>{t("openedUnplayed")}</SelectItem>
              <SelectItem value={GameCondition.LIKE_NEW}>{t("likeNew")}</SelectItem>
              <SelectItem value={GameCondition.VERY_GOOD}>{t("veryGood")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-3">
          <Select value={selectedTag} onValueChange={onTagChange}>
            <SelectTrigger className="bg-background border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors">
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

        <div className="md:col-span-2 flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-muted-foreground/20">
          <Checkbox
            id="ks-only"
            checked={showKickstarterOnly}
            onCheckedChange={(checked) => onKickstarterOnlyChange(checked as boolean)}
            className="border-muted-foreground/30"
          />
          <Label htmlFor="ks-only" className="text-sm cursor-pointer font-medium">
            {t("kickstarterOnly")}
          </Label>
        </div>
      </div>

      {/* Selection Controls */}
      {selectedGames.size > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20 shadow-sm animate-in slide-in-from-top-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="font-semibold text-base">
              {selectedGames.size} {selectedGames.size === 1 ? t("game") : t("gamesSelected")}
            </span>
            <span className="text-muted-foreground font-medium">
              {t("total")}: <span className="text-foreground font-bold">{selectedGamesPrice.toLocaleString()} RON</span>
            </span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={onClearSelection} className="flex-1 sm:flex-none border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground">
              <X className="w-4 h-4 mr-1" />
              {t("clear")}
            </Button>
            <Button size="sm" className="flex-1 sm:flex-none shadow-sm" onClick={onOpenContactDialog}>
              {t("inquireSelection")}
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Button variant="outline" size="sm" onClick={onSelectAllFiltered} className="shadow-sm hover:shadow transition-shadow border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground">
          {t("selectAllVisible")}
        </Button>
        <span className="text-sm text-muted-foreground font-medium">
          {t("showing")} <span className="text-foreground font-semibold">{filteredGamesCount}</span> {t("of")}{" "}
          <span className="text-foreground font-semibold">{totalGamesCount}</span> {t("games")}
        </span>
      </div>
    </>
  )
}

export function FiltersSection({
  language,
  searchQuery,
  onSearchChange,
  selectedCondition,
  onConditionChange,
  selectedTag,
  onTagChange,
  allTags,
  showKickstarterOnly,
  onKickstarterOnlyChange,
  selectedGames,
  selectedGamesPrice,
  filteredGamesCount,
  totalGamesCount,
  onClearSelection,
  onSelectAllFiltered,
  onClearAllFilters,
  allGames,
}: FiltersSectionProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)

  // Get selected game objects
  const selectedGamesList = Array.from(selectedGames)
    .map((id) => allGames.find((g) => g.id === id))
    .filter((g): g is Game => g !== undefined)

  // Calculate active filters count
  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCondition !== "all" ? 1 : 0) +
    (selectedTag !== "all" ? 1 : 0) +
    (showKickstarterOnly ? 1 : 0)

  // Helper to get condition translation
  const getConditionLabel = (condition: string) => {
    if (condition === "all") return t("allConditions")
    try {
      const conditionEnum = condition as GameCondition
      return t(getConditionTranslationKey(conditionEnum) as keyof (typeof translations)["en"])
    } catch {
      return condition
    }
  }

  return (
    <>
      <section className="border-b bg-muted/40 backdrop-blur-sm sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-6 max-w-[1280px]">
          {/* Mobile Compact View */}
          <div className="md:hidden space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 bg-background border-muted-foreground/20 focus:border-primary/50 transition-colors"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileFiltersOpen(true)}
                className="shrink-0 relative"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">{t("activeFilters")}:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="text-xs">
                    {searchQuery}
                  </Badge>
                )}
                {selectedCondition !== "all" && (
                  <Badge variant="secondary" className="text-xs">
                    {getConditionLabel(selectedCondition)}
                  </Badge>
                )}
                {selectedTag !== "all" && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedTag}
                  </Badge>
                )}
                {showKickstarterOnly && (
                  <Badge variant="secondary" className="text-xs">
                    {t("kickstarterOnly")}
                  </Badge>
                )}
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {t("showing")} <span className="text-foreground font-semibold">{filteredGamesCount}</span> {t("of")}{" "}
                <span className="text-foreground font-semibold">{totalGamesCount}</span> {t("games")}
              </span>
              <Button variant="outline" size="sm" onClick={onSelectAllFiltered} className="h-7 text-xs border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground">
                {t("selectAllVisible")}
              </Button>
            </div>
          </div>

          {/* Desktop Full View */}
          <div className="hidden md:block">
            <FilterContent
              t={t}
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              selectedCondition={selectedCondition}
              onConditionChange={onConditionChange}
              selectedTag={selectedTag}
              onTagChange={onTagChange}
              allTags={allTags}
              showKickstarterOnly={showKickstarterOnly}
              onKickstarterOnlyChange={onKickstarterOnlyChange}
              selectedGames={selectedGames}
              selectedGamesPrice={selectedGamesPrice}
              onClearSelection={onClearSelection}
              onOpenContactDialog={() => setContactDialogOpen(true)}
              onSelectAllFiltered={onSelectAllFiltered}
              filteredGamesCount={filteredGamesCount}
              totalGamesCount={totalGamesCount}
            />
          </div>
        </div>
      </section>

      {/* Mobile Floating Selection Bar */}
      {selectedGames.size > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t shadow-lg">
          <div className="container mx-auto px-4 py-3 max-w-[1280px]">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-semibold text-sm truncate">
                  {selectedGames.size} {selectedGames.size === 1 ? t("game") : t("gamesSelected")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("total")}: <span className="text-foreground font-bold">{selectedGamesPrice.toLocaleString()} RON</span>
                </span>
              </div>
              <Button variant="outline" size="icon" onClick={onClearSelection} className="shrink-0 h-8 w-8 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Button size="sm" className="w-full shadow-sm" onClick={() => setContactDialogOpen(true)}>
              {t("inquireSelection")}
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Filter Dialog */}
      <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto w-full max-w-none sm:max-w-lg data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top sm:data-[state=open]:slide-in-from-top-[48%] sm:data-[state=closed]:slide-out-to-top-[48%] fixed top-0 left-0 right-0 bottom-auto translate-y-0 translate-x-0 rounded-b-lg rounded-t-none sm:rounded-lg sm:translate-y-[-50%] sm:translate-x-[-50%] sm:left-1/2 sm:top-1/2 sm:right-auto sm:bottom-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              {t("filters")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-2 block">{t("searchPlaceholder")}</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 bg-background border-muted-foreground/20 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">{t("allConditions")}</Label>
                <Select value={selectedCondition} onValueChange={onConditionChange}>
                  <SelectTrigger className="bg-background border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors">
                    <SelectValue placeholder={t("allConditions")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allConditions")}</SelectItem>
                    <SelectItem value={GameCondition.FACTORY_SEALED}>{t("factorySealed")}</SelectItem>
                    <SelectItem value={GameCondition.OPENED_UNPLAYED}>{t("openedUnplayed")}</SelectItem>
                    <SelectItem value={GameCondition.LIKE_NEW}>{t("likeNew")}</SelectItem>
                    <SelectItem value={GameCondition.VERY_GOOD}>{t("veryGood")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">{t("allCategories")}</Label>
                <Select value={selectedTag} onValueChange={onTagChange}>
                  <SelectTrigger className="bg-background border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors">
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

              <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-muted-foreground/20">
                <Checkbox
                  id="ks-only-mobile"
                  checked={showKickstarterOnly}
                  onCheckedChange={(checked) => onKickstarterOnlyChange(checked as boolean)}
                  className="border-muted-foreground/30"
                />
                <Label htmlFor="ks-only-mobile" className="text-sm cursor-pointer font-medium">
                  {t("kickstarterOnly")}
                </Label>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClearAllFilters} className="flex-1 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground">
                {t("clearAllFilters")}
              </Button>
              <Button onClick={() => setMobileFiltersOpen(false)} className="flex-1">
                {t("applyFilters")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <ContactDialog
        language={language}
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        selectedGames={selectedGamesList}
      />
    </>
  )
}

