<template>
  <div
    class="cockroach-wrapper"
    :style="wrapperStyle"
  >
    <div class="hit-area head-area" @pointerdown.prevent="onHeadTap"></div>
    <svg
      class="cockroach-svg"
      :class="{ hissing: isHissing }"
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- legs back -->
      <line x1="55" y1="50" x2="25" y2="20" stroke="#3e1f0d" stroke-width="3" stroke-linecap="round" />
      <line x1="25" y1="20" x2="15" y2="10" stroke="#3e1f0d" stroke-width="2" stroke-linecap="round" />
      <line x1="55" y1="70" x2="25" y2="100" stroke="#3e1f0d" stroke-width="3" stroke-linecap="round" />
      <line x1="25" y1="100" x2="15" y2="110" stroke="#3e1f0d" stroke-width="2" stroke-linecap="round" />

      <!-- legs mid -->
      <line x1="80" y1="48" x2="55" y2="18" stroke="#3e1f0d" stroke-width="3" stroke-linecap="round" />
      <line x1="55" y1="18" x2="45" y2="8" stroke="#3e1f0d" stroke-width="2" stroke-linecap="round" />
      <line x1="80" y1="72" x2="55" y2="102" stroke="#3e1f0d" stroke-width="3" stroke-linecap="round" />
      <line x1="55" y1="102" x2="45" y2="112" stroke="#3e1f0d" stroke-width="2" stroke-linecap="round" />

      <!-- legs front -->
      <line x1="115" y1="48" x2="135" y2="22" stroke="#3e1f0d" stroke-width="3" stroke-linecap="round" />
      <line x1="135" y1="22" x2="145" y2="12" stroke="#3e1f0d" stroke-width="2" stroke-linecap="round" />
      <line x1="115" y1="72" x2="135" y2="98" stroke="#3e1f0d" stroke-width="3" stroke-linecap="round" />
      <line x1="135" y1="98" x2="145" y2="108" stroke="#3e1f0d" stroke-width="2" stroke-linecap="round" />

      <!-- abdomen -->
      <ellipse cx="70" cy="60" rx="42" ry="26" fill="url(#abdomenGrad)" />
      <!-- abdomen segments -->
      <line x1="50" y1="38" x2="50" y2="82" stroke="#2a1308" stroke-width="1" opacity="0.4" />
      <line x1="60" y1="35" x2="60" y2="85" stroke="#2a1308" stroke-width="1" opacity="0.4" />
      <line x1="70" y1="34" x2="70" y2="86" stroke="#2a1308" stroke-width="1" opacity="0.4" />
      <line x1="80" y1="35" x2="80" y2="85" stroke="#2a1308" stroke-width="1" opacity="0.4" />
      <line x1="90" y1="38" x2="90" y2="82" stroke="#2a1308" stroke-width="1" opacity="0.4" />

      <!-- thorax with pronotal humps -->
      <ellipse cx="115" cy="60" rx="22" ry="22" fill="url(#thoraxGrad)" />
      <!-- pronotal humps -->
      <ellipse cx="110" cy="50" rx="8" ry="5" fill="#5c2e10" opacity="0.7" />
      <ellipse cx="110" cy="70" rx="8" ry="5" fill="#5c2e10" opacity="0.7" />
      <!-- shine -->
      <ellipse cx="112" cy="54" rx="5" ry="3" fill="white" opacity="0.12" />

      <!-- head -->
      <ellipse cx="140" cy="60" rx="14" ry="14" fill="url(#headGrad)" />
      <!-- shine on head -->
      <ellipse cx="143" cy="55" rx="5" ry="3" fill="white" opacity="0.15" />

      <!-- antennae -->
      <path d="M150,52 Q165,35 185,20" fill="none" stroke="#5c3018" stroke-width="2" stroke-linecap="round" :class="{ 'antenna-wiggle': isHissing }" />
      <path d="M150,68 Q165,85 185,100" fill="none" stroke="#5c3018" stroke-width="2" stroke-linecap="round" :class="{ 'antenna-wiggle-alt': isHissing }" />

      <!-- abdomen shine -->
      <ellipse cx="68" cy="50" rx="25" ry="8" fill="white" opacity="0.08" />

      <defs>
        <radialGradient id="abdomenGrad" cx="45%" cy="40%">
          <stop offset="0%" stop-color="#6b3a1f" />
          <stop offset="60%" stop-color="#4a2210" />
          <stop offset="100%" stop-color="#2a1308" />
        </radialGradient>
        <radialGradient id="thoraxGrad" cx="45%" cy="40%">
          <stop offset="0%" stop-color="#5c2e10" />
          <stop offset="100%" stop-color="#301808" />
        </radialGradient>
        <radialGradient id="headGrad" cx="50%" cy="40%">
          <stop offset="0%" stop-color="#4a2210" />
          <stop offset="100%" stop-color="#1a0a04" />
        </radialGradient>
      </defs>
    </svg>
    <HissEffect v-if="isHissing" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import HissEffect from '@/components/HissEffect.vue'

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
  width: 28vmin;
  height: auto;
  transform: translate(-50%, -50%);
  transition: left 0.35s ease-out, top 0.35s ease-out;
  z-index: 10;
  user-select: none;
  -webkit-user-select: none;
}

.cockroach-svg {
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5));
}

.cockroach-svg.hissing {
  animation: wiggle 0.15s ease-in-out 5;
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

.antenna-wiggle {
  animation: antennaUp 0.12s ease-in-out 6 alternate;
  transform-origin: 150px 52px;
}

.antenna-wiggle-alt {
  animation: antennaDown 0.12s ease-in-out 6 alternate;
  transform-origin: 150px 68px;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-4deg) scale(1.03); }
  75% { transform: rotate(4deg) scale(1.03); }
}

@keyframes antennaUp {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-8deg); }
}

@keyframes antennaDown {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(8deg); }
}
</style>
