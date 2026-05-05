"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Upload, X } from "lucide-react"

interface Product {
  id: string
  name: string
  description?: string
  price: number
  category: "celular" | "accesorio"
  brand?: string
  model?: string
  stock: number
  image_url?: string
  is_active: boolean
  created_at?: string
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [marcaFilter, setMarcaFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "celular" as "celular" | "accesorio",
    brand: "",
    model: "",
    stock: "",
    image_url: "",
    is_active: true,
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, categoryFilter, marcaFilter, searchQuery])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...products]

    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter)
    }

    if (marcaFilter !== "all") {
      filtered = filtered.filter((p) => p.brand === marcaFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Crear preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null

    setIsUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", imageFile)

      const response = await fetch("/api/upload-product-image", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        return data.url
      } else {
        alert("Error al subir la imagen")
        return null
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error al subir la imagen")
      return null
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Starting product save...")

    // Si hay una imagen nueva, subirla primero
    let imageUrl = formData.image_url
    if (imageFile) {
      console.log("[v0] Uploading image file:", imageFile.name)
      const uploadedUrl = await uploadImage()
      if (uploadedUrl) {
        imageUrl = uploadedUrl
        console.log("[v0] Image uploaded successfully:", uploadedUrl)
      } else {
        console.error("[v0] Image upload failed")
        return // No continuar si falla la subida de imagen
      }
    }

    const productData = {
      ...formData,
      image_url: imageUrl,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
    }

    console.log("[v0] Product data to save:", productData)

    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : "/api/admin/products"
      const method = editingProduct ? "PUT" : "POST"

      console.log("[v0] Making request to:", url, "with method:", method)

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })

      console.log("[v0] Response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Product saved successfully:", result)
        await fetchProducts()
        resetForm()
        setShowForm(false)
        alert("Producto guardado exitosamente")
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error("[v0] Error response:", errorData)
        alert(`Error al guardar el producto: ${errorData.error || "Error desconocido"}`)
      }
    } catch (error) {
      console.error("[v0] Error saving product:", error)
      alert(`Error al guardar el producto: ${error instanceof Error ? error.message : "Error de conexión"}`)
    }
  }

  const handleEdit = (product: Product) => {
    console.log("[v0] Edit clicked for product:", product.id, product.name)
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category: product.category,
      brand: product.brand || "",
      model: product.model || "",
      stock: product.stock.toString(),
      image_url: product.image_url || "",
      is_active: product.is_active,
    })
    if (product.image_url) {
      setImagePreview(product.image_url)
    }
    setShowForm(true)
    console.log("[v0] Form opened for editing")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchProducts()
      } else {
        alert("Error al eliminar el producto")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Error al eliminar el producto")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "celular",
      brand: "",
      model: "",
      stock: "",
      image_url: "",
      is_active: true,
    })
    setEditingProduct(null)
    setImageFile(null)
    setImagePreview("")
  }

  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Inventario</h1>
            <p className="text-gray-600">Administra celulares y accesorios</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin">
              <Button variant="outline">Volver al Dashboard</Button>
            </Link>
            <Button
              onClick={() => {
                resetForm()
                setShowForm(!showForm)
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              {showForm ? "Cancelar" : "Agregar Producto"}
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="mb-8 border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 bg-purple-50/50">
                  <Label className="text-lg font-semibold mb-4 block">Imagen del Producto</Label>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Preview de imagen */}
                    <div className="flex-shrink-0">
                      {imagePreview ? (
                        <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-purple-200">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null)
                              setImagePreview("")
                              setFormData({ ...formData, image_url: "" })
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-48 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                          <Upload className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Input de carga */}
                    <div className="flex-1 flex flex-col justify-center">
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <div className="border-2 border-purple-300 rounded-lg p-4 hover:bg-purple-100 transition-colors text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                          <p className="text-sm font-medium text-purple-600 mb-1">
                            Haz clic para seleccionar una imagen
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG o WEBP (max. 5MB)</p>
                        </div>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </Label>

                      {imageFile && (
                        <p className="text-sm text-gray-600 mt-2">Archivo seleccionado: {imageFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categoría *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: "celular" | "accesorio") => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celular">Celular</SelectItem>
                        <SelectItem value="accesorio">Accesorio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="brand">Marca *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="model">Modelo</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Precio *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image_url">URL de Imagen</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="is_active">Producto activo</Label>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                    disabled={isUploadingImage}
                  >
                    {isUploadingImage ? "Subiendo imagen..." : editingProduct ? "Actualizar" : "Crear"} Producto
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setShowForm(false)
                    }}
                    disabled={isUploadingImage}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="border-purple-200 shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por nombre o SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="celular">Celulares</SelectItem>
                  <SelectItem value="accesorio">Accesorios</SelectItem>
                </SelectContent>
              </Select>
              <Select value={marcaFilter} onValueChange={setMarcaFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {uniqueBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-8">Cargando productos...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No se encontraron productos</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Producto</th>
                      <th className="text-left p-4">Categoría</th>
                      <th className="text-left p-4">Marca</th>
                      <th className="text-right p-4">Precio</th>
                      <th className="text-right p-4">Stock</th>
                      <th className="text-center p-4">Estado</th>
                      <th className="text-center p-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-purple-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {product.image_url && (
                              <img
                                src={product.image_url || "/placeholder.svg"}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium">{product.name}</div>
                              {product.brand && <div className="text-sm text-gray-500">Marca: {product.brand}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 capitalize">{product.category}</td>
                        <td className="p-4">{product.brand}</td>
                        <td className="p-4 text-right">${product.price.toLocaleString("es-CO")}</td>
                        <td className="p-4 text-right">
                          <span className={product.stock < 5 ? "text-red-600 font-medium" : ""}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              product.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-center">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                              Editar
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                              Eliminar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
