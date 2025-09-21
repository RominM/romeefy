<template>
  <div class="resize-handle">
      <hr class="resize-handle--hover"> 
  </div>
</template>

<script setup lang="ts">
/* this component has no script */
</script>

<style scoped lang="scss">
  .resize-handle{
    padding: 5px 2px 5px 3px;
    &--hover{
      height: 100%;
      width: 1px;
      border: solid 1px transparent;
      transition: 0.3s;
    }
    &:hover  .resize-handle--hover {
      border-left: solid 1px $light-background;
    }
  }
</style>