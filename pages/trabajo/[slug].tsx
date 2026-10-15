import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getAllGallerySlugs, getGalleryData, GalleryData } from '@/lib/gallery'
import { formatDateVerboseES } from '@/lib/date'
import Title from '@/components/Title'

const SITE_URL = 'https://www.bastiangutierrez.com'

interface SeriesPageProps {
  gallery: GalleryData
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllGallerySlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<SeriesPageProps> = async ({ params }) => ({
  props: { gallery: getGalleryData(params?.slug as string) },
})

const SeriesPage: NextPage<SeriesPageProps> = ({ gallery: g }) => {
  const pageUrl = `${SITE_URL}/trabajo/${g.slug}/`
  const cover = g.images.length > 0 ? `${SITE_URL}/images/gallery/${g.slug}/${g.images[0]}` : `${SITE_URL}/favicon.ico`
  const title = `${g.author} | ${g.title}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={`Serie fotográfica "${g.title}" de ${g.author}.`} />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href={pageUrl} />

        <meta property='og:title' content={title} />
        <meta property='og:description' content={`Serie fotográfica de ${g.author}.`} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={pageUrl} />
        <meta property='og:image' content={cover} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={`Serie fotográfica de ${g.author}.`} />
        <meta name='twitter:image' content={cover} />
      </Head>

      <Title value={g.title} size='md' back={{ href: '/trabajo', label: 'Trabajo' }}>
        <span>Lugar: <strong>{g.category}</strong></span>
        <span>{g.images.length} fotografías</span>
        {g.date && <span>Actualizado: {formatDateVerboseES(g.date)}</span>}
      </Title>

      {g.quote && (
        <blockquote className='c-quote'>
          <p className='c-quote__text'><mark>“{g.quote}”</mark></p>
          {g.quoteAuthor && <footer className='c-quote__author'>— {g.quoteAuthor}</footer>}
        </blockquote>
      )}

      <div className='c-masonry'>
        {g.images.map((img, i) => (
          <div key={img} className='c-masonry__item'>
            <Image
              src={`/images/gallery/${g.slug}/${img}`}
              alt={`${g.title} – ${g.author} (${i + 1}/${g.images.length})`}
              width={800}
              height={1200}
              sizes='(min-width: 1024px) 33vw, (min-width: 600px) 50vw, 100vw'
              draggable={false}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SeriesPage
