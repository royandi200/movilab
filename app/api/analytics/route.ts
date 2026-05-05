import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event_type, page_path, product_id, product_name, section_name, event_data, user_agent } = body

    if (!event_type) {
      return NextResponse.json({ error: "event_type is required" }, { status: 400 })
    }

    await query(
      `INSERT INTO analytics_events (id, event_type, page_path, product_id, product_name, section_name, event_data, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        event_type,
        page_path || null,
        product_id || null,
        product_name || null,
        section_name || null,
        event_data ? JSON.stringify(event_data) : null,
        user_agent || null,
      ]
    )

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
