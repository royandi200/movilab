import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  const result: Record<string, any> = {
    env: {
      DB_HOST: process.env.DB_HOST ? "✅ definido" : "❌ FALTA",
      DB_PORT: process.env.DB_PORT ? "✅ definido" : "❌ FALTA",
      DB_USER: process.env.DB_USER ? "✅ definido" : "❌ FALTA",
      DB_PASSWORD: process.env.DB_PASSWORD ? "✅ definido" : "❌ FALTA",
      DB_NAME: process.env.DB_NAME ? "✅ definido" : "❌ FALTA",
    },
    db: null as any,
    products_count: null as any,
    sample: null as any,
    error: null as any,
  }

  try {
    const pingResult = await query("SELECT 1 AS ping")
    result.db = "✅ conexión exitosa"

    const countResult = await query<{ total: number }>("SELECT COUNT(*) as total FROM products")
    result.products_count = countResult[0]?.total ?? 0

    const sample = await query(
      "SELECT id, name, brand, category, price, image_url, is_active FROM products WHERE is_active = 1 AND category = 'celular' LIMIT 3"
    )
    result.sample = sample
  } catch (err: any) {
    result.db = "❌ error de conexión"
    result.error = err?.message || String(err)
  }

  return NextResponse.json(result, { status: 200 })
}
