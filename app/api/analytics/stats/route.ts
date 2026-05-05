import { NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"

export async function GET() {
  try {
    const oneDayAgo = new Date()
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)
    const oneDayAgoStr = oneDayAgo.toISOString().slice(0, 19).replace("T", " ")

    const [totalPageViews, totalProductClicks, recentPageViews, recentProductClicks] = await Promise.all([
      queryOne<{ count: number }>("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'page_view'"),
      queryOne<{ count: number }>("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'product_click'"),
      queryOne<{ count: number }>("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'page_view' AND created_at >= ?", [oneDayAgoStr]),
      queryOne<{ count: number }>("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'product_click' AND created_at >= ?", [oneDayAgoStr]),
    ])

    const topPages = await query<{ page_path: string; count: number }>(
      "SELECT page_path, COUNT(*) as count FROM analytics_events WHERE event_type = 'page_view' GROUP BY page_path ORDER BY count DESC LIMIT 10"
    )

    const topProducts = await query<{ product_name: string; count: number }>(
      "SELECT product_name, COUNT(*) as count FROM analytics_events WHERE event_type = 'product_click' AND product_name IS NOT NULL GROUP BY product_name ORDER BY count DESC LIMIT 10"
    )

    const allEvents = await query<{ event_data: string }>(
      "SELECT event_data FROM analytics_events WHERE event_type = 'page_view' AND event_data IS NOT NULL"
    )

    const deviceCounts: Record<string, number> = {}
    const browserCounts: Record<string, number> = {}
    const osCounts: Record<string, number> = {}

    allEvents.forEach((event) => {
      try {
        const data = typeof event.event_data === "string" ? JSON.parse(event.event_data) : event.event_data
        if (data?.device_type) deviceCounts[data.device_type] = (deviceCounts[data.device_type] || 0) + 1
        if (data?.browser) browserCounts[data.browser] = (browserCounts[data.browser] || 0) + 1
        if (data?.os) osCounts[data.os] = (osCounts[data.os] || 0) + 1
      } catch {}
    })

    return NextResponse.json({
      totalPageViews: totalPageViews?.count || 0,
      totalProductClicks: totalProductClicks?.count || 0,
      recentPageViews: recentPageViews?.count || 0,
      recentProductClicks: recentProductClicks?.count || 0,
      topPages: topPages.map((r) => [r.page_path || "/", r.count]),
      topProducts: topProducts.map((r) => ({ name: r.product_name, count: r.count })),
      deviceStats: Object.entries(deviceCounts).sort(([, a], [, b]) => b - a),
      browserStats: Object.entries(browserCounts).sort(([, a], [, b]) => b - a),
      osStats: Object.entries(osCounts).sort(([, a], [, b]) => b - a),
    })
  } catch (error) {
    console.error("Error fetching analytics stats:", error)
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 })
  }
}
