import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getActiveGallerySlug, getAllGalleries, GallerySummary } from '@/lib/gallery'
import { getSortedPostsData, PostMeta } from '@/lib/posts'
import { formatDateVerboseES } from '@/lib/date'

// Textos de presentación: editar aquí
const AUTHOR = 'Bastián Gutiérrez'
const TAGLINE = 'Fotografía documental · Santiago de Chile'
const INTRO =
  'Registros de la ciudad y de quienes la habitan: el tránsito diario, el trabajo y los espacios compartidos.'

const SITE_URL = 'https://www.bastiangutierrez.com'
const MAX_POSTS = 3

interface PostInfo extends PostMeta {
  slug: string
}

interface HomeProps {
  activeSlug: string
  galleries: GallerySummary[]
  posts: PostInfo[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const galleries = getAllGalleries()
  const posts = (getSortedPostsData() as PostInfo[]).slice(0, MAX_POSTS)

  return {
    props: {
      activeSlug: getActiveGallerySlug(),
      galleries,
      posts,
    },
  }
}

const coverSrc = (g: GallerySummary) => `/images/gallery/${g.slug}/${g.cover}`

const Home: NextPage<HomeProps> = ({ activeSlug, galleries, posts }) => {
  const featured = galleries.find((g) => g.slug === activeSlug && g.cover) ?? galleries.find((g) => g.cover)
  const ogImage = featured ? `${SITE_URL}${coverSrc(featured)}` : `${SITE_URL}/favicon.ico`

  return (
    <>
      <Head>
        <title>{`${AUTHOR} | Fotografía`}</title>
        <meta name="description" content={`${AUTHOR}. ${TAGLINE}. ${INTRO}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/`} />

        <meta property="og:title" content={`${AUTHOR} | Fotografía`} />
        <meta property="og:description" content={`${TAGLINE}. ${INTRO}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${AUTHOR} | Fotografía`} />
        <meta name="twitter:description" content={TAGLINE} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="c-home">
        {featured && (
          <Link href="/gallery" className="c-home__hero">
            <Image
              src={coverSrc(featured)}
              alt={`${featured.title} – ${featured.author}`}
              fill
              priority
              sizes="(min-width: 1200px) 1200px, 100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
              draggable={false}
            />
            <span className="c-home__hero-caption">
              Serie actual: <strong>{featured.title}</strong>
            </span>
          </Link>
        )}

        <section className="c-home__intro">
          <p className="c-home__tagline">{TAGLINE}</p>
          <p className="c-home__text">{INTRO}</p>
        </section>

        <section className="c-home__section">
          <h2 className="c-home__heading">Series</h2>
          <div className="c-home__series">
            {galleries.map((g) => {
              const card = (
                <>
                  <div className="c-home__card-image">
                    {g.cover && (
                      <Image
                        src={coverSrc(g)}
                        alt={`${g.title} – ${g.author}`}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 600px) 50vw, 100vw"
                        style={{ objectFit: 'cover' }}
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className="c-home__card-body">
                    <span className="c-home__card-title">{g.title}</span>
                    <span className="c-home__card-meta">
                      {g.category} · {g.count} fotografías
                    </span>
                    {g.date && <span className="c-home__card-meta">{formatDateVerboseES(g.date)}</span>}
                  </div>
                </>
              )

              return g.slug === activeSlug ? (
                <Link key={g.slug} href="/gallery" className="c-home__card">
                  {card}
                </Link>
              ) : (
                <div key={g.slug} className="c-home__card">
                  {card}
                </div>
              )
            })}
          </div>
        </section>

        {posts.length > 0 && (
          <section className="c-home__section">
            <h2 className="c-home__heading">Escritos</h2>
            <ul className="c-home__posts">
              {posts.map(({ slug, title, date }) => (
                <li key={slug} className="c-home__post">
                  <Link href={`/posts/${slug}`}>{title}</Link>
                  <small>{formatDateVerboseES(date)}</small>
                </li>
              ))}
            </ul>
            <Link href="/archive" className="secondary-link">
              Ver archivo completo →
            </Link>
          </section>
        )}
      </div>

      <style jsx>{`
        .c-home {
          width: 100%;
          max-width: 1200px;
          color: var(--text-content);
          padding-bottom: 2rem;
        }

        .c-home :global(.c-home__hero) {
          position: relative;
          display: block;
          width: 100%;
          height: 60vh;
          min-height: 320px;
          max-height: 720px;
          overflow: hidden;
          background: var(--bg-header);
        }

        .c-home :global(.c-home__hero:hover) {
          text-decoration: none;
        }

        .c-home__hero-caption {
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 0.5rem 1rem;
          background: rgba(26, 26, 26, 0.75);
          color: #ffffff;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        .c-home__intro {
          padding: 2rem 2rem 0 2rem;
          max-width: 800px;
        }

        .c-home__tagline {
          color: var(--cyan-primary);
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
        }

        .c-home__text {
          color: var(--text-quote);
          font-size: 1.1rem;
          margin: 0;
        }

        .c-home__section {
          padding: 2rem 2rem 0 2rem;
        }

        .c-home__heading {
          color: var(--text-content);
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-bottom: 1px solid var(--secondary-border);
          padding-bottom: 0.5rem;
          margin: 0 0 1.5rem 0;
        }

        .c-home__series {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .c-home :global(.c-home__card) {
          display: flex;
          flex-direction: column;
          background: white;
          border: 1.5px solid #333;
          color: var(--text-content);
        }

        .c-home :global(a.c-home__card:hover) {
          text-decoration: none;
          border-color: var(--cyan-primary);
        }

        .c-home__card-image {
          position: relative;
          aspect-ratio: 4 / 5;
          border: 6px solid white;
          background: var(--bg);
        }

        .c-home__card-body {
          display: flex;
          flex-direction: column;
          padding: 0.25rem 0.75rem 0.75rem 0.75rem;
        }

        .c-home__card-title {
          color: var(--cyan-secondary);
          font-weight: 600;
        }

        .c-home__card-meta {
          color: var(--text-quote);
          font-size: 0.85rem;
        }

        .c-home__posts {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
        }

        .c-home__post {
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--secondary-border);
        }

        .c-home__post small {
          color: var(--text-quote);
        }

        @media (min-width: 600px) {
          .c-home__series {
            grid-template-columns: repeat(2, 1fr);
          }
          .c-home__post {
            flex-direction: row;
            justify-content: space-between;
            align-items: baseline;
          }
        }

        @media (min-width: 1024px) {
          .c-home__series {
            grid-template-columns: repeat(3, 1fr);
          }
          .c-home__tagline {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  )
}

export default Home
