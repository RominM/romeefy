<template>
  <div 
    :class="['artist-track', { isMobile }]" 
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="!variant ? togglePlay() : null"
  >
    <dynamic-index v-if="!variant" :index="index" :preview="track.preview" :hovered="isHovered" />
    <mini-album-cover v-if="showCover" :preview="track.preview" :variant="variant" :cover="cover" :hovered="isHovered" />
    <track-name :artist-name="track.artist.name" :artist-id="track.artist.id" :name="track.title" :is-explicit="track.explicit_lyrics" />
    <p v-if="isDesktop" class='artist-track__listen' :hidden="variant">{{ listenRandom }}</p>
    <track-duration :duration="track.duration" />
  </div>
</template>

<script setup lang='ts'>
import { useDevice } from '~/composables/device/useDevice';
import { playerStore } from '~/store/playerStore';

const props = defineProps({
  track: { type: Object as PropType<ITrack>, required: true },
  index: { type: Number, default: null },
  showCover: { type: Boolean, defautl: false },
  variant: { type: Boolean, defautl: false }
})

const { byTrackId } = playerStore()
const { isMobile, isDesktop } = useDevice()

const isHovered = ref<boolean>(false)

const cover = computed(() => {
  return {
    src: props.track.album.cover_small,
    alt: `album-${props.track.album.title}`
  }
})

const listenRandom = computed(() => {
  const generateNumber = Math.floor(Math.random() * (1_000_000_000 - 100_000 + 1)) + 1_000_000
  return new Intl.NumberFormat().format(generateNumber) 
})

function togglePlay() {
  byTrackId(props.track.id)
}
</script>

<style lang='scss' scoped>
.artist-track {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 53px;
  color: $light-text-primary;
  padding: 7px 15px;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  &.isMobile {
    gap: 5px;
    padding: 7px 0;
  }
  &__listen{
    width: 30%;
  }
  &:hover {
    background-color: rgba(66, 66, 66, 0.5);
  }
}
</style>