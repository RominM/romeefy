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
    background-color: $dark-surface;
    height: 100%;
    border-radius: 8px;
  }
</style>