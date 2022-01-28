import { ButtonName, CombineActions, Pattern } from 'global'
import { Dispatch } from 'react'
import { timer } from 'rxjs'
import swal from 'sweetalert2'
import { buttonNames } from '../components'
import { TURN } from '../store'
import { sound } from './sound'

export const toast = swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1000
})

export async function alert(title: string) {
  return toast.mixin({ title, onOpen: sound.bind(null, 10, 0.0015, 'triangle') }).fire()
    .then(() => toast.mixin({ customClass: { container: 'hide' } }).fire())
}

function randomButtonName() {
  return buttonNames[Math.floor(Math.random() * buttonNames.length)]
}

export function moves(pattern: ButtonName[] = []): ButtonName[] {
  return [...pattern, randomButtonName()]
}

export function randomMoves(pattern: ButtonName[] = []): ButtonName[] {
  return Array(pattern.length).fill(null).map(randomButtonName)
}

export function movesValid(ai: ButtonName[], player: ButtonName[]): boolean {
  return ai.every((item, index) => player[index] === item)
}

export async function clickButton (name: ButtonName, index: number, level: number) {
  const button = document.getElementById(name) as HTMLButtonElement
  const duration = 1000 / level
  const time = (index + 1) * duration

  button.classList.add('active')
  sound((buttonNames.indexOf(name)), time / 1000).next()
  await timer(time).toPromise()
  button.classList.remove('active')
  await timer(duration / level).toPromise()
}

async function* clickPatterns(patterns: ButtonName[], next: Dispatch<CombineActions>) {
  const level = patterns.length
  let index = 0

  while (index < level) {
    await clickButton(patterns[index], index, level)
    if (index === level - 1) next({ type: TURN.PLAYER_AI_FINISHED })
    yield index++
  }
}

export function aiTurn(turn: Pattern) {
  return async (next: Dispatch<CombineActions>) => {
    const { pattern = [] } = turn

    for await (const _ of clickPatterns(pattern, next)) {}
  }
}
