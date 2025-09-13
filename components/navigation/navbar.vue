<template>
  <nav class='private-navigation'>
    <p>default</p>
  </nav>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
    .private-navigation,
    .private-navigation__admin{
      display: flex;
      justify-content: end;
      gap: 10px;
    }
    .private-navigation{
      background-color:blue;
    }
</style>