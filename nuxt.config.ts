// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    '~/assets/scss/reset.scss',
    '~/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/foundations/index.scss" as *;
          `
        }
      }
    }
  },
  runtimeConfig: {
    pexelsApiKey: process.env.PEXELS_API_KEY,
    public: {}
  },
  modules: ['@pinia/nuxt'],
  components: [
    { path: '~/components', pathPrefix: false } 
  ]
})
