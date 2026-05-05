import { type NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

export async function GET() {
  try {
    const products = await query("SELECT * FROM products ORDER BY created_at DESC")
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = uuidv4()

    const features = body.features ? JSON.stringify(body.features) : null

    await query(
      `INSERT INTO products (id, name, brand, model, category, price, description, features, image_url, stock, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.name,
        body.brand || body.marca || null,
        body.model || body.modelo || null,
        body.category,
        body.price,
        body.description || null,
        features,
        body.image_url || null,
        body.stock ?? 0,
        body.is_active !== undefined ? (body.is_active ? 1 : 0) : 1,
      ]
    )

    const product = await queryOne("SELECT * FROM products WHERE id = ?", [id])
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Error creating product", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
