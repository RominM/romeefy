<template>
    <div class='search-module'>
      <h-icon :icon="Search01Icon" color="#b3b3b3"/>
      <input class='search-module__input' type="text" placeholder="Que souhaitez-vous écouter ou regarder ?"/>
      <h-icon :icon="DeliveryBox01Icon" color="#b3b3b3"/>
    </div>
</template>

<script setup lang='ts'>
import { DeliveryBox01Icon, Search01Icon } from '@hugeicons/core-free-icons';

    
</script>

<style lang='scss' scoped>
    .search-module{
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      width: 100%;
      height: stretch;
      border-radius: 24px;
      background-color: $dark-surface;
      &__input {
        width: 100%;
        border-right: solid 1px $light-text-secondary;
        &::placeholder {
          color: $light-text-secondary;
        }
      }
    }
</style>