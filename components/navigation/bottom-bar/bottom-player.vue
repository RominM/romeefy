<template>
  <div class="bottom-player" :style="{backgroundColor: currentColor}">
    <on-listen show-cover />
    <player :variant="EVaraintPlayer.MINIMAL"  />
  </div>
</template>

<script setup lang="ts">
import { playerStore } from '~/store/playerStore';
import { EVaraintPlayer } from '~/types/enum/global/player';

const { currentColor } = storeToRefs(playerStore())
</script>

<style scoped lang="scss">
.bottom-player {
  display: flex;
  padding: 6px;
  padding-top: 8px;
  border-radius: 8px;
}
</style>