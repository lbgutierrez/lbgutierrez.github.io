import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllPostSlugs, getPostData, PostData } from '../../lib/posts'
import { formatDateVerboseES } from '../../lib/date'
import Head from 'next/head'
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
  <>
    <Head>
      <title>{`Bastián Gutiérrez | ${postData.title}`}</title>
    </Head>

    <Title value={postData.title} size='md' back={{ href: '/archive', label: 'Escritos' }}>
      <span>{formatDateVerboseES(postData.date)}</span>
      <span>Categoría: <strong>{postData.category}</strong></span>
    </Title>

    <article className='c-prose' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  </>
)

export default PostPage
