import { useEffect, useRef, useState } from 'react'
import { Music, VolumeX } from 'lucide-react'

// Optional music. Starts only after the visitor taps the button. Hidden if the file is missing.
export default function BackgroundMusic({ wanted, setWanted, paused }) {
  const ref = useRef(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    const a = ref.current
    if (!a || missing) return
    a.volume = 0.3
    if (wanted && !paused) a.play().catch(() => setWanted(false))
    else a.pause()
  }, [wanted, paused, missing, setWanted])

  return (
    <>
      <audio ref={ref} src="/audio/background-music.mp3" loop preload="metadata" onError={() => setMissing(true)} />
      {!missing && (
        <button className={`music-btn glass ${wanted && !paused ? 'on' : ''}`} onClick={() => setWanted(!wanted)}
          aria-pressed={wanted} aria-label={wanted ? 'Turn background music off' : 'Turn background music on'}>
          {wanted ? <Music size={20} /> : <VolumeX size={20} />}
        </button>
      )}
    </>
  )
}
