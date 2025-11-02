<template>
  <section class="section-bento" :style="{padding: paddingPx}">
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps({
  paddingPx: { type: String, default: '8px' }
})
</script>

<style scoped lang="scss">
.section-bento {
  border-radius: 8px;
  overflow: hidden;
  background-color: $dark-surface-secondary;
  color: #fff;
}
</style>