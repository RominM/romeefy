<template>
  <nuxt-link :to="redirect" class="small-cards">
    <img :src="cover.src" :alt="cover.alt" :class="['small-cards__img', { rounded }]" />
    <h5 class="small-cards__label">{{ label }}</h5>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  cover: { type: Object as PropType<TPicture>, required: true },
  label: { type: String, required: true},
  redirect: { type: String, required: true },
  rounded: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
.small-cards {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  background-color: $dark-text-primary;
  border-radius: 4px;
  overflow: hidden;
  &__img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    &.rounded {
      border-radius: 50%;
      overflow: hidden;
    }
  }
  &__label {
    color: #fff;
    font-size: 13px;
    font-weight: 700;
  }
}
</style>