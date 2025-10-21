<template>
  <section class='section-card'>
    <div class="section-card__top">
      <h2-custom v-if="titleSection" :title="titleSection"/>
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

      <ul class='section-card__list-container__ul' :class="{flex}">
        <li v-for="(coverCard, index) in displayedCards" :key="`cover-card-${index}`" class='section-card__list-container__ul__li'>
            <cover-card 
            :cover-card="coverCard" 
            :source-redirect="redirectCard ? redirectCard : sourceRedirect" 
            :track-id="Number(coverCard.id)" :circular="circular"
            :flex="flex"  
          />
        </li>
      </ul>

      <!-- <div class='section-card__list-container__carousel-arrow'>
        <h-icon
          :icon="CircleArrowRight01Icon" 
          class='section-card__list-container__carousel-arrow--icon-right' 
          size="55px" 
          @click="scrollRight"
        />
      </div> -->
    </div>
  </section>
</template>

<script setup lang='ts'>
import type { PropType } from 'vue';

const props = defineProps({
  titleSection: { type: String, defaut: '' },
  coverCardList: { type: Array as PropType<TCoverCard[]>, required: true },
  sourceRedirect: { type: String, require: true },
  redirectCard: { type: String, default: '' },
  circular: { type: Boolean, default: false },
  flex: { type: Boolean, default: false },
})

const listRef = ref<HTMLElement | null>(null);

const showLimited = ref(true)

const displayedCards = computed(() => {
  return props.flex
    ? props.coverCardList.slice(0, 5)
    : props.coverCardList
})


function scrollRight() {
  if (!listRef.value) return;
  const container = listRef.value;
  const scrollAmount = container.clientWidth * 0.8;
  
  container.scrollBy({ left: scrollAmount, behavior: "smooth" });
}
</script>

<style lang='scss' scoped>
  .section-card {
    &__top {
      @include noSelect;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;
      color: #fff;
      &__title {
        font-weight: 700;
      }
      &__view-all {
        font-weight: 500;
        font-size: 14px;
        color: #ccc;
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
        &.flex {
          flex-direction: column;
        }
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

@media screen and (max-width: 870px) {
  .section-card__top__view-all {
    font-size: 10px;
  }
}
</style>