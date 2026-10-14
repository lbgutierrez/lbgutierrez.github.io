import React from 'react'

const Footer = () => {

  return (
    <div className='c-footer' >
        <div className='c-footer__wrapper'>
            <p>
              Copyright © {new Date().getFullYear()} <span className='c-footer__website'>Basti&aacute;n Guti&eacute;rrez</span>.
            </p>
            <p>
              All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer

