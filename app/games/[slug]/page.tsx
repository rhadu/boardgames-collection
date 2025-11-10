"use client"

import { useMemo } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { GAMES } from "@/lib/data"
import { slugify } from "@/lib/utils"
import { GameDetailPage } from "@components/game-detail-page"
import { type Language } from "@/lib/i18n"

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

