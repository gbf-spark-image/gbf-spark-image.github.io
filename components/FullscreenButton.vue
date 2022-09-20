<template>
  <button class="hover:bg-white hover:text-black rounded">
    <svg
      v-if="!isFullscreen"
      @click="openFullscreen"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
    <svg
      v-if="isFullscreen"
      @click="closeFullscreen"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
const el = (document as any).documentElement;
const isFullscreen = ref(
  (document as any).fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement
);

function openFullscreen() {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if ((document as any).exitFullscreen) {
    (document as any).exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
}

function setIsFullscreen() {
  isFullscreen.value =
    (document as any).fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement;
}

onMounted(() => {
  (document as any).addEventListener("fullscreenchange", setIsFullscreen);
});
onUnmounted(() => {
  (document as any).removeEventListener("fullscreenchange", setIsFullscreen);
});
</script>
