<template>
  <div v-if="isReady" :class="['resize-wrapper', { isDesktop, isMobile }]">
    <!-- LEFT PANEL -->
    <main-wrapper 
      v-if="isDesktop" 
      class="resize-wrapper__left-panel" 
      :style="{ width: leftWidth + '%' }"
    >
      <scroll-container v-if="!isLeftCollapsed">
        <user-library  />
      </scroll-container>
      <library-mini-menu v-else />
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
import { useDevice } from '~/composables/device/useDevice'
import { useSearchStore } from '~/store/searchStore'
import { EGlobalEvent } from '~/types/enum/global/globalEvent'
import { ELocalStorageKey } from '~/types/enum/global/localStorageKeys'

const _searchStore = useSearchStore()
const showRightPanel = useState('showRightPanel', () => false)

const { isReady, isDesktop, isMobile } = useDevice()

const MIN_WIDTH_PX = 350
const MAX_WIDTH_PX = 450
const EXPAND_THRESHOLD_PX = 60

const leftWidth = ref<number>(25)
const rightWidth = ref<number>(25)
const isDraggingLeft = ref<boolean>(false)
const isDraggingRight = ref<boolean>(false)
const hideCenterPanel = ref<boolean>(false)
const isLeftCollapsed = ref<boolean>(false)

let startXLeft = 0
let startWidthLeft = 0
let startXRight = 0
let startWidthRight = 0

const minLeftWidthPercent = computed(() => {
  return (MIN_WIDTH_PX / window.innerWidth) * 100
})

const minRightWidthPercent = computed(() => {
  return (MIN_WIDTH_PX / window.innerWidth) * 100
})

const maxRightWidthPercent = computed(() => {
  return (MAX_WIDTH_PX / window.innerWidth) * 100
})

const maxLeftWidthPercent = computed(() => {
  return (MAX_WIDTH_PX / window.innerWidth) * 100
})

const collapsedLeftPercent = computed(() => {
  return (EXPAND_THRESHOLD_PX / window.innerWidth) * 100
})

const centerWidth = computed(() => {
  if (hideCenterPanel.value) return 0
  const right = showRightPanel.value ? rightWidth.value : 0
  return 100 - leftWidth.value - right
})

onMounted(() => {
  const collapse = useLocalStorage<boolean>().get(ELocalStorageKey.LIBRARY_COLLAPSE, false)
  toggleLeft(collapse ?? false)
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

  if (isLeftCollapsed.value) {
    if (dx > EXPAND_THRESHOLD_PX) {
      expandLeft(e.clientX)
    }
    return
  }

  const newVal = startWidthLeft + deltaPercent

  if (newVal <= minLeftWidthPercent.value) {
    collapseLeft()
    return
  }

  leftWidth.value = Math.min(
    maxLeftWidthPercent.value,
    Math.max(minLeftWidthPercent.value, newVal)
  )
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
  const newVal = startWidthRight + deltaPercent

  rightWidth.value = Math.max(
    minRightWidthPercent.value,
    Math.min(maxRightWidthPercent.value, newVal)
  )
  
}

function onMouseUpRight() {
  isDraggingRight.value = false
  document.removeEventListener('mousemove', onMouseMoveRight)
  document.removeEventListener('mouseup', onMouseUpRight)
}

function collapseLeft() {
  isLeftCollapsed.value = true
  useLocalStorage().set(ELocalStorageKey.LIBRARY_COLLAPSE, isLeftCollapsed.value)

  leftWidth.value = collapsedLeftPercent.value
}

function expandLeft(clientX?: number) {
  isLeftCollapsed.value = false
  useLocalStorage().set(ELocalStorageKey.LIBRARY_COLLAPSE, isLeftCollapsed.value)

  const defaultExpand = 15
  const safeExpand = Math.max(minLeftWidthPercent.value + 2, defaultExpand)
  leftWidth.value = safeExpand

  startWidthLeft = leftWidth.value
  if (typeof clientX === 'number') {
    startXLeft = clientX
  }
}

function toggleLeft(payload: boolean) {
  payload ? collapseLeft() : expandLeft()
}

watch(() => isLeftCollapsed.value, (collapsed) => {
  if (collapsed) {
    leftWidth.value = collapsedLeftPercent.value
  }
})

/* --- GLOBAL EVENT LISTENER --- */
useGlobalEvents().subscribeTo(
  EGlobalEvent.PANEL_SIZE_UPDATE,
  (payload: { side: 'left' | 'center' | 'right'; expend: boolean } | undefined) => {
    
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

useGlobalEvents().subscribeTo(EGlobalEvent.COLLAPSE_LIBRARY, (payload: boolean | undefined) => {
  toggleLeft(payload ?? false)
})
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
