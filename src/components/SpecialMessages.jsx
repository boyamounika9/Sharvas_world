import { motion } from 'framer-motion'
import { rise } from '../lib.js'

const lines = [
  "You're one of those rare people who make others feel better without even trying.",
  'Your words have helped me on days when I couldn\u2019t motivate myself.',
  'Sometimes you don\u2019t even realize how much your encouragement means to me.',
  'You have this beautiful way of making difficult moments feel a little lighter.',
  'Never underestimate the positive difference you make in someone\u2019s life.',
]

export default function SpecialMessages() {
  return (
    <section className="section messages">
      <motion.h2 className="serif h2" {...rise}>Do You Know How Special You Are?</motion.h2>
      <div className="msg-list">
        {lines.map((l, i) => (
          <motion.p key={i} className="serif msg glow-text" initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.p>
        ))}
      </div>
    </section>
  )
}
