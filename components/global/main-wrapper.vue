<template>
  <div class='main-wrapper custom-scrollbar'>
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
    background: #141313;
    background: linear-gradient(307deg, rgba(20, 19, 19, 1) 64%, rgba(38, 38, 38, 1) 100%);
    overflow: auto;
  }
</style>