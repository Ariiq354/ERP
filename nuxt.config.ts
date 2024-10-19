// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-security", "@nuxt/fonts", "@nuxt/eslint"],
  future: {
    compatibilityVersion: 4,
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
    },
  },

  icon: {
    serverBundle: "local",
    collections: ["heroicons"],
  },
});
