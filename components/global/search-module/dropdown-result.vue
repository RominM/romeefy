<template>
  <div :class="['dropdown-result', {'--show': showDropdown}]">
    <p>Recherches récentes</p>
    <ul >
      <li
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="selectHistory(item)"
      >
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
  margin-top: 5px;
  width: 100%;
  padding: 20px;
  background-color: $dark-surface;
  color: #fff;
  border-radius: 8px;
  opacity: 0;
  transition: 0.3s;
  z-index: 999;
  &.--show {
    opacity: 1;
  }
}
</style>