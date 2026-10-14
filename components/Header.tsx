import Link from 'next/link'
import React from 'react'

const Header = () => {

  return (
    <div className='c-header' >
        <div className='c-header_wrapper'>
            <div className='c-header_title'>
                <Link href={`/`}>
                BASTIAN GUTIERREZ
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header