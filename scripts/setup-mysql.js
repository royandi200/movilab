import mysql from "mysql2/promise";

const config = {
  host: process.env.DB_HOST || "162.214.224.213",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "wwDA_.m6lel4",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "kainotomia_movilab",
  ssl: false,
};

async function setup() {
  let connection;
  try {
    console.log("[v0] Connecting to MySQL at", config.host, "...");
    connection = await mysql.createConnection(config);
    console.log("[v0] Connected successfully!");

    // Use query() for DDL (CREATE TABLE, CREATE TRIGGER) - not compatible with prepared statements
    const q = (sql) => new Promise((resolve, reject) => {
      connection.connection.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    // Create users table
    await q(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(10) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    await q(`DROP TRIGGER IF EXISTS before_insert_users`);
    await q(`
      CREATE TRIGGER before_insert_users
      BEFORE INSERT ON users
      FOR EACH ROW
      SET NEW.id = IF(NEW.id IS NULL OR NEW.id = '', UUID(), NEW.id)
    `);
    console.log("[v0] Table 'users' + trigger created.");

    // Create products table
    await q(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100),
        model VARCHAR(100),
        category VARCHAR(20) NOT NULL,
        price DECIMAL(15,2) NOT NULL,
        description TEXT,
        features JSON,
        image_url VARCHAR(1000),
        stock INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    await q(`DROP TRIGGER IF EXISTS before_insert_products`);
    await q(`
      CREATE TRIGGER before_insert_products
      BEFORE INSERT ON products
      FOR EACH ROW
      SET NEW.id = IF(NEW.id IS NULL OR NEW.id = '', UUID(), NEW.id)
    `);
    console.log("[v0] Table 'products' + trigger created.");

    // Create analytics_events table
    await q(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id VARCHAR(36) PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        event_data JSON,
        page_path VARCHAR(500),
        product_id VARCHAR(36),
        product_name VARCHAR(255),
        section_name VARCHAR(100),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await q(`DROP TRIGGER IF EXISTS before_insert_analytics`);
    await q(`
      CREATE TRIGGER before_insert_analytics
      BEFORE INSERT ON analytics_events
      FOR EACH ROW
      SET NEW.id = IF(NEW.id IS NULL OR NEW.id = '', UUID(), NEW.id)
    `);
    console.log("[v0] Table 'analytics_events' + trigger created.");

    // Verify tables
    const [tables] = await connection.execute("SHOW TABLES");
    console.log("[v0] Tables in database:", tables.map(t => Object.values(t)[0]));

    console.log("[v0] MySQL setup completed successfully!");
  } catch (err) {
    console.error("[v0] Error:", err.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

setup();
