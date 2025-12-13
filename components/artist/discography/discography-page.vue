<template>
  <div v-if="artist" :class="['discography-page', { isMobile, isTablet }]">
    <div v-if="!isDesktop" class="responsive" >
      <go-back title="Sorties" background />
      <filter-tag class="home-content__filters" :tags="filterTags" @update:selected="filterList"/>
    </div>
    <!-- must be implemented -->
    <!-- <discography-header v-if="currentAlbum && trackId" :artist-name="artist.name" :target-scroll="target" :track-id="trackId" :current-album="currentAlbum"/> -->

    <scroll-container :class="['discography-page__content', { isMobile, isTablet }]" @target="target = $event" >
      <fetch-wrapper :key="activeTag" :fetch="(index, limit) => getDiscography(index, limit)" :page-size="5">
        <template #item="{ item }">
          <album-display :lite-album="item" show-header/>
        </template>
      </fetch-wrapper>
    </scroll-container>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'
import { useDevice } from '~/composables/device/useDevice'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const { isMobile, isTablet, isDesktop } = useDevice()
const route = useRoute()
const artist = useArtist()

const loading = ref<boolean>(false)
const target = ref<number>(0)

const filterTags = ref([
  { label: 'Tout', active: true, key: '' },
  { label: 'Album', active: false, key: 'album' },
  { label: 'Single', active: false, key: 'single' },
  { label: 'EP', active: false, key: 'ep' },
]);

const activeTag = computed(
  () => filterTags.value.find(t => t.active)?.key ?? ''
)

onMounted(() => {
  if (!artist.value) {
    getArtist()
  }
})

async function getArtist() {
  loading.value = true  
  const { data, error } = await useAPI().artist.getById(Number(route.params.id))
  loading.value = false

  if(!data || error) return
  artist.value = data
}

async function getDiscography(index: number, limit: number) {
  loading.value = true
  const {data, error } = await useAPI().artist.getAlbums(props.artistId, { index, limit })
  loading.value = false

 if (!data || error || !Array.isArray(data)) {
    return { data: [], error: error ?? null }
  }

  const activeTag = filterTags.value.find(t => t.active)?.key ?? ''

  return {
    data: activeTag === ''
      ? data
      : data.filter(d => d.record_type === activeTag),
    error: null
  }
}

function filterList(selectedKey: string) {
  filterTags.value.forEach(tag => {
    tag.active = tag.key === selectedKey
  })
}
</script>

<style scoped lang="scss">
.discography-page {
  .responsive {
    position: fixed; 
    z-index: 9999; 
    background-color: $dark-surface-secondary;
  }

  &.isTablet {
    .responsive {
      width: calc(100vw - 170px) !important;
    }
  }
  &.isMobile {
    .responsive {
      width: 100vw;
    }
  }

  &__content {
    padding-top: 50px;
    &.isMobile,
    &.isTablet {
      padding-top: 100px;
    }
  }
}
</style>