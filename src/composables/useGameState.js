import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const POINTS_PER_HISS = 10
const COMBO_BONUS = 5
const COMBO_WINDOW_MS = 1000
const MOVE_X_MIN = 4
const MOVE_X_MAX = 10
const MOVE_Y_RANGE = 8
const WIN_THRESHOLD_PERCENT = 75

export function useGameState() {
  const { tm } = useI18n()

  const state = reactive({
    phase: 'start',
    score: 0,
    hissCount: 0,
    comboCount: 0,
    lastHissTime: 0,
    cockroachX: 15,
    cockroachY: 45,
    isHissing: false,
    showFart: false,
    highScore: parseInt(localStorage.getItem('cockroach_high_score') || '0', 10),
  })

  const stars = computed(() => {
    if (state.hissCount <= 12) return 3
    if (state.hissCount <= 20) return 2
    return 1
  })

  const currentFact = computed(() => {
    const facts = tm('facts.list')
    const idx = Math.floor(Math.random() * facts.length)
    return facts[idx]
  })

  function startGame() {
    state.phase = 'playing'
    state.score = 0
    state.hissCount = 0
    state.comboCount = 0
    state.lastHissTime = 0
    state.cockroachX = 15
    state.cockroachY = 45
    state.isHissing = false
    state.showFart = false
  }

  function hiss() {
    if (state.phase !== 'playing') return false

    const now = Date.now()
    let bonus = 0

    if (now - state.lastHissTime < COMBO_WINDOW_MS) {
      state.comboCount++
      bonus = COMBO_BONUS * state.comboCount
    } else {
      state.comboCount = 0
    }

    state.lastHissTime = now
    state.hissCount++
    state.score += POINTS_PER_HISS + bonus

    const dx = MOVE_X_MIN + Math.random() * (MOVE_X_MAX - MOVE_X_MIN)
    const dy = (Math.random() - 0.5) * MOVE_Y_RANGE
    state.cockroachX = Math.min(state.cockroachX + dx, 85)
    state.cockroachY = Math.max(15, Math.min(80, state.cockroachY + dy))

    state.isHissing = true
    setTimeout(() => {
      state.isHissing = false
    }, 900)

    if (state.cockroachX >= WIN_THRESHOLD_PERCENT) {
      setTimeout(() => {
        triggerWin()
      }, 300)
    }

    return true
  }

  function triggerWin() {
    state.showFart = true
    setTimeout(() => {
      state.phase = 'win'
      if (state.score > state.highScore) {
        state.highScore = state.score
        localStorage.setItem('cockroach_high_score', String(state.score))
      }
    }, 3000)
  }

  return {
    state,
    stars,
    currentFact,
    startGame,
    hiss,
  }
}
