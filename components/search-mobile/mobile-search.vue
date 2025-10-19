<template>
  <div class="mobile-search">
    <h-icon :icon="ArrowLeft02Icon" @click="changeView" />
    <input-search />
  </div>
  <div class="mobile-search__wrapper">
    <h2-custom title="Récents"/>
    <search-history />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { useSearchStore } from '~/store/searchStore';

const emit = defineEmits(['change-view'])

const _searchStore = useSearchStore()

function changeView() {
  _searchStore.setResults(undefined)
  emit('change-view')
}
</script>

<style scoped lang="scss">
.mobile-search {
  display: flex;
  gap: 10px;
  background-color: $dark-surface-secondary;
  padding: 15px;
  &__wrapper {
    padding: 15px;
  }
}
</style>