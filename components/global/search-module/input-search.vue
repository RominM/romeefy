<template>
  <div class="input-search">
    <h-icon :icon="Search01Icon" color="#b3b3b3"/>
    <input 
      class='input-search__input' 
      type="text" 
      placeholder="Que souhaitez-vous écouter ou regarder ?"
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
const router = useRouter()

router.afterEach(() => {
  searchValue.value = ''
})

const _searchStore = useSearchStore()
const searchValue = ref<string>('')

async function handleInput() {
  const entered = searchValue.value.trim()

 _searchStore.setActive(entered.length > 0)

  if (entered.length === 0) {
    _searchStore.clearResults()
    return
  }

  _searchStore.setLoading(true)
  const { data, error } = await useAPI().search.global(entered)
  _searchStore.setLoading(false)

  if (!data || error) {
    return
  }

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
</style>