<script setup>
import { ref, computed, onMounted, onUpdated, defineAsyncComponent } from "vue";
import axios from "axios";
import ordersAPI from "@/services/ordersAPI";
import OrderItem from "@/Orders/orderTemplates/OrderItem";
import { useUser } from "@/Users/userStore";
import NumericPad from "@/components/shared/calculator/NumericPad.vue";

import productsGroupsAPI from "@/services/productsGroupsAPI";
import { useOrderStore } from "@/Orders/ordersStore";
import {
  priceFormat,
  numberFormat,
  loadUserData,
} from "@/Orders/orderComposables";

const store = useOrderStore();
const userStore = useUser();
const addToCart = store.addToCart;

const ProductItem = defineAsyncComponent(() =>
  import("@/Orders/components/ProductList/ProductItem.vue")
);

const productGroups = ref([]);
const selectedGroupProducts = ref([]);

const ids = ref([]);

const loadProductGroups = async () => {
  try {
    const response = await productsGroupsAPI.getProductGroups();
    productGroups.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  await loadProductGroups();
  if (!userStore.user) await loadUserData();
});
const id = computed(() => ids.value[ids.value.length - 1]);

const loadProductsByGroupId = async () => {
  try {
    if (id.value) {
      const response = await productsGroupsAPI.filterGroups(id.value);
      selectedGroupProducts.value = response.data;
    } else return;
  } catch (error) {
    console.log(error);
  }
};
const selectGroup = async (groupId) => {
  // if (id.value) id.value = 0;
  ids.value.push(groupId);

  await loadProductsByGroupId();
};
const removeId = async () => {
  ids.value.splice(-1);
  await loadProductsByGroupId();
};

const isNumpadOpen = ref(false);
const isCheckPriceOpen = ref(false);
const isDefaultQtyOpen = ref(false);
const isTaxInclusiveOpen = ref(false);
const order = ref(null);

const close = () => (isNumpadOpen.value = false);

// PREPARE PRODUCT TO ORDER
const generateItemNumber = async () => {
  try {
    const numberResponse = await ordersAPI.getNumber("item");
    console.log("check number Response", numberResponse.data);
    return numberResponse.data;
  } catch (error) {
    console.log(error);
  }
};
// 1. Add the clicked item to the created OrderItem
const createOrder = async (item) => {
  // HERE NEED TO BE CHECKED

  const number = await generateItemNumber();
  order.value = new OrderItem(
    item,
    `${number}`,
    store.activeNumber,
    userStore.user.id
  );

  checkPrice(item);
  return;
};

// 2. Check the change price on the product

const checkPrice = (item) => {
  if (item.is_price_change_allowed) {
    isCheckPriceOpen.value = true;
    return;
  } else {
    checkQuantiy();
  }
};

// 3. Get the price and proceed with checkQuantity
const getPrice = (value) => {
  order.value.price = value;
  isCheckPriceOpen.value = false;
  checkQuantiy();
};

// 4. Check the is default quantity on the item
const checkQuantiy = () => {
  // console.log(order.value);
  // return;
  if (!order.value.product.is_using_default_quantity) {
    isDefaultQtyOpen.value = true;
    return;
  } else {
    // checkTaxInclusivePrice()
    addProductToCart();
  }
};
// 5. Get the quantity and proceed
const getQuantity = async (value) => {
  order.value.quantity = value;
  isDefaultQtyOpen.value = false;
  // checkTaxInclusivePrice()
  addProductToCart();
};
// 4. CHECK TAX TO BE ADDED LATER
const checkTaxInclusivePrice = () => {
  console.log("Tax Done");
};
// 5. Dispatch the order to cart =>>

const addProductToCart = () => {
  addToCart(order);
  // order = null;
};
const getValue = (value) => {
  console.log(value);
  close();
};

const selectItem = (item) => {
  ids.value.push(item.number);
  loadProductsByGroupId();
};
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3"
  >
    <template v-if="ids.length === 0">
      <ProductItem
        v-for="(group, index) in productGroups"
        :key="index"
        :item="group"
        @select-item="selectGroup(group.id)"
      />
    </template>
    <template v-else>
      <ProductItem
        :item="selectedGroupProducts"
        :is-back="true"
        @back="removeId"
        @select-item="selectGroup(group.id)"
      />
      <ProductItem
        v-for="product in selectedGroupProducts"
        :key="product.id"
        :item="product"
        @add-to-cart="createOrder(product)"
        @back="removeId"
        @select-item="selectGroup(product.id)"
      />
    </template>
  </div>
</template>
