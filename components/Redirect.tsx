import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SITE_URL = 'https://www.bastiangutierrez.com'

/** Página de redirección para direcciones antiguas (el sitio es estático: no hay redirecciones de servidor) */
const Redirect = ({ to }: { to: string }) => {
  const router = useRouter()
  useEffect(() => {
    router.replace(to)
  }, [router, to])

  return (
    <Head>
      <title>Bastián Gutiérrez</title>
      <meta httpEquiv='refresh' content={`0; url=${to}`} />
      <meta name='robots' content='noindex' />
      <link rel='canonical' href={`${SITE_URL}${to}`} />
    </Head>
  )
}

export default Redirect
