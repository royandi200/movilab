-- Crear usuario administrador
-- Email: admin@movilab.store
-- Contraseña: Movilab2025!

-- Primero, necesitas registrar este usuario en Supabase Auth
-- Puedes hacerlo desde el dashboard de Supabase en Authentication > Users
-- O usar esta extensión si tienes acceso:

-- Insertar en la tabla admin_users (ejecutar después de crear el usuario en Auth)
-- Reemplaza 'USER_ID_AQUI' con el ID del usuario que crees en Supabase Auth

INSERT INTO admin_users (user_id, email, role, created_at)
VALUES (
  'USER_ID_AQUI', 
  'admin@movilab.store',
  'super_admin',
  NOW()
);

-- NOTA: Para crear el usuario completo, sigue estos pasos:
-- 1. Ve al dashboard de Supabase
-- 2. Authentication > Users > Add user
-- 3. Email: admin@movilab.store
-- 4. Password: Movilab2025!
-- 5. Confirma el email automáticamente
-- 6. Copia el User ID generado
-- 7. Ejecuta este script reemplazando 'USER_ID_AQUI' con el ID real
