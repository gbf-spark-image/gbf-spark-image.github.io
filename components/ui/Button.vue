<template>
  <button
    class="bg-black enabled:hover:bg-white text-white enabled:hover:text-black font-bold py-2 px-4 border-white border duration-200 disabled:hover:bg-red-600"
    type="button"
  >
    <slot />
  </button>
</template>
