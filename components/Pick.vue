<template>
  <div class="flex flex-col">
    <div class="flex w-full">
      <!-- <input type="text" class="bg-black text-2xl focus:outline-none w-full" /> -->
      <div class="w-full mb-2">
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pointer-events-none"
          >
            <img src="/icon.png" alt="icon" class="w-14 object-contain p-1" />
          </div>
          <input
            type="search"
            id="default-search"
            class="focus:outline-none p-4 pl-16 w-full text-2xl rounded border bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-white focus:border-white"
            placeholder="Search for names or weapons..."
            autocomplete="off"
            v-model="filter"
          />
        </div>
      </div>
    </div>
    <div class="w-full grid grid-cols-4 xl:grid-cols-3 gap-2 overflow-y-auto">
      <SelectCard
        v-for="(chara, i) in charaData"
        :key="chara.id + i"
        v-show="
          chara.name.toLowerCase().includes(filter) ||
          chara.weapon.toLowerCase().includes(filter)
        "
        :name="chara.name"
        :id="chara.id"
        @click.left="$emit('pickCardClick', 'new', chara)"
        @click.right="$emit('pickCardClick', 'dupe', chara)"
        oncontextmenu="return false;"
      />
      <SelectCard
        v-for="(summon, i) in summonData"
        :key="summon.id + i"
        v-show="summon.name.toLowerCase().includes(filter)"
        :name="summon.name"
        :id="summon.id"
        type="summ"
        @click="$emit('pickCardClick', 'summon', summon)"
      />
    </div>
  </div>
</template>

<script setup>
import jsonData from "@/assets/data.json";

const filter = ref("");
const charaData = ref(jsonData.chara_list);
const summonData = ref(jsonData.summon_list);

const emits = defineEmits(["pickCardClick"]);
</script>
