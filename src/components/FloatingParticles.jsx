import { useEffect, useRef } from 'react'

// One fixed, lightweight canvas: twinkling stars, glowing motes and drifting petals.
export default function FloatingParticles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = innerWidth < 700
    let w = 0, h = 0, raf = 0
    const rnd = (a, b) => a + Math.random() * (b - a)
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = innerWidth; h = innerHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const make = (type) => ({
      type, x: rnd(0, w), y: rnd(0, h), r: type === 2 ? rnd(5, 9) : rnd(0.6, type ? 2.6 : 1.6),
      vy: type === 2 ? rnd(0.25, 0.6) : -rnd(0.05, 0.25), vx: rnd(-0.25, 0.25),
      a: rnd(0, 6.28), s: rnd(0.4, 1.4), rot: rnd(0, 6.28), hue: Math.random() < 0.6 ? '246,201,220' : '201,182,242',
    })
    const items = [
      ...Array.from({ length: small ? 40 : 80 }, () => make(0)),
      ...Array.from({ length: small ? 12 : 24 }, () => make(1)),
      ...Array.from({ length: small ? 8 : 16 }, () => make(2)),
    ]
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of items) {
        if (!reduce) {
          p.y += p.vy; p.x += p.vx + (p.type === 2 ? Math.sin(t / 1500 + p.a) * 0.4 : 0); p.rot += 0.01 * p.s
          if (p.y > h + 20) p.y = -20
          if (p.y < -20) p.y = h + 20
          if (p.x > w + 20) p.x = -20
          if (p.x < -20) p.x = w + 20
        }
        const tw = 0.5 + 0.5 * Math.sin(t / 900 * p.s + p.a)
        if (p.type === 0) {
          ctx.fillStyle = `rgba(251,244,232,${0.25 + tw * 0.6})`
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill()
        } else if (p.type === 1) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
          g.addColorStop(0, `rgba(230,194,122,${0.35 + tw * 0.3})`); g.addColorStop(1, 'rgba(230,194,122,0)')
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, 6.28); ctx.fill()
        } else {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
          ctx.fillStyle = `rgba(${p.hue},0.55)`
          ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.28); ctx.fill(); ctx.restore()
        }
      }
    }
    const loop = (t) => { draw(t); raf = requestAnimationFrame(loop) }
    if (reduce) draw(0); else raf = requestAnimationFrame(loop)
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) raf = requestAnimationFrame(loop) }
    addEventListener('resize', resize); document.addEventListener('visibilitychange', vis)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); document.removeEventListener('visibilitychange', vis) }
  }, [])
  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
