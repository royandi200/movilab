"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import PhoneCarouselSubmenu from "@/components/phone-carousel-submenu"
import ServiceDetails from "@/components/service-details"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function ServiciosPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative overflow-x-hidden bg-background">
      <Header />
      <PhoneCarouselSubmenu />
      <div className="pt-48">
        <ServiceDetails scrollY={scrollY} />
      </div>
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
