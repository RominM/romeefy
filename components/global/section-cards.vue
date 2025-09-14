<template>
  <section class='section-card'>
    <div class="section-card__top">
      <h2 class="section-card__top__title">{{ titleSection }}</h2>
      <nuxt-link :to="sourceRedirect" class="section-card__top__view-all">Tout afficher</nuxt-link>
    </div>

    <div class='section-card__list-container' ref="listRef">
      <!-- <div class='section-card__list-container__carousel-arrow'>
        <h-icon
          :icon="CircleArrowLeft01Icon" 
          class='section-card__list-container__carousel-arrow--icon-left' 
          size="55px" 
          @click="scrollLeft"
        />
      </div> -->

      <ul class='section-card__list-container__ul' >
        <li v-for="(coverCard, index) in coverCardList" :key="`cover-card-${index}`" class='section-card__list-container__ul__li'>
          <cover-card :cover-card="coverCard" :source-redirect="sourceRedirect" :track-id="coverCard.id" />
        </li>
      </ul>

      <div class='section-card__list-container__carousel-arrow'>
        <h-icon
          :icon="CircleArrowRight01Icon" 
          class='section-card__list-container__carousel-arrow--icon-right' 
          size="55px" 
          @click="scrollRight"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { CircleArrowLeft01Icon, CircleArrowRight01Icon } from '@hugeicons/core-free-icons';
import type { PropType } from 'vue';

defineProps({
  titleSection: { type: String, defaut: '' },
  coverCardList: { type: Array as PropType<TCoverCard[] | null>, required: true },
  sourceRedirect: { type: String, require: true }
})

const listRef = ref<HTMLElement | null>(null);

function scrollRight() {
  if (!listRef.value) return;
  const container = listRef.value;
  const scrollAmount = container.clientWidth * 0.8;
  console.log({scrollAmount});
  
  container.scrollBy({ left: scrollAmount, behavior: "smooth" });
}
</script>

<style lang='scss' scoped>
  .section-card{
    &__top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      color: $light-text-primary;
      @include noSelect;
      &__title {
        font-weight: 700;
      }
      &__view-all {
        font-weight: 500;
        font-size: 14px;
        text-decoration: underline transparent;
        transition: 0.3s;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__list-container{
      display: flex;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      &__ul {
        display: flex;
        min-width: 0;
      }
      &__carousel-arrow {
        display: flex;
        align-items: center;
        opacity: 0;
        z-index: 1;
        transition: 0.3s;
        &--icon-right{
          border-radius: 50%;
          padding: -3px;
          // background-color: $dark-background;
          color: $dark-text-primary;
          &:hover {
            color: $light-background;
          }
        }
      }
      &:hover .section-card__list-container__carousel-arrow {
        opacity: 1;
      }
    }
  }
</style>