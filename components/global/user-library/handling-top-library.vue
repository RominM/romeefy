<template>
  <div class="handling-top-library">
    <button 
      ref="buttonRef"
      class="handling-top-library__create"
      title="Gérez un dossier, une playlist ou un Jam"
      @click="toggleDropdown"
    >
      <h-icon :icon="Add01Icon" size="18"/>
      Créer
    </button>
    
    <button 
      class="handling-top-library__expand-shrink" 
      :title="`${isExpanded ? 'Réduire' : 'Agrandir'} la Bibliothèque`" 
      @click="isExpanded = !isExpanded"
    >
      <h-icon v-if="!isExpanded" :icon="ArrowExpand01Icon" size="18"/>
      <h-icon v-else :icon="ArrowShrink02Icon" size="18"/>
    </button>

    <teleport to="body">
      <div 
        v-if="isOpen" 
        ref="dropdownRef"
        class="handling-top-library__dropdown" 
        :style="dropdownStyle"
      >
        <create-playlist-module />
      </div>  
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { Add01Icon, ArrowExpand01Icon, ArrowShrink02Icon } from '@hugeicons/core-free-icons'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const isExpanded = ref(false)
const isOpen = ref(false)
const buttonRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)

const dropdownStyle = reactive({
  top: '0px',
  left: '0px'
})

function updateDropdownPosition() {
  if (!buttonRef.value) return
  const rect = buttonRef.value.getBoundingClientRect()
  dropdownStyle.top = `${rect.bottom + window.scrollY + 10}px`
  dropdownStyle.left = `${rect.left + window.scrollX}px`
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
  if (isOpen.value) updateDropdownPosition()
}

function handleClickOutside(event: MouseEvent) {
  if (
    !buttonRef.value?.contains(event.target as Node) &&
    !dropdownRef.value?.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleEscape)
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleEscape)
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition)
})
</script>

<style scoped lang="scss">
.handling-top-library {
  position: relative;
  display: flex;
  gap: 10px;

  &__create,
  &__expand-shrink {
    display: flex;
    gap: 5px;
    transition: 0.3s;
    border-radius: 25px;
    cursor: pointer;
    &:hover {
      background-color: $dark-surface-secondary;
    }
  }

  &__create {
    padding: 8px 12px;
    background-color: $dark-surface;
    font-size: 14px;
  }

  &__expand-shrink {
    padding: 5px 10px;
  }

  &__dropdown {
    position: absolute;
    padding: 10px;
    background-color: $dark-surface;
    border-radius: 8px;
    box-shadow: 0 0 30px #000;
    z-index: 9999;
  }
}
</style>
