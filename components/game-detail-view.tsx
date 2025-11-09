"use client"

import { useState } from "react"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog"
import { ImageCarousel } from "@components/ui/image-carousel"
import { ImageLightbox } from "@components/ui/image-lightbox"
import {
  CheckCircle2,
  ExternalLink,
  Users,
  Clock,
  Calendar,
  Tag,
} from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import { type Game } from "@/lib/types"
import { BGGLogo } from "@components/logos/bgg-logo"
import { KickstarterLogo } from "@components/logos/kickstarter-logo"
import KSHover from "@components/ui/icons/ks-hover"
import { ContactDialog } from "@components/contact-dialog"

type GameDetailViewProps = {
  game: Game | null
  language: Language
  open: boolean
  onOpenChange: (open: boolean) => void
  isSelected: boolean
  onToggleSelection: () => void
}

export function GameDetailView({
  game,
  language,
  open,
  onOpenChange,
  isSelected,
  onToggleSelection,
}: GameDetailViewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const t = (key: Parameters<typeof getTranslation>[1]) =>
    getTranslation(language, key)

  if (!game) return null

  const images = game.images || [game.image]

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const getConditionBadge = () => {
    if (game.condition === "Factory Sealed") {
      return (
        <Badge className="bg-primary text-primary-foreground shadow-lg border-0 px-3 py-1.5 text-sm opacity-100">
          🎁 {t("sealed")}
        </Badge>
      )
    }
    if (game.condition === "Opened but Unplayed") {
      return (
        <Badge className="bg-primary text-primary-foreground shadow-lg border-0 px-3 py-1.5 text-sm opacity-100">
          ✨ {t("unplayed")}
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="px-3 py-1.5 text-sm opacity-100">
        {game.condition}
      </Badge>
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-[calc(100vw-2rem)] lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden xl:overflow-hidden p-0 gap-0">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {game.title} - {t("gameDetails")}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col lg:flex-row h-full max-h-[90vh] xl:overflow-hidden min-w-0">
            {/* Left Side - Images */}
            <div className="lg:w-1/2 w-full bg-muted/30 p-3 sm:p-4 lg:p-6 flex flex-col lg:max-h-[90vh] shrink-0 min-w-0">
              <div className="relative w-full max-w-full h-[280px] sm:h-[350px] lg:h-[500px] rounded-lg overflow-hidden bg-background shadow-lg">
                <ImageCarousel
                  images={images}
                  alt={game.title}
                  className="rounded-lg cursor-pointer h-full"
                  onImageClick={handleImageClick}
                  objectFit="contain"
                />
              </div>

              {/* Thumbnail Gallery - Hidden on mobile, visible on lg+ */}
              {images.length > 1 && (
                <div className="hidden lg:grid grid-cols-4 gap-2 mt-4">
                  {images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className="relative aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors bg-muted"
                    >
                      <img
                        src={image}
                        alt={`${game.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  {images.length > 4 && (
                    <button
                      onClick={() => handleImageClick(4)}
                      className="relative aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground"
                    >
                      +{images.length - 4}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="lg:w-1/2 w-full xl:overflow-hidden p-4 sm:p-6 lg:p-8 flex flex-col xl:max-h-[90vh] min-w-0">
              {/* Fixed Content Section */}
              <div className="space-y-6 shrink-0">
                {/* Header with Title and Selection */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2 leading-tight">
                      {game.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                      {game.year && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{game.year}</span>
                        </div>
                      )}
                      <span>•</span>
                      <span>{game.language}</span>
                    </div>
                  </div>
                  <button
                    onClick={onToggleSelection}
                    className={`shrink-0 w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-primary border-primary scale-110"
                        : "bg-background border-muted-foreground/30 hover:border-primary hover:scale-105"
                    }`}
                    aria-label={
                      isSelected ? t("deselectGame") : t("selectGame")
                    }
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                    )}
                  </button>
                </div>

                {/* Condition Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  {getConditionBadge()}
                  {game.isKickstarter && (
                    <Badge
                      variant="secondary"
                      className="text-secondary-foreground shadow-lg border-0 px-3 py-1.5 text-sm opacity-100"
                    >
                      <KSHover className="w-full h-full" />
                      {t("kickstarter")}
                    </Badge>
                  )}
                </div>

                {/* Game Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {game.players && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {t("players")}
                        </div>
                        <div className="font-semibold">{game.players}</div>
                      </div>
                    </div>
                  )}
                  {game.playtime && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {t("playtime")}
                        </div>
                        <div className="font-semibold">{game.playtime}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {game.tags.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {t("tags")}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-sm px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Scrollable Highlights Section (XL only) */}
              {game.highlights.length > 0 && (
                <div className="flex flex-col flex-1 min-h-0 mt-6 xl:mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3 shrink-0">
                    {t("highlights")}
                  </h3>
                  <ul className="space-y-2 overflow-y-auto xl:flex-1 min-h-0">
                    {game.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary mt-1 font-bold shrink-0">
                          •
                        </span>
                        <span className="text-sm leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fixed Content Section - Notes and Price */}
              <div className="space-y-6 shrink-0 mt-6">
                {/* Notes */}
                {game.notes && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      {t("notes")}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {game.notes}
                    </p>
                  </div>
                )}

                {/* Price Section */}
                <div className="pt-6 border-t border-muted-foreground/20">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold tracking-tight">
                      {game.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      {game.currency}
                    </span>
                  </div>

                  {/* External Links */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {game.bggLink && (
                      <Button
                        variant="outline"
                        className="group flex items-center gap-2 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground transition-colors"
                        asChild
                      >
                        <a
                          href={game.bggLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BGGLogo className="w-4 h-4" />
                          <span>{t("viewBGG")}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                    {game.kickstarterLink && (
                      <Button
                        variant="outline"
                        className="group flex items-center gap-2 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground transition-colors"
                        asChild
                      >
                        <a
                          href={game.kickstarterLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <KickstarterLogo className="w-4 h-4" />
                          <span>{t("viewKickstarter")}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Inquire Button */}
                  <Button className="w-full" size="lg" onClick={() => setContactDialogOpen(true)}>
                    {t("inquireGame")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      <ImageLightbox
        images={images}
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
        context="game"
        gameTitle={game.title}
      />
    </>
  )
}
