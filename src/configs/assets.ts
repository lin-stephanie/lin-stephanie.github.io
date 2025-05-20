import loadingGif from '@/assets/images/circle.gif'

/* BackgroundWall */
import wallTexture1 from '@/assets/images/wall1.jpg'
import wallTexture2 from '@/assets/images/wall2.jpg'
import wallTexture3 from '@/assets/images/wall3.jpg'

/* Icon */
// https://vite.dev/guide/assets.html#explicit-url-imports
import iconMeModel from '@/assets/models/icon-me.glb?url'
import iconHomeModel from '@/assets/models/icon-home.glb?url'
import iconWebModel from '@/assets/models/icon-web.glb?url'
import iconHeartModel from '@/assets/models/icon-heart.glb?url'
// import iconFireModel from '@/assets/models/icon-fire.glb?url'

/* PhotoFrame */
import mePhoto from '@/assets/images/me.png'
import drinkPhoto from '@/assets/images/drink.png'
import pcPhoto from '@/assets/images/pc.png'
import camPhoto from '@/assets/images/cam.png'
import frameModel from '@/assets/models/frame.glb?url'
import frameTexture from '@/assets/textures/C30C0C_9F0404_830404_5C0404-512px.png'

/* Balloons */
import balloonModel from '@/assets/models/balloon.glb?url'
import balloonTexture from '@/assets/textures/B0A2A8_866A63_E8E9F2_614C4F-512px.png'

/* Kingboo */
import kingbooModel from '@/assets/models/kingboo.glb?url'
import kingbooTexture from '@/assets/textures/28292A_D3DAE5_A3ACB8_818183-512px.png'

export const assets: Record<string, string> = {
  loadingGif,

  wallTexture1,
  wallTexture2,
  wallTexture3,

  iconMeModel,
  iconHomeModel,
  iconWebModel,
  iconHeartModel,
  // iconFireModel,

  mePhoto,
  drinkPhoto,
  pcPhoto,
  camPhoto,
  frameModel,
  frameTexture,

  balloonModel,
  balloonTexture,

  kingbooModel,
  kingbooTexture,
}
