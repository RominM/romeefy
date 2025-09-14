<template>
  <div class='song-timeline'>
    <audio ref="audio" @timeupdate="updateProgress" @loadedmetadata="setDuration">
      <source :src="source" type="audio/mpeg" />
    </audio>
    
    <span class='song-timeline__time'>{{ formatTime(currentTime) }}</span>
    <input
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      v-model="currentTime"
      @input="seekAudio"
      :style="{ '--progress': (currentTime / duration) * 100 }"
    />
    <span class='song-timeline__time'>{{ duration ? formatTime(duration) : '-:--' }}</span>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  source: { type: String, default: ''},
  isPlaying: { type: Boolean, default: false }
})

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

// Mise à jour de la progression
const updateProgress = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime
  }
}

// Durée totale quand le son est chargé
const setDuration = () => {
  if (audio.value) {
    duration.value = audio.value.duration
  }
}

// Se déplacer dans le son
const seekAudio = () => {
  if (audio.value) {
    audio.value.currentTime = currentTime.value
  }
}

// Format mm:ss
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60).toString().padStart(2, "0")
  return `${minutes}:${seconds}`
}

watch(
  () => props.isPlaying,
  (playing) => {
    if (!audio.value) return
    playing ? audio.value.play() : audio.value.pause()
  },
  { immediate: true }
)

</script>

<style lang='scss' scoped>
  .song-timeline{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 7px;
    width: 100%;
    height: 100%;

    &__time {
      color: #ccc;
      white-space: nowrap;
      font-size: 12px;
    }

    
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 10px;
      outline: none;
      cursor: pointer;
      background-color: $dark-text-primary;
      background-image: linear-gradient(
        to right,
        #fff 0%,
        #fff var(--progress, 0%),
        transparent var(--progress, 0%),
        transparent 100%
      );
      background-repeat: no-repeat;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, background 0.2s ease;
    }

    input[type="range"]:hover::-webkit-slider-thumb {
      background: #fff;
    }

    input[type="range"]::-moz-range-thumb {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, background 0.2s ease;
    }

    input[type="range"]:hover::-moz-range-thumb {
      background: #fff;
    }
  }
</style>