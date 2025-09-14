<template>
    <div class='main-wrapper'>
      <slot />
    </div>
</template>

<script setup lang='ts'>
    
</script>

<style lang='scss' scoped>
  .main-wrapper{
    border: solid 1px;
    background-color: $dark-surface;
    height: 100vh;
    border-radius: 8px;
  }
</style>