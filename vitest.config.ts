import path from "node:path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        {
          "@pinia/nuxt/node_modules/pinia": [
            "acceptHMRUpdate",
            "createPinia",
            "defineStore",
            "getActivePinia",
            "mapActions",
            "mapGetters",
            "mapState",
            "mapStores",
            "mapWritableState",
            "setActivePinia",
            "setMapStoreSuffix",
            "storeToRefs",
          ],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "~": path.resolve(__dirname, "./"),
      "#imports": path.resolve(__dirname, "./.nuxt/imports.d.ts"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      inline: [/@nuxt\/test-utils-edge/],
    },
  },
});
