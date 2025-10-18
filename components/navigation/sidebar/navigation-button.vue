<template>
  <button class="navigation-button">
    <h-icon :icon="button.icon" size="18" />
    <p class="navigation-button__label">{{ button.label }}</p>
  </button>
</template>

<script setup lang="ts">
defineProps({
  button: { type: Object as PropType<TSideNav>, required: true }
})
</script>

<style scoped lang="scss">
.navigation-button {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 12px;
}

@media screen and (max-width: 540px ) {
  .navigation-button {
    flex-direction: column;
    font-size: 10px;
    margin: auto;
  }
}
</style>