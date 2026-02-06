import { reactive, computed } from 'vue'

const POINTS_PER_HISS = 10
const COMBO_BONUS = 5
const COMBO_WINDOW_MS = 1000
const MOVE_X_MIN = 4
const MOVE_X_MAX = 10
const MOVE_Y_RANGE = 8
const WIN_THRESHOLD_PERCENT = 82

const cockroachFacts = [
  'Madagascar hissing cockroaches can live up to 5 years!',
  'They hiss by pushing air through breathing holes called spiracles.',
  'Males have large horns on their thorax for fighting rivals.',
  'They are one of the largest cockroach species — up to 3 inches long!',
  'Unlike most cockroaches, they have no wings at all.',
  'They can climb smooth glass with special pads on their feet.',
  'A group of hissing cockroaches is sometimes called an "intrusion."',
  'Baby hissing cockroaches are called nymphs and are bright white at birth.',
  'They are completely harmless to humans — no biting or stinging!',
  'Males hiss to attract mates and scare off other males.',
]

export function useGameState() {
  const state = reactive({
    phase: 'start',
    score: 0,
    hissCount: 0,
    comboCount: 0,
    lastHissTime: 0,
    cockroachX: 5,
    cockroachY: 40,
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
    const idx = Math.floor(Math.random() * cockroachFacts.length)
    return cockroachFacts[idx]
  })

  function startGame() {
    state.phase = 'playing'
    state.score = 0
    state.hissCount = 0
    state.comboCount = 0
    state.lastHissTime = 0
    state.cockroachX = 5
    state.cockroachY = 40
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
    state.cockroachX = Math.min(state.cockroachX + dx, 95)
    state.cockroachY = Math.max(5, Math.min(85, state.cockroachY + dy))

    state.isHissing = true
    setTimeout(() => {
      state.isHissing = false
    }, 400)

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
    }, 1800)
  }

  return {
    state,
    stars,
    currentFact,
    startGame,
    hiss,
  }
}
