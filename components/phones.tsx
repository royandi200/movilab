"use client"

import { useEffect, useState } from "react"

import PhonesList from "./phones-list"

interface PhonesProps {
  scrollY: number
  fullView?: boolean
}

interface Phone {
  id: string
  name: string
  price: string
  badge: string
  features: string[]
  image: string
  marca: string
}

export default function Phones({ scrollY, fullView = false }: PhonesProps) {
  const [phones, setPhones] = useState<Phone[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchPhones() {
      const res = await fetch("/api/products?category=celular")
      const data = await res.json()

      if (Array.isArray(data)) {
        const mappedPhones = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: `$${Number(product.price).toLocaleString("es-CO")}`,
          badge: product.marca || "Nuevo",
          features: product.features
            ? Object.values(product.features)
            : [product.storage, product.modelo].filter(Boolean),
          image: product.image_url || "/placeholder.svg?height=300&width=300",
          marca: product.marca,
        }))
        setPhones(mappedPhones)
        setBrands(Array.from(new Set(mappedPhones.map((p) => p.marca).filter(Boolean))))
      }
      setIsLoaded(true)
    }

    fetchPhones()
  }, [])

  return (
    <section
      id="phones"
      className="py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-br from-[#f0ebf8] via-[#fef3f9] to-[#e8f4f8]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Dispositivos verificados
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Equipos iPhone con garantía. Procedencia certificada y calidad garantizada.
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
          <PhonesList phones={phones} brands={brands} scrollY={scrollY} />
        )}
      </div>
    </section>
  )
}
