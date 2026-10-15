import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getAllGalleries, GallerySummary } from '@/lib/gallery'
import { formatDateVerboseES } from '@/lib/date'
import Title from '@/components/Title'

const SITE_URL = 'https://www.bastiangutierrez.com'

interface GalleryIndexProps {
  galleries: GallerySummary[]
}

export const getStaticProps: GetStaticProps<GalleryIndexProps> = async () => ({
  props: { galleries: getAllGalleries() },
})

const GalleryIndex: NextPage<GalleryIndexProps> = ({ galleries }) => (
  <>
    <Head>
      <title>Bastián Gutiérrez | Trabajo</title>
      <meta name='description' content='Series fotográficas de Bastián Gutiérrez.' />
      <link rel='canonical' href={`${SITE_URL}/trabajo/`} />
    </Head>

    <Title value='Trabajo' />

    <div className='c-index'>
      {galleries.map((g, i) => (
        <Link key={g.slug} href={`/trabajo/${g.slug}`} className='c-index__row'>
          <div>
            <h2 className='c-index__title'>{g.title}</h2>
            <span className='c-index__meta'>
              {g.category} · {g.count} fotografías{g.date && ` · ${formatDateVerboseES(g.date)}`}
            </span>
          </div>
          <div className='c-index__thumb'>
            {g.cover && (
              <Image
                src={`/images/gallery/${g.slug}/${g.cover}`}
                alt={`${g.title} – ${g.author}`}
                fill
                sizes='(min-width: 768px) 200px, 96px'
                priority={i === 0}
                style={{ objectFit: 'cover' }}
                draggable={false}
              />
            )}
          </div>
        </Link>
      ))}
    </div>
  </>
)

export default GalleryIndex
