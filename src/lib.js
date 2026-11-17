import confetti from 'canvas-confetti'

export const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
}

const COLORS = ['#c9b6f2', '#f6c9dc', '#e6c27a', '#fbf4e8', '#9b7fe0']
const opts = { colors: COLORS, disableForReducedMotion: true, zIndex: 60 }

export const burst = (x = 0.5, y = 0.6) =>
  confetti({ ...opts, particleCount: 90, spread: 80, startVelocity: 38, origin: { x, y }, scalar: 0.9 })

export const celebrate = () => {
  burst(0.5, 0.65)
  setTimeout(() => confetti({ ...opts, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } }), 250)
  setTimeout(() => confetti({ ...opts, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } }), 450)
}

export const gentleConfetti = () =>
  confetti({ ...opts, particleCount: 40, spread: 100, startVelocity: 18, gravity: 0.6, ticks: 260, origin: { x: 0.5, y: 0.2 }, scalar: 0.8 })

export const fmt = (s) => {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}
