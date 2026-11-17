# A Little World for Sharva ❤️

## Run it
    npm install
    npm run dev        # local preview
    npm run build      # production build -> dist/

## Your media (already included)
- `public/videos/sharva-memory.mp4`  — her video (kept at its original 480x960 ratio, never cropped)
- `public/audio/sharva-message.mp3`  — your voice message (converted from the WhatsApp .ogg so it also plays on iPhones)
- `extras/other-voice-note-6s.mp3`   — the second, shorter voice note you uploaded (not used on the site)

To replace either file, overwrite it with the same name and rebuild. If you use another
format, change the `src` in `src/components/VideoMemory.jsx` / `VoiceMessage.jsx`.

## Optional background music
Add a royalty-free track as `public/audio/background-music.mp3`. The music button appears
only when that file exists. It never autoplays, pauses while your voice message plays,
and resumes afterwards if she had turned it on.

## Deploy
Netlify (easiest): run `npm run build`, then drag the `dist` folder onto https://app.netlify.com/drop
Vercel: push to GitHub, import the repo at vercel.com, keep the defaults (Vite is detected).
