export default defineNuxtConfig({
  ssr: false,
  target: "static",
  nitro: {
    prerender: {
      routes: ["/studio"],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  app: {
    head: {
      charset: "utf-8",
      title: "GBF Spark Image Maker",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Create images of your sparks and share them with your friends",
        },
      ],
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
    },
  },
  buildModules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
  ],
});
