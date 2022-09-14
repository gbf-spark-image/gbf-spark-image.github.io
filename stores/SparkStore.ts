export const useSparkStore = defineStore({
    id: 'SparkStore',
    state: () => {
        return {
            currentSpark: {
                newCharaList: [] ,
                dupeCharaList: [] ,
                summonList: [] ,
            } as Spark
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

export type Spark = {
    newCharaList: CharaInfo[],
    dupeCharaList: CharaInfo[],
    summonList: SummonInfo[],
}

export type CharaInfo = {
    uuid?: string,
    gacha_id: number,
    id: string,
    name: string,
    weapon: string,
}

export type SummonInfo = {
    uuid?: string,
    id: string,
    name: string,
}