// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@unocss/nuxt',
    '@nuxt/icon'
  ],
  runtimeConfig: {
    // Private (server-only) — never sent to the browser.
    apiSecret: '',
    // Public (exposed to the browser) — override with NUXT_PUBLIC_API_BASE.
    public: {
      apiBase: '',
    },
  },
})