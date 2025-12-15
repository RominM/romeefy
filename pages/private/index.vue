<template>
  <div class="page-test">
    <h1>Test API MusicBrainz Full</h1>

    <input
      v-model="artistName"
      @keyup.enter="fetchArtistFull(artistName)"
      placeholder="Tape un nom d'artiste et Entrée"
    />
    <button @click="fetchArtistFull(artistName)">Rechercher</button>

    <p v-if="loading">Chargement...</p>
    <p v-if="error" style="color:red">{{ error }}</p>

    <div v-if="results.length" class="display">
      <h2>Résultats</h2>
      <div v-for="artist in results" :key="artist.musicBrainzId" style="margin-bottom:1rem; border-bottom:1px solid #ccc; padding-bottom:0.5rem">
        <p><strong>Nom :</strong> {{ artist.name }}</p>
        <p><strong>Score :</strong> {{ artist.score }}</p>
        <p><strong>Type :</strong> {{ artist.type || 'N/A' }}</p>
        <p><strong>Période :</strong> {{ artist.lifeSpan.begin || 'N/A' }} → {{ artist.lifeSpan.end || 'actif' }}</p>
        <p><strong>Tags :</strong> {{ artist.tags.length ? artist.tags.join(', ') : 'N/A' }}</p>
        <p><strong>Aliases :</strong> {{ artist.aliases.length ? artist.aliases.join(', ') : 'N/A' }}</p>
        <p><strong>Bio :</strong> {{ artist.bio || 'Aucune bio trouvée' }}</p>
        <p v-if="artist.wikipedia"><strong>Wikipedia :</strong> <a :href="artist.wikipedia" target="_blank">{{ artist.wikipedia }}</a></p>
        <p v-if="artist.wikidata"><strong>Wikidata :</strong> <a :href="artist.wikidata" target="_blank">{{ artist.wikidata }}</a></p>
        <p v-if="artist.spotify"><strong>Spotify :</strong> <a :href="artist.spotify" target="_blank">{{ artist.spotify }}</a></p>
        <p v-if="artist.socials.length"><strong>Réseaux sociaux :</strong> {{ artist.socials.join(', ') }}</p>
        <p v-if="artist.images.length"><strong>Images :</strong> <span v-for="img in artist.images" :key="img"><a :href="img" target="_blank">🖼️</a> </span></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const artistName = ref('Daft Punk');
const results = ref<any[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchArtistFull = async (name: string) => {
  loading.value = true;
  error.value = null;
  results.value = [];

  try {
    // 1️⃣ Rechercher l'artiste sur MusicBrainz
    const searchUrl = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(name)}&fmt=json`;
    const searchRes = await fetch(searchUrl, { headers: { 'User-Agent': 'Beatly (rominmanogil.off@gmail.com)' } });
    if (!searchRes.ok) throw new Error(`MusicBrainz API error: ${searchRes.status}`);
    const searchData = await searchRes.json();
    const artist = searchData.artists?.[0];
    if (!artist) {
      error.value = 'Aucun artiste trouvé';
      return;
    }

    // 2️⃣ Récupérer toutes les relations
    const detailsUrl = `https://musicbrainz.org/ws/2/artist/${artist.id}?inc=url-rels+artist-rels+tags+aliases+ratings&fmt=json`;
    const detailsRes = await fetch(detailsUrl, { headers: { 'User-Agent': 'Beatly (rominmanogil.off@gmail.com)' } });
    const details = await detailsRes.json();

    const tags = details.tags?.map((t: any) => t.name) || [];
    const aliases = details.aliases?.map((a: any) => a.name) || [];

    const rels = details.relations || [];
    let bio = '';
    let wikipedia = '';
    let wikidata = '';
    let spotify = '';
    const socials: string[] = [];
    const images: string[] = [];

    for (const r of rels) {
      if (!r.url?.resource) continue;
      const url = r.url.resource;
      const type = r.type?.toLowerCase();

      if (type === 'wikipedia' && !wikipedia) {
        wikipedia = url;
        const title = url.split('/').pop()!;
        const lang = url.includes('fr.wikipedia.org') ? 'fr' : 'en';
        const wikiApi = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(title)}&format=json&origin=*`;

        try {
          const wikiRes = await fetch(wikiApi);
          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            const page = Object.values(wikiData.query.pages)[0] as any;
            bio = page.extract || '';
          }
        } catch {}
      } else if (type === 'wikidata' && !wikidata) {
        wikidata = url;
        // on pourrait fetch plus de données depuis Wikidata si nécessaire
      } else if (type.includes('spotify') && !spotify) {
        spotify = url;
      } else if (['facebook', 'instagram', 'twitter', 'youtube'].includes(type)) {
        socials.push(url);
      } else if (type.includes('image')) {
        images.push(url);
      }
    }

    // 3️⃣ Cover Art Archive pour les images d'artiste
    try {
      const coverRes = await fetch(`https://coverartarchive.org/artist/${artist.id}`);
      if (coverRes.ok) {
        const coverData = await coverRes.json();
        if (coverData.images?.length) {
          images.push(...coverData.images.map((i:any) => i.image));
        }
      }
    } catch {}

    // 4️⃣ Résultat final
    results.value = [
      {
        name: artist.name,
        musicBrainzId: artist.id,
        score: artist.score,
        type: artist.type || 'N/A',
        lifeSpan: artist['life-span'],
        tags,
        aliases,
        bio,
        wikipedia,
        wikidata,
        spotify,
        socials,
        images,
      },
    ];

  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// fetch automatique au load
fetchArtistFull(artistName.value);
</script>

<style lang="scss" scoped>
.page-test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  .display {
    overflow: auto;
    height: 80vh;
    width: 100%;
    max-width: 600px;
  }
}
</style>
