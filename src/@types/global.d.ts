import { ConnectedProps } from 'react-redux'
import { Dispatch, MiddlewareAPI } from 'redux'
import { Action } from 'redux-actions'
import { MODE, PATTERN, PLAY, PLAYER_PATTERN, POWER, RESET, TURN } from '../store/actions'

export interface EffectMiddlewareParams<S> {
  store: MiddlewareAPI<S>
  next: Dispatch<S>
  action: Action<S>
  [otherProperty: string]: {}
}

export interface EffectMiddleware<S> {
  (params: EffectMiddlewareParams<S>): Action<S>
}

export interface Pattern {
  prev?: Pattern
  next?: Pattern
  pattern?: ButtonName[],
}

type PropsFromRedux<connector> = ConnectedProps<connector>

export type ButtonName = 'one' | 'two' | 'three' | 'four'

export interface InitialState {
  power: POWER.ON | POWER.OFF
  play: boolean
  mode: boolean
  pattern: Pattern | undefined
  turn: boolean
  playerPattern: ButtonName[]
}

export type PowerAction = { type: POWER.POWER_ON | POWER.POWER_OFF }

export type PlayAction = { type: PLAY.START_GAME | PLAY.END_GAME }

export type ModeAction = { type: MODE.TOGGLE_MODE }

export type TurnAction = {
  type: TURN.PLAYER_AI | TURN.PLAYER_HUMAN | TURN.VALIDATE_PLAYER_MOVE | TURN.VALID_MOVE | TURN.INVALID_MOVE | TURN.MOVE_COMPLETED
   | TURN.PLAYER_AI_FINISHED
}

export type ResetAction = { type: RESET.RESET_STATE }

export type PatternAction = { type: PATTERN.PREV_LEVEL | PATTERN.NEXT_LEVEL | PATTERN.REPEAT_LEVEL | PATTERN.RESET_LEVEL | PATTERN.RESET }

export type PlayerPatternAction = { type: PLAYER_PATTERN.RECORD_PLAYER_PATTERN | PLAYER_PATTERN.RESET_PLAYER_PATTERN, payload?: ButtonName }

export type CombineActions = PowerAction | PlayAction | ModeAction | PatternAction | TurnAction | PlayerPatternAction | ResetAction

export type ComponentProps<connector> = PropsFromRedux<connector>

export type SwitchComponentProps = {
  togglePower: (state: POWER.ON | POWER.OFF) => { type: POWER.POWER_OFF | POWER.POWER_ON }
  power: POWER.ON | POWER.OFF
  disabled: boolean
}
