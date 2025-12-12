<template>
  <nuxt-link to="/" class='home-nav' title="Accueil">
    <h-icon :icon="Home09Icon" color="#fff"/>
  </nuxt-link>
</template>

<script setup lang='ts'>
import { Home09Icon } from '@hugeicons/core-free-icons';

    
</script>

<style lang='scss' scoped>
  .home-nav{
    display: inline-block;
    padding: 10px;
    border-radius: 50%;
    width: fit-content;
    background-color: $dark-surface-secondary;
  }
</style>