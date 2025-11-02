// store/playerStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAPI } from '~/composables/api/useApi'
import { useColors } from '~/composables/colors/useColors'
import { EGlobalEvent } from '~/types/enum/global/globalEvent'

export const playerStore = defineStore('player-store', () => {
  // état
  const currentTrackId = ref<number | null>(null)
  const currentPreview = ref<string | null>(null)
  const trackData = ref<ITrack | null>(null)
  const currentArtist = ref<IArtist | null>(null)
  const currentAlbum = ref<IAlbum | null>(null)
  const isPlaying = ref(false)
  const currentColor = ref('rgba(0,0,0,1)')

  // caches (non réactifs mais utiles pour éviter fetch répétitif)
  const artistsCache = new Map<number, IArtist>()
  const albumsCache = new Map<number, IAlbum>()

  // audio singleton
  let _audioEl: HTMLAudioElement | null = null
  const ensureAudioEl = (): HTMLAudioElement | null => {
    if (_audioEl) return _audioEl
    const el = document.querySelector<HTMLAudioElement>('audio')
    if (!el) return null
    _audioEl = el
    // events
    el.onpause = () => {
      isPlaying.value = false
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, false)
    }
    el.onplay = () => {
      isPlaying.value = true
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, true)
    }
    el.onended = () => {
      isPlaying.value = false
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_ENDED, null)
    }
    return _audioEl
  }

  // util: assigner un objet propre pour la réactivité
  const makePlain = <T>(obj: T) => obj ? ({ ...obj } as T) : null

  // play helper
  const playSrc = async (src: string) => {
    const audio = ensureAudioEl()
    if (!audio) return
    // si c'est la même source et en train de jouer => pause
    if (src === audio.src && !audio.paused) {
      audio.pause()
      isPlaying.value = false
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, false)
      return
    }
    audio.src = src
    try {
      await audio.play()
      isPlaying.value = true
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, true)
    } catch (err) {
      console.warn('player: play failed', err)
    }
  }

  // play by trackId (fetch si besoin)
  const byTrackId = async (trackId: number) => {
    // si c'est déjà le même track et déjà en lecture, toggle
    if (trackId === currentTrackId.value && isPlaying.value) {
      const audio = ensureAudioEl()
      if (audio) {
        audio.pause()
        isPlaying.value = false
        useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, false)
      }
      return
    }

    // si on a déjà les data en cache local (trackData) et même id -> reuse
    if (trackData.value?.id === trackId && trackData.value.preview) {
      currentTrackId.value = trackId
      currentPreview.value = trackData.value.preview
      await playSrc(trackData.value.preview)
      useGlobalEvents().emitEvent(EGlobalEvent.TRACK_DATA, trackData.value)
      return
    }

    // fetch
    const { data, error } = await useAPI().track.getById(trackId)
    if (error || !data?.preview) return

    // assigner track, preview, etc.
    currentTrackId.value = trackId
    currentPreview.value = data.preview
    trackData.value = { ...data } // clone plat

    // artist/album: utiliser cache si présent, sinon assigner
    if (data.artist?.id) {
      const cachedArtist = artistsCache.get(data.artist.id)
      if (!cachedArtist || cachedArtist.id !== currentArtist.value?.id) {
        const artistPlain = makePlain(data.artist)
        artistsCache.set(data.artist.id, artistPlain!)
        currentArtist.value = artistPlain        
      }
    }

    if (data.album?.id) {
      const cachedAlbum = albumsCache.get(data.album.id)
      if (!cachedAlbum || cachedAlbum.id !== currentAlbum.value?.id) {
        const albumPlain = makePlain(data.album)
        albumsCache.set(data.album.id, albumPlain!)
        currentAlbum.value = albumPlain

        if(!currentAlbum.value) return
        const colors = await useColors().extractTopColors(currentAlbum.value.cover_xl)
        setColor(colors[0].rgb)
      }
    }

    await playSrc(data.preview)
    useGlobalEvents().emitEvent(EGlobalEvent.TRACK_DATA, data)
  }

  // play by preview url (no fetch)
  const byPreview = async (previewUrl: string) => {
    // update state
    currentTrackId.value = null
    currentPreview.value = previewUrl
    trackData.value = null
    // don't touch artist/album (unless you want to clear them)
    await playSrc(previewUrl)
    useGlobalEvents().emitEvent(EGlobalEvent.TRACK_DATA, null)
  }

  const togglePlayGlobal = async () => {
    const audio = ensureAudioEl()
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
        isPlaying.value = true
        useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, true)
      } catch (err) {
        console.warn(err)
      }
    } else {
      audio.pause()
      isPlaying.value = false
      useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, false)
    }
  }

  const isCurrentTrackPlaying = (trackId?: number, previewUrl?: string) => {
    if (trackId !== undefined) return trackId === currentTrackId.value && isPlaying.value
    if (previewUrl !== undefined) return previewUrl === currentPreview.value && isPlaying.value
    return false
  }

  const setColor = (color: string) => {
    currentColor.value = color
  }

  const getColor = computed(() => currentColor.value)

  return {
    // state
    currentTrackId,
    currentPreview,
    trackData,
    currentArtist,
    currentAlbum,
    isPlaying,
    currentColor,

    // getters
    getColor,

    // actions
    byTrackId,
    byPreview,
    togglePlayGlobal,
    isCurrentTrackPlaying,
    setColor,
    // util pour debug/test
    _ensureAudioEl: ensureAudioEl
  }
})
