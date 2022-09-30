<template>
  <div class="grid">
    <UiButton
      @click="settingsModal = true"
      class="rounded-t xl:rounded-t-none xl:rounded-l"
      aria-label="settings"
    >
      <IconSettings class="w-6 h-6 m-auto" />
      <SettingsModal
        :active="settingsModal"
        @deactivate="settingsModal = false"
      />
    </UiButton>

    <UiButton @click="sparkAlert = true" aria-label="clear">
      <IconTrash class="w-6 h-6 m-auto" />
      <ClearSparkAlert :active="sparkAlert" @deactivate="sparkAlert = false" />
    </UiButton>

    <UiButton @click="helpModal = true" aria-label="help">
      <IconHelp class="w-6 h-6 m-auto" />
      <HelpModal :active="helpModal" @deactivate="helpModal = false" />
    </UiButton>

    <UiLinkButton
      :to="{ name: 'studio', query: { spark: spark.getCode() } }"
      class="rounded-b xl:rounded-b-none xl:rounded-r"
      aria-label="next"
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
const spark = useSparkStore().currentSpark;
</script>
