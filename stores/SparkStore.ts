export const useSparkStore = defineStore({
    id: 'SparkStore',
    state: () => {
        return {
            currentSpark: {
                newCharaList: [] as CharaInfo[],
                dupeCharaList: [] as CharaInfo[],
                summonList: [] as SummonInfo[],
            }
        }
    },
    actions: {
        initializeState() {
            if (localStorage.getItem('spark.currentSpark')) {
                this.currentSpark = JSON.parse(
                        localStorage.getItem('spark.currentSpark')
                    )
            }
        },
        saveState() {
            localStorage.setItem('spark.currentSpark', JSON.stringify(this.currentSpark))
        },
    },
    getters: {
        spark: state => state.currentSpark,
    }
})

interface CharaInfo {
    uuid: string,
    gacha_id: number,
    id: string,
    name: string,
    weapon: string,
}

interface SummonInfo {
    uuid: string,
    id: string,
    name: string,
}