export type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean) => void
export type GetState<T> = () => T
export type StateCreator<T> = (set: SetState<T>, get: GetState<T>) => T

type Listener<T> = (state: T) => void

export const createStore = <T>(creator: StateCreator<T>) => {
  let state: T
  let baseState: T
  const listeners = new Set<Listener<T>>()

  const setState: SetState<T> = (partial, replace = false) => {
    const nextPartial = typeof partial === 'function' ? partial(state) : partial
    state = replace ? ({ ...baseState, ...nextPartial } as T) : { ...state, ...nextPartial }
    listeners.forEach((listener) => listener(state))
  }

  const getState: GetState<T> = () => state

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const api = (selector?: (state: T) => any) => (selector != null ? selector(state) : state)

  api.getState = getState
  api.setState = (partial: Partial<T> | ((state: T) => Partial<T>), replace = false) => {
    setState(partial, replace)
  }
  api.subscribe = subscribe

  state = creator(setState, getState)
  baseState = { ...state }

  return api as typeof api & {
    getState: GetState<T>
    setState: SetState<T>
    subscribe: (listener: Listener<T>) => () => void
  }
}
