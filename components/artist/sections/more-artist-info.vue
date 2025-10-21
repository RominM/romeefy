<template>
  <section class="more-artist-info">
    <h2 class="more-artist-info__title">{{`Plus d'infos sur ${name}`}}</h2>
    <img class="more-artist-info__picture" :src="picture" :alt="`album ${name}`">
  </section>
</template>

<script setup lang="ts">
defineProps({
  picture: { type: String, required: true },
  name: { type: String, required: true }
})
</script>

<style scoped lang="scss">
.more-artist-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__title {
    color: #fff;
  }
  &__picture {
    height: 50vh;
    width: 70%;
    object-fit: cover;
    object-position: center 40%;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      transform: scale(1.02);
    }
  }
}

@media screen and (max-width: 870px) {
  .more-artist-info__picture {
    width: 100%;
  }
}
</style>