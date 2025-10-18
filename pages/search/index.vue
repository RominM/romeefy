<template>
  <div class="search-page">
    <not-exist />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['authorized-device'] })
</script>

<style scoped lang="scss">
.search-page {
  width: 100%;
}
</style>