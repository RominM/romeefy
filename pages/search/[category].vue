<template>
  <div class="dynamic-search">
    <p>dynamic-search</p>
    <pre>{{ category }}</pre>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const category = route.params.category as String
</script>

<style scoped lang="scss">
.dynamic-search {
  
}
</style>