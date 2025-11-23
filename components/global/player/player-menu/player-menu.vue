<template>
  <div class="player-menu">
    <h-icon :icon="AudioBook01Icon" size="18" @click="showRightPanel = !showRightPanel" />
    <h-icon :icon="Mic02Icon" size="18" />
    <h-icon :icon="AudioBook01Icon" size="18" />
    <h-icon :icon="HeadphonesIcon" size="18" />
    <volume-range />
    <h-icon :icon="MaximizeScreenIcon" size="18" />
    <h-icon :icon="FullScreenIcon" size="18" />
  </div>
</template>

<script setup lang="ts">
import { AudioBook01Icon, FullScreenIcon, HeadphonesIcon, MaximizeScreenIcon, Mic02Icon } from '@hugeicons/core-free-icons';

const showRightPanel = useState('showRightPanel', () => false)
</script>

<style scoped lang="scss">
.player-menu {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>