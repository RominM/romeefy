<template>
  <div class="play-top-fixed" :style="{ backgroundColor: color }">
    <div :class="['play-top-fixed__content', scrollTop >= 400 ? '--is-visible':'']">
      <player-button />
      <h2 class="play-top-fixed__content__name">{{ name }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  color: { type: String, required: true },
  scrollTop: { type: Number, required: true },
  name: { type: String, required: true },
})

</script>

<style lang="scss" scoped>
.play-top-fixed {
  position: sticky;
  top: 0;
  padding: 10px 20px;
  width: 100%;
  z-index: 15;
  filter: brightness(80%);

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
</style>