<template>
  <resize-wrapper>
    <template #center>
      <scroll-container>
        <all-artists />
      </scroll-container>
    </template>
  </resize-wrapper>
</template>

<script setup lang="ts">
useHead({
  title: 'Artist'
})
</script>

<style scoped lang="scss">

</style>