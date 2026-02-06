<template>
  <div
    class="cockroach-wrapper"
    :style="wrapperStyle"
  >
    <div class="hit-area head-area" @pointerdown.prevent="onHeadTap"></div>
    <img
      :src="cockroachImg"
      alt="Madagascar Hissing Cockroach"
      class="cockroach-img"
      :class="{ hissing: isHissing }"
      draggable="false"
    />
    <HissEffect v-if="isHissing" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import cockroachImg from '../assets/cockroach.png'
import HissEffect from './HissEffect.vue'

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  isHissing: { type: Boolean, default: false },
})

const emit = defineEmits(['head-tap'])

const wrapperStyle = computed(() => ({
  left: `${props.x}%`,
  top: `${props.y}%`,
}))

function onHeadTap() {
  if (navigator.vibrate) {
    navigator.vibrate(30)
  }
  emit('head-tap')
}
</script>

<style scoped>
.cockroach-wrapper {
  position: absolute;
  width: 18vmin;
  height: auto;
  transform: translate(-50%, -50%);
  transition: left 0.35s ease-out, top 0.35s ease-out;
  z-index: 10;
  user-select: none;
  -webkit-user-select: none;
}

.cockroach-img {
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.4));
}

.cockroach-img.hissing {
  animation: wiggle 0.15s ease-in-out 2;
}

.hit-area {
  position: absolute;
  z-index: 20;
  cursor: pointer;
  touch-action: manipulation;
}

.head-area {
  right: 0;
  top: 10%;
  width: 45%;
  height: 80%;
  border-radius: 50%;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-4deg) scale(1.03); }
  75% { transform: rotate(4deg) scale(1.03); }
}
</style>
