<template>
  <button :class="['button-cta', variant]">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { EVariant } from '~/types/enum/global/button';

defineProps({
  label: { type: String, default: '' },
  variant: { type: String as PropType<EVariant>, default: EVariant.NEUTRAL } 
})
</script>

<style scoped lang="scss">
@mixin baseMainButton {
  border: solid $light-text-primary 1px;
  border-radius: 18px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 600;
  width: fit-content;
}

.button-cta {
  &.solid {
    @include baseMainButton();
    color: $dark-text-primary;
    background-color: $light-background;
  }
  &.neutral {
    @include baseMainButton();
    color: $light-text-primary;
    background-color: transparent;
  }
}
</style>