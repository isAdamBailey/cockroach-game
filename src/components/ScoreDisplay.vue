<template>
  <div class="score-display">
    <div class="score-value">Score: {{ score }}</div>
    <div v-if="comboCount > 1" class="combo-badge">
      {{ comboCount }}x Combo!
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: { type: Number, default: 0 },
  comboCount: { type: Number, default: 0 },
})
</script>

<style scoped>
.score-display {
  position: absolute;
  top: env(safe-area-inset-top, 12px);
  left: 16px;
  z-index: 50;
  user-select: none;
  -webkit-user-select: none;
}

.score-value {
  font-size: 3.5vmin;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.combo-badge {
  margin-top: 4px;
  font-size: 2.5vmin;
  font-weight: 700;
  color: #ffcc00;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  animation: comboPop 0.3s ease-out;
}

@keyframes comboPop {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); }
}
</style>
