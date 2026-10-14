import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllPostSlugs, getPostData, PostData } from '../../lib/posts'
import { formatDateVerboseES } from '../../lib/date'
import Title from '../../components/Title'

interface PostPageProps {
  postData: PostData
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs()
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const postData = await getPostData(slug)
  return { props: { postData } }
}

const PostPage: NextPage<PostPageProps> = ({ postData }) => (
  
    <div className='c-content-page'>

        <div className='c-content-page__wrapper'>

            <Title value={postData.title} urlReturn='/' align='left' mb="0"></Title>
            
            <div className="c-post">
               
                <div className='c-post__metadata'>
                    <small className='c-post__metadata__item'>{formatDateVerboseES(postData.date)}</small>
                    <small className='c-post__metadata__item'>Categoría: {postData.category}</small>
                </div>

                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

            </div>

        </div>

    </div>

)

export default PostPage
