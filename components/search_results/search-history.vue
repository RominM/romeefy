<template>
    <ul class="search-history">
      <li
        v-for="(item, index) in _searchStore.history"
        :key="index"
        @delete="deleteItemHistoy(item)"
      >
        <search-result-item :item="item" />
      </li>
    </ul>
    <button-cta v-if="_searchStore.history.length" label="Effacer les dernières recherches" @click="clearHistory" />
</template>

<script setup lang="ts">
import { useSearchStore } from '~/store/searchStore';

const _searchStore = useSearchStore()

function clearHistory() {
  _searchStore.history = []
}

function deleteItemHistoy(item: TSearchItem) {
  console.log({item});
}
</script>

<style scoped lang="scss">
.search-history {
  height: 100dvh;
  overflow: auto;
}
</style>