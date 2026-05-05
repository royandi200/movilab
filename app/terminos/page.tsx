import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3]">
      <Header />
      <main className="flex-1 py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2d2d3a] mb-8">Términos y Condiciones</h1>

          <div className="space-y-8 text-[#4a4a5e]">
            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Aceptación de Términos</h2>
              <p className="leading-relaxed">
                Al utilizar los servicios de MOVILAB, usted acepta estos términos y condiciones. Si no está de acuerdo
                con alguna parte de estos términos, no debe utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Servicios Ofrecidos</h2>
              <p className="leading-relaxed mb-4">MOVILAB ofrece:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reparación de dispositivos móviles y portátiles</li>
                <li>Diagnóstico gratuito de equipos</li>
                <li>Venta de dispositivos móviles certificados</li>
                <li>Venta de accesorios para dispositivos móviles</li>
                <li>Servicio de domicilio con equipo de préstamo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Responsabilidad del Cliente</h2>
              <p className="leading-relaxed mb-4">El cliente es responsable de:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Hacer respaldo de su información antes de entregar el equipo</li>
                <li>Proporcionar información veraz sobre el estado del dispositivo</li>
                <li>Retirar el equipo en los plazos acordados</li>
                <li>Pagar los servicios según las tarifas establecidas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Limitación de Responsabilidad</h2>
              <p className="leading-relaxed">
                MOVILAB no se hace responsable por pérdida de datos, información personal almacenada, o daños
                preexistentes no reportados al momento de recibir el dispositivo. Tampoco asumimos responsabilidad por
                daños causados por uso inadecuado posterior a la reparación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Pagos y Precios</h2>
              <p className="leading-relaxed">
                Los precios están sujetos a cambios sin previo aviso. Aceptamos pagos en efectivo, transferencias
                bancarias, y tarjetas de crédito/débito a través de nuestro link de pago Bold. Próximamente ofreceremos
                financiación con Addi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Modificaciones</h2>
              <p className="leading-relaxed">
                MOVILAB se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en
                vigor inmediatamente después de su publicación en nuestro sitio web.
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
