<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        tabindex="-1"
        class="absolute h-full overflow-hidden inset-0 flex justify-center align-middle bg-opacity-80 bg-gray-900 backdrop-blur-[2px]"
        v-if="active"
        @click="$emit('deactivate')"
      >
        <div class="m-auto" @click.stop>
          <div class="relative rounded-lg shadow-lg bg-gray-700 m-6">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
              @click.stop="$emit('deactivate')"
            >
              <IconClose class="w-5 h-5" />
            </button>
            <div class="p-6" style="min-width: 280px; min-height: 160px">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  active: {},
});
defineEmits(["deactivate"]);
</script>
