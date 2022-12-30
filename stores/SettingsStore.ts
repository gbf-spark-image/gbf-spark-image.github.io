import { defineStore } from "@pinia/nuxt/node_modules/pinia";

export const useSettingsStore = defineStore({
  id: "SettingsStore",
  state: () => {
    return {
      appSettings: reactive(
        useLocalStorage("settings.appSettings", new appSettings(), {
          mergeDefaults: true,
        })
      ),
    };
  },
});

class appSettings {
  assetQuality: AssetQuality = AssetQuality.Auto;
  sparkMarker: SparkMarker = SparkMarker.New;
}

export enum AssetQuality {
  Auto,
  High,
  Low,
}

export enum SparkMarker {
  New,
  Dupe,
  Summon,
  None,
}
