<template>
  <div class='song-timeline'>
    <audio ref="audio" :src="source" @timeupdate="updateProgress" @loadedmetadata="setDuration" />
    <span class='song-timeline__time'>{{ useFormatTime(currentTime) }}</span>
    <input
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      v-model="currentTime"
      @input="seekAudio"
      :style="{ '--progress': duration ? (currentTime / duration) * 100 + '%' : '0%' }"
    />
    <span class='song-timeline__time'>{{ duration ? useFormatTime(duration) : '-:--' }}</span>
  </div>
</template>

<script setup lang='ts'>
import { useFormatTime } from '~/composables/formats/useFormatTime'

const props = defineProps({
  source: { type: String, default: '' },
  isPlaying: { type: Boolean, default: false }
})

const audio = ref<HTMLAudioElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)

function updateProgress() {
  if (audio.value) currentTime.value = audio.value.currentTime
}

function setDuration() {
  if (audio.value) duration.value = audio.value.duration
}

function seekAudio() {
  if (audio.value) audio.value.currentTime = currentTime.value
}

watch(
  () => props.source,
  (newSrc) => {
    if (audio.value && newSrc) {
      audio.value.src = newSrc;
      audio.value.load();
    }
  }
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
    background: linear-gradient(
      to right,
      #fff 0%,
      #fff var(--progress, 0%),
      #555 var(--progress, 0%),
      #555 100%
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
