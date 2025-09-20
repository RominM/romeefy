<template>
  <header class='artist-header'>
    <p class='artist-header__is-verified'>
      <h-icon :icon="CheckmarkBadge01Icon" color="#3B82F6"/>
      Artiste vérifié
    </p>
    <h1 class='artist-header__name'>{{ artist.name }}</h1>
    <p>{{ numFan}} auditeurs mensuels</p>
  </header>
</template>

<script setup lang='ts'>
import { CheckmarkBadge01Icon } from '@hugeicons/core-free-icons';

const props = defineProps({
  artist: { type: Object, required: true },
})

const numFan = computed(() => new Intl.NumberFormat().format(props.artist.nb_fan))
</script>

<style lang='scss' scoped>
.artist-header{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: calc(40vh - 20px);
  padding: 0 20px 20px ;
  color: #fff;
  z-index: 1;
  &__is-verified {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  &__name {
    font-size: 80px;
    font-weight: 800;
  }
}
</style>