<template>
  <div class="search-result-page">
    <scroll-container>
      <loader v-if="isLoading"/>
      <display-search-results v-else :results="results" />
    </scroll-container>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/store/searchStore';

const _searchStore = useSearchStore()
const isLoading = computed<boolean>(() => _searchStore.getLoadingState)
const results = computed(()=> _searchStore.getResults)
</script>

<style scoped lang="scss">
.search-result-page {
  
}
</style>