import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'
import { rise, fmt } from '../lib.js'

const SRC = '/videos/sharva-memory.mp4'

export default function VideoMemory() {
  const v = useRef(null)
  const wrap = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(0)
  const [ratio, setRatio] = useState('1 / 2')
  const [err, setErr] = useState(false)

  const toggle = () => { const el = v.current; if (!el) return; el.paused ? el.play().catch(() => setErr(true)) : el.pause() }
  const fullscreen = () => {
    const el = v.current
    if (wrap.current?.requestFullscreen) wrap.current.requestFullscreen().catch(() => {})
    else if (el?.webkitEnterFullscreen) el.webkitEnterFullscreen()
  }

  return (
    <section className="section video-sec">
      <motion.h2 className="serif h2" {...rise}>A Little Piece of You, A Little Memory to Keep ❤️</motion.h2>
      <motion.p className="sub" {...rise}>Some moments are too special to stay only in our memories.</motion.p>

      <motion.div className="video-stage" initial={{ opacity: 0, scale: 0.92, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
        <span className="twinkle t1" aria-hidden="true">✦</span><span className="twinkle t2" aria-hidden="true">✦</span>
        <span className="twinkle t3" aria-hidden="true">✧</span><span className="twinkle t4" aria-hidden="true">✧</span>
        <div className="video-frame glass" ref={wrap}>
          {err ? (
            <div className="media-error" role="alert">The video couldn’t be loaded. Check that <code>public/videos/sharva-memory.mp4</code> exists.</div>
          ) : (
            <>
              <video ref={v} src={`${SRC}#t=0.1`} playsInline preload="metadata" style={{ aspectRatio: ratio }}
                onClick={toggle} onError={() => setErr(true)}
                onLoadedMetadata={(e) => { setDur(e.currentTarget.duration); const { videoWidth: w, videoHeight: h } = e.currentTarget; if (w && h) setRatio(`${w} / ${h}`) }}
                onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
                onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
              {!playing && (
                <button className="big-play" onClick={toggle} aria-label="Play video"><Play size={34} fill="currentColor" /></button>
              )}
              <div className="vctrl">
                <button onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
                <input type="range" min="0" max={dur || 1} step="0.05" value={cur} aria-label="Video progress"
                  style={{ '--p': `${dur ? (cur / dur) * 100 : 0}%` }}
                  onChange={(e) => { v.current.currentTime = +e.target.value; setCur(+e.target.value) }} />
                <span className="time">{fmt(cur)}</span>
                <button onClick={() => { v.current.muted = !muted; setMuted(!muted) }} aria-label={muted ? 'Unmute video' : 'Mute video'}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
                <button onClick={fullscreen} aria-label="Fullscreen"><Maximize size={18} /></button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      <motion.p className="caption serif" {...rise}>Not every beautiful memory needs a photograph. Sometimes, a little moment is enough to make someone smile.</motion.p>
    </section>
  )
}
