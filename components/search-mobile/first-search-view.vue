<template>
  <div class="first-search-view">
    <header>
      <div class="first-search-view__header">
        <h-icon :icon="UserCircle02Icon"/>
        <h1 class="first-search-view__header__title">Rechercher</h1>
      </div>
    </header>
    
    <fake-search-target class="first-search-view__target" @click="$emit('change-view')" />

    <start-search-navigation :cards="cardsMain" title="Commencer la navigation" />
    <start-search-navigation :cards="cardsAll" title="Parourir tout" /> 
  </div>
</template>

<script setup lang="ts">
import { UserCircle02Icon } from '@hugeicons/core-free-icons';

const picture = new URL('@/assets/237-250x250.jpg', import.meta.url).href



const cardsMain: TSearchCard[] = [
  {
    title: 'musique',
    picture: picture,
    color: '#E4007F',
    redirect: 'search/music',
    small: true
  },
  {
    title: 'prodcats',
    picture: picture,
    color: '#657E1A',
    redirect: 'search/podcast',
    small: true
  },
  {
    title: 'livre audio',
    picture: picture,
    color: '#0A1D4D',
    redirect: 'search/book',
    small: true
  },
  {
    title: 'événements live',
    picture: picture,
    color: '#6D557A',
    redirect: 'search/event',
    small: true
  }
]

const cardsAll: TSearchCard[] = [
  { title: 'rock', picture: picture, color: '#FF5733', redirect: 'search/rock', small: false },
  { title: 'pop', picture: picture, color: '#C70039', redirect: 'search/pop', small: false },
  { title: 'punk', picture: picture, color: '#900C3F', redirect: 'search/punk', small: false },
  { title: 'metal', picture: picture, color: '#581845', redirect: 'search/metal', small: false },
  { title: 'country', picture: picture, color: '#FF8D1A', redirect: 'search/country', small: false },
  { title: 'rap', picture: picture, color: '#FFC300', redirect: 'search/rap', small: false },
  { title: 'rnb', picture: picture, color: '#DAF7A6', redirect: 'search/rnb', small: false },
  { title: 'folk', picture: picture, color: '#33FF57', redirect: 'search/folk', small: false },
  { title: 'jazz', picture: picture, color: '#3380FF', redirect: 'search/jazz', small: false },
  { title: 'k-pop', picture: picture, color: '#FF33A6', redirect: 'search/kpop', small: false },
  { title: 'électronique', picture: picture, color: '#8C33FF', redirect: 'search/electronic', small: false },
  { title: 'classique', picture: picture, color: '#33FFF5', redirect: 'search/classical', small: false },
  { title: 'blues', picture: picture, color: '#335BFF', redirect: 'search/blues', small: false },
  { title: 'reggae', picture: picture, color: '#33FF99', redirect: 'search/reggae', small: false },
  { title: 'latin', picture: picture, color: '#FF9933', redirect: 'search/latin', small: false },
  { title: 'ambient', picture: picture, color: '#99FF33', redirect: 'search/ambient', small: false },
  { title: 'sleep', picture: picture, color: '#FF3366', redirect: 'search/sleep', small: false },
  { title: 'study', picture: picture, color: '#3366FF', redirect: 'search/study', small: false },
  { title: 'focus', picture: picture, color: '#33FFCC', redirect: 'search/focus', small: false },
  { title: 'cuisine', picture: picture, color: '#FF6633', redirect: 'search/cuisine', small: false },
  { title: 'restaurant', picture: picture, color: '#FF33CC', redirect: 'search/restaurant', small: false },
  { title: 'sport', picture: picture, color: '#33CCFF', redirect: 'search/sport', small: false },
  { title: 'fitness', picture: picture, color: '#66FF33', redirect: 'search/fitness', small: false },
  { title: 'yoga', picture: picture, color: '#FF9966', redirect: 'search/yoga', small: false },
  { title: 'meditation', picture: picture, color: '#CC33FF', redirect: 'search/meditation', small: false },
  { title: 'gaming', picture: picture, color: '#3399FF', redirect: 'search/gaming', small: false },
  { title: 'anime', picture: picture, color: '#FF3399', redirect: 'search/anime', small: false },
  { title: 'science', picture: picture, color: '#33FF66', redirect: 'search/science', small: false },
  { title: 'histoire', picture: picture, color: '#FF6633', redirect: 'search/history', small: false },
  { title: 'technologie', picture: picture, color: '#9966FF', redirect: 'search/technology', small: false },
  { title: 'art', picture: picture, color: '#33FF99', redirect: 'search/art', small: false },
  { title: 'cinéma', picture: picture, color: '#FF3366', redirect: 'search/cinema', small: false },
  { title: 'séries', picture: picture, color: '#3366FF', redirect: 'search/series', small: false },
  { title: 'livres', picture: picture, color: '#FF9933', redirect: 'search/books', small: false },
  { title: 'bd', picture: picture, color: '#33FFCC', redirect: 'search/comics', small: false },
  { title: 'podcast', picture: picture, color: '#CC33FF', redirect: 'search/podcast', small: false },
  { title: 'actualité', picture: picture, color: '#FF33CC', redirect: 'search/news', small: false },
  { title: 'politique', picture: picture, color: '#33CCFF', redirect: 'search/politics', small: false },
  { title: 'voyage', picture: picture, color: '#66FF33', redirect: 'search/travel', small: false },
  { title: 'nature', picture: picture, color: '#FF9966', redirect: 'search/nature', small: false },
  { title: 'animaux', picture: picture, color: '#3399FF', redirect: 'search/animals', small: false },
  { title: 'technologie', picture: picture, color: '#FF3399', redirect: 'search/tech', small: false },
  { title: 'mode', picture: picture, color: '#33FF66', redirect: 'search/fashion', small: false },
  { title: 'beauté', picture: picture, color: '#FF6633', redirect: 'search/beauty', small: false },
  { title: 'diy', picture: picture, color: '#CC33FF', redirect: 'search/diy', small: false },
  { title: 'photographie', picture: picture, color: '#33CCFF', redirect: 'search/photography', small: false },
  { title: 'design', picture: picture, color: '#FF33CC', redirect: 'search/design', small: false },
  { title: 'architecture', picture: picture, color: '#66FF33', redirect: 'search/architecture', small: false },
  { title: 'gaming', picture: picture, color: '#FF9966', redirect: 'search/gaming', small: false },
  { title: 'esport', picture: picture, color: '#3399FF', redirect: 'search/esport', small: false },
  { title: 'programming', picture: picture, color: '#FF33A6', redirect: 'search/programming', small: false },
  { title: 'finance', picture: picture, color: '#8C33FF', redirect: 'search/finance', small: false },
  { title: 'business', picture: picture, color: '#33FFF5', redirect: 'search/business', small: false },
  { title: 'marketing', picture: picture, color: '#FF5733', redirect: 'search/marketing', small: false },
  { title: 'productivité', picture: picture, color: '#C70039', redirect: 'search/productivity', small: false },
  { title: 'éducation', picture: picture, color: '#900C3F', redirect: 'search/education', small: false },
  { title: 'développement personnel', picture: picture, color: '#581845', redirect: 'search/selfdev', small: false },
  { title: 'cuisine du monde', picture: picture, color: '#FF8D1A', redirect: 'search/worldcuisine', small: false },
  { title: 'cocktails', picture: picture, color: '#FFC300', redirect: 'search/cocktails', small: false },
  { title: 'fitness training', picture: picture, color: '#DAF7A6', redirect: 'search/fitnesstraining', small: false },
  { title: 'yoga & méditation', picture: picture, color: '#33FF57', redirect: 'search/yoga-meditation', small: false },
  { title: 'dormir', picture: picture, color: '#3380FF', redirect: 'search/sleep', small: false },
  { title: 'focus', picture: picture, color: '#FF33A6', redirect: 'search/focus', small: false },
  { title: 'loisirs', picture: picture, color: '#8C33FF', redirect: 'search/leisure', small: false },
  { title: 'événements', picture: picture, color: '#33FFF5', redirect: 'search/events', small: false },
  { title: 'festival', picture: picture, color: '#FF5733', redirect: 'search/festival', small: false },
  { title: 'karaoké', picture: picture, color: '#C70039', redirect: 'search/karaoke', small: false },
  { title: 'théâtre', picture: picture, color: '#900C3F', redirect: 'search/theatre', small: false },
  { title: 'cinéma indépendant', picture: picture, color: '#581845', redirect: 'search/indie-cinema', small: false },
]
</script>

<style scoped lang="scss">
.first-search-view {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: $dark-surface;
  padding: 15px;
  height: 100%;
  overflow: auto;
  &__header {
    display: flex;
    gap: 10px;
    &__title {
      font-size: 20px;
      color: #fff;
    }
  }

  &__target {
    position: sticky;
    top: 0;
    z-index: 9;
  }
}
</style>