<template>
  <NuxtLink
    :to="to"
    class="bg-black hover:bg-white text-white hover:text-black rounded border-white border py-2 px-4 font-bold text-center flex align-middle justify-center"
    style=""
  >
    <div class="text-center m-auto">
      {{ text }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, default: "" },
  to: { type: Object, default: "/" },
});
</script>
