<template>
  <NuxtLink
    :to="to"
    class="bg-black hover:bg-white text-white hover:text-black border-white border py-2 px-4 font-bold text-center flex align-middle justify-center duration-200"
    style=""
  >
    <div class="text-center m-auto">
      <slot />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  to: { type: Object, default: { path: "/" } },
});
</script>
