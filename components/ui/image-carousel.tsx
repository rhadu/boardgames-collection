"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ImageLightbox } from "./image-lightbox"
import { cn } from "@/lib/utils"

export type ImageCarouselHandle = {
  scrollTo: (index: number) => void
}

type ImageCarouselProps = {
  images: string[]
  alt: string
  className?: string
  onImageClick?: (index: number) => void
  objectFit?: "cover" | "contain"
  onIndexChange?: (index: number) => void
}

// Check if image is an external URL
const isExternalUrl = (src: string): boolean => {
  return src.startsWith("http://") || src.startsWith("https://")
}

export const ImageCarousel = forwardRef<ImageCarouselHandle, ImageCarouselProps>(
  function ImageCarousel(
    { images, alt, className, onImageClick, objectFit = "cover", onIndexChange }: ImageCarouselProps,
    ref,
  ) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useImperativeHandle(
    ref,
    () => ({
      scrollTo: (index: number) => {
        if (!emblaApi) return
        emblaApi.scrollTo(index)
      },
    }),
    [emblaApi],
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setSelectedIndex(index)
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
    onIndexChange?.(index)
  }, [emblaApi, onIndexChange])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

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

  useEffect(() => {
    if (images.length <= 1) {
      onIndexChange?.(0)
    }
  }, [images.length, onIndexChange])

  useEffect(() => {
    setLightboxIndex(selectedIndex)
  }, [selectedIndex])

  // Don't render carousel if only one image
  if (images.length <= 1) {
    const imageSrc = images[0] || "/placeholder.svg"
    const isExternal = isExternalUrl(imageSrc)
    const imageFitClass = objectFit === "contain" ? "object-contain" : "object-cover"
    const containerClass = objectFit === "contain" 
      ? "relative overflow-hidden bg-muted cursor-pointer flex items-center justify-center h-full"
      : "relative aspect-square overflow-hidden bg-muted cursor-pointer"
    
    return (
      <>
        <div
          className={cn(containerClass, "w-full", className)}
          onClick={() => onImageClick ? onImageClick(0) : openLightbox(0)}
        >
          {isExternal ? (
            <img
              src={imageSrc}
              alt={alt}
              className={cn(
                objectFit === "contain" 
                  ? "max-w-full max-h-full w-auto h-auto"
                  : "absolute inset-0 w-full h-full",
                imageFitClass,
                "transition-transform duration-300 hover:scale-105"
              )}
            />
          ) : objectFit === "contain" ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={alt}
                width={800}
                height={800}
                className={cn(imageFitClass, "transition-transform duration-300 hover:scale-105 max-w-full max-h-full")}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className={cn(imageFitClass, "transition-transform duration-300 hover:scale-105")}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        {!onImageClick && (
          <ImageLightbox
            images={images}
            alt={alt}
            initialIndex={lightboxIndex}
            open={lightboxOpen}
            onOpenChange={setLightboxOpen}
          />
        )}
      </>
    )
  }

  const imageFitClass = objectFit === "contain" ? "object-contain" : "object-cover"
  const slideContainerClass = objectFit === "contain"
    ? "relative overflow-hidden bg-muted cursor-pointer flex items-center justify-center"
    : "relative aspect-square overflow-hidden bg-muted cursor-pointer"

  return (
    <>
      <div className={cn("relative group w-full", className)}>
        <div className={cn("overflow-hidden w-full", objectFit === "contain" && "h-full", className)} ref={emblaRef}>
          <div className={cn("flex w-full", objectFit === "contain" && "h-full")}>
            {images.map((image, index) => {
              const imageSrc = image || "/placeholder.svg"
              const isExternal = isExternalUrl(imageSrc)
              
              return (
                <div key={index} className={cn("flex-[0_0_100%] min-w-0 w-full", objectFit === "contain" && "h-full")}>
                  <div
                    className={cn(slideContainerClass, objectFit === "contain" && "h-full w-full")}
                    onClick={() => onImageClick ? onImageClick(index) : openLightbox(index)}
                  >
                    {isExternal ? (
                      <img
                        src={imageSrc}
                        alt={`${alt} - Image ${index + 1}`}
                        className={cn(
                          objectFit === "contain"
                            ? "max-w-full max-h-full w-auto h-auto"
                            : "absolute inset-0 w-full h-full",
                          imageFitClass,
                          "transition-transform duration-500 group-hover:scale-110"
                        )}
                      />
                    ) : objectFit === "contain" ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={imageSrc}
                          alt={`${alt} - Image ${index + 1}`}
                          width={800}
                          height={800}
                          className={cn(imageFitClass, "transition-transform duration-500 group-hover:scale-110 max-w-full max-h-full")}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <Image
                        src={imageSrc}
                        alt={`${alt} - Image ${index + 1}`}
                        fill
                        className={cn(imageFitClass, "transition-transform duration-500 group-hover:scale-110")}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      {/* Navigation Buttons */}
      {canScrollPrev && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-primary shadow-lg border-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all z-20 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group/btn cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            scrollPrev()
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-black group-hover/btn:text-primary-foreground transition-colors" />
        </button>
      )}

      {canScrollNext && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-primary shadow-lg border-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all z-20 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group/btn cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            scrollNext()
          }}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-black group-hover/btn:text-primary-foreground transition-colors" />
        </button>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all cursor-pointer",
                index === selectedIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/75"
              )}
              onClick={(e) => {
                e.stopPropagation()
                emblaApi?.scrollTo(index)
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      {!onImageClick && (
        <ImageLightbox
          images={images}
          alt={alt}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
        />
      )}
    </>
  )
})

