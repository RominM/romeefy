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
        <hr
          v-if="activePanel === panel"
          class="tab-menu__tabs__tab__underline"
        />
      </li>
    </ul>

    <div class="tab-menu__content">
      <slot :name="`panel-${activePanel}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  panels: { type: Array as PropType<string[]>, required: true }
})

const activePanel = ref(props.panels[0])
</script>

<style scoped lang="scss">
.tab-menu {
  position: relative;

  &__tabs {
    position: sticky;
    top: 0;
    display: flex;
    gap: 20px;
    padding: 10px 20px 0;
    width: 100%;
    z-index: 999;
    background-color: $dark-surface;
    &__tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      transition: color 0.2s ease;

      &__label {
        color: #ccc;
        font-weight: 300;
        font-size: 14px;
      }

      &.--active .tab-menu__tabs__tab__label {
        color: #fff;
        font-weight: 600;
      }

      &__underline {
        width: 100%;
        border: 1px solid #1db954;
        border-radius: 1px;
      }
    }
  }

  &__content {
    width: 100%;
  }
}
</style>
