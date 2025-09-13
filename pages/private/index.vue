<template>
    <div class='private-test'>
      TEST
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  layout: 'private',
})

onMounted(async () => {
  const res = await $fetch('/api/deezer/genre')
  console.log(res)
})





</script>

<style lang='scss' scoped>
    .private-test{}
</style>