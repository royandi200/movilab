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

export default function PhonesCarousel({ scrollY }: PhonesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<Phone | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const featuredPhones: Phone[] = [
    {
      name: "iPhone 11 de 128 GB",
      price: "$1.150.000",
      badge: "Económico",
      features: ["A13 Bionic", "Cámara dual 12MP", "Face ID", "Batería todo el día"],
      image: "/iphone-11-black-front-view.jpg",
    },
    {
      name: "iPhone 12 de 128 GB",
      price: "$1.200.000",
      badge: "5G",
      features: ["A14 Bionic", "5G", "Ceramic Shield", "MagSafe"],
      image: "/iphone-12-blue-front-view.jpg",
    },
    {
      name: "iPhone 12 Pro de 128 GB",
      price: "$1.550.000",
      badge: "Pro",
      features: ["Triple cámara", "LiDAR", "ProRAW", "Acero inoxidable"],
      image: "/iphone-12-pro-graphite-front-view.jpg",
    },
    {
      name: "iPhone 13 de 128 GB",
      price: "$1.450.000",
      badge: "Popular",
      features: ["A15 Bionic", "Modo Cine", "Batería mejorada", "Ceramic Shield"],
      image: "/iphone-13-pink-front-view.jpg",
    },
    {
      name: "iPhone 13 Pro de 128 GB",
      price: "$2.000.000",
      badge: "Pro",
      features: ["ProMotion 120Hz", "Triple cámara", "Macro", "ProRes"],
      image: "/iphone-13-pro-sierra-blue-front-view.jpg",
    },
    {
      name: "iPhone 13 Pro Max de 256 GB",
      price: "$2.700.000",
      badge: "Pro Max",
      features: ["256GB", 'Pantalla 6.7"', "ProMotion 120Hz", "ProRes"],
      image: "/iphone-13-pro-max-gold-front-view.jpg",
    },
    {
      name: "iPhone 14 Pro de 256 GB",
      price: "$2.600.000",
      badge: "Pro",
      features: ["256GB", "A16 Bionic", "Dynamic Island", "48MP ProRAW"],
      image: "/iphone-14-pro-space-black-front-view.jpg",
    },
    {
      name: "iPhone 15 Pro Max de 256 GB",
      price: "$3.450.000",
      badge: "Pro Max",
      features: ["Zoom 5x", "A17 Pro", "Titanio", "USB-C 3.0"],
      image: "/iphone-15-pro-max-titanium.jpg",
    },
    {
      name: "iPhone 16 Pro de 256 GB",
      price: "$3.800.000",
      badge: "Pro",
      features: ["256GB", "A18 Pro", "Titanio", "Control de cámara"],
      image: "/iphone-16-pro-titanium.jpg",
    },
    {
      name: "iPhone 16 Pro Max de 256 GB",
      price: "$4.350.000",
      badge: "Pro Max",
      features: ['Pantalla 6.9"', "A18 Pro", "Zoom 5x", "Batería récord"],
      image: "/iphone-16-pro-max-titanium.jpg",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPhones.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [featuredPhones.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredPhones.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredPhones.length)
  }

  const handleProductClick = (phone: Phone) => {
    setSelectedProduct(phone)
    setIsModalOpen(true)
  }

  return (
    <>
      <section
        id="phones"
        className="py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#b4d4ff]/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-[#2d2d3a] mb-6 tracking-tight">
              Dispositivos verificados
            </h2>
            <p className="text-base lg:text-lg text-[#6b6b7e] max-w-2xl mx-auto leading-relaxed">
              Equipos iPhone con garantía. Procedencia certificada y calidad garantizada.
            </p>
          </div>

          <div className="relative group">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {featuredPhones.map((phone, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-4 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden border border-[#d4c5f9]/30 bg-white/80 backdrop-blur-sm hover:border-[#d4c5f9]/50 transition-all duration-500 shadow-xl shadow-[#d4c5f9]/10">
                      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-16">
                        {/* Product Image */}
                        <div className="relative h-80 lg:h-96 flex items-center justify-center bg-gradient-to-br from-[#f8f7fc] to-[#e8e3f3] rounded-2xl">
                          <div className="relative w-full h-full">
                            <Image
                              src={phone.image || "/placeholder.svg"}
                              alt={phone.name}
                              fill
                              className="object-contain drop-shadow-2xl"
                            />
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full shadow-md">
                              {phone.badge}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center">
                          <h3 className="text-2xl lg:text-4xl font-bold text-[#2d2d3a] mb-6">{phone.name}</h3>

                          <div className="space-y-3 mb-8">
                            {phone.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#d4c5f9]" />
                                <span className="text-[#6b6b7e]">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-6">
                            <span className="text-4xl lg:text-5xl font-bold text-[#2d2d3a]">{phone.price}</span>
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

            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#d4c5f9]/30 flex items-center justify-center text-[#2d2d3a] hover:bg-white hover:border-[#d4c5f9]/50 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              aria-label="Previous phone"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#d4c5f9]/30 flex items-center justify-center text-[#2d2d3a] hover:bg-white hover:border-[#d4c5f9]/50 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              aria-label="Next phone"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {featuredPhones.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 h-2 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] rounded-full"
                      : "w-2 h-2 bg-[#d4c5f9]/30 rounded-full hover:bg-[#d4c5f9]/50"
                  }`}
                  aria-label={`Go to phone ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/celulares"
              className="inline-flex items-center gap-2 text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors text-sm font-medium"
            >
              Ver todos los celulares
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
