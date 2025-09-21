<template>
  <div class='default-layout'>
    <navbar />

    <resize-wrapper>
      <template #left>
        <user-library />
      </template>

      <template #center>
        <slot />
      </template>

      <template #right v-if="layout.showRight">
        <component :is="layout.rightComponent" />
      </template>
    </resize-wrapper>

    <player-section />
  </div>
</template>

<script setup lang='ts'>
import { layoutStore } from '~/store/layoutStore';

const layout = layoutStore()
</script>

<style lang='scss' scoped>
</style>