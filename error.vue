<template>
  <div class='error'>
    <h1>404</h1>
    <p>Oups, la page que vous cherchez n'existe pas</p>
    <nuxt-link to="/" label="Accueil">Accueil</nuxt-link>
  </div>
</template>

<script setup lang='ts'>
   
</script>

<style lang='scss' scoped>
  .error{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $dark-background;
    color: $light-text-primary;
    height: 100dvh;
  }
</style>