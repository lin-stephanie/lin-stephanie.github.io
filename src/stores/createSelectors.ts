import type { StoreApi, UseBoundStore } from 'zustand'

type State = object

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export const createSelectors = <S extends UseBoundStore<StoreApi<State>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])

    // err: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
    // No index signature with a parameter of type 'string' was found on type '{}'.ts(7053)
    // store.use[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
