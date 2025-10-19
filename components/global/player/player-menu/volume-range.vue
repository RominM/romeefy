<template>
  <div class="volume-range">
    <button @click="toggleMute">
      <h-icon :icon="isMuted ? VolumeOffIcon : VolumeHighIcon" size="18" />  
    </button>

    <input
      ref="slider"
      class="volume-range__input"
      type="range"
      min="0"
      max="100"
      step="1"
      :value="isMuted ? 0 : Math.round(volume * 100)"
      @input="onRange"
      aria-label="Volume"
    />
  </div>
</template>

<script setup lang="ts">
import { VolumeHighIcon, VolumeOffIcon } from '@hugeicons/core-free-icons';
import { onMounted, ref } from 'vue';

const volume = ref<number>(0.7);
const isMuted = ref<boolean>(false);
const slider = ref<HTMLInputElement | null>(null);

function updateGradient(val: number) {
  if (!slider.value) return;
  slider.value.style.background = `linear-gradient(
    to right,
    var(--fill-color, white) 0%, 
    var(--fill-color, white) ${val}%, 
    #555 ${val}%, 
    #555 100%
  )`;
}

function onRange(e: Event) {
  const target = e.target as HTMLInputElement;
  const val = Number(target.value);
  volume.value = +(val / 100).toFixed(2);
  if (volume.value > 0 && isMuted.value) isMuted.value = false;
  updateGradient(val);
}

function toggleMute() {
  isMuted.value = !isMuted.value;
  updateGradient(isMuted.value ? 0 : Math.round(volume.value * 100));
}

onMounted(() => {
  updateGradient(Math.round(volume.value * 100));
});
</script>

<style scoped lang="scss">
.volume-range {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 150px;

  &__input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    transition: background 0.2s;
    
    /* Couleur remplissage par défaut */
    --fill-color: white;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: transparent;
      transition: background 0.2s;
      margin-top: -3px;
    }

    &:hover {
      --fill-color: green;
    }

    &:hover::-webkit-slider-thumb {
      background: #fff;
    }

    &::-moz-range-thumb {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: transparent;
      border: none;
      transition: background 0.2s;
    }

    &:hover::-moz-range-thumb {
      background: green;
    }
  }
}
</style>
