import { motion } from 'framer-motion'
import { Sun, Trophy, Camera, Gem, Compass, SmilePlus } from 'lucide-react'
import { rise } from '../lib.js'

const wishes = [
  { icon: Sun, t: 'More Happiness' }, { icon: Trophy, t: 'More Success' }, { icon: Camera, t: 'More Beautiful Memories' },
  { icon: Gem, t: 'More Confidence' }, { icon: Compass, t: 'More Adventures' }, { icon: SmilePlus, t: 'More Reasons to Smile' },
]

export default function BirthdayWishes() {
  return (
    <section className="section">
      <motion.h2 className="serif h2" {...rise}>My Wishes For You</motion.h2>
      <div className="cards six">
        {wishes.map(({ icon: Icon, t }, i) => (
          <motion.div key={t} className="wish glass" initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }} transition={{ delay: (i % 3) * 0.1, type: 'spring', stiffness: 120, damping: 16 }} whileHover={{ scale: 1.04 }}>
            <Icon size={28} strokeWidth={1.4} /><h3 className="serif">{t}</h3>
          </motion.div>
        ))}
      </div>
      <motion.p className="serif closing-wish glow-text" {...rise}>May this year be kinder, brighter, happier, and more beautiful than you ever imagined.</motion.p>
    </section>
  )
}
