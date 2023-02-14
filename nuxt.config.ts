// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@huntersofbook/naive-ui-nuxt",
    "@nuxtjs/color-mode",
    "@sidebase/nuxt-auth",
  ],
  typescript: {
    shim: false,
  },
  auth: {
    origin: process.env.BASE_URL,
    enableGlobalAppMiddleware: true,
  },
  css: [
    "@/assets/css/style.css",
  ],
  nitro: {
    plugins: ["~/server/database/index.ts"],
  },
  runtimeConfig: {
    BaseURL: process.env.BASE_URL,
    Port: process.env.PORT,
    ClientID: process.env.CLIENT_ID,
    ClientSecret: process.env.CLIENT_SECRET,
    Prefix: process.env.PREFIX,
    MongoDB: process.env.MONGODB_URI,
  }
});
