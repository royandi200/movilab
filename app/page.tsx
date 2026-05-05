"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import PhoneCarouselSubmenu from "@/components/phone-carousel-submenu"
import Hero from "@/components/hero"
import ServicesCarousel from "@/components/services-carousel"
import PhonesCarousel from "@/components/phones-carousel"
import Accessories from "@/components/accessories"
import Locations from "@/components/locations"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function Home() {
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
        <Hero scrollY={scrollY} />
      </div>
      <ServicesCarousel scrollY={scrollY} />
      <PhonesCarousel scrollY={scrollY} />
      <Accessories scrollY={scrollY} fullView={false} />
      <Locations scrollY={scrollY} fullView={false} />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
