<template>
  <div class="bottom-bar">
    <bottom-player />
    <navigation-list @action-nav="$emit('action-nav', $event)" />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: color-alpha($dark-background, 0.95);
  z-index: 999;
}
</style>