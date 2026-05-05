"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import PhoneCarouselSubmenu from "@/components/phone-carousel-submenu"
import Accessories from "@/components/accessories"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function AccesoriosPage() {
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
        <Accessories scrollY={scrollY} fullView={true} />
      </div>
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
