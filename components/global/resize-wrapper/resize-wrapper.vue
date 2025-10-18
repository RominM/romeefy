<template>
  <div :class="['resize-wrapper', { isDesktop }]">
    <main-wrapper v-if="isDesktop" class="resize-wrapper__left-panel" :style="{ width: leftWidth + 'px' }">
      <scroll-container>
        <user-library />
      </scroll-container>
    </main-wrapper>

    <resize-handle v-if="isDesktop" @mousedown.prevent="onMouseDown" :style="{ cursor: isDragging ? 'grabbing' : 'grab' }" />

    <main-wrapper class="resize-wrapper__center-panel">
      <scroll-container v-if="_searchStore.isActive">
        <search-result-page />
      </scroll-container>
      <slot name="center" />
    </main-wrapper>
    
    <resize-handle 
      v-if="showRightPanle" 
      :style="{ cursor: isDragging ? 'grabbing' : 'grab' }" 
      @mousedown.prevent="onMouseDown" 
    />

    <main-wrapper v-if="showRightPanle" :style="{ width: rightWidth + 'px' }">
      <scroll-container>
        <artist-details />
      </scroll-container>
    </main-wrapper>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from '~/composables/device/useDevice'
import { useSearchStore } from '~/store/searchStore'


let startX = 0
let startWidth = 0

let startXRight = 0
let startWidthRight = 0

const MIN_WIDTH = 250
const MAX_WIDTH = 450

const _searchStore = useSearchStore()
const showRightPanle = useState('showRightPanel', () => false)
const { isDesktop } = useDevice()

const leftWidth = ref<number>(350)
const rightWidth = ref<number>(350)
const isDragging = ref<boolean>(false)
const isDraggingRight = ref<boolean>(false)

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

  .resize-wrapper {
    display: flex;
    padding: 5px;
    background-color: $dark-background;
    width: calc(100% - 23dvw);
    height: 100dvh;
    &.isDesktop{
      width: 100vw;
      height: calc(100dvh - $--navbar - $--playbar);
    }
    &__center-panel {
      flex: 2; 
      min-width: 0; 
      overflow: hidden;
    }
  }
</style>
