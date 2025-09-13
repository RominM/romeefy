<template>
  <div class="resize-wrapper" style="display: flex; width: 100%;">
    <div :style="{ width: leftWidth + 'px' }">
      <slot name="left"/>
    </div>

    <div
      class="resize-handle"
      :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
      @mousedown.prevent="onMouseDown"
    ></div>

    <div style="flex: 1;">
      <slot name="right"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const leftWidth = ref<number>(300)
const isDragging = ref<boolean>(false)

let startX = 0
let startWidth = 0

const MIN_WIDTH = 200
const MAX_WIDTH = 350

function onMouseDown(e: MouseEvent) {
  isDragging.value = true
  startX = e.clientX
  startWidth = leftWidth.value
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  const dx = e.clientX - startX
  let newWidth = startWidth + dx
  leftWidth.value = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth))
}

function onMouseUp() {
  isDragging.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}
</script>

<style lang='scss' scoped>
  .resize-handle{
    width: 5px;
  }
</style>