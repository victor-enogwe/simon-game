import { ButtonName, CombineActions, Pattern } from 'global'
import { Dispatch } from 'react'
import { timer } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import swal from 'sweetalert2'
import { buttonNames } from '../components'
import { TURN } from '../store'
import { sound } from './sound'

export const toast = swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000
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
  return Array(pattern.length + 1).fill(null).map(randomButtonName)
}

export function movesValid(ai: ButtonName[], player: ButtonName[]): boolean {
  return ai.every((item, index) => player[index] === item)
}

function clickButton(level: number) {
  return (next: Dispatch<CombineActions>) => (name: ButtonName, index: number, pattern: ButtonName[]) => {
    const button = document.getElementById(name) as HTMLButtonElement
    const duration = 4500 / level
    return timer(index * duration).pipe(
      tap(() => button.classList.add('active')),
      map(time => sound((buttonNames.indexOf(name) + 1), time / 1000).next()),
      tap(() => button.classList.remove('active')),
      map((done) => index === pattern.length - 1 && done ? next({ type: TURN.PLAYER_AI_FINISHED }) : null)
    ).toPromise()
    // const timeout = setTimeout(() => {
    //   button.classList.add('active')
    //   sound((buttonNames.indexOf(name) + 1), duration / 1000)
    //   const innerTimeout = setTimeout(() => {
    //     button.classList.remove('active')
    //     if (index === pattern.length - 1) next({ type: TURN.PLAYER_AI_FINISHED })
    //     return [clearTimeout(timeout), clearTimeout(innerTimeout)]
    //   }, index * duration * 2.5)
    // }, index * duration)
  }
}

export function aiTurn(turn: Pattern) {
  return (next: Dispatch<CombineActions>) => {
    const { pattern = [] } = turn
    console.log('here')
    return Promise.all(pattern.map(clickButton(pattern.length)(next)))
  }
}
