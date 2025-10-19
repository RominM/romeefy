<template>
  <div :class="['track-duration', { isHovered }]">
    <h-icon
      v-if="isDesktop"
      :icon="AddCircleIcon"
      class='track-duration--icons'
      title='Ajouter aux Titres Likés'
      size="22px"
    />
    <p v-if="isDesktop" class='track-duration__duration'>{{ durationDisplay }}</p>
    <h-icon 
      :class="!isDesktop ? 'isHovered' : 'track-duration--icons'"
      :icon="!isDesktop ? MoreVerticalIcon : MoreHorizontalIcon"
      title="Plus d'Option pour le Titre"
      size="20px"
    />
  </div>
</template>

<script setup lang="ts">
import { AddCircleIcon, MoreHorizontalIcon, MoreVerticalIcon } from '@hugeicons/core-free-icons';
import { useDevice } from '~/composables/device/useDevice';

const props = defineProps({
  duration: { type: Number, required: true },
  isHovered: { type: Boolean, default: false },
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
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  min-width: 120px;
  padding-right: 50px;
  &__duration {
    margin-left: 20px;
    cursor: default;
    user-select: none;
  }
  &--icons {
    opacity: 0;
  }
  &.isHovered{
    .track-duration--icons {
      opacity: 1;
    }
  }

}

@media screen and (max-width: 870px) {
  .track-duration {
    min-width: fit-content;
    padding-right: 0;
    &.--small-device {
      opacity: 1;
    }
  }
}
</style>