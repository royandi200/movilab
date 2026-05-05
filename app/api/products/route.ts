import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = searchParams.get("limit")

    let sql = "SELECT * FROM products WHERE is_active = 1"
    const params: any[] = []

    if (category) {
      sql += " AND category = ?"
      params.push(category)
    }

    // Primero los que tienen imagen, luego por fecha descendente
    sql += " ORDER BY (image_url IS NOT NULL AND image_url != '') DESC, created_at DESC"

    if (limit) {
      sql += " LIMIT ?"
      params.push(parseInt(limit))
    }

    const products = await query(sql, params)
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
  }
}
