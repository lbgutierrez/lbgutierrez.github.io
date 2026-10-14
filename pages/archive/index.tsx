// pages/archive.tsx
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getSortedPostsData, PostMeta } from '../../lib/posts'
import Title from '../../components/Title'

interface PostInfo extends PostMeta {
  slug: string
}

interface ArchiveGroup {
  key: string           // e.g. "2025-06"
  label: string         // e.g. "junio 2025"
  posts: PostInfo[]
}

interface ArchiveProps {
  archiveGroups: ArchiveGroup[]
}

export const getStaticProps: GetStaticProps<ArchiveProps> = async () => {
  const allPosts = getSortedPostsData() as PostInfo[]

  // Agrupar por año-mes
  const groupsMap: Record<string, ArchiveGroup> = {}
  allPosts.forEach(post => {
    const date = parseISO(post.date)
    const key = format(date, 'yyyy-MM')      // "2025-06"
    const label = format(date, 'MMMM yyyy', { locale: es }) // "junio 2025"

    if (!groupsMap[key]) {
      groupsMap[key] = { key, label, posts: [] }
    }
    groupsMap[key].posts.push(post)
  })

  // Convertir a array y ordenar desc por key
  const archiveGroups = Object.values(groupsMap)
    .sort((a, b) => (a.key < b.key ? 1 : -1))

  return { props: { archiveGroups } }
}

const ArchivePage: NextPage<ArchiveProps> = ({ archiveGroups }) => (
    <div className='c-content-page'>
            
        <Title value='Archive' urlReturn='/' align='left' ></Title>

        <div className='c-content-page__wrapper'>
            {archiveGroups.map(group => (
                <section className='c-archive' key={group.key}>
                    <h2 className='c-archive__title'>{group.label}</h2>
                    <ul className='c-archive__items-list'>
                    {group.posts.map(({ slug, title, date }) => (
                        <li key={slug} className='c-archive__item'>
                            <Link href={`/posts/${slug}`}>
                                {title}
                            </Link>
                            {' '}
                            <small>
                                {format(parseISO(date), 'd MMM yyyy', { locale: es })}
                            </small>
                        </li>
                    ))}
                    </ul>
                </section>
            ))}
        </div>

       
  </div>
)

export default ArchivePage
