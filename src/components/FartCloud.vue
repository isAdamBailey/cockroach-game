<template>
  <div v-if="visible" class="fart-overlay">
    <img
      :src="fartCloudImg"
      alt="Fart Cloud"
      class="fart-img"
      draggable="false"
    />
  </div>
</template>

<script setup>
import fartCloudImg from '../assets/fart-cloud.png'

defineProps({
  visible: { type: Boolean, default: false },
})
</script>

<style scoped>
.fart-overlay {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40vmin;
  z-index: 15;
  pointer-events: none;
  animation: fartAppear 0.6s ease-out forwards;
}

.fart-img {
  width: 100%;
  height: auto;
  display: block;
  animation: fartPulse 0.8s ease-in-out infinite alternate;
  opacity: 0.85;
}

@keyframes fartAppear {
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0.3);
  }
  60% {
    opacity: 1;
    transform: translateY(-50%) scale(1.15);
  }
  100% {
    opacity: 0.9;
    transform: translateY(-50%) scale(1);
  }
}

@keyframes fartPulse {
  0% { transform: scale(1) rotate(-2deg); }
  100% { transform: scale(1.08) rotate(2deg); }
}
</style>
