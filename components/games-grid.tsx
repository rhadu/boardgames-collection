import { Button } from "@components/ui/button"
import { type Language, getTranslation } from "@/lib/i18n"
import { type Game } from "@/lib/types"
import { GameCard } from "@components/game-card"

type GamesGridProps = {
  games: Game[]
  language: Language
  selectedGames: Set<string>
  onToggleGameSelection: (id: string) => void
  onClearAllFilters: () => void
  onViewGameDetails?: (game: Game) => void
}

export function GamesGrid({
  games,
  language,
  selectedGames,
  onToggleGameSelection,
  onClearAllFilters,
  onViewGameDetails,
}: GamesGridProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)

  if (games.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">{t("noGamesMatch")}</p>
        <Button variant="outline" className="mt-4 bg-transparent" onClick={onClearAllFilters}>
          {t("clearAllFilters")}
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          language={language}
          isSelected={selectedGames.has(game.id)}
          onToggleSelection={() => onToggleGameSelection(game.id)}
          onViewDetails={() => onViewGameDetails?.(game)}
        />
      ))}
    </div>
  )
}

