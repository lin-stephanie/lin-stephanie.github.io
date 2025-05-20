import { colors } from '@/configs/colors'

import type { FolderParams, Tuple2, Tuple3 } from '@/components/widgets/Tweaker'

/* DirectionalLight */
export const directionalLightDefault = {
  dlPosition: [-38, 10, 45] as Tuple3,
  dlHelperSize: 0.6,
  dlHelperColor: 'red',
}

export const directionalLightControl: FolderParams[0] = {
  dlPosition: directionalLightDefault.dlPosition,
  dlHelperSize: directionalLightDefault.dlHelperSize,
  dlHelperColor: directionalLightDefault.dlHelperColor,
}

/* MovingSpotlights */
export const movingSpotlightsDefault = {
  msColor: colors.red[100],
}

export const movingSpotlightsControl: FolderParams[0] = movingSpotlightsDefault

/* BackgroundWall */
export const backgroundWallDefault = {
  bwTexture: 'wallTexture2',
  bwColor: colors.stone[700],
  bwPosition: [0, 0, 0] as Tuple3,
}

export const backgroundWallControl: FolderParams[0] = {
  bwTexture: {
    value: backgroundWallDefault.bwTexture,
    options: ['wallTexture1', 'wallTexture2', 'wallTexture3'],
  },
  bwColor: {
    value: backgroundWallDefault.bwColor,
  },
  bwPosition: backgroundWallDefault.bwPosition,
}

/* PhotoMain */
export const photoMainDefault = {
  fPosition: [0, 0, 0] as Tuple3,
  fScale: [0.25, 0.19, 0.4] as Tuple3,
  pPosition: [0, 0, 0.1] as Tuple3,
  pScale: [2, 2.58] as Tuple2,
  pmPosition: [-2.8, 2.2, 0.15] as Tuple3,
  pmRotation: [0, 0, 0.05] as Tuple3,
  pmScale: 0.66,
}

export const photoMainControl: FolderParams[0] = {
  fPosition: photoMainDefault.fPosition,
  fScale: photoMainDefault.fScale,
  pPosition: photoMainDefault.pPosition,
  pScale: {
    value: photoMainDefault.pScale,
    joystick: 'invertY',
    step: 0.1,
  },
  pmPosition: photoMainDefault.pmPosition,
  pmRotation: photoMainDefault.pmRotation,
  pmScale: {
    value: photoMainDefault.pmScale,
    min: 0,
    max: 1,
    step: 0.01,
  },
}

/* FrameWall */
export const photoWallDefault = {
  fwPosition: [1.55, 2.8, 0.12] as Tuple3,
  fwScale: 0.68,
}

export const photoWallControl: FolderParams[0] = {
  fwPosition: photoWallDefault.fwPosition,
  fwScale: photoWallDefault.fwScale,
}

/* Icons */
export const iconGroupDefault = {
  igPosition: [-4.56, 2.9, 0] as Tuple3,
  igRotation: [0, 0, 0.07] as Tuple3,
  igScale: 0.9,
}

export const iconGroupControl: FolderParams[0] = {
  igPosition: iconGroupDefault.igPosition,
  igRotation: iconGroupDefault.igRotation,
  igScale: iconGroupDefault.igScale,
}

export const iconMeDefault = {
  imPosition: [0, -0.03, 0] as Tuple3,
  imRotation: [0, 0, 0] as Tuple3,
  imScale: 0.09,
}

export const iconHomeDefault = {
  ihPosition: [0, -0.65, 0] as Tuple3,
  ihRotation: [0, 0, 0] as Tuple3,
  ihScale: 0.09,
}

export const iconWebDefault = {
  iwPosition: [0, -1.3, 0] as Tuple3,
  iwRotation: [0, 0, 0] as Tuple3,
  iwScale: 0.1,
}

export const iconHeartDefault = {
  itPosition: [0, -1.95, 0] as Tuple3,
  itRotation: [0, 0, 0] as Tuple3,
  itScale: 0.09,
}

/* Balloons */
export const balloosDefault = {
  bColor1: colors.red[800],
  bPosition1: [-1.5, 0.1, 2] as Tuple3,
  bRotation1: [0, 0, 0.3] as Tuple3,
  bScale1: 1,
  bColor2: colors.red[300],
  bPosition2: [0, 0, 6] as Tuple3,
  bRotation2: [0, 0, 0] as Tuple3,
  bScale2: 1,
  bColor3: colors.red[100],
  bPosition3: [1.5, 0.2, 4] as Tuple3,
  bRotation3: [0, 0, -0.3] as Tuple3,
  bScale3: 1,
  bPosition: [5.76, -2.9, 0] as Tuple3,
  bRotation: [0, 0, 0.1] as Tuple3,
  bScale: 0.35,
  bFloatSpeed: 1,
  bFloatRotationIntensity: 0.1,
  bFloatIntensity: 3,
  bFloatingRange: [-0.1, 0.1] as Tuple2,
}

export const balloosControl: FolderParams[0] = {
  bColor1: balloosDefault.bColor1,
  bPosition1: balloosDefault.bPosition1,
  bRotation1: balloosDefault.bRotation1,
  bScale1: {
    value: balloosDefault.bScale1,
    min: 0,
    max: 2,
    step: 0.1,
  },
  bColor2: balloosDefault.bColor2,
  bPosition2: balloosDefault.bPosition2,
  bRotation2: balloosDefault.bRotation2,
  bScale2: {
    value: balloosDefault.bScale2,
    min: 0,
    max: 2,
    step: 0.1,
  },
  bColor3: balloosDefault.bColor3,
  bPosition3: balloosDefault.bPosition3,
  bRotation3: balloosDefault.bRotation3,
  bScale3: {
    value: balloosDefault.bScale3,
    min: 0,
    max: 2,
    step: 0.1,
  },
  bPosition: balloosDefault.bPosition,
  bRotation: balloosDefault.bRotation,
  bScale: {
    value: balloosDefault.bScale,
    min: 0,
    max: 1,
    step: 0.01,
  },
  bFloatSpeed: {
    value: balloosDefault.bFloatSpeed,
    min: 0,
    max: 2,
    step: 0.1,
  },
  bFloatRotationIntensity: {
    value: balloosDefault.bFloatRotationIntensity,
    min: 0,
    max: 1,
    step: 0.05,
  },
  bFloatIntensity: {
    value: balloosDefault.bFloatIntensity,
    min: 0,
    max: 10,
    step: 1,
  },
  bFloatingRange: {
    value: balloosDefault.bFloatingRange,
    joystick: 'invertY',
    step: 0.1,
  },
}

/* Kingboo */
export const kingbooDefault = {
  kPosition: [-5.8, -3.15, 1.5] as Tuple3,
  kScale: 0.06,
}

export const kingbooControl: FolderParams[0] = {
  kPosition: kingbooDefault.kPosition,
  kScale: kingbooDefault.kScale,
}
