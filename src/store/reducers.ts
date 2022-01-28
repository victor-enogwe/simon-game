import { ButtonName, CombineActions, InitialState, ModeAction, Pattern, PatternAction, PlayAction, PlayerPatternAction, PowerAction, ResetAction, TurnAction } from 'global'
import { combineReducers } from "redux"
import { moves, randomMoves } from '../utils/ai'
import { MODE, PATTERN, PLAY, PLAYER_PATTERN, POWER, RESET, TURN } from './actions'

export const initialState: InitialState = {
  power: POWER.OFF,
  play: false,
  mode: false,
  pattern: {},
  turn: true,
  playerPattern: []
}

function power(state: POWER.OFF | POWER.ON = initialState.power, action: PowerAction): POWER.OFF | POWER.ON {
  switch (true) {
    case Object.values(POWER).includes(action.type):
      return action.type === POWER.POWER_OFF ? POWER.OFF : POWER.ON
    default: return state
  }
}

function play(state: boolean = initialState.play, action: PlayAction): boolean {
  switch (true) {
    case Object.values(PLAY).includes(action.type):
      return action.type === PLAY.START_GAME ? true : false
    default: return state
  }
}

function mode(state: boolean = initialState.mode, action: ModeAction): boolean {
  return Object.values(MODE).includes(action.type) ? !state : state
}

function pattern(state: Pattern | undefined = initialState.pattern, action: PatternAction): Pattern | undefined {
  switch (action.type) {
    case PATTERN.NEXT_LEVEL:
      return { prev: state, pattern: moves(state ? state.pattern : []) }
    case PATTERN.RESET_LEVEL:
      return { prev: state?.prev?.prev ?? {}, pattern: randomMoves(state ? state.pattern : []) }
    case PATTERN.PREV_LEVEL:
      return state ? state.prev : undefined
    case PATTERN.RESET:
      return initialState.pattern
    case PATTERN.REPEAT_LEVEL:
    default: return state
  }
}

function turn(state: boolean = initialState.turn, action: TurnAction): boolean {
  switch (action.type) {
    case TURN.PLAYER_AI:
    case TURN.VALIDATE_PLAYER_MOVE:
      return true
    case TURN.PLAYER_HUMAN:
      return false
    default: return state
  }
}

function playerPattern(state: ButtonName[] = initialState.playerPattern, action: PlayerPatternAction): ButtonName[] {
  switch (action.type) {
    case PLAYER_PATTERN.RECORD_PLAYER_PATTERN:
      return action.payload ? [...state, action.payload] : [...state]
    case PLAYER_PATTERN.RESET_PLAYER_PATTERN:
      return []
    default:
      return state
  }
}

function reset(state = initialState, action: ResetAction): InitialState {
  return action.type == RESET.RESET_STATE ? initialState : state
}

export const rootReducer = function (state: InitialState = initialState, action: CombineActions) {
  switch (action.type) {
    case RESET.RESET_STATE:
      return reset(state, action)
    default:
      return combineReducers({ power, play, mode, pattern, turn, playerPattern })(state, action)
  }
}
