<template>
  <HugeiconsIcon class='h-icon' :icon="icon" :style="{ color: color }"/>
</template>

<script setup lang='ts'>
import { HugeiconsIcon } from '@hugeicons/vue'
import type { IconSvgObject } from '~/types/type/icon';

defineProps({
  icon: { type: Object as PropType<IconSvgObject>, default: '' },
  color: {type: String, default: '#fff'}
})
</script>

<style lang='scss' scoped>
    .h-icon{}
</style>