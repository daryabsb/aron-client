<script setup>
import { computed } from "vue";
import { useOrderStore } from "@/Orders/ordersStore";
import { useOrderItem } from "@/Orders/orderComposables/orderItemProperties";
const store = useOrderStore();
const addQty = store.addQty;
const priceFormat = store.priceFormat;

const props = defineProps({
  orderitem: {
    type: Object,
    default: function () {
      return {
        name: "Stephanie",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
        text:
          "I got your first assignment. It was quite good. 🥳 We can continue with the next assignment.",
        date: "Dec, 12",
      };
    },
  },
});
const item = computed(() => useOrderItem(props.orderitem));
</script>

<template>
  <div>
    <div
      class="flex w-full border-b border-gray-500 pt-2 hover:bg-gray-700 2xl:items-start"
    >
      <img
        :src="item.product.image"
        alt="profile image"
        class="hidden xl:block h-12 w-12 rounded-lg object-cover"
      />
      <div class="w-full pl-4">
        <div class="flex w-full items-center justify-between">
          <div class="font-medium text-white">{{ item.product.name }}</div>
          <div class="flex h-7 w-7 cursor-pointer items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              />
            </svg>
          </div>
        </div>

        <p class="truncate my-1 text-sm text-gray-300">
          {{ priceFormat(item.product.price) }}
          /
          <span
            :class="[
              item.discount
                ? 'line-through text-aronium-danger'
                : 'text-aronium-white',
            ]"
          >
            {{ priceFormat(item.totalWithTax()) }}
          </span>
          <span v-if="item.discount">
            {{ " " }}
            {{ priceFormat(item.orderItemTotal()) }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
