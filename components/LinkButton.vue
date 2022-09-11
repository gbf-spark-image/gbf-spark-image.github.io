<template>
  <NuxtLink
    :to="props.to"
    class="bg-black hover:bg-white text-white hover:text-black rounded border-white border py-2 px-4 font-bold text-center flex align-middle justify-center"
    style=""
  >
    <div class="text-center m-auto">
      {{ props.text }}
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  text: { type: String, default: "" },
  to: { default: "/" },
});
</script>
