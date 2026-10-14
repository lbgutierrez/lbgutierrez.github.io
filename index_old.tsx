// import { GetStaticProps, NextPage } from 'next'
// import Link from 'next/link'
// import { getSortedPostsData, PostMeta } from '../lib/posts'
// import { formatDate } from '../lib/date'

// interface HomeProps {
//   allPostsData: (PostMeta & { slug: string })[]
// }

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
//   const allPostsData = getSortedPostsData()
//   return { props: { allPostsData } }
// }

// const Home: NextPage<HomeProps> = ({ allPostsData }) => (
//     <>

//         <div className='c-content u-mt-2'>

//             <div className='c-content_wrapper'>

//                 <div className="c-card">

//                     <div className="c-card__title">
//                         Últimas publicaciones
//                     </div>

//                     {allPostsData.map(({ slug, title, date }) => (
//                     <div className='c-post__content-list'>
//                         <span className='c-post__content-list__date'>
//                             {formatDate(date)}&nbsp;-&nbsp;
//                         </span>
//                         <span>
//                             <Link href={`/posts/${slug}`}>
//                             {title}
//                             </Link>
//                         </span>
//                     </div>
//                     ))}
                
//                 </div>
            
//             </div>
        
//         </div>

//     </>
// )

// export default Home
