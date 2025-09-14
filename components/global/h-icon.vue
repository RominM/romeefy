<template>
  <HugeiconsIcon class='h-icon' :icon="icon" :style="{ color: color, width: size }"/>
</template>

<script setup lang='ts'>
import { HugeiconsIcon } from '@hugeicons/vue'
import type { IconSvgObject } from '~/types/type/icon';

defineProps({
  icon: { type: Object as PropType<IconSvgObject>, default: '' },
  color: { type: String, default: '#fff' },
  size: { type: String, default: '24px' }
})
</script>

<style lang='scss' scoped>

</style>