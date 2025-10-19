<template>
  <div class="tab-menu">
    <ul class="tab-menu__tabs">
      <li
        v-for="(panel, index) in panels"
        :key="`tab-${index}`"
        class="tab-menu__tabs__tab"
        :class="{ '--active': activePanel === panel }"
        @click="activePanel = panel"
      >
        <p class="tab-menu__tabs__tab__label">{{ panel }}</p>
        <hr v-if="activePanel === panel" class="tab-menu__tabs__tab__underline" />
      </li>
    </ul>

    <div class="tab-menu__content">
      <slot :name="`panel-${activePanel}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  panels: { type: Array as PropType<string[]>, required: true }
})

const activePanel = ref(props.panels[0])
</script>

<style scoped lang="scss">
.tab-menu {
  &__tabs {
    position: sticky;
    top: 0;
    display: flex;
    gap: 20px;
    padding-top: 10px;
    width: 100%;
    background-color: $dark-background;
    z-index: 999;
    &__tab {
      display: flex;
      flex-direction: column;
      gap: 5px;
      &__label {
        color: #ccc;
        font-weight: 300;
        font-size: 14px;
      }
      
      &.--active {
        color: #fff;
        font-weight: 900;
      }
      &__underline {
        border: 1px solid green;
      }
    }
  }

  &__content {
    width: 100%;
  }
}
</style>
