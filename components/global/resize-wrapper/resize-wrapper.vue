<template>
  <div v-if="isReady" :class="['resize-wrapper', { isDesktop, isMobile }]">
    <!-- LEFT PANEL -->
    <main-wrapper v-if="isDesktop" class="resize-wrapper__left-panel" :style="{ width: leftWidth + 'px' }">
      <scroll-container>
        <user-library />
      </scroll-container>
    </main-wrapper>

    <!-- LEFT RESIZE HANDLE -->
    <resize-handle 
      v-if="isDesktop" 
      @mousedown.prevent="onMouseDownLeft" 
      :style="{ cursor: isDraggingLeft ? 'grabbing' : 'grab' }" 
    />

    <!-- CENTER PANEL -->
    <main-wrapper class="resize-wrapper__center-panel" :style="{ flexBasis: centerWidth + 'px' }">
      <scroll-container v-if="_searchStore.isActive">
        <search-result-page />
      </scroll-container>
      <slot name="center" />
    </main-wrapper>

    <!-- RIGHT RESIZE HANDLE -->
    <resize-handle 
      v-if="showRightPanel && isDesktop" 
      @mousedown.prevent="onMouseDownRight" 
      :style="{ cursor: isDraggingRight ? 'grabbing' : 'grab' }" 
    />

    <!-- RIGHT PANEL -->
    <main-wrapper v-if="showRightPanel && isDesktop" :style="{ width: rightWidth + 'px' }">
      <scroll-container>
        <artist-panel />
      </scroll-container>
    </main-wrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDevice } from '~/composables/device/useDevice'
import { useSearchStore } from '~/store/searchStore'

const _searchStore = useSearchStore()
const showRightPanel = useState('showRightPanel', () => false)
const { isReady, isDesktop, isMobile } = useDevice()

const MIN_WIDTH = 250
const MAX_WIDTH = 450

const leftWidth = ref(350)
const rightWidth = ref(350)
const isDraggingLeft = ref(false)
const isDraggingRight = ref(false)

let startXLeft = 0
let startWidthLeft = 0
let startXRight = 0
let startWidthRight = 0

// Compute center width dynamically
const centerWidth = computed(() => {
  const total = window.innerWidth
  const right = showRightPanel.value ? rightWidth.value : 0
  return total - leftWidth.value - right
})

// LEFT HANDLE EVENTS
function onMouseDownLeft(e: MouseEvent) {
  isDraggingLeft.value = true
  startXLeft = e.clientX
  startWidthLeft = leftWidth.value
  document.addEventListener('mousemove', onMouseMoveLeft)
  document.addEventListener('mouseup', onMouseUpLeft)
}

function onMouseMoveLeft(e: MouseEvent) {
  if (!isDraggingLeft.value) return
  const dx = e.clientX - startXLeft
  leftWidth.value = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidthLeft + dx))
}

function onMouseUpLeft() {
  isDraggingLeft.value = false
  document.removeEventListener('mousemove', onMouseMoveLeft)
  document.removeEventListener('mouseup', onMouseUpLeft)
}

// RIGHT HANDLE EVENTS
function onMouseDownRight(e: MouseEvent) {
  isDraggingRight.value = true
  startXRight = e.clientX
  startWidthRight = rightWidth.value
  document.addEventListener('mousemove', onMouseMoveRight)
  document.addEventListener('mouseup', onMouseUpRight)
}

function onMouseMoveRight(e: MouseEvent) {
  if (!isDraggingRight.value) return
  const dx = startXRight - e.clientX // inversé car on resize depuis la droite
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
  $--bottombar: 60px;

  .resize-wrapper {
    display: flex;
    padding: 5px;
    background-color: $dark-background;
    width: calc(100% - 23dvw);
    height: 100dvh;
    &.isDesktop{
      flex-direction: row;
      width: 100vw;
      height: calc(100dvh - $--navbar - $--playbar);
    }
    &.isMobile {
      width: 100vw;
      height: 100dvh;
    }
    &__center-panel {
      flex: 2; 
      min-width: 0; 
      overflow: hidden;
    }
  }
</style>
