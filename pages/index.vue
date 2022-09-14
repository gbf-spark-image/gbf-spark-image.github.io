<template>
  <div
    class="px-3 w-screen flex flex-col xl:flex-row"
    style="max-height: calc(100vh - 56px - 36px)"
  >
    <!-- above calc: height = screen - navbar - footer -->
    <Take
      class="xl:w-2/3 w-full"
      :spark="spark"
      @take-card-click="removeFromSpark"
    />

    <div
      class="pt-1 xl:pt-0 xl:pl-4 w-full xl:w-1/3 h-1/3 xl:h-full flex flex-row xl:flex-col min-h-[33.33%]"
    >
      <Pick
        @pick-card-click="addToSpark"
        class="w-4/5 h-full xl:w-full xl:h-1/2 flex-grow order-1 xl:order-2"
      />
      <div
        class="grid xl:grid-cols-4 pl-2 pb-0 xl:pb-2 xl:pl-0 flex-grow xl:flex-grow-0 order-2 xl:order-1 grid-cols-1"
      >
        <Button
          text="Settings"
          class="rounded-none rounded-t xl:rounded-t-none xl:rounded-l hover:bg-black hover:text-white"
          disabled
        />
        <Button
          text="Clear Spark"
          @click="sparkAlert = true"
          class="rounded-none"
          data-modal-toggle="popup-modal"
        />
        <Button
          text="Help"
          class="rounded-none hover:bg-black hover:text-white"
          disabled
        />
        <LinkButton
          text="Next ->"
          :to="{ name: 'studio', query: { spark: generateSparkCode() } }"
          class="rounded-none rounded-b xl:rounded-b-none xl:rounded-r"
        />
      </div>
    </div>
    <Alert
      :active="sparkAlert"
      @deactivate="sparkAlert = false"
      @clear-spark="clearSpark"
    />
  </div>
</template>

<script setup lang="ts">
import { useSparkStore } from "@/stores/SparkStore";
import { compressToEncodedURIComponent } from "lz-string";

const sparkStore = useSparkStore();
sparkStore.initializeState();
const spark = sparkStore.spark;

function uuid(a?: any) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
function addToSpark(ref, item) {
  item = Object.assign({}, item);
  item.uuid = uuid();
  if (ref === "new") {
    spark.newCharaList.push(item);
  } else if (ref === "dupe") {
    spark.dupeCharaList.push(item);
  } else if (ref === "summon") {
    spark.summonList.push(item);
  }
  sparkStore.saveState();
}

function removeFromSpark(index: number, array: []) {
  array.splice(index, 1);
  sparkStore.saveState();
}

function stringifySpark() {
  const miniSpark = [
    spark.newCharaList.map((e) => e.id.slice(4, -3)).join(""),
    spark.dupeCharaList.map((e) => e.id.slice(4, -3)).join(""),

    spark.summonList.map((e) => e.id.slice(4, -3)).join(""),
  ];
  const sparkString = JSON.stringify(miniSpark)
    .replaceAll('"', "")
    .replaceAll("[", "")
    .replaceAll("]", "");
  return sparkString;
}

function generateSparkCode() {
  return compressToEncodedURIComponent(stringifySpark());
}

const sparkAlert = ref(false);

function clearSpark() {
  sparkAlert.value = false;
  spark.newCharaList.splice(0, spark.newCharaList.length);
  spark.dupeCharaList.splice(0, spark.dupeCharaList.length);
  spark.summonList.splice(0, spark.summonList.length);
  sparkStore.saveState();
}
</script>
