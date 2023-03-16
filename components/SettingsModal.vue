<template>
  <UiModal>
    <div class="mb-3 flex gap-1">
      <IconSettings class="w-7 h-7" />
      <span class="text-lg font-bold">Settings</span>
    </div>

    <div class="flex flex-col gap-5 mb-3">
      <div>
        <span>Image quality</span>

        <UiRadioGroup
          name="assetQuality"
          :list="enumToList(AssetQuality)"
          :activeIndex="appSettings.assetQuality"
          @active-index="changeSetting('assetQuality', $event)"
        />
      </div>

      <div>
        <span>Spark marker</span>
        <UiRadioGroup
          name="sparkMarker"
          :list="enumToList(SparkMarker)"
          :activeIndex="appSettings.sparkMarker"
          @active-index="changeSetting('sparkMarker', $event)"
        />
      </div>

      <div>
        <div>Stats</div>
        <div class="flex">
          <UiToggle toggle-id="ssr-rate" v-model="appSettings.showSSRRate">
            <label for="ssr-rate" class="mx-2 flex gap-1">
              <span class="my-auto"> SSR rate over </span>
              <UiInput
                type="number"
                v-model="appSettings.pullNumberStr"
                class="w-16"
              />
              <span class="my-auto">pulls.</span>
            </label>
          </UiToggle>
        </div>
      </div>

      <!-- <div>
        <span>Export code</span>

        <div
          class="items-center w-full text-sm font-medium rounded-lg border-2 sm:flex bg-gray-700 border-gray-600 text-white overflow-hidden"
        >
          <div
            class="w-full p-3 border-b sm:border-b-0 sm:border-r border-gray-600"
          >
            <span class="">
              {{ currentSpark.getCode() }}
            </span>
          </div>
        </div>
      </div> -->
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import {
  useSettingsStore,
  AssetQuality,
  SparkMarker,
} from "@/stores/SettingsStore";
import { useSparkStore } from "@/stores/SparkStore";

const appSettings = useSettingsStore().appSettings;
const currentSpark = useSparkStore().currentSpark;

function enumToList(enum_: object) {
  return Object.values(enum_).slice(0, Object.values(enum_).length / 2);
}

function changeSetting(setting: string, number: number) {
  appSettings[setting] = number;
}
</script>
