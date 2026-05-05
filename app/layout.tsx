import type React from "react"
import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import "./globals.css"

const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "MOVILAB - Reparación y Venta de Celulares",
  description:
    "Tecnología a tu alcance. Reparamos, diagnosticamos y vendemos celulares. Recogemos y entregamos a domicilio. 100% digital, sin enredos.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${robotoMono.variable} font-sans antialiased`}>
        <AnalyticsTracker />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
