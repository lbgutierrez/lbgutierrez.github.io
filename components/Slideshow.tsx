import React, { useEffect, useState } from 'react'

interface SlideshowProps {
  images: string[]
  interval?: number // ms que cada foto queda visible
}

/**
 * Fondo a pantalla completa que alterna fotos con fundido.
 * Solo monta la foto anterior (saliendo), la actual y la siguiente (precarga),
 * y no avanza hasta que la siguiente terminó de cargar.
 */
const Slideshow: React.FC<SlideshowProps> = ({ images, interval = 6000 }) => {
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false) // hasta el primer cambio no hay foto "anterior"
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set())

  const count = images.length
  const next = (index + 1) % count
  const prev = (index - 1 + count) % count

  useEffect(() => {
    if (count < 2 || !loaded.has(images[next])) return
    const timer = setTimeout(() => {
      setIndex(next)
      setStarted(true)
    }, interval)
    return () => clearTimeout(timer)
  }, [count, images, index, next, loaded, interval])

  const markLoaded = (src: string) =>
    setLoaded((s) => (s.has(src) ? s : new Set(s).add(src)))

  if (count === 0) return null

  const mounted = Array.from(new Set(started ? [prev, index, next] : [index, next]))

  return (
    <div className='c-slideshow' aria-hidden='true'>
      {mounted.map((i) => {
        const src = images[i]
        const visible = i === index && loaded.has(src)
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=''
            className={`c-slideshow__slide ${visible ? 'is-visible' : ''}`}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            onLoad={() => markLoaded(src)}
            ref={(el) => {
              // imágenes ya en caché pueden no disparar onLoad tras hidratar
              if (el?.complete && el.naturalWidth > 0) markLoaded(src)
            }}
            draggable={false}
          />
        )
      })}
    </div>
  )
}

export default Slideshow
