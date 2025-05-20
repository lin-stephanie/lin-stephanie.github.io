import { useEffect } from 'react'
import { folder, useControls } from 'leva'

import { useStore } from '@/stores'
import {
  directionalLightControl,
  movingSpotlightsControl,
  backgroundWallControl,
  photoMainControl,
  photoWallControl,
  iconGroupControl,
  balloosControl,
  kingbooControl,
} from '@/configs'

export type Tuple2 = [number, number]
export type Tuple3 = [number, number, number]
export type FolderParams = Parameters<typeof folder>

interface LevaControlPanelProps {
  onControlsChange: (controls: any) => void
}

const folderSettings: FolderParams[1] = {
  collapsed: true,
}

const componentControls: Record<string, ReturnType<typeof folder>> = {
  'Directional Light': folder(directionalLightControl, folderSettings),
  'Moving Spot Lights': folder(movingSpotlightsControl, folderSettings),
  'Background Wall': folder(backgroundWallControl, folderSettings),
  'Photo Main': folder(photoMainControl, folderSettings),
  'Photo Wall': folder(photoWallControl, folderSettings),
  'Icon Group': folder(iconGroupControl, folderSettings),
  'Ballons': folder(balloosControl, folderSettings),
  'Kingboo': folder(kingbooControl, folderSettings),
}

const Tweaker = ({ onControlsChange }: LevaControlPanelProps) => {
  /* Mode */
  const { mode, setMode } = useStore()
  const [_, setGeneral] = useControls(() => ({
    General: folder(
      {
        Mode: {
          value: mode,
          options: ['light', 'dark', 'system'],
          onChange: (value) => {
            setMode(value)
          },
        },
      },
      {
        collapsed: true,
        order: 0,
      }
    ),
  }))

  // @ts-expect-error (ignore)
  useEffect(() => setGeneral({ Mode: mode }), [mode, setGeneral])

  /* Components */
  const controls = useControls(componentControls)
  useEffect(() => onControlsChange(controls), [controls, onControlsChange])

  return null
}

export default Tweaker
