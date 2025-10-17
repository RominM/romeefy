<template>
  <nuxt-link :to="item.redirect" class="search-result-item">
    <div>
      <img class="search-result-item__pic" :src="item.picture.src" :alt="item.picture.alt" />
      <!-- <player-button :track-id="item.id"/> -->
    </div>
    <div>
      <h5>{{ item.label }}</h5>
      <p>{{ item.describe }}</p>
    </div>
    <h-icon class="search-result-item__delete" :icon="MultiplicationSignIcon"/>
  </nuxt-link>
</template>

<script setup lang="ts">
import { MultiplicationSignIcon } from '@hugeicons/core-free-icons';

const props = defineProps({
  item: { type: Object as PropType<TSearchItem>, required: true}
})
</script>

<style scoped lang="scss">
.search-result-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 5px;
  transition: 0.3s;
  &__pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &__delete {
    margin-left: auto;
  }
  &:hover {
    background-color: $dark-surface-secondary;
  }
}
</style>