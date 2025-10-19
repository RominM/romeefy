<template>
  <ul class="track-list" :class="showAll || !showCover ? '--show-all' : ''">
    <li 
      v-for="(track, index) in visibleTracks" 
      :key="`track-${index}`" 
      class='track-list__el'
    >
      <track-line :track="track" :index="index + 1" :show-cover="showCover" :variant="variant"/>
    </li>
  </ul>

  <button v-if="!viewAll && trackList.length > defaultLimit" @click="toggleLimit" class="toggle-btn">
    {{ showAll ? 'Afficher moins' : 'Afficher plus' }}
  </button>
</template>

<script setup lang='ts'>

const props = defineProps({
  trackList: { type: Array as PropType<ITrack[]>, required: true },
  viewAll: { type: Boolean, defautl: false },
  showCover: { type: Boolean, defautl: false },
  variant: { type: Boolean, defautl: false }
})

const defaultLimit = 5
const showAll = ref<boolean>(false)

const visibleTracks = computed(() => {
  if(props.viewAll) return props.trackList
  return showAll.value ? props.trackList : props.trackList.slice(0, defaultLimit)
})

function toggleLimit() {
  showAll.value = !showAll.value
}
</script>

<style scoped lang='scss'>
.track-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 99;
  .isMobile {
    gap: 10px;
  }

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

@media screen and (max-width: 870px) {
  .track-list {
    position: relative;
    &::after {
      position: absolute;
      bottom: 0;
      content: '';
      height: 0;
      width: 100%;
      box-shadow: 0 -1px 15px 20px #100f0f;
    }
    &.--show-all {
      &::after {
        display: none;
      }
    }
  }
  .toggle-btn {
    margin: auto;
    padding: 3px 10px;
    border: solid #fff 1px;
    border-radius: 12px;
    z-index: 999;
  }
}
</style>
