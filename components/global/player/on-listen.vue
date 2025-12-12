<template>
  <div class="on-listen" >
    <img v-if="track" :class="['on-listen__cover', { isTablet, isMobile }]" :src="track.album.cover_small" alt="" />
    <div :class="['on-listen__artist', { isTablet, isMobile }]">
      <p
        ref="titleRef"
        :class="{ isTablet }"
        :style="scrollStyles.title"
      >
        {{ track?.title }}
      </p>
      <p
        ref="artistRef"
        :class="{ isTablet }"
        :style="scrollStyles.artist"
      >
        {{ track?.artist.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import { useDevice } from '~/composables/device/useDevice';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

const { isDesktop, isTablet, isMobile } = useDevice()

const track = ref<any>();
const titleRef = ref<HTMLElement | null>(null);
const artistRef = ref<HTMLElement | null>(null);

const scrollStyles = reactive<{ title: any; artist: any }>({ title: {}, artist: {} });

useGlobalEvents().subscribeTo(EGlobalEvent.TRACK_DATA, (payload) => {
  track.value = payload;

  nextTick(() => {
    updateScroll(titleRef.value, scrollStyles, 'title');
    updateScroll(artistRef.value, scrollStyles, 'artist');
  });
});

function updateScroll(el: HTMLElement | null, styleObj: any, key: 'title' | 'artist') {
  if (!el) return;
  const parentWidth = el.parentElement?.offsetWidth || 0;
  const textWidth = el.scrollWidth;

  if (textWidth > parentWidth) {
    const distance = textWidth - parentWidth;
    
    const duration = distance / 25;
    styleObj[key] = {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      animation: `scrollPingPong ${duration}s linear infinite alternate`
    };
    el.style.setProperty('--scroll-distance', `${distance}px`);
  } else {
    styleObj[key] = { whiteSpace: 'nowrap', display: 'inline-block' };
  }
}


</script>

<style scoped lang="scss">
.on-listen {
  display: flex;
  gap: 10px;
  color: #fff;
  width: 100%;
  max-width: 87%;

  &__cover {
    width: 72px;
    height: 72px;
    object-fit: cover;
    &.isTablet {
      width: 40px;
      height: 40px;
    }
    &.isMobile {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
  }

  &__artist {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 100%;
    overflow: hidden;
    &.isTablet{
      gap: 0;
    }
    &.isMobile {
      gap: 0;
    }

    :first-child {
      font-size: 14px;
      font-weight: 600;
      color:  $light-text-primary;
      &.isTablet {
        font-size: 12px;
        font-weight: 300;
      }

    }

    :nth-child(2) {
      font-size: 12px;
      color: $light-background;
      font-weight: 300;
      &.isTablet {
        font-size: 10px;
      }

    }
  }
}

@keyframes scrollPingPong {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(var(--scroll-distance) * -1));
  }
}
</style>
