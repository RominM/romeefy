<template>
  <div class="bottom-bar">
    <bottom-player @click="isOpen = true" />
    <navigation-list @action-nav="$emit('action-nav', $event)" />

    <overlay v-if="currentArtist" v-model:is-open-overlay="isOpen" :main-color="getColor" :title="currentArtist.name">
      <current-track-overlay v-if="trackData" :current-track="trackData" :main-color="getColor"/>
    </overlay>
  </div>
</template>

<script setup lang="ts">
import { playerStore } from '~/store/playerStore';

const {currentArtist, getColor, trackData} = storeToRefs(playerStore())

const isOpen = ref<boolean>(false)

</script>

<style scoped lang="scss">
.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>