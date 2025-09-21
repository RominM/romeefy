<template>
  <div class="scroller-container" :class="{ 'is-scrollable': isScrollable }" ref="scroller">
    <div class="scroller-container__content" ref="content" @scroll="onScroll">
      <slot />
    </div>

    <div class="scroller-container__overlay-track" ref="track">
      <div class="scroller-container__overlay-track__overlay-thumb" ref="thumb" @mousedown.prevent="startDrag"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['target'])

const scroller = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const thumb = ref<HTMLElement | null>(null)

let dragging = false
let startY = 0
let startScrollTop = 0
let ro: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  updateThumb()
  window.addEventListener('resize', updateThumb)
  ro = new ResizeObserver(updateThumb)
  if (content.value) ro.observe(content.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateThumb)
  if (ro && content.value) ro.disconnect()
})

function clamp(v: number, a = 0, b = 1) {
  return Math.min(Math.max(v, a), b)
}

const isScrollable = ref(false)

function updateThumb() {
  if (!content.value || !track.value || !thumb.value) return
  const el = content.value
  isScrollable.value = el.scrollHeight > el.clientHeight
  if (!isScrollable.value) return

  const trackH = track.value.clientHeight
  const thumbH = Math.max((el.clientHeight / el.scrollHeight) * trackH, 20)
  const scrollRatio = el.scrollTop / Math.max(el.scrollHeight - el.clientHeight, 1)
  const top = scrollRatio * (trackH - thumbH)

  thumb.value.style.height = `${thumbH}px`
  thumb.value.style.transform = `translateY(${top}px)`
}



function onScroll(event: Event) {
  const target = event.target as HTMLElement
  emit('target', target)
  updateThumb()
}

function startDrag(e: MouseEvent) {
  if (!content.value) return
  dragging = true
  startY = e.clientY
  startScrollTop = content.value.scrollTop
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!dragging || !content.value || !track.value || !thumb.value) return
  const trackH = track.value.clientHeight
  const thumbH = thumb.value.clientHeight
  const dy = e.clientY - startY
  const thumbRange = Math.max(trackH - thumbH, 1)
  const scrollableRange = Math.max(content.value.scrollHeight - content.value.clientHeight, 1)
  const deltaScroll = (dy / thumbRange) * scrollableRange
  content.value.scrollTop = clamp(startScrollTop + deltaScroll, 0, scrollableRange)
}

function stopDrag() {
  dragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}
</script>

<style lang="scss" scoped>
$--navbar: 58px;
$--playbar: 100px;
$--global-padding: 20px;

.scroller-container {
  position: relative;
  height: 100%; 
  z-index: 99;

  &__content {
    height: 100%; 
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__overlay-track {
    position: absolute;
    top: 8px;
    bottom: 8px;
    right: 0;
    display: none;
    width: 12px;
    opacity: 0;
    transition: 0.3s;
    z-index: 99;
    &__overlay-thumb {
      background: rgba(128, 128, 128, 0.678);
      min-height: 20px;
      cursor: pointer;
      transform: translateY(0);
      transition: background 0.12s;
      &:hover {
        filter: brightness(1.05);
      }
    }
  }



  &:hover &__overlay-track {
    opacity: 1;
  }
}

  .scroller-container.is-scrollable:hover .scroller-container__overlay-track {
  display: block;
  opacity: 1;
}
</style>
