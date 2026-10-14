import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface TitleProps {
  value: string
  urlReturn: string
  align?: string
  mb?: string
  fallback?: string
}

const Title: React.FC<TitleProps> = ( { value, urlReturn, align = 'center', mb = '1', fallback = '/' } ) => {

    const router = useRouter()

    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back()
        } else {
            router.push(fallback)
        }
    }

    return (
        <div className='c-title'>
            <div className={`c-title__wrapper u-mb-${ mb }`}>
                <div>
                    <Link href={ urlReturn } onClick={handleBack}>
                        &lt; volver
                    </Link>
                </div>
                <div className={`c-title__value c-title__value--${ align }`}>
                    {value}
                </div>
                <div>
                    &nbsp;
                </div>
                
            </div>
        </div>
    )

}

export default Title




