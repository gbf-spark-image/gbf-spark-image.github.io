import { setActivePinia, createPinia } from "@pinia/nuxt/node_modules/pinia";
import { useSparkStore, Spark } from "./SparkStore";

declare module "vitest" {
  export interface TestContext {
    spark?: Spark;
  }
}

describe("Spark Store", async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should work.", () => {
    const store = useSparkStore();
    expect(store).toBeDefined();
  });
});

describe("Spark Class", () => {
  beforeEach(async (ctx) => {
    ctx.spark = new Spark();
    ctx.spark.newCharaList.push({
      gacha_id: 578,
      id: "3040420000",
      name: "Jeanne d'Arc",
      weapon: "Mystique",
    });
  });

  it("should serialize a spark", (ctx) => {
    const serializedSpark = ctx.spark.getCode();
    expect(serializedSpark.length).toBeLessThan(
      JSON.stringify(ctx.spark).length
    );
  });

  it("should deserialize a spark", (ctx) => {
    const serializedSpark = ctx.spark.getCode();
    const deserializedSpark = Spark.deserialize(serializedSpark);
    expect(deserializedSpark).toMatchObject(ctx.spark);
  });
});
