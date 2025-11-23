<template>
  <div class="release-counter">
    <div class="release-counter__block">
      <span class="release-counter__block__label">{{ remaining.days }}</span>
      <span class="release-counter__block__value">Jours</span>
    </div>
    <hr class="separator">
    <div class="release-counter__block">
      <span class="release-counter__block__label">{{ remaining.hours }}</span>
      <span class="release-counter__block__value">Heures</span>
    </div>
    <hr class="separator">
    <div class="release-counter__block">
      <span class="release-counter__block__label">{{ remaining.minutes }}</span>
      <span class="release-counter__block__value">Minutes</span>
    </div>
    <hr class="separator">
    <div class="release-counter__block">
      <span class="release-counter__block__label">{{ remaining.seconds }}</span>
      <span class="release-counter__block__value">Secondes</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  releaseDate: { type: Date, required: true}
})

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const remaining = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const updateRemaining = () => {
  const diff = props.releaseDate.getTime() - Date.now()

  remaining.value.days = Math.floor(diff / DAY)
  remaining.value.hours = Math.floor((diff % DAY) / HOUR)
  remaining.value.minutes = Math.floor((diff % HOUR) / MINUTE)
  remaining.value.seconds = Math.floor((diff % MINUTE) / SECOND)
}

let interval: number

onMounted(() => {
  updateRemaining()
  interval = window.setInterval(updateRemaining, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped lang="scss">
.release-counter {
  display: flex;
  width: fit-content;
  border-radius: 8px;
  background-color: #ffffff1f;
  margin-top: 20px;
  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85px;
    padding: 10px;
    &__label {
      font-size: 26px;
      font-weight: 700;
    }
    &__value {
      font-size: 12px;
      font-weight: 300;
      color: grey;
    }
    
  }
  .separator {
    align-self: center;
    height: 30px;
    border: solid 1px grey;
  }
}
</style>