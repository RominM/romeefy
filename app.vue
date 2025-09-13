<template>
  <NuxtLayout>
    <div >
      <resize-wrapper>
        <template #left>
          <user-library />
        </template>

        <template #right>
          <NuxtPage />
        </template>
      </resize-wrapper>
    </div>
    </NuxtLayout>
</template>

<script setup lang='ts'>
    
</script>