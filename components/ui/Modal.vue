<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        id="outside"
        tabindex="-1"
        class="absolute h-full overflow-hidden inset-0 flex justify-center align-middle bg-opacity-80 bg-gray-900 backdrop-blur-[2px]"
        v-if="active"
        @click="$emit('deactivate')"
      >
        <div id="inside" class="m-auto" @click.stop>
          <div
            class="relative rounded-lg shadow-lg bg-gray-700 min-h-[220px] min-w-[340px] max-w-[600px]"
          >
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
              @click.stop="$emit('deactivate')"
            >
              <IconClose class="w-5 h-5" />
            </button>
            <div class="p-6 min-h-[160px] min-w-[280px]">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  active: { type: Boolean, default: false },
});
defineEmits(["deactivate"]);
</script>
