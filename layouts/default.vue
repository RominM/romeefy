<template>
  <div :class="['default-layout', {'--flex': isTablet}]">
    <navbar v-if="isDesktop" />
    <sidebar v-if="isTablet" @action-nav="handleAction" />
    <slot />
    <player-section v-if="isDesktop" />
    <bottom-bar v-if="isMobile" @action-nav="handleAction" />

    <modal v-if="isTablet" v-model:is-open="isOpen" dismisable>
      <component :is="component" @close="isOpen = false" />
    </modal>

    <!-- <dropup-content v-if="isMobile">
      <component :is="component" @close="isOpen = false" />
    </dropup-content> -->
  </div>
</template>

<script setup lang='ts'>
import CreatePlaylistModule from '~/components/playlist/create-playlist-module.vue'
import { useDevice } from '~/composables/device/useDevice'
import { ENavAction } from '~/types/enum/global/nav'

const { isDesktop, isTablet, isMobile } = useDevice()

const isOpen = ref<boolean>(false)
const component = shallowRef()

function handleAction(action: ENavAction) {
  if (action === ENavAction.CREATE_PLAYLIST) {
    component.value = CreatePlaylistModule
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
