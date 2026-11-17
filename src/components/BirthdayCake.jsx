import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { rise, celebrate } from '../lib.js'

export default function BirthdayCake() {
  const [out, setOut] = useState(false)
  const blow = () => { setOut(true); celebrate() }
  return (
    <section className="section cake-sec">
      <motion.h2 className="serif h2" {...rise}>Okay Sharva, It’s Wish Time! 🎂</motion.h2>
      <motion.p className="sub" {...rise}>Close your eyes, make a wish, and get ready for another beautiful year.</motion.p>

      <motion.div className={`cake ${out ? 'out' : ''}`} {...rise} role="img" aria-label="A birthday cake with three candles">
        <div className="candles">
          {[0, 1, 2].map((i) => (
            <div className="candle" key={i}><i className="flame" style={{ animationDelay: `${i * 0.25}s` }} /><b className="wick" />{out && <u className="smoke" />}</div>
          ))}
        </div>
        <div className="tier t-top"><i className="drip" /></div>
        <div className="tier t-mid"><i className="drip" /></div>
        <div className="tier t-bot"><i className="drip" /></div>
        <div className="plate" />
      </motion.div>

      <div className="cake-actions">
        {!out ? (
          <button className="glow-btn" onClick={blow}>Blow the Candles ✨</button>
        ) : (
          <button className="ghost-btn" onClick={() => setOut(false)}><RotateCcw size={16} /> Light them again</button>
        )}
      </div>
      <div className="wish-slot" aria-live="polite">
        <AnimatePresence>
          {out && <motion.p className="serif wish-msg glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.6, duration: 1.2 }}>May every little wish in your heart find its way to becoming reality.</motion.p>}
        </AnimatePresence>
      </div>
    </section>
  )
}
