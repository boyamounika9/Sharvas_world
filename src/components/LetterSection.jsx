import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { rise } from '../lib.js'

const paras = [
  "I don't know whether I have ever properly told you how much you mean to me.",
  'Some people come into our lives and slowly become a very special part of our journey. You are one of those people for me.',
  'Whenever I feel low, whenever I lose motivation, or whenever things don\u2019t go the way I expect, you somehow find a way to make me feel better.',
  'Your words might seem simple to you, but they mean a lot to me.',
  'You motivate me, encourage me, and remind me that I am capable of doing good things.',
  'I genuinely appreciate every little moment, every conversation, and every time you have supported me.',
  'I may not have hundreds of photographs or perfectly captured memories, but I will always remember how you made me feel.',
  'I hope you achieve everything you dream of.',
  'I hope life gives you countless reasons to smile.',
  'I hope you always stay happy, confident, strong, and surrounded by people who appreciate you.',
  'And whenever you feel low, remember that the same person you motivate also wishes to see you happy and successful.',
  'Thank you for being YOU.',
  'Happy Birthday, Sharva!',
]

export default function LetterSection() {
  const [stage, setStage] = useState('closed') // closed -> opening -> open
  const open = () => { setStage('opening'); setTimeout(() => setStage('open'), 1500) }

  return (
    <section className="section letter-sec">
      <motion.h2 className="serif h2" {...rise}>A Letter From My Heart</motion.h2>
      <AnimatePresence mode="wait">
        {stage !== 'open' ? (
          <motion.div key="env" className="env-wrap" {...rise} exit={{ opacity: 0, y: 30, scale: 0.9 }} transition={{ duration: 0.8 }}>
            <div className={`envelope ${stage === 'opening' ? 'is-open' : ''}`} aria-hidden="true">
              <div className="env-back" />
              <div className="env-paper" />
              <div className="env-front" />
              <div className="env-flap" />
              <span className="env-seal">❤</span>
            </div>
            <button className="glow-btn" onClick={open} disabled={stage === 'opening'}>Open My Letter 💌</button>
          </motion.div>
        ) : (
          <motion.article key="letter" className="paper" initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
            <p className="hand dear">Dear Sharva,</p>
            {paras.map((p, i) => (
              <motion.p key={i} className="hand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.35, duration: 1 }}>{p}</motion.p>
            ))}
            <motion.p className="hand sign" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + paras.length * 0.35, duration: 1 }}>With lots of love and friendship. ❤️</motion.p>
            <motion.p className="paper-foot serif" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + paras.length * 0.35, duration: 1.2 }}>Always wishing the best for you.</motion.p>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  )
}
