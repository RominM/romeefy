<template>
  <section class="event-artist">
    <h2 class="event-artist__title">En tournée</h2>
    <ul class="event-list">
      <li v-for="(event, index) in events" :key="index" class="event-item">
        <event-card :event="event" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  artistName: { type: String, required: true }
})

const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nice', 'Nantes']

const events = ref([
  { date: new Date('2025-09-19'), time: 'mar. 20:00 • LÙSINE A MUSIQUE', city: 'Paris', artist: props.artistName },
  { date: new Date('2025-09-22'), time: 'ven. 20:30 • LÙSINE A MUSIQUE', city: 'Lyon', artist: props.artistName },
  { date: new Date('2025-10-01'), time: 'mar. 20:00 • LÙSINE A MUSIQUE', city: 'Marseille', artist: props.artistName },
  { date: new Date('2025-10-07'), time: 'ven. 20:30 • LÙSINE A MUSIQUE', city: 'Toulouse', artist: props.artistName },
  { date: new Date('2025-10-12'), time: 'mar. 20:00 • LÙSINE A MUSIQUE', city: 'Bordeaux', artist: props.artistName },
  { date: new Date('2025-10-15'), time: 'ven. 20:30 • LÙSINE A MUSIQUE', city: 'Lille', artist: props.artistName },
  { date: new Date('2025-10-21'), time: 'mar. 20:00 • LÙSINE A MUSIQUE', city: 'Nice', artist: props.artistName },
  { date: new Date('2025-10-28'), time: 'ven. 20:30 • LÙSINE A MUSIQUE', city: 'Nantes', artist: props.artistName },
])
</script>

<style scoped lang="scss">
.event-artist {
  &__title {
    color: #fff;
  }
  .event-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Optionnel pour que ce soit responsive */
@media (max-width: 1024px) {
  .event-artist .event-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .event-artist .event-list {
    grid-template-columns: 1fr;
  }
}
</style>
