export interface Trigger {
  name: string
  hint: string
  triggered: boolean
}

export const triggers: Trigger[] = [
  {
    name: 'mode',
    hint: 'Find the switch for Light, Dark, or System mode...',
    triggered: false,
  },
  {
    name: 'lit',
    hint: 'A few things are still waiting to be lit...',
    triggered: false,
  },
  {
    name: 'secret',
    hint: 'Some secrets appear randomly...',
    triggered: false,
  },
]

export const welcome: string[] = [
  'Nice to meet you! You’ve just landed on my slightly magical 3D homepage. It’s cooler on desktop, but go ahead — click around, have fun!',
  'This is my homepage, powered by a little 3D wizardry. Roam as you wish — and don’t forget to say hi to King Boo along the way! 👻',
]

export const secrets: string[] = [
  'I’m drawn to the contrast of black and coral pink — you’ll see this combo in my branding, project badges, and avatars.',
  'Believe it or not, my boyfriend and I never finished It Takes Two — my gaming laptop died before we could!',
  'When I’m not deep-diving into code or lurking GitHub, you’ll find me chasing delicious food — or cooking it!',
  'I’ve got a master’s in engineering (not CS), kicked things off in data analysis, and now I’m a self-taught front-end dev doing what I love!',
  'I still have an old Canon 700D — hopefully I’ll upgrade someday and get back into photography properly.',
  "My go-to character in Mario Party is King Boo. I think it's adorably spooky and just the right amount of sass!",
]
