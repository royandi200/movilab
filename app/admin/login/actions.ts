"use server"

import { verifyCredentials, createSession } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const isValid = verifyCredentials(email, password)

  if (!isValid) {
    return { error: "Credenciales incorrectas" }
  }

  const token = createSession(email)
  const cookieStore = await cookies()
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })

  redirect("/admin")
}
