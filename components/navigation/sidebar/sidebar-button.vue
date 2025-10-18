<template>
  <button class="sidebar-button">
    <h-icon :icon="button.icon" size="18" />
    <p class="sidebar-button__label">{{ button.label }}</p>
  </button>
</template>

<script setup lang="ts">
defineProps({
  button: { type: Object as PropType<TSideNav>, required: true }
})
</script>

<style scoped lang="scss">
.sidebar-button {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 12px;
}
</style>