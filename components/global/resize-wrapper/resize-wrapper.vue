<template>
  <div v-if="isReady" :class="['resize-wrapper', { isDesktop, isMobile }]">
    <!-- LEFT PANEL -->
    <main-wrapper 
      v-if="isDesktop" 
      class="resize-wrapper__left-panel" 
      :style="{ width: leftWidth + '%' }"
    >
      <scroll-container>
        <user-library />
      </scroll-container>
    </main-wrapper>

    <!-- LEFT HANDLE -->
    <resize-handle
      v-if="isDesktop && !hideCenterPanel"
      @mousedown.prevent="onMouseDownLeft"
      :style="{ cursor: isDraggingLeft ? 'grabbing' : 'grab' }"
    />

    <!-- CENTER PANEL -->
    <main-wrapper 
      v-if="!hideCenterPanel"
      class="resize-wrapper__center-panel"
      :style="{ flexBasis: centerWidth + '%', opacity: hideCenterPanel ? 0 : 1 }"
    >
      <scroll-container v-if="_searchStore.isActive">
        <search-result-page />
      </scroll-container>
      <slot name="center" />
    </main-wrapper>

    <!-- RIGHT HANDLE -->
    <resize-handle
      v-if="showRightPanel && isDesktop"
      @mousedown.prevent="onMouseDownRight"
      :style="{ cursor: isDraggingRight ? 'grabbing' : 'grab' }"
    />

    <!-- RIGHT PANEL -->
    <main-wrapper
      v-if="showRightPanel && isDesktop"
      :style="{ width: rightWidth + '%' }"
    >
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
import { EGlobalEvent } from '~/types/enum/global/globalEvent'

const _searchStore = useSearchStore()
const showRightPanel = useState('showRightPanel', () => false)
const { isReady, isDesktop, isMobile } = useDevice()

const MIN_WIDTH_PERCENT = 10
const MAX_WIDTH_PERCENT = 50

const leftWidth = ref(25)
const rightWidth = ref(25)
const isDraggingLeft = ref(false)
const isDraggingRight = ref(false)
const hideCenterPanel = ref(false)

let startXLeft = 0
let startWidthLeft = 0
let startXRight = 0
let startWidthRight = 0

// width dynamique du panneau central
const centerWidth = computed(() => {
  if (hideCenterPanel.value) return 0
  const right = showRightPanel.value ? rightWidth.value : 0
  return 100 - leftWidth.value - right
})

// --- DRAG LEFT ---
function onMouseDownLeft(e: MouseEvent) {
  isDraggingLeft.value = true
  startXLeft = e.clientX
  startWidthLeft = leftWidth.value
  document.addEventListener('mousemove', onMouseMoveLeft)
  document.addEventListener('mouseup', onMouseUpLeft)
}
function onMouseMoveLeft(e: MouseEvent) {
  if (!isDraggingLeft.value) return
  const total = window.innerWidth
  const dx = e.clientX - startXLeft
  const deltaPercent = (dx / total) * 100
  leftWidth.value = Math.min(MAX_WIDTH_PERCENT, Math.max(MIN_WIDTH_PERCENT, startWidthLeft + deltaPercent))
}
function onMouseUpLeft() {
  isDraggingLeft.value = false
  document.removeEventListener('mousemove', onMouseMoveLeft)
  document.removeEventListener('mouseup', onMouseUpLeft)
}

// --- DRAG RIGHT ---
function onMouseDownRight(e: MouseEvent) {
  isDraggingRight.value = true
  startXRight = e.clientX
  startWidthRight = rightWidth.value
  document.addEventListener('mousemove', onMouseMoveRight)
  document.addEventListener('mouseup', onMouseUpRight)
}
function onMouseMoveRight(e: MouseEvent) {
  if (!isDraggingRight.value) return
  const total = window.innerWidth
  const dx = startXRight - e.clientX
  const deltaPercent = (dx / total) * 100
  rightWidth.value = Math.min(MAX_WIDTH_PERCENT, Math.max(MIN_WIDTH_PERCENT, startWidthRight + deltaPercent))
}
function onMouseUpRight() {
  isDraggingRight.value = false
  document.removeEventListener('mousemove', onMouseMoveRight)
  document.removeEventListener('mouseup', onMouseUpRight)
}

// --- GLOBAL EVENT LISTENER ---
useGlobalEvents().subscribeTo(
  EGlobalEvent.PANEL_SIZE_UPDATE,
  (payload: { side: 'left' | 'center' | 'right'; expend: boolean } | undefined) => {
    console.log({payload});
    
    if (!payload) return

    if (payload.side === 'left') {
      leftWidth.value = payload.expend ? 100 : 25
      hideCenterPanel.value = payload.expend // on cache le center si le left prend tout
    }

    if (payload.side === 'center') {
      hideCenterPanel.value = payload.expend
    }

    if (payload.side === 'right') {
      rightWidth.value = payload.expend ? 100 : 25
      leftWidth.value = payload.expend ? 0 : 25
      hideCenterPanel.value = payload.expend
    }
  }
)
</script>

<style scoped lang="scss">
.resize-wrapper {
  display: flex;
  background-color: $dark-background;
  width: 100vw;
  height: 100dvh;

  &.isDesktop {
    flex-direction: row;
    height: calc(100dvh - 58px - 100px);
  }

  &__center-panel {
    flex: 2;
    min-width: 0;
    overflow: hidden;
    transition: flex-basis 0.3s ease, opacity 0.3s ease;
  }
}
</style>
