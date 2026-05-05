"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import Image from "next/image"

export default function Locations({ scrollY }: { scrollY: number }) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.3)
  const { ref: location1Ref, isVisible: location1Visible } = useScrollReveal(0.2)
  const { ref: location2Ref, isVisible: location2Visible } = useScrollReveal(0.2)

  return (
    <section
      ref={sectionRef}
      id="ubicaciones"
      className="relative py-24 lg:py-32 bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3]"
      style={{
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={titleRef}
          className="text-center mb-20"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Nuestras Tiendas</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Visítanos en cualquiera de nuestras ubicaciones en Bogotá
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Location 1 - ECOLOR */}
          <div
            ref={location1Ref}
            className="group"
            style={{
              opacity: location1Visible ? 1 : 0,
              transform: location1Visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <div className="relative h-80 mb-6 overflow-hidden rounded-2xl">
              <Image
                src="/store-ecolor.png"
                alt="MOVILAB ECOLOR - Centro de Tecnología"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">MOVILAB ECOLOR</h3>
            <p className="text-gray-600 mb-6">Centro de Tecnología ECOLOR, Bogotá</p>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-purple-200/50 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8!2d-74.1!3d4.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnMDAuMCJOIDc0wrAwNicwMC4wIlc!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://maps.app.goo.gl/VMqsBfiNAmHCgyoy7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Ver en Google Maps</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Location 2 - Centro Comercial */}
          <div
            ref={location2Ref}
            className="group"
            style={{
              opacity: location2Visible ? 1 : 0,
              transform: location2Visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            }}
          >
            <div className="relative h-80 mb-6 overflow-hidden rounded-2xl">
              <Image
                src="/store-centro.png"
                alt="MOVILAB Centro Comercial"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">MOVILAB Centro</h3>
            <p className="text-gray-600 mb-6">Centro Comercial, Bogotá</p>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-purple-200/50 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9!2d-74.08!3d4.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzknMDAuMCJOIDc0wrAwNCc0OC4wIlc!5e0!3m2!1ses!2sco!4v1234567891"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://maps.app.goo.gl/WGZmXXRHBjxvx8GT7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Ver en Google Maps</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
