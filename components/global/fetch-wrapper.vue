<template>
  <div class="fetch-wrapper">
    <template v-for="item in items" :key="item.id">
      <slot name="item" :item="item"/>
    </template>

    <div ref="bottomRef" style="height: 1px"></div>

    <p v-if="loading">Chargement...</p>
    <p v-if="!hasMore && !loading">Fin de résultats</p>
    <p v-if="error" class="text-red-500">{{ error.message || error }}</p>
  </div>
</template>

<script setup lang="ts">
interface FetchResult<T> {
  data: T[]
  error: any
  next?: string | null
  total?: number
}

const props = defineProps({
  fetch: { type: Function as PropType<(index: number, limit: number) => Promise<FetchResult<any>>>, required: true },
  pageSize: { type: Number, default: 25 }
})

const items = ref<any[]>([])
const loading = ref(false)
const index = ref(0)
const hasMore = ref(true)
const error = ref<any>(null)

const bottomRef = ref<HTMLElement | null>(null)
const pageSize = props.pageSize || 25


onMounted(() => {
  loadMore()
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore.value) loadMore()
  }, { threshold: 0.5 })
  if (bottomRef.value) observer.observe(bottomRef.value)
})

async function loadMore() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  try {
    const { data, error: err } = await props.fetch(index.value, pageSize)

    if (err) {
      error.value = err
    } else {
      items.value.push(...data)

      if (data.length < pageSize) {
        hasMore.value = false
      } else {
        index.value += pageSize
      }
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
