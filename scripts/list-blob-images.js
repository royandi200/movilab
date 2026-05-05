import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

console.log("[v0] Conectado a MySQL")

// Obtener todos los productos con URLs de imagen
const [products] = await connection.execute(`
  SELECT id, name, brand, model, category, image_url, created_at 
  FROM products 
  WHERE image_url IS NOT NULL AND image_url != ''
  ORDER BY created_at DESC
`)

console.log(`\n[v0] Total de productos con imágenes: ${products.length}\n`)
console.log("════════════════════════════════════════════════════════════════════════════════")

products.forEach((product, index) => {
  const imageUrl = product.image_url || ""
  const isBlobUrl = imageUrl.includes("blob.vercel-storage.com")
  
  console.log(`\n${index + 1}. ${product.name}`)
  console.log(`   ID: ${product.id}`)
  console.log(`   Brand: ${product.brand}`)
  console.log(`   Model: ${product.model}`)
  console.log(`   Category: ${product.category}`)
  console.log(`   Imagen en Blob: ${isBlobUrl ? "✅ SÍ" : "❌ NO"}`)
  console.log(`   URL: ${imageUrl}`)
  console.log(`   Fecha: ${new Date(product.created_at).toLocaleString("es-CO")}`)
})

console.log("\n════════════════════════════════════════════════════════════════════════════════")

const blobImages = products.filter(p => p.image_url?.includes("blob.vercel-storage.com"))
console.log(`\n[v0] Imágenes en Vercel Blob: ${blobImages.length}/${products.length}`)

if (blobImages.length > 0) {
  console.log("\n📸 Referencia de imágenes en Blob:")
  blobImages.forEach(product => {
    const fileName = product.image_url.split("/").pop()
    console.log(`   - ${product.name}: ${fileName}`)
  })
}

await connection.end()
console.log("\n[v0] ✅ Análisis completado")
