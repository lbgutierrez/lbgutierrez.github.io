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
  quote: string | null
  quoteAuthor: string | null
}

export interface GallerySummary extends GalleryMeta {
  slug: string
  cover: string | null
  count: number
}

const galleryBasePath = path.join(process.cwd(), 'public', 'images', 'gallery')

/** Carpetas de series dentro de public/images/gallery */
export function getAllGallerySlugs(): string[] {
  return fs
    .readdirSync(galleryBasePath, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^[\w-]+$/.test(d.name))
    .map(d => d.name)
}

/** Leer imágenes y metadatos (README.md) de una serie */
export function getGalleryData(slug: string): GalleryData {
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
    images,
    title: data.title || 'Sin título',
    date: data.date || '',
    category: data.category || 'Sin categoría',
    author: data.author || 'Autor desconocido',
    quote: data.quote || null,
    quoteAuthor: data.quoteAuthor || null
  }
}

/** Listar todas las series, más recientes primero */
export function getAllGalleries(): GallerySummary[] {
  return getAllGallerySlugs()
    .map(slug => {
      const { images, quote, quoteAuthor, ...meta } = getGalleryData(slug)
      return { ...meta, cover: images[0] ?? null, count: images.length }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/**
 * Serie activa (Gallery.md → active). Sus fotos son el fondo del inicio.
 * Si no existe, se usa la serie más reciente.
 */
export function getActiveGallerySlug(): string {
  const slugs = getAllGallerySlugs()
  const activePath = path.join(galleryBasePath, 'Gallery.md')
  const active = fs.existsSync(activePath)
    ? matter(fs.readFileSync(activePath, 'utf8')).data.active
    : undefined

  if (typeof active === 'string' && slugs.includes(active)) {
    return active
  }
  return getAllGalleries()[0]?.slug ?? ''
}
