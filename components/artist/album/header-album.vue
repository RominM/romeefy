<template>
  <div class="header-album">
    <img :src="liteAlbum.cover" alt="">
    <div>
      <h2>{{ liteAlbum.title }}</h2>
      <div>
        <span>{{ liteAlbum.type }}</span>
        <span>{{ liteAlbum.release_date }}</span>
        <span>{{ nmbTrack }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ 
  liteAlbum: { type: Object, required: true },
  nmbTrack: { type: Number, default: 0 }
})
</script>

<style scoped lang="scss">
.header-album {
  
}
</style>