import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

async function deleteAllDuplicates() {
  try {
    console.log("[v0] Starting duplicate deletion...")

    const connection = await pool.getConnection()

    // Get all duplicates
    const [duplicates] = await connection.query(`
      SELECT name, brand, COUNT(*) as count, GROUP_CONCAT(id) as ids
      FROM products
      GROUP BY name, brand
      HAVING count > 1
    `)

    console.log(`[v0] Found ${duplicates.length} duplicate product groups`)

    let totalDeleted = 0

    for (const dup of duplicates) {
      const ids = dup.ids.split(",")
      // Keep the first ID, delete the rest
      const idsToDelete = ids.slice(1)

      console.log(
        `[v0] ${dup.name} (${dup.brand}): keeping ${ids[0]}, deleting ${idsToDelete.length} copies`
      )

      for (const idToDelete of idsToDelete) {
        await connection.execute("DELETE FROM products WHERE id = ?", [idToDelete.trim()])
        totalDeleted++
      }
    }

    console.log(`[v0] Total products deleted: ${totalDeleted}`)

    // Verify no duplicates remain
    const [verify] = await connection.query(`
      SELECT COUNT(*) as duplicates
      FROM (
        SELECT name, brand, COUNT(*) as cnt
        FROM products
        GROUP BY name, brand
        HAVING cnt > 1
      ) as dup
    `)

    console.log(`[v0] Duplicates remaining: ${verify[0].duplicates}`)

    // Count final products
    const [finalCount] = await connection.query("SELECT COUNT(*) as total FROM products")
    console.log(`[v0] Final product count: ${finalCount[0].total}`)

    connection.release()
  } catch (error) {
    console.error("[v0] Error:", error)
  } finally {
    await pool.end()
  }
}

deleteAllDuplicates()
