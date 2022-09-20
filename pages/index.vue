<template>
  <div
    class="mx-3 flex flex-col xl:flex-row flex-grow gap-3 basis-0 overflow-hidden"
  >
    <Take
      class="w-full xl:w-2/3 h-2/3 xl:h-full"
      :spark="spark"
      @take-card-click="removeFromSpark"
    />
    <div
      class="min-h-[33.333333%] h-1/3 w-full xl:w-1/3 xl:h-full flex flex-row xl:flex-col gap-2"
    >
      <Pick
        @pick-card-click="addToSpark"
        class="xl:w-full xl:h-1/2 flex-grow order-1 xl:order-2 basis-0"
      />
      <IndexButtonList
        class="min-w-[10vw] xl:grid-cols-4 pb-0 xl:pb-2 xl:pl-0 order-2 xl:order-1 grid-cols-1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSparkStore } from "@/stores/SparkStore";

const spark = useSparkStore().spark;

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
}

function removeFromSpark(index: number, array: []) {
  array.splice(index, 1);
}
</script>
