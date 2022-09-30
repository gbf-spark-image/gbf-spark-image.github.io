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
  assetQuality: "Auto" | "High" | "Low" = "Auto";
}
