import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import FloatingParticles from './components/FloatingParticles.jsx'
import OpeningScreen from './components/OpeningScreen.jsx'
import Hero from './components/Hero.jsx'
import SpecialMessages from './components/SpecialMessages.jsx'
import ReasonsCards from './components/ReasonsCards.jsx'
import VideoMemory from './components/VideoMemory.jsx'
import LetterSection from './components/LetterSection.jsx'
import VoiceMessage from './components/VoiceMessage.jsx'
import BirthdayCake from './components/BirthdayCake.jsx'
import BirthdayWishes from './components/BirthdayWishes.jsx'
import FinalSurprise from './components/FinalSurprise.jsx'
import BackgroundMusic from './components/BackgroundMusic.jsx'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [musicWanted, setMusicWanted] = useState(false)
  const [voiceActive, setVoiceActive] = useState(false)

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
  }, [opened])

  return (
    <MotionConfig reducedMotion="user">
      <FloatingParticles />
      <AnimatePresence>
        {!opened && <OpeningScreen key="open" onOpen={() => { setOpened(true); window.scrollTo(0, 0) }} />}
      </AnimatePresence>
      {opened && (
        <>
          <BackgroundMusic wanted={musicWanted} setWanted={setMusicWanted} paused={voiceActive} />
          <main>
            <Hero />
            <SpecialMessages />
            <ReasonsCards />
            <VideoMemory />
            <LetterSection />
            <VoiceMessage onActiveChange={setVoiceActive} />
            <BirthdayCake />
            <BirthdayWishes />
            <FinalSurprise />
          </main>
        </>
      )}
    </MotionConfig>
  )
}
