<template>
  <div class='private-layout'>
    <private-navbar />
    <navbar />
    <slot />
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
  .private-layout{
    display: flex;
    flex-direction: column;
    max-width: 100%;
    height: 100vh;
    background-color: $dark-background;
    background-color: green;
    color: $dark-text-primary;
  }
</style>