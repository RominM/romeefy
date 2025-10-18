<template>
  <div :class="['default-layout', {'--flex': !isDesktop}]">
    <navbar v-if="isDesktop" />
    <sidebar v-if="isTablet" @action-nav="handleAction" />
    <slot />
    <player-section v-if="isDesktop" />
  </div>
</template>

<script setup lang='ts'>
import { useDevice } from '~/composables/device/useDevice';
import type { ENavAction } from '~/types/enum/global/nav';

const { isDesktop, isTablet } = useDevice()

function handleAction(action: ENavAction) {
console.log({action});

}
</script>

<style lang='scss' scoped>
.default-layout {
  &.--flex {
    display: flex;
  }
}
</style>