<template>
  <div :class="['dropdown-result', {'--show': showDropdown}]">
    <h6 class="dropdown-result__title">Recherches récentes</h6>
    <ul>
      <li
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="selectHistory(item)"
      >
        <!-- <search-result-item :item="item" /> -->
        {{ item }}
      </li>
    </ul>
    <button-cta label="Effacer les dernières recherches" />
  </div>
</template>

<script setup lang="ts">
const query = ref('')
const searchHistory = ref<string[]>(['',''])
const showDropdown = defineModel<boolean>({ default: false })

function selectHistory(item: string) {
  query.value = item
  showDropdown.value = false
}
</script>

<style scoped lang="scss">
.dropdown-result {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
  width: 100%;
  padding: 20px;
  background-color: $dark-surface;
  color: #fff;
  border-radius: 8px;
  opacity: 0;
  transition: 0.3s;
  z-index: 999;
  &__title {
    font-size: 14px;
    line-height: 14px;
  }
  &.--show {
    opacity: 1;
  }
}
</style>