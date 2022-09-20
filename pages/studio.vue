<template>
  <div class="p-3 w-screen h-screen flex flex-col flex-grow gap-3">
    <UiLinkButton
      class="absolute left-0 top-0 m-5 opacity-80 hover:opacity-100"
    >
      <IconBackArrow class="w-6 h-6 m-auto" />
    </UiLinkButton>
    <FullscreenButton
      class="absolute right-0 top-0 opacity-80 hover:opacity-100 m-5"
    />
    <Take id="take" :spark="spark" class="bg-black h-full" />
    <div class="flex absolute bottom-0 left-0 w-full p-5">
      <UiButton
        class="flex-grow basis-0 opacity-80 hover:opacity-100"
        @click="downloadSparkImage"
      >
        <IconDownload class="w-6 h-6 m-auto" />
      </UiButton>
      <UiButton
        class="flex-grow basis-0 opacity-80 hover:opacity-100"
        @click="generateSparkImage"
      >
        <IconClipboardPaste class="w-6 h-6 m-auto" />
      </UiButton>
    </div>

    <a id="link" class="hidden"></a>
  </div>
</template>

<script setup lang="ts">
import jsonData from "@/assets/data.json";
import { Spark } from "@/stores/SparkStore";
import { decompressFromEncodedURIComponent } from "lz-string";
import html2canvas from "html2canvas";

definePageMeta({
  layout: "studio",
});

const charaData = ref(jsonData.chara_list);
const summonData = ref(jsonData.summon_list);
const route = useRoute();

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

function parseSpark() {
  const decompressedSpark = decompressFromEncodedURIComponent(route.query.spark)
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

let spark = ref({
  newCharaList: [],
  dupeCharaList: [],
  summonList: [],
} as Spark);
try {
  spark.value = parseSpark();
} catch (e) {
  alert("Invalid spark code.");
}

function downloadSparkImage() {
  const link = document.getElementById("link");
  const take = document.getElementById("take");
  html2canvas(take).then(function (canvas) {
    link.setAttribute("download", "spark.png");
    link.setAttribute(
      "href",
      canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    );
    link.click();
  });
}

async function generateSparkImage() {
  const take = document.getElementById("take");

  const canvas = await html2canvas(take);
  try {
    canvas.toBlob((blob: any) => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
    });
    // txt.style.display = "none";
    // txt.style.color = "lightgreen";
    // txt.innerText = "Image has been copied";
    // txt.style.display = "initial";
  } catch (err) {
    // txt.style.display = "none";
    // txt.style.color = "tomato";
    // txt.innerText = "Image copy failed";
    // txt.style.display = "initial";
  }
}
</script>
