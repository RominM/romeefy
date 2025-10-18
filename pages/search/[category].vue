<template>
  <div class="dynamic-search">
    <pre style="color: #fff;">{{ category }}</pre>
    <not-exist />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const category = route.params.category as String
</script>

<style scoped lang="scss">
.dynamic-search {
  background-color: $dark-surface;
  height: 100dvh;
}
</style>