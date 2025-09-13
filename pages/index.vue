<template>
  <main-wrapper class='index'>
    Page index
    
  </main-wrapper>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi';

    onMounted(async () => {
  const res = await useAPI().chart.getGlobal()

    console.log(res)
})

</script>

<style lang='scss' scoped>
  .index{
      
  }
</style>