<template>
  <nuxt-link :to="item.redirect" class="search-result-item">
    <img class="search-result-item__pic" :src="item.picture.src" :alt="item.picture.alt" />

    <div class="search-result-item__text">
      <h5 class="label">{{ item.label }}</h5>
      <p>{{ item.describe }}</p>
    </div>

    <h-icon class="search-result-item__delete" :icon="MultiplicationSignIcon" />
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
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  transition: background-color 0.3s;
  overflow: hidden;
  color: #fff;
  text-decoration: none;

  &:hover {
    background-color: $dark-surface-secondary;
  }

  &__pic {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__text {
    flex: 1;
    min-width: 0; // indispensable pour que text-overflow fonctionne !
    overflow: hidden;

    .label {
      display: block;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 0.8;
      font-size: 0.85rem;
    }
  }

  &__delete {
    flex-shrink: 0;
    margin-left: auto;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
}

</style>