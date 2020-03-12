import { InitialState } from 'global'

export function mapState<Key extends keyof InitialState>(key: Key) {
  return (state: InitialState) => ({ [key]: state[key] })
}
