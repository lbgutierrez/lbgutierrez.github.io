import React, { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface LayoutProps {
  children: ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
        <div className="layout">
            <Header />
           
            <main>
                {children}
            </main>
            <Footer />
        </div>
    </>
  )
}

export default BaseLayout