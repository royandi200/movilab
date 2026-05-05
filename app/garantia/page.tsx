import Header from "@/components/header"
import Footer from "@/components/footer"

export default function GarantiaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3]">
      <Header />
      <main className="flex-1 py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2d2d3a] mb-8">Garantía</h1>

          <div className="space-y-8 text-[#4a4a5e]">
            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Cobertura de Garantía</h2>
              <p className="leading-relaxed mb-4">
                MOVILAB ofrece garantía de un año en todos nuestros servicios de reparación y productos vendidos,
                cubriendo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Defectos de fabricación en piezas instaladas</li>
                <li>Fallas relacionadas con el servicio realizado</li>
                <li>Mal funcionamiento de componentes reemplazados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Exclusiones de Garantía</h2>
              <p className="leading-relaxed mb-4">La garantía NO cubre:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Daños por humedad o líquidos</li>
                <li>Daños físicos causados por caídas o golpes</li>
                <li>Manipulación por terceros no autorizados</li>
                <li>Desgaste normal por uso</li>
                <li>Face ID en dispositivos iPhone (componente de seguridad Apple)</li>
                <li>Batería (garantía limitada de 3 meses)</li>
                <li>Accesorios externos como cargadores o cables</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Proceso de Garantía</h2>
              <p className="leading-relaxed mb-4">Para hacer válida la garantía:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contacte a MOVILAB a través de WhatsApp o visite nuestros locales</li>
                <li>Presente su orden de servicio o factura de compra</li>
                <li>El equipo será evaluado para confirmar que la falla está cubierta</li>
                <li>Si aplica, se realizará la reparación o cambio sin costo adicional</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Tiempos de Respuesta</h2>
              <p className="leading-relaxed">
                Según lo establecido por ley colombiana, las solicitudes de garantía serán atendidas en un plazo máximo
                de 15 días hábiles. En MOVILAB nos esforzamos por resolver las reclamaciones el mismo día cuando es
                posible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Cambio por Defecto</h2>
              <p className="leading-relaxed">
                En caso de que un dispositivo vendido presente fallas recurrentes cubiertas por garantía, MOVILAB puede
                ofrecer el cambio por otro equipo de características similares, sujeto a disponibilidad y evaluación
                técnica.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Contacto para Garantías</h2>
              <p className="leading-relaxed">
                WhatsApp: +57 302 490 7101
                <br />
                Horario: Lunes a Sábado, 9:00 AM - 7:00 PM
                <br />
                Localidad ECOLOR y Centro Comercial
              </p>
            </section>

            <p className="text-sm text-[#6b6b7e] mt-12">Última actualización: Diciembre 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
