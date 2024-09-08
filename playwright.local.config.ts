import { PlaywrightTestConfig } from '@playwright/test'
import * as baseConfig from './playwright.config'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env.local') })

const config: PlaywrightTestConfig = {
  ...baseConfig.default,
  use: {
    ...baseConfig.default.use,
    baseURL: 'http://localhost:3000/',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000/',
  },
}

export default config
