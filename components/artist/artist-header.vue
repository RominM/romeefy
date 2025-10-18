<template>
  <header class='artist-header'>
    <p v-if="!isTablet" hidden class='artist-header__is-verified'>
      <h-icon :icon="CheckmarkBadge01Icon" color="#3B82F6"/>
      Artiste vérifié
    </p>
    <h1 class='artist-header__name'>{{ artist.name }}</h1>
    <p v-if="!isTablet">{{ numFan }} auditeurs mensuels</p>
  </header>
</template>

<script setup lang="ts">
import { CheckmarkBadge01Icon } from '@hugeicons/core-free-icons';
import { useDevice } from '~/composables/device/useDevice';

const props = defineProps({
  artist: { type: Object, required: true },
})

const { isTablet } = useDevice()

const numFan = computed(() => new Intl.NumberFormat().format(props.artist.nb_fan))
</script>

<style scoped lang="scss">
.artist-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: calc(40vh - 20px);
  padding: 0 20px 20px;
  color: #fff;

  &__is-verified {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__name {
    font-size: clamp(2em, 5vw, 85px);
    font-weight: 700;
    white-space: nowrap;
    transition: font-size 0.2s ease;
  }
}
</style>
