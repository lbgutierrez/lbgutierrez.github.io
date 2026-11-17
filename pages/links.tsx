import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FUEGO_NEGRO_URL, SITE_URL } from '@/lib/links'

// Página para la bio de Instagram: lleva al sitio o a la tienda en Fuego Negro
const Links: NextPage = () => (
  <>
    <Head>
      <title>Bastián Gutiérrez | Enlaces</title>
      <meta name='description' content='Bastián Gutiérrez. Fotografía de autor · Santiago de Chile.' />
      <link rel='canonical' href={`${SITE_URL}/links/`} />
      <meta property='og:title' content='Bastián Gutiérrez | Fotografía' />
      <meta property='og:description' content='Sitio web y tienda en Fuego Negro.' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${SITE_URL}/links/`} />
    </Head>

    <div className='c-links'>
      <h1 className='c-links__name'>Bastián Gutiérrez</h1>
      <p className='c-links__tagline'>Fotografía de autor · Santiago de Chile</p>

      <nav className='c-links__list'>
        <Link href='/' className='c-links__btn'>
          Sitio web
          <span aria-hidden='true'>→</span>
        </Link>
        <a href={FUEGO_NEGRO_URL} className='c-links__btn' target='_blank' rel='noopener noreferrer'>
          Tienda en Fuego Negro
          <span aria-hidden='true'>↗</span>
        </a>
      </nav>

      <p className='c-links__copy'>© {new Date().getFullYear()} Bastián Gutiérrez</p>
    </div>
  </>
)

export default Links
