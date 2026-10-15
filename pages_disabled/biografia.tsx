import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPageContent } from '@/lib/content'
import Title from '@/components/Title'

const SITE_URL = 'https://www.bastiangutierrez.com'

interface Milestone {
  tipo: string | null
  texto: string
}

interface YearGroup {
  año: number
  hitos: Milestone[]
}

interface BiografiaProps {
  contentHtml: string
  retrato: string | null
  cronologia: YearGroup[]
}

/** Agrupa los hitos de content/biografia.md por año, del más antiguo al más reciente */
function groupByYear(raw: unknown): YearGroup[] {
  if (!Array.isArray(raw)) return []

  const groups = new Map<number, Milestone[]>()
  for (const item of raw) {
    const año = Number(item?.['año'])
    const texto = typeof item?.texto === 'string' ? item.texto.trim() : ''
    if (!Number.isFinite(año) || !texto) continue

    const tipo = typeof item.tipo === 'string' && item.tipo.trim() ? item.tipo.trim() : null
    groups.set(año, [...(groups.get(año) ?? []), { tipo, texto }])
  }

  return [...groups.entries()].sort(([a], [b]) => a - b).map(([año, hitos]) => ({ año, hitos }))
}

export const getStaticProps: GetStaticProps<BiografiaProps> = async () => {
  const { contentHtml, data } = await getPageContent('biografia')
  return {
    props: {
      contentHtml: contentHtml.replace(/<!--[\s\S]*?-->/g, '').trim(),
      retrato: typeof data.retrato === 'string' ? data.retrato : null,
      cronologia: groupByYear(data.cronologia),
    },
  }
}

const BiografiaPage: NextPage<BiografiaProps> = ({ contentHtml, retrato, cronologia }) => (
  <>
    <Head>
      <title>Bastián Gutiérrez | Biografía</title>
      <meta name='description' content='Biografía de Bastián Gutiérrez, fotógrafo en Santiago de Chile.' />
      <link rel='canonical' href={`${SITE_URL}/biografia/`} />
    </Head>

    <Title value='Biografía' />

    <div className={`c-bio ${retrato ? 'c-bio--with-portrait' : ''}`}>
      {retrato && (
        <div className='c-bio__portrait'>
          <Image
            src={retrato}
            alt='Retrato de Bastián Gutiérrez'
            width={800}
            height={1000}
            sizes='(min-width: 768px) 33vw, 100vw'
            priority
            draggable={false}
          />
        </div>
      )}

      <div>
        {contentHtml && <article className='c-prose c-bio__intro' dangerouslySetInnerHTML={{ __html: contentHtml }} />}

        {cronologia.length > 0 && (
          <ol className='c-timeline'>
            {cronologia.map(({ año, hitos }) => (
              <li key={año} className='c-timeline__year'>
                <span className='c-timeline__label'>{año}</span>
                <div className='c-timeline__entries'>
                  {hitos.map(({ tipo, texto }, i) => (
                    <div key={i} className='c-timeline__entry'>
                      {tipo && <h3 className='c-timeline__type'>{tipo}</h3>}
                      <p className='c-timeline__text'>{texto}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  </>
)

export default BiografiaPage
