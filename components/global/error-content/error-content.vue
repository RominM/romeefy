<template>
  <div class='error-content'>
    <h-icon :icon="AlertCircleIcon" size="60px"/>
    <p>Quelque chose s'est mal passé</p>
    <button @click="$emit('retry')">Réessayer</button>
  </div>
</template>

<script setup lang='ts'>
import { AlertCircleIcon } from '@hugeicons/core-free-icons';

    
</script>

<style lang='scss' scoped>
.error-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: $light-background;
  font-size: 14px;
}
</style>