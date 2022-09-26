import { setActivePinia, createPinia } from "@pinia/nuxt/node_modules/pinia";
import { serializeSpark, deserializeSpark, useSparkStore } from "./SparkStore";

const spark = {
  newCharaList: [],
  dupeCharaList: [],
  summonList: [],
};

describe("Spark Store", async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should work.", () => {
    const store = useSparkStore();
    expect(store).toBeDefined();
  });

  it("should serrialize a spark", () => {
    const serializedSpark = serializeSpark(spark);
    expect(serializedSpark.length).toBeLessThan(JSON.stringify(spark).length);
  });

  it("should deserialize a spark", () => {
    const serializedSpark = serializeSpark(spark);
    const deserializedSpark = deserializeSpark(serializedSpark);
    expect(deserializedSpark).toMatchObject(spark);
  });
});
