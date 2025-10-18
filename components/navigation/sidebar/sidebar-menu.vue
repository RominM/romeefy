<template>
  <ul class="sidebar-menu">
    <li v-for="(button, index) in buttons" :key="index">
      <nuxt-link v-if="button.link" :to="button.link">
        <sidebar-button :button="button" />
      </nuxt-link>
      <sidebar-button v-if="button.action" :button="button" @click="$emit('action-nav', button.action)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { BarCode02Icon, Home09Icon, OpenSourceIcon, Search01Icon } from '@hugeicons/core-free-icons';
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
    action: ENavAction.OPEN_PREMIUM,
    icon: OpenSourceIcon,
    label: 'Premium'
  }
]
</script>

<style scoped lang="scss">
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  padding: 10px;
}
</style>