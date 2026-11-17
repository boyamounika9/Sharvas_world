import { motion } from 'framer-motion'
import { Zap, Flower2, Smile, Mountain, Star } from 'lucide-react'
import { rise } from '../lib.js'

const cards = [
  { icon: Zap, t: 'My Little Motivation', d: 'Whenever I feel low, you remind me that I can get through things.' },
  { icon: Flower2, t: 'A Beautiful Soul', d: 'Your kindness and the way you treat people make you genuinely special.' },
  { icon: Smile, t: 'My Reason to Smile', d: 'Sometimes a simple conversation with you is enough to make my day better.' },
  { icon: Mountain, t: 'My Strength', d: 'Your encouraging words give me confidence when I need it most.' },
  { icon: Star, t: 'Simply YOU', d: "You don't need to do anything extraordinary. Being yourself is already special." },
]

export default function ReasonsCards() {
  return (
    <section className="section">
      <motion.h2 className="serif h2" {...rise}>Five Reasons You Are Special</motion.h2>
      <div className="cards five">
        {cards.map(({ icon: Icon, t, d }, i) => (
          <motion.article key={t} className="card glass" {...rise} transition={{ ...rise.transition, delay: (i % 3) * 0.12 }}
            whileHover={{ y: -8 }} tabIndex={0}>
            <span className="icon-orb"><Icon size={26} strokeWidth={1.5} /></span>
            <h3 className="serif">{t}</h3>
            <p>{d}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
