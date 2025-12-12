<template>
  <header class="filter-home-top">
    <h-icon :icon="UserCircle02Icon"/>
    <ul class="filter-home-top__list">
      <li 
        v-for="(tag, index) in filterTags" 
        :key="tag.label" 
        :class="['filter-home-top__list__el', {active: tag.active}]" 
        @click="selectTag(index)"
      >
        {{ tag.label }}
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { UserCircle02Icon } from '@hugeicons/core-free-icons';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'update:selected', key: string): void
}>();

const filterTags = ref([
  { label: 'Tout', active: true, key: 'ALL' },
  { label: 'Musique', active: false, key: 'MUSIC' },
  { label: 'Podcast', active: false, key: 'PODCAST' },
  { label: 'Playlist', active: false, key: 'PLAYLIST' },
]);

const selectTag = (index: number) => {
  filterTags.value.forEach((tag, i) => {
    tag.active = i === index;
  });
  emit('update:selected', filterTags.value[index].key);
}
</script>

<style scoped lang="scss">
.filter-home-top {
  display: flex;
  gap: 10px;
  overflow: hidden;
  color: #fff;
  &__list {
    display: flex;
    gap: 10px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none; 
    &::-webkit-scrollbar {
      display: none;
    }
    &__el {
      padding: 4px 16px;
      background-color: $dark-text-primary;
      font-size: 12px;
      border-radius: 20px;
      &.active {
        background-color: $primary;
        color: #000;
      }
    }
  }
}
</style>