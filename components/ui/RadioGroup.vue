<template>
  <ul
    class="items-center w-full text-sm font-medium rounded-lg border-2 sm:flex bg-gray-700 border-gray-600 text-white overflow-hidden"
  >
    <li
      v-for="(item, i) in list"
      :key="i"
      class="w-full border-b sm:border-b-0 sm:border-r border-gray-600 hover:bg-gray-600"
    >
      <div class="flex items-center">
        <input
          :id="name + i"
          type="radio"
          v-model="refActiveIndex"
          :value="i"
          :name="name"
          class="ml-3 absolute w-4 h-4"
          @click="$emit('activeIndex', i)"
        />
        <label
          :for="name + i"
          class="py-3 pl-9 pr-3 w-full text-sm font-medium text-gray-300"
          >{{ item }}
        </label>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  list: { type: Array, required: true },
  activeIndex: { type: Number, required: true },
});
const refActiveIndex = ref(props.activeIndex);

defineEmits(["activeIndex"]);
</script>
