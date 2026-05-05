import Header from "@/components/header"
import Footer from "@/components/footer"

export default function DevolucionesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#f5d7e3]">
      <Header />
      <main className="flex-1 py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2d2d3a] mb-8">Política de Devoluciones</h1>

          <div className="space-y-8 text-[#4a4a5e]">
            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Derecho de Retracto</h2>
              <p className="leading-relaxed">
                Según la ley colombiana, usted tiene derecho a retractarse de la compra de productos dentro de los
                primeros 5 días hábiles contados a partir de la entrega, siempre y cuando el producto no haya sido usado
                y se encuentre en su empaque original con todos sus accesorios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Productos Elegibles</h2>
              <p className="leading-relaxed mb-4">Pueden ser devueltos:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Dispositivos móviles sin uso, con empaque y accesorios completos</li>
                <li>Accesorios sin abrir en su empaque original</li>
                <li>Productos con defectos de fabricación o fallas desde el primer día</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Productos No Elegibles</h2>
              <p className="leading-relaxed mb-4">NO se aceptan devoluciones de:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Servicios de reparación completados</li>
                <li>Productos personalizados o con configuración especial</li>
                <li>Dispositivos con señales de uso, rayones, o daños</li>
                <li>Productos sin factura o comprobante de compra</li>
                <li>Accesorios abiertos o usados (por razones de higiene y seguridad)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Proceso de Devolución</h2>
              <p className="leading-relaxed mb-4">Para realizar una devolución:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contacte a MOVILAB dentro del plazo establecido</li>
                <li>Presente la factura o comprobante de compra original</li>
                <li>El producto será inspeccionado para verificar su estado</li>
                <li>Si cumple los requisitos, se procederá con el reembolso</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Reembolsos</h2>
              <p className="leading-relaxed">
                Los reembolsos se procesarán dentro de los 15 días hábiles siguientes a la aprobación de la devolución.
                El reembolso se realizará por el mismo medio de pago utilizado en la compra. Los costos de envío o
                domicilio no son reembolsables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Cambios</h2>
              <p className="leading-relaxed">
                Si desea cambiar un producto por otro de igual o mayor valor, podemos facilitarle el cambio en nuestros
                locales, sujeto a disponibilidad. El producto debe estar en las mismas condiciones que al momento de la
                compra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2d2d3a] mb-4">Contacto</h2>
              <p className="leading-relaxed">
                Para solicitar una devolución, contáctenos:
                <br />
                WhatsApp: +57 302 490 7101
                <br />O visite nuestros locales en Bogotá
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
