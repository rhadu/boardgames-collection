import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { config } from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import { GAMES } from "../lib/data"
import type { Game } from "../lib/types"

// Load environment variables from .env file
config()

// Configure Cloudinary
// You can set these via environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
// Or update them directly here (not recommended for production)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "vfbaby",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
})

const CLOUDINARY_BASE_PATH = "boardgames"
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/vfbaby/image/upload"

interface CloudinaryResource {
  public_id: string
  secure_url: string
  folder?: string
}

/**
 * Fetch all images from Cloudinary for a specific folder
 */
async function fetchImagesForFolder(folderPath: string): Promise<string[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folderPath} AND resource_type:image`)
      .sort_by("created_at", "asc")
      .max_results(500)
      .execute()

    const images: string[] = []
    
    if (result.resources && Array.isArray(result.resources)) {
      for (const resource of result.resources as CloudinaryResource[]) {
        // Use the secure_url if available, otherwise construct from public_id
        let url: string
        if (resource.secure_url) {
          url = resource.secure_url
        } else {
          // Build the full URL from public_id
          // public_id already includes the folder path
          url = `${CLOUDINARY_BASE_URL}/${resource.public_id}`
          // Add .jpg extension if not present
          if (!url.match(/\.(jpg|jpeg|png|webp)$/i)) {
            url += ".jpg"
          }
        }
        images.push(url)
      }
    }

    return images
  } catch (error: any) {
    console.error(`Error fetching images for ${folderPath}:`, error.message)
    return []
  }
}

/**
 * Update the data.ts file with Cloudinary images
 */
function updateDataFile(updates: Map<string, string[]>) {
  const dataFilePath = join(process.cwd(), "lib/data.ts")
  let content = readFileSync(dataFilePath, "utf-8")

  // For each game, update its images array
  for (const [slug, cloudinaryImages] of updates.entries()) {
    // Find the game entry by slug
    const slugPattern = new RegExp(
      `slug:\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",`,
      "g"
    )

    let match
    while ((match = slugPattern.exec(content)) !== null) {
      const slugIndex = match.index
      
      // Find the images array for this game
      // Look for the images property after the slug (handle multiline arrays)
      const afterSlug = content.substring(slugIndex)
      // Match images array that may span multiple lines
      const imagesMatch = afterSlug.match(/images:\s*\[([\s\S]*?)\]/)
      
      if (imagesMatch) {
        const imagesStart = slugIndex + imagesMatch.index! + imagesMatch[0].indexOf("[")
        const imagesEnd = slugIndex + imagesMatch.index! + imagesMatch[0].length
        
        // Parse existing images from the array
        const existingImagesContent = imagesMatch[1]
        const existingImages: string[] = []
        
        // Extract URLs from the existing array (handle both single-line and multi-line)
        const urlPattern = /"([^"]+)"/g
        let urlMatch
        while ((urlMatch = urlPattern.exec(existingImagesContent)) !== null) {
          const url = urlMatch[1]
          // Keep existing images that are not from Cloudinary boardgames folder
          if (url && !url.includes(`${CLOUDINARY_BASE_PATH}/${slug}`)) {
            existingImages.push(url)
          }
        }
        
        // Combine: existing non-Cloudinary images first, then Cloudinary images
        const allImages = [...existingImages, ...cloudinaryImages]
        const newImagesArray = `[\n${allImages.map((url) => `      "${url}",`).join("\n")}\n    ]`
        
        content =
          content.substring(0, imagesStart) +
          newImagesArray +
          content.substring(imagesEnd)
        
        console.log(`✓ Updated ${slug}: ${cloudinaryImages.length} Cloudinary images (${existingImages.length} existing kept)`)
        break // Only update the first match (should be unique)
      }
    }
  }

  writeFileSync(dataFilePath, content, "utf-8")
  console.log(`\n✓ Updated data.ts file`)
}

/**
 * Main function
 */
async function main() {
  // Check if API credentials are provided
  const apiKey = process.env.CLOUDINARY_API_KEY || ""
  const apiSecret = process.env.CLOUDINARY_API_SECRET || ""

  if (!apiKey || !apiSecret) {
    console.error("Error: Cloudinary API credentials are required!")
    console.error("\nPlease set the following environment variables:")
    console.error("  CLOUDINARY_API_KEY=your_api_key")
    console.error("  CLOUDINARY_API_SECRET=your_api_secret")
    console.error("\nOr create a .env file with these variables.")
    console.error("\nYou can find your credentials in the Cloudinary Dashboard:")
    console.error("  https://console.cloudinary.com/console")
    process.exit(1)
  }

  console.log("Fetching images from Cloudinary...\n")

  const updates = new Map<string, string[]>()

  // Fetch images for each game
  for (const game of GAMES) {
    const folderPath = `${CLOUDINARY_BASE_PATH}/${game.slug}`
    console.log(`Fetching images for: ${game.slug}...`)
    
    const images = await fetchImagesForFolder(folderPath)
    
    if (images.length > 0) {
      updates.set(game.slug, images)
      console.log(`  Found ${images.length} images`)
    } else {
      console.log(`  No images found`)
    }
  }

  console.log(`\n${updates.size} games have Cloudinary images`)

  if (updates.size > 0) {
    console.log("\nUpdating data.ts...")
    updateDataFile(updates)
    console.log("\n✓ Done!")
  } else {
    console.log("\nNo images to update.")
  }
}

// Run the script
main().catch((error) => {
  console.error("Error:", error)
  process.exit(1)
})

