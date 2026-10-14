import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface GalleryMeta {
  title: string
  date: string
  category: string
  author: string
}

export interface GalleryData extends GalleryMeta {
  slug: string
  images: string[]
}

const galleryBasePath = path.join(process.cwd(), 'public', 'images', 'gallery')

/** 1) Leer el nombre de la galería activa desde ActiveGallery.md */
export function getActiveGallerySlug(): string {
  const activePath = path.join(galleryBasePath, 'Gallery.md')
  const content = fs.readFileSync(activePath, 'utf8')
  const { data } = matter(content)

  if (!data.active || typeof data.active !== 'string') {
    throw new Error('ActiveGallery.md debe tener la propiedad "active"')
  }

  return data.active
}

/** 2) Obtener los datos de la galería activa */
export function getActiveGalleryData(): GalleryData {
  const slug = getActiveGallerySlug()
  const folderPath = path.join(galleryBasePath, slug)
  const files = fs.readdirSync(folderPath)

  const images = files.filter(file =>
    /\.(jpe?g|png|webp)$/i.test(file)
  )

  const readmePath = path.join(folderPath, 'README.md')
  const readmeContent = fs.existsSync(readmePath)
    ? fs.readFileSync(readmePath, 'utf8')
    : ''

  const { data } = matter(readmeContent)

  const metadata: GalleryMeta = {
    title: data.title || 'Sin título',
    date: data.date || 'Fecha desconocida',
    category: data.category || 'Sin categoría',
    author: data.author || 'Autor desconocido'
  }

  return {
    slug,
    images,
    ...metadata
  }
}

export interface GallerySummary extends GalleryMeta {
  slug: string
  cover: string | null
  count: number
}

/** 3) Listar todas las series (carpetas con README.md), más recientes primero */
export function getAllGalleries(): GallerySummary[] {
  const dirs = fs
    .readdirSync(galleryBasePath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  return dirs
    .map(slug => {
      const folderPath = path.join(galleryBasePath, slug)
      const images = fs
        .readdirSync(folderPath)
        .filter(file => /\.(jpe?g|png|webp)$/i.test(file))
        .sort()

      const readmePath = path.join(folderPath, 'README.md')
      const { data } = matter(
        fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : ''
      )

      return {
        slug,
        cover: images[0] ?? null,
        count: images.length,
        title: data.title || 'Sin título',
        date: data.date || '',
        category: data.category || 'Sin categoría',
        author: data.author || 'Autor desconocido'
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
