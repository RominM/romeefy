import { ref } from 'vue'
import { EGlobalEvent } from '~/types/enum/global/globalEvent'
import { useAPI } from './api/useApi'

const currentTrackId = ref<number | null>(null)
const currentPreview = ref<string | null>(null)
const isPlaying = ref<boolean>(false)
const trackData = ref<ITrack | null>(null)
const currentColor = ref<string>('rgba(0,0,0,1)')

export const usePlay = () => {

  const audioEl = (): HTMLAudioElement | null =>
    document.querySelector<HTMLAudioElement>('audio')

  const playAudio = (src: string) => {
    const audio = audioEl()
    if (!audio) return

    if (src === audio.src && !audio.paused) {
      audio.pause()
      isPlaying.value = false
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, false)
      return
    }

    audio.src = src
    audio.play().then(() => {
      isPlaying.value = true
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, true)
    }).catch(console.warn)
  }

  const byTrackId = async (trackId: number) => {    
    const { data, error } = await useAPI().track.getById(trackId)
    if (error || !data?.preview) return

    currentTrackId.value = trackId
    currentPreview.value = data.preview
    playAudio(data.preview)

    trackData.value = data

    useGlobalEvents().emitEvent(EGlobalEvent.TRACK_DATA, data)
  }

  const byPreview = (previewUrl: string) => {
    currentTrackId.value = null
    currentPreview.value = previewUrl
    playAudio(previewUrl)
  }

  const togglePlayGlobal = () => {
    const audio = audioEl()
    if (!audio) return

    if (audio.paused) {
      audio.play().then(() => {
        isPlaying.value = true
        useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, true)
      }).catch(console.warn)
    } else {
      audio.pause()
      isPlaying.value = false
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, false)
    }
  }

  const isCurrentTrackPlaying = (trackId?: number, previewUrl?: string) => {
    if (trackId) return trackId === currentTrackId.value && isPlaying.value
    if (previewUrl) return previewUrl === currentPreview.value && isPlaying.value
    return false
  }

  // Gestion couleur
  const setColor = (color: string) => {
    currentColor.value = color
  }

  const getColor = computed(() => currentColor.value)

  return {
    setColor,
    getColor,
    currentTrackId,
    currentPreview,
    isPlaying,
    byTrackId,
    byPreview,
    trackData,
    togglePlayGlobal,
    isCurrentTrackPlaying
  }
}
