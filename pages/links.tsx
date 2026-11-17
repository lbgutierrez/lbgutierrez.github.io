import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FUEGO_NEGRO_URL, SITE_URL } from '@/lib/links'

const LINKS = [
  { href: '/', title: 'Archivo fotográfico', detail: 'Obra y proyectos fotográficos', external: false },
  { href: FUEGO_NEGRO_URL, title: 'Fuego Negro', detail: 'Exposiciones · Ediciones · Impresiones', external: true },
]

const Arrow = () => (
  <svg className='c-links__arrow' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.25' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M4 12h16M14 6l6 6-6 6' />
  </svg>
)

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
      <h1 className='c-links__name'>
        Bastián<br />
        Gutiérrez
      </h1>
      <p className='c-links__tagline'>Fotografía de autor · Santiago de Chile</p>

      <nav className='c-links__list'>
        {LINKS.map(({ href, title, detail, external }) => {
          const content = (
            <>
              <span className='c-links__title'>
                {title}
                <Arrow />
              </span>
              <span className='c-links__detail'>{detail}</span>
            </>
          )
          return external ? (
            <a key={title} href={href} className='c-links__btn' target='_blank' rel='noopener noreferrer'>
              {content}
            </a>
          ) : (
            <Link key={title} href={href} className='c-links__btn'>
              {content}
            </Link>
          )
        })}
      </nav>

      <p className='c-links__copy'>© {new Date().getFullYear()} Bastián Gutiérrez</p>
    </div>
  </>
)

export default Links
