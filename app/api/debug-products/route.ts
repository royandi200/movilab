import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  const result: Record<string, any> = {
    select_star_error: null,
    select_star_sample: null,
    select_explicit_error: null,
    select_explicit_sample: null,
  }

  // Test 1: SELECT * (lo que usa la API real)
  try {
    const rows = await query(
      "SELECT * FROM products WHERE is_active = 1 AND category = 'celular' ORDER BY created_at DESC LIMIT 3"
    )
    result.select_star_sample = JSON.parse(JSON.stringify(rows, (_, v) =>
      typeof v === 'bigint' ? v.toString() :
      Buffer.isBuffer(v) ? v.toString('utf8') : v
    ))
  } catch (err: any) {
    result.select_star_error = err?.message || String(err)
  }

  // Test 2: SELECT explicito de columnas clave
  try {
    const rows = await query(
      "SELECT id, name, brand, category, CAST(price AS CHAR) as price, description, features, image_url, stock, is_active FROM products WHERE is_active = 1 AND category = 'celular' LIMIT 3"
    )
    result.select_explicit_sample = rows
  } catch (err: any) {
    result.select_explicit_error = err?.message || String(err)
  }

  return NextResponse.json(result, { status: 200 })
}
