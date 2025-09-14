<template>
  <section class='player-section'>
    <on-listen />
    <player />
    <player-menu />
  </section>
</template>

<script setup lang='ts'>
    
</script>

<style lang='scss' scoped>
  .player-section{
    display: flex;
    height: 100px;
    padding: 10px;
    background-color: $dark-background;
    & > * {
      width: calc(100% / 3);
    }
  }
</style>