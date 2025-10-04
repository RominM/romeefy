<template>
  <div class="search-module">
    <div :class="['main-nav', { '--active': showDropdown }]">
      <input-search @is-focus="handleFocus"/>
      <nuxt-link to="/parcourir">
        <h-icon :icon="DeliveryBox01Icon" color="#b3b3b3"/>
      </nuxt-link>
    </div>
    <dropdown-result v-model="showDropdown" />
  </div>
</template>

<script setup lang='ts'>
import { DeliveryBox01Icon } from '@hugeicons/core-free-icons';

const showDropdown = defineModel<boolean>()

function handleFocus(isActive: boolean) {
  console.log('coucou', isActive);
  
  showDropdown.value = isActive
}
    
</script>

<style lang='scss' scoped>
.search-module {
  position: relative;
      width: 100%;

}

    .main-nav {
      display: flex;
      align-items: center;
      gap: 10px;
      padding:6px;
      border-radius: 24px;
      background-color: $dark-surface;
      border: solid 2px $dark-surface;
      transition: 0.3s;
      &.--active {
        border: solid 2px #fff;
      }
    }
</style>