<template>
  <div class="on-listen">
    <img v-if="track" class="on-listen__cover" :src="track.album.cover_small" alt="" />
    <div class="on-listen__artist">
      <p
        ref="titleRef"
        :style="scrollStyles.title"
      >
        {{ track?.title }}
      </p>
      <p
        ref="artistRef"
        :style="scrollStyles.artist"
      >
        {{ track?.artist.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

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
    const duration = distance / 30; // ajustable: plus grand = plus lent
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

  &__cover {
    width: 72px;
    height: 72px;
    object-fit: cover;
  }

  &__artist {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 100%;
    overflow: hidden;

    :first-child {
      font-size: 14px;
      font-weight: 600;
      color: $light-background;
    }

    :nth-child(2) {
      font-size: 12px;
      color: $light-text-primary;
    }
  }
}

// Animation ping-pong dynamique
@keyframes scrollPingPong {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(var(--scroll-distance) * -1));
  }
}
</style>
