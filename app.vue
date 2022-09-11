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

<style>
.page-enter-active {
  opacity: 0;
  transition: opacity 0.15s linear;
}

.page-enter-to {
  opacity: 1;
}

.page-leave-active {
  opacity: 1;
  transition: opacity 0.15s linear;
}

.page-leave-to {
  opacity: 0;
}
</style>
