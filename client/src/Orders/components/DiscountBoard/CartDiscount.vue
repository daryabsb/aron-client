<template>
  <div class="text-xl text-white font-light w-full h-full">
    Applly cart discount
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
    <NumericPad v-model="cartInputValue" :symbol="discountType == 0 ? '%' : '$'" @update:calc-memory="updateCartInput"
      @close="submitResults" />
    <div class="flex justify-center relative mt-6 text-xl w-full">

    </div>

  </div>
</template>

<script setup>
import { ref, defineEmits, inject, onMounted } from "vue";

import { useOrderStore } from "@/Orders/ordersStore";
import NumericPad from "@/components/shared/calculator/NumericPad.vue";

const emit = defineEmits(["close"]);
const toggleDiscount = inject("toggleDiscount")

const updateCartInput = (memory) => (cartInputValue.value = memory.value);

const store = useOrderStore();

const useActiveOrder = store.useActiveOrder;

const discountType = ref(0);
const cartInputValue = ref("");

const selectCartInputText = () => {
  // const cartDiscountInput = document.getElementById("cart-discount-input");
  // // const itemDiscountInput = document.getElementById("item-discount-input");
  // cartDiscountInput.focus();
  // // discountInput.focus();
  // cartDiscountInput.setSelectionRange(0, 3);
};
onMounted(selectCartInputText);

const toggleDiscountType = (type) => {
  discountType.value = type;
  // selectCartInputText();
};

const discountValue = (payload) => {
  cartInputValue.value = payload.value;
};

const submitResults = async () => {
  await store.appllyCartDiscount(
    discountType.value,
    +cartInputValue.value
  );
  await toggleDiscount()


};
</script>
