import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  const result: Record<string, any> = {
    test1_simple: null,
    test1_error: null,
    test2_casewhen: null,
    test2_error: null,
    test3_serialization: null,
    test3_error: null,
  }

  // Test 1: query simple sin ORDER BY especial (como estaba originalmente)
  try {
    const rows = await query(
      "SELECT * FROM products WHERE is_active = 1 AND category = 'celular' ORDER BY created_at DESC LIMIT 3"
    )
    result.test1_simple = `OK - ${rows.length} filas`
  } catch (err: any) {
    result.test1_error = err?.message || String(err)
  }

  // Test 2: query con CASE WHEN (la que usa la API ahora)
  try {
    const rows = await query(
      "SELECT * FROM products WHERE is_active = 1 AND category = 'celular' ORDER BY CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 0 ELSE 1 END ASC, created_at DESC LIMIT 3"
    )
    result.test2_casewhen = `OK - ${rows.length} filas`
  } catch (err: any) {
    result.test2_error = err?.message || String(err)
  }

  // Test 3: serializar resultado con JSON.stringify para detectar problemas
  try {
    const rows = await query(
      "SELECT * FROM products WHERE is_active = 1 AND category = 'celular' ORDER BY created_at DESC LIMIT 3"
    )
    const serialized = JSON.stringify(rows)
    result.test3_serialization = `OK - ${serialized.length} chars`
  } catch (err: any) {
    result.test3_error = err?.message || String(err)
  }

  return NextResponse.json(result)
}
