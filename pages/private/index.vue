<template>
    <div class='private-test'>
      <player :variant="EVaraintPlayer.FULL" />
      <player :variant="EVaraintPlayer.LITE" />
      <player :variant="EVaraintPlayer.MINIMAL" />
      <player :variant="EVaraintPlayer.FULL" reverse />
    </div>
</template>

<script setup lang="ts">
import { EVaraintPlayer } from '~/types/enum/global/player';

</script>

<style lang='scss' scoped>
  .private-test{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    gap: 25px;
    background-color: #000;
  }
</style>