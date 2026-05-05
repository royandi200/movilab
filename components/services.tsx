"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface ServicesProps {
  scrollY: number
  fullView?: boolean
}

export default function Services({ scrollY, fullView = false }: ServicesProps) {
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
      title: "Garantía Extendida",
      description: "Todas nuestras reparaciones incluyen garantía completa. Transparencia y confianza garantizadas",
      badge: "6 meses",
      image: "/smartphone-protection-shield-premium-quality.jpg",
    },
  ]

  const displayedServices = fullView ? services : services.slice(0, 3)

  return (
    <section id="services" className="relative py-24 lg:py-32 px-6 lg:px-8 bg-black overflow-hidden">
      <div
        className="absolute top-20 right-0 opacity-[0.03] pointer-events-none hidden lg:block"
        style={{ transform: `translateX(${scrollY * 0.05}px)` }}
      >
        <Image src="/brand-text-element.svg" alt="" width={500} height={100} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <TitleReveal>
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 tracking-tight">
              Servicio que transforma
            </h2>
            <p className="text-base lg:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Lo complicado lo hacemos simple. Tecnología accesible para todos.
            </p>
          </div>
        </TitleReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {displayedServices.map((service, idx) => (
            <ServiceCard key={idx} service={service} idx={idx} scrollY={scrollY} />
          ))}
        </div>

        {!fullView && (
          <div className="text-center mt-12">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              Ver todos los servicios
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function ServiceCard({ service, idx, scrollY }: { service: any; idx: number; scrollY: number }) {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-700 overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{
        transform: `translateY(${isVisible ? Math.sin(scrollY * 0.003 + idx) * 5 : 20}px)`,
        transitionDelay: `${idx * 100}ms`,
      }}
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="p-8 lg:p-10">
        <div className="flex items-start justify-between mb-6">
          <div className="text-4xl lg:text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
            0{idx + 1}
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-white/5 text-white/70 rounded-full border border-white/10">
            {service.badge}
          </span>
        </div>

        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4 tracking-tight">{service.title}</h3>
        <p className="text-sm lg:text-base text-white/60 leading-relaxed">{service.description}</p>

        <div className="mt-8">
          <button className="text-sm font-medium text-white/70 hover:text-white transition-colors group-hover:translate-x-2 inline-flex items-center gap-2 duration-300 cursor-pointer">
            Más información
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function TitleReveal({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useScrollReveal(0.3)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {children}
    </div>
  )
}
