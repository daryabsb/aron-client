<script setup>
import { useOrderStore } from "@/Orders/ordersStore";
const { priceFormat } = useOrderStore();
const emit = defineEmits(["back", "addToCart", "selectItem"]);

const props = defineProps({
  item: { type: Object, required: true },
  isBack: { type: Boolean, default: false },

});
const takeAction = (item) => {
  if (item.is_product) {
    emit("addToCart", item);
  } else if (!props.isBack) {
    emit("selectItem");
  } else emit("back", item.id);
};
</script>

<template>
  <div class="w-full border border-gray-500 shadow-lg" @click="takeAction(item)">
    <div class="rounded-md p-2 bg-gray-800">
      <div class="flex justify-center items-center">
        <!-- <span class="text-sm">{{ item.info.date }}</span> -->
      </div>
      <div v-if="item.image" class="mb-4 flex flex-col justify-center items-center">
        <img :src="item.image" class="object-contain h-28 w-40" />
        <p class="text-base text-white font-bold">{{ item.name }}</p>
      </div>
      <div v-else-if="isBack" class="mb-4 flex flex-col justify-center items-center">
        <img class="animate-pulse object-contain h-28 w-40" src="http://127.0.0.1:8000/media/uploads/product/home.jpg"
          alt="" />
        <p class="text-base text-white font-bold">Back</p>
      </div>
      <div v-else class="h-28 mb-4 mt-5 flex flex-col items-center justify-center">
        <p class="text-base font-bold opacity-70">{{ item.name }}</p>
        <p class="mt-2 text-sm opacity-70">
          {{ item.price ? `${priceFormat(item.price)}` : "" }}
        </p>
      </div>
      <div>
        <div class="my-2 mx-0 h-1 w-full overflow-hidden rounded-md bg-white">
          <span class="block h-1 rounded-md bg-yellow-700" style="width: 65%;" />
          <!-- :style="{ width: item.info.progress }"
            :class="[item.style.progressbar]" -->
        </div>
        <div v-if="!isBack" class="flex justify-between p-2 text-yellow-600 text-sm font-bold">
          <span class=" ">
            {{ item.price ? `${priceFormat(item.price)}` : "" }}
          </span>

          <p class="m-0 text-sm font-bold">
            {{ "65%" }}
          </p>
        </div>
        <div v-else class="flex justify-between p-2 text-yellow-600 text-sm font-bold">
          <span class="">
            {{ "Back" }}
          </span>

          <p class="m-0 text-right text-sm font-bold">
            {{ "" }}
          </p>
        </div>
      </div>
      <div class="relative flex justify-between pt-2"></div>
    </div>
  </div>
</template>
