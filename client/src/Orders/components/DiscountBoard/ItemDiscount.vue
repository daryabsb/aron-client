<template>
  <div>

    <div v-if="disabled" class="text-xl font-light w-full h-full">
      <h1 class="text-xl text-white my-16">
        Please select an item to add Item discount
      </h1>
      <div class="w-full">
        <EmptyNumericPad />
      </div>
    </div>
    <div v-else class="text-xl text-white font-light w-full h-full">
      This is a discount for " {{ store.activeItem.product.name }} "
      <div class="flex flex-col items-center">
        <div class="flex justify-center mt-4 w-full height-16">
          <button class="rounded-l-lg w-20 bg-inherit border border-gray-500" :class="
            discountType === 0
              ? 'bg-sky-500 text-white border-sky-500'
              : ' border-gray-500'
          " @click="toggleDiscountType(0)">
            %
          </button>
          <button class="rounded-r-lg w-20 border bg-inherit" :class="
            discountType === 1
              ? ' text-white border-sky-500'
              : '  border-gray-500'
          " @click="toggleDiscountType(1)">
            $
          </button>
        </div>
      </div>
      <NumericPad v-model="itemInputValue" :symbol="discountType == 0 ? '%' : '$'" @update:calc-memory="updateItemInput"
        @close="submitResults" />
      <div class="w-full flex justify-center mt-6 text-xl"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, defineProps, defineEmits, onMounted } from "vue";

import { useOrderStore } from "@/Orders/ordersStore";
import NumericPad from "@/components/shared/calculator/NumericPad.vue";
import EmptyNumericPad from "@/components/shared/calculator/EmptyNumericPad.vue";
defineProps({
  disabled: { type: Boolean, default: true }
})
const emit = defineEmits(["close"]);
const toggleDiscount = inject("toggleDiscount")
const store = useOrderStore();


const discountType = ref(0);
const itemInputValue = ref("");
const updateItemInput = (memory) => (itemInputValue.value = memory.value);

const toggleDiscountType = (type) => {
  discountType.value = type;
  selectItemInputText();
};

const discountValue = (payload) => {
  itemInputValue.value = payload.value;
};

const submitResults = async () => {
  await store.appllyItemDiscount(discountType.value, +itemInputValue.value);

  await toggleDiscount()
  store.activeItem = {};
};
</script>
