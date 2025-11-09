"use client"

import { useEffect } from "react"

export function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // View transitions are enabled via meta tag in layout
    // This component is mainly for future enhancements
  }, [])

  return <>{children}</>
}

// Helper function to navigate with view transition
export function startViewTransition(callback: () => void | Promise<void>) {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    // Use the browser's native startViewTransition
    ;(document as any).startViewTransition(callback)
  } else {
    // Fallback for browsers that don't support view transitions
    callback()
  }
}

