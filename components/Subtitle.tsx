import React from 'react'

interface TitleProps {
  value: string
  urlReturn: string
  align?: string
}

const Subtitle: React.FC<TitleProps> = ( { value, align = 'center' } ) => {

    return (
        <div className='c-subtitle'>
            <div className='c-subtitle__wrapper'>
                <div>
                    &nbsp;
                </div>
                <div className={`c-subtitle__value c-subtitle__value--${align}`}>
                    {value}
                </div>
                <div>
                    &nbsp;
                </div>
                
            </div>
        </div>
    )

}

export default Subtitle




