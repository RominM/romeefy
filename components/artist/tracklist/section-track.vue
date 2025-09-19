<template>
  <section class='section-track'>
    <h3 class='section-track__title'>{{ title }}</h3>
    <tracks-list :track-list="trackList" />
  </section>
</template>

<script setup lang='ts'>
defineProps({
  title: { type: String, default: ''},
  trackList: { type: Object, required: true }
})
</script>

<style lang='scss' scoped>
  .section-track {
    display: flex;
    flex-direction: column;
    gap: 25px;
    &__title {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
    }
  }
</style>