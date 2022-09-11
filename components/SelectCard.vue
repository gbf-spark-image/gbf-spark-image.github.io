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
      class="text-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out absolute bg-amber-300 bg-opacity-70 w-full bottom-0 left-0 right-0 py-1 m-auto text-amber-900 font-semibold text-xs sm:text-sm md:text-base"
      style="pointer-events: none; max-width: 280px"
    >
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    id: String,
    type: { type: String["char" | "summ"], default: "char" },
    quality: { type: String, default: "" },
    loading: { type: String, default: "lazy" },
  },
  data() {
    const imageUrl = `/${this.type}_thumb${this.quality.length ? "_low" : ""}/${
      this.id
    }${this.type == "char" ? "_01" : ""}.webp`;
    return {
      imageUrl,
    };
  },
};
</script>
