"use client"

import { MessageCircle } from "lucide-react"
import Image from "next/image"

export default function WhatsAppButton() {
  const phoneNumber = "573024907101"
  const message = encodeURIComponent("Hola! Me gustaría obtener más información sobre sus servicios.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Container with levitation animation */}
      <div className="relative animate-levitate">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />

        {/* Main button */}
        <div className="relative flex items-center gap-3 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full shadow-2xl group-hover:shadow-[#25D366]/50 transition-all duration-300 overflow-hidden">
          {/* Customer service woman image */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
            <Image src="/friendly-female-customer-service-representative-sm.jpg" alt="Customer Service" fill className="object-cover" />
          </div>

          {/* Text that appears on hover */}
          <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out pr-0 group-hover:pr-4">
            <p className="text-white font-medium text-sm whitespace-nowrap">Chatea con nosotros</p>
          </div>

          {/* WhatsApp icon */}
          <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-7 h-7 text-white" fill="currentColor" />
          </div>
        </div>

        {/* Pulse ring animation */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping-slow opacity-75" />
      </div>
    </a>
  )
}
