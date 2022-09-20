<template>
  <UiModal :active="active" @deactivate="$emit('deactivate')">
    <div class="text-center">
      <IconWarningRound class="mx-auto mb-4 w-14 h-14 text-gray-200" />
      <h3 class="mb-5 text-lg font-normal text-gray-400">
        Are you sure you want to clear the current spark ?<br />This action
        can't be undone.
      </h3>
      <button
        @click.stop="$emit('deactivate', sparkStore.clearSpark())"
        type="button"
        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
      >
        Yes, I'm sure
      </button>
      <button
        @click.stop="$emit('deactivate')"
        type="button"
        class="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
      >
        No, cancel
      </button>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import { useSparkStore } from "~~/stores/SparkStore";

const sparkStore = useSparkStore();

defineProps({
  active: {},
});
defineEmits(["deactivate", "clearSpark"]);
</script>
