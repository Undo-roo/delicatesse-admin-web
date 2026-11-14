// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@unocss/nuxt', '@nuxt/icon', '@nuxt/image'],
  ssr: false, // admin-only app: everything runs in the browser
  runtimeConfig: {
    // Private (server-only) — never sent to the browser.
    apiSecret: '',
    // Public (exposed to the browser) — override with NUXT_PUBLIC_*.
    public: {
      apiBase: process.env.ADMIN_API_LINK,
      // Toggle to bypass the auth guard for local testing.
      authDisabled: process.env.ADMIN_AUTH_DISABLED === 'true',
    },
  },
})