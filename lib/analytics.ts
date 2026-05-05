function getDeviceType(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return "Móvil"
  if (/tablet|ipad/i.test(userAgent)) return "Tablet"
  return "PC"
}

function getBrowser(userAgent: string): string {
  if (/chrome|crios|crmo/i.test(userAgent) && !/edg/i.test(userAgent)) return "Chrome"
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return "Safari"
  if (/firefox|fxios/i.test(userAgent)) return "Firefox"
  if (/edg/i.test(userAgent)) return "Edge"
  if (/opr\//i.test(userAgent)) return "Opera"
  return "Otro"
}

function getOS(userAgent: string): string {
  if (/windows/i.test(userAgent)) return "Windows"
  if (/mac/i.test(userAgent)) return "Mac OS"
  if (/android/i.test(userAgent)) return "Android"
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS"
  if (/linux/i.test(userAgent)) return "Linux"
  return "Otro"
}

export async function trackEvent(
  eventType: "page_view" | "product_click" | "section_visit",
  data: {
    pagePath?: string
    productId?: string
    productName?: string
    sectionName?: string
    eventData?: Record<string, any>
  },
) {
  try {
    if (typeof window === "undefined") return

    const userAgent = window.navigator.userAgent
    const deviceInfo = {
      device_type: getDeviceType(userAgent),
      browser: getBrowser(userAgent),
      os: getOS(userAgent),
    }

    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: eventType,
        page_path: data.pagePath || window.location.pathname,
        product_id: data.productId || null,
        product_name: data.productName || null,
        section_name: data.sectionName || null,
        event_data: { ...data.eventData, ...deviceInfo },
        user_agent: userAgent,
      }),
    })
  } catch {
    // Silently fail - analytics should never break the app
  }
}

export function trackProductClick(productId: string, productName: string) {
  return trackEvent("product_click", {
    productId,
    productName,
    pagePath: typeof window !== "undefined" ? window.location.pathname : "",
  })
}
