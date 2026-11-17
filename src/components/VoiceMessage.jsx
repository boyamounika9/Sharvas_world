import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { rise, fmt } from '../lib.js'

const BARS = Array.from({ length: 36 }, (_, i) => ({ d: ((i * 37) % 11) / 10, h: 0.35 + (((i * 53) % 7) / 7) * 0.65 }))

export default function VoiceMessage({ onActiveChange }) {
  const a = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(0)
  const [err, setErr] = useState(false)

  const toggle = () => { const el = a.current; if (!el) return; el.paused ? el.play().catch(() => setErr(true)) : el.pause() }
  const set = (v) => { setPlaying(v); onActiveChange(v) }

  return (
    <section className="section voice-sec">
      <motion.h2 className="serif h2" {...rise}>A Little Message From My Heart</motion.h2>
      <motion.p className="sub" {...rise}>Some feelings are better expressed in my own voice.</motion.p>
      <motion.p className="intro serif" {...rise}>Sharva, I could have written a thousand words, but I wanted you to hear a few of them directly from me. This one’s just for you. ❤️</motion.p>

      <motion.div className={`audio-card glass ${playing ? 'playing' : ''}`} {...rise}>
        <span className="twinkle t1" aria-hidden="true">✦</span><span className="twinkle t3" aria-hidden="true">✧</span>
        <audio ref={a} src="/audio/sharva-message.mp3" preload="metadata"
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration)} onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
          onPlay={() => set(true)} onPause={() => set(false)} onEnded={() => { set(false); setCur(0) }} onError={() => setErr(true)} />
        {err ? (
          <div className="media-error" role="alert">The voice message couldn’t be loaded. Check that <code>public/audio/sharva-message.mp3</code> exists.</div>
        ) : (
          <>
            <div className="wave" aria-hidden="true">
              {BARS.map((b, i) => <span key={i} style={{ '--h': b.h, '--d': `${b.d}s`, opacity: dur && i / BARS.length <= cur / dur ? 1 : 0.45 }} />)}
            </div>
            <div className="audio-row">
              <button className="play-btn" onClick={toggle} aria-label={playing ? 'Pause voice message' : 'Play voice message'}>{playing ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}</button>
              <div className="audio-bar">
                <input type="range" min="0" max={dur || 1} step="0.05" value={cur} aria-label="Voice message progress"
                  style={{ '--p': `${dur ? (cur / dur) * 100 : 0}%` }}
                  onChange={(e) => { a.current.currentTime = +e.target.value; setCur(+e.target.value) }} />
                <div className="times"><span>{fmt(cur)}</span><span>{fmt(dur)}</span></div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </section>
  )
}
