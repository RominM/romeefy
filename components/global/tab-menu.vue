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
import type { PropType } from 'vue'
import { ref } from 'vue'

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

    width: calc(100vw - 10px); 
    margin-left: 50%;
    transform: translateX(-50%);

    margin-top: 10px;
    padding: 10px;
    background: linear-gradient(307deg, #1c1b1b 0%, #222222 60%);
    z-index: 9999;

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
    padding: 10px 15px;
  }
}
</style>
