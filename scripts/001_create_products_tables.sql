-- Create products table for phones and accessories
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('celular', 'accesorio')),
  marca TEXT NOT NULL, -- Brand name (Apple, Samsung, etc.)
  modelo TEXT, -- Model (iPhone 13, Galaxy S21, etc.)
  storage TEXT, -- Storage capacity (128GB, 256GB, etc.)
  color TEXT,
  stock_quantity INT NOT NULL DEFAULT 0,
  sku TEXT UNIQUE,
  image_url TEXT,
  features JSONB, -- Array of features/specs
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create inventory logs for audit trail
CREATE TABLE IF NOT EXISTS public.inventory_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity_changed INT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('added', 'removed', 'adjusted', 'sold')),
  reason TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (admin only can manage, public can view active products)
CREATE POLICY "anyone_can_view_active_products"
  ON public.products FOR SELECT
  USING (is_active = true);

CREATE POLICY "admins_can_view_all_products"
  ON public.products FOR SELECT
  USING (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

CREATE POLICY "admins_can_insert_products"
  ON public.products FOR INSERT
  WITH CHECK (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

CREATE POLICY "admins_can_update_products"
  ON public.products FOR UPDATE
  USING (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

CREATE POLICY "admins_can_delete_products"
  ON public.products FOR DELETE
  USING (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

-- RLS Policies for inventory logs (admin only)
CREATE POLICY "admins_can_view_all_logs"
  ON public.inventory_logs FOR SELECT
  USING (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

CREATE POLICY "admins_can_insert_logs"
  ON public.inventory_logs FOR INSERT
  WITH CHECK (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_marca ON public.products(marca);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_product ON public.inventory_logs(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_created_at ON public.inventory_logs(created_at DESC);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
