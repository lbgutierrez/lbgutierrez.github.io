import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PHOTO_CONTAINERS = '.c-slideshow, .c-masonry__item, .c-index__thumb'

interface LayoutProps {
  children: ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  // El inicio es solo el fondo de fotos: header sobre la imagen y sin footer
  const { pathname } = useRouter()
  const isHome = pathname === '/'
  // Trabajo, Escritos y Biografía usan la paleta "piedra" (ver .layout--stone en globals.css)
  const isStone = ['/trabajo', '/gallery', '/archive', '/posts', '/biografia'].some((p) => pathname.startsWith(p))

  // Sin menú contextual sobre las fotos (complementa el CSS de img en globals.css)
  useEffect(() => {
    const block = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(PHOTO_CONTAINERS)) e.preventDefault()
    }
    document.addEventListener('contextmenu', block)
    return () => document.removeEventListener('contextmenu', block)
  }, [])

  return (
    <div className={`layout ${isHome ? 'layout--home' : ''} ${isStone ? 'layout--stone' : ''}`}>
      <Header />
      <main>
        {children}
      </main>
      {!isHome && <Footer />}
    </div>
  )
}

export default BaseLayout
