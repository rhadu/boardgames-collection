"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "./button"
import { Dialog, DialogContent, DialogTitle } from "./dialog"
import { cn } from "@/lib/utils"
import { getLightboxUrl, isCloudinaryUrl } from "@/lib/cloudinary"

type ImageLightboxProps = {
  images: string[]
  alt: string
  initialIndex?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

const LIGHTBOX_HISTORY_STATE_KEY = "__imageLightbox"

// Check if image is an external URL
const isExternalUrl = (src: string): boolean => {
  return src.startsWith("http://") || src.startsWith("https://")
}

export function ImageLightbox({
  images,
  alt,
  initialIndex = 0,
  open,
  onOpenChange,
}: ImageLightboxProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    startIndex: initialIndex,
  })
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const closeFromHistoryRef = useRef(false)
  const hasPushedHistoryRef = useRef(false)
  const pathnameWhenOpenedRef = useRef<string | null>(null)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()
    setSelectedIndex(newIndex)
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  // Preload adjacent images when selectedIndex changes
  useEffect(() => {
    if (!open) return
    
    // Preload previous image
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1
      const prevImg = document.querySelector(`img[data-lightbox-index="${prevIndex}"]`) as HTMLImageElement
      if (prevImg && !prevImg.complete && prevImg.src) {
        // Force load by creating a new image
        const preloadImg = document.createElement('img')
        preloadImg.src = prevImg.src
      }
    }
    
    // Preload next image
    if (selectedIndex < images.length - 1) {
      const nextIndex = selectedIndex + 1
      const nextImg = document.querySelector(`img[data-lightbox-index="${nextIndex}"]`) as HTMLImageElement
      if (nextImg && !nextImg.complete && nextImg.src) {
        // Force load by creating a new image
        const preloadImg = document.createElement('img')
        preloadImg.src = nextImg.src
      }
    }
  }, [selectedIndex, open, images.length])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  // Reset to initial index when opening
  useEffect(() => {
    if (open && emblaApi) {
      emblaApi.scrollTo(initialIndex)
    }
  }, [open, initialIndex, emblaApi])

  useEffect(() => {
    if (!open || typeof window === "undefined") return

    // Store the current pathname when opening
    pathnameWhenOpenedRef.current = window.location.pathname

    const handlePopState = () => {
      closeFromHistoryRef.current = true
      onOpenChange(false)
    }

    const currentState = (window.history.state ?? {}) as Record<string, unknown>
    const lightboxState = {
      ...currentState,
      [LIGHTBOX_HISTORY_STATE_KEY]: true,
    }

    try {
      window.history.pushState(lightboxState, "", window.location.href)
      hasPushedHistoryRef.current = true
    } catch (error) {
      hasPushedHistoryRef.current = false
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)

      if (closeFromHistoryRef.current) {
        closeFromHistoryRef.current = false
        hasPushedHistoryRef.current = false
        pathnameWhenOpenedRef.current = null
        return
      }

      if (
        hasPushedHistoryRef.current &&
        window.history.state &&
        (window.history.state as Record<string, unknown>)[LIGHTBOX_HISTORY_STATE_KEY]
      ) {
        // Only go back if we're still on the same pathname where the lightbox was opened
        // This prevents navigating to a different page (e.g., game detail page)
        const currentPathname = window.location.pathname
        if (currentPathname === pathnameWhenOpenedRef.current && window.history.length > 1) {
          window.history.back()
        } else {
          // If pathname changed, just replace the state to remove the lightbox state
          const stateWithoutLightbox = { ...window.history.state } as Record<string, unknown>
          delete stateWithoutLightbox[LIGHTBOX_HISTORY_STATE_KEY]
          window.history.replaceState(stateWithoutLightbox, "", window.location.href)
        }
      }

      hasPushedHistoryRef.current = false
      pathnameWhenOpenedRef.current = null
    }
  }, [open, onOpenChange])

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollPrev()
      } else if (e.key === "ArrowRight") {
        scrollNext()
      } else if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, scrollPrev, scrollNext, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none overflow-hidden"
        onClick={(e) => {
          // Prevent clicks inside the lightbox from bubbling to parent elements
          e.stopPropagation()
        }}
      >
        <DialogTitle className="sr-only">
          {alt} - Image {selectedIndex + 1} of {images.length}
        </DialogTitle>
        <div 
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onClick={(e) => {
            // Prevent clicks on the image container from bubbling
            e.stopPropagation()
          }}
        >
          {/* Close Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 border-white/20 text-white"
            onClick={() => onOpenChange(false)}
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Carousel Container */}
          <div className="w-full h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((image, index) => {
                const imageSrc = image || "/placeholder.svg"
                const isExternal = isExternalUrl(imageSrc)
                const isCloudinary = isCloudinaryUrl(imageSrc)
                // Always use optimized Cloudinary URLs, or original for non-Cloudinary
                const optimizedSrc = isCloudinary 
                  ? getLightboxUrl(imageSrc) 
                  : imageSrc

                // For Cloudinary URLs or external URLs, use <img> tag
                // For local Next.js images, use Next.js Image component
                const useImgTag = isExternal || isCloudinary

                // Load current image and adjacent images eagerly, others lazy
                const isCurrent = index === selectedIndex
                const isAdjacent = Math.abs(index - selectedIndex) === 1
                const shouldLoadEagerly = isCurrent || isAdjacent

                return (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center p-4 overflow-hidden"
                  >
                    {useImgTag ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={optimizedSrc}
                          alt={`${alt} - Image ${index + 1}`}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                          style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
                          loading={shouldLoadEagerly ? "eager" : "lazy"}
                          data-lightbox-index={index}
                          onError={(e) => {
                            // Fallback to original URL if optimized URL fails
                            console.error("Lightbox image failed to load:", optimizedSrc, "Falling back to:", imageSrc)
                            if (isCloudinary && optimizedSrc !== imageSrc) {
                              (e.target as HTMLImageElement).src = imageSrc
                            }
                          }}
                          onLoad={() => {
                            // Image loaded successfully
                          }}
                          onClick={(e) => {
                            // Prevent clicks on the image from closing the lightbox or navigating
                            e.stopPropagation()
                          }}
                        />
                      </div>
                    ) : (
                      <div 
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                        onClick={(e) => {
                          // Prevent clicks on the image container from closing the lightbox or navigating
                          e.stopPropagation()
                        }}
                      >
                        <Image
                          src={optimizedSrc}
                          alt={`${alt} - Image ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="90vw"
                          loading={index === initialIndex ? "eager" : "lazy"}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          {canScrollPrev && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 border-white/20 text-white z-40"
              onClick={scrollPrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {canScrollNext && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 border-white/20 text-white z-40"
              onClick={scrollNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm z-40">
              {selectedIndex + 1} / {images.length}
            </div>
          )}

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2 rounded-full transition-all cursor-pointer",
                    index === selectedIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/75"
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

