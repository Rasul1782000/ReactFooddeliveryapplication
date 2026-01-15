import { createTamagui, createTokens } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens as defaultTokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'
import '@tamagui/core/reset.css'

const animations = createAnimations({
  fast: { type: 'spring', damping: 20, mass: 1, stiffness: 250 },
  bouncy: { type: 'spring', damping: 10, mass: 0.9, stiffness: 100 },
  quick: { type: 'spring', damping: 20, mass: 1, stiffness: 250 }, // Added for your CategoryCircle
})

const headingFont = createInterFont({
  size: {
    4: 14,
    6: 18,
    8: 32,
    small: 14,
    medium: 18,
    large: 32,
  },
  weight: {
    large: '700',
  },
})

const bodyFont = createInterFont()

const tokens = createTokens({
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    brandRed: '#a81e1e',
    gray500: '#888888',
  },
})

const config = createTamagui({
  animations,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes,
  tokens,
})

// --- CRITICAL FIX: Add this inside the declare module ---
export type AppConfig = typeof config
declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config