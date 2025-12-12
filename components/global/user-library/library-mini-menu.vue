<template>
  <ul class="library-mini-menu">
    <li @click="toggleCollapeLibrary" title="Ouvrir la bibliothèque">
      <div class="library-mini-menu__wrapper">
        <h-icon :icon="BarCode02Icon"/>
      </div>
    </li>
    <li title="Créer une playlist, un dossier ou un Jam" @click="toggleDropdown">
      <div class="library-mini-menu__wrapper add">
        <h-icon :icon="Add01Icon" />
      </div>
    </li>
    <li v-if="likedTitles.length" title="Titres likés">
      <div class="library-mini-menu__wrapper liked">
        <h-icon :icon="FavouriteIcon" />
      </div>
    </li>
    <li v-for="(favotite, index) in userFavorite" :key="`favotite-${index}`">
      <div class="library-mini-menu__wrapper playlist">
        <pre v-if="favotite.artist">{{ favotite.artist }}</pre>
        <pre v-if="favotite.playlist">{{ favotite.playlist }}</pre>
      </div>
    </li>
  </ul>

    <div v-if="isOpen" class="added-dropdown">
      <create-playlist-module @close="isOpen = false"/>
    </div>  
</template>

<script setup lang="ts">
import { Add01Icon, BarCode02Icon, FavouriteIcon } from '@hugeicons/core-free-icons';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

type TUserFavorite = {
  artist?: string
  playlist?: string
}

const isOpen = ref<boolean>(false)
const likedTitles = ref([])
const userFavorite = ref<TUserFavorite[]>([])

function toggleDropdown() {
  isOpen.value = !isOpen.value
}



function toggleCollapeLibrary() {
  useGlobalEvents().emitEvent(EGlobalEvent.COLLAPSE_LIBRARY, false)
}
</script>

<style scoped lang="scss">
.library-mini-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  & > * {
    display: flex;
    justify-content: center;
    padding: 4px;
    width: 100%;
    height: 55px;
    margin: auto;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: color-alpha($dark-surface-tercary, 0.8);
    }
  }
  &__wrapper {
    padding: 12px;
    &.add {
      border-radius: 50%;
      background-color: $dark-surface-tercary;
    }
    &.liked {
      border-radius: 8px;
      background: #0088ff;
      background: linear-gradient(149deg, rgba(0, 136, 255, 1) 0%, rgba(184, 255, 255, 1) 100%);
    }
  }
}

.added-dropdown {
  position: absolute;
    top: 120px;
  left: 70px;
  padding: 10px;
  background-color: $dark-surface;
  border-radius: 8px;
  box-shadow: 0 0 30px #000;
  z-index: 9999;
}
</style>