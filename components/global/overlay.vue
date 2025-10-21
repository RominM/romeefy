<template>
  <div :class="['overlay mask', { '--is-open': isOpenOverlay }]">
    <div class="content" >
      <div class="content__top" @click="closeOverlay" >
        <h-icon :icon="ArrowDown01Icon" color="#fff" />
        <p>{{ title }}</p>
        <h-icon :icon="MoreVerticalIcon" color="#fff" @click="emit('more')" />
      </div>
      
      <slot />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown01Icon, MoreVerticalIcon } from '@hugeicons/core-free-icons';
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits([ 'update:isOpenOverlay','more'])
const props = defineProps({
  isOpenOverlay:{ type: Boolean, default: false },
  title:{ type: String, default: '' },
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
    width: 100%;
    height: 100vh;
    padding: 30px;
    text-align: center;
    opacity: 0;

    transform: translateY(100%);
    transition: transform 0.5s ease, opacity 0.5s ease;

    z-index: 99;
    overflow: auto;
    &__top {
      position: absolute;
      inset: 0;
      height: 70px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      background-color: transparent;
      z-index: 99999;
    }
  }

  &.--is-open {
    // max-height: 100dvh;
    pointer-events: auto;
    .content {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

</style>
