<template>
  <div class="not-exist">
    <p>Cette page est en cours de construction</p>
    <h-icon :icon="ToolsIcon"/>
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
  height: 100%;
  color: #fff;
}
</style>