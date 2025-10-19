<template>
  <div class="track-duration">
    <h-icon v-if="isDesktop"  class='artist-track__duration--icons' :icon="AddCircleIcon" size="22px" />
    <p v-if="isDesktop" class='artist-track__duration__duration-track'>{{ durationDisplay }}</p>
    <h-icon class='artist-track__duration--icons' :icon="!isDesktop ? MoreVerticalIcon : MoreHorizontalIcon" size="20px" />
  </div>
</template>

<script setup lang="ts">
import { AddCircleIcon, MoreHorizontalIcon, MoreVerticalIcon } from '@hugeicons/core-free-icons';
import { useDevice } from '~/composables/device/useDevice';

const props = defineProps({
  duration: { type: Number, required: true }
})

const { isDesktop } = useDevice()

const durationDisplay = computed(() => {
  const trackDuration = props.duration
  const minutes = Math.floor(trackDuration / 60)
  const remainingSeconds = trackDuration % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
})
</script>

<style scoped lang="scss">
.track-duration {
  display: flex;
  align-items: center;
  gap: 20px;
  width: auto;
  &__duration-track {
    margin-left: 20px;
  }
  &--icons {
    opacity: 0;
    transition: 0.3s;
  }
}
</style>