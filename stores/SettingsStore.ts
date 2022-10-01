export const useSettingsStore = defineStore({
  id: "SettingsStore",
  state: () => {
    return {
      appSettings: reactive(
        useLocalStorage("settings.appSettings", new appSettings())
      ),
    };
  },
});

class appSettings {
  assetQuality: AssetQuality = AssetQuality.Auto;
}

export enum AssetQuality {
  Auto,
  High,
  Low,
}
