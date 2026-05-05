import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = searchParams.get("limit")

    let sql = `
      SELECT
        id,
        name,
        brand,
        model,
        category,
        CAST(price AS CHAR) AS price,
        description,
        CAST(features AS CHAR) AS features,
        image_url,
        stock,
        is_active
      FROM products
      WHERE is_active = 1
    `
    const params: any[] = []

    if (category) {
      sql += " AND category = ?"
      params.push(category)
    }

    sql += " ORDER BY CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 0 ELSE 1 END ASC, created_at DESC"

    if (limit) {
      sql += " LIMIT ?"
      params.push(parseInt(limit))
    }

    const products = await query(sql, params)
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Error fetching products", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
