<template>
  <div class='player-banner' :style="{ '--color': colorSecondary }" >
    <div v-if="isDesktop" class="player-banner__content --desktop">
      <player-button :track-id="trackId"/>
      <h-icon :icon="ArrowDataTransferHorizontalIcon" size="45px" />
      <button class='follow'>S'abonner</button>
      <h-icon :icon="MoreHorizontalIcon" size="45px" />
    </div>

    <div v-else class="player-banner__content --small-devices" >
      <p class="followers">{{ nmbFollowers }} auditeurs par mois</p>
      <div class="player-banner__content__wrapper">
        <div class="player-banner__content__wrapper__group">
          <button class='follow'>S'abonner</button>
          <h-icon :icon="MoreVerticalIcon" />
        </div>
        <div class="player-banner__content__wrapper__group">
          <h-icon :icon="ArrowDataTransferHorizontalIcon" size="25px" />
          <player-button :track-id="trackId" size="35px"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ArrowDataTransferHorizontalIcon, MoreHorizontalIcon, MoreVerticalIcon } from '@hugeicons/core-free-icons';
import { useDevice } from '~/composables/device/useDevice';

defineProps({
  colorSecondary: { type: String, required: true},
  trackId:  { type: Number, required: true}
})

const { isDesktop } = useDevice()

const nmbFollowers = computed(() => '180,5 K')

const onLoopSong = ref<boolean>(false)
</script>

<style lang='scss' scoped>
$--color: var(--color);

.player-banner {
  position: relative;
  &__content {
    position: relative;
    display: flex;
    align-items: center;
    background-color: $--color;
    filter: brightness(70%);
    z-index: 9;
    &.--desktop {
      padding: 10px 20px 10px 20px;
      gap: 20px;
    }
    &.--small-devices {
      flex-direction: column;
      gap: 5px;
      padding: 15px 15px 5px;
      color: #fff;
      .followers{
        width: 100%;
        font-size: 12px;
      }
    }
    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      &__group {
        display: flex;
        align-items: center;
        gap: 10px;
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
    
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    display: block;
    background: linear-gradient($--color 55%, transparent 100%);
    filter: brightness(70%);
    height: 155px;
    width: 100%;
    z-index: 8;
  }
}

@media screen and (max-width: 870px) {
  .player-banner {
    &__content{
      background: linear-gradient($--color 50%, transparent 90%);
      &__wrapper__group {
        .follow {
          font-size: 12px;
          border-radius: 4px;
          margin-right: 10px;
        }
      }
    }
    &::after {
      display: none;
    }
  }
}
</style>