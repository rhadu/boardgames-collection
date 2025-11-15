import axios from "axios"
import * as cheerio from "cheerio"
import * as fs from "fs/promises"
import * as path from "path"

import { GAMES } from "../lib/data"
import type { Game } from "../lib/types"

const DEFAULT_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function parseLimit(args: string[]): number | null {
  if (args.length === 0) return null

  const idx = args.findIndex((a) => a === "--limit" || a === "-l")
  if (idx !== -1 && args[idx + 1]) {
    const n = Number.parseInt(args[idx + 1]!, 10)
    return Number.isFinite(n) && n > 0 ? n : null
  }

  const asNumber = Number.parseInt(args[0]!, 10)
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : null
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent": DEFAULT_UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      timeout: 15000,
    })

    return typeof res.data === "string" ? res.data : String(res.data)
  } catch (err: any) {
    console.error(`  ✗ Failed to fetch HTML for ${url}: ${err.message}`)
    return null
  }
}

function toAbsoluteUrl(url: string | undefined, baseUrl: string): string | null {
  if (!url) return null
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  if (url.startsWith("//")) return `https:${url}`

  try {
    return new URL(url, baseUrl).toString()
  } catch {
    return null
  }
}

/**
 * Extract image quality score from URL - higher is better.
 * Checks for size constraints and variant types.
 */
function getImageQualityScore(url: string): number {
  let score = 0

  // Prefer imagepagezoom (highest quality variant)
  if (url.includes("imagepagezoom")) {
    score += 1000
  } else if (url.includes("__imagepage")) {
    score += 500
  } else if (url.includes("itemheader")) {
    score += 300
  } else if (url.includes("itemimage")) {
    score += 200
  } else if (url.includes("itemrep")) {
    score += 100
  }

  // Prefer URLs without size constraints (original/full size)
  if (!url.includes("/fit-in/")) {
    score += 500
  } else {
    // Extract dimensions from fit-in pattern: fit-in/WxH
    const fitInMatch = url.match(/fit-in\/(\d+)x(\d+)/i)
    if (fitInMatch) {
      const width = Number.parseInt(fitInMatch[1]!, 10)
      const height = Number.parseInt(fitInMatch[2]!, 10)
      const area = width * height
      // Score based on area (larger = better)
      // Give more points for larger images
      if (area >= 1000000) {
        // 1000x1000 or larger
        score += 400
      } else if (area >= 500000) {
        // 700x700 or larger
        score += 300
      } else if (area >= 200000) {
        // 450x450 or larger
        score += 200
      } else {
        score += Math.min(area / 500, 100) // Smaller images get less points
      }
    }
  }

  // Prefer no_upscale filter (indicates original size)
  if (url.includes("no_upscale")) {
    score += 50
  }

  return score
}

/**
 * Score potential CDN image URLs so we can choose the "best" one.
 * We deliberately ignore "__opengraph" variants since those have been unreliable.
 */
function scoreCdnImageUrl(url: string): number {
  if (!url.includes("geekdo-images.com")) return -1
  if (!/pic\d+\.(jpg|jpeg|png|webp)/i.test(url)) return -1
  if (url.includes("__opengraph")) return -1

  return getImageQualityScore(url)
}

/**
 * Try to construct a higher quality URL from a found image URL.
 * Instead of removing constraints, we use a larger size limit.
 */
function tryGetHigherQualityUrl(url: string): string | null {
  // Extract pic ID
  const picMatch = url.match(/pic(\d+)\.(jpg|jpeg|png|webp)/i)
  if (!picMatch) return null

  const picId = picMatch[1]
  const ext = picMatch[2]!.toLowerCase()

  // Try to construct imagepagezoom URL (highest quality)
  // Pattern: https://cf.geekdo-images.com/{hash}__imagepagezoom/img/{path}/fit-in/{size}/filters:.../pic{id}.{ext}
  const urlMatch = url.match(
    /https?:\/\/cf\.geekdo-images\.com\/([^_]+)__[^/]+\/img\/([^/]+)\//,
  )

  if (urlMatch) {
    const hash = urlMatch[1]
    const imgPath = urlMatch[2]

    // Try imagepagezoom with larger size (2000x2000 for high quality)
    const zoomUrl = `https://cf.geekdo-images.com/${hash}__imagepagezoom/img/${imgPath}/fit-in/2000x2000/filters:no_upscale():strip_icc()/pic${picId}.${ext}`
    return zoomUrl
  }

  // If we can't construct zoom URL, try to increase size constraint instead of removing it
  if (url.includes("/fit-in/")) {
    // Replace small sizes with larger ones (2000x2000)
    const largerSizeUrl = url.replace(
      /\/fit-in\/\d+x\d+\//,
      "/fit-in/2000x2000/",
    )
    return largerSizeUrl
  }

  return null
}

function extractBestImageFromImagePage(
  html: string,
  pageUrl: string,
): string | null {
  const $ = cheerio.load(html)

  const candidates: { url: string; score: number }[] = []

  // First, check for preload links (BGG uses these for the main image on image pages)
  $('link[rel="preload"][as="image"]').each((_, el) => {
    const href = $(el).attr("href")
    if (!href) return

    const abs = toAbsoluteUrl(href, pageUrl)
    if (!abs) return

    const score = scoreCdnImageUrl(abs)
    if (score > 0) {
      candidates.push({ url: abs, score })
    }
  })

  // Then check img tags
  $("img").each((_, el) => {
    const src =
      $(el).attr("src") ||
      $(el).attr("data-src") ||
      $(el).attr("data-lazy-src") ||
      $(el).attr("data-original")

    if (!src) return

    const abs = toAbsoluteUrl(src, pageUrl)
    if (!abs) return

    const score = scoreCdnImageUrl(abs)
    if (score > 0) {
      candidates.push({ url: abs, score })
    }
  })

  // Fallback: scan raw HTML for any geekdo-images URLs with a pic id.
  if (candidates.length === 0) {
    const urlRegex =
      /https?:\/\/[^"'()\s]*geekdo-images\.com[^"'()\s]*pic\d+\.(?:jpg|jpeg|png|webp)/gi
    const seen = new Set<string>()
    let match: RegExpExecArray | null

    while ((match = urlRegex.exec(html)) !== null) {
      const raw = match[0]
      const abs = toAbsoluteUrl(raw, pageUrl)
      if (!abs || seen.has(abs)) continue
      seen.add(abs)

      const score = scoreCdnImageUrl(abs)
      if (score > 0) {
        candidates.push({ url: abs, score })
      }
    }
  }

  if (candidates.length === 0) {
    return null
  }

  // Sort by score (highest quality first)
  candidates.sort((a, b) => b.score - a.score)
  const bestCandidate = candidates[0]!

  // Use the best candidate we found - don't try to construct URLs as they might break
  // The scoring already prioritizes higher quality images (larger sizes, imagepagezoom, etc.)
  return bestCandidate.url
}

/**
 * From a BGG game page's HTML, extract the Open Graph image URL,
 * pull out its pic ID, and build the canonical image-page URL.
 *
 * We only use og:image to determine the image ID; we never use the
 * og:image URL itself, since those variants have been unreliable.
 */
function extractImagePageUrlFromOg(html: string): string | null {
  const ogMatch =
    html.match(
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
    ) ||
    html.match(
      /<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i,
    )

  if (!ogMatch) return null

  const ogUrl = ogMatch[1]
  const picMatch = ogUrl.match(/pic(\d+)\.(jpg|jpeg|png|webp)/i)
  if (!picMatch) return null

  const picId = picMatch[1]
  return `https://boardgamegeek.com/image/${picId}`
}

async function fetchCoverImageForGame(game: Game): Promise<string | null> {
  if (!game.bggLink) return null

  const gameUrl = game.bggLink
  const html = await fetchHtml(gameUrl)
  if (!html) return null

  const imagePageUrl = extractImagePageUrlFromOg(html)
  if (!imagePageUrl) {
    console.warn("  ✗ No image id (og:image) found on game page")
    return null
  }

  const imagePageHtml = await fetchHtml(imagePageUrl)
  if (!imagePageHtml) return null

  const imageUrl = extractBestImageFromImagePage(imagePageHtml, imagePageUrl)

  if (!imageUrl) {
    console.warn("  ✗ No suitable CDN image found on image page")
    return null
  }

  return imageUrl
}

/**
 * Update the data.ts file with all scraped images at once.
 * Uses the GAMES array to find games and updates their images arrays.
 */
async function updateDataFileWithImages(
  imageUpdates: Map<string, string>,
): Promise<void> {
  if (imageUpdates.size === 0) {
    console.log("\nNo images to update.")
    return
  }

  try {
    const dataFilePath = path.resolve(process.cwd(), "lib/data.ts")
    let content = await fs.readFile(dataFilePath, "utf-8")

    // Collect all updates with their positions, then process in reverse order
    // (from bottom to top) so earlier modifications don't affect later indices
    const updates: Array<{ gameId: string; imageUrl: string; position: number }> =
      []

    for (const [gameId, imageUrl] of imageUpdates.entries()) {
      const game = GAMES.find((g) => String(g.id) === gameId)
      if (!game || game.images.includes(imageUrl)) continue

      const escapedGameId = gameId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const gameIdPattern = new RegExp(`id:\\s*["']${escapedGameId}["']`)
      const gameIdMatch = content.match(gameIdPattern)
      if (gameIdMatch) {
        updates.push({
          gameId,
          imageUrl,
          position: gameIdMatch.index!,
        })
      }
    }

    // Sort by position in reverse order (process from bottom to top)
    updates.sort((a, b) => b.position - a.position)

    // Process each game that needs updating (in reverse order)
    for (const { gameId, imageUrl } of updates) {
      const game = GAMES.find((g) => String(g.id) === gameId)
      if (!game) {
        console.warn(`  ⚠ Game with id ${gameId} not found in GAMES array`)
        continue
      }

      // Check if image already exists
      if (game.images.includes(imageUrl)) {
        continue
      }

      // Find the game object in the file
      const escapedGameId = gameId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const gameIdPattern = new RegExp(`id:\\s*["']${escapedGameId}["']`)

      const gameIdMatch = content.match(gameIdPattern)
      if (!gameIdMatch) {
        console.warn(`  ⚠ Could not find game with id ${gameId} in data.ts`)
        continue
      }

      // Find the opening brace of this game object
      const beforeId = content.substring(0, gameIdMatch.index!)
      const lastBraceBeforeId = beforeId.lastIndexOf("{")
      if (lastBraceBeforeId === -1) continue

      // Find the matching closing brace
      const remainingContent = content.substring(lastBraceBeforeId)
      let braceCount = 0
      let gameEndIndex = 0
      for (let i = 0; i < remainingContent.length; i++) {
        if (remainingContent[i] === "{") braceCount++
        else if (remainingContent[i] === "}") {
          braceCount--
          if (braceCount === 0) {
            gameEndIndex = i + 1
            break
          }
        }
      }

      if (braceCount !== 0) continue

      const gameObjectContent = remainingContent.substring(0, gameEndIndex)

      // Find images array by counting brackets
      const imagesStartMatch = gameObjectContent.match(/images\s*:\s*\[/m)
      if (!imagesStartMatch) continue

      const imagesStartIndex = imagesStartMatch.index! + imagesStartMatch[0].length

      // Count brackets to find the closing bracket
      let bracketCount = 1
      let imagesEndIndex = imagesStartIndex
      for (let i = imagesStartIndex; i < gameObjectContent.length; i++) {
        if (gameObjectContent[i] === "[") bracketCount++
        else if (gameObjectContent[i] === "]") {
          bracketCount--
          if (bracketCount === 0) {
            imagesEndIndex = i
            break
          }
        }
      }

      if (bracketCount !== 0) continue

      const existingImagesContent = gameObjectContent
        .substring(imagesStartIndex, imagesEndIndex)
        .trim()
      const imagesArrayStart = imagesStartMatch.index! + imagesStartMatch[0].indexOf("[") + 1

      // Build new images array content
      let newImagesContent: string
      if (existingImagesContent.length === 0) {
        newImagesContent = `\n      "${imageUrl}",`
      } else {
        // Remove any trailing comma and add new image
        const cleaned = existingImagesContent.replace(/,\s*$/, "").trim()
        newImagesContent = `${cleaned},\n      "${imageUrl}",`
      }

      // Replace images array in game object
      const newGameObjectContent =
        gameObjectContent.substring(0, imagesArrayStart) +
        newImagesContent +
        "\n    " +
        gameObjectContent.substring(imagesEndIndex)

      // Replace game object in full content
      content =
        content.substring(0, lastBraceBeforeId) +
        newGameObjectContent +
        content.substring(lastBraceBeforeId + gameEndIndex)
    }

    await fs.writeFile(dataFilePath, content, "utf-8")
    console.log(`\n✓ Updated data.ts with ${imageUpdates.size} image(s)`)
  } catch (err: any) {
    console.error(`\n✗ Failed to update data.ts: ${err.message}`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const limit = parseLimit(args)

  const gamesWithLinks = GAMES.filter((g) => !!g.bggLink)

  const selected =
    limit && limit > 0 ? gamesWithLinks.slice(0, limit) : gamesWithLinks

  console.log(
    `Found ${gamesWithLinks.length} games with BGG links. Processing ${selected.length} game(s).\n`,
  )

  const results: Array<{ id: string; title: string; image: string | null }> = []
  const imageUpdates = new Map<string, string>() // gameId -> imageUrl

  // Scrape all images first
  for (let i = 0; i < selected.length; i++) {
    const game = selected[i]!
    console.log(`[${i + 1}/${selected.length}] ${game.title}`)

    try {
      const cover = await fetchCoverImageForGame(game)
      if (cover) {
        console.log(`  ✓ Cover image: ${cover}`)
        // Check if image already exists in the game's images array
        if (!game.images.includes(cover)) {
          imageUpdates.set(String(game.id), cover)
        } else {
          console.log(`  ℹ Image already exists in game data`)
        }
        console.log("")
      } else {
        console.log("  ✗ No cover image found\n")
      }
      results.push({ id: String(game.id), title: game.title, image: cover })
    } catch (err: any) {
      console.error(
        `  ✗ Error while scraping cover for "${game.title}": ${err.message}`,
      )
      results.push({ id: String(game.id), title: game.title, image: null })
    }

    if (i < selected.length - 1) {
      await sleep(1200)
    }
  }

  // Update data.ts file with all images at once
  if (imageUpdates.size > 0) {
    await updateDataFileWithImages(imageUpdates)
  }

  console.log("\nJSON result (id, title, image):\n")
  console.log(JSON.stringify(results, null, 2))
}

void main()


