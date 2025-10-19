<template>
  <div :class="['mini-album-cover', { '--hovered': variant && hovered }]">
    <img class='mini-album-cover__album-cover' :src="cover.src" :alt="cover.alt" >
    <little-icon-play v-if="variant" class='mini-album-cover--icon' :preview="preview" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  preview: { type: String, required: true },
  variant: { type: Boolean, defautl: false },
  cover: { type: Object as PropType<TPicture>, required: true },
  hovered: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
.mini-album-cover {
  position: relative;
  min-width: 45px;
  height: 45px;
  border-radius: 5px;
  overflow: hidden;
  &__album-cover {
    width: 100%;
    height: 100%;
    transition: 0.3s;
  }
  
  &--icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.3s;
    opacity: 0;
  }

  &.--hovered .mini-album-cover {
    &__album-cover {
      filter: brightness(0.4);
    }
    &--icon {
      opacity: 1;
    }
  }
}
</style>