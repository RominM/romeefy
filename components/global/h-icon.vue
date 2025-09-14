<template>
  <HugeiconsIcon class='h-icon' :icon="icon" :style="{ color: color, width: size }" :title="title"/>
</template>

<script setup lang='ts'>
import { HugeiconsIcon } from '@hugeicons/vue'
import type { IconSvgObject } from '~/types/type/icon';

defineProps({
  icon: { type: Object as PropType<IconSvgObject>, default: '' },
  color: { type: String, default: '#ccc' },
  size: { type: String, default: '24px' },
  title: { type: String, default: '#ccc' }
})
</script>

<style lang='scss' scoped>
.h-icon {
  cursor: pointer;
}
</style>