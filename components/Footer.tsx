import React from 'react'

const Footer = () => {

  return (
    <footer className='c-footer'>
      <span>© {new Date().getFullYear()} Bastián Gutiérrez. Todos los derechos reservados.</span>
      <a href='#top'>Volver arriba ↑</a>
    </footer>
  )
}

export default Footer
