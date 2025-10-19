<template>
  <HugeiconsIcon class='h-icon' :icon="icon" :style="{ color: color, width: size, minWidth: size }" :title="title" />
</template>

<script setup lang='ts'>
import { HugeiconsIcon } from '@hugeicons/vue';
import type { IconSvgObject } from '~/types/type/icon';

const props = defineProps({
  icon: { type: Object as PropType<IconSvgObject>, default: '' },
  color: { type: String, default: '#ccc' },
  size: { type: String, default: '24px' },
  title: { type: String, default: '' }
})
</script>

<style lang='scss' scoped>
.h-icon {
  cursor: pointer;
  transform: 0.3s;
  &:hover {
    transform: scale(1.08);
  }
}
</style>