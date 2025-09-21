<template>
  <div class="loader-wrapper">
    <div class="loader" :style="loaderStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  size: { type: Number, default: 40 },
  color: { type: String, default: '#ccc' }
})

const loaderStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  border: '4px solid rgba(0,0,0,0.1)',
  borderTopColor: props.color,
}))
</script>

<style scoped lang="scss">
.loader-wrapper {
  display: inline-block;
}

.loader {
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg); /* agit uniquement sur l’enfant */
  }
}
</style>
