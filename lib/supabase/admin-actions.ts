"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type Product = {
  id?: string
  name: string
  description?: string
  price: number
  category: "celular" | "accesorio"
  marca: string
  modelo?: string
  storage?: string
  color?: string
  stock_quantity: number
  sku?: string
  image_url?: string
  features?: string[]
  is_active?: boolean
}

async function checkAdminAuth() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error("No autenticado")
  }

  if (!user.user_metadata?.is_admin) {
    throw new Error("No autorizado: se requiere acceso de administrador")
  }

  return { supabase, user }
}

export async function getProducts(filters?: {
  category?: string
  marca?: string
  search?: string
}) {
  const { supabase } = await checkAdminAuth()

  let query = supabase.from("products").select("*").order("created_at", { ascending: false })

  if (filters?.category) {
    query = query.eq("category", filters.category)
  }

  if (filters?.marca) {
    query = query.eq("marca", filters.marca)
  }

  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`,
    )
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getProduct(id: string) {
  const { supabase } = await checkAdminAuth()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) throw error
  return data
}

export async function createProduct(product: Product) {
  const { supabase, user } = await checkAdminAuth()

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...product,
      features: product.features ? JSON.stringify(product.features) : null,
      created_by: user.id,
    })
    .select()
    .single()

  if (error) throw error

  // Log inventory addition
  if (product.stock_quantity > 0) {
    await supabase.from("inventory_logs").insert({
      product_id: data.id,
      quantity_changed: product.stock_quantity,
      action: "added",
      reason: "Producto creado",
      created_by: user.id,
    })
  }

  revalidatePath("/admin")
  revalidatePath("/celulares")
  revalidatePath("/accesorios")
  return data
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { supabase, user } = await checkAdminAuth()

  // Get current product to check stock changes
  const { data: current } = await supabase.from("products").select("stock_quantity").eq("id", id).single()

  const { data, error } = await supabase
    .from("products")
    .update({
      ...updates,
      features: updates.features ? JSON.stringify(updates.features) : undefined,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error

  // Log inventory change if stock changed
  if (current && updates.stock_quantity !== undefined && updates.stock_quantity !== current.stock_quantity) {
    const quantityChanged = updates.stock_quantity - current.stock_quantity
    await supabase.from("inventory_logs").insert({
      product_id: id,
      quantity_changed: quantityChanged,
      action: "adjusted",
      reason: "Actualización manual",
      created_by: user.id,
    })
  }

  revalidatePath("/admin")
  revalidatePath("/celulares")
  revalidatePath("/accesorios")
  return data
}

export async function deleteProduct(id: string) {
  const { supabase } = await checkAdminAuth()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/celulares")
  revalidatePath("/accesorios")
  return { success: true }
}

export async function getBrands(category?: "celular" | "accesorio") {
  const { supabase } = await checkAdminAuth()

  let query = supabase.from("products").select("marca")

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) throw error

  // Get unique brands
  const brands = [...new Set(data.map((p) => p.marca))].filter(Boolean)
  return brands
}

export async function getInventoryLogs(productId?: string, limit = 50) {
  const { supabase } = await checkAdminAuth()

  let query = supabase
    .from("inventory_logs")
    .select("*, products(name)")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (productId) {
    query = query.eq("product_id", productId)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
