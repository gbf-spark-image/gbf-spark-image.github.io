<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      :id="toggleId"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="sr-only peer"
    />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:translate-y-[calc(50%-8px)] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
    <slot />
  </label>
</template>
<script setup lang="ts">
defineProps(["modelValue", "toggleId"]);
defineEmits(["update:modelValue"]);
</script>
