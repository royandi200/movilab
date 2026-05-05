import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("admin_session")?.value

  if (!sessionToken || !verifySession(sessionToken)) {
    redirect("/admin/login")
  }

  const handleLogout = async () => {
    "use server"
    const cookieStore = await cookies()
    cookieStore.delete("admin_session")
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona el inventario de MOVILAB</p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">Ver sitio público</Button>
            </Link>
            <form action={handleLogout}>
              <Button variant="outline" type="submit">
                Cerrar sesión
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/inventory">
            <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Gestión de Productos e Inventario</h2>
              <p className="text-gray-600">Administrar celulares y accesorios</p>
            </div>
          </Link>

          <Link href="/admin/stats">
            <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Estadísticas</h2>
              <p className="text-gray-600">Ver reportes y métricas de visitas</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
