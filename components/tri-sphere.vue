<template>
  <div class="solarin-sphere" :style="{ width: size + 'px', height: size + 'px' }">
    <div class="sphere-light"></div>
    <div class="sphere-glow"></div>

    <!-- maillage triangulaire -->
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 100 100"
      class="sphere-mesh"
    >
      <defs>
        <radialGradient id="faceGradient" cx="50%" cy="50%" r="60%">
          <stop offset="0%" :stop-color="lightColor" stop-opacity="0.9" />
          <stop offset="100%" :stop-color="darkColor" stop-opacity="0.05" />
        </radialGradient>
      </defs>

      <g v-for="(triangle, i) in triangles" :key="i">
        <polygon
          :points="triangle"
          fill="url(#faceGradient)"
          :stroke="strokeColor"
          :stroke-width="0.15"
          :opacity="0.85"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  size?: number;
}>();

const size = props.size ?? 480;

// couleurs inspirées de l’image Solarin
const darkColor = '#116466';
const lightColor = '#D1E8E2';
const strokeColor = '#D9B08C';

// génération des coordonnées d’un maillage sphérique en projection plate
const triangles = computed(() => {
  const layers = 8;
  const perLayer = (i: number) => Math.round(6 + i * 2);
  const out: string[] = [];
  for (let lat = 0; lat < layers; lat++) {
    const y1 = (lat / layers) * 100;
    const y2 = ((lat + 1) / layers) * 100;
    const n1 = perLayer(lat);
    const n2 = perLayer(lat + 1);
    for (let i = 0; i < n1; i++) {
      const x1 = (i / n1) * 100;
      const x2 = ((i + 1) / n1) * 100;
      const x3 = ((i + 0.5) / n1) * 100;
      const y3 = (y1 + y2) / 2 + (Math.random() - 0.5) * 3;
      out.push(`${x1},${y1} ${x2},${y1} ${x3},${y3}`);
    }
  }
  return out;
});
</script>

<style scoped>
.solarin-sphere {
  position: relative;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #116466 0%, #0a1c1c 100%);
  overflow: hidden;
  box-shadow:
    0 0 60px rgba(0, 255, 255, 0.2),
    inset 0 0 80px rgba(0, 0, 0, 0.8);
}

/* lumière interne centrale */
.sphere-light {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(209,232,226,0.8) 0%, rgba(17,100,102,0.1) 80%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  filter: blur(25px);
  opacity: 0.9;
  animation: pulse 4s ease-in-out infinite;
}

/* halo externe */
.sphere-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: 0 0 100px 30px rgba(209,232,226,0.2);
  opacity: 0.6;
}

/* maillage SVG */
.sphere-mesh {
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  pointer-events: none;
}

/* légère pulsation */
@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 1;
  }
}
</style>
