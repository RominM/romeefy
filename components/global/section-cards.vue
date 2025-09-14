<template>
    <section class='section-card'>
      <h2>{{ titleSection }}</h2>
      <ul class='section-card__ul'>
        <li v-for="(coverCard, index) in coverCardList" :key="`cover-card-${index}`" class='section-card__ul__li'>
          <cover-card :cover-card="coverCard" :source-redirect="sourceRedirect" />
        </li>
      </ul>
    </section>
</template>

<script setup lang='ts'>
import type { PropType } from 'vue';

defineProps({
  titleSection: { type: String, defaut: '' },
  coverCardList: { type: Array as PropType<TCoverCard[] | null>, required: true },
  sourceRedirect: { type: String, require: true }
})
</script>

<style lang='scss' scoped>
  .section-card{
    &__ul {
      display: flex;
    }
  }
</style>