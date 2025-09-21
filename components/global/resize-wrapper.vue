<template>
  <div class="resize-wrapper">
    <div :style="{ width: leftWidth + 'px' }">
      <main-wrapper>
        <slot name="left"/>
      </main-wrapper>
    </div>

    <div
      class="resize-handle"
      :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
      @mousedown.prevent="onMouseDown"
    >
      <hr class="resize-handle--hover">
    </div>

    <div style="flex: 1; min-width: 0; overflow: hidden;">
      <main-wrapper>
          <slot name="center"/>
      </main-wrapper>
    </div>
    
    <div
      class="resize-handle"
      :style="{ cursor: isDraggingRight ? 'grabbing' : 'grab' }"
      @mousedown.prevent="onMouseDownRight"
    >
      <hr class="resize-handle--hover">
    </div>

    <template v-if="layout.showRight && layout.rightComponent">
      <main-wrapper :style="{ width: rightWidth + 'px' }">
        <slot name="right"/>
      </main-wrapper>

    </template>
  </div>
</template>

<script setup lang="ts">
import { layoutStore } from '~/store/layoutStore'

const layout = layoutStore()

const leftWidth = ref<number>(300)
const rightWidth = ref<number>(250)
const isDragging = ref<boolean>(false)
const isDraggingRight = ref<boolean>(false)

let startX = 0
let startWidth = 0

let startXRight = 0
let startWidthRight = 0

const MIN_WIDTH = 200
const MAX_WIDTH = 350

onMounted(() => {
  if (layout.showRight && layout.rightComponent) {
    // Layout prêt, slot right peut s'afficher
  }
})

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
  leftWidth.value = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + dx))
}

function onMouseUp() {
  isDragging.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

function onMouseDownRight(e: MouseEvent) {
  isDraggingRight.value = true
  startXRight = e.clientX
  startWidthRight = rightWidth.value
  document.addEventListener('mousemove', onMouseMoveRight)
  document.addEventListener('mouseup', onMouseUpRight)
}

function onMouseMoveRight(e: MouseEvent) {
  if (!isDraggingRight.value) return
  const dx = startXRight - e.clientX 
  rightWidth.value = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidthRight + dx))
}

function onMouseUpRight() {
  isDraggingRight.value = false
  document.removeEventListener('mousemove', onMouseMoveRight)
  document.removeEventListener('mouseup', onMouseUpRight)
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
    padding: 5px 2px 5px 3px;
    &--hover{
      height: 100%;
      width: 1px;
      border: solid 1px transparent;
      transition: 0.3s;
    }
    &:hover  .resize-handle--hover {
      border-left: solid 1px $light-background;
    }
  }
</style>
