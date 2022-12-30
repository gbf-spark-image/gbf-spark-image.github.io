export default defineNuxtConfig({
  ssr: false,
  nitro: {
    prerender: {
      routes: ["/studio"],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@pinia/nuxt"],
  app: {
    head: {
      charset: "utf-8",
      title: "GBF Spark Image Maker",
      meta: [
        {
          name: "title",
          content: "GBF Spark Image Maker",
        },
        {
          name: "description",
          content:
            "Create images of your sparks and share them with your friends.",
        },
        {
          property: "og:title",
          content: "GBF Spark Image Maker",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: "GBF Spark Image Maker",
        },
        {
          property: "og:url",
          content: "https://gbf-spark-image.github.io/",
        },

        {
          property: "og:description",
          content:
            "Create images of your sparks and share them with your friends.",
        },
        {
          property: "og:image",
          content: "https://gbf-spark-image.github.io/icon.png",
        },
      ],
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
    },
  },
});
