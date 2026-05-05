import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NosotrosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3]">
      <Header />
      <main className="flex-1 py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2d2d3a] mb-8">Sobre MOVILAB</h1>

          <div className="space-y-8 text-[#4a4a5e]">
            <section>
              <p className="text-xl leading-relaxed text-[#2d2d3a] font-medium mb-6">
                Transformamos lo complejo en simple. Tecnología accesible para todos.
              </p>
              <p className="leading-relaxed">
                MOVILAB es una plataforma digital especializada en diagnóstico, reparación, compra y venta de
                dispositivos móviles en Colombia. Nos caracterizamos por ser el guardián confiable de tu tecnología,
                convirtiendo cada problema técnico en una solución accesible y transparente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Nuestra Misión</h2>
              <p className="leading-relaxed">
                Hacer que la tecnología móvil sea accesible, confiable y duradera para todos los colombianos, ofreciendo
                servicios de reparación de calidad, diagnósticos precisos, y dispositivos certificados con garantía.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Nuestros Valores</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5f9]/30">
                  <h3 className="font-semibold text-[#2d2d3a] mb-2">Confianza</h3>
                  <p className="text-sm">Protegemos tu tecnología como si fuera nuestra</p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5f9]/30">
                  <h3 className="font-semibold text-[#2d2d3a] mb-2">Transparencia</h3>
                  <p className="text-sm">Comunicación clara y honesta en cada servicio</p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5f9]/30">
                  <h3 className="font-semibold text-[#2d2d3a] mb-2">Calidad</h3>
                  <p className="text-sm">Piezas certificadas y técnicos especializados</p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5f9]/30">
                  <h3 className="font-semibold text-[#2d2d3a] mb-2">Innovación</h3>
                  <p className="text-sm">Tecnología y procesos actualizados constantemente</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Nuestras Ubicaciones</h2>
              <div className="space-y-4">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5f9]/30">
                  <h3 className="font-semibold text-[#2d2d3a] mb-2">Centro de Tecnología ECOLOR</h3>
                  <p className="text-sm">Bogotá, Colombia</p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5f9]/30">
                  <h3 className="font-semibold text-[#2d2d3a] mb-2">Centro Comercial</h3>
                  <p className="text-sm">Bogotá, Colombia</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">¿Por Qué Elegirnos?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#a084dc] mt-1">✓</span>
                  <span>Diagnóstico gratuito para todos los dispositivos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a084dc] mt-1">✓</span>
                  <span>Servicio a domicilio con equipo de préstamo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a084dc] mt-1">✓</span>
                  <span>Garantía de un año en reparaciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a084dc] mt-1">✓</span>
                  <span>Dispositivos certificados con procedencia verificada</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a084dc] mt-1">✓</span>
                  <span>Múltiples opciones de pago y próxima financiación</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
