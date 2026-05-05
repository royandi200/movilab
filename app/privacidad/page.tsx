import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3]">
      <Header />
      <main className="flex-1 py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2d2d3a] mb-8">Política de Privacidad</h1>

          <div className="space-y-8 text-[#4a4a5e]">
            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Información que Recopilamos</h2>
              <p className="leading-relaxed">
                En MOVILAB recopilamos información personal que usted nos proporciona directamente cuando: utiliza
                nuestros servicios de reparación, compra productos, se comunica con nosotros, o visita nuestros locales.
                Esta información puede incluir nombre, teléfono, correo electrónico, dirección, y detalles del
                dispositivo a reparar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Uso de la Información</h2>
              <p className="leading-relaxed mb-4">Utilizamos su información personal para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Procesar y completar sus solicitudes de servicio o compras</li>
                <li>Comunicarnos con usted sobre el estado de su reparación</li>
                <li>Enviar confirmaciones, facturas y notificaciones</li>
                <li>Mejorar nuestros servicios y experiencia del cliente</li>
                <li>Cumplir con requisitos legales y regulatorios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Protección de Datos</h2>
              <p className="leading-relaxed">
                MOVILAB implementa medidas de seguridad técnicas y organizativas para proteger su información personal
                contra acceso no autorizado, pérdida, o alteración. Sus datos son almacenados de forma segura y solo el
                personal autorizado tiene acceso a ellos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Compartir Información</h2>
              <p className="leading-relaxed">
                No vendemos ni compartimos su información personal con terceros para fines de marketing. Solo
                compartimos datos cuando es necesario para completar el servicio solicitado, cumplir con la ley, o
                proteger nuestros derechos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Sus Derechos</h2>
              <p className="leading-relaxed mb-4">Usted tiene derecho a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acceder a la información personal que tenemos sobre usted</li>
                <li>Solicitar la corrección de datos incorrectos</li>
                <li>Solicitar la eliminación de su información personal</li>
                <li>Oponerse al procesamiento de sus datos</li>
                <li>Retirar su consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Contacto</h2>
              <p className="leading-relaxed">
                Si tiene preguntas sobre nuestra política de privacidad o desea ejercer sus derechos, contáctenos a
                través de WhatsApp al +57 302 490 7101 o visite cualquiera de nuestros locales.
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
