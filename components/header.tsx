"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleContactClick = () => {
    const phoneNumber = "573024907101"
    const message = "Hola! Me gustaría obtener más información sobre sus servicios."
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-[#e8e3f3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/movilab-logo.png" alt="MOVILAB" width={180} height={40} className="h-8 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/servicios"
            className="text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors duration-200"
          >
            Servicios
          </Link>
          <Link
            href="/celulares"
            className="text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors duration-200"
          >
            Celulares
          </Link>
          <Link
            href="/accesorios"
            className="text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors duration-200"
          >
            Accesorios
          </Link>
          <Link
            href="/ubicaciones"
            className="text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors duration-200"
          >
            Ubicaciones
          </Link>
          <button
            onClick={handleContactClick}
            className="px-5 py-2.5 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full font-medium text-sm hover:opacity-90 transition-all duration-200 shadow-sm cursor-pointer"
          >
            Contactar
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#2d2d3a] p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#e8e3f3] px-6 py-6 space-y-4">
          <Link
            href="/servicios"
            className="block text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Servicios
          </Link>
          <Link
            href="/celulares"
            className="block text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Celulares
          </Link>
          <Link
            href="/accesorios"
            className="block text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Accesorios
          </Link>
          <Link
            href="/ubicaciones"
            className="block text-sm text-[#6b6b7e] hover:text-[#2d2d3a] transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Ubicaciones
          </Link>
          <button
            onClick={handleContactClick}
            className="w-full px-5 py-3 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full font-medium text-sm mt-4 cursor-pointer"
          >
            Contactar
          </button>
        </nav>
      )}
    </header>
  )
}
