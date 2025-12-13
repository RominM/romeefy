<template>
  <div class="sidebar-player">
    <on-listen show-cover />
    <player :variant="EVaraintPlayer.LITE" />
  </div>
</template>

<script setup lang="ts">
import { EVaraintPlayer } from '~/types/enum/global/player';

</script>

<style scoped lang="scss">
.sidebar-player {
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-top: solid #ccc 1px;
}
</style>