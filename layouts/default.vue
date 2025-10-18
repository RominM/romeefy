<template>
  <div :class="['default-layout', {'--flex': !isDesktop}]">
    <navbar v-if="isDesktop" />
    <sidebar v-if="isTablet" @action-nav="handleAction" />
    <slot />
    <player-section v-if="isDesktop" />

    <modal v-model:is-open="isOpen" dismisable>
      <component :is="component" />
    </modal>
  </div>
</template>

<script setup lang='ts'>
import CreatePlaylist from '~/components/playlist/create-playlist.vue'
import { useDevice } from '~/composables/device/useDevice'
import { ENavAction } from '~/types/enum/global/nav'

const { isDesktop, isTablet } = useDevice()

const isOpen = ref<boolean>(false)
const component = shallowRef()

function handleAction(action: ENavAction) {
  if (action === ENavAction.CREATE_PLAYLIST) {
    component.value = CreatePlaylist
  }
  isOpen.value = true
}
</script>

<style scoped lang='scss'>
.default-layout {
  &.--flex {
    display: flex;
  }
}
</style>
