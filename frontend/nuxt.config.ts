export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  plugins: ["~/plugins/auth.ts"],

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3333/api",
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
