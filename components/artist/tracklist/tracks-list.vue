<template>
  <ul class='track-list'>
    <li 
      v-for="(track, index) in visibleTracks" 
      :key="`track-${index}`" 
      class='track-list__el'
    >
      <artist-track :track="track" :index="index + 1"/>
    </li>
  </ul>

  <button v-if="trackList.length > defaultLimit" @click="toggleLimit" class="toggle-btn">
    {{ showAll ? 'Afficher moins' : 'Afficher plus' }}
  </button>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'

const props = defineProps({
  trackList: { type: Array, required: true }
})

const defaultLimit = 5
const showAll = ref<boolean>(false)

const visibleTracks = computed(() => {
  return showAll.value ? props.trackList : props.trackList.slice(0, defaultLimit)
})

function toggleLimit() {
  showAll.value = !showAll.value
}
</script>

<style scoped lang='scss'>
.track-list {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__el {
    &__bullet {
      color: #fff;
    }
  }
}

.toggle-btn {
width: fit-content;
color: $light-background;
font-size: 12px;
font-weight: 700;
margin-left: 20px; 
cursor: pointer;
}
</style>
