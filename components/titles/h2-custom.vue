<template>
  <h2 class="h2-custom">
    {{ title }}
  </h2>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true }
})
</script>

<style scoped lang="scss">
.h2-custom {
  font-size: 16px;
  color: #fff;
}
</style>