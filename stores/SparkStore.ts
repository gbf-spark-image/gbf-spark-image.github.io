import { compressToEncodedURIComponent } from "lz-string";

export const useSparkStore = defineStore({
    id: 'SparkStore',
    state: () => {
        let spark = {
            newCharaList: [] ,
            dupeCharaList: [] ,
            summonList: [] ,
        } as Spark
        if (localStorage.getItem('spark.currentSpark')) {
            spark = JSON.parse(
                    localStorage.getItem('spark.currentSpark')
                )
        }
        return {
            spark
        }
    },
    actions: {
        clearSpark() {
            this.spark.newCharaList.splice(0, this.spark.newCharaList.length);
            this.spark.dupeCharaList.splice(0, this.spark.dupeCharaList.length);
            this.spark.summonList.splice(0, this.spark.summonList.length);
        },
    },
    getters:{
        sparkCode: (state) =>{
            const miniSpark = [
                state.spark.newCharaList.map((e) => e.id.slice(4, -3)).join(""),
                state.spark.dupeCharaList.map((e) => e.id.slice(4, -3)).join(""),
                state.spark.summonList.map((e) => e.id.slice(4, -3)).join(""),
              ];
              const sparkString = JSON.stringify(miniSpark)
                .replaceAll('"', "")
                .replaceAll("[", "")
                .replaceAll("]", "");
            return compressToEncodedURIComponent(sparkString)
        }
    }
})

export interface Spark {
    newCharaList: CharaInfo[],
    dupeCharaList: CharaInfo[],
    summonList: SummonInfo[],
}

interface CharaInfo {
    uuid?: string,
    gacha_id: number,
    id: string,
    name: string,
    weapon: string,
}

interface SummonInfo {
    uuid?: string,
    id: string,
    name: string,
}