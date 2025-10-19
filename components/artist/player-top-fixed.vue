<template>
  <div class="play-top-fixed" :style="{ backgroundColor: color }">
    <div v-if="isDesktop" :class="['play-top-fixed__content', isVisible ? '--is-visible':'']">
      <player-button :track-id="trackId"/>
      <h2 class="play-top-fixed__content__name">{{ name }}</h2>
    </div>

    <div v-else class="play-top-fixed__content --is-visible">
      <go-back class="play-top-fixed__content--back" />
      <h2 :class="['play-top-fixed__content__name',  isVisible ? '--is-visible':'']">{{ name }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDevice } from '~/composables/device/useDevice'


const props = defineProps({
  color: { type: String, required: true },
  scrollTop: { type: Number, required: true },
  name: { type: String, required: true },
  trackId: { type: Number, required: true }
})

const { isDesktop } = useDevice()

const isVisible = computed(() => {
  const fortyVhInPixels = isDesktop.value ? window.innerHeight * 0.4 : window.innerHeight * 0.2 
  return props.scrollTop >= fortyVhInPixels
})
</script>

<style lang="scss" scoped>
.play-top-fixed {
  position: sticky;
  top: 0;
  padding: 10px 20px;
  width: 100%;
  z-index: 15;
  filter: brightness(70%);

  &__content{
    display: flex; 
    align-items: center;
    gap: 12px;
    opacity: 0;
    transition: 0.5s;
    &.--is-visible{
      opacity: 1;
    }
    &__name {
      color: #fff;
    }
  }
}

@media screen and (max-width: 870px) {
  .play-top-fixed {
    padding: 10px;
    background-color: #0000001f;
    &__content {
      margin-top: 10px;
      &--back {
        position: absolute;
        left: 5px;
        bottom: 5px;
      }
      &__name {
        margin: auto;
        font-size: 14px;
        opacity: 0;
        transition: 0.5s;
        &.--is-visible{
          opacity: 1;
        }
      }
    }
  }
}
</style>