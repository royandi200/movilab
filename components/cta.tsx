"use client"

export default function CTA() {
  const handleDiagnostico = () => {
    const phoneNumber = "573024907101"
    const message = encodeURIComponent(
      "Hola, quisiera solicitar un diagnóstico gratuito para mi dispositivo. ¿Podrían ayudarme?",
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleSoporte = () => {
    const phoneNumber = "573024907101"
    const message = encodeURIComponent("Hola, necesito hablar con soporte técnico. ¿Podrían asistirme?")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4c5f9]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-[#2d2d3a] mb-8 tracking-tight leading-tight">
          Comienza hoy con MOVILAB
        </h2>
        <p className="text-base lg:text-xl text-[#6b6b7e] mb-12 max-w-2xl mx-auto leading-relaxed">
          Diagnóstico gratuito, reparación rápida y atención personalizada. Todo sin salir de casa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleDiagnostico}
            className="px-8 py-4 bg-gradient-to-r from-[#d4c5f9] to-[#ffc4d6] text-[#2d2d3a] rounded-full font-medium text-sm hover:opacity-90 transition-all duration-200 min-w-[200px] shadow-lg shadow-[#d4c5f9]/30 cursor-pointer"
          >
            Solicitar diagnóstico
          </button>
          <button
            onClick={handleSoporte}
            className="px-8 py-4 border-2 border-[#d4c5f9] text-[#2d2d3a] rounded-full font-medium text-sm hover:bg-[#d4c5f9]/10 transition-all duration-200 min-w-[200px] cursor-pointer"
          >
            Hablar con soporte
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-[#6b6b7e]">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Garantía incluida</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Recogida gratis</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Equipo de préstamo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
