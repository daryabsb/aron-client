<script setup>
import { useRoute } from "vue-router";
import { useOrderStore } from "@/Orders/ordersStore";
import OrderItem from "./OrderItem.vue";
const store = useOrderStore();
defineProps({
  number: { type: String, required: true },
  from: { type: String, required: false },
});
const route = useRoute();
</script>
<template>
  <div class="relative h-full flex flex-col p-2 overflow-auto scrollbar">
    <span
      class="sticky flex justify-start border-b border-gray-500 py-3 space-x-2 items-center shadow-sm"
    >
      <button
        type="button"
        class="relative items-center rounded-sm w-24 justify-center bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-300 hover:text-black focus:z-10"
      >
        Delete
      </button>
      <button
        type="button"
        class="relative -ml-px items-center border w-24 justify-center rounded-sm border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        Quantity
      </button>

      <button
        type="button"
        class="relative truncate flex-grow -ml-px items-center rounded-sm border w-24 justify-center border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        {{ number }}
      </button>
    </span>
    <div class="flex-grow inset-0 overflow-auto scrollbar mt-2">
      <OrderItem
        v-for="item in store.useActiveOrder.items"
        :key="item.number"
        :orderitem="item"
      />
    </div>
    <span
      class="sticky flex justify-start border-t mt-px border-gray-500 py-3 space-x-2 items-center shadow-sm"
    >
      <button
        type="button"
        class="relative items-center rounded-sm w-32 justify-center bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-300 hover:text-black focus:z-10"
      >
        <span>F0</span>
        <p class="text-sm">Voide order</p>
      </button>
      <button
        type="button"
        class="relative items-center border w-32 justify-center rounded-sm border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        <span>F10</span>
        <p class="text-sm">Lock order</p>
      </button>

      <button
        type="button"
        class="relative items-center border w-32 justify-center rounded-sm border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        <span>F12</span>
        <p class="text-sm">Repeat round</p>
      </button>
    </span>
  </div>
</template>
