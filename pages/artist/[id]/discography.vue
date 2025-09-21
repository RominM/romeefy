<template>
  <!-- <main-wrapper class='discography'> -->
    <discography-page :artist-id="artistId" />
  <!-- </main-wrapper> -->
</template>

<script setup lang='ts'>
import { layoutStore } from '~/store/layoutStore'

const route = useRoute()
const artistId = Number(route.params.id)

const layout = layoutStore()

onMounted(() => {
  layout.openRightPanel(defineAsyncComponent(() => import('@/components/artist/artist-details/artist-details.vue')))
})
</script>

<style scoped lang="scss">
.discography{
  overflow: hidden;
}
</style>