<template>
  <nuxt-link :to="item.redirect" class="search-result-item">
    <div>
      <nuxt-img class="search-result-item__pic" :src="item.picture.src" :alt="item.picture.alt" />
      <player-button :track-id="item.id"/>
    </div>
    <div>
      <h5>{{ item.label }}</h5>
      <p>{{ item.describe }}</p>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps({
  item: { type: Object as PropType<TSearchItem>, required: true}
})
</script>

<style scoped lang="scss">
.search-result-item {
}
</style>