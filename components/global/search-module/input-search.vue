<template>
  <div class="input-search">
    <h-icon :icon="Search01Icon" color="#b3b3b3"/>
    <input 
      class='input-search__input' 
      type="text" 
      placeholder="Que souhaitez-vous écouter ou regarder ?"
      @focus="emit('is-focus', true)"
      @blur="emit('is-focus', false)"
    />
  </div>
</template>

<script setup lang="ts">
import { Search01Icon } from '@hugeicons/core-free-icons';

const emit = defineEmits(['is-focus'])
</script>

<style scoped lang="scss">
.input-search {
        display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;

        &__input {
        width: 100%;
        color: #ccc;
        border-right: solid 1px $light-text-secondary;
        &::placeholder {
          color: $light-text-secondary;
        }
      }
  
}
</style>