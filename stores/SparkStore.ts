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
    gacha_id: number,
    id: string,
    name: string,
    weapon: string
}

interface SummonInfo {
    id: string,
    name: string,
}