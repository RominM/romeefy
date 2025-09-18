<template>
  <svg
    :width="numericSize"
    :height="numericSize"
    :viewBox="`0 0 ${numericSize} ${numericSize}`"
    role="img"
    :aria-label="ariaLabel"
    class="loader"
  >
    <g :transform="`translate(${numericSize/2}, ${numericSize/2})`">
      <circle
        :r="radius"
        :stroke-width="stroke"
        :stroke="trackColor"
        fill="none"
      />

      <circle
        :r="radius"
        :stroke-width="stroke"
        :stroke-linecap="lineCap"
        :stroke="color"
        fill="none"
        class="arc"
        :style="{ strokeDasharray: `${dash} ${circumference}`, transformOrigin: 'center' }"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number | string
  color?: string
  trackColor?: string
  stroke?: number
  ariaLabel?: string
  lineCap?: 'round' | 'butt' | 'square'
  duration?: number
}

const props = defineProps<Props>()

const numericSize = computed(() => {
  const s = props.size ?? 48
  return typeof s === 'number' ? s : parseInt(String(s), 10) || 48
})

const stroke = computed(() => (props.stroke ?? Math.max(2, Math.round(numericSize.value * 0.08))))
const radius = computed(() => (numericSize.value / 2) - stroke.value / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dash = computed(() => +(circumference.value * 0.75).toFixed(2))

const color = computed(() => props.color ?? '#ccc')
const trackColor = computed(() => props.trackColor ?? '#262525')
const lineCap = computed(() => props.lineCap ?? 'round')
const ariaLabel = computed(() => props.ariaLabel ?? 'Chargement')
const duration = computed(() => (props.duration ?? 900)) // ms

// expose values to template
</script>

<style scoped>
.loader {
  display: inline-block;
  vertical-align: middle;
}

.arc {
  animation: spin var(--loader-duration, 900ms) linear infinite;
  transform-box: fill-box;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>

<!--
Usage rapide:
<LoaderCircle size="64" color="#e11d48" :stroke="6" />
-->
