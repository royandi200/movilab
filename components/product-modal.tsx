"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

interface Product {
  name: string
  price: string
  category?: string
  badge?: string
  features?: string[]
  image: string
  description?: string
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  const handleWhatsAppClick = () => {
    const phoneNumber = "573024907101"
    const message = `Hola! Quiero más información del ${product.name}. Precio: ${product.price}${product.features ? ` - Características: ${product.features.join(", ")}` : ""}`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-blue-900/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal — bottom sheet en móvil, centrado en desktop */}
      <div className="relative w-full sm:max-w-2xl bg-gradient-to-br from-purple-50/98 via-pink-50/98 to-blue-50/98 backdrop-blur-xl border border-purple-200/50 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom sm:zoom-in duration-300 max-h-[92dvh] flex flex-col">
        {/* Pill handle en móvil */}
        <div className="flex sm:hidden justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-purple-200" />
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-purple-100/80 hover:bg-purple-200/80 rounded-full transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X size={20} className="text-purple-900" />
        </button>

        {/* Scroll container */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row">
            {/* Imagen */}
            <div className="relative w-full sm:w-1/2 h-52 sm:h-96 bg-gradient-to-br from-purple-100/50 to-pink-100/50 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain p-6"
                quality={80}
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 p-5 sm:p-8 flex flex-col gap-4">
              {product.category && (
                <span className="px-2.5 py-1 text-xs font-medium text-purple-600 bg-purple-100/80 rounded border border-purple-200 w-fit">
                  {product.category}
                </span>
              )}

              <h2 className="text-xl sm:text-3xl font-bold text-gray-900">{product.name}</h2>

              {product.features && product.features.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Características</p>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs text-purple-700 bg-purple-50 rounded-lg border border-purple-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Precio + CTA */}
              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">Precio</p>
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {product.price}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Pesos colombianos</p>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1aa050] text-white rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-base cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Comprar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
