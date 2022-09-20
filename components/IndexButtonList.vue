<template>
  <div class="grid">
    <UiButton
      @click="settingsModal = true"
      class="rounded-t xl:rounded-t-none xl:rounded-l"
    >
      <IconSettings class="w-6 h-6 m-auto" />
      <SettingsModal
        :active="settingsModal"
        @deactivate="settingsModal = false"
      />
    </UiButton>

    <UiButton @click="sparkAlert = true">
      <IconTrash class="w-6 h-6 m-auto" />
      <ClearSparkAlert :active="sparkAlert" @deactivate="sparkAlert = false" />
    </UiButton>

    <UiButton @click="helpModal = true">
      <IconHelp class="w-6 h-6 m-auto" />
      <HelpModal :active="helpModal" @deactivate="helpModal = false" />
    </UiButton>

    <UiLinkButton
      :to="{ name: 'studio', query: { spark: sparkStore.sparkCode } }"
      class="rounded-b xl:rounded-b-none xl:rounded-r"
    >
      <IconRightArrow class="w-6 h-6 m-auto" />
    </UiLinkButton>
  </div>
</template>

<script setup lang="ts">
import { useSparkStore } from "@/stores/SparkStore";

const sparkAlert = ref(false);
const settingsModal = ref(false);
const helpModal = ref(false);
const sparkStore = useSparkStore();
</script>
