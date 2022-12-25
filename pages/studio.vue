<template>
  <div class="p-3 w-screen h-screen flex flex-col flex-grow gap-3">
    <UiLinkButton
      class="absolute left-0 top-0 m-5 opacity-80 hover:opacity-100 rounded border-0"
      aria-label="back"
    >
      <IconBackArrow class="w-6 h-6 m-auto" />
    </UiLinkButton>

    <FullscreenButton
      class="absolute right-0 top-0 opacity-80 hover:opacity-100 m-5 py-2 px-4 duration-200"
      aria-label="fullscreen"
    />

    <Take id="take" :spark="spark" class="bg-black h-full" />
    <div class="flex absolute bottom-0 left-0 w-full p-5 vo">
      <UiButton
        class="flex-grow basis-0 opacity-80 hover:opacity-100 rounded rounded-r-none"
        @click="downloadSparkImage"
        aria-label="download"
      >
        <IconDownload class="w-6 h-6 m-auto" />
      </UiButton>
      <UiButton
        ref="copyButton"
        class="flex-grow basis-0 opacity-80 enabled:hover:opacity-100 rounded rounded-l-none white-icon"
        @click="generateSparkImage"
        aria-label="copy to clipboard"
        :disabled="!supported"
      >
        <div v-if="!supported" class="flex flex-row justify-center">
          <IconClipboardPaste class="w-6 h-6" />
          <span>Not supported</span>
        </div>
        <IconClipboardPaste v-else class="w-6 h-6 m-auto white-icon" />
        <IconCheck id="check-icon" class="w-6 h-6 m-auto green-icon" />
      </UiButton>
    </div>

    <a id="link" class="hidden"></a>
  </div>
</template>

<script setup lang="ts">
import { Spark } from "@/stores/SparkStore";
import { promiseTimeout } from "@vueuse/shared";
import html2canvas from "html2canvas";

definePageMeta({
  layout: "studio",
});

const route = useRoute();

const supported = typeof ClipboardItem !== "undefined";
const copyButton = ref(null);
let spark = ref(Spark.deserialize(route.query.spark as string));

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
  if (!supported) {
    return;
  }
  greenButton(copyButton.value.$el as HTMLElement);

  const take = document.getElementById("take");

  const canvas = await html2canvas(take);
  canvas.toBlob((blob: any) => {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  });

  async function greenButton(el: HTMLElement) {
    el.classList.remove("enabled:hover:bg-white", "white-icon");
    el.classList.add("bg-green-400", "green-icon", "opacity-100");
    await promiseTimeout(1000);
    el.classList.add("enabled:hover:bg-white", "white-icon");
    el.classList.remove("bg-green-400", "green-icon", "opacity-100");
  }
}
</script>

<style scoped>
.white-icon .white-icon {
  display: initial;
  opacity: 1;
}

.white-icon .green-icon {
  display: none;
  opacity: 0;
}

.green-icon .white-icon {
  display: none;
  opacity: 0;
}

.green-icon .green-icon {
  display: initial;
  opacity: 1;
}
</style>
