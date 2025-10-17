<template>
  <div class="cards-list-loader">
    <h2 class="cards-list-loader__title"></h2>
    <ul class='cards-list-loader__ul' >
      <li v-for="(_, index) in length" :key="`skeleton-${index}`" :class="['cards-list-loader__ul__li', { circular }]"></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps({
  length: { type: Number, default: 4 },
  circular: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
.cards-list-loader {
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
  width: 100%;

  &__title {
    @include skeleton;
    border-radius: 8px;
    height: 28px;
    width: 160px;
  }

  &__ul {
    display: flex;
    gap: 20px;
    padding: 0 20px;
    overflow: hidden;
    &__li {
      @include skeleton;
      border-radius: 12px;
      width: 170px;
      height: 170px;
      flex-shrink: 0;

      &.circular {
        border-radius: 50%;
      }
    }
  }
}
</style>