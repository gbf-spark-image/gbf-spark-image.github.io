<template>
  <div class="relative group" style="cursor: pointer">
    <img
      :src="imageUrl"
      alt="thumbnail"
      class="object-contain mx-auto"
      :loading="loading"
      width="280"
      height="160"
    />
    <div
      class="text-center opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out absolute bg-amber-300 bg-opacity-70 w-full bottom-0 left-0 right-0 py-1 m-auto text-amber-900 font-semibold text-xs sm:text-sm md:text-base"
      style="pointer-events: none; max-width: 280px"
    >
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const _props = defineProps({
  name: String,
  id: String,
  cardType: { type: String, default: "char" },
  quality: { type: String, default: "" },
  loading: { type: String, default: "lazy" },
});

const imageUrl = `/${_props.cardType}_thumb${
  _props.quality.length ? "_low" : ""
}/${_props.id}${_props.cardType == "char" ? "_01" : ""}.webp`;
</script>
