import Link from 'next/link'
import React, { ReactNode } from 'react'

interface TitleProps {
  value: string
  size?: 'lg' | 'md'
  back?: { href: string; label: string }
  children?: ReactNode // metadatos bajo el título
}

const Title: React.FC<TitleProps> = ({ value, size = 'lg', back, children }) => (
  <div className='c-page-title'>
    {back && (
      <Link href={back.href} className='c-page-title__back'>
        ← {back.label}
      </Link>
    )}
    <h1 className={`c-page-title__value ${size === 'md' ? 'c-page-title__value--md' : ''}`}>
      {value}
    </h1>
    {children && <div className='c-page-title__meta'>{children}</div>}
  </div>
)

export default Title
