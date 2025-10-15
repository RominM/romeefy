<template>
  <div class="best-result">
    <h2>Meilleur résultat</h2>

    <playing-card :track-id="bestResult.trackId" :redirect="`${bestResult.type}/${bestResult.id}`">
        <img class="best-result__card__picture" :src="bestResult.picture" :alt="`picture of ${bestResult.name}`">
        <h1 class="best-result__card__name">{{ bestResult.name }}</h1>
        <p class="best-result__card__type">{{ bestResult.type }}</p>
    </playing-card>
  </div>
</template>

<script setup lang="ts">
type TBestResult = {
  id: number,
  name: string,
  type: string,
  picture: string,
  trackId: number
}


const props = defineProps({
  bestResult: { type: Object as PropType<TBestResult>, required: true }
})

watch(
  () => props.bestResult,
  () => {
    console.log(props.bestResult);
})
</script>

<style scoped lang="scss">
.best-result {
  color: $light-text-primary;
  &__card {
    display: block;
    width: 100%;
    background-color: $dark-surface;
    padding: 20px;
    transition: 0.3s;
    &__picture {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    &__type {
      color: $light-text-secondary;
    }
    &:hover {
      background-color: $dark-surface-tercary;      
    }
  }
}
</style>