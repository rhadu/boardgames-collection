import { Button } from "@components/ui/button"
import { Checkbox } from "@components/ui/checkbox"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Search, X } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"

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
}: FiltersSectionProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)

  return (
    <section className="border-b bg-muted/40 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-6 max-w-[1280px]">
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
                <SelectItem value="Factory Sealed">{t("factorySealed")}</SelectItem>
                <SelectItem value="Opened but Unplayed">{t("openedUnplayed")}</SelectItem>
                <SelectItem value="Like New">{t("likeNew")}</SelectItem>
                <SelectItem value="Very Good">{t("veryGood")}</SelectItem>
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
              <Button variant="outline" size="sm" onClick={onClearSelection} className="flex-1 sm:flex-none">
                <X className="w-4 h-4 mr-1" />
                {t("clear")}
              </Button>
              <Button size="sm" className="flex-1 sm:flex-none shadow-sm">
                {t("inquireSelection")}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button variant="outline" size="sm" onClick={onSelectAllFiltered} className="shadow-sm hover:shadow transition-shadow">
            {t("selectAllVisible")}
          </Button>
          <span className="text-sm text-muted-foreground font-medium">
            {t("showing")} <span className="text-foreground font-semibold">{filteredGamesCount}</span> {t("of")}{" "}
            <span className="text-foreground font-semibold">{totalGamesCount}</span> {t("games")}
          </span>
        </div>
      </div>
    </section>
  )
}

