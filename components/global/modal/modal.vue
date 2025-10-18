<template>
  <div v-if="isOpen" class="modal" @click="close">
    <div 
      class="modal__dialog"
      :style="{ minWidth: minWidth, maxWidth: maxWidth}"
      @click.stop
    >
      <div class="modal__dialog--header">
        <h4>{{ title }}</h4>
        <h-icon 
          v-if="dismisable && showCross" 
          class="modal__dialog--header--cross" 
          :icon="MultiplicationSignIcon"
          @click="close"  
        />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MultiplicationSignIcon } from '@hugeicons/core-free-icons';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  showCross: { type: Boolean, default: false },
  dismisable: { type: Boolean, default: false },
  title: { type: String, default: '' },
  minWidth: { type: String, default: '50px' },
  maxWidth: { type: String, default: '80%' }
})

const emit = defineEmits(['update:isOpen'])

function close() {
  if(!props.dismisable) return
  emit('update:isOpen', false)
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  &__dialog {
    min-width: 50px;
    min-height: 50px;
    padding: 10px;
    border-radius: 8px;
    background-color: $dark-surface;
    &--header {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      color: #fff;
      &--cross {
        margin-left: auto;
      }
    }
  }
}
</style>