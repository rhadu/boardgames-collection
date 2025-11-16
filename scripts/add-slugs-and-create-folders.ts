import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"

// Function to generate a slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace special characters and spaces with hyphens
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    // Remove multiple consecutive hyphens
    .replace(/-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, "")
}

// Read the data.ts file
const dataFilePath = join(process.cwd(), "lib/data.ts")
let content = readFileSync(dataFilePath, "utf-8")

// Extract game titles and add slugs
const titlePattern = /title:\s*"([^"]+)",/g
const games: Array<{ title: string; slug: string }> = []

let match
while ((match = titlePattern.exec(content)) !== null) {
  const title = match[1]
  const slug = generateSlug(title)
  games.push({
    title,
    slug,
  })
}

console.log(`Found ${games.length} games`)

// Add slug property after title for each game using regex replacement
let updatedContent = content

for (const game of games) {
  // Create a regex that matches the title line, but only if slug doesn't already exist after it
  const titleRegex = new RegExp(
    `(title:\\s*"${game.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",)(?!\\s*\\n\\s*slug:)`,
    "g"
  )
  
  // Replace with title + slug
  updatedContent = updatedContent.replace(
    titleRegex,
    `$1\n    slug: "${game.slug}",`
  )
}

// Write the updated file
writeFileSync(dataFilePath, updatedContent, "utf-8")
console.log(`✓ Updated data.ts with slug properties`)

// Create folders in the parent directory of catan
const parentDir = "/Users/radu/Downloads/Photos-1-001 (1)"

if (!existsSync(parentDir)) {
  console.error(`✗ Parent directory does not exist: ${parentDir}`)
  process.exit(1)
}

console.log(`\nCreating folders in: ${parentDir}`)

let createdCount = 0
let existingCount = 0

for (const game of games) {
  const folderPath = join(parentDir, game.slug)
  try {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true })
      console.log(`✓ Created folder: ${game.slug}`)
      createdCount++
    } else {
      console.log(`- Folder already exists: ${game.slug}`)
      existingCount++
    }
  } catch (error: any) {
    console.error(`✗ Error creating folder ${game.slug}:`, error.message)
  }
}

console.log(`\n✓ Done!`)
console.log(`  - Created: ${createdCount} folders`)
console.log(`  - Already existed: ${existingCount} folders`)
console.log(`  - Total: ${games.length} folders`)
