"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

type Product = {
  id: string
  name: string
  category: string
  marca: string
  price: number
  stock_quantity: number
  image_url?: string
  is_active: boolean
}

export function ProductsTable({ products, brands, onEdit }: { products: Product[]; brands: string[]; onEdit: (product: Product) => void }) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [marca, setMarca] = useState("all")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.marca.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "all" || product.category === category
    const matchesMarca = marca === "all" || product.marca === marca

    return matchesSearch && matchesCategory && matchesMarca
  })

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return

    setIsDeleting(id)
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
      window.location.reload()
    } catch (error) {
      alert("Error al eliminar: " + (error instanceof Error ? error.message : "Error desconocido"))
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-purple-200"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px] border-purple-200">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="celular">Celulares</SelectItem>
            <SelectItem value="accesorio">Accesorios</SelectItem>
          </SelectContent>
        </Select>
        <Select value={marca} onValueChange={setMarca}>
          <SelectTrigger className="w-[180px] border-purple-200">
            <SelectValue placeholder="Marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-200">
              <th className="text-left p-4 text-gray-700 font-semibold">Imagen</th>
              <th className="text-left p-4 text-gray-700 font-semibold">Producto</th>
              <th className="text-left p-4 text-gray-700 font-semibold">Categoría</th>
              <th className="text-left p-4 text-gray-700 font-semibold">Marca</th>
              <th className="text-left p-4 text-gray-700 font-semibold">Precio</th>
              <th className="text-left p-4 text-gray-700 font-semibold">Stock</th>
              <th className="text-left p-4 text-gray-700 font-semibold">Estado</th>
              <th className="text-left p-4 text-gray-700 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-purple-100 hover:bg-purple-50/50">
                <td className="p-4">
                  {product.image_url ? (
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                  )}
                </td>
                <td className="p-4 text-gray-900 font-medium">{product.name}</td>
                <td className="p-4 text-gray-700">{product.category}</td>
                <td className="p-4 text-gray-700">{product.marca}</td>
                <td className="p-4 text-gray-900 font-semibold">${product.price.toLocaleString()}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock_quantity > 10
                        ? "bg-green-100 text-green-700"
                        : product.stock_quantity > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock_quantity}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.is_active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => onEdit(product)}
                      variant="outline" 
                      size="sm" 
                      className="border-purple-300 bg-transparent cursor-pointer"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                      onClick={() => handleDelete(product.id)}
                      disabled={isDeleting === product.id}
                    >
                      {isDeleting === product.id ? "..." : "Eliminar"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No se encontraron productos con los filtros seleccionados
          </div>
        )}
      </div>
    </div>
  )
}
