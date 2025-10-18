<template>
  <header class="user-library-header" >
    <div :class="['user-library-header__dynamic-title', { '--hovered': hovered }]">
      <h-icon class="user-library-header__dynamic-title--icon" :icon="BarCode02Icon"/>
      <h2 class="user-library-header__dynamic-title__title">Bibliothèque</h2>
    </div>

    <div style="display: flex; gap: 10px;">
      <button class="user-library-header__create" title="Gérez un dossier, une playlist ou un Jam">
        <h-icon :icon="Add01Icon" size="18"/>
        Créer
      </button>
      <button 
        class="user-library-header__expand-shrink" 
        :title="`${isExpanded ? 'Réduire' : 'Agrandir'} la Bibliothèque`" 
      >
        <h-icon v-if="!isExpanded" :icon="ArrowExpand01Icon" size="18"/>
        <h-icon v-else :icon="ArrowShrink02Icon" size="18"/>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Add01Icon, ArrowExpand01Icon, ArrowShrink02Icon, BarCode02Icon } from '@hugeicons/core-free-icons';
const props = defineProps({
  hovered: { type: Boolean, default: false }
})

const isExpanded = ref<boolean>(false)
</script>

<style scoped lang="scss">
.user-library-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    &.--hovered .user-library-header__dynamic-title {
      &__title {
        transform: translate(10px);
      }
      &--icon {
        transform: translate(0);
        opacity: 1;
      }
    }
  }

  &__create,
  &__expand-shrink {
    display: flex;
    gap: 5px;
    transition: 0.3s;
    border-radius: 25px;
    &:hover {
      background-color: $dark-surface-secondary;
    }
  }

  &__create {
    padding: 8px 12px;
    background-color: $dark-surface;
    font-size: 14px;
  }
  &__expand-shrink {
    padding: 5px 10px;

  }
}
</style>