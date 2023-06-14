// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1.0" }],
      link: [{ rel: 'icon', type: 'image/png', href: "/favicon-32x32.png" }]
    }
  },
  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
  ],
  colorMode: {
    preference: 'light', // default value of $colorMode.preference 
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  }
})
