import type { Metadata } from "next"
import { GAMES } from "@/lib/data"
import { slugify } from "@/lib/utils"
import { translations, getTranslation, type Language } from "@/lib/i18n"
import { getConditionTranslationKey } from "@/lib/types"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // Default to Romanian for server-side rendering
  // Client-side code will update based on searchParams
  const language: Language = "ro"
  
  const game = GAMES.find((g) => slugify(g.title) === slug)
  
  if (!game) {
    const t = translations[language]
    return {
      title: language === "ro" ? "Jocul nu a fost găsit" : "Game not found",
      description: t.siteDescription,
    }
  }

  const t = translations[language]
  const conditionKey = getConditionTranslationKey(game.condition)
  const conditionText = getTranslation(language, conditionKey as any)
  
  const title = t.gameDetailTitle.replace("{{title}}", game.title)
  
  // Get description text
  let descriptionText = ""
  if (game.highlights) {
    if (Array.isArray(game.highlights)) {
      descriptionText = game.highlights[0] || ""
    } else if (typeof game.highlights === "object") {
      descriptionText = game.highlights[language]?.[0] || game.highlights[language === "ro" ? "en" : "ro"]?.[0] || ""
    }
  }
  
  const description = t.gameDetailDescription
    .replace("{{title}}", game.title)
    .replace("{{condition}}", conditionText)
    .replace("{{price}}", game.price.toString())
    .replace("{{description}}", descriptionText)

  const imageUrl = game.images && game.images.length > 0 ? game.images[0] : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default function GameDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

