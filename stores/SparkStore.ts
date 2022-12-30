import { defineStore } from "@pinia/nuxt/node_modules/pinia";

import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import jsonData from "@/assets/data.json";

const charaData = jsonData.chara_list;
const summonData = jsonData.summon_list;

export const useSparkStore = defineStore({
  id: "SparkStore",
  state: () => {
    return {
      currentSpark: reactive(
        useLocalStorage("spark.currentSpark", new Spark(), {
          serializer: {
            read: Spark.deserialize,
            write: Spark.serialize,
          },
        })
      ),
    };
  },
});

function uuid(a?: any) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}

export class Spark {
  newCharaList: CharaInfo[] = [];
  dupeCharaList: CharaInfo[] = [];
  summonList: SummonInfo[] = [];

  static serialize(spark: Spark): string {
    const miniSpark = [
      spark.newCharaList.map((e) => e.id.slice(4, -3)).join(""),
      spark.dupeCharaList.map((e) => e.id.slice(4, -3)).join(""),
      spark.summonList.map((e) => e.id.slice(4, -3)).join(""),
    ];
    const sparkString = JSON.stringify(miniSpark)
      .replaceAll('"', "")
      .replaceAll("[", "")
      .replaceAll("]", "");
    return compressToEncodedURIComponent(sparkString);
  }

  static deserialize(serializedSparkString: string): Spark {
    function parseList(
      string: string,
      index: number
    ): CharaInfo[] | SummonInfo[] {
      if (!string.length) {
        return [];
      }
      const prefix = `${index === 2 ? "2" : "3"}040`;
      return (
        string
          .match(/.{1,3}/g)
          ?.map((e) => `${prefix}${e}000`)
          .map(
            (e) =>
              charaData.find((chara) => chara.id == e) ||
              summonData.find((summon) => summon.id == e)
          )
          .filter((e): e is { id: string; name: string } => e !== undefined) ??
        []
      );
    }
    try {
      const decompressedSparkStrings = (
        decompressFromEncodedURIComponent(serializedSparkString) ?? ""
      ).split(",");
      const spark = new Spark();
      decompressedSparkStrings.forEach((s: string, i: number) => {
        parseList(s, i).forEach((item) => {
          switch (i) {
            case 0:
              spark.add("new", item as CharaInfo);
              break;
            case 1:
              spark.add("dupe", item as CharaInfo);
              break;
            case 2:
              spark.add("summon", item as SummonInfo);
              break;
          }
        });
      });
      return spark;
    } catch (err) {
      return new Spark();
    }
  }

  add(key: "new" | "dupe", item: CharaInfo, index?: number): void;
  add(key: "summon", item: SummonInfo, index?: number): void;
  add(
    key: "new" | "dupe" | "summon",
    item: CharaInfo | SummonInfo,
    index = Infinity
  ) {
    item = Object.assign({}, item);
    item.uuid = uuid();
    switch (key) {
      case "new":
        this.newCharaList.splice(index, 0, item as CharaInfo);
        break;
      case "dupe":
        this.dupeCharaList.splice(index, 0, item as CharaInfo);
        break;
      case "summon":
        this.summonList.splice(index, 0, item as SummonInfo);
        break;
    }
  }

  move(list: CharaInfo[] | SummonInfo[], from: number, to: number) {
    const item = list.splice(from, 1);
    list.splice(to, 0, ...item);
  }

  remove(index: number, array: CharaInfo[] | SummonInfo[]) {
    array.splice(index, 1);
  }

  getCode() {
    return Spark.serialize(this);
  }

  clear() {
    this.newCharaList.length = 0;
    this.dupeCharaList.length = 0;
    this.summonList.length = 0;
  }
}

interface CharaInfo {
  uuid?: string;
  gacha_id: number;
  id: string;
  name: string;
  weapon: string;
}

interface SummonInfo {
  uuid?: string;
  id: string;
  name: string;
}
