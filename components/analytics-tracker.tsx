"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackEvent } from "@/lib/analytics"

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    console.log("[v0] Analytics tracker fired for path:", pathname)

    // Track page view
    trackEvent("page_view", {
      pagePath: pathname,
    })
  }, [pathname])

  return null
}
