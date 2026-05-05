import mysql from "mysql2/promise"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("[v0] Missing Supabase env vars")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const mysqlConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

async function migrateData() {
  const pool = mysql.createPool(mysqlConfig)
  const connection = await pool.getConnection()

  try {
    console.log("[v0] Starting data migration from Supabase to MySQL...")

    // Migrate products
    console.log("[v0] Fetching products from Supabase...")
    const { data: products, error: productsError } = await supabase.from("products").select("*")

    if (productsError) {
      throw new Error(`Error fetching products: ${productsError.message}`)
    }

    console.log(`[v0] Found ${products?.length || 0} products in Supabase`)

    if (products && products.length > 0) {
      for (const product of products) {
        const features = product.features ? JSON.stringify(product.features) : null

        await connection.execute(
          `INSERT INTO products (id, name, brand, model, category, price, description, features, image_url, stock, is_active, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           name=VALUES(name), brand=VALUES(brand), model=VALUES(model), category=VALUES(category), 
           price=VALUES(price), description=VALUES(description), features=VALUES(features),
           image_url=VALUES(image_url), stock=VALUES(stock), is_active=VALUES(is_active)`,
          [
            product.id,
            product.name,
            product.brand || product.marca || null,
            product.model || product.modelo || null,
            product.category,
            product.price,
            product.description || null,
            features,
            product.image_url,
            product.stock ?? 0,
            product.is_active !== undefined ? (product.is_active ? 1 : 0) : 1,
            product.created_at,
            product.updated_at,
          ]
        )
      }
      console.log(`[v0] Migrated ${products.length} products successfully`)
    }

    // Migrate analytics events
    console.log("[v0] Fetching analytics events from Supabase...")
    const { data: analytics, error: analyticsError } = await supabase.from("analytics_events").select("*")

    if (analyticsError) {
      throw new Error(`Error fetching analytics: ${analyticsError.message}`)
    }

    console.log(`[v0] Found ${analytics?.length || 0} analytics events in Supabase`)

    if (analytics && analytics.length > 0) {
      for (const event of analytics) {
        const eventData = event.event_data ? JSON.stringify(event.event_data) : null

        await connection.execute(
          `INSERT INTO analytics_events (id, event_type, page_path, product_id, product_name, section_name, event_data, user_agent, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           event_type=VALUES(event_type), page_path=VALUES(page_path), product_id=VALUES(product_id),
           product_name=VALUES(product_name), section_name=VALUES(section_name), event_data=VALUES(event_data), user_agent=VALUES(user_agent)`,
          [
            event.id,
            event.event_type,
            event.page_path || null,
            event.product_id || null,
            event.product_name || null,
            event.section_name || null,
            eventData,
            event.user_agent || null,
            event.created_at,
          ]
        )
      }
      console.log(`[v0] Migrated ${analytics.length} analytics events successfully`)
    }

    // Migrate users (if exists)
    console.log("[v0] Fetching users from Supabase...")
    const { data: users, error: usersError } = await supabase.from("users").select("*").catch(() => ({}))

    if (users && users.length > 0) {
      for (const user of users) {
        await connection.execute(
          `INSERT INTO users (id, email, password_hash, role, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           email=VALUES(email), role=VALUES(role)`,
          [
            user.id,
            user.email,
            user.password_hash || null,
            user.role || "user",
            user.created_at,
            user.updated_at,
          ]
        )
      }
      console.log(`[v0] Migrated ${users.length} users successfully`)
    }

    console.log("[v0] ✅ Data migration completed successfully!")
  } catch (error) {
    console.error("[v0] ❌ Migration failed:", error instanceof Error ? error.message : String(error))
    process.exit(1)
  } finally {
    await connection.release()
    await pool.end()
  }
}

migrateData()
