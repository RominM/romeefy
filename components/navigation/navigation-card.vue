<template>
  <nuxt-link :to="redirect" :class="['navigation-card', { small }]" :style="{ background: color }">
    <h3 class="navigation-card__title">{{ capitalized }}</h3>
    <div
      :class="['navigation-card__img', { small }]"
      :style="{ backgroundImage: `url(${picture})` }"
    ></div>
  </nuxt-link>
</template>

<script setup lang="ts">

const props = defineProps({
  title: { type: String, required: true },
  picture: { type: String, required: true },
  color: { type: String, required: true },
  redirect: { type: String, required: true },
  small: { type: Boolean, default: false },
})

const capitalized = computed(
  () => props.title.charAt(0).toLocaleUpperCase() + props.title.slice(1)
)
</script>

<style scoped lang="scss">
.navigation-card {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  height: 110px;
  border-radius: 6px;
  color: #fff;
  overflow: hidden;
  &.small {
    height: 75px;
  }

  &__title {
    font-size: 14px;
  }

  &__img {
    width: 100px;
    height: 100px;
    transform: rotate(25deg);
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: 30px;
    margin-right: -12px;
    &.small {
      width: 70px;
      height: 70px;
      margin-top: 25px;
      margin-right: -5px;
    }
  }
}
</style>
