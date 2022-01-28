import { CombineActions, InitialState, Pattern } from 'global'
import { Dispatch, MiddlewareAPI } from 'redux'
import { aiTurn, alert, movesValid } from '../utils/ai'
import { PATTERN, PLAY, PLAYER_PATTERN, POWER, RESET, TURN } from './actions'


export function effectsMiddleware(store: MiddlewareAPI<Dispatch<CombineActions>>) {
  return (next: Dispatch<CombineActions>) => (action: CombineActions) => {
    const state = store.getState() as InitialState
    next(action)
    switch (action.type) {
      case POWER.POWER_OFF:
        return store.dispatch({ type: RESET.RESET_STATE })
      case PLAY.START_GAME:
        return alert('GAME STARTED').then(() => store.dispatch({ type: PATTERN.NEXT_LEVEL }))
      case PLAY.END_GAME:
        return store.dispatch({ type: PATTERN.RESET })
      case PATTERN.REPEAT_LEVEL:
      case PATTERN.RESET_LEVEL:
      case PATTERN.NEXT_LEVEL:
        if (state.playerPattern.length) store.dispatch({ type: PLAYER_PATTERN.RESET_PLAYER_PATTERN })
        return alert('AI\'S TURN').then(() => store.dispatch({ type: TURN.PLAYER_AI }))
      case TURN.PLAYER_AI:
        return aiTurn(state.pattern as Pattern)(store.dispatch)
      case TURN.PLAYER_AI_FINISHED:
        store.dispatch({ type: TURN.PLAYER_HUMAN })
        return alert('YOUR TURN')
      case TURN.VALIDATE_PLAYER_MOVE:
        return alert('VALIDATING PLAYER MOVE').then(() => {
          const { pattern: aiPattern = {}, playerPattern = [] } = state
          const valid = movesValid(aiPattern.pattern || [], playerPattern)
          return store.dispatch({ type: valid ? TURN.VALID_MOVE : TURN.INVALID_MOVE })
        })
      case TURN.INVALID_MOVE:
        return alert('INVALID MOVE')
          .then(() => alert(state.mode ? 'MOVES RESET' : 'MOVES REPLAY'))
          .then(() => alert(state.mode ? 'RESTART LEVEL' : 'REPEAT LEVEL'))
          .then(() => store.dispatch({ type: state.mode ? PATTERN.RESET_LEVEL : PATTERN.REPEAT_LEVEL }))
      case TURN.VALID_MOVE:
        return alert('VALID MOVE').then(() => alert('NEXT LEVEL!')).then(() => store.dispatch({ type: PATTERN.NEXT_LEVEL }))
      case TURN.MOVE_COMPLETED:
        const moveComplete = state.pattern?.pattern?.length === state.playerPattern.length
        if (!moveComplete) return
        return store.dispatch({ type: TURN.VALIDATE_PLAYER_MOVE })

      case PLAYER_PATTERN.RECORD_PLAYER_PATTERN:
        return store.dispatch({ type: TURN.MOVE_COMPLETED })
      default: return
    }
  }
}
