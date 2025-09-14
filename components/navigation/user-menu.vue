<template>
    <div class='user-menu'>
      <button class='user-menu__btn'>Découvrir Premium</button>
      <h-icon :icon="Notification01Icon" />
      <h-icon :icon="UserGroup02Icon" />
      <user-avatar/>
      <native-window-handler />
    </div>
</template>

<script setup lang='ts'>
import { Notification01Icon, UserGroup02Icon } from '@hugeicons/core-free-icons';

</script>

<style lang='scss' scoped>
  .user-menu{
    display: flex;
    gap: 25px;
    &__btn {
      background-color: #fff;
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