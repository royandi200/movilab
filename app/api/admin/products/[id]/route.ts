import { type NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { id } = await params

    console.log("[v0] ===== PUT REQUEST START =====")
    console.log("[v0] Product ID:", id)
    console.log("[v0] Full request body:", JSON.stringify(body, null, 2))
    console.log("[v0] Image URL value:", body.image_url)
    console.log("[v0] Image URL type:", typeof body.image_url)
    console.log("[v0] Image URL is null?:", body.image_url === null)
    console.log("[v0] Image URL is undefined?:", body.image_url === undefined)

    const features = body.features ? JSON.stringify(body.features) : null

    const updateQuery = `UPDATE products SET
        name = ?, brand = ?, model = ?, category = ?, price = ?,
        description = ?, features = ?, image_url = ?, stock = ?, is_active = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`

    const updateParams = [
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
      id,
    ]

    console.log("[v0] Update params array:", JSON.stringify(updateParams, null, 2))
    console.log("[v0] Executing query:", updateQuery)

    await query(updateQuery, updateParams)

    const product = await queryOne("SELECT * FROM products WHERE id = ?", [id])
    console.log("[v0] Product after update - image_url:", product.image_url)
    console.log("[v0] ===== PUT REQUEST END =====")
    return NextResponse.json(product)
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    return NextResponse.json(
      { error: "Error updating product", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    await query("DELETE FROM products WHERE id = ?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { error: "Error deleting product", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
