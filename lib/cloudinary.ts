/**
 * Cloudinary URL transformation utility
 * Documentation: https://cloudinary.com/documentation/image_transformations
 */

export type ImageSize = 'thumbnail' | 'carousel' | 'lightbox' | 'full'

/**
 * Check if a URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com')
}

/**
 * Transform a Cloudinary URL with optimization parameters
 * 
 * @param url - Original Cloudinary URL
 * @param size - Size preset: 'thumbnail' (400px), 'carousel' (800px), 'lightbox' (1920px), or 'full' (original)
 * @param options - Additional transformation options
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  size: ImageSize = 'carousel',
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'jpg' | 'png'
  } = {}
): string {
  if (!isCloudinaryUrl(url)) {
    return url
  }

  // Define size presets
  const sizePresets: Record<ImageSize, { width: number; height: number; quality: number }> = {
    thumbnail: { width: 400, height: 400, quality: 80 },
    carousel: { width: 800, height: 800, quality: 85 },
    lightbox: { width: 1920, height: 1080, quality: 90 },
    full: { width: 0, height: 0, quality: 95 }, // 0 means no limit
  }

  const preset = sizePresets[size]
  const width = options.width ?? preset.width
  const height = options.height ?? preset.height
  const quality = options.quality ?? preset.quality
  const format = options.format ?? 'auto'

  // Parse the Cloudinary URL
  // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{version}/{public_id}.{format}
  // Or: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{public_id}.{format}
  const urlParts = url.split('/upload/')
  
  if (urlParts.length !== 2) {
    // URL doesn't match expected format, return as-is
    return url
  }

  const baseUrl = urlParts[0] + '/upload'
  let restOfPath = urlParts[1]
  
  // If the URL already has transformations, we need to extract the original path
  // Cloudinary transformations are in the format: w_800,h_800,c_limit,q_85,f_auto,dpr_auto/...
  // The path after transformations usually starts with 'v' (version) followed by digits
  // Check if the first part contains transformation parameters
  const firstPart = restOfPath.split('/')[0]
  const hasTransformations = /^(w_|h_|c_|q_|f_|dpr_|ar_|b_|e_|fl_|g_|o_|r_|t_|u_|x_|y_|z_)/.test(firstPart)
  
  if (hasTransformations) {
    // URL already has transformations, extract the original path
    // Find the version part (starts with 'v' followed by digits) or the folder path
    const parts = restOfPath.split('/')
    const versionIndex = parts.findIndex(part => /^v\d+/.test(part))
    
    if (versionIndex > 0) {
      // Reconstruct the path starting from the version
      restOfPath = parts.slice(versionIndex).join('/')
    } else {
      // No version found, try to find the first part that doesn't look like a transformation
      // Transformations typically contain underscores and commas
      const nonTransformationIndex = parts.findIndex(part => 
        !part.includes('_') && !part.includes(',') && part.length > 0
      )
      if (nonTransformationIndex > 0) {
        restOfPath = parts.slice(nonTransformationIndex).join('/')
      }
      // If we can't find a clean path, just use the original - Cloudinary will handle it
    }
  }

  // Build transformation string
  const transformations: string[] = []

  if (size === 'full') {
    // For full size, use quality and format only
    transformations.push(`q_${quality}`)
    if (format !== 'auto') {
      transformations.push(`f_${format}`)
    } else {
      transformations.push('f_auto') // Auto format (WebP, AVIF when supported)
    }
  } else {
    // For other sizes, add width, height, crop, quality, and format
    transformations.push(`w_${width}`)
    transformations.push(`h_${height}`)
    transformations.push('c_limit') // Maintain aspect ratio, limit dimensions
    transformations.push(`q_${quality}`)
    if (format !== 'auto') {
      transformations.push(`f_${format}`)
    } else {
      transformations.push('f_auto')
    }
  }

  // Add dpr_auto for responsive images (device pixel ratio)
  transformations.push('dpr_auto')

  const transformationString = transformations.join(',')
  
  // Reconstruct URL with transformations
  return `${baseUrl}/${transformationString}/${restOfPath}`
}

/**
 * Get optimized thumbnail URL for Cloudinary images
 */
export function getThumbnailUrl(url: string): string {
  return getOptimizedCloudinaryUrl(url, 'thumbnail')
}

/**
 * Get optimized carousel URL for Cloudinary images
 */
export function getCarouselUrl(url: string): string {
  return getOptimizedCloudinaryUrl(url, 'carousel')
}

/**
 * Get optimized lightbox URL for Cloudinary images
 */
export function getLightboxUrl(url: string): string {
  return getOptimizedCloudinaryUrl(url, 'lightbox')
}

