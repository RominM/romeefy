<template>
  <header class="user-library-header" >
    <div :class="['user-library-header__dynamic-title', { '--hovered': hovered }]">
      <h-icon class="user-library-header__dynamic-title--icon" :icon="BarCode02Icon"/>
      <h2 class="user-library-header__dynamic-title__title">Bibliothèque</h2>
    </div>

    <handling-top-library />
  </header>
</template>

<script setup lang="ts">
import { BarCode02Icon } from '@hugeicons/core-free-icons';
const props = defineProps({
  hovered: { type: Boolean, default: false }
})

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
}
</style>