"use client"

import type React from "react"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Wrench, Clock, CreditCard, Shield, Smartphone, Laptop } from "lucide-react"

interface ServiceDetailsProps {
  scrollY: number
}

export default function ServiceDetails({ scrollY }: ServiceDetailsProps) {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-br from-[#f8f7fc] via-[#e8e3f3] to-[#d4c5f9] overflow-hidden">
      <div
        className="absolute top-20 right-0 opacity-[0.05] pointer-events-none hidden lg:block"
        style={{ transform: `translateX(${scrollY * 0.05}px)` }}
      >
        <Image src="/brand-text-element.svg" alt="" width={500} height={100} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <TitleReveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Reparación y Mantenimiento
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Servicio técnico especializado con domicilio, diagnóstico profesional y garantía de un año.
            </p>
          </div>
        </TitleReveal>

        {/* Repair Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <ServiceTypeCard
            icon={<Smartphone className="w-8 h-8" />}
            title="Reparación de Dispositivos Móviles"
            description="Servicio especializado para smartphones y tablets"
            features={[
              {
                title: "Reparaciones Express",
                time: "Unas horas",
                items: ["Cambio de batería", "Reemplazo de pantalla", "Cambio de piezas", "Software y actualización"],
              },
              {
                title: "Reparaciones Especializadas",
                time: "3 días diagnóstico + 1 semana reparación",
                items: [
                  "Equipos mojados",
                  "Cortos circuitos",
                  "Microsoldadura",
                  "Aumento de memoria",
                  "Problemas de procesador",
                  "Integrados de carga",
                ],
              },
            ]}
          />

          <ServiceTypeCard
            icon={<Laptop className="w-8 h-8" />}
            title="Reparación de Portátiles y Computadores"
            description="Mantenimiento y reparación de equipos de cómputo"
            features={[
              {
                title: "Servicio Rápido",
                time: "Unas horas",
                items: ["Software remoto", "Cambio de piezas", "Mantenimiento preventivo", "Actualizaciones"],
              },
              {
                title: "Reparaciones Complejas",
                time: "Bajo diagnóstico",
                items: [
                  "Problemas de cortos",
                  "Daños por humedad",
                  "Reemplazo de componentes",
                  "Recuperación de datos",
                ],
              },
            ]}
          />
        </div>

        {/* Process Section */}
        <ProcessSection />

        {/* Payment Methods */}
        <PaymentSection />

        {/* Warranty Section */}
        <WarrantySection />
      </div>
    </section>
  )
}

function ServiceTypeCard({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: Array<{ title: string; time: string; items: string[] }>
}) {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl border border-purple-200/50 bg-white/60 backdrop-blur-sm p-8 lg:p-10 shadow-lg transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-700">{icon}</div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
      </div>

      {features.map((feature, idx) => (
        <div key={idx} className="mb-8 last:mb-0">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
              {feature.time}
            </span>
          </div>
          <ul className="space-y-2">
            {feature.items.map((item, i) => (
              <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ProcessSection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  const steps = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Recolección",
      description:
        "Nuestro domiciliario recoge tu equipo y te entrega un dispositivo de préstamo mientras reparamos el tuyo.",
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Diagnóstico y Reparación",
      description: "Analizamos el problema y realizamos la reparación con piezas originales de alta calidad.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Entrega Express",
      description:
        "Reparaciones normales en horas. Casos especiales en 3 días de diagnóstico + 1 semana de reparación.",
    },
  ]

  return (
    <div
      ref={ref}
      className={`mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Proceso simple y transparente. Te mantenemos informado en cada paso.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative rounded-xl border border-purple-200/50 bg-white/60 backdrop-blur-sm shadow-md p-6"
          >
            <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
              {idx + 1}
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-700 w-fit mb-4 mt-2">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PaymentSection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  const paymentMethods = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Link de Pago Bold",
      description: "Aceptamos todas las tarjetas de crédito y débito mediante link de pago seguro.",
    },
    {
      icon: "💵",
      title: "Efectivo Contraentrega",
      description: "Paga en efectivo cuando recibas tu dispositivo reparado.",
    },
    {
      icon: "🏦",
      title: "Financiamiento Addi",
      description: "Próximamente: financia tu reparación o compra con cuotas flexibles.",
    },
  ]

  const deliveryInfo = [
    {
      title: "Ventas - Mismo día",
      description:
        "Pedidos cerrados antes de las 5:00 PM se despachan el mismo día. Después, al día siguiente en la mañana.",
    },
  ]

  return (
    <div
      ref={ref}
      className={`mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Métodos de Pago</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Múltiples opciones para tu comodidad</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {paymentMethods.map((method, idx) => (
          <div key={idx} className="rounded-xl border border-purple-200/50 bg-white/60 backdrop-blur-sm shadow-md p-6">
            <div className="text-3xl mb-4">{typeof method.icon === "string" ? method.icon : method.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
            <p className="text-gray-600 text-sm">{method.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50/80 backdrop-blur-sm p-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tiempos de Entrega</h3>
            <p className="text-gray-700 text-sm">{deliveryInfo[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function WarrantySection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Garantía y Protección</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Tu tranquilidad es nuestra prioridad</p>
      </div>

      <div className="rounded-2xl border border-purple-200/50 bg-white/60 backdrop-blur-sm shadow-lg p-8 lg:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-700">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Garantía de 1 Año</h3>
            <p className="text-gray-600">Todas nuestras reparaciones están respaldadas</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Cobertura Incluida</h4>
            <ul className="space-y-2">
              <li className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Defectos de fabricación en piezas</span>
              </li>
              <li className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Fallas en el servicio realizado</span>
              </li>
              <li className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Reemplazo por equipo equivalente si aplica</span>
              </li>
              <li className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Atención prioritaria en garantía</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Términos Especiales</h4>
            <ul className="space-y-2">
              <li className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-gray-400 mt-1">*</span>
                <span>No cubre daños por humedad o líquidos</span>
              </li>
              <li className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-gray-400 mt-1">*</span>
                <span>Face ID tiene términos específicos</span>
              </li>
              <li className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-gray-400 mt-1">*</span>
                <span>Daños físicos externos no incluidos</span>
              </li>
              <li className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-gray-400 mt-1">*</span>
                <span>Según ley: respuesta en 15 días hábiles</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-purple-50/80 border border-purple-200">
          <p className="text-gray-700 text-sm text-center">
            <strong className="text-gray-900">Compromiso MOVILAB:</strong> Aunque la ley establece 15 días hábiles, nos
            esforzamos por despachar las garantías el mismo día.
          </p>
        </div>
      </div>
    </div>
  )
}

function TitleReveal({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useScrollReveal(0.3)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {children}
    </div>
  )
}
