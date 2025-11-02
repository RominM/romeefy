<template>
  <div class="bottom-player" :style="{backgroundColor: currentColor}">
    <on-listen />
    <player />
  </div>
</template>

<script setup lang="ts">
import { playerStore } from '~/store/playerStore';

const { currentColor } = storeToRefs(playerStore())
</script>

<style scoped lang="scss">
.bottom-player {
  display: flex;
  padding: 6px;
  padding-top: 8px;
  margin: 0 10px;
  border-radius: 8px;
}
</style>