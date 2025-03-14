// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  plugins: ["~/plugins/auth.ts"],
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3333/api",
    },
  },
  devtools: { enabled: true },
});
