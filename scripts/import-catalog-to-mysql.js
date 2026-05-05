import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

const products = [
  // iPhone
  { name: "iPhone 12 128GB", brand: "Apple", model: "12", specs: "128GB", price: 1300000, category: "celular" },
  { name: "iPhone 12 Pro 128GB", brand: "Apple", model: "12 Pro", specs: "128GB", price: 1550000, category: "celular" },
  { name: "iPhone 12 Pro 256GB", brand: "Apple", model: "12 Pro", specs: "256GB", price: 1750000, category: "celular" },
  { name: "iPhone 13 128GB", brand: "Apple", model: "13", specs: "128GB", price: 1500000, category: "celular" },
  { name: "iPhone 13 Pro 128GB", brand: "Apple", model: "13 Pro", specs: "128GB", price: 1950000, category: "celular" },
  { name: "iPhone 13 Pro 256GB", brand: "Apple", model: "13 Pro", specs: "256GB", price: 2050000, category: "celular" },
  { name: "iPhone 13 Pro Max 128GB", brand: "Apple", model: "13 Pro Max", specs: "128GB", price: 2300000, category: "celular" },
  { name: "iPhone 13 Pro Max 256GB", brand: "Apple", model: "13 Pro Max", specs: "256GB", price: 2650000, category: "celular" },
  { name: "iPhone 14 Pro 128GB", brand: "Apple", model: "14 Pro", specs: "128GB", price: 2250000, category: "celular" },
  { name: "iPhone 14 Pro 256GB", brand: "Apple", model: "14 Pro", specs: "256GB", price: 2300000, category: "celular" },
  { name: "iPhone 14 Pro Max 512GB", brand: "Apple", model: "14 Pro Max", specs: "512GB", price: 3000000, category: "celular" },
  { name: "iPhone 15 128GB", brand: "Apple", model: "15", specs: "128GB", price: 2200000, category: "celular" },
  { name: "iPhone 15 Pro 128GB", brand: "Apple", model: "15 Pro", specs: "128GB", price: 2800000, category: "celular" },
  { name: "iPhone 15 Pro 256GB", brand: "Apple", model: "15 Pro", specs: "256GB", price: 3000000, category: "celular" },
  { name: "iPhone 15 Pro Max 256GB", brand: "Apple", model: "15 Pro Max", specs: "256GB", price: 3350000, category: "celular" },
  { name: "iPhone 15 Pro Max 512GB", brand: "Apple", model: "15 Pro Max", specs: "512GB", price: 3450000, category: "celular" },
  { name: "iPhone 16 128GB", brand: "Apple", model: "16", specs: "128GB", price: 2950000, category: "celular" },
  { name: "iPhone 16 Pro 128GB", brand: "Apple", model: "16 Pro", specs: "128GB", price: 3350000, category: "celular" },
  { name: "iPhone 16 Pro 256GB", brand: "Apple", model: "16 Pro", specs: "256GB", price: 3550000, category: "celular" },
  { name: "iPhone 16 Pro Max 256GB", brand: "Apple", model: "16 Pro Max", specs: "256GB", price: 4150000, category: "celular" },
  { name: "iPhone 17 Pro 256GB", brand: "Apple", model: "17 Pro", specs: "256GB", price: 4850000, category: "celular" },
  { name: "iPhone 17 256GB Sellado", brand: "Apple", model: "17", specs: "256GB", price: 4300000, category: "celular" },
  { name: "iPhone 17 Pro 256GB Sellado", brand: "Apple", model: "17 Pro", specs: "256GB", price: 5750000, category: "celular" },
  { name: "iPhone 17 Pro Max 256GB Sellado", brand: "Apple", model: "17 Pro Max", specs: "256GB", price: 6100000, category: "celular" },

  // Accesorios Apple
  { name: "AirPods 3 Pro", brand: "Apple", model: "AirPods", specs: "3 Pro", price: 1300000, category: "accesorio" },
  { name: "AirPods Pro 2", brand: "Apple", model: "AirPods", specs: "Pro 2", price: 950000, category: "accesorio" },
  { name: "AirPods Max 2da Gen", brand: "Apple", model: "AirPods", specs: "Max 2da Gen", price: 2400000, category: "accesorio" },
  { name: "Pencil Pro", brand: "Apple", model: "Pencil", specs: "Pro", price: 650000, category: "accesorio" },
  { name: "Cable C-L Original", brand: "Apple", model: "Cable", specs: "USB-C a Lightning", price: 80000, category: "accesorio" },
  { name: "Cable C-C Original", brand: "Apple", model: "Cable", specs: "USB-C a USB-C", price: 80000, category: "accesorio" },
  { name: "Cargador Original", brand: "Apple", model: "Cargador", specs: "Original", price: 100000, category: "accesorio" },
  { name: "Super Power", brand: "Apple", model: "Cargador", specs: "Super Power", price: 140000, category: "accesorio" },
  { name: "Battery Pack", brand: "Apple", model: "Battery", specs: "Battery Pack", price: 120000, category: "accesorio" },
  { name: "Mac Mini M4 16/256GB", brand: "Apple", model: "Mac Mini", specs: "M4 16GB/256GB", price: 2950000, category: "accesorio" },
  { name: "Mac Air M3 13\" 256/16GB", brand: "Apple", model: "Mac Air", specs: "M3 13\" 256GB/16GB", price: 4150000, category: "accesorio" },
  { name: "Mac Air M4 13\" 256/16GB", brand: "Apple", model: "Mac Air", specs: "M4 13\" 256GB/16GB", price: 4150000, category: "accesorio" },
  { name: "Mac Air 15\" M3 256GB", brand: "Apple", model: "Mac Air", specs: "15\" M3 256GB", price: 5300000, category: "accesorio" },
  { name: "iPad Mini A17 Pro 128GB", brand: "Apple", model: "iPad Mini", specs: "A17 Pro 128GB", price: 2200000, category: "accesorio" },
  { name: "iPad Air M3 11\" 128GB", brand: "Apple", model: "iPad Air", specs: "M3 11\" 128GB", price: 2900000, category: "accesorio" },
  { name: "iPad M5 Pro 11\" 256GB", brand: "Apple", model: "iPad Pro", specs: "M5 Pro 11\" 256GB", price: 4600000, category: "accesorio" },
  { name: "iPad 11 128GB", brand: "Apple", model: "iPad", specs: "128GB", price: 1750000, category: "accesorio" },
  { name: "Apple Watch Ultra 2", brand: "Apple", model: "Watch Ultra", specs: "2", price: 2400000, category: "accesorio" },
  { name: "Apple Watch Ultra 47mm", brand: "Apple", model: "Watch Ultra", specs: "47mm", price: 1600000, category: "accesorio" },
  { name: "Apple Watch Ultra 47mm 2025", brand: "Apple", model: "Watch Ultra", specs: "47mm 2025", price: 1750000, category: "accesorio" },
  { name: "Apple Watch 8 Classic 46mm", brand: "Apple", model: "Watch 8", specs: "Classic 46mm", price: 1600000, category: "accesorio" },
  { name: "Apple Watch 8 44mm", brand: "Apple", model: "Watch 8", specs: "44mm", price: 1350000, category: "accesorio" },

  // Samsung
  { name: "Samsung A56 5G 256/12GB", brand: "Samsung", model: "A56", specs: "5G 256GB/12GB", price: 1550000, category: "celular" },
  { name: "Samsung M55 256/8GB", brand: "Samsung", model: "M55", specs: "256GB/8GB", price: 850000, category: "celular" },
  { name: "Samsung S25 256GB", brand: "Samsung", model: "S25", specs: "256GB", price: 3150000, category: "celular" },
  { name: "Samsung S24 FE 256GB", brand: "Samsung", model: "S24 FE", specs: "256GB", price: 2150000, category: "celular" },
  { name: "Samsung A36 5G 256/8GB", brand: "Samsung", model: "A36", specs: "5G 256GB/8GB", price: 1150000, category: "celular" },
  { name: "Samsung A26 256/8GB", brand: "Samsung", model: "A26", specs: "256GB/8GB", price: 850000, category: "celular" },
  { name: "Samsung A17 128GB", brand: "Samsung", model: "A17", specs: "128GB", price: 650000, category: "celular" },
  { name: "Samsung A17 256/8GB 4G", brand: "Samsung", model: "A17", specs: "256GB/8GB 4G", price: 800000, category: "celular" },
  { name: "Samsung A17 256/8GB 5G", brand: "Samsung", model: "A17", specs: "256GB/8GB 5G", price: 800000, category: "celular" },
  { name: "Samsung A16 128/6GB", brand: "Samsung", model: "A16", specs: "128GB/6GB", price: 500000, category: "celular" },
  { name: "Samsung A16 256/4GB", brand: "Samsung", model: "A16", specs: "256GB/4GB", price: 700000, category: "celular" },
  { name: "Samsung A07 64GB", brand: "Samsung", model: "A07", specs: "64GB", price: 350000, category: "celular" },
  { name: "Samsung A07 128/4GB", brand: "Samsung", model: "A07", specs: "128GB/4GB", price: 450000, category: "celular" },
  { name: "Samsung A07 128/6GB", brand: "Samsung", model: "A07", specs: "128GB/6GB", price: 500000, category: "celular" },
  { name: "Samsung A06 64/4GB", brand: "Samsung", model: "A06", specs: "64GB/4GB", price: 350000, category: "celular" },
  { name: "Samsung A06 128/4GB", brand: "Samsung", model: "A06", specs: "128GB/4GB", price: 350000, category: "celular" },
  { name: "Samsung Fit 3", brand: "Samsung", model: "Fit", specs: "3", price: 130000, category: "accesorio" },
  { name: "Samsung Watch Ultra 47mm", brand: "Samsung", model: "Watch Ultra", specs: "47mm", price: 1600000, category: "accesorio" },
  { name: "Samsung Watch Ultra 47mm 2025", brand: "Samsung", model: "Watch Ultra", specs: "47mm 2025", price: 1750000, category: "accesorio" },
  { name: "Samsung Watch 8 Classic 46mm", brand: "Samsung", model: "Watch 8", specs: "Classic 46mm", price: 1600000, category: "accesorio" },
  { name: "Samsung Watch 8 44mm", brand: "Samsung", model: "Watch 8", specs: "44mm", price: 1350000, category: "accesorio" },
  { name: "Samsung Buds 4 Lite", brand: "Samsung", model: "Buds", specs: "4 Lite", price: 60000, category: "accesorio" },
  { name: "Samsung Buds 5", brand: "Samsung", model: "Buds", specs: "5", price: 175000, category: "accesorio" },
  { name: "Samsung Buds 6", brand: "Samsung", model: "Buds", specs: "6", price: 200000, category: "accesorio" },
  { name: "Samsung Buds 6 Active", brand: "Samsung", model: "Buds", specs: "6 Active", price: 100000, category: "accesorio" },
  { name: "Samsung Buds 6 Play", brand: "Samsung", model: "Buds", specs: "6 Play", price: 60000, category: "accesorio" },
  { name: "Samsung Buds 6 Lite", brand: "Samsung", model: "Buds", specs: "6 Lite", price: 100000, category: "accesorio" },
  { name: "Samsung Tab A11 128/8GB", brand: "Samsung", model: "Tab A11", specs: "128GB/8GB", price: 600000, category: "accesorio" },
  { name: "Samsung Cargador 45W Original", brand: "Samsung", model: "Cargador", specs: "45W Original", price: 120000, category: "accesorio" },
  { name: "Samsung Band 9 Active", brand: "Samsung", model: "Band 9", specs: "Active", price: 100000, category: "accesorio" },

  // Xiaomi
  { name: "Xiaomi Poco F8 Pro 512/12GB", brand: "Xiaomi", model: "Poco F8 Pro", specs: "512GB/12GB", price: 2950000, category: "celular" },
  { name: "Xiaomi Poco F8 Ultra 512/16GB", brand: "Xiaomi", model: "Poco F8 Ultra", specs: "512GB/16GB", price: 3800000, category: "celular" },
  { name: "Xiaomi MI 15T 512/12GB", brand: "Xiaomi", model: "MI 15T", specs: "512GB/12GB", price: 2300000, category: "celular" },
  { name: "Xiaomi Note 13 Pro Plus 512/12GB", brand: "Xiaomi", model: "Note 13 Pro Plus", specs: "512GB/12GB", price: 1450000, category: "celular" },
  { name: "Xiaomi Poco X7 Pro 512/12GB", brand: "Xiaomi", model: "Poco X7 Pro", specs: "512GB/12GB", price: 1600000, category: "celular" },
  { name: "Xiaomi Poco M7 Pro 256/8GB", brand: "Xiaomi", model: "Poco M7 Pro", specs: "256GB/8GB", price: 850000, category: "celular" },
  { name: "Xiaomi Poco M7 Pro 512/12GB 5G", brand: "Xiaomi", model: "Poco M7 Pro", specs: "512GB/12GB 5G", price: 1050000, category: "celular" },
  { name: "Xiaomi Poco C71 128GB", brand: "Xiaomi", model: "Poco C71", specs: "128GB", price: 350000, category: "celular" },
  { name: "Xiaomi Redmi 15C 128GB", brand: "Xiaomi", model: "Redmi 15C", specs: "128GB", price: 450000, category: "celular" },
  { name: "Xiaomi Redmi 15C 256/8GB", brand: "Xiaomi", model: "Redmi 15C", specs: "256GB/8GB", price: 550000, category: "celular" },
  { name: "Xiaomi Redmi 15 128GB", brand: "Xiaomi", model: "Redmi 15", specs: "128GB", price: 550000, category: "celular" },
  { name: "Xiaomi Redmi 15 256GB", brand: "Xiaomi", model: "Redmi 15", specs: "256GB", price: 650000, category: "celular" },
  { name: "Xiaomi Redmi A5 64GB", brand: "Xiaomi", model: "Redmi A5", specs: "64GB", price: 350000, category: "celular" },
  { name: "Xiaomi Redmi A5 128GB", brand: "Xiaomi", model: "Redmi A5", specs: "128GB", price: 400000, category: "celular" },
  { name: "Xiaomi Watch Ultra 47mm", brand: "Xiaomi", model: "Watch Ultra", specs: "47mm", price: 1600000, category: "accesorio" },
  { name: "Xiaomi Buds 4 Lite", brand: "Xiaomi", model: "Buds", specs: "4 Lite", price: 60000, category: "accesorio" },
  { name: "Xiaomi Buds 5", brand: "Xiaomi", model: "Buds", specs: "5", price: 175000, category: "accesorio" },
  { name: "Xiaomi Buds 6", brand: "Xiaomi", model: "Buds", specs: "6", price: 200000, category: "accesorio" },
  { name: "Xiaomi Buds 6 Active", brand: "Xiaomi", model: "Buds", specs: "6 Active", price: 100000, category: "accesorio" },
  { name: "Xiaomi Buds 6 Play", brand: "Xiaomi", model: "Buds", specs: "6 Play", price: 60000, category: "accesorio" },
  { name: "Xiaomi Buds 6 Lite", brand: "Xiaomi", model: "Buds", specs: "6 Lite", price: 100000, category: "accesorio" },
  { name: "Xiaomi Cargador 45W Original", brand: "Xiaomi", model: "Cargador", specs: "45W Original", price: 120000, category: "accesorio" },
  { name: "Xiaomi Band 9 Active", brand: "Xiaomi", model: "Band 9", specs: "Active", price: 100000, category: "accesorio" },

  // Honor
  { name: "Honor 400 Smart 256/12GB", brand: "Honor", model: "400 Smart", specs: "256GB/12GB", price: 950000, category: "celular" },
  { name: "Honor 200 512/12GB", brand: "Honor", model: "200", specs: "512GB/12GB", price: 1600000, category: "celular" },
  { name: "Honor X9c Smart 256/8GB", brand: "Honor", model: "X9c Smart", specs: "256GB/8GB", price: 850000, category: "celular" },
  { name: "Honor X9c 5G 256/8GB", brand: "Honor", model: "X9c 5G", specs: "256GB/8GB", price: 1150000, category: "celular" },
  { name: "Honor Play 10 64GB", brand: "Honor", model: "Play 10", specs: "64GB", price: 300000, category: "celular" },
  { name: "Honor Play 9A 64GB", brand: "Honor", model: "Play 9A", specs: "64GB", price: 320000, category: "celular" },
  { name: "Honor Play 9A 256/4GB", brand: "Honor", model: "Play 9A", specs: "256GB/4GB", price: 400000, category: "celular" },
  { name: "Honor X5C 64GB", brand: "Honor", model: "X5C", specs: "64GB", price: 320000, category: "celular" },
  { name: "Honor 50 Lite", brand: "Honor", model: "50 Lite", specs: "estándar", price: 1050000, category: "celular" },
  { name: "Honor X5B", brand: "Honor", model: "X5B", specs: "estándar", price: 450000, category: "celular" },

  // Motorola
  { name: "Motorola Edge 60 Fusion 256/8GB", brand: "Motorola", model: "Edge 60 Fusion", specs: "256GB/8GB", price: 1100000, category: "celular" },
  { name: "Motorola Edge 50 Fusion", brand: "Motorola", model: "Edge 50 Fusion", specs: "estándar", price: 900000, category: "celular" },
  { name: "Motorola Moto G86", brand: "Motorola", model: "Moto G86", specs: "estándar", price: 1000000, category: "celular" },
  { name: "Motorola Moto G75 256/8GB 5G", brand: "Motorola", model: "Moto G75", specs: "256GB/8GB 5G", price: 800000, category: "celular" },
  { name: "Motorola Moto G55 256/8GB 5G", brand: "Motorola", model: "Moto G55", specs: "256GB/8GB 5G", price: 650000, category: "celular" },
  { name: "Motorola Moto G35 256GB", brand: "Motorola", model: "Moto G35", specs: "256GB", price: 650000, category: "celular" },
  { name: "Motorola Moto G34 256GB", brand: "Motorola", model: "Moto G34", specs: "256GB", price: 600000, category: "celular" },
  { name: "Motorola Moto G15 256/4GB", brand: "Motorola", model: "Moto G15", specs: "256GB/4GB", price: 450000, category: "celular" },
  { name: "Motorola Moto G05 128GB", brand: "Motorola", model: "Moto G05", specs: "128GB", price: 350000, category: "celular" },
  { name: "Motorola Moto G05 256GB", brand: "Motorola", model: "Moto G05", specs: "256GB", price: 450000, category: "celular" },
  { name: "Motorola Moto E15 64/2GB", brand: "Motorola", model: "Moto E15", specs: "64GB/2GB", price: 300000, category: "celular" },
]

async function importProducts() {
  const connection = await pool.getConnection()

  try {
    console.log("[v0] Iniciando importación de", products.length, "productos...")

    // Limpiar tabla anterior si es necesario
    // await connection.execute('DELETE FROM products')

    for (const product of products) {
      const query = `
        INSERT INTO products (id, name, brand, model, category, price, description, features, is_active)
        VALUES (UUID(), ?, ?, ?, ?, ?, ?, NULL, 1)
      `

      await connection.execute(query, [
        product.name,
        product.brand,
        product.model,
        product.category,
        product.price,
        product.specs,
      ])
    }

    console.log("[v0] ✅ Importación completada exitosamente!")
    console.log("[v0] Total de productos importados:", products.length)

    // Verificar cantidad por categoría
    const [celulares] = await connection.execute("SELECT COUNT(*) as count FROM products WHERE category = 'celular'")
    const [accesorios] = await connection.execute("SELECT COUNT(*) as count FROM products WHERE category = 'accesorio'")

    console.log("[v0] Celulares:", celulares[0]?.count || 0)
    console.log("[v0] Accesorios:", accesorios[0]?.count || 0)

    // Verificar por marca
    const [brands] = await connection.execute("SELECT brand, COUNT(*) as count FROM products GROUP BY brand ORDER BY count DESC")
    console.log("[v0] Productos por marca:")
    brands.forEach((row) => {
      console.log(`  - ${row.brand}: ${row.count}`)
    })
  } catch (error) {
    console.error("[v0] Error durante la importación:", error)
  } finally {
    await connection.end()
    await pool.end()
  }
}

importProducts()
