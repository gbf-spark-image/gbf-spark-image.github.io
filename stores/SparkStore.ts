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
      return string
        .match(/.{1,3}/g)
        .map((e) => `${prefix}${e}000`)
        .map(
          (e) =>
            charaData.find((chara) => chara.id == e) ||
            summonData.find((summon) => summon.id == e)
        )
        .filter((e) => e !== undefined);
    }
    try {
      const decompressedSpark = decompressFromEncodedURIComponent(
        serializedSparkString
      )
        .replaceAll(",", " , ")
        .split(",")
        .map((e: string) => e.replaceAll(" ", ""));
      const keys: ("new" | "dupe" | "summon")[] = ["new", "dupe", "summon"];
      const spark = new Spark();
      decompressedSpark.forEach((e: string, i: number) =>
        parseList(e, i).forEach((chara) => spark.add(keys[i], chara))
      );
      return spark;
    } catch (err) {
      return new Spark();
    }
  }

  add(key: "new" | "dupe" | "summon", item: CharaInfo | SummonInfo) {
    item = Object.assign({}, item);
    item.uuid = uuid();
    if (key === "new") {
      this.newCharaList.push(item as CharaInfo);
      this.newCharaList.splice(0, 0);
    } else if (key === "dupe") {
      this.dupeCharaList.push(item as CharaInfo);
    } else if (key === "summon") {
      this.summonList.push(item as SummonInfo);
    }
  }

  remove(index: number, array: CharaInfo[] | SummonInfo[]) {
    array.splice(index, 1);
  }

  getCode() {
    return Spark.serialize(this);
  }

  clear() {
    this.newCharaList.splice(0, this.newCharaList.length);
    this.dupeCharaList.splice(0, this.dupeCharaList.length);
    this.summonList.splice(0, this.summonList.length);
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
