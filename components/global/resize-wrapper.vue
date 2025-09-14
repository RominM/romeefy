<template>
  <div class="resize-wrapper" style="">
    <div :style="{ width: leftWidth + 'px' }">
      <slot name="left"/>
    </div>

    <div
      class="resize-handle"
      :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
      @mousedown.prevent="onMouseDown"
    >
      <hr class="resize-handle--hover">
    </div>

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
  $--navbar: 58px;
  $--playbar: 100px;

  .resize-wrapper{
    display: flex;
    width: 100%;
    padding: 5px;
    height: calc(100dvh - $--navbar - $--playbar);
    background-color: $dark-background;
  }
  .resize-handle{
    padding: 5px 1px 5px 2px;
    &--hover{
      height: 100%;
      width: 1px;
      border: solid 1px $dark-background;
      transition: 0.3s;
    }
    &:hover  .resize-handle--hover {
      border-left: solid 1px #fff;
    }
  }
</style>