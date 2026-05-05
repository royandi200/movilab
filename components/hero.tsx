"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface HeroProps {
  scrollY: number
}

export default function Hero({ scrollY }: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const opacity = Math.max(0, 1 - scrollY / 500)
  const scale = Math.max(0.95, 1 - scrollY / 5000)

  const handleDiagnostico = () => {
    const phoneNumber = "573024907101"
    const message = encodeURIComponent(
      "Hola, quisiera solicitar un diagnóstico gratuito para mi dispositivo. ¿Podrían ayudarme?",
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleVerCelulares = () => {
    window.location.href = "/celulares"
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3] pt-20">
      {/* Background gradient effects */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          background: "radial-gradient(circle at 50% 0%, rgba(212, 197, 249, 0.4), transparent 50%)",
        }}
      />

      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#d4c5f9]/20 rounded-full blur-3xl"
        style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)` }}
      />

      <div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#ffc4d6]/20 rounded-full blur-3xl"
        style={{ transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.15}px)` }}
      />

      <div
        className="absolute top-1/4 left-10 opacity-5 pointer-events-none hidden xl:block"
        style={{ transform: `translateY(${scrollY * -0.2}px) rotate(-5deg)` }}
      >
        <Image src="/movilab-icon.png" alt="" width={200} height={200} />
      </div>

      <div
        className="absolute bottom-1/4 right-10 opacity-5 pointer-events-none hidden xl:block"
        style={{ transform: `translateY(${scrollY * 0.15}px) rotate(5deg)` }}
      >
        <Image src="/movilab-icon.png" alt="" width={200} height={200} />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 px-6 lg:px-8 text-center max-w-5xl mx-auto transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          opacity: opacity,
          transform: `translateY(${scrollY * -0.1}px) scale(${scale})`,
        }}
      >
        <div className="mb-6">
          <span className="inline-block text-xs lg:text-sm text-[#6b6b7e] font-medium tracking-[0.2em] uppercase">
            Tecnología sin complicaciones
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-[#2d2d3a] mb-8 leading-[1.1] tracking-tight">
          Tu celular,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6]">
            nuestra prioridad
          </span>
        </h1>

        <p className="text-base lg:text-xl text-[#6b6b7e] mb-12 max-w-3xl mx-auto leading-relaxed">
          Reparación, diagnóstico y venta de dispositivos móviles. 100% digital, con recogida a domicilio y equipo de
          préstamo incluido.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleDiagnostico}
            className="px-8 py-4 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full font-medium text-sm hover:opacity-90 transition-all duration-200 min-w-[200px] shadow-lg shadow-[#d4c5f9]/30 cursor-pointer"
          >
            Diagnóstico Gratis
          </button>
          <button
            onClick={handleVerCelulares}
            className="px-8 py-4 border-2 border-[#d4c5f9] text-[#2d2d3a] rounded-full font-medium text-sm hover:bg-[#d4c5f9]/10 transition-all duration-200 min-w-[200px] cursor-pointer"
          >
            Ver Celulares
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 lg:mt-32 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { value: "24h", label: "Reparación promedio" },
            { value: "5★", label: "Calificación" },
            { value: "1000+", label: "Clientes felices" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center"
              style={{
                animation: mounted ? `fadeInUp 0.6s ease-out ${i * 0.1}s forwards` : "none",
                opacity: mounted ? 1 : 0,
              }}
            >
              <div className="text-2xl lg:text-4xl font-bold text-[#2d2d3a] mb-2">{stat.value}</div>
              <div className="text-xs lg:text-sm text-[#6b6b7e]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
