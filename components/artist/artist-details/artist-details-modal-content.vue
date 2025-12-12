<template>
  <div class="artist-details-modal-content">
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
  </div>
</template>

<script setup lang="ts">
defineProps({
  artist: { type: Object as PropType<IArtist>, required: true}
})
</script>

<style scoped lang="scss">
.artist-details-modal-content {
  
}
</style>