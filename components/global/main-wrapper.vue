<template>
  <div class='main-wrapper'>
    <slot />
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
  .main-wrapper{
    height: 100%;
    width: 100%;
    border-radius: 8px;
    background: #141313;
    // background: linear-gradient(307deg, color-alpha($dark-surface, 0.2) 64%, rgba(38, 38, 38, 1) 100%);
    background-color: $dark-surface;
  }
</style>