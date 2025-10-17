<template>
  <div :class="['dropdown-result', {'--show': showDropdown}]">
    <h6 class="dropdown-result__title">Recherches récentes</h6>
    <ul class="dropdown-result__list">
      <li
        v-for="(item, index) in _searchStore.history"
        :key="index"
        @delete="deleteItemHistoy(item)"
      >
        <search-result-item :item="item" />
      </li>
    </ul>
    <button-cta label="Effacer les dernières recherches" @click="clearHistory" />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'
import { useMapper } from '~/composables/mappers/useMapper'
import { useSearchStore } from '~/store/searchStore'

const _searchStore = useSearchStore()
const query = ref('')
const showDropdown = defineModel<boolean>({ default: false })

const router = useRouter()

router.afterEach((to) => {
  if (to) {
    const pathSegments = to.path.split('/').filter(Boolean)
    if (pathSegments.length === 2) {
      const [type, id ] = pathSegments
      getDataFromPath(type, id)
    }
  }

  _searchStore.clearResults()
})

async function getArtist(id: number) {
  const { data, error } = await useAPI().artist.getById(id)
  console.log({ data });
  return useMapper().searchItem.mapArtist(data)
  
}

async function getDataFromPath(type: string, id: string) {
  const nmbId = Number(id)

  let result: TSearchItem | null = null

  switch (type) {
    case 'artist':
      console.log(type, id)
      result = await getArtist(nmbId)
      break
  }

  if (result) {
    _searchStore.addToHistory(result)
  }
}

function selectHistory(item: string) {
  query.value = item
  showDropdown.value = false
  _searchStore.setQuery(item)
}

function clearHistory() {
  _searchStore.history = []
}

function deleteItemHistoy(item: TSearchItem) {
  console.log({item});
}
</script>

<style scoped lang="scss">
.dropdown-result {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5px;
  width: 100%;
  padding: 20px 10px;
  background-color: $dark-surface;
  color: #fff;
  border-radius: 8px;
  opacity: 0;
  transition: 0.3s;
  z-index: 999;
  &__title {
    font-size: 16px;
    line-height: 14px;
    font-weight: 600;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 5px 0;
  }
  &.--show {
    opacity: 1;
  }
}
</style>