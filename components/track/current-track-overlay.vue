<template>
  <div class="current-track-overlay" :style="{ background: `linear-gradient(to bottom, ${mainColor}, #000)` }" >
    <img :src="track.album.cover_big" alt="">
    <on-listen />
    <player reverse />
    <artist-details :artist="artist" />
    <section-bento>
      <ul class="contributors">
        <li class="contributors__contributor" v-for="(contributor, index) in contributors" :key="index">
          <div @click="redirect(contributor.type, contributor.id)">
            <p class="name">
              {{ contributor.name }}
            </p>
            <span class="type">{{ contributor.type }}</span>
          </div>
          <button class='follow'>S'abonner</button>
        </li>
      </ul>
      <!-- <pre>{{ contributors }}</pre>  -->
    </section-bento>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close-overlay'])
const props = defineProps({
  mainColor: { type: String, defautl: "#000" },
  track: {type: Object as PropType<ITrack>, required: true},
  artist: {type: Object as PropType<IArtist>, required: true},
  contributors: {type: Array, default: () => []},
})

const router = useRouter()

function redirect(type: string, id: string) {
  emit('close-overlay')
  router.replace(`/${type}/${id}`)
}
</script>

<style scoped lang="scss">
.current-track-overlay {
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 22px;
  &__img-artist {
    border-radius: 20px;
    overflow: hidden;
  }
}

.contributors {
  display: flex;
  flex-direction: column;
  gap: 15px;
  &__contributor {
    display: flex;
    justify-content: space-between;
      .type {
        display: block;
        font-size: 12px;
        text-align: left;
        color: $dark-text-primary;
      }
  }
}
    .follow {
      display: flex;
      justify-content: center;
      padding: 3px 12px;
      color: #fff;
      font-weight: 600;
      border: solid 1px #fff;
      border-radius: 20px;
      height: fit-content;
      &:hover {
        transform: scale(1.03)
      }
    }
</style>