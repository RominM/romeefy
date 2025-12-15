<template>
  <section class="section-small-cards">
    <small-cards
      v-for="(card, index) in formattedCards"
      :key="index"
      :cover="card.picture"
      :label="card.label"
      :redirect="card.redirect"
      rounded
    />
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  cardsList: { type: Array }
})

const formattedCards = computed(() =>
  props.cardsList.map(card => ({
    picture: { src: card.coverMedium, alt: card.alt },
    label: card.title,
    redirect: `/${card.type}/${card.id}`
  }))
)
</script>

<style scoped lang="scss">
.section-small-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  padding-right: 20px;
  > :last-child {
    display: none;
  }
}

@container centerPanel (max-width: 680px) {
  .section-small-cards {
    grid-template-columns: repeat(2, 1fr);
    > :last-child {
      display: flex;
    }
  }
}
</style>