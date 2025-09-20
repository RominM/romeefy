<template>
  <main class='artist-main'>
    <player-banner v-if="trackId" :color-secondary="colorSecondary" :track-id="trackId"/>
    
    <div class='artist-main__content'>
      <section-track v-if="topTrack" :track-list="topTrack" title="Populaires"  />
    </div>

    <p style="padding: 20px;">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus soluta vero suscipit assumenda culpa, adipisci distinctio. Veritatis temporibus suscipit, beatae distinctio nobis dolor, molestias omnis maiores iure vitae sit ducimus!
    </p>
  </main>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi';

const emit = defineEmits(['track-id'])
const props = defineProps({
  artist: { type: Object, required: true },
  colorSecondary: { type: String, required: true}
})

const topTrack = ref()
const trackId = ref<number>()

onMounted(() => {
  getTopTracks()
})

async function getTopTracks() {
  
  const { data, error } = await useAPI().artist.getTopTracks(props.artist.id, { limit: 5, order: 'RATING_DESC' })
  
  if(!data || error) return

  topTrack.value = data
  trackId.value = topTrack.value[0].id
  emit('track-id', trackId.value)
}


</script>

<style lang='scss' scoped>
.artist-main{
  background: linear-gradient(307deg, rgba(20, 19, 19, 1) 64%, rgba(38, 38, 38, 1) 100%);
  &__content {
    position: relative;
    padding: 10px 20px;
    z-index: 10;
  }
}
</style>