<template>
  <div :class="['dropdown-result', { '--show': showDropdown }]">
    <h6 class="dropdown-result__title">Recherches récentes</h6>

    <ul class="dropdown-result__list">
      <li
        v-for="item in _searchStore.history"
        :key="`history-${item.id}`"
        @click="selectHistory(item)"
      >
        <search-result-item :item="item" />
      </li>
    </ul>

    <button-cta
      v-if="_searchStore.history.length"
      label="Effacer les dernières recherches"
      @click="clearHistory"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAPI } from '~/composables/api/useApi'
import { useMapper } from '~/composables/mappers/useMapper'
import { useSearchStore } from '~/store/searchStore'

const _searchStore = useSearchStore()
const showDropdown = defineModel<boolean>({ default: false })
const query = ref('')
const router = useRouter()

onMounted(() => {
  const storedHistory = localStorage.getItem('history')
  if (storedHistory) {
    try {
      _searchStore.history = JSON.parse(storedHistory)
    } catch {
      _searchStore.history = []
    }
  }
})

router.afterEach((to) => {
  const segments = to.path.split('/').filter(Boolean)
  if (segments.length === 2) {
    const [type, id] = segments
    getDataFromPath(type, id)
  }

  _searchStore.clearResults()
})

async function getArtist(id: number) {
  const { data, error } = await useAPI().artist.getById(id)
  if (!data || error) return null

  return useMapper().searchItem.mapArtist(data)
}

async function getDataFromPath(type: string, id: string) {
  const nmbId = Number(id)
  let result: TSearchItem | null = null

  switch (type) {
    case 'artist':
      result = await getArtist(nmbId)
      break
  }

  if (result) _searchStore.addToHistory(result)
}

function selectHistory(item: TSearchItem) {
  query.value = item.label
  showDropdown.value = false
  _searchStore.setQuery(item.label)
}

function clearHistory() {
  _searchStore.history = []
  localStorage.removeItem('history')
}

function deleteItemHistoy(item: TSearchItem) {
  _searchStore.history = _searchStore.history.filter(i => i.id !== item.id)
  localStorage.setItem('history', JSON.stringify(_searchStore.history))
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
  background-color: $dark-surface-secondary;
  color: #fff;
  border-radius: 8px;
  opacity: 0;
  transition: 0.3s;
  z-index: 9999;
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
