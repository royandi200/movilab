"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ServicesCarouselProps {
  scrollY: number
}

export default function ServicesCarousel({ scrollY }: ServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const services = [
    {
      title: "Diagnóstico Inteligente",
      description: "Sistema de análisis remoto que identifica el problema de tu dispositivo sin necesidad de visitas",
      badge: "Gratis",
      image: "/modern-smartphone-diagnostic-tools-holographic-dis.jpg",
    },
    {
      title: "Reparación Express",
      description:
        "Recogemos tu equipo, lo reparamos en tiempo récord y te lo devolvemos. Préstamo de dispositivo incluido",
      badge: "24-48h",
      image: "/sleek-phone-repair-station-futuristic-tech-lab.jpg",
    },
    {
      title: "Microsoldadura Avanzada",
      description:
        "Reparaciones complejas de nivel profesional: cortos circuitos, daños por humedad y componentes internos",
      badge: "3-7 días",
      image: "/electronic-circuit-board-microsolder-repair-lab.jpg",
    },
    {
      title: "Servicio Técnico para Portátiles",
      description: "Mantenimiento, reparación y actualización de computadores. Software remoto y cambio de componentes",
      badge: "Express",
      image: "/laptop-computer-repair-workstation-modern.jpg",
    },
    {
      title: "Aumento de Memoria",
      description: "Ampliamos el almacenamiento interno de tu dispositivo. Mayor capacidad sin cambiar de equipo",
      badge: "Especializado",
      image: "/smartphone-storage-upgrade-chip-replacement.jpg",
    },
    {
      title: "Garantía Extendida",
      description: "Todas nuestras reparaciones incluyen garantía de 1 año. Transparencia y confianza garantizadas",
      badge: "1 año",
      image: "/smartphone-protection-shield-premium-quality.jpg",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [services.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const handleServiceClick = (serviceTitle: string) => {
    const phoneNumber = "573024907101"
    let message = ""

    if (serviceTitle.includes("Diagnóstico")) {
      message = "Hola, quisiera solicitar un diagnóstico inteligente para mi dispositivo. ¿Podrían ayudarme?"
    } else {
      message = `Hola, quisiera más información sobre el servicio: ${serviceTitle}`
    }

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-br from-[#e8e3f3] via-[#f5d7e3] to-[#f8f7fc] overflow-hidden"
    >
      <div
        className="absolute top-20 right-0 opacity-[0.03] pointer-events-none hidden lg:block"
        style={{ transform: `translateX(${scrollY * 0.05}px)` }}
      >
        <Image src="/brand-text-element.svg" alt="" width={500} height={100} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-[#2d2d3a] mb-6 tracking-tight">
            Servicio que transforma
          </h2>
          <p className="text-base lg:text-lg text-[#6b6b7e] max-w-2xl mx-auto leading-relaxed">
            Lo complicado lo hacemos simple. Tecnología accesible para todos.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <div className="relative rounded-2xl border border-[#d4c5f9]/30 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-[#d4c5f9]/50 transition-all duration-700 overflow-hidden shadow-lg shadow-[#d4c5f9]/10">
                    <div className="relative h-64 lg:h-80 overflow-hidden bg-gradient-to-br from-[#d4c5f9]/10 to-transparent">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover opacity-40 group-hover:opacity-60 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />

                      <div className="absolute top-6 right-6">
                        <span className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full border border-[#d4c5f9]/30">
                          {service.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12">
                      <div className="text-6xl lg:text-7xl font-bold text-[#d4c5f9]/20 mb-6">0{idx + 1}</div>
                      <h3 className="text-2xl lg:text-3xl font-semibold text-[#2d2d3a] mb-4 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-base lg:text-lg text-[#6b6b7e] leading-relaxed">{service.description}</p>
                      <button
                        onClick={() => handleServiceClick(service.title)}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full font-medium text-sm hover:opacity-90 transition-all duration-200 shadow-md shadow-[#d4c5f9]/20 cursor-pointer"
                      >
                        Solicitar servicio
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#d4c5f9]/30 flex items-center justify-center text-[#2d2d3a] hover:bg-white hover:border-[#d4c5f9]/50 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#d4c5f9]/30 flex items-center justify-center text-[#2d2d3a] hover:bg-white hover:border-[#d4c5f9]/50 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 h-2 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] rounded-full"
                    : "w-2 h-2 bg-[#d4c5f9]/30 rounded-full hover:bg-[#d4c5f9]/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors text-sm font-medium"
          >
            Ver todos los servicios
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
