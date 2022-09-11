<template>
  <div
    class="p-3 pb-0 w-screen flex flex-col"
    style="max-height: calc(100vh - 56px - 36px)"
    ref="studio"
  >
    <Take :spark="spark" class="bg-black" />
    <a ref="link" class="hidden"></a>
    <div class="flex justify-center p-3 absolute">
      <Button text="Download" @click="downloadSparkImage" />
      <Button text="Copy image to clipboard" @click="generateSparkImage" />
    </div>
  </div>
</template>

<script setup>
import jsonData from "~/public/data.json";
import { decompressFromEncodedURIComponent } from "lz-string";
import html2canvas from "html2canvas";

const studio = ref(null);
const link = ref(null);
const charaData = ref(jsonData.chara_list);
const summonData = ref(jsonData.summon_list);
const route = useRoute();

function parseList(string, index) {
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
  const decompressedSpark = decompressFromEncodedURIComponent(
    route.query.spark
  ).split(",");

  const keys = ["newCharaList", "dupeCharaList", "summonList"];
  const res = {};
  decompressedSpark.forEach((e, i) => (res[keys[i]] = parseList(e, i)));
  return res;
}

let spark = ref({
  newCharaList: [],
  dupeCharaList: [],
  summonList: [],
});
try {
  spark = ref(parseSpark());
} catch (e) {
  alert("Invalid spark code.");
}

function downloadSparkImage() {
  const link = studio.value.children[1];
  html2canvas(studio.value.children[0]).then(function (canvas) {
    link.setAttribute("download", "spark.png");
    link.setAttribute(
      "href",
      canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    );
    link.click();
  });
}

function generateSparkImage() {
  html2canvas(studio.value.children[0]).then(function (canvas) {
    try {
      canvas.toBlob(function (blob) {
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
  });
}
</script>
