<script setup>
import { computed, onMounted } from "vue";
import { useOrderStore } from "@/Orders/ordersStore";
import { useOrderItem } from "@/Orders/orderComposables/orderItemProperties";
const store = useOrderStore();
const addQty = store.addQty;
const priceFormat = store.priceFormat;
const setActiveItem = store.setActiveItem;

const props = defineProps({
  orderitem: {
    type: Object,
    default: {},
  },
});
const item = computed(() => useOrderItem(props.orderitem));
</script>

<template>
  <div>
    <div
      :class="[
        store.useActiveItem == orderitem
          ? 'bg-sky-500  border-transparent'
          : 'bg-inherit hover:bg-gray-500',
        'flex w-full rounded-md border-b border-gray-500 px-1 py-2  2xl:items-start',
      ]"
    >
      <img
        :src="item.product.image"
        alt="profile image"
        class="hidden xl:block h-12 w-12 rounded-lg object-cover"
      />
      <div class="w-full pl-4">
        <div class="flex w-full items-center justify-between">
          <div class="font-medium text-white">{{ item.product.name }}</div>
          <div class="flex cursor-pointer items-center justify-center">
            <span class="font-semibold text-white mx-2" aria-hidden="true"
              >{{ item.quantity + " " + item.product.measurement_unit }}
            </span>
          </div>
        </div>
        <div class="flex justify-between">
          <p class="truncate text-sm">
            <span class="text-white">
              {{ priceFormat(item.product.price) }}
              /
            </span>
            <span
              :class="[
                item.discount ? 'line-through text-red-300' : 'text-white',
              ]"
            >
              {{ priceFormat(store.useActiveOrder.itemTotal(item)) }}
            </span>
            <span v-if="item.discount">
              {{ " " }}
              {{
                priceFormat(
                  store.useActiveOrder.itemTotalWithItemDiscount(item)
                )
              }}
            </span>
          </p>
          <span class="font-semibold text-white mx-2" aria-hidden="true"
            >{{
              priceFormat(store.useActiveOrder.itemTotalWithItemDiscount(item))
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
