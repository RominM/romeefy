<template>
  <nav class="sidebar">
    <navigation-list @action-nav="$emit('action-nav', $event)"/>
    <sidebar-player />
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 23dvw;
  height: 100dvh;
  background-color: $dark-surface;
}
</style>