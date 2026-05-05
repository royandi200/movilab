import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

async function removeDuplicates() {
  const connection = await pool.getConnection()

  try {
    console.log("[v0] Finding duplicate products...")

    // Find duplicates by name and brand
    const [duplicates] = await connection.execute(`
      SELECT name, brand, COUNT(*) as count, GROUP_CONCAT(id) as ids
      FROM products
      GROUP BY name, brand
      HAVING count > 1
    `)

    console.log("[v0] Found duplicates:", duplicates)

    for (const dup of duplicates) {
      const ids = dup.ids.split(",")
      console.log(`[v0] Product: ${dup.name} (Brand: ${dup.brand}) - ${dup.count} copies`)
      console.log(`[v0] IDs: ${ids.join(", ")}`)

      // Keep the first one, delete the rest
      const idsToDelete = ids.slice(1)
      for (const id of idsToDelete) {
        console.log(`[v0] Deleting duplicate ID: ${id}`)
        await connection.execute("DELETE FROM products WHERE id = ?", [id])
      }
    }

    console.log("[v0] Duplicates removed successfully!")
  } finally {
    await connection.end()
    await pool.end()
  }
}

removeDuplicates().catch(console.error)
