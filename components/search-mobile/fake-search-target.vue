<template>
  <div class="fake-search-target">
    <h-icon :icon="Search01Icon" color="#000" />
    <p>Que souhaitez-vous écouter ?</p>
  </div>
</template>

<script setup lang="ts">
import { Search01Icon } from '@hugeicons/core-free-icons';
</script>

<style scoped lang="scss">
.fake-search-target {
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 40px;
  padding: 0 5px;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
}
</style>