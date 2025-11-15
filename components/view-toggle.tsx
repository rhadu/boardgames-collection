"use client"

import { Button } from "@components/ui/button"
import { Grid3x3, List } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type ViewType = "grid" | "list"

type ViewToggleProps = {
  view: ViewType
  onViewChange: (view: ViewType) => void
  language: Language
  className?: string
}

export function ViewToggle({ view, onViewChange, language, className }: ViewToggleProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)

  return (
    <div className={cn("flex items-center gap-1 rounded-lg border border-muted-foreground/20 bg-background p-1", className)}>
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="icon"
        onClick={() => onViewChange("grid")}
        className={cn(
          "h-8 w-8 transition-all",
          view === "grid"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        aria-label={t("viewGrid")}
        title={t("viewGrid")}
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="icon"
        onClick={() => onViewChange("list")}
        className={cn(
          "h-8 w-8 transition-all",
          view === "list"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        aria-label={t("viewList")}
        title={t("viewList")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}

