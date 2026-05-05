"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsData {
  totalPageViews: number
  totalProductClicks: number
  recentPageViews: number
  recentProductClicks: number
  deviceStats: [string, number][]
  browserStats: [string, number][]
  osStats: [string, number][]
  topPages: [string, number][]
  topProducts: { name: string; count: number }[]
}

export function StatsContent() {
  const [stats, setStats] = useState<StatsData>({
    totalPageViews: 0,
    totalProductClicks: 0,
    recentPageViews: 0,
    recentProductClicks: 0,
    deviceStats: [],
    browserStats: [],
    osStats: [],
    topPages: [],
    topProducts: [],
  })
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/analytics/stats")
      const data = await res.json()
      setStats(data)
      setLastUpdate(new Date())
    } catch {}
  }

  useEffect(() => {
    // Initial fetch
    fetchStats()

    // Set up auto-refresh every 5 seconds
    const interval = setInterval(fetchStats, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="mb-4 text-right">
        <p className="text-sm text-gray-500">Última actualización: {lastUpdate.toLocaleTimeString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Total Visitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.totalPageViews}</div>
            <p className="text-xs text-gray-500 mt-1">Todas las páginas vistas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Clics en Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-600">{stats.totalProductClicks}</div>
            <p className="text-xs text-gray-500 mt-1">Total de interacciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Últimas 24h - Visitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.recentPageViews}</div>
            <p className="text-xs text-gray-500 mt-1">Actividad reciente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Últimas 24h - Clics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-600">{stats.recentProductClicks}</div>
            <p className="text-xs text-gray-500 mt-1">Interacciones recientes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Dispositivo</CardTitle>
            <CardDescription>Distribución por dispositivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.deviceStats.map(([device, count]) => {
                const percentage = stats.totalPageViews ? ((count / stats.totalPageViews) * 100).toFixed(1) : 0
                return (
                  <div key={device}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{device}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
              {stats.deviceStats.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">No hay datos disponibles</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Navegadores</CardTitle>
            <CardDescription>Distribución por navegador</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.browserStats.map(([browser, count]) => {
                const percentage = stats.totalPageViews ? ((count / stats.totalPageViews) * 100).toFixed(1) : 0
                return (
                  <div key={browser}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{browser}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
              {stats.browserStats.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">No hay datos disponibles</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistemas Operativos</CardTitle>
            <CardDescription>Distribución por SO</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.osStats.map(([os, count]) => {
                const percentage = stats.totalPageViews ? ((count / stats.totalPageViews) * 100).toFixed(1) : 0
                return (
                  <div key={os}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{os}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
              {stats.osStats.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">No hay datos disponibles</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Páginas Más Visitadas</CardTitle>
            <CardDescription>Top 10 páginas por número de visitas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topPages.map(([path, count], idx) => (
                <div key={path} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-medium">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{path}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{count} visitas</span>
                </div>
              ))}
              {stats.topPages.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">No hay datos disponibles</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Más Clickeados</CardTitle>
            <CardDescription>Top 10 productos por interacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-medium">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700 truncate">{product.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 ml-2">{product.count} clics</span>
                </div>
              ))}
              {stats.topProducts.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">No hay datos disponibles</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
