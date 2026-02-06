import i18n from '@/i18n.js'

let currentUtterance = null

export function speakGameRules(onEnd) {
  stopSpeaking()

  const { t, locale } = i18n.global
  const text = t('rules.speech')

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = locale.value
  utterance.rate = 0.95
  utterance.pitch = 1.0
  utterance.volume = 1.0

  utterance.onend = () => {
    currentUtterance = null
    if (onEnd) onEnd()
  }

  utterance.onerror = () => {
    currentUtterance = null
    if (onEnd) onEnd()
  }

  currentUtterance = utterance
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  window.speechSynthesis.cancel()
  currentUtterance = null
}
