<template>
  <div class="create-playlist-module">
    <ul class="create-playlist-module__list">
      <li v-for="(playlistButton, index) in playlistButtons" :key="index">
        <nuxt-link @click.prevent="handleClick(playlistButton.link)">
          <create-playlist-button :playlist-button="playlistButton"/>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { DashboardCircleEditIcon, Folder01Icon, MusicNote03Icon, UserGroup02Icon } from '@hugeicons/core-free-icons'
import { useDevice } from '~/composables/device/useDevice'

const emit = defineEmits(['close'])

const { isDesktop } = useDevice()

const playlistButtons = computed<TPlaylistButton[]>(() => {
  return formatedPlaylistButtons() 
})

function formatedPlaylistButtons(): TPlaylistButton[] {
  const buttons: TPlaylistButton[] = [
    {
      link:'/my-playlist',
      icon: MusicNote03Icon,
      title: 'Playlist',
      subtitle: 'Créez une playlist de titre ou d\'épisode.'
    },
    {
      link:'/shared-playlists',
      icon: DashboardCircleEditIcon,
      title: 'Mix à plusieurs',
      subtitle: 'Combinez les goûts de vos proches dans une playlist.'
    }
  ]

  if (isDesktop) {
    buttons.push({
      link:'',
      icon: Folder01Icon,
      title: 'Dossier',
      subtitle: 'Oganisez vos playlists.'
    })
  } else {
    buttons.push({
      link:'',
      icon: UserGroup02Icon,
      title: 'Playlist collaborative',
      subtitle: 'Créez une plalist avec vos proches'
    })
  }

  return buttons
}

const router = useRouter()

function handleClick(link: string) {
  emit('close')
  if (link) router.push(link)
}
</script>

<style scoped lang="scss">
.create-playlist-module {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>