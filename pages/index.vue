<template>
  <!--  calc: height = screen - navbar - footer -->
  <div
    class="p-3 pb-0 w-screen flex flex-col xl:flex-row"
    style="max-height: calc(100vh - 56px - 36px)"
  >
    <Take
      class="xl:w-2/3 w-full"
      :spark="spark"
      @remove-from-spark="removeFromSpark"
    />

    <div
      class="pt-1 xl:pt-0 xl:pl-4 w-full xl:w-1/3 h-1/3 xl:h-full flex flex-col"
    >
      <div class="flex w-full h-16">
        <img src="/icon.png" alt="icon" class="pr-2 pb-2 w-14 object-contain" />
        <input
          v-model="filter"
          type="text"
          class="bg-black text-2xl focus:outline-none w-full"
          placeholder="Search for names or weapons..."
        />
      </div>
      <div class="w-full grid grid-cols-4 xl:grid-cols-3 gap-2 overflow-y-auto">
        <SelectCard
          v-for="(chara, i) in charaData"
          :key="chara.id + i"
          v-show="
            chara.name.toLowerCase().includes(filter) ||
            chara.weapon.toLowerCase().includes(filter)
          "
          :name="chara.name"
          :id="chara.id"
          @click.left="addToSpark('new', chara)"
          @click.right="addToSpark('dupe', chara)"
          oncontextmenu="return false;"
        />
        <SelectCard
          v-for="(summon, i) in summonData"
          :key="summon.id + i"
          v-show="summon.name.toLowerCase().includes(filter)"
          :name="summon.name"
          :id="summon.id"
          type="summ"
          @click="addToSpark('summon', summon)"
        />
      </div>
    </div>
    <div class="justify-start">
      <NuxtLink
        :to="{ name: 'studio', query: { spark: generateSparkCode() } }"
        class="rounded border border-white p-1"
        >Next</NuxtLink
      >
      <!-- <a :href="`/studio?spark=${generateSparkCode()}`">Next</a> -->
    </div>
  </div>
</template>

<script setup>
import jsonData from "@/assets/data.json";
import { useSparkStore } from "@/stores/SparkStore";
import { compressToEncodedURIComponent } from "lz-string";

const filter = ref("");
const charaData = ref(jsonData.chara_list);
const summonData = ref(jsonData.summon_list);
const sparkStore = useSparkStore();
sparkStore.initializeState();
const spark = sparkStore.spark;

function addToSpark(ref, item) {
  if (ref === "new") {
    spark.newCharaList.push(item);
  } else if (ref === "dupe") {
    spark.dupeCharaList.push(item);
  } else if (ref === "summon") {
    spark.summonList.push(item);
  }
  sparkStore.saveState();
}

function removeFromSpark(index, array) {
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
</script>
