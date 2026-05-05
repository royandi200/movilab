"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductModal from "./product-modal"

interface PhonesCarouselProps {
  scrollY: number
}

interface Phone {
  name: string
  price: string
  badge: string
  features: string[]
  image: string
}

interface ProductFromAPI {
  id: string
  name: string
  price: number
  brand: string
  category: string
  image_url?: string
  features?: string
  is_active: boolean
  stock: number
}

export default function PhonesCarousel({ scrollY }: PhonesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<Phone | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [featuredPhones, setFeaturedPhones] = useState<Phone[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPhones() {
      try {
        const res = await fetch("/api/products?category=celular&limit=20")
        if (!res.ok) throw new Error("Error fetching products")
        const data: ProductFromAPI[] = await res.json()

        const mapped: Phone[] = data.map((p) => {
          let parsedFeatures: string[] = []
          if (p.features) {
            try {
              const parsed = JSON.parse(p.features)
              parsedFeatures = Array.isArray(parsed)
                ? parsed.map(String)
                : p.features.split(",").map((f) => f.trim())
            } catch {
              parsedFeatures = p.features.split(",").map((f) => f.trim())
            }
          }

          return {
            name: p.name,
            price: `$${Number(p.price).toLocaleString("es-CO")}`,
            badge: p.brand || "",
            features: parsedFeatures,
            image: p.image_url || "/placeholder.svg",
          }
        })

        setFeaturedPhones(mapped)
      } catch (error) {
        console.error("Error loading phones:", error)
        setFeaturedPhones([])
      } finally {
        setLoading(false)
      }
    }

    fetchPhones()
  }, [])

  useEffect(() => {
    if (featuredPhones.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPhones.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [featuredPhones.length])

  const goToSlide = (index: number) => setCurrentIndex(index)
  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? featuredPhones.length - 1 : prev - 1))
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % featuredPhones.length)

  const handleProductClick = (phone: Phone) => {
    setSelectedProduct(phone)
    setIsModalOpen(true)
  }

  return (
    <>
      <section
        id="phones"
        className="py-16 lg:py-32 px-4 lg:px-8 bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#b4d4ff]/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-2xl lg:text-5xl xl:text-6xl font-bold text-[#2d2d3a] mb-4 tracking-tight">
              Dispositivos verificados
            </h2>
            <p className="text-sm lg:text-lg text-[#6b6b7e] max-w-2xl mx-auto leading-relaxed">
              Equipos iPhone con garantía. Procedencia certificada y calidad garantizada.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-10 h-10 rounded-full border-4 border-[#d4c5f9] border-t-transparent animate-spin" />
            </div>
          ) : featuredPhones.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-[#6b6b7e]">
              <p className="text-lg">No hay productos disponibles en este momento.</p>
            </div>
          ) : (
            <div className="relative group">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {featuredPhones.map((phone, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 px-2 lg:px-8">
                      <div className="rounded-2xl lg:rounded-3xl overflow-hidden border border-[#d4c5f9]/30 bg-white/80 backdrop-blur-sm shadow-xl shadow-[#d4c5f9]/10">

                        {/* MOBILE: layout vertical */}
                        <div className="flex flex-col lg:hidden">
                          {/* Imagen */}
                          <div className="relative h-56 w-full bg-gradient-to-br from-[#f8f7fc] to-[#e8e3f3]">
                            <Image
                              src={phone.image}
                              alt={phone.name}
                              fill
                              sizes="100vw"
                              className="object-contain p-4 drop-shadow-xl"
                              priority={idx === 0}
                              loading={idx === 0 ? "eager" : "lazy"}
                              quality={80}
                            />
                            {phone.badge && (
                              <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full shadow">
                                {phone.badge}
                              </span>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-5 flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-[#2d2d3a]">{phone.name}</h3>

                            {phone.features.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {phone.features.slice(0, 3).map((f, i) => (
                                  <span key={i} className="text-xs px-2 py-1 bg-[#f0ecfd] text-[#6b6b7e] rounded-full">{f}</span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-1">
                              <span className="text-2xl font-bold text-[#2d2d3a]">{phone.price}</span>
                              <button
                                onClick={() => handleProductClick(phone)}
                                className="px-5 py-2.5 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full text-sm font-semibold shadow-md active:opacity-80 transition-opacity"
                              >
                                Ver detalles
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* DESKTOP: layout horizontal */}
                        <div className="hidden lg:grid lg:grid-cols-2 gap-12 p-16">
                          <div className="relative h-96 flex items-center justify-center bg-gradient-to-br from-[#f8f7fc] to-[#e8e3f3] rounded-2xl">
                            <div className="relative w-full h-full">
                              <Image
                                src={phone.image}
                                alt={phone.name}
                                fill
                                sizes="45vw"
                                className="object-contain drop-shadow-2xl"
                                priority={idx === 0}
                                loading={idx === 0 ? "eager" : "lazy"}
                                quality={80}
                              />
                            </div>
                            {phone.badge && (
                              <div className="absolute top-4 right-4">
                                <span className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full shadow-md">
                                  {phone.badge}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col justify-center">
                            <h3 className="text-4xl font-bold text-[#2d2d3a] mb-6">{phone.name}</h3>
                            <div className="space-y-3 mb-8">
                              {phone.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4c5f9]" />
                                  <span className="text-[#6b6b7e]">{feature}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-6">
                              <span className="text-5xl font-bold text-[#2d2d3a]">{phone.price}</span>
                              <button
                                onClick={() => handleProductClick(phone)}
                                className="px-6 py-3 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full font-medium hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#d4c5f9]/30"
                              >
                                Ver detalles
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flechas */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 lg:-translate-x-6 w-9 h-9 lg:w-12 lg:h-12 rounded-full bg-white/90 border border-[#d4c5f9]/30 flex items-center justify-center text-[#2d2d3a] shadow-lg opacity-70 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 lg:translate-x-6 w-9 h-9 lg:w-12 lg:h-12 rounded-full bg-white/90 border border-[#d4c5f9]/30 flex items-center justify-center text-[#2d2d3a] shadow-lg opacity-70 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>

              {/* Indicadores */}
              <div className="flex justify-center gap-2 mt-6">
                {featuredPhones.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 h-2 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] rounded-full"
                        : "w-2 h-2 bg-[#d4c5f9]/30 rounded-full hover:bg-[#d4c5f9]/50"
                    }`}
                    aria-label={`Ir al producto ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/celulares"
              className="inline-flex items-center gap-2 text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors text-sm font-medium"
            >
              Ver todos los celulares <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
