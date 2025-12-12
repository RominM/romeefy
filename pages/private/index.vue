<template>
    <div class='private-test'>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const API_KEY = "sOcT9fGiuMr5OdFhdL1u18ZG944sUTiV";
const CLASSIFICATIONS_URL = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${API_KEY}`;

onMounted(async () => {
  try {
    const genres = await fetchAllGenres();
    console.log("Ticketmaster genres:", genres);
  } catch (err) {
    console.error(err);
  }
});

async function fetchAllGenres() {
  const res = await fetch(CLASSIFICATIONS_URL);
  if (!res.ok) throw new Error("Erreur lors de la récupération des classifications");

  const data = await res.json();
  console.log({data});
  
  const classifications = data._embedded?.classifications || [];

  const genres: Array<{ segment: string; genre: string; id: string; subgenres: any[] }> = [];

  classifications.forEach((c: any) => {
    const segmentName = c.segment?.name || "Unknown";
    (c._embedded?.genres || []).forEach((g: any) => {
      genres.push({
        segment: segmentName,
        genre: g.name,
        id: g.id,
        subgenres: (g._embedded?.subgenres || []).map((sg: any) => ({
          id: sg.id,
          name: sg.name,
        })),
      });
    });
  });

  return genres;
}
</script>


<style lang='scss' scoped>
    .private-test{}
</style>