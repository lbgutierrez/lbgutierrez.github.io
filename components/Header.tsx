import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

const NAV = [
  { href: '/', label: 'Inicio', match: (p: string) => p === '/' },
  { href: '/gallery', label: 'Galería', match: (p: string) => p.startsWith('/gallery') },
  // Ocultos mientras no tengan contenido: para mostrarlos, quitar el // de la línea
  // { href: '/archive', label: 'Escritos', match: (p: string) => p.startsWith('/archive') || p.startsWith('/posts') },
  // { href: '/biografia', label: 'Biografía', match: (p: string) => p.startsWith('/biografia') },
]

// Si una URL queda vacía, su ícono se oculta
const INSTAGRAM_URL = 'https://www.instagram.com/bastian.gutierrezg/'
const FUEGO_NEGRO_URL = 'https://www.fuegonegro.com/fotografo/bastian-gutierrez'

const InstagramIcon = () => (
  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.25' aria-hidden='true'>
    <rect x='3' y='3' width='18' height='18' rx='5' />
    <circle cx='12' cy='12' r='4' />
    <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
  </svg>
)

// Logo de Fuego Negro: cuadrado de esquinas rectas, borde fino y "FN" centrado
const FuegoNegroIcon = () => (
  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.25' aria-hidden='true'>
    <rect x='3' y='3' width='18' height='18' />
    <text
      x='12'
      y='12.4'
      textAnchor='middle'
      dominantBaseline='central'
      textLength='11.5'
      lengthAdjust='spacingAndGlyphs'
      fontFamily="'Courier New', Courier, monospace"
      fontWeight='700'
      fontSize='10'
      fill='currentColor'
      strokeWidth='0.25'
    >
      FN
    </text>
  </svg>
)

const SOCIAL = [
  { href: INSTAGRAM_URL, label: 'Instagram', Icon: InstagramIcon },
  { href: FUEGO_NEGRO_URL, label: 'Fuego Negro', Icon: FuegoNegroIcon },
].filter(({ href }) => href)

const SocialLinks = () => (
  <>
    {SOCIAL.map(({ href, label, Icon }) => (
      <a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} title={label}>
        <Icon />
      </a>
    ))}
  </>
)

const Header = () => {
  const { pathname } = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Cerrar el menú al navegar
  useEffect(() => setMenuOpen(false), [pathname])

  // Menú abierto: bloquear scroll, cerrar con Esc y mover el foco
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const burger = burgerRef.current
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      burger?.focus()
    }
  }, [menuOpen])

  return (
    <header className='c-header'>
      <Link href='/' className='c-header__name'>
        Bastián Gutiérrez
      </Link>
      <div className='c-header__right'>
        <nav className='c-header__nav'>
          {NAV.map(({ href, label, match }) => (
            <Link key={href} href={href} aria-current={match(pathname) ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className='c-header__social'>
          <SocialLinks />
        </div>
      </div>

      {/* Móvil: hamburguesa + menú a pantalla completa */}
      <button
        ref={burgerRef}
        type='button'
        className='c-burger'
        aria-label='Abrir menú'
        aria-expanded={menuOpen}
        aria-controls='mobile-menu'
        onClick={() => setMenuOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id='mobile-menu'
        className={`c-menu ${menuOpen ? 'is-open' : ''}`}
        role='dialog'
        aria-modal='true'
        aria-label='Menú'
        aria-hidden={!menuOpen}
      >
        <div className='c-menu__top'>
          <Link href='/' className='c-header__name' tabIndex={menuOpen ? 0 : -1}>
            Bastián Gutiérrez
          </Link>
          <button
            ref={closeRef}
            type='button'
            className='c-menu__close'
            aria-label='Cerrar menú'
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          />
        </div>

        <div className='c-menu__body'>
          <nav className='c-menu__nav'>
            {NAV.map(({ href, label, match }) => (
              <Link
                key={href}
                href={href}
                aria-current={match(pathname) ? 'page' : undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className='c-menu__social'>
            <SocialLinks />
          </div>
          <p className='c-menu__copy'>© {new Date().getFullYear()} Bastián Gutiérrez.</p>
        </div>
      </div>
    </header>
  )
}

export default Header
