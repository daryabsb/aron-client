<template>
  <div>
    <Modal :open="openDiscount" @close="toggleDiscount" size="md">
      <template #title>
        <div>
          <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <select id="tabs" name="tabs"
              class="block w-full rounded-md border-gray-500 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option v-for="tab in tabs" :key="tab.id" :selected="tab.current" @click="toggleTab(tab.id)">
                {{ tab.name }}

              </option>
            </select>
          </div>
          <div class="hidden sm:block">
            <div class="border-b border-gray-500">
              <nav class="-mb-px flex justify-center space-x-12" aria-label="Tabs">
                <span v-for="tab in tabs" :key="tab.id" :class="[
                  tabID == tab.id
                    ? 'border-pink-400 text-pink-400'
                    : 'border-transparent text-white hover:text-gray-300 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b font-normal text-lg cursor-pointer',
                ]" @click="toggleTab(tab.id)">{{ tab.name }}</span>
              </nav>
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col items-center h-2/5 w-full p-2">
          <div class="p-5">
            <!-- <img :src="`${process.env.SERVER_PATH}/media/icons/cart.svg`" class="w-16" alt="cart-icon" /> -->
            <img src="http://127.0.0.1:8000/media/icons/cart.svg" class="w-16" alt="cart-icon" />
          </div>
          <!-- <keep-alive> -->
          <component :is="component" :disabled="(Object.keys(store.activeItem).length === 0)" />
          <!-- </keep-alive> -->
          <!-- @close="$emit('close')" -->

          <!-- <NumericPad @calculatorValue="discountValue" /> -->
        </div>
      </template>
      <template #button>
        <button type="button"
          class="inline-flex leading-6 w-full justify-center rounded-sm border border-gray-500 bg-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
          @click="toggleDiscount">
          Clear all discounts
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, inject, reactive, onMounted } from "vue";
import Modal from "@/components/shared/Modal.vue";

import { useOrderStore } from "@/Orders/ordersStore";

import CartDiscount from "@/Orders/components/DiscountBoard/CartDiscount.vue";
import ItemDiscount from "@/Orders/components/DiscountBoard/ItemDiscount.vue";

const store = useOrderStore();
const openDiscount = inject("openDiscount")
const toggleDiscount = inject("toggleDiscount")


// const useActiveOrder = ref(store.useActiveOrder);

// const activeItem = computed(() =>
//   useActiveOrder.value.items.find((itm) => itm.isActive)
// );
const tabs = ref([
  { id: 1, name: "Cart discount" },
  { id: 2, name: "Item discount" },
]);

const tabID = ref(1);
onMounted(() => {
  if (Object.keys(store.activeItem).length !== 0) {
    tabID.value = 2;
    // tabs.value[0].current = true;
  } else {
    tabID.value = 1;
    // tabs.value[1].current = true;
  }
});

// watch(
//   () => tabID,
//   () => {
//     tabs.value.forEach((tab) => (tab.current = !tab.current));
//   }
// );

const toggleTab = (ID) => {
  tabID.value = ID;
};

const component = computed(() =>
  tabID.value == 1 ? CartDiscount : ItemDiscount
);

// const emit = defineEmits(["close"]);
</script>
