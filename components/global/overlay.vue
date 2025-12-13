<template>
  <div :class="['overlay', { '--is-open': isOpenOverlay }]">
    <div class="content" :style="{backgroundColor: mainColor}" >
      <header class="content__top" @click="closeOverlay" >
        <h-icon :icon="ArrowDown01Icon" color="#fff" />
        <p>{{ title }}</p>
        <h-icon :icon="MoreVerticalIcon" color="#fff" @click="emit('more')" />
      </header>
      
      <main class="content__main">
        <slot />
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown01Icon, MoreVerticalIcon } from '@hugeicons/core-free-icons';

const emit = defineEmits([ 'update:isOpenOverlay','more'])
const props = defineProps({
  mainColor: { type: String, defautl: "#000" },
  isOpenOverlay:{ type: Boolean, default: false },
  title: { type: String, default: '' },
})

function closeOverlay() {
  emit('update:isOpenOverlay', false)
}
</script>

<style scoped lang="scss">
.overlay {
  position: relative;
  inset: 0;
  background-color: #00000030;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 0;
  pointer-events: none;

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    text-align: center;
    opacity: 0;

    transform: translateY(100%);
    transition: transform 0.5s ease, opacity 0.5s ease;

    // background-color: #000; // must be dynamic
    color: #fff;
    overflow: auto;
    z-index: 99;
    &__top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      background-color: transparent;
      z-index: 99999;
    }
  }

  &.--is-open {
    pointer-events: auto;
    .content {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

</style>
