<template>
  <div class="crate-playlist-button">
    <div class="crate-playlist-button__wrapper-icon">
      <h-icon 
        class="crate-playlist-button__wrapper-icon__icon" 
        :icon="playlistButton.icon" 
        size="22" 
      />
    </div>

    <div>
      <p class="crate-playlist-button__title">{{ playlistButton.title }}</p>
      <p class="crate-playlist-button__subtitle">{{ playlistButton.subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  playlistButton: { type: Object as PropType<TPlaylistButton>, required: true} 
})
</script>

<style scoped lang="scss">
.crate-playlist-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  &__wrapper-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: $dark-surface-secondary;
    border-radius: 50%;
    &__icon{
      transition: 0.3s;
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
  }

  &__subtitle {
    font-size: 12px;
    font-weight: 300;
  }

  &:hover {
    background-color: $dark-surface-secondary;
    .crate-playlist-button__wrapper-icon__icon {
      transform: rotate(15deg) scale(1.1);
      color: $primary !important;
      transition: 0.3s ease;
    }
  }
}
</style>