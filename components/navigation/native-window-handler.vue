<template>
  <div class='native-window-handler'>
    <h-icon :icon="SolidLine01Icon" size="14px"/>
    <h-icon :icon="SolidLine02Icon" size="14px"/>
    <h-icon :icon="Cancel01Icon" size="16px"/>
  </div>
</template>

<script setup lang='ts'>
import { Cancel01Icon, SolidLine01Icon, SolidLine02Icon } from '@hugeicons/core-free-icons';
</script>

<style lang='scss' scoped>
  .native-window-handler{
    display: flex;
    gap: 24px;
  }
</style>