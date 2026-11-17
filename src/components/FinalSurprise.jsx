import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { celebrate } from '../lib.js'

const lines = [
  'One Last Thing, Sharva...',
  'Thank you for being there when I needed someone.',
  'Thank you for motivating me when I forgot how strong I could be.',
  'Thank you for making my world a little brighter.',
  'Never stop smiling.',
  'Never stop believing in yourself.',
  'And never forget how special you are.',
]

export default function FinalSurprise() {
  const end = useRef(null)
  const seen = useInView(end, { amount: 0.6 })
  useEffect(() => {
    if (!seen) return
    celebrate()
    const id = setInterval(celebrate, 4500)
    return () => clearInterval(id)
  }, [seen])

  return (
    <section className="final">
      <div className="final-light" aria-hidden="true" />
      {lines.map((l, i) => (
        <div className="final-line" key={i}>
          <motion.p className={`serif ${i === 0 ? 'final-first' : 'final-text'}`} initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: false, amount: 0.8 }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.p>
        </div>
      ))}
      <div className="final-line end" ref={end}>
        <motion.h2 className="serif final-title" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.6 }}>HAPPY BIRTHDAY, SHARVA! ❤️</motion.h2>
        <motion.p className="serif final-sub" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.5 }}>Keep Shining. Always.</motion.p>
        <p className="made">Made with genuine love, gratitude, and friendship.</p>
      </div>
    </section>
  )
}
