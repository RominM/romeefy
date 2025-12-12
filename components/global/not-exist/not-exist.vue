<template>
  <div class="not-exist">
    <p>This page is under construction</p>
    <h-icon :icon="ToolsIcon"/>
    <nuxt-link to="/">Back to Home</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { ToolsIcon } from '@hugeicons/core-free-icons';

</script>

<style scoped lang="scss">
.not-exist {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100dvh;
  color: #fff;
  background-color: $dark-text-primary;
}
</style>