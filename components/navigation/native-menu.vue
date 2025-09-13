<template>
    <div class='native-menu'>
      <h-icon :icon="MoreHorizontalIcon" class='icon--action'/>
      
      <div class="native-menu__arrows">
        <h-icon :icon="ArrowLeft01Icon" :color="isDisabledLeft ? '#292929':'#fff'" :class="isDisabledLeft ? 'icon--disbale' :'icon--action'"/>
        <h-icon :icon="ArrowRight01Icon" :color="isDisabledRight ? '#292929':'#fff'" :class="isDisabledLeft ? 'icon--disbale' :'icon--action'"/>
      </div>
    </div>
</template>

<script setup lang='ts'>
import { ArrowLeft01Icon, ArrowRight01Icon, MoreHorizontalIcon } from '@hugeicons/core-free-icons';

const isDisabledLeft = ref<boolean>(true)
const isDisabledRight = ref<boolean>(true)
</script>

<style lang='scss' scoped>
  .native-menu{
    display: flex;
    &__arrows {
      display: flex;
    }

    .icon {
      &--action {
        cursor: pointer;
      }
      &--disbale {
        cursor: no-drop;
      }
    }
  }
</style>