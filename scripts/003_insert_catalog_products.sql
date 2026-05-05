-- Insertar productos del catálogo MOVILAB
-- Las imágenes se actualizarán desde el panel de administración

-- ============================================
-- CELULARES - APPLE (iPhone)
-- ============================================
INSERT INTO public.products (name, description, price, category, marca, modelo, storage, stock_quantity, sku, is_active) VALUES
('iPhone 12 128GB', 'iPhone 12 con 128GB de almacenamiento', 1300000, 'celular', 'Apple', 'iPhone 12', '128GB', 0, 'IP12-128', true),
('iPhone 12 Pro 128GB', 'iPhone 12 Pro con 128GB de almacenamiento', 1550000, 'celular', 'Apple', 'iPhone 12 Pro', '128GB', 0, 'IP12P-128', true),
('iPhone 12 Pro 256GB', 'iPhone 12 Pro con 256GB de almacenamiento', 1750000, 'celular', 'Apple', 'iPhone 12 Pro', '256GB', 0, 'IP12P-256', true),
('iPhone 13 128GB', 'iPhone 13 con 128GB de almacenamiento', 1500000, 'celular', 'Apple', 'iPhone 13', '128GB', 0, 'IP13-128', true),
('iPhone 13 Pro 128GB', 'iPhone 13 Pro con 128GB de almacenamiento', 1950000, 'celular', 'Apple', 'iPhone 13 Pro', '128GB', 0, 'IP13P-128', true),
('iPhone 13 Pro 256GB', 'iPhone 13 Pro con 256GB de almacenamiento', 2050000, 'celular', 'Apple', 'iPhone 13 Pro', '256GB', 0, 'IP13P-256', true),
('iPhone 13 Pro Max 128GB', 'iPhone 13 Pro Max con 128GB de almacenamiento', 2300000, 'celular', 'Apple', 'iPhone 13 Pro Max', '128GB', 0, 'IP13PM-128', true),
('iPhone 13 Pro Max 256GB', 'iPhone 13 Pro Max con 256GB de almacenamiento', 2650000, 'celular', 'Apple', 'iPhone 13 Pro Max', '256GB', 0, 'IP13PM-256', true),
('iPhone 14 Pro 128GB', 'iPhone 14 Pro con 128GB de almacenamiento', 2250000, 'celular', 'Apple', 'iPhone 14 Pro', '128GB', 0, 'IP14P-128', true),
('iPhone 14 Pro 256GB', 'iPhone 14 Pro con 256GB de almacenamiento', 2300000, 'celular', 'Apple', 'iPhone 14 Pro', '256GB', 0, 'IP14P-256', true),
('iPhone 14 Pro Max 512GB', 'iPhone 14 Pro Max con 512GB de almacenamiento', 3000000, 'celular', 'Apple', 'iPhone 14 Pro Max', '512GB', 0, 'IP14PM-512', true),
('iPhone 15 128GB', 'iPhone 15 con 128GB de almacenamiento', 2200000, 'celular', 'Apple', 'iPhone 15', '128GB', 0, 'IP15-128', true),
('iPhone 15 Pro 128GB', 'iPhone 15 Pro con 128GB de almacenamiento', 2800000, 'celular', 'Apple', 'iPhone 15 Pro', '128GB', 0, 'IP15P-128', true),
('iPhone 15 Pro 256GB', 'iPhone 15 Pro con 256GB de almacenamiento', 3000000, 'celular', 'Apple', 'iPhone 15 Pro', '256GB', 0, 'IP15P-256', true),
('iPhone 15 Pro Max 256GB', 'iPhone 15 Pro Max con 256GB de almacenamiento', 3350000, 'celular', 'Apple', 'iPhone 15 Pro Max', '256GB', 0, 'IP15PM-256', true),
('iPhone 15 Pro Max 512GB', 'iPhone 15 Pro Max con 512GB de almacenamiento', 3450000, 'celular', 'Apple', 'iPhone 15 Pro Max', '512GB', 0, 'IP15PM-512', true),
('iPhone 16 128GB', 'iPhone 16 con 128GB de almacenamiento', 2950000, 'celular', 'Apple', 'iPhone 16', '128GB', 0, 'IP16-128', true),
('iPhone 16 Pro 128GB', 'iPhone 16 Pro con 128GB de almacenamiento', 3350000, 'celular', 'Apple', 'iPhone 16 Pro', '128GB', 0, 'IP16P-128', true),
('iPhone 16 Pro 256GB', 'iPhone 16 Pro con 256GB de almacenamiento', 3550000, 'celular', 'Apple', 'iPhone 16 Pro', '256GB', 0, 'IP16P-256', true),
('iPhone 16 Pro Max 256GB', 'iPhone 16 Pro Max con 256GB de almacenamiento', 4150000, 'celular', 'Apple', 'iPhone 16 Pro Max', '256GB', 0, 'IP16PM-256', true),
('iPhone 17 Pro 256GB', 'iPhone 17 Pro con 256GB de almacenamiento', 4850000, 'celular', 'Apple', 'iPhone 17 Pro', '256GB', 0, 'IP17P-256', true),
('iPhone 17 256GB Sellado', 'iPhone 17 con 256GB de almacenamiento sellado', 4300000, 'celular', 'Apple', 'iPhone 17', '256GB', 0, 'IP17-256-S', true),
('iPhone 17 Pro 256GB Sellado', 'iPhone 17 Pro con 256GB sellado', 5750000, 'celular', 'Apple', 'iPhone 17 Pro', '256GB', 0, 'IP17P-256-S', true),
('iPhone 17 Pro Max 256GB Sellado', 'iPhone 17 Pro Max con 256GB sellado', 6100000, 'celular', 'Apple', 'iPhone 17 Pro Max', '256GB', 0, 'IP17PM-256-S', true);

-- ============================================
-- CELULARES - SAMSUNG
-- ============================================
INSERT INTO public.products (name, description, price, category, marca, modelo, storage, stock_quantity, sku, is_active) VALUES
('Samsung A56 5G 256GB/12GB', 'Samsung Galaxy A56 5G con 256GB y 12GB RAM', 1550000, 'celular', 'Samsung', 'Galaxy A56 5G', '256GB', 0, 'SAM-A56-256', true),
('Samsung M55 256GB/8GB', 'Samsung Galaxy M55 con 256GB y 8GB RAM', 850000, 'celular', 'Samsung', 'Galaxy M55', '256GB', 0, 'SAM-M55-256', true),
('Samsung S25 256GB', 'Samsung Galaxy S25 con 256GB', 3150000, 'celular', 'Samsung', 'Galaxy S25', '256GB', 0, 'SAM-S25-256', true),
('Samsung S24 FE 256GB', 'Samsung Galaxy S24 FE con 256GB', 2150000, 'celular', 'Samsung', 'Galaxy S24 FE', '256GB', 0, 'SAM-S24FE-256', true),
('Samsung A36 5G 256GB/8GB', 'Samsung Galaxy A36 5G con 256GB y 8GB RAM', 1150000, 'celular', 'Samsung', 'Galaxy A36 5G', '256GB', 0, 'SAM-A36-256', true),
('Samsung A26 256GB/8GB', 'Samsung Galaxy A26 con 256GB y 8GB RAM', 850000, 'celular', 'Samsung', 'Galaxy A26', '256GB', 0, 'SAM-A26-256', true),
('Samsung A17 128GB', 'Samsung Galaxy A17 con 128GB', 650000, 'celular', 'Samsung', 'Galaxy A17', '128GB', 0, 'SAM-A17-128', true),
('Samsung A17 256GB/8GB 4G', 'Samsung Galaxy A17 con 256GB y 8GB RAM 4G', 800000, 'celular', 'Samsung', 'Galaxy A17', '256GB', 0, 'SAM-A17-256-4G', true),
('Samsung A17 256GB/8GB 5G', 'Samsung Galaxy A17 con 256GB y 8GB RAM 5G', 800000, 'celular', 'Samsung', 'Galaxy A17', '256GB', 0, 'SAM-A17-256-5G', true),
('Samsung A16 128GB/6GB', 'Samsung Galaxy A16 con 128GB y 6GB RAM', 500000, 'celular', 'Samsung', 'Galaxy A16', '128GB', 0, 'SAM-A16-128', true),
('Samsung A16 256GB/4GB', 'Samsung Galaxy A16 con 256GB y 4GB RAM', 700000, 'celular', 'Samsung', 'Galaxy A16', '256GB', 0, 'SAM-A16-256', true),
('Samsung A07 64GB', 'Samsung Galaxy A07 con 64GB', 350000, 'celular', 'Samsung', 'Galaxy A07', '64GB', 0, 'SAM-A07-64', true),
('Samsung A07 128GB/4GB', 'Samsung Galaxy A07 con 128GB y 4GB RAM', 450000, 'celular', 'Samsung', 'Galaxy A07', '128GB', 0, 'SAM-A07-128-4', true),
('Samsung A07 128GB/6GB', 'Samsung Galaxy A07 con 128GB y 6GB RAM', 500000, 'celular', 'Samsung', 'Galaxy A07', '128GB', 0, 'SAM-A07-128-6', true),
('Samsung A06 64GB/4GB', 'Samsung Galaxy A06 con 64GB y 4GB RAM', 350000, 'celular', 'Samsung', 'Galaxy A06', '64GB', 0, 'SAM-A06-64', true),
('Samsung A06 128GB/4GB', 'Samsung Galaxy A06 con 128GB y 4GB RAM', 350000, 'celular', 'Samsung', 'Galaxy A06', '128GB', 0, 'SAM-A06-128', true);

-- ============================================
-- CELULARES - XIAOMI
-- ============================================
INSERT INTO public.products (name, description, price, category, marca, modelo, storage, stock_quantity, sku, is_active) VALUES
('Xiaomi Poco F8 Pro 512GB/12GB', 'Xiaomi Poco F8 Pro con 512GB y 12GB RAM', 2950000, 'celular', 'Xiaomi', 'Poco F8 Pro', '512GB', 0, 'XIA-PF8P-512', true),
('Xiaomi Poco F8 Ultra 512GB/16GB', 'Xiaomi Poco F8 Ultra con 512GB y 16GB RAM', 3800000, 'celular', 'Xiaomi', 'Poco F8 Ultra', '512GB', 0, 'XIA-PF8U-512', true),
('Xiaomi Mi 15T 512GB/12GB', 'Xiaomi Mi 15T con 512GB y 12GB RAM', 2300000, 'celular', 'Xiaomi', 'Mi 15T', '512GB', 0, 'XIA-M15T-512', true),
('Xiaomi Note 13 Pro Plus 512GB/12GB', 'Xiaomi Note 13 Pro Plus con 512GB y 12GB RAM', 1450000, 'celular', 'Xiaomi', 'Note 13 Pro Plus', '512GB', 0, 'XIA-N13PP-512', true),
('Xiaomi Note 14 128GB/6GB', 'Xiaomi Note 14 con 128GB y 6GB RAM', 600000, 'celular', 'Xiaomi', 'Note 14', '128GB', 0, 'XIA-N14-128', true),
('Xiaomi Note 14 256GB/8GB', 'Xiaomi Note 14 con 256GB y 8GB RAM', 700000, 'celular', 'Xiaomi', 'Note 14', '256GB', 0, 'XIA-N14-256', true),
('Xiaomi Poco X7 Pro 512GB/12GB', 'Xiaomi Poco X7 Pro con 512GB y 12GB RAM', 1600000, 'celular', 'Xiaomi', 'Poco X7 Pro', '512GB', 0, 'XIA-PX7P-512', true),
('Xiaomi Poco M7 Pro 256GB/8GB', 'Xiaomi Poco M7 Pro con 256GB y 8GB RAM', 850000, 'celular', 'Xiaomi', 'Poco M7 Pro', '256GB', 0, 'XIA-PM7P-256', true),
('Xiaomi Poco M7 Pro 512GB/12GB 5G', 'Xiaomi Poco M7 Pro con 512GB y 12GB RAM 5G', 1050000, 'celular', 'Xiaomi', 'Poco M7 Pro', '512GB', 0, 'XIA-PM7P-512-5G', true),
('Xiaomi Poco C71 128GB', 'Xiaomi Poco C71 con 128GB', 350000, 'celular', 'Xiaomi', 'Poco C71', '128GB', 0, 'XIA-PC71-128', true),
('Xiaomi Redmi 15C 128GB', 'Xiaomi Redmi 15C con 128GB', 450000, 'celular', 'Xiaomi', 'Redmi 15C', '128GB', 0, 'XIA-R15C-128', true),
('Xiaomi Redmi 15C 256GB/8GB', 'Xiaomi Redmi 15C con 256GB y 8GB RAM', 550000, 'celular', 'Xiaomi', 'Redmi 15C', '256GB', 0, 'XIA-R15C-256', true),
('Xiaomi Redmi 15 128GB', 'Xiaomi Redmi 15 con 128GB', 550000, 'celular', 'Xiaomi', 'Redmi 15', '128GB', 0, 'XIA-R15-128', true),
('Xiaomi Redmi 15 256GB', 'Xiaomi Redmi 15 con 256GB', 650000, 'celular', 'Xiaomi', 'Redmi 15', '256GB', 0, 'XIA-R15-256', true),
('Xiaomi Redmi A5 64GB', 'Xiaomi Redmi A5 con 64GB', 350000, 'celular', 'Xiaomi', 'Redmi A5', '64GB', 0, 'XIA-RA5-64', true),
('Xiaomi Redmi A5 128GB', 'Xiaomi Redmi A5 con 128GB', 400000, 'celular', 'Xiaomi', 'Redmi A5', '128GB', 0, 'XIA-RA5-128', true);

-- ============================================
-- CELULARES - HUAWEI / HONOR
-- ============================================
INSERT INTO public.products (name, description, price, category, marca, modelo, storage, stock_quantity, sku, is_active) VALUES
('Honor 400 Smart 256GB/12GB', 'Honor 400 Smart con 256GB y 12GB RAM', 950000, 'celular', 'Honor', 'Honor 400 Smart', '256GB', 0, 'HON-400-256', true),
('Honor 200 512GB/12GB', 'Honor 200 con 512GB y 12GB RAM', 1600000, 'celular', 'Honor', 'Honor 200', '512GB', 0, 'HON-200-512', true),
('Honor X9c Smart 256GB/8GB', 'Honor X9c Smart con 256GB y 8GB RAM', 850000, 'celular', 'Honor', 'Honor X9c Smart', '256GB', 0, 'HON-X9CS-256', true),
('Honor X9c 5G 256GB/8GB', 'Honor X9c 5G con 256GB y 8GB RAM', 1150000, 'celular', 'Honor', 'Honor X9c 5G', '256GB', 0, 'HON-X9C-256', true),
('Honor Play 10 64GB', 'Honor Play 10 con 64GB', 300000, 'celular', 'Honor', 'Honor Play 10', '64GB', 0, 'HON-P10-64', true),
('Honor Play 9A 64GB', 'Honor Play 9A con 64GB', 320000, 'celular', 'Honor', 'Honor Play 9A', '64GB', 0, 'HON-P9A-64', true),
('Honor Play 9A 256GB/4GB', 'Honor Play 9A con 256GB y 4GB RAM', 400000, 'celular', 'Honor', 'Honor Play 9A', '256GB', 0, 'HON-P9A-256', true),
('Honor X5C 64GB', 'Honor X5C con 64GB', 320000, 'celular', 'Honor', 'Honor X5C', '64GB', 0, 'HON-X5C-64', true),
('Honor 50 Lite', 'Honor 50 Lite', 1050000, 'celular', 'Honor', 'Honor 50 Lite', '', 0, 'HON-50L', true),
('Honor X5B', 'Honor X5B', 450000, 'celular', 'Honor', 'Honor X5B', '', 0, 'HON-X5B', true);

-- ============================================
-- CELULARES - MOTOROLA
-- ============================================
INSERT INTO public.products (name, description, price, category, marca, modelo, storage, stock_quantity, sku, is_active) VALUES
('Motorola Edge 60 Fusion 256GB/8GB', 'Motorola Edge 60 Fusion con 256GB y 8GB RAM', 1100000, 'celular', 'Motorola', 'Edge 60 Fusion', '256GB', 0, 'MOT-E60F-256', true),
('Motorola Edge 50 Fusion', 'Motorola Edge 50 Fusion', 900000, 'celular', 'Motorola', 'Edge 50 Fusion', '', 0, 'MOT-E50F', true),
('Motorola Moto G86', 'Motorola Moto G86', 1000000, 'celular', 'Motorola', 'Moto G86', '', 0, 'MOT-G86', true),
('Motorola Moto G75 256GB/8GB 5G', 'Motorola Moto G75 con 256GB y 8GB RAM 5G', 800000, 'celular', 'Motorola', 'Moto G75', '256GB', 0, 'MOT-G75-256', true),
('Motorola Moto G55 256GB/8GB 5G', 'Motorola Moto G55 con 256GB y 8GB RAM 5G', 650000, 'celular', 'Motorola', 'Moto G55', '256GB', 0, 'MOT-G55-256', true),
('Motorola Moto G35 256GB', 'Motorola Moto G35 con 256GB', 650000, 'celular', 'Motorola', 'Moto G35', '256GB', 0, 'MOT-G35-256', true),
('Motorola Moto G34 256GB', 'Motorola Moto G34 con 256GB', 600000, 'celular', 'Motorola', 'Moto G34', '256GB', 0, 'MOT-G34-256', true),
('Motorola Moto G15 256GB/4GB', 'Motorola Moto G15 con 256GB y 4GB RAM', 450000, 'celular', 'Motorola', 'Moto G15', '256GB', 0, 'MOT-G15-256', true),
('Motorola Moto G05 128GB', 'Motorola Moto G05 con 128GB', 350000, 'celular', 'Motorola', 'Moto G05', '128GB', 0, 'MOT-G05-128', true),
('Motorola Moto G05 256GB', 'Motorola Moto G05 con 256GB', 450000, 'celular', 'Motorola', 'Moto G05', '256GB', 0, 'MOT-G05-256', true),
('Motorola Moto E15 64GB/2GB', 'Motorola Moto E15 con 64GB y 2GB RAM', 300000, 'celular', 'Motorola', 'Moto E15', '64GB', 0, 'MOT-E15-64', true);

-- ============================================
-- ACCESORIOS - APPLE
-- ============================================
INSERT INTO public.products (name, description, price, category, marca, modelo, stock_quantity, sku, is_active) VALUES
('AirPods 3 Pro', 'Apple AirPods 3 Pro', 1300000, 'accesorio', 'Apple', 'AirPods 3 Pro', 0, 'ACC-AP3P', true),
('AirPods Pro 2', 'Apple AirPods Pro 2da generación', 950000, 'accesorio', 'Apple', 'AirPods Pro 2', 0, 'ACC-APP2', true),
('AirPods Max 2da Gen', 'Apple AirPods Max 2da generación', 2400000, 'accesorio', 'Apple', 'AirPods Max', 0, 'ACC-APM2', true),
('Apple Pencil Pro', 'Apple Pencil Pro', 650000, 'accesorio', 'Apple', 'Pencil Pro', 0, 'ACC-APEP', true),
('Cable USB-C a Lightning Original', 'Cable USB-C a Lightning original Apple', 80000, 'accesorio', 'Apple', 'Cable C-L', 0, 'ACC-CABL-CL', true),
('Cable USB-C a USB-C Original', 'Cable USB-C a USB-C original Apple', 80000, 'accesorio', 'Apple', 'Cable C-C', 0, 'ACC-CABL-CC', true),
('Cargador Apple Original', 'Cargador original Apple', 100000, 'accesorio', 'Apple', 'Cargador', 0, 'ACC-CARG', true),
('Cargador Super Power', 'Cargador Apple Super Power', 140000, 'accesorio', 'Apple', 'Super Power', 0, 'ACC-CARGSP', true),
('Battery Pack Apple', 'Battery Pack Apple', 120000, 'accesorio', 'Apple', 'Battery Pack', 0, 'ACC-BATP', true),
('Mac Mini M4 16GB/256GB', 'Mac Mini M4 con 16GB RAM y 256GB', 2950000, 'accesorio', 'Apple', 'Mac Mini M4', 0, 'ACC-MACM-M4', true),
('MacBook Air M3 13" 256GB/16GB', 'MacBook Air M3 13 pulgadas con 256GB y 16GB RAM', 4150000, 'accesorio', 'Apple', 'MacBook Air M3', 0, 'ACC-MBA-M3-13', true),
('MacBook Air M4 13" 256GB/16GB', 'MacBook Air M4 13 pulgadas con 256GB y 16GB RAM', 4150000, 'accesorio', 'Apple', 'MacBook Air M4', 0, 'ACC-MBA-M4-13', true),
('MacBook Air 15" M3 256GB', 'MacBook Air 15 pulgadas M3 con 256GB', 5300000, 'accesorio', 'Apple', 'MacBook Air M3', 0, 'ACC-MBA-M3-15', true),
('iPad Mini A17 Pro 128GB', 'iPad Mini A17 Pro con 128GB', 2200000, 'accesorio', 'Apple', 'iPad Mini', 0, 'ACC-IPM-A17', true),
('iPad Air M3 11" 128GB', 'iPad Air M3 11 pulgadas con 128GB', 2900000, 'accesorio', 'Apple', 'iPad Air M3', 0, 'ACC-IPA-M3', true),
('iPad M5 Pro 11" 256GB', 'iPad M5 Pro 11 pulgadas con 256GB', 4600000, 'accesorio', 'Apple', 'iPad Pro M5', 0, 'ACC-IPP-M5', true),
('iPad 11" 128GB', 'iPad 11 pulgadas con 128GB', 1750000, 'accesorio', 'Apple', 'iPad', 0, 'ACC-IP-11', true),
('Apple Watch Ultra 2', 'Apple Watch Ultra 2', 2400000, 'accesorio', 'Apple', 'Watch Ultra 2', 0, 'ACC-AWU2', true);

-- ============================================
-- ACCESORIOS - SAMSUNG
-- ============================================
INSERT INTO public.products (name, description, price, category, marca, modelo, stock_quantity, sku, is_active) VALUES
('Samsung Fit 3', 'Samsung Fit 3', 130000, 'accesorio', 'Samsung', 'Fit 3', 0, 'ACC-SAM-F3', true),
('Samsung Watch Ultra 47mm', 'Samsung Watch Ultra 47mm', 1600000, 'accesorio', 'Samsung', 'Watch Ultra', 0, 'ACC-SAM-WU47', true),
('Samsung Watch Ultra 47mm 2025', 'Samsung Watch Ultra 47mm 2025', 1750000, 'accesorio', 'Samsung', 'Watch Ultra 2025', 0, 'ACC-SAM-WU47-25', true),
('Samsung Watch 8 Classic 46mm', 'Samsung Watch 8 Classic 46mm', 1600000, 'accesorio', 'Samsung', 'Watch 8 Classic', 0, 'ACC-SAM-W8C', true),
('Samsung Watch 8 44mm', 'Samsung Watch 8 44mm', 1350000, 'accesorio', 'Samsung', 'Watch 8', 0, 'ACC-SAM-W8', true),
('Samsung Tab A11 128GB/8GB', 'Samsung Tab A11 con 128GB y 8GB RAM', 600000, 'accesorio', 'Samsung', 'Tab A11', 0, 'ACC-SAM-TA11', true),
('Cargador Samsung 45W Original', 'Cargador Samsung 45W original', 120000, 'accesorio', 'Samsung', 'Cargador 45W', 0, 'ACC-SAM-C45W', true);

-- ============================================
-- ACCESORIOS - XIAOMI
-- ============================================
INSERT INTO public.products (name, description, price, category, marca, modelo, stock_quantity, sku, is_active) VALUES
('Xiaomi Buds 4 Lite', 'Xiaomi Buds 4 Lite', 60000, 'accesorio', 'Xiaomi', 'Buds 4 Lite', 0, 'ACC-XIA-B4L', true),
('Xiaomi Buds 5', 'Xiaomi Buds 5', 175000, 'accesorio', 'Xiaomi', 'Buds 5', 0, 'ACC-XIA-B5', true),
('Xiaomi Buds 6', 'Xiaomi Buds 6', 200000, 'accesorio', 'Xiaomi', 'Buds 6', 0, 'ACC-XIA-B6', true),
('Xiaomi Buds 6 Active', 'Xiaomi Buds 6 Active', 100000, 'accesorio', 'Xiaomi', 'Buds 6 Active', 0, 'ACC-XIA-B6A', true),
('Xiaomi Buds 6 Play', 'Xiaomi Buds 6 Play', 60000, 'accesorio', 'Xiaomi', 'Buds 6 Play', 0, 'ACC-XIA-B6P', true),
('Xiaomi Buds 6 Lite', 'Xiaomi Buds 6 Lite', 100000, 'accesorio', 'Xiaomi', 'Buds 6 Lite', 0, 'ACC-XIA-B6L', true),
('Xiaomi Band 9 Active', 'Xiaomi Band 9 Active', 100000, 'accesorio', 'Xiaomi', 'Band 9 Active', 0, 'ACC-XIA-BA9', true);

-- Verificar productos insertados
SELECT 
  category,
  marca,
  COUNT(*) as cantidad_productos,
  MIN(price) as precio_minimo,
  MAX(price) as precio_maximo
FROM public.products
GROUP BY category, marca
ORDER BY category, marca;
