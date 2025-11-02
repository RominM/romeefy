import { defineStore } from 'pinia'
import { useAPI } from '~/composables/api/useApi'
import { EGlobalEvent } from '~/types/enum/global/globalEvent'

export const playerStore = defineStore('player', {
  state: () => ({
    currentArtist: null as IArtist | null,
    currentAlbum: null as IAlbum | null,
    currentTrackId: null as number | null,
    currentPreview: null as string | null,
    isPlaying: false,
    currentColor: 'rgba(0,0,0,1)',
  }),
  actions: {
    setCurrentArtist(artist: IArtist) {
      this.currentArtist = artist
    },
    setCurrentAlbum(album: IAlbum) {
      console.log({album});
      
      this.currentAlbum = album
    },
    audioEl(): HTMLAudioElement | null {
      return document.querySelector<HTMLAudioElement>('audio')
    },

    playAudio(src: string) {
      const audio = this.audioEl()
      if (!audio) return

      if (src === audio.src && !audio.paused) {
        audio.pause()
        this.isPlaying = false
        useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, false)
        return
      }

      audio.src = src
      audio.play()
        .then(() => {
          this.isPlaying = true
          useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, true)
        })
        .catch(console.warn)
    },

    async byTrackId(trackId: number) {
      const { data, error } = await useAPI().track.getById(trackId)
      if (error || !data?.preview) return

      this.currentTrackId = trackId
      this.currentPreview = data.preview
      this.playAudio(data.preview)
      useGlobalEvents().emitEvent(EGlobalEvent.TRACK_DATA, data)
    },

    byPreview(previewUrl: string) {
      this.currentTrackId = null
      this.currentPreview = previewUrl
      this.playAudio(previewUrl)
    },

    togglePlayGlobal() {
      const audio = this.audioEl()
      if (!audio) return

      if (audio.paused) {
        this.isPlaying = true
        audio.play()
          .then(() => {
            this.isPlaying = true
            useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, true)
          })
          .catch(console.warn)
      } else {
        this.isPlaying = false
        audio.pause()
        useGlobalEvents().emitEvent(EGlobalEvent.PLAYER_STATE, false)
      }
    },

    setColor(color: string) {
      this.currentColor = color
    }
  },
  getters: {
    getColor: (state) => state.currentColor,
    isCurrentTrackPlaying: (state) => (trackId?: number, previewUrl?: string) => {
      if (trackId !== undefined) return trackId === state.currentTrackId && state.isPlaying
      if (previewUrl !== undefined) return previewUrl === state.currentPreview && state.isPlaying
      return false
    },
    getCurrentArtist: (state) => state.currentArtist,
    getCurrentAlbum: (state) => state.currentAlbum,
  }
})
