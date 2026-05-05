import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#e8e3f3] to-[#f5d7e3] border-t border-[#d4c5f9]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold text-[#2d2d3a] mb-4">MOVILAB</h3>
            <p className="text-sm text-[#6b6b7e] leading-relaxed max-w-xs">
              Transformando la experiencia de reparación y compra de dispositivos móviles en Colombia.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#2d2d3a] mb-4">Servicios</h4>
            <ul className="space-y-3 text-sm text-[#6b6b7e]">
              <li>
                <Link href="/servicios" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Reparación
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Diagnóstico
                </Link>
              </li>
              <li>
                <Link href="/celulares" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Venta de equipos
                </Link>
              </li>
              <li>
                <Link href="/accesorios" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#2d2d3a] mb-4">Empresa</h4>
            <ul className="space-y-3 text-sm text-[#6b6b7e]">
              <li>
                <Link href="/nosotros" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#2d2d3a] mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-[#6b6b7e]">
              <li>
                <Link href="/privacidad" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Garantía
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="hover:text-[#2d2d3a] transition-colors cursor-pointer">
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d4c5f9]/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#6b6b7e]">
          <p>© 2025 MOVILAB. Todos los derechos reservados.</p>
          <p>Bogotá • Medellín • Cali</p>
        </div>
      </div>
    </footer>
  )
}
