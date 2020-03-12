
export function* sound(frequency: number, duration = 1.5, type: OscillatorType = "sine") {
  const context = new window.AudioContext()
  const oscillator = context.createOscillator()
  oscillator.type = type
  const gain = context.createGain()
  oscillator.frequency.setValueAtTime(frequency * 270.5, context.currentTime)
  oscillator.connect(gain)
  gain.connect(context.destination)
  gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration)
  oscillator.start()
  oscillator.stop(context.currentTime + duration)
  console.log('called')
  oscillator.onended = yield (function* () {
    yield true
  })()
}
