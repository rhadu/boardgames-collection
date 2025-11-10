"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { startViewTransition } from "@components/view-transition"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { ImageCarousel } from "@components/ui/image-carousel"
import { ImageLightbox } from "@components/ui/image-lightbox"
import { CheckCircle2 } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import { type Game, GameCondition } from "@/lib/types"
import { BGGLogo } from "@components/logos/bgg-logo"
import { KickstarterLogo } from "@components/logos/kickstarter-logo"
import { ContactDialog } from "@components/contact-dialog"
import { slugify } from "@/lib/utils"

type GameCardProps = {
  game: Game
  language: Language
  isSelected: boolean
  onToggleSelection: () => void
}

export function GameCard({ game, language, isSelected, onToggleSelection }: GameCardProps) {
  const router = useRouter()
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const gameSlug = slugify(game.title)
  const baseGamePath = `/games/${gameSlug}`
  const gameUrl = language === "en" ? `${baseGamePath}?lang=en` : baseGamePath

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if lightbox is open
    if (lightboxOpen) {
      return
    }
    
    // Don't navigate if clicking on buttons, links, or the image area
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]') ||
      target.closest('[data-image-area]') || // Image area
      target.closest('[role="dialog"]') || // Dialog/lightbox
      target.closest('[data-radix-portal]') // Radix UI portal (where dialogs are rendered)
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
    <Card
      className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-muted-foreground/20 p-0 cursor-pointer ${
        isSelected ? "ring-2 ring-primary ring-offset-2 shadow-lg" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-xl" data-image-area>
        <ImageCarousel
          images={game.images}
          alt={game.title}
          className="rounded-t-xl"
          onImageClick={handleImageClick}
        />

        {/* Selection Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleSelection()
          }}
          className={`absolute top-3 left-3 w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all backdrop-blur-sm shadow-lg z-20 ${
            isSelected
              ? "bg-primary border-primary scale-110"
              : "bg-white/95 border-white/95 hover:bg-white hover:scale-105"
          }`}
        >
          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
        </button>

        {/* Condition Badge */}
        <div className="absolute top-3 right-3 z-20">
          {game.condition === GameCondition.FACTORY_SEALED && (
            <Badge className="bg-sealed text-white shadow-lg backdrop-blur-sm border-0 px-2.5 py-1">
              🎁 {t("sealed")}
            </Badge>
          )}
          {game.condition === GameCondition.OPENED_UNPLAYED && (
            <Badge className="bg-primary text-primary-foreground shadow-lg backdrop-blur-sm border-0 px-2.5 py-1">
              ✨ {t("unplayed")}
            </Badge>
          )}
        </div>

        {/* Kickstarter Badge */}
        {game.isKickstarter && (
          <div className="absolute bottom-3 left-3 z-20">
            <Badge className="bg-kickstarter text-white shadow-lg backdrop-blur-sm border-0 px-2.5 py-1">
              ⚡ {t("kickstarter")}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <Link
            href={gameUrl}
            onClick={(e) => {
              e.preventDefault()
              // Save scroll position before navigating
              sessionStorage.setItem("mainPageScrollPosition", window.scrollY.toString())
              startViewTransition(() => {
                router.push(gameUrl)
              })
            }}
          >
            <h3 className="font-bold text-xl mb-2 leading-tight text-balance group-hover:text-primary transition-colors cursor-pointer">
              {game.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {game.year && <span>{game.year}</span>}
            <span>•</span>
            <span>{game.language}</span>
          </div>
        </div>

        {/* Game Info */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
          {game.players && (
            <span className="flex items-center gap-1.5">
              <span>👥</span>
              <span className="font-medium">{game.players}</span>
            </span>
          )}
          {game.playtime && (
            <span className="flex items-center gap-1.5">
              <span>⏱️</span>
              <span className="font-medium">{game.playtime}</span>
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {game.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-medium px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Highlights */}
        <ul className="text-sm space-y-1.5 mb-5">
          {game.highlights.slice(0, 2).map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary mt-0.5 font-bold">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-muted-foreground/20 mb-4">
          <div>
            <div className="text-3xl font-bold tracking-tight">
              {game.price.toLocaleString()}{" "}
              <span className="text-base font-normal text-muted-foreground">{game.currency}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {game.bggLink && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 transition-colors"
              >
                <a href={game.bggLink} target="_blank" rel="noopener noreferrer" title={t("viewBGG")}>
                  <BGGLogo className="w-4 h-4" />
                </a>
              </Button>
            )}
            {game.kickstarterLink && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 transition-colors"
              >
                <a
                  href={game.kickstarterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t("viewKickstarter")}
                >
                  <KickstarterLogo className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <Button 
          className="w-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]" 
          variant="default"
          onClick={(e) => {
            e.stopPropagation()
            setContactDialogOpen(true)
          }}
        >
          {t("inquireGame")}
        </Button>
      </CardContent>

      {/* Image Lightbox */}
      <ImageLightbox
        images={game.images}
        alt={game.title}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />

      {/* Contact Dialog */}
      <ContactDialog
        language={language}
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        game={game}
      />
    </Card>
  )
}

