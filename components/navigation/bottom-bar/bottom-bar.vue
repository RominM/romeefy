<template>
  <div class="bottom-bar">
    <bottom-player @open-overlay="isOpen = true" />
    <navigation-list @action-nav="$emit('action-nav', $event)" />

    <overlay v-if="currentArtist" v-model:is-open-overlay="isOpen" :main-color="getColor" :title="currentArtist.name">
      <current-track-overlay 
        v-if="trackData" 
        :track="trackData" 
        :artist="currentArtist" 
        :main-color="getColor"
        :contributors="constributors"
        @close-overlay="isOpen = false"
      />
    </overlay>
  </div>
</template>

<script setup lang="ts">
import { playerStore } from '~/store/playerStore';

const {currentArtist, getColor, trackData} = storeToRefs(playerStore())
console.log({trackData: trackData.value});

const constributors = computed(() => trackData.value?.contributors)
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