import { list } from "@vercel/blob"

async function listBlobImages() {
  try {
    console.log("[v0] Conectando a Vercel Blob...")

    const { blobs } = await list()

    console.log(`\n[v0] Total de archivos en Vercel Blob: ${blobs.length}\n`)

    if (blobs.length === 0) {
      console.log("[v0] ❌ No hay archivos en Vercel Blob")
      return
    }

    console.log("[v0] ✅ Archivos encontrados en Vercel Blob:\n")
    console.log(
      "Nome | URL | Tamaño | Fecha | Tipo"
    )
    console.log("-".repeat(150))

    blobs.forEach((blob, index) => {
      const fileName = blob.pathname.split("/").pop()
      const size = (blob.size / 1024).toFixed(2) + " KB"
      const date = new Date(blob.uploadedAt).toLocaleDateString("es-ES")
      const url = blob.url

      console.log(`${index + 1}. ${fileName}`)
      console.log(`   URL: ${url}`)
      console.log(`   Tamaño: ${size} | Fecha: ${date}\n`)
    })

    console.log("[v0] ✅ Listado completo de Blob generado")
  } catch (error) {
    console.error("[v0] ❌ Error al listar archivos de Blob:", error)
    process.exit(1)
  }
}

listBlobImages()
