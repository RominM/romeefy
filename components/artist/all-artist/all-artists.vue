<template>
  <div class="all-artists">
    <h1 class="all-artists__title">Recommandations</h1>

    <ul class="all-artists__list">
      <li v-for="(artist, index) in allRandomData" :key="index" class="all-artists__list__li">
        <cover-card
          :cover-card="artist"
          :circular="artist.type === ETypeCoverCard.TRACK || artist.type === ETypeCoverCard.ALBUM"
          :source-redirect="`/${artist.type}`" 
          :track-id="Number(artist.id)"
          />
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'
import { useMapper } from '~/composables/mappers/useMapper'
import { ETypeCoverCard } from '../../../types/enum/global/coverCard'

const artistsList = ref<TCoverCard[] | null>(null)
const albumList = ref<TCoverCard[] | null>(null)

const allRandomData = ref()

const loading = ref<boolean>(false)
const allChart = ref()

onMounted(async () => {
  await getAllChart()
  await setupSections()
})


async function getAllChart() {
  loading.value = true
  const { data, error } = await useAPI().chart.getGlobal()
  loading.value = false

  if(!data || error ) return 
  allChart.value = data
}

async function setupSections() {
  if(!allChart.value || !allChart.value.artists) return

  artistsList.value = useMapper().coverCard.fromArtist(allChart.value.artists.data)
  albumList.value = useMapper().coverCard.fromAlbum(allChart.value.albums.data)

  const combined = [...artistsList.value, ...albumList.value]

  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = combined[i]
    combined[i] = combined[j]
    combined[j] = temp
  }

  allRandomData.value = combined
}
</script>

<style scoped lang="scss">
.all-artists {
  padding: 20px;
  &__title {
    color: #fff;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>