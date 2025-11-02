<template>
  <header class="header-panel" >
    <div :class="['header-panel__dynamic-title', { '--hovered': hovered }]">
      <h-icon class="header-panel__dynamic-title--icon" :icon="BarCode02Icon"/>
      <h2 class="header-panel__dynamic-title__title">{{ title }}</h2>
    </div>
    <slot />
    <button 
      class="handling-top-library__expand-shrink" 
      :title="`${isExpanded ? 'Réduire' : 'Agrandir'} la Bibliothèque`" 
      @click="toggleExpend"
    >
      <h-icon v-if="!isExpanded" :icon="ArrowExpand01Icon" size="18"/>
      <h-icon v-else :icon="ArrowShrink02Icon" size="18"/>
    </button>
  </header>
</template>

<script setup lang="ts">
import { ArrowExpand01Icon, ArrowShrink02Icon, BarCode02Icon } from '@hugeicons/core-free-icons';

const emit = defineEmits(['expend'])
const props = defineProps({
  hovered: { type: Boolean, default: false },
  title: { type: String, default: ''}
})

const isExpanded = ref(false)

function toggleExpend() {
  isExpanded.value = !isExpanded.value
  emit('expend')
}
</script>

<style scoped lang="scss">
.header-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0 12px 0;
  &__dynamic-title {
    display: flex;
    &__title {
      transform: translate(-20px);
      transition: 0.2s;
    }
    &--icon {
      transform: translate(-30px);
      opacity: 0;
      transition: 0.4s;
    }
    &.--hovered .header-panel__dynamic-title {
      &__title {
        transform: translate(10px);
      }
      &--icon {
        transform: translate(0);
        opacity: 1;
      }
    }
  }
}
</style>