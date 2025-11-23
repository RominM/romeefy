<template>
  <div v-if="artist && album" class="artist-panel" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <header-panel :title="artist.name" :hovered="isHovered" @expend="toggleExpendArtist" @collapse="toggleCollapseArtist"/>
    <artist-sheet :artist="artist" :album="album"/>
  </div>
</template>

<script setup lang="ts">
import { playerStore } from '~/store/playerStore';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

const _player = playerStore()
const showRightPanel = useState('showRightPanel', () => false)
const artist = computed<ILiteArtist>(() => _player.currentArtist)
const album = computed<ILiteAlbum>(()=> _player.currentAlbum)

const isHovered = ref<boolean>(false)
const isExpend = ref<boolean>(false)

function toggleExpendArtist() {
  isExpend.value = !isExpend.value
  useGlobalEvents().emitEvent(EGlobalEvent.PANEL_SIZE_UPDATE, {side: 'right', expend: isExpend.value})
}

function toggleCollapseArtist() {
  console.log('collapsed');
  
  showRightPanel.value = false
}
</script>

<style scoped lang="scss">
.artist-panel {
  position: relative;
  overflow: hidden;
  padding: 14px;
}
</style>