<template>
  <resize-wrapper>
    <template #center>
      <scroll-container>
        <discography-page :artist-id="artistId" />
      </scroll-container>
    </template>

    <template #right>
      <artist-details />
    </template>
  </resize-wrapper>
</template>

<script setup lang='ts'>

const route = useRoute()
const artistId = Number(route.params.id)

// const layout = layoutStore()

// onMounted(() => {
//   layout.openRightPanel(defineAsyncComponent(() => import('@/components/artist/artist-details/artist-details.vue')))
// })
</script>

<style scoped lang="scss">
.discography{
  overflow: hidden;
}
</style>