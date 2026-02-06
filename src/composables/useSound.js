let audioCtx = null

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playNoise(duration, startFreq, endFreq, type = 'sawtooth', volume = 0.15) {
  const ctx = getContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(startFreq, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration)

  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

export function useSound() {
  function initAudio() {
    getContext()
  }

  function playHiss() {
    const ctx = getContext()
    const duration = 0.9
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    const attackEnd = 0.05 * bufferSize
    const sustainEnd = 0.6 * bufferSize

    for (let i = 0; i < bufferSize; i++) {
      let envelope
      if (i < attackEnd) {
        envelope = i / attackEnd
      } else if (i < sustainEnd) {
        envelope = 1.0
      } else {
        envelope = Math.pow(1 - (i - sustainEnd) / (bufferSize - sustainEnd), 1.5)
      }
      data[i] = (Math.random() * 2 - 1) * envelope
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 3500
    bandpass.Q.value = 0.4

    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 1500

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.setValueAtTime(0.35, ctx.currentTime + duration * 0.6)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    source.connect(bandpass)
    bandpass.connect(highpass)
    highpass.connect(gain)
    gain.connect(ctx.destination)

    source.start(ctx.currentTime)
  }

  function playFart() {
    const ctx = getContext()
    const now = ctx.currentTime

    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(350, now)
    osc1.frequency.linearRampToValueAtTime(120, now + 0.8)
    gain1.gain.setValueAtTime(0.5, now)
    gain1.gain.setValueAtTime(0.5, now + 0.3)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.8)

    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'square'
    osc2.frequency.setValueAtTime(250, now)
    osc2.frequency.linearRampToValueAtTime(80, now + 1.0)
    gain2.gain.setValueAtTime(0.3, now + 0.05)
    gain2.gain.setValueAtTime(0.3, now + 0.4)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.0)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now + 0.05)
    osc2.stop(now + 1.0)

    const osc3 = ctx.createOscillator()
    const gain3 = ctx.createGain()
    osc3.type = 'sawtooth'
    osc3.frequency.setValueAtTime(180, now + 0.3)
    osc3.frequency.linearRampToValueAtTime(100, now + 1.2)
    gain3.gain.setValueAtTime(0.25, now + 0.3)
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 1.2)
    osc3.connect(gain3)
    gain3.connect(ctx.destination)
    osc3.start(now + 0.3)
    osc3.stop(now + 1.2)

    const bufDuration = 1.0
    const bufferSize = ctx.sampleRate * bufDuration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize
      data[i] = (Math.random() * 2 - 1) * (1 - t) * 0.4
    }
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer
    const noiseBand = ctx.createBiquadFilter()
    noiseBand.type = 'bandpass'
    noiseBand.frequency.value = 300
    noiseBand.Q.value = 1.0
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.4, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + bufDuration)
    noiseSource.connect(noiseBand)
    noiseBand.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noiseSource.start(now)
  }

  function playVictory() {
    const ctx = getContext()
    const notes = [523.25, 659.25, 783.99, 1046.5]

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + i * 0.15)
      osc.stop(ctx.currentTime + i * 0.15 + 0.4)
    })
  }

  return { initAudio, playHiss, playFart, playVictory }
}
