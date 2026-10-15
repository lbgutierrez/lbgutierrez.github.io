import { GetStaticPaths, GetStaticProps } from 'next'
import Redirect from '@/components/Redirect'
import { getAllGallerySlugs } from '@/lib/gallery'

// /gallery/<serie>/ ahora es /trabajo/<serie>/: se mantiene para no romper enlaces antiguos
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllGallerySlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{ slug: string }> = async ({ params }) => ({
  props: { slug: params?.slug as string },
})

const SeriesRedirect = ({ slug }: { slug: string }) => <Redirect to={`/trabajo/${slug}/`} />

export default SeriesRedirect
