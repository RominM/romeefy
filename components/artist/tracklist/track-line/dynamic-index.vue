<template>
  <div :class="['dynamic-index', { '--hovered': hovered }]">
    <little-icon-play class='play-icon' :preview="preview" />
    <span class='track-index'>{{  index  }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  index: { type: Number, required: true },
  preview: { type: String, required: true },
  hovered: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
.dynamic-index {
  position: relative;
  width: 15px;
  height: 20px;
  &.--hovered {
    .play-icon {
      opacity: 1;
    }
    .track-index {
      opacity: 0;
    }
  }
  .play-icon,
  .track-index {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  }
  
  .play-icon {
    opacity: 0;
  }
  
  .track-index {
    opacity: 1;
  }
}

</style>