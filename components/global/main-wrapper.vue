<template>
    <div class='main-wrapper'>
      <slot />
    </div>
</template>

<script setup lang='ts'>
    
</script>

<style lang='scss' scoped>
  .main-wrapper{
    padding: 10px;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    background-color: $dark-surface;
    overflow: hidden;
  }
</style>