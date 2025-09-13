<template>
  <nav class='navbar'>
    <native-menu />
    <div class="navbar__center">
      <home-nav /> 
      <search-module />
    </div>
  </nav>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
  .navbar{
    display: flex;
    align-items: center;
    padding: 3px;
    background-color:$dark-background;
    &__center {
    display: flex;
    gap: 10px;
    max-width: 475px;
    width: 100%;

    }
  }
</style>