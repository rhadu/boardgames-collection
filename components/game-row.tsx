"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { startViewTransition } from "@components/view-transition"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import { type Game, GameCondition } from "@/lib/types"
import { BGGLogo } from "@components/logos/bgg-logo"
import { KickstarterLogo } from "@components/logos/kickstarter-logo"
import { ContactDialog } from "@components/contact-dialog"
import { slugify, cn } from "@/lib/utils"
import Image from "next/image"
import { getThumbnailUrl, isCloudinaryUrl } from "@/lib/cloudinary"

// Check if image is an external URL
const isExternalUrl = (src: string): boolean => {
  return src.startsWith("http://") || src.startsWith("https://")
}

type GameRowProps = {
  game: Game
  language: Language
  isSelected: boolean
  onToggleSelection: () => void
}

export function GameRow({ game, language, isSelected, onToggleSelection }: GameRowProps) {
  const router = useRouter()
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)

  const gameSlug = slugify(game.title)
  const baseGamePath = `/games/${gameSlug}`
  const gameUrl = language === "en" ? `${baseGamePath}?lang=en` : baseGamePath

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons, links, or checkbox
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]') ||
      target.closest('[role="dialog"]') ||
      target.closest('[data-radix-portal]')
    ) {
      return
    }
    // Save scroll position before navigating
    sessionStorage.setItem("mainPageScrollPosition", window.scrollY.toString())
    startViewTransition(() => {
      router.push(gameUrl)
    })
  }

  return (
    <div
      className={cn(
        "group relative flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-lg border transition-all duration-200 cursor-pointer",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        "bg-card",
        isSelected ? "ring-2 ring-primary ring-offset-2 shadow-md" : "border-muted-foreground/20"
      )}
      onClick={handleRowClick}
    >
      {/* Thumbnail Container - includes badge on mobile */}
      <div className="flex flex-col gap-2 flex-shrink-0">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-lg overflow-hidden border border-muted-foreground/20 bg-muted shadow-sm">
        {(() => {
          const imageSrc = game.images[0] || "/placeholder.svg"
          const isExternal = isExternalUrl(imageSrc)
          const optimizedSrc = isCloudinaryUrl(imageSrc) 
            ? getThumbnailUrl(imageSrc) 
            : imageSrc
          
          if (isExternal) {
            return (
              <img
                src={optimizedSrc}
                alt={game.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            )
          }
          
          return (
            <Image
              src={optimizedSrc}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
              loading="lazy"
            />
          )
        })()}
        
        {/* Selection Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleSelection()
          }}
          className={cn(
            "absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-md border-2 flex items-center justify-center transition-all backdrop-blur-sm shadow-md z-10 touch-manipulation",
            isSelected
              ? "bg-primary border-primary scale-110"
              : "bg-white/95 border-white/95 active:bg-white active:scale-105"
          )}
        >
          {isSelected && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />}
        </button>

        {/* Condition Badge */}
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 z-10">
          {game.condition === GameCondition.FACTORY_SEALED && (
            <Badge className="bg-sealed text-white shadow-md backdrop-blur-sm border-0 px-2 py-1 text-[11px] sm:text-xs">
              🎁 {t("sealed")}
            </Badge>
          )}
          {game.condition === GameCondition.OPENED_UNPLAYED && (
            <Badge className="bg-primary text-primary-foreground shadow-md backdrop-blur-sm border-0 px-2 py-1 text-[11px] sm:text-xs">
              ✨ {t("unplayed")}
            </Badge>
          )}
        </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">
        {/* Top: Title and Meta Info */}
        <div className="flex-1 min-w-0">
          {/* Title Row with Kickstarter Badge */}
          <div className="mb-2.5">
            <div className="flex items-start gap-2 mb-2">
              <Link
                href={gameUrl}
                onClick={(e) => {
                  e.preventDefault()
                  sessionStorage.setItem("mainPageScrollPosition", window.scrollY.toString())
                  startViewTransition(() => {
                    router.push(gameUrl)
                  })
                }}
                className="flex-1 min-w-0"
              >
                <h3 className="font-bold text-lg sm:text-xl leading-tight text-balance group-hover:text-primary transition-colors">
                  {game.title}
                </h3>
              </Link>
              {/* Kickstarter Badge - Only show on desktop */}
              {game.isKickstarter && (
                <Badge className="hidden sm:inline-flex bg-kickstarter text-white text-xs sm:text-sm px-2.5 py-1 font-medium whitespace-nowrap flex-shrink-0">
                  ⚡ {t("kickstarter")}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Meta Info Row - Hide players/playtime on smallest mobile */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base text-muted-foreground mb-2.5">
            {game.year && <span>{game.year}</span>}
            {game.year && <span className="text-muted-foreground/50">•</span>}
            <span>{game.language}</span>
            {game.players && (
              <>
                <span className="text-muted-foreground/50 hidden sm:inline">•</span>
                <span className="hidden sm:flex items-center gap-1">
                  <span>👥</span>
                  <span>{game.players}</span>
                </span>
              </>
            )}
            {game.playtime && (
              <>
                <span className="text-muted-foreground/50 hidden sm:inline">•</span>
                <span className="hidden sm:flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{game.playtime}</span>
                </span>
              </>
            )}
          </div>

          {/* Tags - Hide on smallest mobile */}
          <div className="hidden sm:flex flex-wrap gap-1.5 mb-3">
            {game.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs sm:text-sm font-medium px-2 py-1">
                {tag}
              </Badge>
            ))}
            {game.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs sm:text-sm font-medium px-2 py-1">
                +{game.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Bottom: Price and Actions - Better mobile layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-muted-foreground/20">
          {/* Price and External Links */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-shrink-0">
              <div className="text-xl sm:text-2xl font-bold tracking-tight">
                {game.price.toLocaleString()}{" "}
                <span className="text-sm sm:text-base font-normal text-muted-foreground">{game.currency}</span>
              </div>
            </div>
            
            {/* External Links - Show on mobile too, but smaller */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {game.bggLink && (
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="h-8 w-8 sm:h-9 sm:w-9 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 transition-colors touch-manipulation"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={game.bggLink} target="_blank" rel="noopener noreferrer" title={t("viewBGG")}>
                    <BGGLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </Button>
              )}
              {game.kickstarterLink && (
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="h-8 w-8 sm:h-9 sm:w-9 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 transition-colors touch-manipulation"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={game.kickstarterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t("viewKickstarter")}
                  >
                    <KickstarterLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          {/* Inquire Button - Better mobile sizing */}
          <Button
            size="default"
            className="w-full sm:w-auto min-w-[140px] shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base px-5 py-2.5 touch-manipulation"
            onClick={(e) => {
              e.stopPropagation()
              setContactDialogOpen(true)
            }}
          >
            {t("inquireGame")}
          </Button>
        </div>
      </div>

      {/* Contact Dialog */}
      <ContactDialog
        language={language}
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        game={game}
      />
    </div>
  )
}

