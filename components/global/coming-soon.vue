<template>
  <div v-if="page" class="coming-soon-page">
    <h-icon :icon="WrenchIcon" size="52px" color="#555" />
    <p class="coming-soon-page__title">Bientôt disponible</p>
    <p class="coming-soon-page__subtitle">Cette fonctionnalité est en cours de développement</p>
    <nuxt-link class="coming-soon-page__back" to="/">← Retour à l'accueil</nuxt-link>
  </div>

  <div v-else class="coming-soon-wrap" @click.capture="handleClick">
    <slot />
    <Teleport to="body">
      <Transition name="cs">
        <div v-if="visible" class="coming-soon-tip" :style="tipStyle">Bientôt disponible</div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { WrenchIcon } from '@hugeicons/core-free-icons'

defineProps({
  page: { type: Boolean, default: false }
})

const visible = ref(false)
const tipStyle = ref<Record<string, string>>({})
let timer: ReturnType<typeof setTimeout> | null = null

function handleClick(e: MouseEvent) {
  e.stopPropagation()

  tipStyle.value = {
    position: 'fixed',
    top: `${e.clientY - 48}px`,
    left: `${e.clientX}px`
  }

  visible.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
  }, 2000)
}

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped lang="scss">
/* ── PAGE ── */
.coming-soon-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  height: 100dvh;
  color: #fff;
  background-color: $dark-background;

  &__title {
    font-size: 22px;
    font-weight: 700;
    color: $light-surface;
  }

  &__subtitle {
    font-size: 14px;
    color: $light-text-secondary;
  }

  &__back {
    margin-top: 10px;
    font-size: 13px;
    color: $light-text-secondary;
    text-decoration: underline;
    transition: color 0.2s;
    &:hover {
      color: #fff;
    }
  }
}

/* ── INLINE WRAP ── */
.coming-soon-wrap {
  display: contents;
}
</style>

<style lang="scss">
/* ── TOOLTIP (global car Teleport sort du scoped) ── */
.coming-soon-tip {
  z-index: 99999;
  pointer-events: none;
  transform: translateX(-50%);
  background-color: #2a2a2a;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.cs-enter-active,
.cs-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.cs-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}
.cs-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}
</style>
