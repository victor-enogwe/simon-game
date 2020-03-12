import { InitialState } from 'global'
import { applyMiddleware, createStore, Middleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { effectsMiddleware } from './middlewares'
import { initialState, rootReducer } from './reducers'

export * from './actions'
export * from './selectors'

export function createSimonStore(state: InitialState = initialState) {
  const middlewares: Middleware<any, InitialState, any>[] = [effectsMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, state, composedEnhancers)
  return store
}

export const store = createSimonStore()
