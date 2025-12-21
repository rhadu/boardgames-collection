"use client"

import { useMemo, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { GAMES } from "@/lib/data"
import { slugify } from "@/lib/utils"
import { GameDetailPage } from "@components/game-detail-page"
import { type Language, translations, getTranslation } from "@/lib/i18n"
import { getConditionTranslationKey } from "@/lib/types"

export default function GameDetailPageRoute() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const langParam = searchParams.get("lang")
  const language: Language = langParam === "en" ? "en" : "ro"
  const slug = params?.slug as string

  const game = useMemo(() => {
    if (!slug) return null
    return GAMES.find((g) => slugify(g.title) === slug)
  }, [slug])

  // Update document title, lang attribute, and meta description based on game and locale
  useEffect(() => {
    document.documentElement.lang = language
    
    if (!game) {
      return
    }
    
    const t = translations[language]
    const conditionKey = getConditionTranslationKey(game.condition)
    const conditionText = getTranslation(language, conditionKey as any)
    
    const title = t.gameDetailTitle.replace("{{title}}", game.title)
    const description = t.gameDetailDescription
      .replace("{{title}}", game.title)
      .replace("{{condition}}", conditionText)
      .replace("{{price}}", game.price.toString())
      .replace("{{description}}", game.highlights && Array.isArray(game.highlights) 
        ? game.highlights[0] || "" 
        : (typeof game.highlights === "object" && game.highlights[language]?.[0]) || "")
    
    document.title = title
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", description)
    }
  }, [game, language])

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "ro" ? "Jocul nu a fost găsit" : "Game not found"}
          </h1>
          <button
            onClick={() => router.push(language === "en" ? "/?lang=en" : "/")}
            className="text-primary hover:underline"
          >
            {language === "ro" ? "Înapoi la colecție" : "Return to collection"}
          </button>
        </div>
      </div>
    )
  }

  return <GameDetailPage game={game} language={language} />
}

