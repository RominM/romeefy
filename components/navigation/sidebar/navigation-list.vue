<template>
  <ul class="navigation-list">
    <li v-for="(button, index) in buttons" class="navigation-list__li" :key="index">
      <nuxt-link v-if="button.link" :to="button.link">
        <navigation-button :button="button" />
      </nuxt-link>
      <navigation-button v-if="button.action" :button="button" @click="$emit('action-nav', button.action)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Add01Icon, BarCode02Icon, Home09Icon, OpenSourceIcon, Search01Icon } from '@hugeicons/core-free-icons';
import { ENavAction } from '~/types/enum/global/nav';

const buttons: TSideNav[] = [
  {
    link: '/',
    icon: Home09Icon,
    label: 'Accueil'
  },
  {
    link: '/search',
    icon: Search01Icon,
    label: 'Rechercher'
  },
  {
    link: '/library',
    icon: BarCode02Icon,
    label: 'Bibliothèque'
  },
  {
    link: '/premium',
    icon: OpenSourceIcon,
    label: 'Premium'
  },
  {
    action: ENavAction.CREATE_PLAYLIST,
    icon: Add01Icon,
    label: 'Créer'
  }
]
</script>

<style scoped lang="scss">
.navigation-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  padding: 10px;
  background-color: color-alpha($dark-background, 0.8);
}

@media screen and (max-width: 540px ) {
  .navigation-list {
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    &__li {
      flex: 1;
    }
  }
}
</style>