-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  model VARCHAR(100),
  category ENUM('celular', 'accesorio') NOT NULL,
  price DECIMAL(10, 2),
  stock_quantity INT DEFAULT 0,
  description TEXT,
  features JSON,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_brand (brand),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de eventos de analytics
CREATE TABLE IF NOT EXISTS analytics_events (
  id VARCHAR(36) PRIMARY KEY,
  event_type ENUM('page_view', 'product_click', 'section_visit') NOT NULL,
  event_data JSON,
  page_path VARCHAR(500),
  product_id VARCHAR(36),
  product_name VARCHAR(255),
  section_name VARCHAR(255),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event_type (event_type),
  INDEX idx_created_at (created_at),
  INDEX idx_product_id (product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar usuario admin por defecto (password: admin123)
INSERT INTO users (id, email, password, role) 
VALUES (UUID(), 'admin@movilab.store', '$2a$10$rOvHXlQp3HzKZGqTvFZj4.N5YXQZxKqYhZxPvPXMWXLqKVZQXxZGm', 'admin')
ON DUPLICATE KEY UPDATE id=id;
