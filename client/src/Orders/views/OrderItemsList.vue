<script setup>
import {
  ref,
  computed,
  watch,
  defineProps,
  onMounted,
  onBeforeUnmount,
  defineAsyncComponent,
} from "vue";
import { useRoute } from "vue-router";
import { useOrderStore } from "@/Orders/ordersStore";
import { useClick } from "@/composables/useClick";

import OrderItem from "./OrderItem.vue";
const store = useOrderStore();
const click = useClick();
const orderList = ref(null);
const activeOrderNumber = store.activeNumber;
const selectedOrderItem = ref(null);

const props = defineProps({
  number: { type: String, required: true },
  from: { type: String, required: false },
});
onMounted(async () => {
  store.activeNumber = props.number;
  store.activeItem = {};

  // click.addListener((e) => {
  //   const nav = document.getElementById("sideNav");
  //   if (e.composedPath().includes(orderList.value.el)) {
  //     setItem();
  //   } else if (!e.composedPath().includes(nav)) {
  //     setNull();
  //   }
  // });
});

const route = useRoute();

const setItem = (item) => {
  // if (selectedOrderItem.value) {
  //   store.activeItem = selectedOrderItem.value;
  // } else {
  store.activeItem = item;
  // store.activeItem = selectedOrderItem.value;
  // }
};
const setNull = () => {
  if (!selectedOrderItem.value) {
    store.activeItem = {};
  }
};
const deleteSelectedItem = () => {
  if (!store.activeItem) return;
  store.deleteItem()
}
const deleteActiveOrder = () => {
  store.deleteOrder()
}
onBeforeUnmount(() => click.removeAllListeners());
</script>
<template>
  <div class="relative h-full flex flex-col p-2 overflow-auto scrollbar">
    <span class="sticky flex justify-start border-b border-gray-500 py-3 space-x-2 items-center shadow-sm">
      <button type="button"
        class="relative items-center rounded-sm w-24 justify-center bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-300 hover:text-black focus:z-10"
        @click="deleteSelectedItem">
        Delete
      </button>
      <button type="button"
        class="relative -ml-px items-center border w-24 justify-center rounded-sm border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10">
        Quantity
      </button>

      <Popper arrow>
        <button type="button"
          class="relative truncate flex-grow -ml-px items-center rounded-sm border w-24 justify-center border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10">
          {{ number }}
        </button>
        <template #content="{ close }">
          <div>
            <button @click="close">Close</button>
          </div>
        </template>
      </Popper>
    </span>
    <div ref="orderList" class="flex-grow inset-0 overflow-auto scrollbar mt-2">
      <OrderItem v-for="item in store.useActiveOrder.items" :key="item.number" :orderitem="item" class="cursor-pointer"
        @click="setItem(item)" />
    </div>
    <span class="sticky flex justify-center border-t mt-px border-gray-500 py-1 space-x-2 items-center shadow-sm">
      <button type="button" class="relative items-center rounded-sm w-32 justify-center 
        bg-red-600 px-4 py-1 text-sm font-medium text-white hover:bg-red-300 
        hover:text-black focus:z-10" @click="deleteActiveOrder">
        <span>F0</span>
        <p class="text-sm">Voide order</p>
      </button>
      <button type="button"
        class="relative items-center border w-32 justify-center rounded-sm border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10">
        <span>F10</span>
        <p class="text-sm">Lock order</p>
      </button>

      <button type="button"
        class="relative items-center border w-32 justify-center rounded-sm border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10">
        <span>F12</span>
        <p class="text-sm">Repeat round</p>
      </button>
    </span>
  </div>
</template>
