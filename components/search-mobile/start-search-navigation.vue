<template>
  <div class="start-search-navigation">
    <h2-custom :title="title" />
    
    <div class="start-search-navigation__grid">
      <navigation-card 
        v-for="(card, index) in cards" 
        :key="index" 
        :title="card.title" 
        :picture="card.picture"
        :color="card.color"
        :redirect="card.redirect"
        :small="card.small"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  cards: { Array, required: true },
  title: {type: String, default: '' }
})
</script>

<style scoped lang="scss">
.start-search-navigation {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }
}
</style>