// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  appConfig: {
    public: {
      NUXT_BACKEND_API_URL: process.env.NUXT_BACKEND_API_URL
    }
  },
})
