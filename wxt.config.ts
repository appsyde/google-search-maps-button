import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Google Search Maps Button',
  },
  webExt: {
    disabled: true, // Disable browser startup
  },
})
