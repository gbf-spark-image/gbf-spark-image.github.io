<template>
  <div class="flex flex-col h-screen justify-between">
    <Navbar />
    <NuxtPage class="flex-grow" />
    <Footer />
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: "dark bg-black text-neutral-300",
  },
});
</script>
