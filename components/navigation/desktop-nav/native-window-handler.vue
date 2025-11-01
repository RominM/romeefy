<template>
  <div class='native-window-handler'>
    <h-icon :icon="SolidLine01Icon" size="14px" />
    <h-icon :icon="SolidLine02Icon" size="14px" @click="toggleFullScreen" />
    <h-icon :icon="Cancel01Icon" size="16px" @click="handleClose" />
  </div>
</template>

<script setup lang='ts'>
import { Cancel01Icon, SolidLine01Icon, SolidLine02Icon } from '@hugeicons/core-free-icons';

async function toggleFullScreen() {
  const doc = document as any
  const docEl = document.documentElement as any

  if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
    if (docEl.requestFullscreen) {
      await docEl.requestFullscreen()
    } else if (docEl.webkitRequestFullscreen) {
      await docEl.webkitRequestFullscreen()
    }
  } else {
    if (doc.exitFullscreen) {
      await doc.exitFullscreen()
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen()
    }
  }
}

function handleClose() {
  confirm('Vous nous quittez deja  ?')
}

</script>

<style lang='scss' scoped>
  .native-window-handler{
    display: flex;
    gap: 24px;
  }
</style>