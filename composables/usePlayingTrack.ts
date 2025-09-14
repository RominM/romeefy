import { EGlobalEvent } from "~/types/enum/global/globalEvent"
import { useAPI } from "./api/useApi"

export const usePlayingTrack = (trackId: number) => {
    useAPI().track.getById(trackId).then(track => {
    if (!track?.preview) return

    const audioEl = document.querySelector<HTMLAudioElement>('audio')
    if (!audioEl || !track?.preview) return

    audioEl.src = track.preview

    audioEl.addEventListener('canplay', () => {
      audioEl.play().catch(e => console.warn('Impossible de lancer le son :', e))
    }, { once: true })
    
    useGlobalEvents().emitEvent(EGlobalEvent.LISTEN_TRACK_PREVIEW, track.preview)
    useGlobalEvents().emitEvent(EGlobalEvent.TRACK_DATA, track)
  })
}