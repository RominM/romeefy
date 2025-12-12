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
    background-color: $dark-surface-secondary;
  }
</style>