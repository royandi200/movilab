"use client"

import { useState } from "react"
import Image from "next/image"
import ProductModal from "./product-modal"
import { Search } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface Accessory {
  id: number
  name: string
  price: string
  category: string
  image: string
  description?: string
  features?: string[]
  marca: string
}

interface AccessoriesListProps {
  accessories: Accessory[]
  brands: string[]
  scrollY: number
}

export default function AccessoriesList({ accessories, brands, scrollY }: AccessoriesListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Accessory | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")

  const filteredAccessories = accessories.filter((acc) => {
    const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === "all" || acc.marca === selectedBrand
    return matchesSearch && matchesBrand
  })

  const handleProductClick = (acc: Accessory) => {
    trackEvent("product_click", {
      productId: acc.id.toString(),
      productName: acc.name,
      pagePath: window.location.pathname,
    })
    setSelectedProduct(acc)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="mb-12 space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b7e]" />
          <input
            type="text"
            placeholder="Buscar accesorios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-[#d4c5f9]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#d4c5f9]/50 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setSelectedBrand("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              selectedBrand === "all"
                ? "bg-[#d4c5f9] text-white shadow-lg shadow-[#d4c5f9]/30"
                : "bg-white/60 text-[#6b6b7e] border border-[#d4c5f9]/30 hover:border-[#d4c5f9]/50"
            }`}
          >
            Todas las marcas
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                selectedBrand === brand
                  ? "bg-[#d4c5f9] text-white shadow-lg shadow-[#d4c5f9]/30"
                  : "bg-white/60 text-[#6b6b7e] border border-[#d4c5f9]/30 hover:border-[#d4c5f9]/50"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-[#6b6b7e]">
          Mostrando {filteredAccessories.length} de {accessories.length} productos
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredAccessories.map((acc, idx) => (
          <AccessoryCard key={acc.id} accessory={acc} onClick={() => handleProductClick(acc)} />
        ))}
      </div>

      {filteredAccessories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-[#6b6b7e]">No se encontraron productos con los filtros seleccionados</p>
        </div>
      )}

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

function AccessoryCard({
  accessory,
  onClick,
}: {
  accessory: Accessory
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="group relative p-6 lg:p-8 rounded-2xl border border-[#d4c5f9]/30 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-[#d4c5f9]/50 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg shadow-[#d4c5f9]/10"
    >
      <div className="relative h-40 lg:h-48 bg-gradient-to-br from-[#f8f7fc] to-[#e8e3f3] overflow-hidden rounded-xl">
        <Image
          src={accessory.image || "/placeholder.svg"}
          alt={accessory.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-4">
          <span className="px-2.5 py-1 text-xs font-medium text-[#6b6b7e] bg-[#d4c5f9]/10 rounded border border-[#d4c5f9]/30">
            {accessory.category}
          </span>
          <span className="text-lg font-semibold text-[#2d2d3a]">{accessory.price}</span>
        </div>

        <h3 className="text-base lg:text-lg font-medium text-[#2d2d3a] mb-2 group-hover:text-[#d4c5f9] transition-colors">
          {accessory.name}
        </h3>

        <button
          onClick={onClick}
          className="mt-4 text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors inline-flex items-center gap-2"
        >
          Más...
          <span className="text-xs">→</span>
        </button>
      </div>
    </div>
  )
}
