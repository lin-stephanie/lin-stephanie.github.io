import { create } from 'zustand'

import { createSelectors } from './createSelectors'
import { createLoadSlice } from './slices/load'
import { createModeSlice } from './slices/mode'
import { createBloomSlice } from './slices/bloom'
import { createToastSlice } from './slices/toast'
import { createDebugSlice } from './slices/debug'

import type { LoadSlice } from './slices/load'
import type { ModeSlice } from './slices/mode'
import type { BloomSlice } from './slices/bloom'
import type { ToastSlice } from './slices/toast'
import type { DebugSlice } from './slices/debug'

const useStoreBase = create<
  LoadSlice & ModeSlice & BloomSlice & ToastSlice & DebugSlice
>()((...a) => ({
  ...createLoadSlice(...a),
  ...createModeSlice(...a),
  ...createBloomSlice(...a),
  ...createToastSlice(...a),
  ...createDebugSlice(...a),
}))

export const useStore = createSelectors(useStoreBase)
