<template>
  <div class="event-card">
    <div class="event-card__date">
        <span class="event-card__date__month">{{ formatMonth(event.date) }}</span>
        <span class="event-card__date__day">{{ formatDay(event.date) }}</span>
      </div>
      <div class="event-card__content">
        <span class="event-card__content__city">{{ event.city }}</span>
        <span class="event-card__content__artist">{{ event.artist }}</span>
        <span class="event-card__content__time">{{ event.time }}</span>
      </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  event: { type: Object, required: true }
})

function formatMonth(date: Date) {
  return date.toLocaleString('fr-FR', { month: 'short' })
}

function formatDay(date: Date) {
  return date.getDate()
}
</script>

<style scoped lang="scss">
.event-card {
  display: flex;
  gap: 15px;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  &__date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 65px;
    height: 65px;
    font-weight: 700;
    background-color: rgb(47, 47, 47);
    border-radius: 5px;
    line-height: 24px;
    &__day {
      font-size: 22px;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    &__city {
      font-weight: 700;
    }
    &__artist,
    &__time {
      color: grey;
      font-size: 12px;
    }
  }
  &:hover {
    background-color: rgba(52, 52, 52, 0.541);
  }
}
</style>