"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@movilab.store")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    console.log("[v0] Login attempt for:", email)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      console.log("[v0] Auth response:", data)

      if (!response.ok) {
        setError(data.error || "Credenciales inválidas")
        setLoading(false)
        return
      }

      console.log("[v0] Login successful, redirecting to admin panel...")
      router.push("/admin")
      router.refresh()
    } catch (err) {
      console.error("[v0] Unexpected error:", err)
      setError("Error al iniciar sesión. Por favor intenta de nuevo.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Image src="/images/logotransnegro.png" alt="MOVILAB" width={200} height={50} className="h-12 w-auto" />
          </div>

          <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Admin Login</CardTitle>
              <CardDescription className="text-gray-600">Accede al panel de administración</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@movilab.store"
                      required
                      className="border-purple-200"
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-gray-700">
                      Contraseña
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-purple-200"
                      minLength={6}
                      disabled={loading}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={loading}
                  >
                    {loading ? "Ingresando..." : "Ingresar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
