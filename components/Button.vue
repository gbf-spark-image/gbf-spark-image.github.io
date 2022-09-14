<template>
  <button
    class="bg-black hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded border-white border"
    type="button"
  >
    {{ props.text }}
  </button>
</template>

<script setup>
const props = defineProps({
  text: { type: String, default: "" },
});
</script>
