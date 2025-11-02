<template>
  <div class="artist-details">
    <section-bento padding-px="0" @click="isOpenArtistModal = true">
      <div class="artist-details__picture">
        <h4 class="artist-details__picture__title">À propos de l'artiste</h4>
        <img :src="artist.picture_xl" />
      </div>

      <div class="artist-details__short-describe">
        <nuxt-link :to="`/artist/${artist.id}`" class="artist-details__short-describe__name link">{{ artist.name }}</nuxt-link>
        <p class="text">1 275 834 auditeurs mensuels</p>
        <p class="artist-description text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, repellat amet ad corrupti ullam ab assumenda nostrum in, architecto voluptatum reprehenderit ipsum asperiores nobis rerum aliquam aspernatur tenetur commodi alias.</p>
      </div>
    </section-bento>
    
    <modal v-model:is-open="isOpenArtistModal" max-width="50vw" dismisable show-cross>
      <artist-details-modal-content :artist="artist" />
    </modal>
  </div>
</template>

<script setup lang="ts">
defineProps({
  artist: { type: Object as PropType<IArtist>, required: true}
})

const isOpenArtistModal = ref<boolean>(false)
</script>

<style scoped lang="scss">
.artist-details {
  position: relative;
  cursor: pointer;
  &__picture {
    position: relative;
    &__title {
      position: absolute;
      padding: 5px;
      z-index: 1;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 50px 10px #000;
    }
  }

  &__short-describe {
    padding: 12px;
    &__name {
      font-weight: 700;
    }

    .text {
      font-size: 14px;
      color: $light-text-secondary;
      line-height: 1.2rem;
      margin: 7px 0;
    }

    .artist-description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>