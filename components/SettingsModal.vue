<template>
  <UiModal>
    <div class="mb-3 flex gap-1">
      <IconSettings class="w-7 h-7" />
      <span class="text-lg font-bold">Settings</span>
    </div>
    <div>
      <span>Image quality</span>
    </div>

    <UiRadioGroup
      :list="
        Object.values(AssetQuality).slice(
          0,
          Object.values(AssetQuality).length / 2
        )
      "
      :activeIndex="appSettings.assetQuality"
      @active-index="changeQuality"
    />
  </UiModal>
</template>

<script setup lang="ts">
import { useSettingsStore, AssetQuality } from "@/stores/SettingsStore";

const appSettings = useSettingsStore().appSettings;

function changeQuality(number: number) {
  appSettings.assetQuality = number;
}
</script>
