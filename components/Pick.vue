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
    <div
      class="w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-3 gap-2 overflow-y-auto"
      @scroll="handleScroll"
    >
      <transition-group :name="filter.length > 2 ? 'pick' : ''" mode="">
        <SelectCard
          v-for="chara in charaData"
          :key="chara.id"
          v-show="charaFilter(chara)"
          :name="chara.name"
          :id="chara.id"
          @click.left="$emit('pickCardClick', 'new', chara)"
          @click.right="$emit('pickCardClick', 'dupe', chara)"
          oncontextmenu="return false;"
          :class="filter.length > 2 ? 'pick-item' : ''"
        />
        <SelectCard
          v-for="(summon, i) in summonData"
          :key="summon.id + i"
          v-show="summonFilter(summon)"
          :name="summon.name"
          :id="summon.id"
          type="summ"
          @click="$emit('pickCardClick', 'summon', summon)"
          :class="filter.length > 2 ? 'pick-item' : ''"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import jsonData from "@/assets/data.json";

const filter = ref("");
const scrollFilter = ref(30);
const charaData = ref(jsonData.chara_list);
const summonData = ref(jsonData.summon_list);

function charaFilter(chara) {
  return (
    chara.name.toLowerCase().includes(filter.value) ||
    chara.weapon.toLowerCase().includes(filter.value)
  );
}

function summonFilter(summon) {
  return summon.name.toLowerCase().includes(filter.value);
}

function handleScroll(e) {
  const scrollBottom =
    e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight;
  if (scrollBottom > 3000) {
    scrollFilter.value -= 30;
  }
  if (scrollBottom < 300) {
    scrollFilter.value += 30;
  }
  if (e.target.scrollTop == 0) {
    scrollFilter.value = 30;
  }
}
</script>

<style scoped>
/* .pick-move {
  transition: transform 0.2s ease;
} */

.pick-enter-from {
  opacity: 0;
}

.pick-enter-active {
  transition: opacity 0.2s ease, transform 0s;
  transform: scale(0.01);
}

.pick-enter-to {
  transform: scale(1);
  opacity: 1;
}

.pick-leave-active {
  display: none;
  transition: all 0s ease;
}
</style>
