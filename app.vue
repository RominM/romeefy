<template>
  <NuxtLayout>
    <resize-wrapper>
      <template #left>
        <user-library />
      </template>
      <template #right>
        <NuxtPage />
      </template>
    </resize-wrapper>
  </NuxtLayout>
</template>

<script setup lang='ts'>

const images = ref([])

onMounted(async () => {
  /* Netlify needed */
  const res = await fetch(`/api/pexelsSearch?q=music&per_page=5`)
  const data = await res.json()
  images.value = data.photos
})
</script>