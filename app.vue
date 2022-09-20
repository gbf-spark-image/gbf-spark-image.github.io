<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useSparkStore } from "./stores/SparkStore";
import { useSettingsStore } from "@/stores/SettingsStore";

useHead({
  bodyAttrs: {
    class: "dark bg-black text-neutral-300",
  },
});

const sparkStore = useSparkStore();
sparkStore.$subscribe((_, state) => {
  localStorage.setItem("spark.currentSpark", JSON.stringify(state.spark));
});

const SettingsStore = useSettingsStore();
SettingsStore.$subscribe((_, state) => {
  localStorage.setItem(
    "settings.appSettings",
    JSON.stringify(state.appSettings)
  );
});
</script>

<style>
.layout-enter-active,
.page-enter-active {
  opacity: 0;
  transition: opacity 0.15s linear;
}

.layout-enter-to,
.page-enter-to {
  opacity: 1;
}

.layout-leave-active,
.page-leave-active {
  opacity: 1;
  transition: opacity 0.15s linear;
}

.layout-leave-to,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.2s;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
