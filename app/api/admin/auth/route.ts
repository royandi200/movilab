import { type NextRequest, NextResponse } from "next/server"
import { verifyCredentials, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("[v0] Auth attempt for:", email)

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 })
    }

    if (!verifyCredentials(email, password)) {
      console.log("[v0] Invalid credentials")
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    const sessionToken = createSession(email)

    console.log("[v0] Login successful")

    const response = NextResponse.json({ success: true, message: "Login exitoso" }, { status: 200 })

    // Set cookie with session token
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[v0] Auth error:", error)
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("admin_session")
  return response
}
