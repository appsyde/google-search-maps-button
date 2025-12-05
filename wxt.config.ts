import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Google Search Maps Button',
    host_permissions: [
      '*://*.google.com/*',
      '*://*.google.de/*',
      '*://*.google.at/*',
      '*://*.google.ch/*',
    ],
  },
  webExt: {
    disabled: true, // Disable browser startup
  },
})
