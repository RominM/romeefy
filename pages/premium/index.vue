<template>
  <div class="premium-page">
    <not-exist />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['authorized-device'], ssr: false })
</script>

<style scoped lang="scss">
.premium-page {
  width: 100%;
}
</style>