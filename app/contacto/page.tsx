import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, Phone, Clock } from "lucide-react"

export default function ContactoPage() {
  const whatsappNumber = "573024907101"

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3]">
      <Header />
      <main className="flex-1 py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2d2d3a] mb-8">Contacto</h1>

          <div className="space-y-8">
            <section>
              <p className="text-lg text-[#4a4a5e] leading-relaxed mb-8">
                Estamos aquí para ayudarte. Contáctanos a través de cualquiera de estos medios.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-[#d4c5f9]/30">
                  <Phone className="w-8 h-8 text-[#a084dc] mb-4" />
                  <h3 className="text-xl font-semibold text-[#2d2d3a] mb-2">WhatsApp</h3>
                  <p className="text-[#4a4a5e] mb-4">Respuesta inmediata</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola! Necesito información sobre los servicios de MOVILAB.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
                  >
                    +57 302 490 7101
                  </a>
                </div>

                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-[#d4c5f9]/30">
                  <Clock className="w-8 h-8 text-[#a084dc] mb-4" />
                  <h3 className="text-xl font-semibold text-[#2d2d3a] mb-2">Horario</h3>
                  <p className="text-[#4a4a5e]">
                    Lunes a Sábado
                    <br />
                    9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-6">Nuestras Ubicaciones</h2>

              <div className="space-y-6">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5f9]/30">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#a084dc] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#2d2d3a] mb-2">Centro de Tecnología ECOLOR</h3>
                      <p className="text-[#4a4a5e] mb-3">Bogotá, Colombia</p>
                      <a
                        href="https://maps.app.goo.gl/VMqsBfiNAmHCgyoy7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a084dc] hover:text-[#8b5cf6] transition-colors text-sm font-medium"
                      >
                        Ver en Google Maps →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5f9]/30">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#a084dc] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#2d2d3a] mb-2">Centro Comercial</h3>
                      <p className="text-[#4a4a5e] mb-3">Bogotá, Colombia</p>
                      <a
                        href="https://maps.app.goo.gl/WGZmXXRHBjxvx8GT7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a084dc] hover:text-[#8b5cf6] transition-colors text-sm font-medium"
                      >
                        Ver en Google Maps →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
