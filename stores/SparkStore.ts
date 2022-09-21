import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import jsonData from "@/assets/data.json";

const charaData = ref(jsonData.chara_list);
const summonData = ref(jsonData.summon_list);

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
            return serializeSpark(state.spark)
        }
    }
})

export function serializeSpark (spark: Spark) {
    const miniSpark = [
        spark.newCharaList.map((e) => e.id.slice(4, -3)).join(""),
        spark.dupeCharaList.map((e) => e.id.slice(4, -3)).join(""),
        spark.summonList.map((e) => e.id.slice(4, -3)).join(""),
      ];
      const sparkString = JSON.stringify(miniSpark)
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "");
    return compressToEncodedURIComponent(sparkString)
}

export function deserializeSpark(serializedSparkString: string | string[]): Spark {
    function parseList(string: string, index: number) {
        if (!string.length) {
            return [];
        }
        const prefix = `${index === 2 ? "2" : "3"}040`;
        return string
            .match(/.{1,3}/g)
            .map((e) => `${prefix}${e}000`)
            .map(
                (e) =>
                charaData.value.find((chara) => chara.id == e) ||
                summonData.value.find((summon) => summon.id == e)
            )
            .filter((e) => e !== undefined);
    }
    try{
        const decompressedSpark = decompressFromEncodedURIComponent(serializedSparkString)
            .replaceAll(",", " , ")
            .split(",")
            .map((e: string) => e.replaceAll(" ", ""));
        const keys = ["newCharaList", "dupeCharaList", "summonList"];
        const res = {};
        decompressedSpark.forEach(
            (e: string, i: number) => (res[keys[i]] = parseList(e, i))
        );
        return res as Spark;
    }
    catch (err) {
        return {
            newCharaList: [],
            dupeCharaList: [],
            summonList: [],
          }
    }
}

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