"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { GAMES } from "@/lib/data"
import { slugify } from "@/lib/utils"
import { GameDetailPage } from "@components/game-detail-page"

export default function GameDetailPageRoute() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const game = useMemo(() => {
    if (!slug) return null
    return GAMES.find((g) => slugify(g.title) === slug)
  }, [slug])

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Game not found</h1>
          <button
            onClick={() => router.push("/")}
            className="text-primary hover:underline"
          >
            Return to collection
          </button>
        </div>
      </div>
    )
  }

  return <GameDetailPage game={game} />
}

