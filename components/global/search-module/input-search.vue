<template>
  <div class="input-search">
    <h-icon v-if="showIcon" :icon="Search01Icon" color="#b3b3b3"/>
    <input
      ref="inputRef"
      class='input-search__input' 
      type="text" 
      placeholder="Que souhaitez-vous écouter ?"
      v-model="searchValue"
      @input="handleInput"
      @focus="emit('is-focus', true)"
      @blur="emit('is-focus', false)"
    />
  </div>
</template>

<script setup lang="ts">
import { Search01Icon } from '@hugeicons/core-free-icons';
import { useAPI } from '~/composables/api/useApi';
import { useSearchStore } from '~/store/searchStore';

const emit = defineEmits(['is-focus'])
defineProps({
  showIcon: { type: Boolean, default: false }
})

const router = useRouter()
const _searchStore = useSearchStore()

router.afterEach(() => {
  searchValue.value = ''
})

const inputRef = ref<HTMLInputElement | null>(null)
const searchValue = ref<string>('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  inputRef.value?.focus()
})

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

function handleInput() {
  const entered = searchValue.value.trim()
  _searchStore.setActive(entered.length > 0)

  if (entered.length === 0) {
    _searchStore.clearResults()
    return
  }

  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => fetchResults(entered), 300)
}

async function fetchResults(query: string) {
  _searchStore.setLoading(true)
  const { data, error } = await useAPI().search.global(query)
  _searchStore.setLoading(false)

  if (!data || error) return

  // Ignore stale result if the query has since changed
  if (searchValue.value.trim() !== query) return

  _searchStore.setResults(data)
}
</script>

<style scoped lang="scss">
.input-search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
    &__input {
    width: 100%;
    color: #ccc;
    border-right: solid 1px $light-text-secondary;
    &::placeholder {
      color: $light-text-secondary;
    }
  }
}

@media screen and (max-width: 540px) {
  .input-search__input {
    font-size: 14px;
  }
}
</style>