import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StatsContent } from "@/components/stats-content"

export default async function StatsPage() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("admin_session")?.value

  if (!sessionToken || !verifySession(sessionToken)) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Estadísticas del Sitio</h1>
            <p className="text-gray-600">Análisis de visitas e interacciones (actualización automática cada 5s)</p>
          </div>
          <Link href="/admin">
            <Button variant="outline">Volver al Dashboard</Button>
          </Link>
        </div>

        <StatsContent />
      </div>
    </div>
  )
}
