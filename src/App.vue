<template>
  <StartScreen
    v-if="state.phase === 'start'"
    :fact="currentFact"
    :high-score="state.highScore"
    @play="handlePlay"
  />
  <GameBoard
    v-else-if="state.phase === 'playing'"
    :state="state"
    @hiss="handleHiss"
  />
  <WinScreen
    v-else-if="state.phase === 'win'"
    :score="state.score"
    :stars="stars"
    :fact="currentFact"
    :is-new-high="state.score >= state.highScore && state.score > 0"
    @play-again="handlePlay"
  />
</template>

<script setup>
import { watch } from 'vue'
import { event as gtagEvent } from 'vue-gtag'

import StartScreen from '@/components/StartScreen.vue'
import GameBoard from '@/components/GameBoard.vue'
import WinScreen from '@/components/WinScreen.vue'
import { useGameState } from '@/composables/useGameState.js'
import { useSound } from '@/composables/useSound.js'

const { state, stars, currentFact, startGame, hiss } = useGameState()
const { initAudio, playFart, playVictory } = useSound()

watch(() => state.showFart, (isFarting) => {
  if (isFarting) {
    playFart()
    setTimeout(() => {
      playVictory()
      try {
        gtagEvent('game_win', {
          score: state.score,
          hiss_count: state.hissCount,
          stars: stars.value,
        })
      } catch {}
    }, 1500)
  }
})

async function handlePlay() {
  await initAudio()
  startGame()
  try { gtagEvent('game_start') } catch {}
}

function handleHiss(direction) {
  const didHiss = hiss(direction)
  if (didHiss) {
    try { gtagEvent('cockroach_hiss', { combo: state.comboCount }) } catch {}
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: #0d0704;
  -webkit-text-size-adjust: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
