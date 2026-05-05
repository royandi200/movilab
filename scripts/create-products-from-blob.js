import mysql from 'mysql2/promise'

const products = [
  { name: 'Controles 360', brand: 'Apple', category: 'accesorio', price: 150000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1767384165348-cnotroles%20360.PNG' },
  { name: 'AirPods 3 Pro', brand: 'Apple', category: 'accesorio', price: 2500000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1767384531419-AirPods%203%20Pro.png' },
  { name: 'iPhone 12', brand: 'Apple', model: 'iPhone 12', category: 'celular', price: 2800000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768263025507-12.png' },
  { name: 'iPhone 12 Pro', brand: 'Apple', model: 'iPhone 12 Pro', category: 'celular', price: 3500000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768263005605-12%20Pro.png' },
  { name: 'iPhone 13', brand: 'Apple', model: 'iPhone 13', category: 'celular', price: 3200000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768263045207-13.png' },
  { name: 'iPhone 13 Pro', brand: 'Apple', model: 'iPhone 13 Pro', category: 'celular', price: 3900000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768263065746-13%20Pro.png' },
  { name: 'iPhone 13 Pro Max', brand: 'Apple', model: 'iPhone 13 Pro Max', category: 'celular', price: 4500000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768263116901-13%20Pro%20Max.png' },
  { name: 'iPhone 14 Pro', brand: 'Apple', model: 'iPhone 14 Pro', category: 'celular', price: 4200000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768263228730-14%20pro.png' },
  { name: 'iPhone 14 Pro Max', brand: 'Apple', model: 'iPhone 14 Pro Max', category: 'celular', price: 4800000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768263244949-14%20Pro%20Max.png' },
  { name: 'iPhone 15 Pro', brand: 'Apple', model: 'iPhone 15 Pro', category: 'celular', price: 4500000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768263192454-15%20Pro.png' },
  { name: 'iPhone 16', brand: 'Apple', model: 'iPhone 16', category: 'celular', price: 3600000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768264829836-16.png' },
  { name: 'iPhone 16 Pro', brand: 'Apple', model: 'iPhone 16 Pro', category: 'celular', price: 4400000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768264842863-16%20pro.png' },
  { name: 'iPhone 16 Pro Max', brand: 'Apple', model: 'iPhone 16 Pro Max', category: 'celular', price: 5000000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768264868052-16%20pro%20max.png' },
  { name: 'iPhone 17', brand: 'Apple', model: 'iPhone 17', category: 'celular', price: 3800000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768264891088-17.png' },
  { name: 'iPhone 17 Air', brand: 'Apple', model: 'iPhone 17 Air', category: 'celular', price: 3200000, image_url: 'https://sjh0oizajshux6wc.public.blob.vercel-storage.com/products/1768264939726-17%20Air.png' },
]

async function importProducts() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  console.log('[v0] Conectado a MySQL')

  try {
    let inserted = 0
    for (const product of products) {
      const { v4: uuidv4 } = await import('uuid')
      const id = uuidv4()

      await connection.execute(
        `INSERT INTO products (id, name, brand, model, category, price, image_url, is_active, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1, 10)`,
        [id, product.name, product.brand, product.model || null, product.category, product.price, product.image_url]
      )
      inserted++
      console.log(`[v0] ✅ Producto importado: ${product.name}`)
    }

    console.log(`\n[v0] ✅ ${inserted} productos importados exitosamente a MySQL`)

    // Verificar
    const [rows] = await connection.execute('SELECT COUNT(*) as total FROM products')
    console.log(`[v0] Total de productos en MySQL: ${rows[0].total}`)
  } catch (error) {
    console.error('[v0] Error durante importación:', error)
  } finally {
    await connection.end()
  }
}

importProducts()
