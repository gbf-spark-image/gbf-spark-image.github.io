<template>
  <div
    ref="card"
    :style="`cursor: pointer;max-width: ${maxWidth}px;max-height: ${maxHeight}px;--offsetTop:${offsetTop}px;--offsetLeft:${offsetLeft}px;--offsetWidth:${offsetWidth}px`"
    class="relative group m-auto"
    oncontextmenu="return false;"
  >
    <img
      :src="imageUrl"
      :alt="`${name}'s thumbnail`"
      class="object-contain mx-auto"
      :loading="loading"
      :width="maxWidth"
      :height="maxHeight"
    />
    <div
      class="text-center opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out absolute bg-amber-300 bg-opacity-70 w-full bottom-0 left-0 right-0 py-1 m-auto text-amber-900 font-semibold text-xs sm:text-sm md:text-base"
      style="pointer-events: none"
    >
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore, AssetQuality } from "@/stores/SettingsStore";

const settings = useSettingsStore().appSettings;

const _props = defineProps({
  name: String,
  id: String,
  loading: { type: String, default: "lazy" },
});

const card = ref(null);
const offsetTop = ref("");
const offsetLeft = ref("");
const offsetWidth = ref("");

let interval = null;
onMounted(() => {
  interval = setInterval(() => {
    offsetTop.value = card.value.offsetTop;
    offsetLeft.value = card.value.offsetLeft;
    offsetWidth.value = card.value.offsetWidth;
  }, 200);
});

onUnmounted(() => {
  clearInterval(interval);
});

const cardType = _props.id.startsWith("3") ? "char" : "summ";
const lowQuality = computed(() => {
  switch (settings.assetQuality) {
    case AssetQuality.Auto: {
      return useMobileCheck().value;
    }
    case AssetQuality.High: {
      return false;
    }
    case AssetQuality.Low: {
      return true;
    }
  }
});

const maxWidth = 280;

const maxHeight = 160;

const imageUrl = computed(() => {
  return `/${cardType}_thumb${lowQuality.value ? "_low" : ""}/${_props.id}${
    cardType == "char" ? "_01" : ""
  }.webp`;
});
</script>
