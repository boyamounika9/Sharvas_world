import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gentleConfetti } from '../lib.js'

const Letters = ({ text, delay = 0, step = 0.05 }) =>
  text.split('').map((ch, i) => (
    <motion.span key={i} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: delay + i * step, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{ch}</motion.span>
  ))

export default function Hero() {
  useEffect(() => { const t = setTimeout(gentleConfetti, 900); return () => clearTimeout(t) }, [])
  return (
    <section className="hero">
      <h2 aria-label="Happy Birthday Sharva" className="hero-head">
        <span className="hero-small serif"><Letters text="HAPPY BIRTHDAY" delay={0.3} step={0.06} /></span>
        <span className="name-row"><span className="hero-name serif"><Letters text="SHARVA" delay={1.3} step={0.12} /></span><motion.i className="heart" aria-hidden="true" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2, type: 'spring' }}>❤️</motion.i></span>
      </h2>
      <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1.4 }}>
        To someone who makes ordinary days feel a little more special.
      </motion.p>
      <motion.div className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }} aria-hidden="true"><span /></motion.div>
    </section>
  )
}
