<template>
  <section class="section-small-cards">
    <div class="section-small-cards__column">
      <small-cards v-for="(card, index) in firstColumn" :key="index" :cover="card.picture" :label="card.label" :redirect="card.redirect"/>
    </div>
    <div class="section-small-cards__column">
      <small-cards v-for="(card, index) in secondColumn" :key="index" :cover="card.picture" :label="card.label" :redirect="card.redirect"/>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
    cardsList: { type: Array }
})

console.log(props.cardsList);
const formattedCards = computed(() => {
  return props.cardsList.map(card => ({
    picture: {src: card.coverMedium, alt: card.alt},
    label: card.title,
    redirect: `/${card.type}/${card.id}`
  }));
});

// Découpage en deux colonnes de 4 éléments maximum
const firstColumn = computed(() => formattedCards.value.slice(0, 4));
const secondColumn = computed(() => formattedCards.value.slice(4, 8));

</script>

<style scoped lang="scss">
.section-small-cards {
  display: flex;
  gap: 7px;
  padding-right: 20px;
  &__column {
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: 100%;
  }
}
</style>