import { motion } from 'framer-motion'

const fade = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 1.1, ease: [0.22, 1, 0.36, 1] } })

export default function OpeningScreen({ onOpen }) {
  return (
    <motion.section className="opening" exit={{ opacity: 0, scale: 1.12, filter: 'blur(16px)' }} transition={{ duration: 1.3, ease: 'easeInOut' }}>
      <div className="opening-glow" aria-hidden="true" />
      <motion.h1 className="serif opening-title" {...fade(0.3)}>Hey Sharva... ✨</motion.h1>
      <motion.p className="opening-line" {...fade(1.6)}>I made a little something for someone who means a lot to me.</motion.p>
      <motion.p className="opening-line soft serif" {...fade(3)}>Some people make life beautiful just by being in it.</motion.p>
      <motion.div {...fade(4.2)}>
        <button className="glow-btn" onClick={onOpen}>Open Your Surprise ❤️</button>
      </motion.div>
    </motion.section>
  )
}
