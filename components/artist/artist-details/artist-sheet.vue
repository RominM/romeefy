<template>
  <div class="artist-sheet">
    <section-bento padding-px="0">
      <img :src="album.cover_xl" />
    </section-bento>

    <div class="loaded-track" style="display: flex; flex-direction: column; color: #fff;">
      <nuxt-link :to="`/album/${album.id}`" class="loaded-track__title link">{{ album.title }}</nuxt-link>
      <nuxt-link :to="`/artist/${artist.id}`" class="loaded-track__name link">{{ artist.name }}</nuxt-link>
    </div>

    <artist-details :artist="artist" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  artist: { type: Object as PropType<IArtist>, required: true },
  album:{ type: Object as PropType<IAlbum>, required: true }
})
</script>

<style scoped lang="scss">
.artist-sheet {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .loaded-track {
    &__title {
      font-size: 18px;
      font-weight: 800;
    }
    &__name {
      font-size: 14px;
      font-weight: 400;
      color: $light-text-secondary;
    }
  }
  .link {
    text-decoration: underline transparent;
    transition: 0.2s;
    &:hover {
      text-decoration: underline #fff;
    }
  }
}


</style>