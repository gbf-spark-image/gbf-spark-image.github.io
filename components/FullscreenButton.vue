<template>
  <button
    @click="toggleFullscreen"
    class="hover:bg-white hover:text-black rounded"
  >
    <svg
      v-if="!isFullscreen"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
    <svg
      v-if="isFullscreen"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
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
const doc = document as any;
const el = doc.documentElement;
const isFullscreen = ref(
  (doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement) != null
);

function toggleFullscreen() {
  if (isFullscreen.value) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
}

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
  if (!isFullscreen.value) {
    return;
  }
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  }
}

function setIsFullscreen() {
  isFullscreen.value =
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement;
}

onMounted(() => {
  doc.addEventListener("fullscreenchange", setIsFullscreen);
});
onUnmounted(() => {
  doc.removeEventListener("fullscreenchange", setIsFullscreen);
  closeFullscreen();
});
</script>
