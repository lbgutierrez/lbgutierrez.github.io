import { GetStaticProps, NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import { formatDateVerboseES } from '@/lib/date'
import Head from 'next/head'

interface GalleryMeta {
  title: string
  date: string
  category: string
  author: string
}

interface GalleryPageProps {
  slug: string
  metadata: GalleryMeta
  images: string[]
}

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => {
  const basePath = path.join(process.cwd(), 'public', 'images', 'gallery')
  const activeFile = fs.readFileSync(path.join(basePath, 'Gallery.md'), 'utf8')
  const rawActiveSlug = matter(activeFile).data.active as string

  // Validar slug y verificar que exista el directorio
  const dirs = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const safeSlug = typeof rawActiveSlug === 'string' && /^[\w-]+$/.test(rawActiveSlug) ? rawActiveSlug : ''
  const activeSlug = dirs.includes(safeSlug) ? safeSlug : dirs[0] ?? ''

  if (!activeSlug) {
    return {
      props: {
        slug: '',
        metadata: {
          title: 'Sin título',
          date: 'Fecha desconocida',
          category: 'Sin categoría',
          author: 'Autor desconocido',
        },
        images: [],
      },
    }
  }

  const folderPath = path.join(basePath, activeSlug)
  const files = fs.readdirSync(folderPath)
  const images = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()

  const readme = fs.readFileSync(path.join(folderPath, 'README.md'), 'utf8')
  const { data } = matter(readme)

  const metadata: GalleryMeta = {
    title: data.title || 'Sin título',
    date: data.date || 'Fecha desconocida',
    category: data.category || 'Sin categoría',
    author: data.author || 'Autor desconocido',
  }

  return {
    props: {
      slug: activeSlug,
      metadata,
      images,
    }
  }
}

const GalleryPage: NextPage<GalleryPageProps> = ({ slug, metadata, images }) => (
  <>
    <Head>
      <title>{`${metadata.author} | ${metadata.title}`}</title>
      <meta name="description" content={`Galería fotográfica "${metadata.title}" de ${metadata.author}.`} />
      <meta name="robots" content="index, follow" />

      {/* ✅ Open Graph */}
      {(() => {
        const pageUrl = `https://www.bastiangutierrez.com/gallery`
        const coverRel = images.length > 0 ? `/images/gallery/${slug}/${images[0]}` : `/favicon.ico`
        const coverAbs = `https://www.bastiangutierrez.com${coverRel}`
        return (
          <>
            <link rel="canonical" href={pageUrl} />
            <meta property="og:title" content={`${metadata.author} | ${metadata.title}`} />
            <meta property="og:description" content={`Serie fotográfica de ${metadata.author}, publicada el ${metadata.date}.`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:image" content={coverAbs} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${metadata.author} | ${metadata.title}`} />
            <meta name="twitter:description" content={`Serie fotográfica por ${metadata.author}.`} />
            <meta name="twitter:image" content={coverAbs} />
          </>
        )
      })()}
    </Head>
    <div className='c-gallery-page'>

      <div className='c-gallery-page__wrapper'>
        <div className='c-gallery-title'>
          {metadata.title}
        </div>
        <div className='c-gallery-data'>
          <div className='c-gallery-data-content'>
            <span className='c-gallery-paragraph'>Actualizado: {formatDateVerboseES(metadata.date)}</span>
            <span className='c-gallery-separator'>&nbsp;/&nbsp;</span>
            <span className='c-gallery-paragraph'>Serie: <strong>{metadata.category}</strong></span>
          </div>
        </div>

        <div className="quote-box">
          <div className="quote-box-wrapper">
            <p className="quote-text">"La vida y el trabajo, entonces, se vuelven inseparables. El capital persigue al sujeto hasta cuando está durmiendo."</p>
            <p className="quote-author">– Mark Fisher</p>
          </div>
        </div>

        <div className="masonry">
          {images.map((img, i) => (
            <div key={img} className="masonry-item">
              <div className="frame-inner" onContextMenu={(e) => e.preventDefault()}>
                <Image
                  src={`/images/gallery/${slug}/${img}`}
                  alt={`${metadata.title} – ${metadata.author} (${i + 1}/${images.length})`}
                  width={800}
                  height={600}
                  className="framed-image"
                  style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`

        .c-gallery-page__wrapper {
          margin: 2rem 0;
        }

        .c-gallery-title {
          color: var(--cyan-primary);
          font-size: 1.5rem;
          font-weight: 400;
          padding: 0 2rem;
        }

        .c-gallery-data {
          color: #5d5d65;
          padding: 0 2rem;
        }
        .c-gallery-data-content {
          display: flex;
          flex-direction: column;
        }
        .c-gallery-paragraph {
        }
        .c-gallery-separator {
          display: none;
        }

        /* Estilo base para móviles */
        .masonry {
          column-count: 1;
          column-gap: 1.5rem;
          padding: 2rem;
        }

        /* Tablets o pantallas medianas */
        @media (min-width: 600px) {
          .masonry {
            column-count: 2;
          }
          .c-gallery-data-content {
            display: flex;
            flex-direction: row;
          }
          .c-gallery-separator {
            display: block;
          }
        }

        /* Escritorio o pantallas grandes */
        @media (min-width: 1024px) {
          .masonry {
            column-count: 3;
          }
          .c-gallery-data-content {
            display: flex;
            flex-direction: row;
          }
          .c-gallery-separator {
            display: block;
          }
        }

        .masonry-item {
          margin-bottom: 1.5rem;
          break-inside: avoid;
        }

        .frame-inner {
          position: relative;
          background: white;
          padding: 0;
          border: 1.5px solid #333;
        }

        .framed-image {
          border: 6px solid white;
          display: block;
          width: 100%;
          height: auto;
        }

        /* Eliminado overlay para mejorar accesibilidad */

        .quote-box {
          display: flex;
        }
        .quote-box-wrapper {
          margin: 2rem 0 0 auto;
          padding: 0rem 2rem;
          color: var( --text-quote );
          font-style: italic;
          text-align: right;
        }

        .quote-text {
          line-height: 1.6;
          margin: 0 0 1rem 0;
        }

        .quote-author {
          text-align: right;
          font-weight: bold;
          font-size: 1rem;
          margin: 0;
        }

         /* Tablets o pantallas medianas */
        @media (min-width: 600px) {
          .quote-box-wrapper {
            max-width: 630px;
          }
          .quote-text {
            font-size: 1.2rem;
          }
        }

        /* Escritorio o pantallas grandes */
        @media (min-width: 1024px) {
          .quote-box-wrapper {
            max-width: 800px;
          }
          .quote-text {
            font-size: 1.5rem;
          }
        }

      `}</style>
    </div>
  </>
)
export default GalleryPage

