
export function* sound(frequency: number, duration = 1.5, type: OscillatorType = "sawtooth") {
  const notes: number[] = [440, 261.63, 329.63, 392]
  const context = new window.AudioContext()
  const volume = context.createGain()
  const noteVolume = context.createGain();
  const oscillator = context.createOscillator()
  const lfoOscillator = context.createOscillator()
  const lfoVolume = context.createGain()
  const sustain = 0.8
  const attack = 0.3
  const release = 0.3

  oscillator.type = type
  oscillator.frequency.setValueAtTime(notes[frequency], context.currentTime)
  noteVolume.gain.setValueAtTime(0, 0)
  noteVolume.gain.linearRampToValueAtTime(sustain, context.currentTime + attack)
  noteVolume.gain.setValueAtTime(sustain, context.currentTime + 1 - release)
  noteVolume.gain.linearRampToValueAtTime(0, context.currentTime + 1)
  lfoOscillator.frequency.setValueAtTime(10, 0)
  lfoOscillator.connect(lfoVolume)
  lfoOscillator.start(0)
  lfoOscillator.stop(context.currentTime + 1)
  lfoVolume.gain.setValueAtTime(0.5, 0)
  lfoVolume.connect(oscillator.frequency)


  oscillator.connect(volume)
  volume.connect(context.destination)
  volume.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration)
  oscillator.start()
  oscillator.stop(context.currentTime + duration)
  oscillator.connect(noteVolume)
  noteVolume.connect(volume)

  oscillator.onended = yield (function* () {
    yield true
  })()
}
