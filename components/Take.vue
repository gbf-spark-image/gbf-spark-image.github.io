<template>
  <div
    ref="take"
    class="border border-neutral-300 pb-1 overflow-hidden flex flex-grow"
  >
    <div
      v-for="col in sparkColumns"
      :ref="col.ref"
      :key="col.iconUrl"
      :class="`flex flex-grow w-1/3 h-full flex-col`"
    >
      <div class="flex align-middle justify-center">
        <img :src="col.iconUrl" alt="icon" class="p-3 h-24" />
      </div>
      <div class="flex flex-row mx-2 flex-wrap justify-center" :id="col.ref">
        <SelectCard
          v-for="(item, i) in col.list"
          class="m-1"
          :style="`width: ${col.itemWidth}%;`"
          :key="item.id + i"
          :id="item.id"
          :name="item.name"
          :type="col.type"
          loading="eager"
          @click="$emit('takeCardClick', i, col.list)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const take = ref(null);
const newCharsCol = ref(null);
const dupeCharsCol = ref(null);
const summonsCol = ref(null);

const props = defineProps({
  spark: {
    type: Object,
    required: true,
  },
});

const sparkColumns = ref([
  {
    ref: "newCharsCol",
    element: newCharsCol,
    iconUrl: "/gem.jpg",
    list: props.spark.newCharaList,
    type: "char",
    itemWidth: 100,
  },
  {
    ref: "dupeCharsCol",
    element: dupeCharsCol,
    iconUrl: "/gold-moon.jpg",
    list: props.spark.dupeCharaList,
    type: "char",
    itemWidth: 100,
  },
  {
    ref: "summonsCol",
    element: summonsCol,
    iconUrl: "/sunlight-stone.jpg",
    list: props.spark.summonList,
    type: "summ",
    itemWidth: 100,
  },
]);

function updateItemSize() {
  if (!take.value) {
    return;
  }
  const colHeight = Math.max(0, take.value.clientHeight - 96);
  const colMargin = 8 * 2;
  const itemMargin = 4 * 2;
  sparkColumns.value.forEach((col) => {
    if (col.list.length) {
      const colWidth = take.value.clientWidth / 3 - colMargin;
      let listHeight;
      let widthScale = 1.01;
      do {
        widthScale /= 1.01;
        const itemWidth = Math.min(
          colWidth * widthScale,
          colWidth - itemMargin
        );
        const thumbnailWidth = Math.min(280, itemWidth);
        const thumbnailHeight = thumbnailWidth * (4 / 7);
        const subColNumber = Math.floor(colWidth / (itemWidth + itemMargin));
        const rowNumber = Math.ceil(col.list.length / subColNumber);
        listHeight = (thumbnailHeight + itemMargin) * rowNumber;
      } while (widthScale > 0.01 && listHeight > colHeight);
      col.itemWidth = widthScale * 100;
    }
  });
}

const emits = defineEmits(["takeCardClick"]);

watch(props.spark, () => {
  updateItemSize();
});

onMounted(() => {
  addEventListener("resize", (event) => {
    updateItemSize();
  });
  updateItemSize();
  setInterval(() => {
    if (
      take.value?.scrollHeight > take.value?.clientHeight ||
      take.value?.scrollWidth > take.value?.clientWidth
    ) {
      updateItemSize();
    }
  }, 50);
});
</script>
