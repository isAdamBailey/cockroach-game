<template>
  <div class="game-board" @pointerdown="handleBoardTap">
    <ScoreDisplay :score="state.score" :combo-count="state.comboCount" />
    <Toilet />
    <CockroachSprite
      :x="state.cockroachX"
      :y="state.cockroachY"
      :is-hissing="state.isHissing"
      @head-tap="handleHiss"
    />
    <FartCloud :visible="state.showFart" />
    <div class="tap-hint" v-if="state.hissCount === 0">
      <span class="hint-arrow">&#x1F449;</span> Tap the head!
    </div>
  </div>
</template>

<script setup>
import CockroachSprite from './CockroachSprite.vue'
import Toilet from './Toilet.vue'
import FartCloud from './FartCloud.vue'
import ScoreDisplay from './ScoreDisplay.vue'
import { useSound } from '../composables/useSound.js'

const props = defineProps({
  state: { type: Object, required: true },
})

const emit = defineEmits(['hiss'])

const { playHiss, playFart } = useSound()

function handleHiss() {
  emit('hiss')
  playHiss()
  if (props.state.cockroachX >= 82) {
    setTimeout(() => playFart(), 300)
  }
}

function handleBoardTap() {
  // no-op: captures stray taps on the board
}
</script>

<style scoped>
.game-board {
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, #3e2723 0%, #5d4037 30%, #6d4c41 60%, #8d6e63 100%);
  overflow: hidden;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
}

.tap-hint {
  position: absolute;
  top: 50%;
  left: 22%;
  transform: translateY(-50%);
  font-size: 3vmin;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  animation: hintBounce 1.2s ease-in-out infinite;
  pointer-events: none;
  white-space: nowrap;
}

.hint-arrow {
  display: inline-block;
  animation: hintPoint 1.2s ease-in-out infinite;
}

@keyframes hintBounce {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes hintPoint {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(8px); }
}
</style>
