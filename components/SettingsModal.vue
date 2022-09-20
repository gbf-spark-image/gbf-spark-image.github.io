<template>
  <UiModal>
    <div class="mb-3 flex gap-1">
      <IconSettings class="w-7 h-7" />
      <span class="text-lg font-bold">Settings</span>
    </div>
    <div>
      <span>Image quality: {{ appSettings.assetQuality }}</span>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/stores/SettingsStore";

const appSettings = useSettingsStore().appSettings;
</script>
