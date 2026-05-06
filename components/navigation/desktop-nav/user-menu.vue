<template>
    <div class='user-menu'>
      <coming-soon>
        <button class='user-menu__btn'>Découvrir Premium</button>
      </coming-soon>
      <coming-soon><h-icon :icon="Notification01Icon" /></coming-soon>
      <coming-soon><h-icon :icon="UserGroup02Icon" /></coming-soon>
      <native-window-handler />
    </div>
</template>

<script setup lang='ts'>
import { Notification01Icon, UserGroup02Icon } from '@hugeicons/core-free-icons';

</script>

<style lang='scss' scoped>
  .user-menu{
    display: flex;
    justify-content: flex-end;
    gap: 25px;
    &__btn {
      background-color: $light-background;
      font-weight: bold;
      border-radius: 20px;
      padding: 1px 14px;
      transition: 0.3s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
</style>