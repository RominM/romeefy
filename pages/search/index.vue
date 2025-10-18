<template>
  <div class="search-page">
    <first-search-view
      v-if="currentView === 'first'"
      @change-view="toggleView('search')"
    />

    <search-mobile-module
      v-else
      @change-view="toggleView('first')"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['authorized-device'] })

const currentView = ref<'first' | 'search'>('first')

function toggleView(view: 'first' | 'search') {
  currentView.value = view
}
</script>

<style scoped lang="scss">
.search-page {
  width: 100%;
  height: 100dvh;
  background-color: $dark-background;
}
</style>