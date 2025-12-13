<template>
  <div class="go-back" :style="background ? '#2b2b2b' : 'transparent'">
    <button class="go-back__btn" @click="goBack">
      <h-icon :icon="ArrowLeft02Icon" color="#fff" />
    </button>
    <h2 class="go-back__title">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';

defineProps({
  title: { type: String, default: "" },
  background: { type: Boolean, default: false }
})
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<style scoped lang="scss">
.go-back {
  display: flex;
  align-items: center;
  padding:  20px;
  width: 100%;
  &__btn {
  position: absolute;
  background-color: color-alpha($dark-surface, 0.4);
  padding: 5px;
  border-radius: 50%;
  }
  &__title {
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }
}
</style>