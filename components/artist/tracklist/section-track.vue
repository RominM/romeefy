<template>
  <section class='section-track'>
    <h2-custom :title="title" />
    <tracks-list :track-list="trackList" show-cover :variant="variant" @selected-result="(track)=>$emit('selected-result', track)" />
  </section>
</template>

<script setup lang='ts'>
defineProps({
  title: { type: String, default: ''},
  trackList: { type: Array as PropType<ITrack[]>, required: true },
  variant: { type: Boolean, defautl: false }
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

  @media screen and (max-width: 870px) {
    .section-track {
      gap: 10px;
      &__title {
        font-size: 18px;
      }
    }
  }
</style>