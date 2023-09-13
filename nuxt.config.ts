// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: {} },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    'primeicons/primeicons.css',
    'primeflex/primeflex.css' ],
  modules: ['@nuxtjs/google-fonts'],
  build: {
    transpile: ["primevue"]
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Roboto Mono': true
    }
  },
  nitro: {
    firebase: {
      gen: 2,
      nodeVersion: "18",
      httpsOptions: {
        region: 'europe-west1',
        maxInstances: 1,
      },
    }
  }
})
