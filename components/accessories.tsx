"use client"

import { useEffect, useState } from "react"

import AccessoriesList from "./accessories-list"

interface AccessoriesProps {
  scrollY: number
  fullView?: boolean
}

interface Accessory {
  id: string
  name: string
  price: string
  category: string
  image: string
  description?: string
  features?: string[]
  marca?: string
}

export default function Accessories({ scrollY, fullView = false }: AccessoriesProps) {
  const [accessories, setAccessories] = useState<Accessory[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchAccessories() {
      const res = await fetch("/api/products?category=accesorio")
      const data = await res.json()

      if (Array.isArray(data)) {
        const mappedAccessories = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: `$${Number(product.price).toLocaleString("es-CO")}`,
          category: product.marca || "Accesorios",
          image: product.image_url || "/placeholder.svg",
          description: product.description,
          features: product.features ? Object.values(product.features) : [product.description].filter(Boolean),
          marca: product.marca,
        }))
        setAccessories(mappedAccessories)
        setBrands(Array.from(new Set(mappedAccessories.map((p) => p.marca).filter(Boolean))))
      }
      setIsLoaded(true)
    }

    fetchAccessories()
  }, [])

  return (
    <section
      id="accessories"
      className="py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-br from-[#e8e3f3] via-[#f8f7fc] to-[#ffc4d6]/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-[#2d2d3a] mb-6 tracking-tight">
            Accesorios premium
          </h2>
          <p className="text-base lg:text-lg text-[#6b6b7e] max-w-2xl mx-auto leading-relaxed">
            Productos originales y de alta calidad para proteger y potenciar tu dispositivo.
          </p>
        </div>

        {!isLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/60 rounded-2xl p-6">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AccessoriesList accessories={accessories} brands={brands} scrollY={scrollY} />
        )}
      </div>
    </section>
  )
}
