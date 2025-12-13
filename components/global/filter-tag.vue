<template>
  <div class="filter-tag">
    <!-- <h-icon :icon="UserCircle02Icon"/> -->
    <ul class="filter-tag__list">
      <li 
        v-for="(tag, index) in tags" 
        :key="tag.label" 
        :class="['filter-tag__list__el', {active: tag.active}]" 
        @click="selectTag(index)"
      >
        {{ tag.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const emit = defineEmits<{
  (e: 'update:selected', key: string): void
}>();

const props = defineProps({
  tags: { type: Array as PropType<TTag[]>, required: true }
})

const selectTag = (index: number) => {
  props.tags.forEach((tag, i) => {
    tag.active = i === index;
  });
  emit('update:selected', props.tags[index].key);
}
</script>

<style scoped lang="scss">
.filter-tag {
  display: flex;
  gap: 10px;
  overflow: hidden;
  color: #fff;
  background-color: $dark-surface-secondary;
  padding: 5px 0 10px 10px;
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
      white-space: nowrap;
      &.active {
        background-color: $primary;
        color: #000;
      }
    }
  }
}
</style>