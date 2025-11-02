<template>
  <button class="go-back" @click="goBack">
    <h-icon :icon="ArrowLeft02Icon" color="#fff" />
  </button>
</template>

<script setup lang="ts">
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<style scoped lang="scss">
.go-back {
  background-color: color-alpha($dark-surface, 0.4);
  padding: 5px;
  border-radius: 50%;
}
</style>