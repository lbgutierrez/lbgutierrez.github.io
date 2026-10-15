import React, { useEffect, useState } from 'react'

const Footer = () => {
  // En móvil, "Volver arriba" flota abajo a la derecha una vez que se baja más de una pantalla
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className='c-footer'>
      <span>© {new Date().getFullYear()} Bastián Gutiérrez. Todos los derechos reservados.</span>
      <a href='#top' className={`c-footer__top ${scrolled ? 'is-visible' : ''}`} onClick={toTop}>
        Volver arriba ↑
      </a>
    </footer>
  )
}

export default Footer
