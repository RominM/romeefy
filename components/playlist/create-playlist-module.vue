<template>
  <div class="create-playlist-module">
    <ul class="create-playlist-module__list">
      <li v-for="(playlistButton, index) in playlistButtons" :key="index">
        <nuxt-link :to="playlistButton.link">
          <crate-playlist-button :playlist-button="playlistButton"/>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { DashboardCircleEditIcon, Folder01Icon, MusicNote03Icon, UserGroup02Icon } from '@hugeicons/core-free-icons'
import { useDevice } from '~/composables/device/useDevice'

const { isDesktop } = useDevice()

const playlistButtons = computed<TPlaylistButton[]>(() => {
  return formatedPlaylistButtons() 
})

function formatedPlaylistButtons(): TPlaylistButton[] {
  const buttons: TPlaylistButton[] = [
    {
      link:'',
      icon: MusicNote03Icon,
      title: 'Playlist',
      subtitle: 'Créez une playlist de titre ou d\'épisode.'
    },
    {
      link:'',
      icon: DashboardCircleEditIcon,
      title: 'Mix à plusieurs',
      subtitle: 'Combinez les goûts de vos proches dans une playlist.'
    }
  ]

  if (!isDesktop) {
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

</script>

<style scoped lang="scss">
.create-playlist-module {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>