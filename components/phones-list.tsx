"use client"

import { useState } from "react"
import Image from "next/image"
import ProductModal from "./product-modal"
import { Search } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface Phone {
  id: number
  name: string
  price: string
  badge: string
  features: string[]
  image: string
  marca: string
}

interface PhonesListProps {
  phones: Phone[]
  brands: string[]
  scrollY: number
}

export default function PhonesList({ phones, brands, scrollY }: PhonesListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Phone | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")

  const filteredPhones = phones.filter((phone) => {
    const matchesSearch = phone.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === "all" || phone.marca === selectedBrand
    return matchesSearch && matchesBrand
  })

  const handleProductClick = (phone: Phone) => {
    trackEvent("product_click", {
      productId: phone.id.toString(),
      productName: phone.name,
      pagePath: window.location.pathname,
    })
    setSelectedProduct(phone)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="mb-12 space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por modelo o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-purple-200/40 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setSelectedBrand("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              selectedBrand === "all"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-300/50"
                : "bg-white/60 text-gray-700 border border-purple-200/40 hover:border-purple-300/60"
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
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-300/50"
                  : "bg-white/60 text-gray-700 border border-purple-200/40 hover:border-purple-300/60"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600">
          Mostrando {filteredPhones.length} de {phones.length} productos
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
        {filteredPhones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} onClick={() => handleProductClick(phone)} />
        ))}
      </div>

      {filteredPhones.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No se encontraron productos con los filtros seleccionados</p>
        </div>
      )}

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

function PhoneCard({
  phone,
  onClick,
}: {
  phone: Phone
  onClick: () => void
}) {
  return (
    <div className="group relative">
      <div className="relative rounded-2xl overflow-hidden border border-purple-200/40 bg-white/60 backdrop-blur-sm hover:border-purple-300/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/30">
        <div className="relative h-40 lg:h-56 bg-gradient-to-br from-purple-50/50 to-pink-50/30 flex items-center justify-center overflow-hidden">
          <Image
            src={phone.image || "/placeholder.svg?height=300&width=300"}
            alt={phone.name}
            fill
            className="object-contain p-4 lg:p-8 group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-2 lg:top-4 right-2 lg:right-4 z-10">
            <span className="px-2 lg:px-3 py-1 lg:py-1.5 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
              {phone.badge}
            </span>
          </div>
        </div>

        <div className="p-3 lg:p-6">
          <h3 className="text-sm lg:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{phone.name}</h3>

          <div className="flex flex-wrap gap-1 lg:gap-1.5 mb-3 lg:mb-4">
            {phone.features.slice(0, 2).map((feature, i) => (
              <span
                key={i}
                className="px-1.5 lg:px-2 py-0.5 lg:py-1 text-xs text-purple-700 bg-purple-100/50 rounded border border-purple-200"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <span className="text-base lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {phone.price}
            </span>
            <button
              onClick={onClick}
              className="w-full lg:w-auto px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs font-medium hover:shadow-lg hover:shadow-purple-300/50 transition-all duration-200 cursor-pointer"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
