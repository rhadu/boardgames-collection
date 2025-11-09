"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "./button"
import { Dialog, DialogContent, DialogTitle } from "./dialog"
import { cn } from "@/lib/utils"

type ImageLightboxProps = {
  images: string[]
  alt: string
  initialIndex?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

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
        className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none"
        onClick={(e) => {
          // Prevent clicks inside the lightbox from bubbling to parent elements
          e.stopPropagation()
        }}
      >
        <DialogTitle className="sr-only">
          {alt} - Image {selectedIndex + 1} of {images.length}
        </DialogTitle>
        <div 
          className="relative w-full h-full flex items-center justify-center"
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

                return (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center p-4"
                  >
                    {isExternal ? (
                      <img
                        src={imageSrc}
                        alt={`${alt} - Image ${index + 1}`}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                        onClick={(e) => {
                          // Prevent clicks on the image from closing the lightbox or navigating
                          e.stopPropagation()
                        }}
                      />
                    ) : (
                      <div 
                        className="relative w-full h-full max-w-full max-h-full"
                        onClick={(e) => {
                          // Prevent clicks on the image container from closing the lightbox or navigating
                          e.stopPropagation()
                        }}
                      >
                        <Image
                          src={imageSrc}
                          alt={`${alt} - Image ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="90vw"
                          unoptimized
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

