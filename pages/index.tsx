import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { getActiveGallerySlug, getGalleryData } from '@/lib/gallery'
import Slideshow from '@/components/Slideshow'

const AUTHOR = 'Bastián Gutiérrez'
const DESCRIPTION = 'Fotografía documental · Santiago de Chile'

const SITE_URL = 'https://www.bastiangutierrez.com'

interface HomeProps {
  images: string[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const slug = getActiveGallerySlug()
  const images = slug ? getGalleryData(slug).images.map((img) => `/images/gallery/${slug}/${img}`) : []

  return { props: { images } }
}

const Home: NextPage<HomeProps> = ({ images }) => {
  const ogImage = images.length > 0 ? `${SITE_URL}${images[0]}` : `${SITE_URL}/favicon.ico`

  return (
    <>
      <Head>
        <title>{`${AUTHOR} | Fotografía`}</title>
        <meta name='description' content={`${AUTHOR}. ${DESCRIPTION}.`} />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href={`${SITE_URL}/`} />
        {images[0] && <link rel='preload' as='image' href={images[0]} />}

        <meta property='og:title' content={`${AUTHOR} | Fotografía`} />
        <meta property='og:description' content={DESCRIPTION} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`${SITE_URL}/`} />
        <meta property='og:image' content={ogImage} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={`${AUTHOR} | Fotografía`} />
        <meta name='twitter:description' content={DESCRIPTION} />
        <meta name='twitter:image' content={ogImage} />
      </Head>

      <Slideshow images={images} />
    </>
  )
}

export default Home
