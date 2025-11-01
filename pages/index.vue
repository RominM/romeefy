<template>
  <resize-wrapper>
    <template #center>
      <scroll-container>
        <home-content />
      </scroll-container>
    </template>
  </resize-wrapper>
</template>

<script setup lang='ts'>
/* this component has no script */
useHead({
  title: 'Home'
})
</script>

<style lang='scss' scoped>
/* this component has no style */
</style>