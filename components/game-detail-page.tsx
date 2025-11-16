"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { startViewTransition } from "@components/view-transition"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import {
  ImageCarousel,
  type ImageCarouselHandle,
} from "@components/ui/image-carousel"
import { ImageLightbox } from "@components/ui/image-lightbox"
import {
  ArrowLeft,
  ExternalLink,
  Users,
  Clock,
  Calendar,
  Tag,
} from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import { type Game, GameCondition, getConditionTranslationKey } from "@/lib/types"
import { BGGLogo } from "@components/logos/bgg-logo"
import { KickstarterLogo } from "@components/logos/kickstarter-logo"
import KSHover from "@components/ui/icons/ks-hover"
import { ContactDialog } from "@components/contact-dialog"
import { getThumbnailUrl, isCloudinaryUrl } from "@/lib/cloudinary"

type GameDetailPageProps = {
  game: Game
  language?: Language
}

export function GameDetailPage({ game, language = "ro" }: GameDetailPageProps) {
  const router = useRouter()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const carouselRef = useRef<ImageCarouselHandle | null>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])
  const t = (key: Parameters<typeof getTranslation>[1]) =>
    getTranslation(language, key)
  const collectionPath = language === "en" ? "/?lang=en" : "/"

  const images = game.images

  const handleCarouselIndexChange = useCallback((index: number) => {
    setActiveImageIndex(index)
    setLightboxIndex(index)
  }, [])

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleThumbnailClick = (index: number) => {
    carouselRef.current?.scrollTo(index)
  }

  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[activeImageIndex]
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [activeImageIndex])

  const getConditionBadge = () => {
    if (game.condition === GameCondition.FACTORY_SEALED) {
      return (
        <Badge className="bg-primary text-primary-foreground shadow-lg border-0 px-3 py-1.5 text-sm opacity-100">
          🎁 {t("sealed")}
        </Badge>
      )
    }
    if (game.condition === GameCondition.OPENED_UNPLAYED) {
      return (
        <Badge className="bg-primary text-primary-foreground shadow-lg border-0 px-3 py-1.5 text-sm opacity-100">
          ✨ {t("unplayed")}
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="px-3 py-1.5 text-sm opacity-100">
        {t(getConditionTranslationKey(game.condition) as Parameters<typeof getTranslation>[1])}
      </Badge>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="sticky top-0 z-30 bg-background container mx-auto px-4 py-4 sm:py-6 max-w-[1280px]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              startViewTransition(() => {
                router.push(collectionPath)
              })
            }}
            className="text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "ro" ? "Înapoi la colecție" : "Back to collection"}
          </Button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Side - Images */}
            <div className="lg:w-1/2 w-full bg-muted/30 p-3 sm:p-4 lg:p-6 rounded-lg flex flex-col shrink-0 lg:sticky lg:top-28 lg:self-start">
              <div className="relative w-full max-w-full h-[280px] sm:h-[350px] lg:h-[500px] rounded-lg overflow-hidden bg-background shadow-lg">
                <ImageCarousel
                  ref={carouselRef}
                  images={images}
                  alt={game.title}
                  className="rounded-lg cursor-pointer h-full"
                  onImageClick={handleImageClick}
                  objectFit="contain"
                  onIndexChange={handleCarouselIndexChange}
                  imageSize="carousel"
                />
              </div>

              {/* Thumbnail Gallery - Hidden on mobile, visible on lg+ */}
              {images.length > 1 && (
                <div className="mt-4">
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                    {images.map((image, index) => {
                      const thumbnailSrc = isCloudinaryUrl(image) 
                        ? getThumbnailUrl(image) 
                        : image
                      return (
                        <button
                          key={index}
                          ref={(el) => {
                            thumbnailRefs.current[index] = el
                          }}
                          onClick={() => handleThumbnailClick(index)}
                          className={`relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors duration-200 bg-muted ${
                            activeImageIndex === index
                              ? "border-primary shadow-md"
                              : "border-transparent hover:border-primary/60"
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <img
                            src={thumbnailSrc}
                            alt={`${game.title} - ${index + 1}`}
                            className="h-full w-full object-cover"
                            loading="eager"
                            onError={(e) => {
                              console.error("Thumbnail failed to load:", thumbnailSrc, "Falling back to:", image)
                              if (isCloudinaryUrl(image) && thumbnailSrc !== image) {
                                (e.target as HTMLImageElement).src = image
                              }
                            }}
                            onLoad={() => {
                              // Thumbnail loaded successfully
                            }}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="lg:w-1/2 w-full p-4 sm:p-6 lg:p-8 flex flex-col">
              {/* Fixed Content Section */}
              <div className="space-y-6 shrink-0">
                {/* Header with Title */}
                <div>
                  <h1 className="text-3xl font-bold mb-2 leading-tight">
                    {game.title}
                  </h1>
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

              {/* Scrollable Highlights Section */}
              {game.highlights.length > 0 && (
                <div className="flex flex-col flex-1 min-h-0 mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3 shrink-0">
                    {t("highlights")}
                  </h3>
                  <ul className="space-y-2">
                    {game.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary text-sm font-bold shrink-0">
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
        </div>
      </div>

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
        game={game}
      />
    </>
  )
}

