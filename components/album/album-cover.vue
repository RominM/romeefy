<template>
  <div class="album-cover">
    <img v-if="album.cover_big" class='album-cover__cover' :src="album.cover_big" :alt="`couverture de l'album ${album.title}`" @click="isOpen = true">
    <h-icon v-else :icon="Vynil01Icon" size="200px" color="grey"/>
    <div class="album-cover__content">
      <p v-if="isDesktop" class="album-cover__content__type">{{ album.record_type }}</p>
      
      <h1 class="album-cover__content__title">{{ album.title }}</h1>

      <div v-if="album.artist" class="album-cover__content__artist">
        <img class="album-cover__content__artist__picture" :src="album.artist.picture_small" :alt="`image de profil de ${album.artist.name}`">
        <p v-if="!isAvailable">Sortie : {{ formatFrenchDate(new Date(album.release_date)) }}</p>
        <nuxt-link v-else :to="`/artist/${album.artist.id}`" class="album-cover__content__artist__name">{{ album.artist.name }}</nuxt-link>
        <p v-if="isDesktop && isAvailable" class="album-cover__content__artist--album-data">{{ album.tracks.data.length }} titres, {{useFormatTime(album.duration, true)}}</p>
      </div>

      <release-counter v-if="!isAvailable" :release-date="new Date(album.release_date)" />
    </div>

    <modal v-model:is-open="isOpen" dismisable>
      <img class='album-cover__cover--modal' :src="album.cover_big" :alt="`couverture de l'album ${album.title}`">
    </modal>
  </div>
</template>

<script setup lang="ts">
import { Vynil01Icon } from '@hugeicons/core-free-icons';
import { useDevice } from '~/composables/device/useDevice';
import { useFormatTime } from '~/composables/formats/useFormatTime';

const props = defineProps({
  album: { type: Object as PropType<IAlbum>, required: true}
})


const isAvailable = new Date(props.album.release_date) <= new Date()
console.log({ isAvailable: new Date(props.album.release_date) });
function formatFrenchDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date)
}

const d = new Date("Fri Dec 05 2025 01:00:00 GMT+0100")
console.log(formatFrenchDate(d))


const { isDesktop } = useDevice()

const isOpen = ref<boolean>(false)
</script>

<style scoped lang="scss">
.album-cover {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  padding: 20px;
  &__cover {
    width: 250px;
    height: 250px;
    object-fit: cover;
    aspect-ratio: 1/1;
    transition: 0.3s;
    border-radius: 4px;
    cursor: pointer;
    &--modal {
      max-height: 80vh;
      max-width: 75vw;
    }
    &:hover {
      transform: scale(1.05);
    }
  }
  &__content {
    width: 100%;
    color: #fff;
    height: fit-content;
    &__type {
      text-transform: capitalize;
      font-size: 16px;
    }
    &__title {
      font-size: clamp(18px, 2vw + 0.7rem, 2.5rem);
    }
    &__artist {
      display: flex; 
      align-items: center; 
      gap: 5px;
      &__picture {
        width: clamp(22px, 2vw, 30px);
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        object-fit: cover;
      }
      &__name {
         font-size: 12px;
         font-weight: 700;
         text-decoration: underline transparent;
         transition: 0.2s ease-in-out;
         &:hover {
           text-decoration: underline #fff;
         }
      }
      &--album-data {
        font-size: 12px; font-weight: 400;
        color: grey;
      }
    }
  }
}

@media screen and (max-width: 870px) {
  .album-cover {
    flex-direction: column;
    align-items: center;
  }
}
</style>