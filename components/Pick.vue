<template>
  <div class="flex flex-col gap-2">
    <div class="relative flex w-full h-[20%] max-h-14">
      <div
        class="flex absolute inset-y-0 left-0 top-0 min-h-[2rem] items-center pointer-events-none"
      >
        <img src="/icon.png" alt="icon" class="h-full object-contain p-1" />
      </div>
      <input
        type="search"
        id="default-search"
        class="focus:outline-none p-4 pl-[6vh] xl:pl-14 w-full text-[120%] rounded border bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-white focus:border-white"
        placeholder="Search for names or weapons..."
        autocomplete="off"
        v-model="filter"
        @beforeinput="handleInput($refs.scroll)"
      />
    </div>
    <div
      ref="scroll"
      class="relative w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-3 gap-2 overflow-y-auto"
      @scroll="handleScroll"
    >
      <transition-group
        :name="scrollFilter < animateMaxScroll ? 'pick' : ''"
        mode=""
      >
        <SelectCard
          v-for="chara in charaList"
          :key="chara.id"
          :name="chara.name"
          :id="chara.id"
          @click.left="$emit('pickCardClick', 'new', chara)"
          @click.right.prevent="$emit('pickCardClick', 'dupe', chara)"
          :class="scrollFilter < animateMaxScroll ? 'pick-item' : ''"
        />
        <SelectCard
          v-for="(summon, i) in summonList"
          v-show="summonFilter(summon)"
          :key="summon.id + i"
          :name="summon.name"
          :id="summon.id"
          @click.left="$emit('pickCardClick', 'summon', summon)"
          @click.right.prevent="$emit('pickCardClick', 'summon', summon)"
          :class="scrollFilter < animateMaxScroll ? 'pick-item' : ''"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import jsonData from "@/assets/data.json";

const filter = ref("");
const scrollFilter = ref(30);
const charaData = jsonData.chara_list;
const summonData = jsonData.summon_list;
const animateMaxScroll = 60;

const charaList = computed(() => {
  return charaData.filter(charaFilter).slice(0, scrollFilter.value);
});

const summonList = computed(() => {
  return summonData
    .filter(summonFilter)
    .slice(0, Math.max(0, scrollFilter.value - charaList.value.length));
});

function charaFilter(chara: typeof charaData[number]) {
  return (
    chara.name.toLowerCase().includes(filter.value.toLowerCase()) ||
    chara.weapon.toLowerCase().includes(filter.value.toLowerCase())
  );
}

function summonFilter(summon: typeof summonData[number]) {
  return summon.name.toLowerCase().includes(filter.value.toLowerCase());
}

function handleInput(el: any) {
  el = el as HTMLElement;
  el.scrollTo(0, scrollFilter.value < animateMaxScroll ? 0 : 1);
  scrollFilter.value = Math.min(scrollFilter.value, animateMaxScroll);
}

function handleScroll(event: Event) {
  const target = event.target as HTMLElement;
  const scrollBottom =
    target.scrollHeight - target.scrollTop - target.offsetHeight;
  if (scrollBottom > 1200) {
    scrollFilter.value -= 10;
  }
  if (scrollBottom < 300) {
    scrollFilter.value += 10;
  }
  if (target.scrollTop == 0) {
    scrollFilter.value = 30;
  }
  scrollFilter.value = Math.max(30, scrollFilter.value);
}
</script>

<style scoped>
.pick-item,
.pick-move {
  transition: transform 0.2s, opacity 0.2s;
}

.pick-enter-from {
  opacity: 0;
  transform: scale(0.01);
}

.pick-leave-active {
  position: absolute;
  top: var(--offsetTop);
  left: var(--offsetLeft);
  width: var(--offsetWidth);
}

.pick-leave-to {
  opacity: 0;
  transform: scale(0.01);
}
</style>
