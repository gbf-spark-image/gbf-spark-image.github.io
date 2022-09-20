export const useSettingsStore = defineStore({
    id: 'SettingsStore',
    state: () => { 
        let appSettings = {
            assetQuality: "Auto",
        } as appSettings

        if (localStorage.getItem('settings.appSettings')) {
            appSettings = JSON.parse(
                localStorage.getItem('settings.appSettings')
            )
        }

        return { appSettings }
    },
})

interface appSettings {
    assetQuality: "Auto" | "High" | "Low",
}

