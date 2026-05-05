"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { trackProductClick } from "@/lib/analytics"
import ProductModal from "./product-modal"

interface Product {
  id: string
  name: string
  price: number
  image_url: string | null
  marca: string
  description?: string
  modelo?: string
  storage?: string
}

export default function PhoneCarouselSubmenu() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)

  useEffect(() => {
    async function fetchPhones() {
      const res = await fetch("/api/products?category=celular&limit=20")
      const data = await res.json()
      if (Array.isArray(data)) setProducts(data)
    }

    fetchPhones()
  }, [])

  useEffect(() => {
    const startAutoScroll = () => {
      if (containerRef.current && !isDragging) {
        autoScrollIntervalRef.current = setInterval(() => {
          if (containerRef.current) {
            const container = containerRef.current
            const maxScroll = container.scrollWidth - container.clientWidth

            container.scrollBy({ left: 100, behavior: "smooth" })

            if (container.scrollLeft >= maxScroll - 10) {
              container.scrollTo({ left: 0, behavior: "smooth" })
            }
          }
        }, 3000)
      }
    }

    const stopAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
    }

    if (!isDragging && products.length > 0) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }

    return stopAutoScroll
  }, [isDragging, products.length])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX - (containerRef.current?.getBoundingClientRect().left || 0))
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const x = e.clientX - (containerRef.current.getBoundingClientRect().left || 0)
    const walk = (x - dragStart) * 0.5
    containerRef.current.scrollLeft -= walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleProductClick = (product: Product) => {
    trackProductClick(product.id, product.name)
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  if (products.length === 0) return null

  return (
    <>
      <div className="fixed top-[73px] left-0 right-0 z-40 bg-white border-b border-[#e8e3f3] shadow-sm">
        <div className="relative w-full">
          {/* Left scroll button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all cursor-pointer hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-[#2d2d3a]" />
          </button>

          {/* Carousel container */}
          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide py-3 px-2 md:px-12 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex gap-3 md:gap-6 items-center">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="flex-shrink-0 flex flex-col items-center gap-1 md:gap-2 group cursor-pointer pointer-events-auto"
                  draggable={false}
                >
                  <div className="w-16 h-20 md:w-16 md:h-20 relative bg-gradient-to-br from-[#f8f6fc] to-[#fff5f9] rounded-lg p-2 group-hover:scale-105 transition-transform duration-200">
                    {product.image_url ? (
                      <Image
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-1 select-none"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#d4c5f9] text-xs">
                        {product.marca}
                      </div>
                    )}
                  </div>
                  <div className="text-center max-w-[100px] md:max-w-[100px] px-1">
                    <p className="text-xs font-medium text-[#2d2d3a] line-clamp-2 leading-tight">{product.name}</p>
                    <p className="text-xs text-[#6b6b7e] line-clamp-1">${product.price.toLocaleString("es-CO")}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all cursor-pointer hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-[#2d2d3a]" />
          </button>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={{
            name: selectedProduct.name,
            price: `$${selectedProduct.price.toLocaleString("es-CO")}`,
            category: selectedProduct.marca,
            features: [selectedProduct.modelo, selectedProduct.storage, selectedProduct.description].filter(
              Boolean,
            ) as string[],
            image: selectedProduct.image_url || "/placeholder.svg",
            description: selectedProduct.description,
          }}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
