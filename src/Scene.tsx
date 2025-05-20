import { Suspense, useEffect, useState } from 'react'
import { DirectionalLightHelper } from 'three'
import { UnrealBloomPass } from 'three-stdlib'
import { extend } from '@react-three/fiber'
import { /* OrbitControls,  */ Helper, Effects } from '@react-three/drei'

import { useStore } from '@/stores'
import { assets, defaultConfigs, welcome } from '@/configs'
import { useSystemTheme, useResponsive /* , useDebugListener */ } from '@/hooks'
import { showToast } from '@/utils'

import Tweaker from '@/components/widgets/Tweaker'
import MovingSpotlights from '@/components/MovingSpotlights'
import BackgroundWall from '@/components/BackgroundWall'
import PhotoMain from '@/components/models/PhotoMain'
import PhotoWall from '@/components/models/PhotoWall'
import IconMe from '@/components/models/IconMe'
import IconHome from '@/components/models/IconHome'
import IconWeb from '@/components/models/IconWeb'
import IconHeart from '@/components/models/IconHeart'
import Balloons from '@/components/models/Balloons'
import Kingboo from '@/components/models/Kingboo'
import Introduction from '@/components/text/Introduction'

extend({ UnrealBloomPass })

export default function Scene({ isMobile }: { isMobile: boolean }) {
  /* Get States */
  const { debug, isLoaded, isLight } = useStore()
  const [configs, setConfigs] = useState(defaultConfigs)

  /* Call Hooks */
  // Activates system theme listening
  useSystemTheme()

  // Visit `/debug` to activate debug mode
  // useDebugListener()

  // Responsive viewport size
  const {
    viewportWidth,
    viewportHeight,
    sceneWidthFactor,
    // sceneHeightFactor,
    is2Xl,
    isXl,
    isLg,
    isMd,
    // isSm,
    isXs,
  } = useResponsive()

  useEffect(() => {
    if (isLoaded) {
      // Use `void` to explicitly discard the result and
      // mark this expression as intentional side-effect
      void (isMobile ? showToast(welcome[0]) : showToast(welcome[1]))
    }
  }, [isLoaded, isMobile])

  return (
    <Suspense fallback={null}>
      {debug && (
        <Tweaker
          onControlsChange={(controls: typeof defaultConfigs) =>
            setConfigs(controls)
          }
        />
      )}

      {/* <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      /> */}

      <directionalLight
        castShadow
        position={configs.dlPosition}
        intensity={isLight ? 1.8 : 1.5}
      >
        {debug && (
          <Helper
            type={DirectionalLightHelper}
            args={[configs.dlHelperSize, configs.dlHelperColor]}
          />
        )}
      </directionalLight>

      <MovingSpotlights
        spotlights={
          isMobile
            ? [{ color: configs.msColor, position: [0, 0, 0] }]
            : [
                {
                  color: configs.msColor,
                  position: [(-viewportWidth / 2) * 0.97, 0, 0],
                },
                { color: configs.msColor, position: [0, 0, 0] },
                {
                  color: configs.msColor,
                  position: [(viewportWidth / 2) * 0.97, 0, 0],
                },
              ]
        }
        position={[0, (viewportHeight / 2) * 0.95, 1]}
      />

      <BackgroundWall
        receiveShadow
        mapUrl={assets[configs.bwTexture]}
        color={configs.bwColor}
        position={configs.bwPosition}
      />

      <Effects disableGamma={true}>
        <unrealBloomPass threshold={1} strength={0.5} radius={0.5} />
      </Effects>

      {!isMobile && (
        <PhotoWall
          modelUrl={assets.frameModel}
          matcapUrl={assets.frameTexture}
          position={[
            is2Xl
              ? sceneWidthFactor * 1.55 * 1.1
              : isXl
                ? sceneWidthFactor * 1.55
                : isLg
                  ? sceneWidthFactor * 1.8
                  : sceneWidthFactor * 2,
            is2Xl ? 3.5 : isXl ? 2.8 : isLg ? 2.6 : 2.4,
            configs.fwPosition[2],
          ]}
          rotation={[0, 0, 0]}
          scale={
            is2Xl
              ? configs.fwScale * 1.22
              : isXl
                ? configs.fwScale
                : isLg
                  ? configs.fwScale * 0.9
                  : configs.fwScale * 0.8
          }
          photos={[
            {
              frameScale: [0.105, 0.068, 0.3],
              photoUrl: assets.camPhoto,
              photoPosition: [-0.005, 0, 0],
              photoRotation: [0, 0, 0.01],
              photoScale: [0.8, 0.8],
              position: [-2.6, -0.44, 0],
              rotation: [0, 0, 0.06],
            },
            {
              frameScale: [0.158, 0.102, 0.3],
              photoUrl: assets.pcPhoto,
              photoPosition: [-0.01, 0, 0],
              photoRotation: [0, 0, 0],
              photoScale: [1.25, 1.25],
              position: [0, 0, 0],
              rotation: [0, 0, 0],
            },
            {
              frameScale: [0.105, 0.068, 0.3],
              photoUrl: assets.drinkPhoto,
              photoPosition: [-0.018, 0, 0],
              photoRotation: [0, 0, -0.006],
              photoScale: [0.8, 0.8],
              position: [2.6, -0.42, 0],
              rotation: [0, 0, -0.05],
            },
          ]}
        />
      )}

      <group
        position={[
          is2Xl ? 0 : isXl ? 0 : isLg ? 0 : isMd ? 0 : 1.85,
          is2Xl ? 0.3 : isXl ? 0 : isLg ? 0.2 : isMd ? 0.25 : 0.6,
          0,
        ]}
        scale={is2Xl ? 1.2 : isXl ? 1 : isLg ? 0.85 : isMd ? 0.75 : 0.65}
        rotation={[0, 0, isMd ? 0 : -0.06]}
      >
        <PhotoMain
          modelUrl={assets.frameModel}
          matcapUrl={assets.frameTexture}
          framePosition={configs.fPosition}
          frameScale={configs.fScale}
          photoUrl={assets.mePhoto}
          photoPosition={configs.pPosition}
          photoScale={configs.pScale}
          position={configs.pmPosition}
          rotation={configs.pmRotation}
          scale={configs.pmScale}
        />
        <group
          position={configs.igPosition}
          rotation={configs.igRotation}
          scale={configs.igScale}
        >
          <IconMe
            modelUrl={assets.iconMeModel}
            position={configs.imPosition}
            rotation={configs.imRotation}
            scale={configs.imScale}
          />

          <IconHome
            modelUrl={assets.iconHomeModel}
            position={configs.ihPosition}
            rotation={configs.ihRotation}
            scale={configs.ihScale}
          />
          <IconWeb
            modelUrl={assets.iconWebModel}
            position={configs.iwPosition}
            rotation={configs.iwRotation}
            scale={configs.iwScale}
          />
          <IconHeart
            modelUrl={assets.iconHeartModel}
            position={configs.itPosition}
            rotation={configs.itRotation}
            scale={configs.itScale}
          />
        </group>
      </group>

      <Balloons
        modelUrl={assets.balloonModel}
        matcapUrl={assets.balloonTexture}
        balloons={[
          {
            mode: 'dark',
            position: configs.bPosition1,
            rotation: configs.bRotation1,
            scale: configs.bScale1,
            color: configs.bColor1,
          },
          {
            mode: 'system',
            position: configs.bPosition2,
            rotation: configs.bRotation2,
            scale: configs.bScale2,
            color: configs.bColor2,
          },
          {
            mode: 'light',
            position: configs.bPosition3,
            rotation: configs.bRotation3,
            scale: configs.bScale3,
            color: configs.bColor3,
          },
        ]}
        position={[
          is2Xl
            ? viewportWidth / 2 - 1.5 * 1.1
            : isXl
              ? viewportWidth / 2 - 1.5
              : isLg
                ? viewportWidth / 2 - 1.5 * 0.9
                : isMd
                  ? viewportWidth / 2 - 1.2 * 1
                  : isXs
                    ? viewportWidth / 2 - 1.5 * 0.8
                    : viewportWidth / 2 - 1.5 * 0.7,
          is2Xl
            ? -(viewportHeight / 2) + 1.15 * 1.1
            : isXl
              ? -(viewportHeight / 2) + 1.15
              : isLg
                ? -(viewportHeight / 2) + 1.15 * 0.9
                : isMd
                  ? -(viewportHeight / 2) + 1.2 * 1
                  : isXs
                    ? -(viewportHeight / 2) + 1.15 * 0.8
                    : -(viewportHeight / 2) + 1.15 * 0.7,
          configs.bPosition[2],
        ]}
        rotation={configs.bRotation}
        scale={
          is2Xl
            ? configs.bScale * 1.1
            : isXl
              ? configs.bScale
              : isLg
                ? configs.bScale * 0.9
                : isMd
                  ? configs.bScale * 1
                  : isXs
                    ? configs.bScale * 0.8
                    : configs.bScale * 0.7
        }
        floatConfig={{
          speed: configs.bFloatSpeed,
          rotationIntensity: configs.bFloatSpeed,
          floatIntensity: configs.bFloatIntensity,
          floatingRange: configs.bFloatingRange,
        }}
      />

      {!isMobile && (
        <Kingboo
          modelUrl={assets.kingbooModel}
          matcapUrl={assets.kingbooTexture}
          position={[
            is2Xl
              ? -(viewportWidth / 2) + 1.4 * 1.1
              : isXl
                ? -(viewportWidth / 2) + 1.4
                : isLg
                  ? -(viewportWidth / 2) + 1.4 * 0.9
                  : -(viewportWidth / 2) + 1.4 * 0.85,
            is2Xl
              ? -(viewportHeight / 2) + 0.9 * 1.1
              : isXl
                ? -(viewportHeight / 2) + 0.9
                : isLg
                  ? -(viewportHeight / 2) + 0.9
                  : -(viewportHeight / 2) + 0.9 * 1.1,
            configs.kPosition[2],
          ]}
          /* position={[
            is2Xl
              ? -sceneWidthFactor * 6
              : isXl
                ? -sceneWidthFactor * 5.8
                : -sceneWidthFactor * 5.6,
            isXl
              ? -sceneHeightFactor * 3.15
              : isLg
                ? -sceneHeightFactor * 3.2
                : -sceneHeightFactor * 3.5,
            configs.kPosition[2],
          ]} */
          scale={
            is2Xl
              ? configs.kScale * 1.1
              : isXl
                ? configs.kScale
                : isLg
                  ? configs.kScale * 1
                  : configs.kScale * 1
          }
        />
      )}

      <Introduction />
    </Suspense>
  )
}

{
  /* <pointLight
  castShadow
  position={[0, 0, 5]}
  position={[0, 4, 7]}
  intensity={60}
  intensity={80}
  decay={2}
  distance={10}
  distance={16}
>
  {debug && (
    <Helper type={PointLightHelper} args={[2, configs.dlHelperColor]} />
  )}
</pointLight> */
}

{
  /* <Selection>
  <EffectComposer enableNormalPass={false}>
    <SelectiveBloom
      lights={[]}
      mipmapBlur
      luminanceThreshold={1}
      // luminanceThreshold={0.5}
      // luminanceSmoothing={0.025}
      // intensity={3}
    />
  </EffectComposer>
  <group scale={0.9} position={[-0.5, 0.12, 0]} rotation={[0, 0, -0.01]}>
    <Select enabled={isLight ? true : false}>
      <IconMe
        modelUrl={assets.iconMeModel}
        text={configs.mText}
        position={[-4.6, 3, 0.05]}
        rotation={[0, 0, 0.25]}
        scale={0.09}
      />
    </Select>
    <IconHome
      modelUrl={assets.iconHomeModel}
      text={configs.mText}
      position={[-2.7, 3.7, 0.0]}
      rotation={[0, 0, 0]}
      scale={0.09}
    />
    <IconWeb
      modelUrl={assets.iconWebModel}
      text={configs.mText}
      position={[-4.5, 1.2, 0.02]}
      rotation={[0, 0, -0.05]}
      scale={0.1}
    />
    <IconHeart
      modelUrl={assets.iconHeartModel}
      text={configs.tText}
      position={[-1.26, 2.4, 0.05]}
      rotation={[0, 0, -0.05]}
      scale={0.09}
    />
  </group>
</Selection> */
}

{
  /* <PhotoFrame
  modelUrl={assets.frameModel}
  matcapUrl={assets.frameTexture}
  framePosition={configs.fPosition}
  frameScale={configs.fScale}
  photoUrl={assets.mePhoto}
  photoPosition={configs.pPosition}
  photoScale={configs.pScale}
  position={configs.pfPosition}
  rotation={configs.pfRotation}
  scale={configs.pfScale}
/>
<Frame1 modelUrl={assets.frameModel2} matcapUrl={assets.frameTexture} />
<Frame2
  modelUrl={assets.testModel2}
  matcapUrl={assets.frameTexture}
  imageUrl={assets.photoImage}
/> */
}

{
  /* <Kirby
  modelUrl={assets.kirbyModel}
  matcapUrl={assets.kirbyTexture}
  text={configs.kText}
  position={[-5.8, -3.1, 1.5]}
  rotation={[0.65, -Math.PI / 2, 0]}
  scale={0.02}
/>

<Kirby
  modelUrl={assets.kirbyModel}
  matcapUrl={assets.kirbyTexture}
  position={[5.9, -2.65, 1.5]}
  rotation={[0, -0.2, 0]}
  scale={0.64}
/> */
}
