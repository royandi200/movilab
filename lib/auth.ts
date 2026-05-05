// Simple authentication without Supabase Auth
const ADMIN_CREDENTIALS = {
  email: "admin@movilab.store",
  password: "Admin123!", // In production, this should be hashed
}

export function verifyCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function createSession(email: string): string {
  // Simple session token (in production, use proper JWT)
  const sessionData = {
    email,
    isAdmin: true,
    timestamp: Date.now(),
  }
  return Buffer.from(JSON.stringify(sessionData)).toString("base64")
}

export function verifySession(token: string): { email: string; isAdmin: boolean } | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8")
    const session = JSON.parse(decoded)

    // Check if session is less than 24 hours old
    const age = Date.now() - session.timestamp
    if (age > 24 * 60 * 60 * 1000) {
      return null
    }

    return { email: session.email, isAdmin: session.isAdmin }
  } catch {
    return null
  }
}
