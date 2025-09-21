export const layoutStore = defineStore('layout', () => {
  const showRight = ref(false)
  const rightComponent = ref<Component | null>(null)

  function openRightPanel(component: Component) {
    rightComponent.value = component
    showRight.value = true
  }

  function closeRightPanel() {
    showRight.value = false
    rightComponent.value = null
  }

  // Reset au montage d'une page
  function resetRightPanel() {
    closeRightPanel()
  }

  return {
    showRight,
    rightComponent,
    openRightPanel,
    closeRightPanel,
    resetRightPanel
  }
})
