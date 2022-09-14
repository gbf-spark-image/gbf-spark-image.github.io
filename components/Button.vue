<template>
  <button
    class="bg-black hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded border-white border"
    type="button"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, default: "" },
});
</script>
