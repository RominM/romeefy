<template>
  <div class="artist-sheet">
    <section-bento padding-px="0">
      <img :src="album.cover_xl" />
    </section-bento>

    <div class="loaded-track" style="display: flex; flex-direction: column; color: #fff;">
      <nuxt-link :to="`/album/${album.id}`" class="link">{{ album.title }}</nuxt-link>
      <nuxt-link :to="`/artist/${artist.id}`" class="link">{{ artist.name }}</nuxt-link>
    </div>

    <section-bento padding-px="0" @click="isOpenArtistModal = true">
      <p>À propos de l'artiste</p>
      <img :src="artist.picture_xl" />
      <div style="padding: 12px;">
        <nuxt-link :to="`/artist/${artist.id}`" class="link">{{ artist.name }}</nuxt-link>
        <p class="text">1 275 834 auditeurs mensuels</p>
        <p class="artist-description text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, repellat amet ad corrupti ullam ab assumenda nostrum in, architecto voluptatum reprehenderit ipsum asperiores nobis rerum aliquam aspernatur tenetur commodi alias.</p>
      </div>
    </section-bento>
    
    <modal v-model:is-open="isOpenArtistModal" max-width="50vw" dismisable show-cross>
      <img :src="artist.picture_xl" style="height: 40vh; width: 100%; object-fit: cover;" />
      <div style="display: flex; gap: 50px; padding: 50px;">
        <aside>
          <p>
            298 724 abonnés
          </p>
          <p>
            298 724 auditeurs chaque mois
          </p>

        </aside>
        
        <main>
          <p style="color: #fff;">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quo quaerat similique? Et repellat labore, 
            deserunt dolorem quisquam atque iure autem. Architecto dolore dolor sunt quibusdam placeat vel, nulla eum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto dolores quaerat, est quam veniam, minus 
            dignissimos laborum eligendi obcaecati magnam eaque neque a consectetur odit, sunt commodi error debitis quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus perferendis in harum, laborum 
            quisquam totam similique voluptas dicta? Quas dolorem quo quasi consequatur ipsam odit, cumque animi 
            temporibus deleniti aspernatur? 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quo quaerat similique? Et repellat labore, 
            deserunt dolorem quisquam atque iure autem. Architecto dolore dolor sunt quibusdam placeat vel, nulla eum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto dolores quaerat, est quam veniam, minus 
            dignissimos laborum eligendi obcaecati magnam eaque neque a consectetur odit, sunt commodi error debitis quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus perferendis in harum, laborum 
            quisquam totam similique voluptas dicta? Quas dolorem quo quasi consequatur ipsam odit, cumque animi 
            temporibus deleniti aspernatur?
          </p>

          <div>
            <img :src="artist.picture_small"/>
            <p>Publié par {{ artist.name }}</p>
          </div>
        </main>
      </div>
    </modal>
  </div>
</template>

<script setup lang="ts">
defineProps({
  artist: { type: Object as PropType<IArtist>, required: true },
  album:{ type: Object as PropType<IAlbum>, required: true }
})

const isOpenArtistModal = ref<boolean>(false)
</script>

<style scoped lang="scss">
.artist-sheet {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .link {
    text-decoration: underline transparent;
    transition: 0.2s;
    &:hover {
      text-decoration: underline #fff;
    }
  }

  .text {
    color: $light-text-secondary;
  }
}

.artist-description {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* nombre de lignes */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>