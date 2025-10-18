<template>
  <div class="library-page">
    <not-exist />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['authorized-device'] })
</script>

<style scoped lang="scss">
.library-page {
  width: 100%;
}
</style>