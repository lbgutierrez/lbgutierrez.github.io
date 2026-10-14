import Link from 'next/link'
import React from 'react'

const Menu = () => {

  return (
    <div className='c-menu'>
            <div className='c-menu_wrapper'>
                <div className='c-menu_item'>
                    <Link href={`/`} className='secondary-link'>
                        INICIO
                    </Link>
                </div>
                <div className='c-menu_item'>
                    <Link href={`/gallery`} className='secondary-link'>
                        GALERIA
                    </Link>
                </div>
                <div className='c-menu_item'>
                    <Link href={`/archive`} className='secondary-link'>
                        ARCHIVE
                    </Link>
                </div>
            </div>
        </div>
  )
}

export default Menu




